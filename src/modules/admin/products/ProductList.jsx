import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Filter, Eye } from 'lucide-react';
import { getProductsApi } from '../../../api/productApi';
import { useToast } from '../../../context/ToastContext';
import AdminSelect from '../../../components/common/AdminSelect';
import { DataTable, TableCellPrimary, TableStatusBadge, TableActionButton } from '../../../components/common/DataTable';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 5, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const categories = ['ALL', 'Insecticides', 'Fungicides', 'Herbicides', 'PGR & Nutrition'];

  const categoryFilterOptions = categories.map((cat) => ({
    value: cat,
    label: cat === 'ALL' ? 'All Categories' : cat,
  }));

  // Fetch Products from Backend API with Server-Side Pagination (Single debounced call)
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getProductsApi({
        page,
        limit,
        search: debouncedSearch.trim() || undefined,
        category: categoryFilter !== 'ALL' ? categoryFilter : undefined,
      });

      if (res.success && res.data) {
        setProducts(res.data.products || []);
        setPagination(res.data.pagination || { total: 0, page: 1, limit, totalPages: 1 });
      }
    } catch (err) {
      showToast(err.message || 'Failed to load products from backend API', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, debouncedSearch, categoryFilter, showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(1);
  };

  const columns = [
    {
      key: 'name',
      header: 'Product Details',
      sortable: true,
      width: '36%',
      render: (row) => (
        <TableCellPrimary
          title={row.name}
          subtitle={row.shortDescription}
          image={row.image || '/images/products/premium_dummy.jpg'}
        />
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      width: '16%',
      render: (row) => <span className="admin-badge category">{row.category || 'Insecticides'}</span>,
    },
    {
      key: 'features',
      header: 'Features',
      width: '14%',
      render: (row) => (
        <span className="admin-table-feature-pill">
          {row.features?.length || 0} Features
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '12%',
      render: (row) => <TableStatusBadge status={row.status || 'Active'} />,
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      width: '12%',
      render: (row) => (
        <span className="admin-table-date">
          {row.createdAt ? new Date(row.createdAt).toISOString().split('T')[0] : '2026-08-15'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '10%',
      align: 'right',
      render: (row) => {
        const prodId = row._id || row.id;
        return (
          <div className="dt-actions-group">
            <TableActionButton
              to={`/admin/products/edit/${prodId}`}
              icon={Pencil}
              title="Edit Product"
              variant="edit"
            />
            <TableActionButton
              to={`/admin/products/delete/${prodId}`}
              icon={Trash2}
              title="Delete Product"
              variant="delete"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="admin-product-list-page">
      {/* Page Title & Action Bar */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Product Management</h1>
          <p className="admin-page-subtitle">
            Manage top-level agricultural product formulations, categories, and catalog status
          </p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/products/add" className="btn-admin-primary">
            <Plus size={16} strokeWidth={2.5} />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Common DataTable Component */}
      <DataTable
        title="Products"
        totalCount={pagination.total}
        searchPlaceholder="Search products by name, category..."
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        headerRight={
          <div style={{ minWidth: '190px' }}>
            <AdminSelect
              id="category-filter"
              name="categoryFilter"
              value={categoryFilter}
              onChange={handleCategoryChange}
              options={categoryFilterOptions}
              prefixIcon={<Filter size={14} style={{ color: '#7A8983' }} />}
              placeholder="Filter category..."
            />
          </div>
        }
        columns={columns}
        data={products}
        keyField="_id"
        isLoading={isLoading}
        loadingMessage="Loading products from database..."
        emptyTitle="No products found"
        emptySubtitle="Try adjusting your search query or category filter."
        pagination={{
          page,
          totalPages: pagination.totalPages,
          total: pagination.total,
          limit,
          onPageChange: setPage,
          onLimitChange: handleLimitChange,
          limitOptions: [5, 10, 20, 50],
        }}
      />
    </div>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Star, Filter, RefreshCw } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { getReviewsApi } from '../../../api/reviewApi';
import AdminSelect from '../../../components/common/AdminSelect';
import { DataTable, TableCellPrimary, TableActionButton } from '../../../components/common/DataTable';

export default function ReviewList() {
  const { reviews: contextReviews } = useAdminData();
  const [apiReviews, setApiReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [rateFilter, setRateFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getReviewsApi();
      if (res && res.success && Array.isArray(res.data)) {
        setApiReviews(res.data);
      } else {
        setApiReviews(contextReviews || []);
      }
    } catch (err) {
      console.warn('Fallback to context reviews:', err);
      setApiReviews(contextReviews || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const activeReviewsList = apiReviews.length > 0 ? apiReviews : contextReviews;

  const filteredReviews = useMemo(() => {
    return activeReviewsList.filter((item) => {
      const nameStr = (item.name || '').toLowerCase();
      const addrStr = (item.address || item.location || '').toLowerCase();
      const descStr = (item.description || item.review || item.title || '').toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch =
        nameStr.includes(q) ||
        addrStr.includes(q) ||
        descStr.includes(q);

      const matchesRate =
        rateFilter === 'ALL' || Math.floor(Number(item.rate || 5)) === Number(rateFilter);

      return matchesSearch && matchesRate;
    });
  }, [activeReviewsList, searchQuery, rateFilter]);

  const totalPages = Math.ceil(filteredReviews.length / limit) || 1;
  const paginatedReviews = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredReviews.slice(start, start + limit);
  }, [filteredReviews, page, limit]);

  const rateOptions = [
    { value: 'ALL', label: 'All Ratings' },
    { value: '5', label: '5 Stars (Excellent)' },
    { value: '4', label: '4 Stars (Very Good)' },
    { value: '3', label: '3 Stars (Good)' },
    { value: '2', label: '2 Stars (Fair)' },
    { value: '1', label: '1 Star (Poor)' },
  ];

  const columns = [
    {
      key: 'name',
      header: 'Reviewer',
      sortable: true,
      width: '26%',
      render: (row) => (
        <TableCellPrimary
          title={row.name}
          subtitle={row.address || row.location || 'Verified Grower'}
          image={row.image || '/images/reviews/farmer_1.png'}
          isAvatar={true}
          fallbackImage="/images/reviews/farmer_1.png"
        />
      ),
    },
    {
      key: 'address',
      header: 'Location',
      sortable: true,
      width: '18%',
      render: (row) => (
        <span style={{ fontSize: '0.85rem', color: '#475569' }}>
          {row.address || row.location || 'India'}
        </span>
      ),
    },
    {
      key: 'rate',
      header: 'Rating',
      sortable: true,
      width: '15%',
      render: (row) => (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#D97706' }}>
          <Star size={14} fill="#D97706" />
          <span style={{ fontWeight: 700, fontSize: '0.84rem', color: '#334155' }}>
            {Number(row.rate || 5).toFixed(1)} / 5.0
          </span>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Feedback Description',
      width: '31%',
      render: (row) => {
        const feedbackText = row.description || row.review || row.title || '';
        return (
          <span style={{ fontSize: '0.82rem', color: '#475569', display: 'block', lineHeight: 1.4 }}>
            {feedbackText.length > 90 ? feedbackText.slice(0, 90) + '...' : feedbackText || 'No description provided'}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '10%',
      align: 'right',
      render: (row) => {
        const reviewId = row._id || row.id;
        return (
          <div className="dt-actions-group">
            <TableActionButton
              to={`/admin/reviews/edit/${reviewId}`}
              icon={Pencil}
              title="Edit Review"
              variant="edit"
            />
            <TableActionButton
              to={`/admin/reviews/delete/${reviewId}`}
              icon={Trash2}
              title="Delete Review"
              variant="delete"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="admin-review-list-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Customer Review Management</h1>
          <p className="admin-page-subtitle">
            Manage customer feedback, ratings, and profile images
          </p>
        </div>
        <div className="admin-page-actions">
          <button 
            type="button" 
            onClick={fetchReviews} 
            className="btn-admin-secondary"
            title="Refresh reviews"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <Link to="/admin/reviews/add" className="btn-admin-primary">
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Customer Review</span>
          </Link>
        </div>
      </div>

      {/* Common DataTable Component */}
      <DataTable
        title="Reviews"
        totalCount={filteredReviews.length}
        searchPlaceholder="Search reviews by name, address..."
        searchValue={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setPage(1);
        }}
        headerRight={
          <div style={{ minWidth: '170px' }}>
            <AdminSelect
              id="rate-filter"
              name="rateFilter"
              value={rateFilter}
              onChange={(e) => {
                setRateFilter(e.target.value);
                setPage(1);
              }}
              options={rateOptions}
              prefixIcon={<Filter size={14} style={{ color: '#7A8983' }} />}
              placeholder="Filter rating..."
            />
          </div>
        }
        columns={columns}
        data={paginatedReviews}
        keyField="_id"
        isLoading={loading}
        loadingMessage="Loading reviews from server..."
        emptyTitle="No reviews found"
        emptySubtitle="No customer reviews matched your search criteria."
        pagination={{
          page,
          totalPages,
          total: filteredReviews.length,
          limit,
          onPageChange: setPage,
          onLimitChange: (lim) => {
            setLimit(lim);
            setPage(1);
          },
          limitOptions: [5, 10, 20, 50],
        }}
      />
    </div>
  );
}

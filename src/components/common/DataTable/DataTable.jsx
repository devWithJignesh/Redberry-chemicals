/* ============================================
   DATA TABLE COMPONENT
   FILE: src/components/common/DataTable/DataTable.jsx
   Modern, Reusable, Card-style DataTable UI
   Matches Reference Design with Search, Tooltip Actions,
   Sortable Columns & Pagination
   ============================================ */

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Loader2
} from 'lucide-react';
import './DataTable.css';

/**
 * Status Pill Badge
 */
export function TableStatusBadge({ status, variant, label }) {
  if (!status && !label) return null;

  const text = label || status || 'Active';
  let pillVariant = variant;

  if (!pillVariant) {
    const s = String(text).toLowerCase();
    if (s.includes('active') || s.includes('paid') || s.includes('resolved') || s.includes('verified') || s.includes('approved')) {
      pillVariant = 'success';
    } else if (s.includes('pending') || s.includes('progress') || s.includes('waiting')) {
      pillVariant = 'warning';
    } else if (s.includes('inactive') || s.includes('overdue') || s.includes('rejected') || s.includes('failed') || s.includes('delete')) {
      pillVariant = 'danger';
    } else {
      pillVariant = 'neutral';
    }
  }

  return (
    <span className={`dt-status-pill ${pillVariant}`}>
      {text}
    </span>
  );
}

/**
 * Primary Cell (e.g. Title + Subtitle + optional thumbnail)
 */
export function TableCellPrimary({ title, subtitle, image, isAvatar = false, fallbackImage = '/images/products/premium_dummy.jpg' }) {
  return (
    <div className="dt-cell-primary-wrap">
      {image && (
        <img
          src={image}
          alt={title || 'Item thumbnail'}
          className={`dt-cell-thumb ${isAvatar ? 'avatar' : ''}`}
          onError={(e) => {
            if (fallbackImage) e.target.src = fallbackImage;
          }}
        />
      )}
      <div className="dt-cell-text-stack">
        <span className="dt-cell-main-title">{title}</span>
        {subtitle && <span className="dt-cell-sub-text">{subtitle}</span>}
      </div>
    </div>
  );
}

/**
 * Action Button (Icon-only with accessible tooltip and NO button text)
 */
export function TableActionButton({
  icon: Icon,
  title,
  tooltip,
  onClick,
  to,
  variant = 'default',
  disabled = false,
  className = '',
}) {
  const tooltipText = tooltip || title;

  if (to) {
    return (
      <Link
        to={to}
        className={`dt-action-btn ${variant} ${className}`}
        data-tooltip={tooltipText}
        title={tooltipText}
      >
        {Icon && <Icon size={14} strokeWidth={2} />}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`dt-action-btn ${variant} ${className}`}
      data-tooltip={tooltipText}
      title={tooltipText}
    >
      {Icon && <Icon size={14} strokeWidth={2} />}
    </button>
  );
}

/**
 * Main DataTable Component
 */
export default function DataTable({
  title,
  totalCount,
  headerLeft,
  headerRight,
  searchPlaceholder = 'Search client or number...',
  searchValue,
  onSearchChange,
  showSearch = true,
  columns = [],
  data = [],
  keyField = '_id',
  isLoading = false,
  loadingMessage = 'Loading records...',
  emptyTitle = 'No records found',
  emptySubtitle = 'Try adjusting your search or filters.',
  pagination,
  onSort,
  minHeight = '540px',
  maxHeight,
  fixedHeight,
  wrapperStyle,
  className = '',
}) {
  const [internalSearch, setInternalSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const activeSearch = searchValue !== undefined ? searchValue : internalSearch;

  const handleSearch = (e) => {
    const val = e.target.value;
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setInternalSearch(val);
    }
  };

  const handleClearSearch = () => {
    if (onSearchChange) {
      onSearchChange('');
    } else {
      setInternalSearch('');
    }
  };

  const handleSort = (col) => {
    if (!col.sortable) return;
    let direction = 'asc';
    if (sortConfig.key === col.key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: col.key, direction });
    if (onSort) {
      onSort(col.key, direction);
    }
  };

  // Client-side sorting if not handled externally
  const processedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (!sortConfig.key || onSort) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'string') {
        const comp = aVal.localeCompare(String(bVal));
        return sortConfig.direction === 'asc' ? comp : -comp;
      }
      return sortConfig.direction === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
  }, [data, sortConfig, onSort]);

  // Pagination calculations
  const totalRecords = pagination?.total !== undefined ? pagination.total : processedData.length;
  const currentPage = pagination?.page || 1;
  const currentLimit = pagination?.limit || 10;
  const totalPages = pagination?.totalPages || Math.ceil(totalRecords / currentLimit) || 1;

  const startRecord = totalRecords > 0 ? (currentPage - 1) * currentLimit + 1 : 0;
  const endRecord = Math.min(currentPage * currentLimit, totalRecords);

  const displayCount = totalCount !== undefined ? totalCount : totalRecords;

  const wrapperComputedStyle = {
    minHeight: fixedHeight || minHeight,
    maxHeight: fixedHeight || maxHeight,
    ...wrapperStyle,
  };

  return (
    <div className={`dt-card-container ${className}`}>
      {/* ── Header Bar ── */}
      {(title || showSearch || headerRight || headerLeft) && (
        <div className="dt-header-bar">
          <div className="dt-title-wrap">
            {title && <h2 className="dt-title">{title}</h2>}
            {displayCount !== undefined && (
              <span className="dt-total-badge">{displayCount} total</span>
            )}
            {headerLeft}
          </div>

          <div className="dt-header-actions-wrap">
            {headerRight}

            {showSearch && (
              <div className="dt-search-wrap">
                <input
                  type="text"
                  className="dt-search-input"
                  placeholder={searchPlaceholder}
                  value={activeSearch}
                  onChange={handleSearch}
                />
                {activeSearch && (
                  <button
                    type="button"
                    className="dt-search-clear-btn"
                    onClick={handleClearSearch}
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Table Content ── */}
      <div className="dt-table-wrapper" style={wrapperComputedStyle}>
        <table className="dt-table">
          <thead>
            <tr>
              {columns.map((col, idx) => {
                const isSorted = sortConfig.key === col.key;
                return (
                  <th
                    key={col.key || idx}
                    style={{
                      width: col.width,
                      textAlign: col.align || 'left',
                    }}
                    className={col.sortable ? 'dt-th-sortable' : ''}
                    onClick={() => col.sortable && handleSort(col)}
                  >
                    <div
                      className="dt-th-content"
                      style={{
                        justifyContent: col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start'
                      }}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className={`dt-sort-icon ${isSorted ? 'active' : ''}`}>
                          {isSorted ? (
                            sortConfig.direction === 'asc' ? (
                              <ChevronUp size={13} />
                            ) : (
                              <ChevronDown size={13} />
                            )
                          ) : (
                            <ChevronsUpDown size={12} />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="dt-empty-row">
                  <div className="dt-loading-box">
                    <Loader2 size={18} className="animate-spin" />
                    <span>{loadingMessage}</span>
                  </div>
                </td>
              </tr>
            ) : processedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="dt-empty-row">
                  <div className="dt-empty-box">
                    <p className="dt-empty-title">{emptyTitle}</p>
                    {emptySubtitle && <p className="dt-empty-sub">{emptySubtitle}</p>}
                  </div>
                </td>
              </tr>
            ) : (
              processedData.map((row, rIdx) => {
                const rowKey = row[keyField] || row.id || row._id || rIdx;
                return (
                  <tr key={rowKey}>
                    {columns.map((col, cIdx) => (
                      <td
                        key={col.key || cIdx}
                        style={{
                          textAlign: col.align || 'left',
                        }}
                      >
                        {col.render
                          ? col.render(row, rIdx)
                          : row[col.key] !== undefined && row[col.key] !== null
                          ? String(row[col.key])
                          : '—'}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer / Pagination Bar ── */}
      {pagination && (
        <div className="dt-footer-bar">
          <div className="dt-footer-showing">
            Showing <strong>{startRecord}–{endRecord}</strong> of {totalRecords}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {pagination.onLimitChange && (
              <div className="dt-limit-selector-wrap">
                <span>Rows:</span>
                <select
                  value={currentLimit}
                  onChange={(e) => pagination.onLimitChange(Number(e.target.value))}
                  className="dt-limit-select"
                >
                  {(pagination.limitOptions || [5, 10, 20, 50]).map((lim) => (
                    <option key={lim} value={lim}>
                      {lim}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {totalPages > 1 && (
              <nav className="dt-pagination-nav" aria-label="Table pagination">
                <button
                  type="button"
                  className="dt-page-btn"
                  disabled={currentPage <= 1}
                  onClick={() => pagination.onPageChange(Math.max(1, currentPage - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                  // If lots of pages, display window around active
                  if (
                    totalPages > 7 &&
                    pg !== 1 &&
                    pg !== totalPages &&
                    Math.abs(pg - currentPage) > 1
                  ) {
                    if (pg === 2 || pg === totalPages - 1) {
                      return (
                        <span key={pg} style={{ padding: '0 4px', color: '#94A3B8', fontSize: '0.78rem' }}>
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pg}
                      type="button"
                      className={`dt-page-btn ${currentPage === pg ? 'active' : ''}`}
                      onClick={() => pagination.onPageChange(pg)}
                    >
                      {pg}
                    </button>
                  );
                })}

                <button
                  type="button"
                  className="dt-page-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => pagination.onPageChange(Math.min(totalPages, currentPage + 1))}
                  aria-label="Next page"
                >
                  <ChevronRight size={14} />
                </button>
              </nav>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

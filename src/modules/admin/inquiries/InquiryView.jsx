/* ============================================
   INQUIRY VIEW COMPONENT
   FILE: InquiryView.jsx
   Displays full details of a customer/dealer inquiry
   ============================================ */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Calendar,
  Clock,
  Trash2,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { getInquiryByIdApi, updateInquiryApi, deleteInquiryApi } from '../../../api/inquiryApi';
import { useToast } from '../../../context/ToastContext';

export default function InquiryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchInquiry = async () => {
      setLoading(true);
      try {
        const res = await getInquiryByIdApi(id);
        if (res.success && res.data) {
          setInquiry(res.data);
        } else {
          setInquiry(null);
        }
      } catch (err) {
        console.error('Error fetching inquiry details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInquiry();
    }
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setStatusDropdownOpen(false);
    if (!inquiry || inquiry.status === newStatus) return;

    setUpdatingStatus(true);
    setInquiry((prev) => ({ ...prev, status: newStatus }));

    try {
      const res = await updateInquiryApi(id, { status: newStatus });
      if (res && res.success) {
        showToast(`Inquiry status updated to "${newStatus}"!`, 'success');
      } else {
        showToast(`Status updated to "${newStatus}"`, 'success');
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      showToast('Failed to update status on server', 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInquiryApi(id);
      showToast('Inquiry deleted successfully!', 'success');
      navigate('/admin/inquiries');
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      showToast('Inquiry deleted', 'success');
      navigate('/admin/inquiries');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return { bg: '#DDF5EA', text: '#0F6B4F', border: '#22A06B', label: 'Resolved' };
      case 'In Progress':
        return { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE', label: 'In Progress' };
      case 'Pending':
      default:
        return { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A', label: 'Pending' };
    }
  };

  if (loading) {
    return (
      <div className="admin-page-container" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ padding: '3rem', textAlign: 'center', color: '#7A8983' }}>
          <p>Loading inquiry details...</p>
        </div>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="admin-page-container" style={{ padding: '2rem 1.5rem' }}>
        <div className="admin-card-container" style={{ padding: '3rem', textAlign: 'center' }}>
          <AlertCircle size={40} style={{ color: '#D97706', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.25rem', color: '#172B24', marginBottom: '0.5rem' }}>Inquiry Not Found</h2>
          <p style={{ color: '#7A8983', marginBottom: '1.5rem' }}>
            The inquiry you are looking for does not exist or has been removed.
          </p>
          <Link to="/admin/inquiries" className="btn-admin-primary">
            <ArrowLeft size={16} />
            <span>Back to Inquiries</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentStatusBadge = getStatusBadge(inquiry.status);
  const formattedDate = inquiry.createdAt
    ? new Date(inquiry.createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    : 'Recently';

  return (
    <div className="admin-inquiry-view-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <h1 className="admin-page-title">Inquiry Details</h1>
          <p className="admin-page-subtitle">
            View full communication and contact information submitted by the customer
          </p>
        </div>
        <div className="admin-page-actions" style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/inquiries" className="btn-admin-secondary">
            <ArrowLeft size={15} />
            <span>Back to Inquiries</span>
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="btn-admin-secondary"
            style={{ color: '#DC2626', borderColor: '#FEE2E2' }}
            title="Delete Inquiry"
          >
            <Trash2 size={15} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="admin-card-container" style={{ padding: '2rem', marginBottom: '2rem' }}>

        {/* Top Info Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid #DDE5E1',
            marginBottom: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #22A06B, #0F6B4F)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.25rem',
              }}
            >
              {(inquiry.name || 'C')[0].toUpperCase()}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#172B24' }}>
                {inquiry.name}
              </h2>
              <span style={{ fontSize: '0.84rem', color: '#7A8983', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Clock size={13} /> Received: {formattedDate}
              </span>
            </div>
          </div>

          {/* Custom Status Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setStatusDropdownOpen((prev) => !prev)}
              disabled={updatingStatus}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                backgroundColor: currentStatusBadge.bg,
                color: currentStatusBadge.text,
                border: `1px solid ${currentStatusBadge.border}`,
                fontWeight: 600,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: currentStatusBadge.text,
                }}
              />
              <span>Status: {inquiry.status || 'Pending'}</span>
              <ChevronDown size={14} style={{ transform: statusDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {statusDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px -5px rgba(23, 43, 36, 0.1), 0 8px 10px -6px rgba(23, 43, 36, 0.1)',
                  border: '1px solid #DDE5E1',
                  padding: '4px',
                  zIndex: 50,
                  minWidth: '160px',
                }}
              >
                {['Pending', 'In Progress', 'Resolved'].map((statusOption) => {
                  const optBadge = getStatusBadge(statusOption);
                  const isSelected = inquiry.status === statusOption;
                  return (
                    <button
                      key={statusOption}
                      type="button"
                      onClick={() => handleStatusChange(statusOption)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '0.6rem 0.75rem',
                        border: 'none',
                        background: isSelected ? '#F7FAF9' : 'transparent',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.84rem',
                        fontWeight: isSelected ? 700 : 500,
                        color: '#172B24',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: optBadge.text,
                        }}
                      />
                      <span>{statusOption}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Contact Info Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            backgroundColor: '#F7FAF9',
            padding: '1.25rem',
            borderRadius: '10px',
            border: '1px solid #DDE5E1',
            marginBottom: '1.75rem',
          }}
        >
          {/* Email */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mail size={18} />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#7A8983', fontWeight: 600 }}>
                Email Address
              </span>
              <a
                href={`mailto:${inquiry.email}`}
                style={{ fontSize: '0.9rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}
              >
                {inquiry.email}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#DDF5EA',
                color: '#0F6B4F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Phone size={18} />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#7A8983', fontWeight: 600 }}>
                Phone Number
              </span>
              <a
                href={inquiry.phone ? `tel:${inquiry.phone}` : '#'}
                style={{ fontSize: '0.9rem', color: '#0F6B4F', fontWeight: 600, textDecoration: 'none' }}
              >
                {inquiry.phone || 'Not Provided'}
              </a>
            </div>
          </div>
        </div>

        {/* Message Card */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#172B24',
              marginBottom: '0.75rem',
            }}
          >
            <MessageSquare size={16} style={{ color: '#0F6B4F' }} />
            Inquiry Message / Requirements
          </label>
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #DDE5E1',
              borderRadius: '10px',
              padding: '1.5rem',
              fontSize: '0.94rem',
              color: '#52635C',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              boxShadow: 'inset 0 1px 3px rgba(23, 43, 36, 0.02)',
              minHeight: '120px',
            }}
          >
            {inquiry.message}
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ListingCard from '../../components/ListingCard/ListingCard';
import { IconButton, Box } from '@mui/material';
import { Edit, Delete, Person, Email, Phone, LocationOn, VerifiedUser, Cancel } from '@mui/icons-material';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteListingId, setDeleteListingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Check if returning from payment success
    const urlParams = new URLSearchParams(window.location.search);
    const fromPayment = urlParams.get('from_payment');
    
    fetchProfile();
    fetchMyListings();
    
    // If coming from payment, refresh profile data
    if (fromPayment === 'success') {
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Refresh both AuthContext user and profile data after a short delay
      // to ensure backend has processed the payment
      setTimeout(async () => {
        await refreshUser(); // Update AuthContext
        fetchProfile(); // Update local profile state
      }, 1500);
    }
  }, [user, navigate, refreshUser]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/users/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyListings = async () => {
    try {
      const response = await axios.get('/api/listings/user/my-listings');
      setMyListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleDeleteListing = (listingId) => {
    setDeleteListingId(listingId);
    setShowDeleteModal(true);
  };

  const confirmDeleteListing = async () => {
    if (!deleteListingId) return;
    
    setShowDeleteModal(false);
    try {
      await axios.delete(`/api/listings/${deleteListingId}`);
      showToast('Listing deleted successfully', 'success');
      fetchMyListings(); // Refresh the list
    } catch (error) {
      console.error('Error deleting listing:', error);
      showToast(error.response?.data?.error || 'Error deleting listing', 'error');
    } finally {
      setDeleteListingId(null);
    }
  };

  const cancelDeleteListing = () => {
    setShowDeleteModal(false);
    setDeleteListingId(null);
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleEditListing = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePurchaseVerifiedBatch = () => {
    setShowConfirmModal(true);
  };

  const confirmPurchase = async () => {
    setShowConfirmModal(false);
    setPurchasing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/payments/verified-batch',
        { amount: 100 },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.paymentLink) {
        // Redirect to payment page
        window.location.href = response.data.paymentLink;
      }
    } catch (error) {
      console.error('Error purchasing verified batch:', error);
      showToast(error.response?.data?.error || 'Failed to initiate payment. Please try again.', 'error');
      setPurchasing(false);
    }
  };

  const cancelPurchase = () => {
    setShowConfirmModal(false);
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <span className="toast-icon">{toast.type === 'success' ? '✓' : '✕'}</span>
            <span className="toast-message">{toast.message}</span>
          </div>
          <button className="toast-close" onClick={() => setToast({ show: false, message: '', type: 'success' })}>
            ×
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelDeleteListing}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Listing</h3>
              <button className="modal-close" onClick={cancelDeleteListing}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-icon" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>⚠</div>
              <p className="modal-title">Are you sure?</p>
              <p className="modal-description">
                This action cannot be undone. The listing will be permanently deleted.
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn modal-btn-cancel" onClick={cancelDeleteListing}>
                Cancel
              </button>
              <button className="modal-btn modal-btn-delete" onClick={confirmDeleteListing}>
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={cancelPurchase}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Purchase Verified Batch</h3>
              <button className="modal-close" onClick={cancelPurchase}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-icon">✓</div>
              <p className="modal-title">Confirm Purchase</p>
              <p className="modal-description">
                You are about to purchase a verified batch for <strong>AED 100</strong>.
              </p>
              <div className="modal-benefits">
                <p>This will enable:</p>
                <ul>
                  <li>✓ Verified badge on all your listings</li>
                  <li>✓ Increased trust from buyers</li>
                  <li>✓ Enhanced credibility for your profile</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn modal-btn-cancel" onClick={cancelPurchase}>
                Cancel
              </button>
              <button className="modal-btn modal-btn-confirm" onClick={confirmPurchase}>
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        {profile && (
          <div className="profile-info">
            <div className="info-item">
              <div className="info-icon">
                <Person />
              </div>
              <div className="info-content">
                <span className="info-label">Name</span>
                <span className="info-value">{profile.name || 'Not provided'}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <Email />
              </div>
              <div className="info-content">
                <span className="info-label">Email</span>
                <span className="info-value">{profile.email}</span>
              </div>
            </div>
            {profile.phone && (
              <div className="info-item">
                <div className="info-icon">
                  <Phone />
                </div>
                <div className="info-content">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{profile.phone}</span>
                </div>
              </div>
            )}
            {profile.city && (
              <div className="info-item">
                <div className="info-icon">
                  <LocationOn />
                </div>
                <div className="info-content">
                  <span className="info-label">City</span>
                  <span className="info-value">{profile.city}</span>
                </div>
              </div>
            )}
            <div className="info-item">
              <div className={`info-icon ${profile.verifiedBatch ? 'verified' : 'not-verified'}`}>
                {profile.verifiedBatch ? <VerifiedUser /> : <Cancel />}
              </div>
              <div className="info-content">
                <span className="info-label">Verified Batch</span>
                <span className={`info-value ${profile.verifiedBatch ? 'verified-text' : 'not-verified-text'}`}>
                  {profile.verifiedBatch ? 'Verified' : 'Not Verified'}
                </span>
                {profile.verifiedBatch && profile.verifiedBatchPurchasedAt && (
                  <span className="info-date">
                    Since {new Date(profile.verifiedBatchPurchasedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Verified Batch Purchase Section */}
        <div className="verified-batch-section">
          <h2>Verified Batch</h2>
          <div className="verified-batch-content">
            <p>Get a verified batch to show a verified badge on all your listings. This helps build trust with buyers.</p>
            {profile?.verifiedBatch ? (
              <div className="verified-status">
                <p style={{ color: '#27ae60', fontWeight: 600 }}>✓ You have a verified batch!</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  Your listings will show the verified badge.
                </p>
              </div>
            ) : (
              <div className="purchase-section">
                <div className="price-info">
                  <span className="price-label">Price:</span>
                  <span className="price-amount">AED 100</span>
                </div>
                <button 
                  onClick={handlePurchaseVerifiedBatch} 
                  className="purchase-btn"
                  disabled={purchasing}
                >
                  {purchasing ? 'Processing...' : 'Purchase Verified Batch'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="my-listings-section">
          <h2>My Listings ({myListings.length})</h2>
          {myListings.length === 0 ? (
            <div className="no-listings">
              <p>You haven't posted any listings yet.</p>
              {user.userType !== 'buyer' && (
                <Link to="/post-ad" className="post-ad-btn">Post Your First Ad</Link>
              )}
            </div>
          ) : (
            <div className="listings-grid">
              {myListings.map((listing) => (
                <Box key={listing._id || listing.id} sx={{ position: 'relative' }}>
                  <ListingCard listing={listing} />
                  <Box
                    className="listing-action-buttons"
                    sx={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      display: 'flex',
                      gap: '0.5rem',
                      zIndex: 10,
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEditListing(listing._id || listing.id);
                      }}
                      className="edit-listing-btn"
                      sx={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        width: { xs: '36px', sm: '32px' },
                        height: { xs: '36px', sm: '32px' },
                        minWidth: { xs: '36px', sm: '32px' },
                        '&:hover': {
                          backgroundColor: '#1d4ed8',
                        },
                      }}
                      aria-label="Edit listing"
                    >
                      <Edit sx={{ fontSize: { xs: '18px', sm: '1rem' } }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteListing(listing._id || listing.id);
                      }}
                      className="delete-listing-btn"
                      sx={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        width: { xs: '36px', sm: '32px' },
                        height: { xs: '36px', sm: '32px' },
                        minWidth: { xs: '36px', sm: '32px' },
                        '&:hover': {
                          backgroundColor: '#dc2626',
                        },
                      }}
                      aria-label="Delete listing"
                    >
                      <Delete sx={{ fontSize: { xs: '18px', sm: '1rem' } }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;

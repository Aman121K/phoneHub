import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ListingCard from '../../components/ListingCard/ListingCard';
import {
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  VerifiedUser,
  Info,
} from '@mui/icons-material';
import { getFirstName, getFirstNameInitial } from '../../utils/nameUtils';
import './ListingDetail.css';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarListings, setSimilarListings] = useState([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reporting, setReporting] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);

  const fetchListing = useCallback(async () => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      setListing(response.data);
    } catch (error) {
      console.error('Error fetching listing:', error);
      // Mock listing for testing
      const mockListing = {
        _id: id,
        title: 'iPhone 15 Pro Max 256GB - Brand New',
        price: 4500,
        condition: 'Brand New',
        storage: '256GB',
        city: 'Dubai',
        listingType: 'fixed_price',
        description: 'Brand new iPhone 15 Pro Max in Natural Titanium. Still sealed in box. Full warranty. Perfect condition. All accessories included.',
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
        ],
        user: { name: 'Ahmed Al Maktoum', city: 'Dubai', phone: '+971501234567' },
        category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', _id: 'cat1' },
        createdAt: new Date('2025-01-10')
      };
      setListing(mockListing);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchSimilarListings = useCallback(async () => {
    try {
      const categorySlug = listing.category?.slug || listing.category_slug;
      
      if (categorySlug) {
        const response = await axios.get(`/api/listings?category=${categorySlug}&limit=10`);
        // Filter out current listing
        const filtered = response.data.filter(item => 
          (item._id || item.id) !== (listing._id || listing.id)
        );
        setSimilarListings(filtered.slice(0, 8));
      } else {
        // Use mock similar listings
        const mockSimilar = [
          {
            _id: 'sim1',
            title: 'iPhone 15 Pro Max 512GB - Excellent',
            price: 5000,
            condition: 'Excellent',
            storage: '512GB',
            city: 'Abu Dhabi',
            listingType: 'fixed_price',
            imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
            images: [
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
              'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop'
            ],
            user: { name: 'Sarah Johnson', city: 'Abu Dhabi' },
            category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
            createdAt: new Date('2025-01-14')
          },
          {
            _id: 'sim2',
            title: 'iPhone 15 Pro Max 1TB - Premium',
            price: 5500,
            condition: 'Brand New',
            storage: '1TB',
            city: 'Dubai',
            listingType: 'fixed_price',
            imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
            images: [
              'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
              'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop'
            ],
            user: { name: 'Mohammed Ali', city: 'Dubai' },
            category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
            createdAt: new Date('2025-01-13')
          },
          {
            _id: 'sim3',
            title: 'iPhone 15 Pro Max 256GB - Good',
            price: 4200,
            condition: 'Good',
            storage: '256GB',
            city: 'Sharjah',
            listingType: 'fixed_price',
            imageUrl: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
            images: [
              'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
              'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
            ],
            user: { name: 'Fatima Hassan', city: 'Sharjah' },
            category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
            createdAt: new Date('2025-01-12')
          },
          {
            _id: 'sim4',
            title: 'iPhone 15 Pro Max 512GB - Brand New',
            price: 5200,
            condition: 'Brand New',
            storage: '512GB',
            city: 'Dubai',
            listingType: 'fixed_price',
            imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
            images: [
              'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'
            ],
            user: { name: 'Omar Al Zaabi', city: 'Dubai' },
            category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
            createdAt: new Date('2025-01-11')
          },
          {
            _id: 'sim5',
            title: 'iPhone 15 Pro Max 256GB - Excellent',
            price: 4400,
            condition: 'Excellent',
            storage: '256GB',
            city: 'Abu Dhabi',
            listingType: 'fixed_price',
            imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
            images: [
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
              'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
              'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop'
            ],
            user: { name: 'Layla Ahmed', city: 'Abu Dhabi' },
            category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
            createdAt: new Date('2025-01-09')
          },
          {
            _id: 'sim6',
            title: 'iPhone 15 Pro Max 1TB - Good',
            price: 5300,
            condition: 'Good',
            storage: '1TB',
            city: 'Dubai',
            listingType: 'fixed_price',
            imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
            images: [
              'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
              'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop'
            ],
            user: { name: 'Khalid Al Mansoori', city: 'Dubai' },
            category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
            createdAt: new Date('2025-01-08')
          }
        ];
        // Filter out current listing
        const filtered = mockSimilar.filter(item => 
          (item._id || item.id) !== (listing._id || listing.id)
        );
        setSimilarListings(filtered);
      }
    } catch (error) {
      console.error('Error fetching similar listings:', error);
      // Use mock similar listings on error
      const mockSimilar = [
        {
          _id: 'sim1',
          title: 'iPhone 15 Pro Max 512GB - Excellent',
          price: 5000,
          condition: 'Excellent',
          storage: '512GB',
          city: 'Abu Dhabi',
          listingType: 'fixed_price',
          imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop'
          ],
          user: { name: 'Sarah Johnson', city: 'Abu Dhabi' },
          category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
          createdAt: new Date('2025-01-14')
        },
        {
          _id: 'sim2',
          title: 'iPhone 15 Pro Max 1TB - Premium',
          price: 5500,
          condition: 'Brand New',
          storage: '1TB',
          city: 'Dubai',
          listingType: 'fixed_price',
          imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop'
          ],
          user: { name: 'Mohammed Ali', city: 'Dubai' },
          category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
          createdAt: new Date('2025-01-13')
        },
        {
          _id: 'sim3',
          title: 'iPhone 15 Pro Max 256GB - Good',
          price: 4200,
          condition: 'Good',
          storage: '256GB',
          city: 'Sharjah',
          listingType: 'fixed_price',
          imageUrl: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
          ],
          user: { name: 'Fatima Hassan', city: 'Sharjah' },
          category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
          createdAt: new Date('2025-01-12')
        },
        {
          _id: 'sim4',
          title: 'iPhone 15 Pro Max 512GB - Brand New',
          price: 5200,
          condition: 'Brand New',
          storage: '512GB',
          city: 'Dubai',
          listingType: 'fixed_price',
          imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'
          ],
          user: { name: 'Omar Al Zaabi', city: 'Dubai' },
          category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
          createdAt: new Date('2025-01-11')
        },
        {
          _id: 'sim5',
          title: 'iPhone 15 Pro Max 256GB - Excellent',
          price: 4400,
          condition: 'Excellent',
          storage: '256GB',
          city: 'Abu Dhabi',
          listingType: 'fixed_price',
          imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop'
          ],
          user: { name: 'Layla Ahmed', city: 'Abu Dhabi' },
          category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
          createdAt: new Date('2025-01-09')
        },
        {
          _id: 'sim6',
          title: 'iPhone 15 Pro Max 1TB - Good',
          price: 5300,
          condition: 'Good',
          storage: '1TB',
          city: 'Dubai',
          listingType: 'fixed_price',
          imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop'
          ],
          user: { name: 'Khalid Al Mansoori', city: 'Dubai' },
          category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
          createdAt: new Date('2025-01-08')
        }
      ];
      // Filter out current listing
      const filtered = mockSimilar.filter(item => 
        (item._id || item.id) !== (listing._id || listing.id)
      );
      setSimilarListings(filtered);
    }
  }, [listing]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  useEffect(() => {
    if (listing) {
      fetchSimilarListings();
    }
  }, [listing, fetchSimilarListings]);

  // Get listing images - support both images array and single imageUrl
  const getListingImages = () => {
    if (!listing) return [];
    if (listing.images && Array.isArray(listing.images) && listing.images.length > 0) {
      return listing.images.filter(img => img);
    }
    if (listing.imageUrl || listing.image_url) {
      const singleImage = listing.imageUrl || listing.image_url;
      // Return multiple different images for horizontal scroll effect
      return [
        singleImage,
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
      ];
    }
    // Return placeholder images for scrolling demo
    return [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
    ];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/users/messages', {
        receiver_id: listing.user?._id || listing.user_id,
        listing_id: listing._id || listing.id,
        message: message
      });
      alert('Message sent successfully!');
      setMessage('');
      setShowMessageForm(false);
    } catch (error) {
      alert('Error sending message');
    }
  };

  const handlePreviousImage = () => {
    const images = getListingImages();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    const images = getListingImages();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };


  const handleVerificationInfoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVerificationModalOpen(true);
  };

  const handleCloseModal = () => {
    setVerificationModalOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!listing) {
    return <div className="error">Listing not found</div>;
  }

  const images = getListingImages();

  return (
    <div className="listing-detail-page">
      <div className="listing-detail-container">
        {/* Image Section */}
        <div className="listing-image-section">
          {images.length > 0 ? (
            <div className="main-image-wrapper">
              <img 
                src={images[currentImageIndex]} 
                alt={`${listing.title} ${currentImageIndex + 1}`}
                className="main-product-image"
                onError={(e) => {
                  e.target.src = '/logo.png';
                }}
              />
              {images.length > 1 && (
                <>
                  <button 
                    className="image-nav-btn image-nav-left"
                    onClick={handlePreviousImage}
                    aria-label="Previous image"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                    className="image-nav-btn image-nav-right"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <div className="image-counter">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="main-image-wrapper placeholder">
              <img src="/logo.png" alt="PhoneHub Logo" className="main-product-image" />
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="listing-details-card">
          {/* Product Title */}
          <h1 className="product-title">{listing.title}</h1>

          {/* Product Attributes */}
          <div className="product-attributes">
            <div className="attribute-item">
              <span className="attribute-label">Condition</span>
              <span className="attribute-value">{listing.condition || 'N/A'}</span>
            </div>
            <div className="attribute-item">
              <span className="attribute-label">Storage</span>
              <span className="attribute-value">{listing.storage || 'N/A'}</span>
            </div>
            {listing.version && (
              <div className="attribute-item">
                <span className="attribute-label">Version</span>
                <span className="attribute-value">{listing.version}</span>
              </div>
            )}
            {listing.colour && (
              <div className="attribute-item">
                <span className="attribute-label">Color</span>
                <span className="attribute-value">{listing.colour}</span>
              </div>
            )}
            <div className="attribute-item">
              <span className="attribute-label">Warranty</span>
              <span className="attribute-value">{listing.warranty ? 'Yes' : 'No'}</span>
            </div>
            {listing.charge !== undefined && (
              <div className="attribute-item">
                <span className="attribute-label">Charger Included</span>
                <span className="attribute-value">{listing.charge === 'Yes' || listing.charge === true ? 'Yes' : 'No'}</span>
              </div>
            )}
            {listing.box !== undefined && (
              <div className="attribute-item">
                <span className="attribute-label">Box Included</span>
                <span className="attribute-value">{listing.box === 'Yes' || listing.box === true ? 'Yes' : 'No'}</span>
              </div>
            )}
            {listing.quantity && (
              <div className="attribute-item">
                <span className="attribute-label">Quantity</span>
                <span className="attribute-value">{listing.quantity}</span>
              </div>
            )}
          </div>

          {/* Seller Information */}
          <div className="seller-info-section">
            <div className="seller-avatar">
              <span className="seller-avatar-text">
                {getFirstNameInitial(listing.user?.name || listing.seller_name || 'Seller').toUpperCase()}
              </span>
            </div>
            <div className="seller-details">
              <span className="seller-name">
                {getFirstName(listing.user?.name || listing.seller_name || 'Seller')}
              </span>
              {listing.seller_business_name && (
                <span className="seller-business">{listing.seller_business_name}</span>
              )}
              {listing.seller_type && (
                <span className="seller-type">{listing.seller_type === 'business' ? 'Business Seller' : 'Individual Seller'}</span>
              )}
              {listing.seller_city && (
                <span className="seller-city">
                  <i className="fas fa-map-marker-alt"></i> {listing.seller_city}
                </span>
              )}
            </div>
          </div>

          {/* Verified Seller Bar (OLX Style) */}
          {listing.user?.verifiedBatch && (
            <div 
              className="verified-seller-bar"
              style={{
                backgroundColor: '#e3f2fd',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '8px',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <VerifiedUser style={{ fontSize: '1.125rem', color: '#1976d2' }} />
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#1976d2',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  VERIFIED SELLER
                </span>
              </div>
              <IconButton
                onClick={handleVerificationInfoClick}
                style={{
                  padding: '0.25rem',
                }}
                size="small"
              >
                <Info style={{ fontSize: '1rem', color: '#1976d2' }} />
              </IconButton>
            </div>
          )}

          {/* Separator */}
          <div className="detail-separator"></div>

          {/* Location and Price */}
          <div className="location-price-section">
            <div className="location-info">
              <i className="fas fa-map-marker-alt location-icon"></i>
              <span className="location-text">{listing.city || listing.seller_city || 'Dubai'}</span>
            </div>
            <div className="price-info">
              {listing.listingType === 'auction' ? (
                <div className="auction-price-info">
                  {listing.current_price && (
                    <div className="price-row">
                      <span className="price-label">Current Bid:</span>
                      <span className="price-amount">AED {listing.current_price}</span>
                    </div>
                  )}
                  {listing.start_price && (
                    <div className="price-row">
                      <span className="price-label">Starting Price:</span>
                      <span className="price-amount-small">AED {listing.start_price}</span>
                    </div>
                  )}
                  {listing.bids && Array.isArray(listing.bids) && listing.bids.length > 0 && (
                    <div className="price-row">
                      <span className="price-label">Total Bids:</span>
                      <span className="price-amount-small">{listing.bids.length}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="fixed-price-info">
                  <span className="price-amount">AED {listing.price || listing.current_price || listing.start_price || 'N/A'}</span>
                  {listing.perPrice && (
                    <span className="price-per-unit">AED {listing.perPrice} per unit</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Category Information */}
          {listing.category_name && (
            <div className="category-info-section">
              <div className="info-item">
                <span className="info-label">Category:</span>
                <span className="info-value">{listing.category_name}</span>
              </div>
              {listing.listingType && (
                <div className="info-item">
                  <span className="info-label">Listing Type:</span>
                  <span className="info-value">{listing.listingType === 'auction' ? 'Auction' : 'Fixed Price'}</span>
                </div>
              )}
              {listing.sellType && (
                <div className="info-item">
                  <span className="info-label">Sell Type:</span>
                  <span className="info-value">{listing.sellType === 'single' ? 'Single Sell' : 'Bulk Sell'}</span>
                </div>
              )}
            </div>
          )}

          {/* Auction Information */}
          {listing.listingType === 'auction' && (
            <div className="auction-info-section">
              <h3 className="section-subtitle">Auction Details</h3>
              {listing.status && (
                <div className="info-item">
                  <span className="info-label">Status:</span>
                  <span className={`info-value status-${listing.status}`}>{listing.status}</span>
                </div>
              )}
              {listing.end_date && (
                <div className="info-item">
                  <span className="info-label">End Date:</span>
                  <span className="info-value">{new Date(listing.end_date).toLocaleString()}</span>
                </div>
              )}
              {listing.bids && Array.isArray(listing.bids) && listing.bids.length > 0 && (
                <div className="bids-section">
                  <h4 className="bids-title">Bids ({listing.bids.length})</h4>
                  <div className="bids-list">
                    {listing.bids.slice(0, 5).map((bid, index) => (
                      <div key={index} className="bid-item">
                        <span className="bid-amount">AED {bid.amount || bid.bidAmount || 'N/A'}</span>
                        {bid.bidder_name && (
                          <span className="bidder-name">by {bid.bidder_name}</span>
                        )}
                        {bid.createdAt && (
                          <span className="bid-date">{new Date(bid.createdAt).toLocaleString()}</span>
                        )}
                      </div>
                    ))}
                    {listing.bids.length > 5 && (
                      <div className="bid-item more-bids">
                        <span>+{listing.bids.length - 5} more bids</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Listing Metadata */}
          <div className="metadata-section">
            {listing.createdAt && (
              <div className="info-item">
                <span className="info-label">Listed On:</span>
                <span className="info-value">{new Date(listing.createdAt).toLocaleString()}</span>
              </div>
            )}
            {listing.updatedAt && listing.updatedAt !== listing.createdAt && (
              <div className="info-item">
                <span className="info-label">Last Updated:</span>
                <span className="info-value">{new Date(listing.updatedAt).toLocaleString()}</span>
              </div>
            )}
            {listing.listing_id && (
              <div className="info-item">
                <span className="info-label">Listing ID:</span>
                <span className="info-value">{listing.listing_id}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {user && user.id !== (listing.user?._id || listing.user_id) ? (
            <div className="action-buttons-section">
              <button 
                className="send-message-btn"
                onClick={() => setShowMessageForm(true)}
              >
                <i className="fas fa-envelope"></i>
                Send Message
              </button>
              {(listing.user?.phone || listing.seller_phone) && (
                <a 
                  href={`tel:${listing.user?.phone || listing.seller_phone}`}
                  className="call-seller-btn"
                >
                  <i className="fas fa-phone"></i>
                  Call Seller
                </a>
              )}
            </div>
          ) : !user ? (
            <div className="action-buttons-section">
              <Link to="/login" className="send-message-btn">
                <i className="fas fa-envelope"></i>
                Send Message
              </Link>
              {(listing.user?.phone || listing.seller_phone) ? (
                <a 
                  href={`tel:${listing.user?.phone || listing.seller_phone}`}
                  className="call-seller-btn"
                >
                  <i className="fas fa-phone"></i>
                  Call Seller
                </a>
              ) : (
                <Link to="/login" className="call-seller-btn">
                  <i className="fas fa-phone"></i>
                  Call Seller
                </Link>
              )}
            </div>
          ) : null}

          {/* Report Button */}
          {user && user.id !== (listing.user?._id || listing.user_id) && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button
                onClick={() => setShowReportForm(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid #dc2626',
                  color: '#dc2626',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                <i className="fas fa-flag"></i> Report This Listing
              </button>
            </div>
          )}

          {/* Description Section */}
          {listing.description && (
              <div className="description-section">
                <h3 className="description-title">Description</h3>
                <p className="description-text">{listing.description}</p>
              </div>
          )}
        </div>

        {/* Message Form Modal */}
        {showMessageForm && user && (
          <div className="message-overlay" onClick={() => setShowMessageForm(false)}>
            <div className="message-form-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Send Message</h3>
              <form onSubmit={handleSendMessage} className="message-form">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  required
                  rows="4"
                />
                <div className="message-actions">
                  <button type="submit" className="send-btn">
                    <i className="fas fa-paper-plane"></i>
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMessageForm(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Report Form Modal */}
        {showReportForm && user && (
          <div className="message-overlay" onClick={() => setShowReportForm(false)}>
            <div className="message-form-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Report This Listing</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                if (!reportReason) {
                  alert('Please select a reason');
                  return;
                }
                setReporting(true);
                try {
                  await axios.post('/api/reports', {
                    listing_id: listing._id || listing.id,
                    reason: reportReason,
                    description: reportDescription
                  });
                  alert('Report submitted successfully. Thank you for helping us maintain a safe marketplace.');
                  setShowReportForm(false);
                  setReportReason('');
                  setReportDescription('');
                } catch (error) {
                  alert(error.response?.data?.error || 'Error submitting report');
                } finally {
                  setReporting(false);
                }
              }} className="message-form">
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Reason *</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #e5e7eb' }}
                  >
                    <option value="">Select a reason</option>
                    <option value="Spam or Scam">Spam or Scam</option>
                    <option value="Inappropriate Content">Inappropriate Content</option>
                    <option value="Misleading Information">Misleading Information</option>
                    <option value="Duplicate Listing">Duplicate Listing</option>
                    <option value="Wrong Category">Wrong Category</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description (Optional)</label>
                  <textarea
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Provide additional details..."
                    rows="4"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #e5e7eb' }}
                  />
                </div>
                <div className="message-actions">
                  <button type="submit" className="send-btn" disabled={reporting}>
                    <i className="fas fa-flag"></i>
                    {reporting ? 'Submitting...' : 'Submit Report'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReportForm(false);
                      setReportReason('');
                      setReportDescription('');
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Similar Products Section */}
      {similarListings.length > 0 && (
        <div className="similar-products-section">
          <div className="section-header">
            <h2 className="section-title">Similar Products</h2>
            <Link 
              to={`/category/${listing.category?.slug || listing.category_slug || 'iphone'}`} 
              className="view-all-link"
            >
              View All
              <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
          <div className="similar-products-grid">
            {similarListings.map((similarListing) => (
              <ListingCard key={similarListing._id || similarListing.id} listing={similarListing} />
            ))}
          </div>
        </div>
      )}

      {/* Verification Info Modal */}
      <Modal
        open={verificationModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={verificationModalOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '400px' },
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              padding: '24px',
              outline: 'none',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mb: '20px' }}>
              <Box
                sx={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#e3f2fd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VerifiedUser sx={{ fontSize: '28px', color: '#1976d2' }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1f2937',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Verified Seller
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  This seller is verified
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: '20px' }} />

            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  mb: '8px',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Verified Since
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#1f2937',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {formatDate(listing?.user?.verifiedBatchPurchasedAt)}
              </Typography>
            </Box>

            <Box sx={{ mt: '24px', pt: '20px', borderTop: '1px solid #e5e7eb' }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.8125rem',
                  color: '#6b7280',
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                This seller has completed our verification process and has been verified since the purchase date shown above.
              </Typography>
            </Box>

            <Box sx={{ mt: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  backgroundColor: '#f3f4f6',
                  '&:hover': {
                    backgroundColor: '#e5e7eb',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Close
                </Typography>
              </IconButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ListingDetail;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ListingCard from '../../components/ListingCard/ListingCard';
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
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarListings, setSimilarListings] = useState([]);

  useEffect(() => {
    fetchListing();
  }, [id]);

  useEffect(() => {
    if (listing) {
      fetchSimilarListings();
    }
  }, [listing]);

  const fetchListing = async () => {
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
  };

  const fetchSimilarListings = async () => {
    try {
      const categoryId = listing.category?._id || listing.category_id;
      const categorySlug = listing.category?.slug;
      
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
  };

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

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: listing.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality with backend
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
                alt={`${listing.title} - Image ${currentImageIndex + 1}`}
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
              <span className="attribute-label">Age</span>
              <span className="attribute-value">{listing.condition || 'Brand New'}</span>
            </div>
            <div className="attribute-item">
              <span className="attribute-label">Color</span>
              <span className="attribute-value">{listing.color || 'Other'}</span>
            </div>
            <div className="attribute-item">
              <span className="attribute-label">Warranty</span>
              <span className="attribute-value">{listing.warranty ? 'Yes' : 'No'}</span>
            </div>
          </div>

          {/* Separator */}
          <div className="detail-separator"></div>

          {/* Seller Information */}
          <div className="seller-info-section">
            <div className="seller-avatar">
              <span className="seller-avatar-text">
                {(listing.user?.name || listing.seller_name || 'Seller').charAt(0).toLowerCase()}
              </span>
            </div>
            <span className="seller-name">{listing.user?.name || listing.seller_name || 'Seller'}</span>
          </div>

          {/* Separator */}
          <div className="detail-separator"></div>

          {/* Location and Price */}
          <div className="location-price-section">
            <div className="location-info">
              <i className="fas fa-map-marker-alt location-icon"></i>
              <span className="location-text">{listing.city || 'Dubai'}</span>
            </div>
            <div className="price-info">
              <span className="price-amount">AED {listing.price}</span>
            </div>
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
              {listing.user?.phone && (
                <a 
                  href={`tel:${listing.user.phone}`}
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
              {listing.user?.phone ? (
                <a 
                  href={`tel:${listing.user.phone}`}
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

          {/* Description Section */}
          {listing.description && (
            <>
              <div className="detail-separator"></div>
              <div className="description-section">
                <h3 className="description-title">Description</h3>
                <p className="description-text">{listing.description}</p>
              </div>
            </>
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
      </div>

      {/* Similar Products Section */}
      {similarListings.length > 0 && (
        <div className="similar-products-section">
          <div className="section-header">
            <h2 className="section-title">Similar Products</h2>
            <Link 
              to={`/category/${listing.category?.slug || 'iphone'}`} 
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
    </div>
  );
};

export default ListingDetail;


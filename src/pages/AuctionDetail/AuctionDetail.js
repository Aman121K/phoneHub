import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AuctionCard from '../../components/AuctionCard/AuctionCard';
import './AuctionDetail.css';

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [bidding, setBidding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarAuctions, setSimilarAuctions] = useState([]);

  useEffect(() => {
    fetchAuction();
    const interval = setInterval(fetchAuction, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    if (auction) {
      fetchSimilarAuctions();
    }
  }, [auction]);

  const fetchAuction = async () => {
    try {
      const response = await axios.get(`/api/auctions/${id}`);
      if (response.data && (response.data.id || response.data._id)) {
        setAuction(response.data);
        if (response.data.current_price) {
          setBidAmount((parseFloat(response.data.current_price) + 10).toFixed(2));
        }
      } else {
        setAuction(null);
      }
    } catch (error) {
      console.error('Error fetching auction:', error);
      if (error.response?.status === 404 || error.response?.status === 500) {
        setAuction(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarAuctions = async () => {
    try {
      const response = await axios.get('/api/auctions?limit=8');
      const filtered = response.data.filter(item => 
        (item._id || item.id) !== (auction._id || auction.id)
      );
      setSimilarAuctions(filtered.slice(0, 8));
    } catch (error) {
      console.error('Error fetching similar auctions:', error);
    }
  };

  const getAuctionImages = () => {
    if (!auction) return [];
    // Check for images array first
    if (auction.images && Array.isArray(auction.images) && auction.images.length > 0) {
      return auction.images.filter(img => img && img.trim() !== '');
    }
    // Fallback to image_url
    if (auction.image_url) {
      return [auction.image_url];
    }
    // Return placeholder if no images
    return [];
  };

  const handleBid = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setBidding(true);
    try {
      await axios.post(`/api/auctions/${id}/bid`, {
        bid_amount: parseFloat(bidAmount)
      });
      alert('Bid placed successfully!');
      fetchAuction();
      if (auction.current_price) {
        setBidAmount((parseFloat(auction.current_price) + 10).toFixed(2));
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Error placing bid');
    } finally {
      setBidding(false);
    }
  };

  const handlePreviousImage = () => {
    const images = getAuctionImages();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    const images = getAuctionImages();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="auction-detail-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!auction || (!auction.id && !auction._id)) {
    return (
      <div className="auction-detail-page">
        <div className="auction-not-found-container">
          <div className="not-found-content">
            <div className="not-found-emoji">😕</div>
            <h2 className="not-found-title">Auction Not Found</h2>
            <p className="not-found-message">
              Oops! The auction you're looking for doesn't exist or may have been removed.
            </p>
            <div className="not-found-actions">
              <Link to="/auctions" className="not-found-btn primary">
                Browse Live Auctions
              </Link>
              <Link to="/" className="not-found-btn secondary">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isEnded = auction.end_date ? new Date(auction.end_date) < new Date() : false;
  const isLive = auction.status === 'live' && !isEnded;
  const images = getAuctionImages();

  return (
    <div className="auction-detail-page">
      <div className="auction-detail-container">
        {/* Image Section */}
        <div className="listing-image-section">
          {images.length > 0 ? (
            <div className="main-image-wrapper">
              <img 
                src={images[currentImageIndex]} 
                alt={`${auction.title} - Image ${currentImageIndex + 1}`}
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
              {isLive && (
                <div className="live-badge-overlay">
                  <span className="live-badge-text">LIVE</span>
                </div>
              )}
            </div>
          ) : (
            <div className="main-image-wrapper placeholder">
              <img src="/logo.png" alt="PhoneHub Logo" className="main-product-image" />
            </div>
          )}
        </div>

        {/* Details Card */}
        <div className="listing-details-card">
          {/* Product Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
            <h2 className="product-title">{auction.title}</h2>
            {isLive ? (
              <div className="status-badge-live">LIVE</div>
            ) : (
              <div className="status-badge-ended">ENDED</div>
            )}
          </div>

          {/* Auction Attributes */}
          <div className="product-attributes">
            <div className="attribute-item">
              <span className="attribute-label">Category</span>
              <span className="attribute-value">{auction.category_name || 'N/A'}</span>
            </div>
            <div className="attribute-item">
              <span className="attribute-label">Start Price</span>
              <span className="attribute-value">AED {auction.start_price}</span>
            </div>
            <div className="attribute-item">
              <span className="attribute-label">Total Bids</span>
              <span className="attribute-value">{auction.bids?.length || 0}</span>
            </div>
            {!isEnded && (
              <div className="attribute-item">
                <span className="attribute-label">Ends</span>
                <span className="attribute-value">{new Date(auction.end_date).toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Seller Information */}
          <div className="seller-info-section">
            <div className="seller-avatar">
              <span className="seller-avatar-text">
                {(auction.seller_name || 'Seller').charAt(0).toLowerCase()}
              </span>
            </div>
            <span className="seller-name">{auction.seller_name || 'Seller'}</span>
          </div>

          {/* Separator */}
          <div className="detail-separator"></div>

          {/* Location and Current Price */}
          <div className="location-price-section">
            <div className="location-info">
              <i className="fas fa-map-marker-alt location-icon"></i>
              <span className="location-text">{auction.city || 'Dubai'}</span>
            </div>
            <div className="price-info">
              <span className="price-amount">AED {auction.current_price}</span>
            </div>
          </div>

          {/* Bid Section */}
          {isLive ? (
            <div className="bid-section-card">
              <h3 className="bid-section-title">Place Your Bid</h3>
              {user ? (
                <form onSubmit={handleBid} className="bid-form">
                  <div className="form-group">
                    <label>Bid Amount (AED)</label>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={parseFloat(auction.current_price) + 1}
                      step="0.01"
                      required
                      className="bid-input"
                    />
                    <small>Minimum bid: AED {parseFloat(auction.current_price) + 1}</small>
                  </div>
                  <button type="submit" className="bid-btn-primary" disabled={bidding}>
                    {bidding ? 'Placing Bid...' : 'Place Bid'}
                  </button>
                </form>
              ) : (
                <div className="login-prompt">
                  <p>Please login to place a bid</p>
                  <button onClick={() => navigate('/login')} className="login-btn">
                    Login
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="ended-section-card">
              <h3 className="bid-section-title">Auction Ended</h3>
              <p>Final Price: <strong>AED {auction.current_price}</strong></p>
              {auction.bids && auction.bids.length > 0 && (
                <p>Winner: <strong>{auction.bids[0].bidder_name}</strong></p>
              )}
            </div>
          )}

          {/* Recent Bids */}
          {auction.bids && auction.bids.length > 0 && (
            <div className="bids-section-card">
              <h3 className="bid-section-title">Recent Bids ({auction.bids.length})</h3>
              <div className="bids-list">
                {auction.bids.slice(0, 10).map((bid) => (
                  <div key={bid.id} className="bid-item">
                    <div className="bid-info">
                      <strong>{bid.bidder_name}</strong>
                      <span className="bid-amount">AED {bid.bid_amount}</span>
                    </div>
                    <div className="bid-time">
                      {new Date(bid.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description Section */}
          {auction.description && (
            <div className="description-section">
              <h3 className="description-title">Description</h3>
              <p className="description-text">{auction.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Similar Auctions Section */}
      {similarAuctions.length > 0 && (
        <div className="similar-products-section">
          <div className="section-header">
            <h2 className="section-title">Similar Auctions</h2>
            <Link 
              to="/auctions" 
              className="view-all-link"
            >
              View All
              <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
          <div className="similar-products-grid">
            {similarAuctions.map((similarAuction) => (
              <AuctionCard key={similarAuction._id || similarAuction.id} auction={similarAuction} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionDetail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './AuctionDetail.css';

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [bidding, setBidding] = useState(false);

  useEffect(() => {
    fetchAuction();
    const interval = setInterval(fetchAuction, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [id]);

  const fetchAuction = async () => {
    try {
      const response = await axios.get(`/api/auctions/${id}`);
      setAuction(response.data);
      if (response.data.current_price) {
        setBidAmount((parseFloat(response.data.current_price) + 10).toFixed(2));
      }
    } catch (error) {
      console.error('Error fetching auction:', error);
      // Mock auction for testing
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      const mockAuction = {
        id: id,
        title: 'iPhone 15 Pro Max 512GB - Live Auction',
        description: 'Brand new iPhone 15 Pro Max in Natural Titanium. Still sealed in box. Full warranty. Perfect condition. All accessories included.',
        current_price: 4200,
        start_price: 4000,
        bid_count: 12,
        city: 'Dubai',
        image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        category_name: 'iPhone 15 Pro Max',
        seller_name: 'Ahmed Al Maktoum',
        end_date: endDate,
        status: 'live',
        bids: [
          { id: '1', bidder_name: 'John Smith', bid_amount: 4200, created_at: new Date() },
          { id: '2', bidder_name: 'Sarah Johnson', bid_amount: 4100, created_at: new Date(Date.now() - 3600000) },
          { id: '3', bidder_name: 'Mike Wilson', bid_amount: 4050, created_at: new Date(Date.now() - 7200000) }
        ]
      };
      setAuction(mockAuction);
      setBidAmount('4210.00');
    } finally {
      setLoading(false);
    }
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
      setBidAmount('');
    } catch (error) {
      alert(error.response?.data?.error || 'Error placing bid');
    } finally {
      setBidding(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!auction) {
    return <div className="error">Auction not found</div>;
  }

  const isEnded = new Date(auction.end_date) < new Date();
  const isLive = auction.status === 'live' && !isEnded;

  return (
    <div className="auction-detail-page">
      <div className="auction-detail-container">
        <div className="auction-main">
          <div className="auction-images-gallery">
            {auction.image_url ? (
              <div className="images-scroll-container">
                <div className="gallery-image-item">
                  <img src={auction.image_url} alt={auction.title} />
                </div>
                <div className="gallery-image-item">
                  <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop" alt={auction.title} />
                </div>
                <div className="gallery-image-item">
                  <img src="https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop" alt={auction.title} />
                </div>
                <div className="gallery-image-item">
                  <img src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop" alt={auction.title} />
                </div>
              </div>
            ) : (
              <div className="images-scroll-container">
                <div className="gallery-image-item placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
                <div className="gallery-image-item placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
                <div className="gallery-image-item placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="auction-content">
            <div className="auction-header">
              <h1>{auction.title}</h1>
              <div className={`status-badge ${isLive ? 'live' : 'ended'}`}>
                {isLive ? 'LIVE' : 'ENDED'}
              </div>
            </div>

            <div className="auction-price-section">
              <div className="current-price">
                <span className="label">Current Price</span>
                <span className="price">AED {auction.current_price}</span>
              </div>
              {!isEnded && (
                <div className="end-date">
                  Ends: {new Date(auction.end_date).toLocaleString()}
                </div>
              )}
            </div>

            <div className="auction-description">
              <h2>Description</h2>
              <p>{auction.description || 'No description provided.'}</p>
            </div>

            <div className="auction-meta">
              <div className="meta-item">
                <strong>Category:</strong> {auction.category_name}
              </div>
              <div className="meta-item">
                <strong>Location:</strong> {auction.city}
              </div>
              <div className="meta-item">
                <strong>Seller:</strong> {auction.seller_name}
              </div>
            </div>
          </div>
        </div>

        <div className="auction-sidebar">
          {isLive ? (
            <>
              <div className="bid-section">
                <h3>Place a Bid</h3>
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
                      />
                      <small>Minimum bid: AED {parseFloat(auction.current_price) + 1}</small>
                    </div>
                    <button type="submit" className="bid-btn" disabled={bidding}>
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

              <div className="bids-section">
                <h3>Recent Bids ({auction.bids?.length || 0})</h3>
                {auction.bids && auction.bids.length > 0 ? (
                  <div className="bids-list">
                    {auction.bids.slice(0, 10).map((bid) => (
                      <div key={bid.id} className="bid-item">
                        <div className="bid-info">
                          <strong>{bid.bidder_name}</strong>
                          <span>AED {bid.bid_amount}</span>
                        </div>
                        <div className="bid-time">
                          {new Date(bid.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-bids">No bids yet</p>
                )}
              </div>
            </>
          ) : (
            <div className="ended-section">
              <h3>Auction Ended</h3>
              <p>Final Price: AED {auction.current_price}</p>
              {auction.bids && auction.bids.length > 0 && (
                <p>Winner: {auction.bids[0].bidder_name}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;


import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ListingCard from '../../components/ListingCard/ListingCard';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
    fetchMyListings();
    fetchMyBids();
  }, [user, navigate]);

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

  const fetchMyBids = async () => {
    try {
      const response = await axios.get('/api/auctions/my-bids');
      setMyBids(response.data);
    } catch (error) {
      console.error('Error fetching my bids:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        {profile && (
          <div className="profile-info">
            <div className="info-item">
              <strong>Name:</strong> {profile.name}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {profile.email}
            </div>
            {profile.phone && (
              <div className="info-item">
                <strong>Phone:</strong> {profile.phone}
              </div>
            )}
            {profile.city && (
              <div className="info-item">
                <strong>City:</strong> {profile.city}
              </div>
            )}
          </div>
        )}

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
                <ListingCard key={listing._id || listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        <div className="my-bids-section">
          <h2>My Bids ({myBids.length})</h2>
          {myBids.length === 0 ? (
            <div className="no-listings">
              <p>You haven't placed any bids yet.</p>
              <Link to="/auctions" className="post-ad-btn">Browse Auctions</Link>
            </div>
          ) : (
            <div className="listings-grid">
              {myBids.map((auction) => {
                // Convert auction to listing format for ListingCard
                const listingFormat = {
                  _id: auction.id || auction._id, // Use auction ID for linking to auction detail
                  id: auction.id || auction._id,
                  title: auction.title,
                  price: auction.current_price,
                  city: auction.city,
                  listingType: 'auction',
                  imageUrl: auction.image_url,
                  images: auction.images || (auction.image_url ? [auction.image_url] : []),
                  description: auction.description,
                  user: {
                    name: auction.seller_name,
                    city: auction.city
                  },
                  category: auction.category_name ? { name: auction.category_name } : null,
                  // Add auction-specific info
                  auctionInfo: {
                    startPrice: auction.start_price,
                    currentPrice: auction.current_price,
                    endDate: auction.end_date,
                    status: auction.status,
                    myHighestBid: auction.my_highest_bid,
                    myBidDate: auction.my_bid_date
                  }
                };
                return (
                  <div key={auction.id || auction._id} style={{ position: 'relative' }}>
                    <ListingCard listing={listingFormat} />
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(249, 115, 22, 0.95)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      zIndex: 10,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                      pointerEvents: 'none'
                    }}>
                      My Bid: AED {auction.my_highest_bid}
                    </div>
                    {auction.status === 'live' && (
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        background: '#2563eb',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        pointerEvents: 'none'
                      }}>
                        Live Auction
                      </div>
                    )}
                    {auction.status === 'ended' && (
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        background: '#6b7280',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        pointerEvents: 'none'
                      }}>
                        Ended
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


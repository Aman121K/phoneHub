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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
    fetchMyListings();
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
              <Link to="/post-ad" className="post-ad-btn">Post Your First Ad</Link>
            </div>
          ) : (
            <div className="listings-grid">
              {myListings.map((listing) => (
                <ListingCard key={listing._id || listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


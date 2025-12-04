import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auctions.css';

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const mockAuctions = [
    {
      id: '1',
      listing_id: '1',
      title: 'iPhone 15 Pro Max 256GB - Brand New',
      current_price: 3600,
      start_price: 3600,
      bid_count: 5,
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      city: 'Dubai',
      category_name: 'iPhone 15 Pro Max',
      seller_name: 'Ahmed Al Maktoum',
      status: 'live'
    },
    {
      id: '2',
      listing_id: '2',
      title: 'iPhone 14 Pro 128GB - Excellent Condition',
      current_price: 2560,
      start_price: 2560,
      bid_count: 3,
      end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      city: 'Abu Dhabi',
      category_name: 'iPhone 14 Pro',
      seller_name: 'Sarah Johnson',
      status: 'live'
    },
    {
      id: '3',
      listing_id: '3',
      title: 'iPhone 13 Pro Max 512GB - Good Condition',
      current_price: 2240,
      start_price: 2240,
      bid_count: 8,
      end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      image_url: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      city: 'Sharjah',
      category_name: 'iPhone 13 Pro Max',
      seller_name: 'Mohammed Hassan',
      status: 'live'
    },
    {
      id: '4',
      listing_id: '4',
      title: 'iPhone 12 Pro 256GB - Very Good',
      current_price: 1800,
      start_price: 1800,
      bid_count: 12,
      end_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      image_url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
      city: 'Dubai',
      category_name: 'iPhone 12 Pro',
      seller_name: 'Ahmed Al Maktoum',
      status: 'live'
    },
    {
      id: '5',
      listing_id: '5',
      title: 'iPhone 11 Pro Max 512GB - Good',
      current_price: 2000,
      start_price: 2000,
      bid_count: 6,
      end_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      image_url: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      city: 'Abu Dhabi',
      category_name: 'iPhone 11 Pro Max',
      seller_name: 'Sarah Johnson',
      status: 'live'
    }
  ];

  const fetchAuctions = async () => {
    try {
      const response = await axios.get('/api/auctions');
      setAuctions(response.data.length > 0 ? response.data : mockAuctions);
    } catch (error) {
      console.error('Error fetching auctions:', error);
      setAuctions(mockAuctions);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="auctions-page">
      <div className="page-header">
        <h1>Live Auctions</h1>
        <p>Bid on your favorite iPhones</p>
      </div>

      {auctions.length === 0 ? (
        <div className="no-auctions">
          <p>No live auctions at the moment.</p>
        </div>
      ) : (
        <div className="auctions-grid">
          {auctions.map((auction) => (
            <Link
              key={auction.id}
              to={`/auction/${auction.id}`}
              className="auction-card"
            >
              <div className="listing-header">
                <span className="listing-category">Buy & Sell Iphone</span>
              </div>
              <div className="auction-badge">LIVE</div>
              {auction.image_url ? (
                <div className="auction-image">
                  <img src={auction.image_url} alt={auction.title} />
                </div>
              ) : (
                <div className="auction-image placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
              )}
              <div className="auction-info">
                <h3>{auction.title}</h3>
                <p className="auction-price">AED {auction.current_price}</p>
                <p className="auction-bids">{auction.bid_count || 0} bids</p>
                <p className="auction-location">{auction.city}</p>
                <div className="auction-status">
                  <span className={new Date(auction.end_date) < new Date() ? 'ended' : 'live'}>
                    {new Date(auction.end_date) < new Date() ? 'Ended' : 'LIVE'}
                  </span>
                </div>
                <button className="bid-btn">Bid</button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Auctions;


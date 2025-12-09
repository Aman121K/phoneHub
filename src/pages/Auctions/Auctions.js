import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Auctions.css';
import AuctionCard from '../../components/AuctionCard/AuctionCard';

const Auctions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    storage: '',
    city: '',
    sortBy: 'newest'
  });
  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    storage: '',
    city: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    fetchAuctions();
  }, [appliedFilters]);

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
      setLoading(true);
      const params = new URLSearchParams();
      
      if (appliedFilters.minPrice) params.append('minPrice', appliedFilters.minPrice);
      if (appliedFilters.maxPrice) params.append('maxPrice', appliedFilters.maxPrice);
      if (appliedFilters.condition) params.append('condition', appliedFilters.condition);
      if (appliedFilters.storage) params.append('storage', appliedFilters.storage);
      if (appliedFilters.city) params.append('city', appliedFilters.city);

      const response = await axios.get(`/api/auctions${params.toString() ? '?' + params.toString() : ''}`);
      let fetchedAuctions = response.data.length > 0 ? response.data : mockAuctions;

      // Apply sorting
      if (appliedFilters.sortBy === 'newest') {
        fetchedAuctions.sort((a, b) => new Date(b.createdAt || b.created_at || b.end_date) - new Date(a.createdAt || a.created_at || a.end_date));
      } else if (appliedFilters.sortBy === 'oldest') {
        fetchedAuctions.sort((a, b) => new Date(a.createdAt || a.created_at || a.end_date) - new Date(b.createdAt || b.created_at || b.end_date));
      } else if (appliedFilters.sortBy === 'price-high') {
        fetchedAuctions.sort((a, b) => (b.current_price || b.price || 0) - (a.current_price || a.price || 0));
      } else if (appliedFilters.sortBy === 'price-low') {
        fetchedAuctions.sort((a, b) => (a.current_price || a.price || 0) - (b.current_price || b.price || 0));
      }

      setAuctions(fetchedAuctions);
    } catch (error) {
      console.error('Error fetching auctions:', error);
      setAuctions(mockAuctions);
    } finally {
      setLoading(false);
    }
  };

  const handleBidSuccess = (auctionId, bidAmount) => {
    // Update the auction in the list with new bid
    setAuctions(prevAuctions => 
      prevAuctions.map(auction => {
        if ((auction._id || auction.id) === auctionId) {
          return {
            ...auction,
            current_price: bidAmount,
            bid_count: (auction.bid_count || 0) + 1
          };
        }
        return auction;
      })
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const clearFilters = () => {
    const clearedFilters = {
      minPrice: '',
      maxPrice: '',
      condition: '',
      storage: '',
      city: '',
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="auctions-page">
      <div className="page-header">
        <div>
          <h1>Live Auctions</h1>
          <p>Bid on your favorite iPhones</p>
        </div>
        {user && user.userType === 'buyer' && (
          <Link to="/post-ad" className="create-auction-btn">
            + Create Auction
          </Link>
        )}
      </div>

      <div className="category-content-wrapper">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h2>Filters</h2>
            <button onClick={clearFilters} className="clear-filters-btn">Clear All</button>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h3>Price Range (AED)</h3>
            <div className="price-inputs">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="filter-input"
              />
            </div>
          </div>

          {/* Condition */}
          <div className="filter-section">
            <h3>Condition</h3>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Conditions</option>
              <option value="Brand New">Brand New</option>
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          {/* Storage */}
          <div className="filter-section">
            <h3>Storage</h3>
            <select
              name="storage"
              value={filters.storage}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Storage</option>
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
            </select>
          </div>

          {/* City */}
          <div className="filter-section">
            <h3>Location</h3>
            <select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Locations</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
              <option value="Ajman">Ajman</option>
              <option value="Ras al Khaimah">Ras al Khaimah</option>
              <option value="Fujairah">Fujairah</option>
              <option value="Umm al Quwain">Umm al Quwain</option>
              <option value="Al Ain">Al Ain</option>
            </select>
          </div>

          {/* Apply Filter Button */}
          <button onClick={applyFilters} className="apply-filters-btn">
            Apply Filters
          </button>
        </aside>

        {/* Main Content */}
        <div className="listings-main">
          <div className="listings-header">
            <p className="listings-count">{auctions.length} auctions found</p>
            <div className="sort-wrapper">
              <label htmlFor="sortBy">Sort by:</label>
              <select
                id="sortBy"
                name="sortBy"
                value={filters.sortBy}
                onChange={(e) => {
                  handleFilterChange(e);
                  // Sort applies immediately
                  setAppliedFilters(prev => ({ ...prev, sortBy: e.target.value }));
                }}
                className="sort-select"
              >
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
                <option value="price-high">Price Highest to Lowest</option>
                <option value="price-low">Price Lowest to Highest</option>
              </select>
            </div>
          </div>

          {auctions.length === 0 ? (
            <div className="no-auctions">
              <p>No live auctions at the moment.</p>
            </div>
          ) : (
            <div className="listings-grid">
              {auctions.map((auction) => (
                <AuctionCard 
                  key={auction._id || auction.id} 
                  auction={auction}
                  onBidSuccess={handleBidSuccess}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auctions;


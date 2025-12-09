import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListingCard from '../../components/ListingCard/ListingCard';
import './SingleSell.css';

const SingleSell = () => {
  const [listings, setListings] = useState([]);
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
    fetchListings();
  }, [appliedFilters]);

  const mockListings = [
    {
      _id: '1',
      title: 'iPhone 15 Pro Max 256GB - Brand New',
      price: 4500,
      condition: 'Brand New',
      storage: '256GB',
      city: 'Dubai',
      listingType: 'fixed_price',
      sellType: 'single',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      ],
      user: { name: 'Ahmed Al Maktoum', city: 'Dubai' },
      category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
      createdAt: new Date('2025-01-15')
    },
    {
      _id: '2',
      title: 'iPhone 14 Pro 128GB - Excellent Condition',
      price: 3200,
      condition: 'Excellent',
      storage: '128GB',
      city: 'Abu Dhabi',
      listingType: 'fixed_price',
      sellType: 'single',
      imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      ],
      user: { name: 'Sarah Johnson', city: 'Abu Dhabi' },
      category: { name: 'iPhone 14 Pro', slug: 'iphone-14-pro' },
      createdAt: new Date('2025-01-14')
    },
    {
      _id: '3',
      title: 'iPhone 13 Pro Max 512GB - Good Condition',
      price: 2800,
      condition: 'Good',
      storage: '512GB',
      city: 'Sharjah',
      listingType: 'fixed_price',
      sellType: 'single',
      imageUrl: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
      ],
      user: { name: 'Mohammed Hassan', city: 'Sharjah' },
      category: { name: 'iPhone 13 Pro Max', slug: 'iphone-13-pro-max' },
      createdAt: new Date('2025-01-13')
    },
    {
      _id: '4',
      title: 'iPhone 12 64GB - Fair Condition',
      price: 1800,
      condition: 'Fair',
      storage: '64GB',
      city: 'Dubai',
      listingType: 'fixed_price',
      sellType: 'single',
      imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      ],
      user: { name: 'Ahmed Al Maktoum', city: 'Dubai' },
      category: { name: 'iPhone 12', slug: 'iphone-12' },
      createdAt: new Date('2025-01-12')
    },
    {
      _id: '5',
      title: 'iPhone 15 Pro 1TB - Premium',
      price: 5200,
      condition: 'Brand New',
      storage: '1TB',
      city: 'Abu Dhabi',
      listingType: 'fixed_price',
      sellType: 'single',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      ],
      user: { name: 'Sarah Johnson', city: 'Abu Dhabi' },
      category: { name: 'iPhone 15 Pro', slug: 'iphone-15-pro' },
      createdAt: new Date('2025-01-11')
    },
    {
      _id: '6',
      title: 'iPhone 14 256GB - Very Good',
      price: 2500,
      condition: 'Very Good',
      storage: '256GB',
      city: 'Dubai',
      listingType: 'fixed_price',
      sellType: 'single',
      imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
      ],
      user: { name: 'Ahmed Al Maktoum', city: 'Dubai' },
      category: { name: 'iPhone 14', slug: 'iphone-14' },
      createdAt: new Date('2025-01-10')
    },
    {
      _id: '7',
      title: 'iPhone 11 Pro 256GB - Good',
      price: 2200,
      condition: 'Good',
      storage: '256GB',
      city: 'Sharjah',
      listingType: 'fixed_price',
      sellType: 'single',
      imageUrl: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      ],
      user: { name: 'Mohammed Hassan', city: 'Sharjah' },
      category: { name: 'iPhone 11 Pro', slug: 'iphone-11-pro' },
      createdAt: new Date('2025-01-09')
    },
    {
      _id: '8',
      title: 'iPhone XS Max 256GB - Fair',
      price: 1500,
      condition: 'Fair',
      storage: '256GB',
      city: 'Ajman',
      listingType: 'fixed_price',
      sellType: 'single',
      imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      ],
      user: { name: 'Ali Ahmed', city: 'Ajman' },
      category: { name: 'iPhone XS Max', slug: 'iphone-xs-max' },
      createdAt: new Date('2025-01-08')
    }
  ];

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('type', 'single_sell');
      
      if (appliedFilters.minPrice) params.append('minPrice', appliedFilters.minPrice);
      if (appliedFilters.maxPrice) params.append('maxPrice', appliedFilters.maxPrice);
      if (appliedFilters.condition) params.append('condition', appliedFilters.condition);
      if (appliedFilters.storage) params.append('storage', appliedFilters.storage);
      if (appliedFilters.city) params.append('city', appliedFilters.city);

      const response = await axios.get(`/api/listings?${params.toString()}`);
      let fetchedListings = response.data.length > 0 ? response.data : mockListings;

      // Apply sorting
      if (appliedFilters.sortBy === 'newest') {
        fetchedListings.sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at));
      } else if (appliedFilters.sortBy === 'oldest') {
        fetchedListings.sort((a, b) => new Date(a.createdAt || a.created_at) - new Date(b.createdAt || b.created_at));
      } else if (appliedFilters.sortBy === 'price-high') {
        fetchedListings.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (appliedFilters.sortBy === 'price-low') {
        fetchedListings.sort((a, b) => (a.price || 0) - (b.price || 0));
      }

      setListings(fetchedListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings(mockListings);
    } finally {
      setLoading(false);
    }
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
    <div className="single-sell-page">
      <div className="page-header">
        <h1>Single iphone Listings</h1>
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
            <p className="listings-count">{listings.length} listings found</p>
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

          {listings.length === 0 ? (
            <div className="no-listings">
              <p>No single sell listings available at the moment.</p>
            </div>
          ) : (
            <div className="listings-grid">
              {listings.map((listing) => (
                <ListingCard key={listing._id || listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleSell;


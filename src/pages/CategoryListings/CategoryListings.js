import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ListingCard from '../../components/ListingCard/ListingCard';
import './CategoryListings.css';

const CategoryListings = () => {
  const { slug } = useParams();
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    storage: '',
    city: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchListings();
  }, [slug, filters]);

  const mockListings = [
    {
      _id: '1',
      title: 'iPhone 15 Pro Max 256GB - Brand New',
      price: 4500,
      condition: 'Brand New',
      storage: '256GB',
      city: 'Dubai',
      listingType: 'fixed_price',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      user: { name: 'Ahmed Al Maktoum', city: 'Dubai' },
      category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
      createdAt: new Date('2025-01-15')
    },
    {
      _id: '2',
      title: 'iPhone 15 Pro Max 512GB - Excellent',
      price: 5000,
      condition: 'Excellent',
      storage: '512GB',
      city: 'Abu Dhabi',
      listingType: 'fixed_price',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      user: { name: 'Sarah Johnson', city: 'Abu Dhabi' },
      category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
      createdAt: new Date('2025-01-14')
    },
    {
      _id: '3',
      title: 'iPhone 15 Pro Max 1TB - Premium',
      price: 5500,
      condition: 'Brand New',
      storage: '1TB',
      city: 'Dubai',
      listingType: 'fixed_price',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      user: { name: 'Ahmed Al Maktoum', city: 'Dubai' },
      category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
      createdAt: new Date('2025-01-13')
    }
  ];

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories').catch(() => ({ data: [] }));
      const allCategories = response.data || [];
      
      // Filter out sub-categories (Pro, Pro Max, Plus, Mini variants)
      const mainCategories = allCategories.filter(cat => {
        const name = cat.name.toLowerCase();
        return !name.includes('pro') && !name.includes('plus') && !name.includes('mini');
      });
      
      setCategories(mainCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('category', slug);
      
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.condition) params.append('condition', filters.condition);
      if (filters.storage) params.append('storage', filters.storage);
      if (filters.city) params.append('city', filters.city);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const listingsRes = await axios.get(`/api/listings?${params.toString()}`).catch(() => ({ data: [] }));
      let fetchedListings = listingsRes.data.length > 0 ? listingsRes.data : mockListings;

      // Apply sorting
      if (filters.sortBy === 'newest') {
        fetchedListings.sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at));
      } else if (filters.sortBy === 'oldest') {
        fetchedListings.sort((a, b) => new Date(a.createdAt || a.created_at) - new Date(b.createdAt || b.created_at));
      } else if (filters.sortBy === 'price-high') {
        fetchedListings.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (filters.sortBy === 'price-low') {
        fetchedListings.sort((a, b) => (a.price || 0) - (b.price || 0));
      }

      setListings(fetchedListings);
      
      const categoriesRes = await axios.get('/api/categories').catch(() => ({ data: [] }));
      const foundCategory = categoriesRes.data.find(cat => cat.slug === slug);
      setCategory(foundCategory || { name: slug.replace('-', ' '), slug });
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

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      condition: '',
      storage: '',
      city: '',
      sortBy: 'newest'
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="category-listings-page">
      <div className="page-header">
        <h1>List of ads for {category?.name || 'Category'}</h1>
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
                onChange={handleFilterChange}
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
              <p>No listings found in this category.</p>
              <Link to="/post-ad" className="post-ad-btn">Post an Ad</Link>
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

export default CategoryListings;


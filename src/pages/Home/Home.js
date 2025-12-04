import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import ListingCard from '../../components/ListingCard/ListingCard';
import './Home.css';

const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [latestListings, setLatestListings] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularLocations, setPopularLocations] = useState([]);
  const [singleSellListings, setSingleSellListings] = useState([]);
  const [bulkSellListings, setBulkSellListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');

  // Mock data for testing
  const mockCategories = [
    { id: '1', name: 'iPhone 16 Pro Max', slug: 'iphone-16-pro-max', ad_count: 45 },
    { id: '2', name: 'iPhone 15 Pro', slug: 'iphone-15-pro', ad_count: 38 },
    { id: '3', name: 'iPhone 14 Pro Max', slug: 'iphone-14-pro-max', ad_count: 52 },
    { id: '4', name: 'iPhone 13 Pro', slug: 'iphone-13-pro', ad_count: 67 },
    { id: '5', name: 'iPhone 12', slug: 'iphone-12', ad_count: 89 },
    { id: '6', name: 'iPhone 11 Pro Max', slug: 'iphone-11-pro-max', ad_count: 34 },
    { id: '7', name: 'iPhone 15', slug: 'iphone-15', ad_count: 42 },
    { id: '8', name: 'iPhone 14', slug: 'iphone-14', ad_count: 56 },
    { id: '9', name: 'iPhone 13', slug: 'iphone-13', ad_count: 71 },
    { id: '10', name: 'iPhone XS Max', slug: 'iphone-xs-max', ad_count: 23 },
    { id: '11', name: 'iPhone XR', slug: 'iphone-xr', ad_count: 19 },
    { id: '12', name: 'iPhone SE', slug: 'iphone-se', ad_count: 15 }
  ];

  const mockFeaturedListings = [
    {
      _id: '1',
      title: 'iPhone 15 Pro Max 256GB - Brand New',
      price: 4500,
      condition: 'Brand New',
      storage: '256GB',
      city: 'Dubai',
      listingType: 'fixed_price',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
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
      imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop'
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
      imageUrl: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
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
      imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop'
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
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
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
      imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'
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
      imageUrl: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop'
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
      imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'
      ],
      user: { name: 'Ali Ahmed', city: 'Ajman' },
      category: { name: 'iPhone XS Max', slug: 'iphone-xs-max' },
      createdAt: new Date('2025-01-08')
    }
  ];

  const mockAuctions = [
    {
      id: '1',
      listing_id: '1',
      title: 'iPhone 15 Pro Max 512GB - Live Auction',
      current_price: 4200,
      start_price: 3600,
      bid_count: 12,
      city: 'Dubai',
      image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      category_name: 'iPhone 15 Pro Max',
      seller_name: 'Ahmed Al Maktoum',
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'live'
    },
    {
      id: '2',
      listing_id: '2',
      title: 'iPhone 14 Pro 256GB - Bidding Now',
      current_price: 3000,
      start_price: 2560,
      bid_count: 8,
      city: 'Abu Dhabi',
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      category_name: 'iPhone 14 Pro',
      seller_name: 'Sarah Johnson',
      end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'live'
    },
    {
      id: '3',
      listing_id: '3',
      title: 'iPhone 13 Pro Max 1TB - Hot Auction',
      current_price: 3500,
      start_price: 2800,
      bid_count: 15,
      city: 'Sharjah',
      image_url: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      category_name: 'iPhone 13 Pro Max',
      seller_name: 'Mohammed Hassan',
      end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'live'
    },
    {
      id: '4',
      listing_id: '3',
      title: 'iPhone 13 Pro Max 1TB - Hot Auction',
      current_price: 3500,
      start_price: 2800,
      bid_count: 15,
      city: 'Sharjah',
      image_url: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      category_name: 'iPhone 13 Pro Max',
      seller_name: 'Mohammed Hassan',
      end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'live'
    },
    {
      id: '5',
      listing_id: '3',
      title: 'iPhone 13 Pro Max 1TB - Hot Auction',
      current_price: 3500,
      start_price: 2800,
      bid_count: 15,
      city: 'Sharjah',
      image_url: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      category_name: 'iPhone 13 Pro Max',
      seller_name: 'Mohammed Hassan',
      end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'live'
    }
  ];

  const mockLocations = [
    { city: 'Dubai', listing_count: 245 },
    { city: 'Abu Dhabi', listing_count: 189 },
    { city: 'Sharjah', listing_count: 156 },
    { city: 'Ajman', listing_count: 98 },
    { city: 'Ras al Khaimah', listing_count: 67 },
    { city: 'Fujairah', listing_count: 45 }
  ];

  const mockSimilarProducts = [
    {
      _id: 'sp1',
      title: 'iPhone 15 Pro Max 512GB - Excellent',
      price: 5000,
      condition: 'Excellent',
      storage: '512GB',
      city: 'Abu Dhabi',
      color: 'Other',
      warranty: 'Yes',
      listingType: 'fixed_price',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop'
      ],
      user: { name: 'Sarah Johnson', city: 'Abu Dhabi' },
      category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
      createdAt: new Date('2025-01-15')
    },
    {
      _id: 'sp2',
      title: 'iPhone 15 Pro Max 1TB - Premium',
      price: 5500,
      condition: 'Brand New',
      storage: '1TB',
      city: 'Dubai',
      color: 'Other',
      warranty: 'Yes',
      listingType: 'fixed_price',
      imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop'
      ],
      user: { name: 'Mohammed Ali', city: 'Dubai' },
      category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
      createdAt: new Date('2025-01-14')
    },
    {
      _id: 'sp3',
      title: 'iPhone 15 Pro Max 256GB - Good',
      price: 4200,
      condition: 'Good',
      storage: '256GB',
      city: 'Sharjah',
      color: 'Other',
      warranty: 'Yes',
      listingType: 'fixed_price',
      imageUrl: 'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
      ],
      user: { name: 'Fatima Hassan', city: 'Sharjah' },
      category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
      createdAt: new Date('2025-01-13')
    },
    {
      _id: 'sp4',
      title: 'iPhone 15 Pro Max 512GB - Brand New',
      price: 5200,
      condition: 'Brand New',
      storage: '512GB',
      city: 'Dubai',
      color: 'Other',
      warranty: 'Yes',
      listingType: 'fixed_price',
      imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'
      ],
      user: { name: 'Omar Al Zaabi', city: 'Dubai' },
      category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
      createdAt: new Date('2025-01-12')
    },
    {
      _id: 'sp5',
      title: 'iPhone 15 Pro Max 256GB - Excellent',
      price: 4400,
      condition: 'Excellent',
      storage: '256GB',
      city: 'Abu Dhabi',
      color: 'Other',
      warranty: 'Yes',
      listingType: 'fixed_price',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1632669021382-3e0d1c1b0b4c?w=500&h=500&fit=crop'
      ],
      user: { name: 'Layla Ahmed', city: 'Abu Dhabi' },
      category: { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
      createdAt: new Date('2025-01-11')
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [featuredRes, latestRes, auctionsRes, categoriesRes, locationsRes, singleSellRes, bulkSellRes] = await Promise.all([
        axios.get('/api/listings/featured').catch(() => ({ data: [] })),
        axios.get('/api/listings/latest').catch(() => ({ data: [] })),
        axios.get('/api/auctions').catch(() => ({ data: [] })),
        axios.get('/api/categories').catch(() => ({ data: [] })),
        axios.get('/api/categories/locations').catch(() => ({ data: [] })),
        axios.get('/api/listings?type=single_sell').catch(() => ({ data: [] })),
        axios.get('/api/listings?type=bulk_sell').catch(() => ({ data: [] }))
      ]);

      // Use API data if available and has items, otherwise use mock data
      setFeaturedListings(featuredRes.data && featuredRes.data.length > 0 ? featuredRes.data : mockFeaturedListings);
      setLatestListings(latestRes.data && latestRes.data.length > 0 ? latestRes.data : mockFeaturedListings);
      setSimilarProducts(mockSimilarProducts);
      setAuctions(auctionsRes.data && auctionsRes.data.length > 0 ? auctionsRes.data : mockAuctions);
      setCategories(categoriesRes.data && categoriesRes.data.length > 0 ? categoriesRes.data : mockCategories);
      setPopularLocations(locationsRes.data && locationsRes.data.length > 0 ? locationsRes.data : mockLocations);
      
      // Single Sell and Bulk Sell listings
      const mockSingleSell = mockFeaturedListings.slice(0, 8).map(item => ({ ...item, sellType: 'single' }));
      const mockBulkSell = mockFeaturedListings.slice(2, 10).map(item => ({ ...item, sellType: 'bulk' }));
      setSingleSellListings(singleSellRes.data && singleSellRes.data.length > 0 ? singleSellRes.data : mockSingleSell);
      setBulkSellListings(bulkSellRes.data && bulkSellRes.data.length > 0 ? bulkSellRes.data : mockBulkSell);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Use mock data on error
      setFeaturedListings(mockFeaturedListings);
      setLatestListings(mockFeaturedListings);
      setSimilarProducts(mockSimilarProducts);
      setAuctions(mockAuctions);
      setCategories(mockCategories);
      setPopularLocations(mockLocations);
      const mockSingleSell = mockFeaturedListings.slice(0, 8).map(item => ({ ...item, sellType: 'single' }));
      const mockBulkSell = mockFeaturedListings.slice(2, 10).map(item => ({ ...item, sellType: 'bulk' }));
      setSingleSellListings(mockSingleSell);
      setBulkSellListings(mockBulkSell);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to search results
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (selectedModel) params.append('model', selectedModel);
    if (selectedStorage) params.append('storage', selectedStorage);
    window.location.href = `/?${params.toString()}`;
  };

  const handleQuickFilter = (filter) => {
    setSearchQuery(filter);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      {/* Ultimate Hero Section */}
      <section className="ultimate-hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-star"></i>
              Dubai's #1 iPhone Marketplace
            </div>

            <h1 className="hero-title">
              Buy & Sell iPhones
              <span> With Complete Confidence</span>
            </h1>

            <p className="hero-subtitle">
              Certified quality check, secure payments, and best price guarantee.
              Join 50,000+ satisfied customers across the UAE.
            </p>
          </div>

          {/* Mega Search Component */}
          <div className="mega-search">
            <div className="search-header">
              <h3 className="search-title">Find Your Perfect iPhone</h3>
              <div className="quick-filters">
                <div className="filter-tag" onClick={() => handleQuickFilter('iPhone 15 Pro')}>
                  iPhone 15 Pro
                </div>
                <div className="filter-tag" onClick={() => handleQuickFilter('iPhone 14')}>
                  iPhone 14
                </div>
                <div className="filter-tag" onClick={() => handleQuickFilter('Under AED 2000')}>
                  Under AED 2000
                </div>
              </div>
            </div>

            <form className="search-grid" onSubmit={handleSearch}>
              <div className="search-group">
                <label className="search-label">Search iPhones</label>
                <input
                  type="text"
                  className="search-input"
                  placeholder="iPhone 15 Pro Max, 14, 13..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="search-group">
                <label className="search-label">Model</label>
                <select
                  className="search-select"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="">All Models</option>
                  {categories.slice(0, 10).map((cat) => (
                    <option key={cat.id || cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="search-group">
                <label className="search-label">Storage</label>
                <select
                  className="search-select"
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                >
                  <option value="">Any Storage</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB</option>
                </select>
              </div>

              <button type="submit" className="search-btn">
                <i className="fas fa-search"></i>
                Search
              </button>
            </form>
          </div>

          {/* Hero Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15K+</span>
              <span className="stat-label">iPhones Sold</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24h</span>
              <span className="stat-label">Fast Delivery</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-bar">
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-shield-check"></i>
              </div>
              Certified Quality
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-lock"></i>
              </div>
              Secure Payment
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-truck"></i>
              </div>
              Free Delivery
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-undo"></i>
              </div>
              7-Day Return
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <Typography
              variant="h2"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1e293b',
                fontFamily: "'Inter', sans-serif",
                mb: '0.5rem',
              }}
            >
              Browse Categories
            </Typography>
            <p className="section-subtitle">Find what you're looking for</p>
          </div>
          <Link to="/categories" className="view-all-link">
            View All
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="listings-grid home-listings-grid">
          {categories.slice(0, 4).map((category) => (
            <Card
              key={category.id || category._id}
              component={Link}
              to={`/category/${category.slug}`}
              className="category-card"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                background: '#2563eb',
                color: '#fff',
                textAlign: 'center',
                padding: '2rem 1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                transition: 'all 0.3s ease',
                border: '2px solid #2563eb',
                cursor: 'pointer',
                position: 'relative',
                flexShrink: 0,
                width: '240px',
                minWidth: '240px',
                maxWidth: '240px',
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#fff',
                  mb: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                {category.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 600,
                }}
              >
                {category.ad_count || 0} Ads
              </Typography>
            </Card>
          ))}
          {categories.length > 5 && (
            <Card
              component={Link}
              to={`/category/${categories[5].slug}`}
              className="category-card blur-card"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                background: '#2563eb',
                color: '#fff',
                textAlign: 'center',
                padding: '2rem 1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                transition: 'all 0.3s ease',
                border: '2px solid #2563eb',
                cursor: 'pointer',
                position: 'relative',
                flexShrink: 0,
                width: '240px',
                minWidth: '240px',
                maxWidth: '240px',
                opacity: 0.5,
                filter: 'blur(2px)',
                pointerEvents: 'none',
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#fff',
                  mb: '0.5rem',
                }}
              >
                {categories[5].name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                }}
              >
                {categories[5].ad_count || 0} Ads
              </Typography>
            </Card>
          )}
        </div>
      </section>

      {/* Single Sell Section */}
      <section className="single-sell-section">
        <div className="section-header">
          <div>
          <Typography
              variant="h2"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1e293b',
                fontFamily: "'Inter', sans-serif",
                mb: '0.5rem',
              }}
            >
              Single Sell
            </Typography>
            <p className="section-subtitle">Sell Your iPhone Individually</p>
          </div>
          <Link to="/single-sell" className="view-all-link">
            View All
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="listings-grid home-listings-grid">
          {singleSellListings.length > 0 ? (
            <>
              {singleSellListings.slice(0, 4).map((listing) => (
                <ListingCard key={listing._id || listing.id} listing={listing} />
              ))}
              {singleSellListings.length > 5 && (
                <ListingCard 
                  listing={singleSellListings[5]} 
                  className="blur-card"
                />
              )}
            </>
          ) : (
            <div className="no-listings">
              <p>No single sell listings available</p>
            </div>
          )}
        </div>
      </section>

      {/* Bulk Sell Section */}
      <section className="bulk-sell-section">
        <div className="section-header">
          <div>
          <Typography
              variant="h2"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1e293b',
                fontFamily: "'Inter', sans-serif",
                mb: '0.5rem',
              }}
            >
              Bulk Sell
            </Typography>
            <p className="section-subtitle">Sell Multiple iPhones at Once</p>
          </div>
          <Link to="/bulk-sell" className="view-all-link">
            View All
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="listings-grid home-listings-grid">
          {bulkSellListings.length > 0 ? (
            <>
              {bulkSellListings.slice(0, 4).map((listing) => (
                <ListingCard key={listing._id || listing.id} listing={listing} />
              ))}
              {bulkSellListings.length > 5 && (
                <ListingCard 
                  listing={bulkSellListings[5]} 
                  className="blur-card"
                />
              )}
            </>
          ) : (
            <div className="no-listings">
              <p>No bulk sell listings available</p>
            </div>
          )}
        </div>
      </section>

      {/* Auction Section */}
      <section className="auction-section">
        <div className="section-header">
        <Typography
              variant="h2"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1e293b',
                fontFamily: "'Inter', sans-serif",
                mb: '0.5rem',
              }}
            >
            Auction
          </Typography>
          <Link to="/auctions" className="view-all-link">
            View All
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="listings-grid home-listings-grid">
          {auctions.length > 0 ? (
            <>
              {auctions.slice(0, 4).map((auction) => (
                <ListingCard key={auction._id || auction.id} listing={auction} />
              ))}
              {auctions.length > 5 && (
                <ListingCard 
                  listing={auctions[5]} 
                  className="blur-card"
                />
              )}
            </>
          ) : (
            <div className="no-auctions">
              <p>No live auctions available</p>
            </div>
          )}
        </div>

        {/* Advertise With Us Section */}
        <div className="advertise-section">
          <div className="advertise-content">
            <h3>Advertise With Us</h3>
            <p>Reach thousands of iPhone buyers and sellers across the UAE</p>
            <Link to="/contact" className="advertise-btn">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="locations-section">
        <div className="section-header">
          <div>
          <Typography
              variant="h2"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1e293b',
                fontFamily: "'Inter', sans-serif",
                mb: '0.5rem',
              }}
            >
              Popular Locations
            </Typography>
            <p className="section-subtitle">Explore Your Desire Places</p>
          </div>
          <Link to="/locations" className="view-all-link">
            View All
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="listings-grid home-listings-grid">
          {popularLocations.slice(0, 4).map((location, index) => (
            <Link
              key={index}
              to={`/?city=${location.city}`}
              className="location-card"
            >
              <div className="location-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>{location.city}</h3>
              <div className="location-stats">
                <i className="fas fa-list"></i>
                <span>{location.listing_count} Listings</span>
              </div>
            </Link>
          ))}
          {popularLocations.length > 5 && (
            <Link
              to={`/?city=${popularLocations[5].city}`}
              className="location-card blur-card"
            >
              <div className="location-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>{popularLocations[5].city}</h3>
              <div className="location-stats">
                <i className="fas fa-list"></i>
                <span>{popularLocations[5].listing_count} Listings</span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Latest Ads Section */}
      <section className="latest-section">
        <div className="section-header">
          <div>
          <Typography
              variant="h2"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1e293b',
                fontFamily: "'Inter', sans-serif",
                mb: '0.5rem',
              }}
            >
              Latest Ads
            </Typography>
            <p className="section-subtitle">Buy & Sell Any Iphone</p>
          </div>
          <Link to="/fixed-price" className="view-all-link">
            View All
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="listings-grid home-listings-grid">
          {latestListings.length > 0 ? (
            <>
              {latestListings.slice(0, 4).map((listing) => (
                <ListingCard key={listing._id || listing.id} listing={listing} />
              ))}
              {latestListings.length > 5 && (
                <ListingCard 
                  listing={latestListings[5]} 
                  className="blur-card"
                />
              )}
            </>
          ) : (
            <div className="no-listings">
              <p>No listings available</p>
            </div>
          )}
        </div>

        {/* Post New Ad Section */}
        <div className="post-ad-section">
          <div className="post-ad-content">
            <h3>Want to Sell Your iPhone?</h3>
            <p>Post your ad now and reach thousands of buyers instantly</p>
            <Link to="/post-ad" className="post-ad-btn">Post a New Ad</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

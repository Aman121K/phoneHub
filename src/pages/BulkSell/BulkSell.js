import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListingCard from '../../components/ListingCard/ListingCard';
import './BulkSell.css';

const BulkSell = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const mockListings = [
    {
      _id: '1',
      title: 'Bulk iPhone 15 Pro Max 256GB - 10 Units',
      price: 45000,
      condition: 'Brand New',
      storage: '256GB',
      city: 'Dubai',
      listingType: 'fixed_price',
      sellType: 'bulk',
      quantity: 10,
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
      title: 'Bulk iPhone 14 Pro 128GB - 5 Units',
      price: 16000,
      condition: 'Excellent',
      storage: '128GB',
      city: 'Abu Dhabi',
      listingType: 'fixed_price',
      sellType: 'bulk',
      quantity: 5,
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
      title: 'Bulk iPhone 13 Pro Max 512GB - 8 Units',
      price: 22400,
      condition: 'Good',
      storage: '512GB',
      city: 'Sharjah',
      listingType: 'fixed_price',
      sellType: 'bulk',
      quantity: 8,
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
      title: 'Bulk iPhone 12 64GB - 15 Units',
      price: 27000,
      condition: 'Fair',
      storage: '64GB',
      city: 'Dubai',
      listingType: 'fixed_price',
      sellType: 'bulk',
      quantity: 15,
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
      title: 'Bulk iPhone 15 Pro 1TB - 6 Units',
      price: 31200,
      condition: 'Brand New',
      storage: '1TB',
      city: 'Abu Dhabi',
      listingType: 'fixed_price',
      sellType: 'bulk',
      quantity: 6,
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
      title: 'Bulk iPhone 14 256GB - 12 Units',
      price: 30000,
      condition: 'Very Good',
      storage: '256GB',
      city: 'Dubai',
      listingType: 'fixed_price',
      sellType: 'bulk',
      quantity: 12,
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
      title: 'Bulk iPhone 11 Pro 256GB - 20 Units',
      price: 44000,
      condition: 'Good',
      storage: '256GB',
      city: 'Sharjah',
      listingType: 'fixed_price',
      sellType: 'bulk',
      quantity: 20,
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
      title: 'Bulk iPhone XS Max 256GB - 7 Units',
      price: 10500,
      condition: 'Fair',
      storage: '256GB',
      city: 'Ajman',
      listingType: 'fixed_price',
      sellType: 'bulk',
      quantity: 7,
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
      const response = await axios.get('/api/listings?type=bulk_sell');
      setListings(response.data.length > 0 ? response.data : mockListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings(mockListings);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="bulk-sell-page">
      <div className="page-header">
        <h1>Bulk Sell Listings</h1>
        <p>Browse all bulk iPhone listings</p>
      </div>

      {listings.length === 0 ? (
        <div className="no-listings">
          <p>No bulk sell listings available at the moment.</p>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <ListingCard key={listing._id || listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BulkSell;


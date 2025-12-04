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

  useEffect(() => {
    fetchListings();
  }, [slug]);

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

  const fetchListings = async () => {
    try {
      const [listingsRes, categoriesRes] = await Promise.all([
        axios.get(`/api/listings?category=${slug}`).catch(() => ({ data: [] })),
        axios.get('/api/categories').catch(() => ({ data: [] }))
      ]);

      setListings(listingsRes.data.length > 0 ? listingsRes.data : mockListings);
      const foundCategory = categoriesRes.data.find(cat => cat.slug === slug);
      setCategory(foundCategory || { name: slug.replace('-', ' '), slug });
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
    <div className="category-listings-page">
      <div className="page-header">
        <h1>{category?.name || 'Category'}</h1>
        <p>{listings.length} listings found</p>
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
  );
};

export default CategoryListings;


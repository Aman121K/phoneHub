import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './PostAd.css';

const PostAd = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: '',
    title: '',
    description: '',
    price: '',
    per_price: '',
    storage: '',
    condition: '',
    city: '',
    listing_type: 'fixed_price',
    sellType: 'single',
    start_price: '',
    end_date: '',
    quantity: 1
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Allow buyers to create auctions, but not fixed price listings
    if (user.userType === 'buyer' && formData.listing_type !== 'auction') {
      // Set default to auction for buyers
      setFormData(prev => ({ ...prev, listing_type: 'auction' }));
    }
    // Set city from user profile and lock it
    if (user.city) {
      setFormData(prev => ({ ...prev, city: user.city }));
    }
    fetchCategories();
  }, [user, navigate]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      if (response.data && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error('Invalid categories response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to load categories. Please refresh the page.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageError('');

    // Validate number of images
    if (files.length === 0) {
      setImages([]);
      setImagePreviews([]);
      return;
    }

    if (files.length > 5) {
      setImageError('Maximum 5 images allowed');
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setImageError('Only image files are allowed (jpeg, jpg, png, gif, webp)');
      return;
    }

    // Validate file sizes (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setImageError('Each image must be less than 5MB');
      return;
    }

    setImages(files);

    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Revoke object URLs to free memory
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
    setImageError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageError('');

    // Validate images
    if (images.length === 0) {
      setImageError('At least one image is required');
      return;
    }

    if (images.length > 5) {
      setImageError('Maximum 5 images allowed');
      return;
    }

    // Validate buyer can only create auctions
    if (user.userType === 'buyer' && formData.listing_type !== 'auction') {
      alert('Buyers can only create auctions. Please select auction as listing type.');
      return;
    }

    // Validate auction fields for buyers
    if (user.userType === 'buyer' && formData.listing_type === 'auction') {
      if (!formData.start_price || !formData.end_date) {
        alert('Start price and end date are required for auctions');
        return;
      }
      const endDate = new Date(formData.end_date);
      if (endDate <= new Date()) {
        alert('End date must be in the future');
        return;
      }
    }

    setLoading(true);

    try {
      // Get auth token
      const token = localStorage.getItem('token');
      
      // If buyer creating auction, use the new auction creation endpoint
      if (user.userType === 'buyer' && formData.listing_type === 'auction') {
        // Create FormData for file upload
        const formDataToSend = new FormData();
        
        // Append images
        images.forEach((image) => {
          formDataToSend.append('images', image);
        });

        // Append other form fields
        formDataToSend.append('category_id', formData.category_id);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description || '');
        formDataToSend.append('storage', formData.storage || '');
        formDataToSend.append('condition', formData.condition || '');
        formDataToSend.append('city', formData.city);
        formDataToSend.append('start_price', formData.start_price);
        formDataToSend.append('end_date', formData.end_date);
        formDataToSend.append('sellType', formData.sellType || 'single');
        formDataToSend.append('quantity', formData.quantity || 1);
        if (formData.per_price) {
          formDataToSend.append('per_price', formData.per_price);
        }
        if (formData.color) {
          formDataToSend.append('color', formData.color);
        }
        if (formData.warranty) {
          formDataToSend.append('warranty', formData.warranty);
        }

        const response = await axios.post('/api/auctions/create', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Clean up preview URLs
        imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        
        alert('Auction created successfully!');
        navigate('/auctions');
      } else {
        // Sellers use the regular listings endpoint
        // Create FormData for file upload
        const formDataToSend = new FormData();
        
        // Append images
        images.forEach((image) => {
          formDataToSend.append('images', image);
        });

        // Append other form fields
        formDataToSend.append('category_id', formData.category_id);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description || '');
        formDataToSend.append('storage', formData.storage || '');
        formDataToSend.append('condition', formData.condition || '');
        formDataToSend.append('city', formData.city);
        formDataToSend.append('listing_type', formData.listing_type);
        formDataToSend.append('sellType', formData.sellType || 'single');
        formDataToSend.append('quantity', formData.quantity || 1);
        if (formData.per_price) {
          formDataToSend.append('per_price', formData.per_price);
        }
        
        if (formData.listing_type === 'auction') {
          formDataToSend.append('price', formData.start_price);
          formDataToSend.append('start_price', formData.start_price);
          formDataToSend.append('end_date', formData.end_date);
        } else {
          formDataToSend.append('price', formData.price);
        }

        await axios.post('/api/listings', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Clean up preview URLs
        imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        
        alert('Listing created successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating listing/auction:', error);
      alert('Error: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="post-ad-page">
      <div className="post-ad-container">
        <h1>{user?.userType === 'buyer' ? 'Create an Auction' : 'Post an Ad'}</h1>
        <form onSubmit={handleSubmit} className="post-ad-form">
          <div className="form-group">
            <label>Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              disabled={categories.length === 0}
            >
              <option value="">
                {categories.length === 0 ? 'Loading categories...' : 'Select Category'}
              </option>
              {categories.map((cat) => {
                const categoryId = cat._id || cat.id;
                const categoryName = cat.name || 'Unnamed Category';
                return (
                  <option key={categoryId} value={categoryId}>
                    {categoryName}
                  </option>
                );
              })}
            </select>
            {categories.length === 0 && (
              <small style={{ color: '#666', display: 'block', marginTop: '0.5rem' }}>
                If categories don't load, please refresh the page or contact support.
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., iPhone 15 Pro 256GB"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your iPhone..."
              rows="5"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Storage</label>
              <select
                name="storage"
                value={formData.storage}
                onChange={handleChange}
              >
                <option value="">Select Storage</option>
                <option value="64GB">64GB</option>
                <option value="128GB">128GB</option>
                <option value="256GB">256GB</option>
                <option value="512GB">512GB</option>
                <option value="1TB">1TB</option>
              </select>
            </div>

            <div className="form-group">
              <label>Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="">Select Condition</option>
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              readOnly
              disabled
              required
              style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
            />
            <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>
              City is locked based on your profile
            </small>
          </div>

          <div className="form-group">
            <label>Sell Type *</label>
            <select
              name="sellType"
              value={formData.sellType}
              onChange={handleChange}
              required
            >
              <option value="single">Single Sell</option>
              <option value="bulk">Bulk Sell</option>
            </select>
          </div>

          <div className="form-group">
            <label>Listing Type *</label>
            <select
              name="listing_type"
              value={formData.listing_type}
              onChange={handleChange}
              required
              disabled={user?.userType === 'buyer' || (user?.userType === 'seller' && user?.sellerType !== 'business')}
            >
              {user?.userType === 'buyer' ? (
                <option value="auction">Auction</option>
              ) : (
                <>
                  <option value="fixed_price">Fixed Price</option>
                  {user?.sellerType === 'business' && (
                    <option value="auction">Auction</option>
                  )}
                </>
              )}
            </select>
            {user?.userType === 'buyer' && (
              <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>
                Buyers can create auctions to sell items
              </small>
            )}
            {user?.userType === 'seller' && user?.sellerType !== 'business' && (
              <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>
                Auction is only available for business sellers
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="1"
              min="1"
              required
            />
          </div>

          {formData.listing_type === 'fixed_price' ? (
            <>
              <div className="form-group">
                <label>Total Price (AED) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              {formData.sellType === 'bulk' && (
                <div className="form-group">
                  <label>Per Unit Price (AED)</label>
                  <input
                    type="number"
                    name="per_price"
                    value={formData.per_price}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>
                    Optional: Price per unit for bulk listings
                  </small>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Start Price (AED) *</label>
                <input
                  type="number"
                  name="start_price"
                  value={formData.start_price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="datetime-local"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Images * (1-5 images)</label>
            <input
              type="file"
              name="images"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              multiple
              onChange={handleImageChange}
              className="file-input"
            />
            <small className="file-hint">
              Select 1-5 images. Each image should be less than 5MB. Supported formats: JPEG, PNG, GIF, WebP
            </small>
            {imageError && <div className="error-message">{imageError}</div>}
            
            {imagePreviews.length > 0 && (
              <div className="image-preview-container">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview-wrapper">
                    <img src={preview} alt={`Preview ${index + 1}`} className="image-preview" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="remove-image-btn"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Posting...' : 'Post Ad'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;


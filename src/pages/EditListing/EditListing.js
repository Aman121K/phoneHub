import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './EditListing.css';

const EditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [fetching, setFetching] = useState(true);
  const [imageError, setImageError] = useState('');
  const [isAlreadyFeatured, setIsAlreadyFeatured] = useState(false);
  const [wantFeatured, setWantFeatured] = useState(false);
  const [featuredDuration, setFeaturedDuration] = useState(7);
  const [featuring, setFeaturing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get('/api/categories');
      if (response.data && Array.isArray(response.data)) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchListing = useCallback(async () => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      const listing = response.data;

      // Check if user is the owner
      if (listing.user?._id !== user.id && listing.user?._id !== user._id) {
        alert('You can only edit your own listings');
        navigate('/profile');
        return;
      }

      // Set form data
      setFormData({
        category_id: listing.category?._id || '',
        title: listing.title || '',
        description: listing.description || '',
        price: listing.price || '',
        per_price: listing.perPrice || '',
        storage: listing.storage || '',
        condition: listing.condition || '',
        city: listing.city || user.city || '',
        listing_type: listing.listingType || 'fixed_price',
        sellType: listing.sellType || 'single',
        start_price: '',
        end_date: '',
        quantity: listing.quantity || 1
      });

      // Set existing images
      if (listing.images && listing.images.length > 0) {
        setImagePreviews(listing.images);
      } else if (listing.imageUrl) {
        setImagePreviews([listing.imageUrl]);
      }

      // Check if listing is already featured
      setIsAlreadyFeatured(listing.isFeatured || false);
    } catch (error) {
      console.error('Error fetching listing:', error);
      alert('Error loading listing. Please try again.');
      navigate('/profile');
    } finally {
      setFetching(false);
    }
  }, [id, user, navigate]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.userType === 'buyer') {
      alert('Buyers can only bid on listings. Please register as a seller to edit listings.');
      navigate('/');
      return;
    }
    fetchCategories();
    fetchListing();
  }, [user, navigate, id, fetchCategories, fetchListing]);

  // Reset sellType to 'single' for non-business sellers
  useEffect(() => {
    if (user && user.userType === 'seller' && user.sellerType !== 'business' && formData.sellType === 'bulk') {
      setFormData(prev => ({ ...prev, sellType: 'single', quantity: 1 }));
    }
  }, [user, formData.sellType]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageError('');

    if (files.length === 0) {
      return;
    }

    if (files.length > 5) {
      setImageError('Maximum 5 images allowed');
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setImageError('Only image files are allowed (jpeg, jpg, png, gif, webp)');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setImageError('Each image must be less than 5MB');
      return;
    }

    // Add new files to existing images
    const newFiles = files.filter(file => !images.includes(file));
    setImages([...images, ...newFiles]);

    // Create previews for new files
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    
    // If it's a new file, remove from images array too
    if (index < images.length) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const getFeaturedPrice = (duration) => {
    const pricing = {
      7: 50,
      10: 70,
      15: 100,
      30: 180
    };
    return pricing[duration] || 50;
  };

  const handleFeatureListing = async () => {
    if (!wantFeatured || isAlreadyFeatured) {
      return;
    }

    setFeaturing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/payments/featured-listing',
        {
          listingId: id,
          duration: featuredDuration
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.paymentLink) {
        showToast('Redirecting to payment...', 'success');
        setTimeout(() => {
          window.location.href = response.data.paymentLink;
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating featured listing payment:', error);
      showToast(error.response?.data?.error || 'Failed to initiate payment. Please try again.', 'error');
      setFeaturing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageError('');

    // Validate images
    const totalImages = imagePreviews.length;
    if (totalImages === 0) {
      setImageError('At least one image is required');
      setLoading(false);
      return;
    }

    if (totalImages > 5) {
      setImageError('Maximum 5 images allowed');
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '' && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });

      // Separate existing images (URLs) from new files
      const existingImageUrls = imagePreviews.filter(preview => 
        preview.startsWith('http://') || preview.startsWith('https://')
      );
      const newImageFiles = images;

      // Add existing image URLs as JSON string
      if (existingImageUrls.length > 0) {
        submitData.append('existing_images', JSON.stringify(existingImageUrls));
      }

      // Add new image files
      newImageFiles.forEach((file) => {
        submitData.append('images', file);
      });

      // Update listing
      await axios.put(`/api/listings/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Listing updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating listing:', error);
      alert(error.response?.data?.error || 'Error updating listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-listing-page">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <span className="toast-icon">{toast.type === 'success' ? '✓' : '✕'}</span>
            <span className="toast-message">{toast.message}</span>
          </div>
          <button className="toast-close" onClick={() => setToast({ show: false, message: '', type: 'success' })}>
            ×
          </button>
        </div>
      )}

      <div className="edit-listing-container">
        <h1>Edit Listing</h1>
        <form onSubmit={handleSubmit} className="edit-listing-form">
          {/* Category */}
          <div className="form-group">
            <label>Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., iPhone 15 Pro Max 256GB"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Describe your iPhone..."
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price (AED) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Per Price (for bulk) */}
          {formData.sellType === 'bulk' && (
            <div className="form-group">
              <label>Per Price (AED)</label>
              <input
                type="number"
                name="per_price"
                value={formData.per_price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
          )}

          {/* Quantity */}
          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          {/* Storage */}
          <div className="form-group">
            <label>Storage *</label>
            <select
              name="storage"
              value={formData.storage}
              onChange={handleChange}
              required
            >
              <option value="">Select Storage</option>
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
            </select>
          </div>

          {/* Condition */}
          <div className="form-group">
            <label>Condition *</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="Brand New">Brand New</option>
              <option value="Like New">Like New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          {/* City */}
          <div className="form-group">
            <label>City *</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled
            >
              <option value={formData.city}>{formData.city}</option>
            </select>
          </div>

          {/* Sell Type */}
          <div className="form-group">
            <label>Sell Type *</label>
            <select
              name="sellType"
              value={formData.sellType}
              onChange={handleChange}
              required
              disabled={user?.userType === 'seller' && user?.sellerType !== 'business' && formData.sellType === 'single'}
            >
              <option value="single">Single</option>
              {user?.sellerType === 'business' && (
                <option value="bulk">Bulk</option>
              )}
            </select>
            {user?.userType === 'seller' && user?.sellerType !== 'business' && (
              <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>
                Bulk Sell is only available for business sellers
              </small>
            )}
          </div>

          {/* Images */}
          <div className="form-group">
            <label>Images (1-5 images) *</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            {imageError && <div className="error-message">{imageError}</div>}
            
            {imagePreviews.length > 0 && (
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="remove-image-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Featured Listing Option - Only for sellers and if not already featured */}
          {user && user.userType === 'seller' && (
            <div className="featured-listing-section">
              {isAlreadyFeatured ? (
                <div className="featured-status-message">
                  <span className="featured-icon">⭐</span>
                  <div>
                    <strong>This listing is already featured!</strong>
                    <p>Your listing is currently being featured on the homepage.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="featured-listing-header">
                    <input
                      type="checkbox"
                      id="wantFeatured"
                      checked={wantFeatured}
                      onChange={(e) => setWantFeatured(e.target.checked)}
                      className="featured-checkbox"
                    />
                    <label htmlFor="wantFeatured" className="featured-label">
                      <span className="featured-icon">⭐</span>
                      Feature this listing on homepage
                    </label>
                  </div>
                  
                  {wantFeatured && (
                    <div className="featured-duration-options">
                      <p className="featured-description">
                        Choose how long you want your listing to appear at the top of the homepage:
                      </p>
                      <div className="duration-grid">
                        {[
                          { days: 7, label: '7 Days', price: 50 },
                          { days: 10, label: '10 Days', price: 70 },
                          { days: 15, label: '15 Days', price: 100 },
                          { days: 30, label: '1 Month', price: 180 }
                        ].map((option) => (
                          <div
                            key={option.days}
                            className={`duration-option ${featuredDuration === option.days ? 'selected' : ''}`}
                            onClick={() => setFeaturedDuration(option.days)}
                          >
                            <div className="duration-label">{option.label}</div>
                            <div className="duration-price">AED {option.price}</div>
                          </div>
                        ))}
                      </div>
                      <div className="featured-total">
                        <strong>Total: AED {getFeaturedPrice(featuredDuration)}</strong>
                        <small>Your listing will be featured for {featuredDuration} days</small>
                      </div>
                      <button
                        type="button"
                        onClick={handleFeatureListing}
                        className="feature-purchase-btn"
                        disabled={featuring}
                      >
                        {featuring ? 'Processing...' : `Pay AED ${getFeaturedPrice(featuredDuration)} to Feature`}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListing;


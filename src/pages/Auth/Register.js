import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    userType: 'buyer',
    sellerType: '',
    businessName: '',
    tradeLicense: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      city: formData.city,
      userType: formData.userType,
      sellerType: formData.userType === 'seller' ? formData.sellerType : null,
      businessName: formData.userType === 'seller' && formData.sellerType === 'business' ? formData.businessName : null
    };

    const result = await register(registerData);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Join Our Marketplace</h1>
          <p>Buy and sell iPhones from thousands of sellers in UAE.</p>
          <ul className="register-benefits">
            <li>
              <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Access to millions of buyers
            </li>
            <li>
              <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Fast and secure transactions
            </li>
            <li>
              <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              24/7 customer support
            </li>
            <li>
              <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free listing for new users
            </li>
          </ul>
        </div>

        <div className="register-form-section">
          <h2>Create Account</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">Select your city</option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Ajman">Ajman</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Fujairah">Fujairah</option>
                <option value="Umm Al Quwain">Umm Al Quwain</option>
              </select>
            </div>
            <div className="form-group">
              <label>Are you a</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="buyer"
                    checked={formData.userType === 'buyer'}
                    onChange={handleChange}
                  />
                  <span>Buyer</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="seller"
                    checked={formData.userType === 'seller'}
                    onChange={handleChange}
                  />
                  <span>Seller</span>
                </label>
              </div>
            </div>
            {formData.userType === 'seller' && (
              <>
                <div className="form-group">
                  <label>Seller Type</label>
                  <select
                    name="sellerType"
                    value={formData.sellerType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Seller Type</option>
                    <option value="individual">Individual Seller</option>
                    <option value="business">Business Seller</option>
                  </select>
                </div>
                {formData.sellerType === 'business' && (
                  <>
                    <div className="form-group">
                      <label>Business Name</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* Trade License field commented out as per client requirement */}
                    {/* <div className="form-group">
                      <label>Trade License</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          name="tradeLicense"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleChange}
                          required
                          id="tradeLicense"
                        />
                        <label htmlFor="tradeLicense" className="file-upload-label">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Click to upload trade license (PDF, JPG, PNG)
                        </label>
                        {formData.tradeLicense && (
                          <span className="file-name">{formData.tradeLicense.name}</span>
                        )}
                      </div>
                    </div> */}
                  </>
                )}
              </>
            )}
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                />
                <span>I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></span>
              </label>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <p className="auth-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;


import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const VerifyEmail = () => {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const token = params.get('token');
  const queryEmail = params.get('email') || '';
  const sent = params.get('sent') === '1';

  const [email, setEmail] = useState(queryEmail);
  const [loading, setLoading] = useState(Boolean(token));
  const [resending, setResending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(
    sent ? 'Verification email sent. Please check your inbox.' : ''
  );

  useEffect(() => {
    const verify = async () => {
      if (!token) return;
      setError('');
      setMessage('');
      setLoading(true);

      try {
        const response = await axios.get(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
        if (response.data?.success) {
          setVerified(true);
          setMessage(response.data?.message || 'Email verified successfully.');
          return;
        }
        setError(response.data?.message || 'Verification failed.');
      } catch (err) {
        setError(err.response?.data?.message || 'Verification link is invalid or expired.');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setResending(true);
    try {
      const response = await axios.post('/api/auth/resend-verification', { email });
      setMessage(response.data?.message || 'If eligible, a verification email has been sent.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification email.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container" style={{ position: 'relative', zIndex: 1, gridTemplateColumns: '1fr' }}>
        <div className="login-right" style={{ maxWidth: 560, margin: '0 auto', width: '100%' }}>
          <h2>Email Verification</h2>

          {loading ? (
            <p style={{ color: '#6b7280' }}>Verifying your email. Please wait...</p>
          ) : null}

          {error ? <div className="error-message">{error}</div> : null}
          {message ? <div className="success-message">{message}</div> : null}

          {verified ? (
            <p className="auth-link">
              Your account is now verified. <Link to="/login">Go to Login</Link>
            </p>
          ) : (
            <>
              <p style={{ color: '#374151', marginBottom: 16 }}>
                Use the verification link in your email. If you did not receive it, request a new one below.
              </p>
              <form onSubmit={handleResend} className="login-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn" disabled={resending}>
                  {resending ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </form>
              <p className="auth-link">
                Already verified? <Link to="/login">Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

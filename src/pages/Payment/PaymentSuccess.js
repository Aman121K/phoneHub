import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Payment.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  const verifyPayment = useCallback(async () => {
      const paymentId = searchParams.get('payment_id');
      const paymentIntentId = searchParams.get('pi');

      if (!paymentId && !paymentIntentId) {
        setError('Payment ID not found');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        
        // If we have paymentId, verify using our backend
        if (paymentId) {
          // Verify payment with backend (this will also fetch from Ziina if needed)
          const response = await axios.post(
            `/api/payments/verify/${paymentId}`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );

          if (response.data && response.data.status === 'completed') {
            setPayment(response.data);
            
            // Refresh user data if verified batch payment was completed
            if (response.data.paymentType === 'verified_batch') {
              try {
                await refreshUser();
                console.log('User data refreshed after verified batch purchase');
              } catch (refreshError) {
                console.error('Error refreshing user data:', refreshError);
              }
            }
          } else if (response.data && response.data.status === 'pending') {
            // Payment is still pending, wait a bit and retry
            setTimeout(async () => {
              try {
                const retryResponse = await axios.post(
                  `/api/payments/verify/${paymentId}`,
                  {},
                  {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  }
                );
                if (retryResponse.data && retryResponse.data.status === 'completed') {
                  setPayment(retryResponse.data);
                  
                  // Refresh user data if verified batch payment was completed
                  if (retryResponse.data.paymentType === 'verified_batch') {
                    try {
                      await refreshUser();
                      console.log('User data refreshed after verified batch purchase');
                    } catch (refreshError) {
                      console.error('Error refreshing user data:', refreshError);
                    }
                  }
                } else {
                  setError('Payment is still being processed. Please wait a moment and check your profile.');
                }
              } catch (retryErr) {
                console.error('Error retrying payment verification:', retryErr);
                setError('Payment verification is in progress. Please check your profile in a few moments.');
              } finally {
                setLoading(false);
              }
            }, 2000);
            return; // Don't set loading to false yet
          } else {
            setError('Payment verification failed. Please contact support if you have completed the payment.');
          }
        } else if (paymentIntentId) {
          // If we only have payment intent ID, try to find payment by it
          setError('Please use the payment link with payment_id parameter. If issue persists, contact support.');
        }
      } catch (err) {
        console.error('Error verifying payment:', err);
        if (err.response?.status === 404) {
          setError('Payment not found. Please contact support with your payment details.');
        } else {
          setError('Failed to verify payment. The payment may still be processing. Please check your profile in a few moments or contact support.');
        }
      } finally {
        setLoading(false);
      }
  }, [searchParams, refreshUser]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  if (loading) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-loading">
            <div className="spinner"></div>
            <p>Verifying your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-error">
            <div className="payment-icon error-icon">❌</div>
            <h1>Payment Verification Failed</h1>
            <p>{error}</p>
            <div className="payment-actions">
              <Link to="/profile" className="btn-primary">Go to Profile</Link>
              <Link to="/" className="btn-secondary">Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-success">
          <div className="payment-icon success-icon">✅</div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment. Your transaction has been completed successfully.</p>
          
          {payment && (
            <div className="payment-details">
              <div className="detail-row">
                <span className="detail-label">Payment ID:</span>
                <span className="detail-value">{payment._id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">AED {payment.amount?.toFixed(2)}</span>
              </div>
              {payment.paymentType === 'featured_listing' && (
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{payment.featuredDuration} days</span>
                </div>
              )}
            </div>
          )}

          <div className="payment-actions">
            {payment?.paymentType === 'featured_listing' && payment?.listing ? (
              <Link to={`/listing/${payment.listing}`} className="btn-primary">
                View Your Featured Listing
              </Link>
            ) : payment?.paymentType === 'verified_batch' ? (
              <Link to="/profile?from_payment=success" className="btn-primary">Go to Profile</Link>
            ) : (
              <Link to="/profile" className="btn-primary">Go to Profile</Link>
            )}
            <Link to="/" className="btn-secondary">Go Home</Link>
          </div>

          <p className="payment-note">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;


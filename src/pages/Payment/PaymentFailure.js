import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Payment.css';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-failure">
          <div className="payment-icon error-icon">❌</div>
          <h1>Payment Failed</h1>
          <p>We're sorry, but your payment could not be processed. Please try again or use a different payment method.</p>
          
          {paymentId && (
            <div className="payment-details">
              <div className="detail-row">
                <span className="detail-label">Payment ID:</span>
                <span className="detail-value">{paymentId}</span>
              </div>
            </div>
          )}

          <div className="payment-info">
            <h3>What could have gone wrong?</h3>
            <ul>
              <li>Insufficient funds in your account</li>
              <li>Card declined by your bank</li>
              <li>Network or technical issues</li>
              <li>Payment method not supported</li>
            </ul>
          </div>

          <div className="payment-actions">
            <Link to="/post-ad" className="btn-primary">Try Again</Link>
            <Link to="/contact" className="btn-secondary">Contact Support</Link>
            <Link to="/" className="btn-secondary">Go Home</Link>
          </div>

          <p className="payment-note">
            If you continue to experience issues, please contact our support team at support@phonehub.ae
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;


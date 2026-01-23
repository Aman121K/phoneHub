import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Payment.css';

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-cancel">
          <div className="payment-icon cancel-icon">⚠️</div>
          <h1>Payment Cancelled</h1>
          <p>Your payment was cancelled. No charges have been made to your account.</p>
          
          {paymentId && (
            <div className="payment-details">
              <div className="detail-row">
                <span className="detail-label">Payment ID:</span>
                <span className="detail-value">{paymentId}</span>
              </div>
            </div>
          )}

          <div className="payment-actions">
            <Link to="/post-ad" className="btn-primary">Try Again</Link>
            <Link to="/" className="btn-secondary">Go Home</Link>
          </div>

          <p className="payment-note">
            If you have any questions or need assistance, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;


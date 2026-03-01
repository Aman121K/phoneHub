import React from 'react';
import './RefundPolicy.css';

const RefundPolicy = () => {
  return (
    <div className="policy-page">
      <div className="page-hero">
        <h1>Refund and Return Policy</h1>
        <p>Important information for buyers and sellers</p>
      </div>
      <div className="policy-container">
        <div className="policy-content">
          <section className="policy-section">
            <h2>1. No Direct Sales</h2>
            <p>
              We do not buy, sell, or own any mobile phones listed on our platform. All listings are
              posted by independent sellers. We act solely as a mediator to connect buyers and sellers.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. No Payment Processing</h2>
            <p>
              We do not handle payments, process transactions, or hold funds on behalf of users. Any
              payment arrangements, deposits, or final transactions are made directly between the buyer
              and seller. As such, we cannot issue refunds for any payments made outside our platform.
            </p>
          </section>

          <section className="policy-section">
            <h2>3. Disputes Between Users</h2>
            <p>
              Since we do not facilitate payments, we are not responsible for disputes regarding product
              condition, pricing, delivery, or refunds between buyers and sellers. Users are encouraged
              to communicate clearly, inspect devices in person where possible, and complete transactions
              in a safe and secure manner.
            </p>
          </section>

          <section className="policy-section">
            <h2>4. Listing Fees (If Applicable)</h2>
            <p>
              If we charge a nominal fee for listing or promoting a phone, that fee is non-refundable
              once the listing is published. This covers platform maintenance and moderation services.
            </p>
          </section>

          <section className="policy-section">
            <h2>5. Prohibited Listings</h2>
            <p>
              We reserve the right to remove any listing that violates our terms. In such cases, no
              refund will be issued for any listing fees paid.
            </p>
          </section>

          <section className="policy-section">
            <h2>6. Contact Us</h2>
            <p>
              If you have concerns about a listing or another user, please contact us at{' '}
              <a href="mailto:support@phonehub.ae">support@phonehub.ae</a>. While we cannot intervene
              in financial disputes, we may assist by flagging suspicious activity or providing listing
              history if requested.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;

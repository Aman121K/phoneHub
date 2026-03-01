import React from 'react';
import './PostingPolicy.css';

const PostingPolicy = () => {
  return (
    <div className="policy-page">
      <div className="page-hero">
        <h1>Posting Policy</h1>
        <p>Rules for posting mobile phone listings on PhoneHub</p>
      </div>
      <div className="policy-container">
        <div className="policy-content">
          <section className="policy-section">
            <h2>1. Mobile Phones Only</h2>
            <p>
              Listings are strictly limited to mobile phones and smartphones. Tablets, smartwatches,
              accessories, or other electronic devices are not permitted.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Accurate Description</h2>
            <p>Sellers must provide truthful and accurate information about the device, including:</p>
            <ul>
              <li>Brand and model</li>
              <li>Storage capacity</li>
              <li>Color</li>
              <li>Condition (new, like new, used, fair, parts not working)</li>
              <li>Any defects or issues (scratches, battery health, screen damage, etc.)</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Clear Photos</h2>
            <p>
              Listings must include clear, original photos of the actual device. Stock images alone are
              not sufficient. Photos should show the front, back, sides, and any visible wear or damage.
            </p>
          </section>

          <section className="policy-section">
            <h2>4. Honest Pricing</h2>
            <p>
              Sellers should set fair and realistic prices. Misleading pricing or bait-and-switch tactics
              are strictly prohibited.
            </p>
          </section>

          <section className="policy-section">
            <h2>5. No Counterfeit or Illegal Devices</h2>
            <p>
              Listings for counterfeit, replica, stolen, or unauthorized devices are forbidden. Sellers
              must have legal ownership of the device they are listing.
            </p>
          </section>

          <section className="policy-section">
            <h2>6. No Spam or Duplicate Listings</h2>
            <p>
              Do not post the same device multiple times. Duplicate or spam listings will be removed,
              and repeat offenders may be banned.
            </p>
          </section>

          <section className="policy-section">
            <h2>7. Listing Removal</h2>
            <p>
              We reserve the right to remove any listing that violates this policy without notice.
              Repeated violations may result in account suspension or permanent ban.
            </p>
          </section>

          <section className="policy-section">
            <h2>8. Report a Listing</h2>
            <p>
              If you come across a suspicious or inappropriate listing, please report it to us
              immediately at <a href="mailto:support@phonehub.ae">support@phonehub.ae</a>.
            </p>
          </section>

          <section className="policy-section">
            <ul>
              <li>By posting on PhoneHub, sellers agree to follow this Posting Policy.</li>
              <li>PhoneHub may update this policy at any time.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostingPolicy;

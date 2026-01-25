import React from 'react';
import './AuctionPolicy.css';

const AuctionPolicy = () => {
  return (
    <div className="policy-page">
      <div className="page-hero">
        <h1>Auction Policy</h1>
        <p>Rules and guidelines for auction listings</p>
      </div>
      <div className="policy-container">
        <div className="policy-content">
          <section className="policy-section">
            <h2>1. Platform Role & Responsibility</h2>
            <p>
              PhoneHub operates as a neutral marketplace platform only. We do not own, sell, or ship any iPhones listed in auctions. Our role is limited to:
            </p>
            <ul>
              <li>Providing a secure listing and bidding platform</li>
              <li>Facilitating payment processing</li>
              <li>Holding funds during the inspection period</li>
              <li>Mediating disputes based on evidence and policy</li>
            </ul>
            <p>
              All transactions are solely between Verified Business Sellers and Registered Buyers.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Seller Eligibility & Responsibilities</h2>
            <ul>
              <li>Only verified business sellers with completed business registration may create auction listings</li>
              <li>Sellers must provide:
                <ul>
                  <li>Accurate, detailed descriptions</li>
                  <li>Clear, unedited photos from all angles</li>
                  <li>Honest condition grading (e.g., Mint, Good, Fair)</li>
                  <li>Disclosure of any defects, network locks, or iCloud status</li>
                </ul>
              </li>
              <li>False or misleading listings result in immediate removal, seller penalties, and possible permanent ban</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Auction Rules & Bidding</h2>
            <ul>
              <li>All bids are binding commitments to purchase if won</li>
              <li>Bid retractions are not allowed except in proven system errors</li>
              <li><strong>Auction extension rule:</strong> If a bid is placed in the final 2 minutes, the auction extends by 5 minutes</li>
              <li>Winning bidder must complete payment within 48 hours of auction close</li>
              <li><strong>Non-payment penalty:</strong> Account suspension and possible bidding ban for 30 days</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Payment & Fund Security</h2>
            <ul>
              <li>All payments are processed through PhoneHub's secure payment gateway</li>
              <li>Funds are held in escrow for 7 days after confirmed delivery</li>
              <li>Sellers receive payment only after:
                <ul>
                  <li>Buyer confirms receipt</li>
                  <li>7-day inspection period passes without dispute</li>
                </ul>
              </li>
              <li>PhoneHub deducts a 5% commission before releasing funds to seller</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Inspection & Return Policy</h2>
            <ul>
              <li>Buyers have 7 calendar days from delivery to inspect the iPhone</li>
              <li><strong>Valid return reasons (seller pays return shipping):</strong>
                <ul>
                  <li>Item not as described (wrong model, storage, color)</li>
                  <li>Undisclosed damage or malfunction</li>
                  <li>iCloud locked or network locked when stated as unlocked</li>
                </ul>
              </li>
              <li><strong>Invalid return reasons (buyer pays return shipping if seller accepts return):</strong>
                <ul>
                  <li>Buyer's remorse</li>
                  <li>Cosmetic expectations not matching photos</li>
                  <li>Minor scratches already disclosed</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>6. Dispute Resolution Process</h2>
            <ol>
              <li>Buyer reports issue within 7 days with photo/video evidence</li>
              <li>Seller responds within 48 hours with solution proposal</li>
              <li>PhoneHub mediation if no agreement:
                <ul>
                  <li>Review listing details vs. evidence</li>
                  <li>Check communication history</li>
                  <li>Make final binding decision within 3 business days</li>
                </ul>
              </li>
              <li>Resolution options:
                <ul>
                  <li>Full refund after return verification</li>
                  <li>Partial refund for minor discrepancies</li>
                  <li>No refund if buyer's claim is unsubstantiated</li>
                </ul>
              </li>
            </ol>
          </section>

          <section className="policy-section">
            <h2>7. Cancellation Policy</h2>
            <ul>
              <li>Sellers cannot cancel an auction after first bid is placed</li>
              <li>Buyers cannot cancel after winning bid is placed</li>
              <li><strong>Exceptions (with platform approval):</strong>
                <ul>
                  <li>Proven listing error</li>
                  <li>Item damaged before shipping</li>
                  <li>Fraudulent activity detected</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>8. Penalties & Account Actions</h2>
            <ul>
              <li><strong>Buyer violations (non-payment, false claims):</strong> Account restriction, bidding ban</li>
              <li><strong>Seller violations (misrepresentation, shipping delays):</strong> Commission increase, listing suspension, account termination</li>
              <li>Both parties must maintain professional communication; abuse results in immediate suspension</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>9. Shipping & Delivery</h2>
            <ul>
              <li>Sellers must ship within 2 business days of payment confirmation</li>
              <li>Tracking must be uploaded to platform within 24 hours of shipping</li>
              <li>Delivery delays beyond 5 business days may result in automatic refund to buyer</li>
              <li>Buyers must inspect package upon delivery; report damage to courier immediately</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>10. Transparency & Communication</h2>
            <ul>
              <li>All communication must remain on-platform for dispute protection</li>
              <li><strong>Sellers must disclose:</strong>
                <ul>
                  <li>Battery health percentage</li>
                  <li>Screen condition (scratches, burns, replacements)</li>
                  <li>Any previous repairs</li>
                  <li>Original box and accessories included</li>
                </ul>
              </li>
              <li>Buyers must ask questions before bidding, not after winning</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>11. Policy Updates & Agreement</h2>
            <ul>
              <li>PhoneHub reserves the right to update this policy with 7 days notice</li>
              <li>By participating in PhoneHub auctions, users agree to all terms</li>
              <li>This policy is enforceable and binding for all auction transactions</li>
            </ul>
          </section>

          <section className="policy-section">
            <p className="last-updated">
              <strong>Need help?</strong> Contact our Auction Support Team: <a href="mailto:support@phonehub.ae">support@phonehub.ae</a>
            </p>
            <p>
              <strong>Response time:</strong> 24–48 business hours
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuctionPolicy;


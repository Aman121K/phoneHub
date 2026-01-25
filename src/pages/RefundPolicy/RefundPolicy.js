import React from 'react';
import './RefundPolicy.css';

const RefundPolicy = () => {
  return (
    <div className="policy-page">
      <div className="page-hero">
        <h1>Refund and Returns Policy</h1>
        <p>Understanding our refund and return procedures</p>
      </div>
      <div className="policy-container">
        <div className="policy-content">
          <section className="policy-section">
            <h2>1. General Overview</h2>
            <p>
              PhoneHub is a dedicated marketplace connecting iPhone buyers and sellers. We do not own, 
              sell, or handle any devices directly. All transactions and agreements are between buyers 
              and sellers. This policy applies to Single Listings, Bulk Listings, and Auction Listings.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Single & Bulk Listings Policy</h2>
            <p>
              These listings involve direct communication and meetup between buyers and sellers. PhoneHub only facilitates the connection.
            </p>
            
            <div className="policy-item">
              <h3>Returns & Refunds:</h3>
              <ul>
                <li>All returns and refunds must be handled directly between the buyer and seller.</li>
                <li>PhoneHub does not mediate, enforce, or process returns/refunds for single or bulk listings.</li>
                <li>Buyers are advised to inspect the iPhone thoroughly during meetup before payment.</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Cancellations:</h3>
              <ul>
                <li>Either party may cancel the transaction before meeting without penalty.</li>
                <li>After meeting, cancellation terms are at the discretion of the buyer and seller.</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Dispute Responsibility:</h3>
              <ul>
                <li>PhoneHub is not responsible for misrepresentation, non-payment, or item condition in single/bulk transactions.</li>
                <li>Users are encouraged to communicate clearly and use secure payment methods.</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>3. Auction Listings Policy</h2>
            <p>
              Auction listings are for verified business sellers only and involve secured online payments via PhoneHub's payment gateway.
            </p>

            <div className="policy-item">
              <h3>A. Cancellation Policy</h3>
              
              <h4>Seller Cancellation:</h4>
              <ul>
                <li>Sellers cannot cancel an auction after the first bid is placed.</li>
                <li>If a seller cancels without valid reason, they may be charged a fee and face account suspension.</li>
              </ul>

              <h4>Buyer Cancellation:</h4>
              <ul>
                <li>Winning bidders cannot cancel after payment is made.</li>
                <li>Failure to pay within 48 hours of auction close will result in:
                  <ul>
                    <li>Cancellation of the sale</li>
                    <li>Penalty to the buyer's account</li>
                    <li>Item offered to the next highest bidder</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>B. Return Policy</h3>
              <p>Returns are only accepted under the following conditions:</p>
              
              <h4>1. Item Not as Described:</h4>
              <ul>
                <li>Wrong model, storage, color, or network lock status.</li>
                <li>Undisclosed damage or malfunction (DOA – Dead on Arrival).</li>
                <li>Missing accessories promised in the listing.</li>
              </ul>

              <h4>2. Return Timeframe:</h4>
              <ul>
                <li>Buyers must report the issue within 7 calendar days of delivery.</li>
                <li>Evidence (photos/videos) must be provided.</li>
              </ul>

              <h4>3. Non-Returnable Situations:</h4>
              <ul>
                <li>Buyer's remorse (change of mind, minor scratches).</li>
                <li>Issues reported after 7 days.</li>
                <li>Damage caused by the buyer after delivery.</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>C. Refund Policy</h3>
              
              <h4>1. Refund Process:</h4>
              <ol>
                <li>Buyer reports issue within 7 days → Seller responds within 48 hours.</li>
                <li>If approved, buyer ships item back to seller at seller's expense (if misrepresented).</li>
                <li>Once seller confirms receipt, PhoneHub issues refund within 3–5 business days to the original payment method.</li>
              </ol>

              <h4>2. Refund Exceptions:</h4>
              <ul>
                <li>Shipping costs are non-refundable unless the seller is at fault.</li>
                <li>Refunds are only processed after the returned iPhone is verified by the seller.</li>
              </ul>

              <h4>3. Funds Hold & Release:</h4>
              <ul>
                <li>PhoneHub holds payment for 7 days after delivery.</li>
                <li>If no dispute is raised, funds are released to the seller automatically.</li>
                <li>If a dispute is raised, funds are held until resolved.</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>4. Dispute Resolution for Auctions</h2>
            <ul>
              <li>PhoneHub will mediate disputes based on:
                <ul>
                  <li>Auction listing details</li>
                  <li>Communication records</li>
                  <li>Photo/video evidence</li>
                </ul>
              </li>
              <li>Our decision is final regarding fund release, account suspension, or return approval.</li>
              <li>PhoneHub may suspend accounts of users who violate policies repeatedly.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Fees & Charges</h2>
            <ul>
              <li><strong>Single/Bulk Listings:</strong> Free or small listing fee (no commission).</li>
              <li><strong>Auction Listings:</strong> Commission fee 5% deducted before releasing funds to seller.</li>
              <li>All fees are non-refundable once a transaction is completed.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>6. General Terms</h2>
            <ul>
              <li>Users must comply with all PhoneHub policies.</li>
              <li>PhoneHub reserves the right to update this policy at any time.</li>
              <li>By using PhoneHub, you agree to this policy and acknowledge that PhoneHub acts only as a platform facilitator.</li>
            </ul>
          </section>

          <section className="policy-section">
            <p className="last-updated">
              <strong>Last Updated:</strong> December 27, 2025
            </p>
            <p>
              <strong>Contact:</strong> For auction-related disputes, contact <a href="mailto:support@phonehub.ae">support@phonehub.ae</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;


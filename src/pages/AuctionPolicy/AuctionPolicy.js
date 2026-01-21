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
            <h2>Overview</h2>
            <p>
              This policy governs all auction listings on PhoneHub. Auctions provide an exciting 
              way to buy and sell iPhones through competitive bidding. All participants must 
              understand and comply with these rules.
            </p>
          </section>

          <section className="policy-section">
            <h2>Creating an Auction</h2>
            <div className="policy-item">
              <h3>Seller Requirements</h3>
              <p>When creating an auction listing, sellers must:</p>
              <ul>
                <li><strong>Set a Clear Starting Price:</strong> Minimum bid amount that bidders must meet or exceed</li>
                <li><strong>Set Specific End Date and Time:</strong> Choose a date and time when the auction will automatically close</li>
                <li><strong>Provide Accurate Item Description:</strong> Include all relevant details about condition, specifications, and any defects</li>
                <li><strong>Upload High-Quality Photos:</strong> Minimum 3 photos showing the actual item from multiple angles</li>
                <li><strong>Specify All Terms and Conditions:</strong> Payment methods, shipping options, pickup locations, and any special conditions</li>
                <li><strong>Be Available to Complete Transaction:</strong> Ensure you can complete the sale if the auction is successful</li>
                <li><strong>Set Reserve Price (Optional):</strong> Minimum acceptable price - if not met, seller is not obligated to sell</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Auction Duration</h3>
              <ul>
                <li><strong>Minimum Duration:</strong> 24 hours from listing creation</li>
                <li><strong>Maximum Duration:</strong> 30 days from listing creation</li>
                <li><strong>Recommended Duration:</strong> 3-7 days for optimal bidder participation</li>
                <li><strong>End Time Display:</strong> End time is displayed in local time (UAE timezone)</li>
                <li><strong>Automatic Closure:</strong> Auctions automatically close at the specified end time - no manual action required</li>
                <li><strong>Time Extensions:</strong> Auctions cannot be extended once created, except in exceptional circumstances (contact support)</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Featured Auctions</h3>
              <p>
                Sellers can choose to feature their auction listings for increased visibility:
              </p>
              <ul>
                <li>Featured auctions appear at the top of auction listings</li>
                <li>Featured status lasts for the duration of the auction</li>
                <li>Featured auctions typically receive more views and bids</li>
                <li>Feature fee is non-refundable even if auction is cancelled (before bids are placed)</li>
                <li>Contact support for featured auction pricing</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Bidding Rules</h2>
            <div className="policy-item">
              <h3>For Bidders</h3>
              <ul>
                <li><strong>Binding Bids:</strong> All bids are final and cannot be retracted once placed</li>
                <li><strong>Minimum Increment:</strong> Each bid must meet or exceed the minimum increment based on current price</li>
                <li><strong>Auto-Bidding (Proxy Bidding):</strong> You can set a maximum bid - the system will automatically bid on your behalf up to your maximum if you're outbid</li>
                <li><strong>Winning Obligation:</strong> Winning bidders are legally obligated to complete the purchase</li>
                <li><strong>Payment Terms:</strong> Payment methods and terms are agreed upon with the seller after auction ends</li>
                <li><strong>Account Requirement:</strong> You must have a registered PhoneHub account to place bids</li>
                <li><strong>Bid Confirmation:</strong> You will receive email confirmation for each bid you place</li>
                <li><strong>Outbid Notifications:</strong> You will be notified if another bidder outbids you</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Bid Increments</h3>
              <p>Minimum bid increments are based on current highest bid:</p>
              <ul>
                <li><strong>Under AED 1,000:</strong> Minimum AED 50 increment</li>
                <li><strong>AED 1,000 - AED 5,000:</strong> Minimum AED 100 increment</li>
                <li><strong>Above AED 5,000:</strong> Minimum AED 200 increment</li>
              </ul>
              <p>
                <strong>Example:</strong> If current bid is AED 1,500, your next bid must be at least AED 1,600 (AED 1,500 + AED 100 minimum increment).
              </p>
            </div>

            <div className="policy-item">
              <h3>Bid Retraction Policy</h3>
              <p>
                Bids are generally non-retractable. However, bids may be retracted in exceptional circumstances:
              </p>
              <ul>
                <li>Seller significantly changed the item description after you placed your bid</li>
                <li>You made an obvious typo (e.g., bid AED 10,000 instead of AED 1,000) - must contact support immediately</li>
                <li>Seller provided false or misleading information that affects the item's value</li>
                <li>Technical error on PhoneHub's platform</li>
              </ul>
              <p>
                <strong>To request bid retraction:</strong> Contact support@phonehub.ae immediately with your reason and auction details. 
                Retraction requests are reviewed on a case-by-case basis.
              </p>
            </div>

            <div className="policy-item">
              <h3>Sniping and Last-Minute Bidding</h3>
              <p>
                PhoneHub uses automatic time extensions to prevent bid sniping:
              </p>
              <ul>
                <li>If a bid is placed in the final 5 minutes of an auction, the auction end time is automatically extended by 5 minutes</li>
                <li>This extension continues if additional bids are placed during the extended period</li>
                <li>This ensures fair competition and prevents last-second bid sniping</li>
                <li>Maximum extension: Auction will not extend beyond 30 minutes from original end time</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Auction Completion</h2>
            <div className="policy-item">
              <h3>When Auction Ends</h3>
              <ul>
                <li><strong>Winner Determination:</strong> The highest bidder at the end time (after any extensions) wins the auction</li>
                <li><strong>Notifications:</strong> Both buyer and seller receive email and in-app notifications immediately</li>
                <li><strong>Reserve Price Check:</strong> If a reserve price was set and not met, seller is not obligated to sell</li>
                <li><strong>Contact Timeline:</strong> Seller must contact the winning bidder within 24 hours of auction end</li>
                <li><strong>Transaction Deadline:</strong> Transaction must be completed within 7 days of auction end</li>
                <li><strong>Payment Processing:</strong> Payment is processed through Ziina or agreed-upon method</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Seller Responsibilities</h3>
              <ul>
                <li><strong>Honor Auction Result:</strong> Must sell to the highest bidder (unless reserve price not met)</li>
                <li><strong>No Cancellation:</strong> Cannot cancel auction after bids have been placed</li>
                <li><strong>Accurate Delivery:</strong> Must deliver item exactly as described in the listing</li>
                <li><strong>Prompt Response:</strong> Respond to winning bidder's contact within 24 hours</li>
                <li><strong>Good Faith Transaction:</strong> Complete transaction honestly and professionally</li>
                <li><strong>Item Availability:</strong> Ensure item is still available and in same condition as described</li>
                <li><strong>Payment Coordination:</strong> Coordinate payment method and delivery/pickup with buyer</li>
                <li><strong>Update Listing Status:</strong> Mark auction as "Sold" once transaction is complete</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Buyer Responsibilities</h3>
              <ul>
                <li><strong>Complete Purchase:</strong> Must complete the purchase if you win the auction</li>
                <li><strong>Prompt Contact:</strong> Contact seller within 24 hours of winning to arrange transaction</li>
                <li><strong>Payment Obligation:</strong> Make payment as agreed with seller within 7 days</li>
                <li><strong>No Retraction:</strong> Cannot retract winning bid - it is a binding commitment</li>
                <li><strong>Payment Methods:</strong> Use agreed-upon payment method (Ziina, bank transfer, cash on pickup)</li>
                <li><strong>Communication:</strong> Maintain clear communication with seller throughout transaction</li>
                <li><strong>Pickup/Shipping:</strong> Coordinate pickup location or provide shipping address promptly</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Reserve Price Auctions</h3>
              <p>
                If a seller sets a reserve price (minimum acceptable price):
              </p>
              <ul>
                <li>Reserve price is not visible to bidders during the auction</li>
                <li>If final bid meets or exceeds reserve price, seller must sell</li>
                <li>If final bid is below reserve price, seller is not obligated to sell</li>
                <li>Bidders will see "Reserve Not Met" if highest bid is below reserve</li>
                <li>Seller can still choose to sell below reserve if they wish</li>
                <li>If reserve not met, seller may contact highest bidder with a "Second Chance Offer"</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Payment and Transaction Process</h2>
            <div className="policy-item">
              <h3>Payment Methods</h3>
              <p>
                Accepted payment methods for auction transactions:
              </p>
              <ul>
                <li><strong>Ziina Payment Gateway:</strong> Secure online payment (recommended)</li>
                <li><strong>Bank Transfer:</strong> Direct bank-to-bank transfer</li>
                <li><strong>Cash on Pickup:</strong> Cash payment when meeting in person</li>
                <li><strong>Other Methods:</strong> As agreed between buyer and seller</li>
              </ul>
              <p>
                <strong>Important:</strong> For high-value items, we recommend using Ziina or bank transfer 
                for security and transaction records.
              </p>
            </div>

            <div className="policy-item">
              <h3>Payment Timeline</h3>
              <ul>
                <li><strong>Initial Contact:</strong> Buyer and seller must connect within 24 hours of auction end</li>
                <li><strong>Payment Arrangement:</strong> Payment method and timeline agreed within 48 hours</li>
                <li><strong>Payment Deadline:</strong> Payment must be completed within 7 days of auction end</li>
                <li><strong>Late Payment:</strong> Failure to pay within 7 days may result in account suspension</li>
                <li><strong>Payment Confirmation:</strong> Seller should confirm receipt before shipping or releasing item</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Delivery and Pickup</h3>
              <ul>
                <li><strong>Pickup Option:</strong> Buyer and seller can arrange in-person pickup at a safe, public location</li>
                <li><strong>Shipping Option:</strong> Seller can ship item after payment confirmation</li>
                <li><strong>Shipping Costs:</strong> Shipping costs are typically paid by buyer unless otherwise agreed</li>
                <li><strong>Delivery Timeline:</strong> Item should be delivered/shipped within 3-5 business days after payment</li>
                <li><strong>Tracking:</strong> For shipped items, seller should provide tracking information</li>
                <li><strong>Inspection:</strong> Buyer has right to inspect item before finalizing transaction (if meeting in person)</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Auction Cancellation</h2>
            <div className="policy-item">
              <h3>Seller Cancellation</h3>
              <ul>
                <li><strong>Before Bids:</strong> Sellers can cancel auctions only if no bids have been placed</li>
                <li><strong>After Bids:</strong> Once bids are placed, cancellation is not allowed except in exceptional circumstances</li>
                <li><strong>Exceptional Circumstances:</strong> Item damaged, lost, or no longer available - must contact support immediately</li>
                <li><strong>Repeated Cancellations:</strong> Frequent cancellations may result in account restrictions or suspension</li>
                <li><strong>Featured Auction Fees:</strong> Feature fees are non-refundable if auction is cancelled</li>
                <li><strong>Notification:</strong> All bidders will be notified if an auction is cancelled</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Platform Cancellation</h3>
              <p>
                PhoneHub may cancel auctions that:
              </p>
              <ul>
                <li>Violate our posting or auction policies</li>
                <li>Contain fraudulent or misleading information</li>
                <li>Involve prohibited or illegal items</li>
                <li>Harm the marketplace community or user trust</li>
                <li>Are reported for policy violations</li>
                <li>Involve suspicious bidding activity</li>
              </ul>
              <p>
                <strong>Notification:</strong> Affected users (seller and bidders) will be notified via email if an auction is cancelled by PhoneHub.
              </p>
            </div>

            <div className="policy-item">
              <h3>Buyer Cancellation</h3>
              <p>
                Buyers cannot cancel their winning bid. However, if:
              </p>
              <ul>
                <li>Item is significantly different from description</li>
                <li>Seller fails to respond within 48 hours</li>
                <li>Seller refuses to honor the auction result</li>
                <li>Technical error prevented proper bidding</li>
              </ul>
              <p>
                Contact support@phonehub.ae immediately with evidence. We will review on a case-by-case basis.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <h2>Disputes and Issues</h2>
            <div className="policy-item">
              <h3>Non-Payment by Buyer</h3>
              <p>
                If a winning bidder fails to complete payment within 7 days:
              </p>
              <ul>
                <li><strong>Seller Action:</strong> Seller should report the issue to PhoneHub support immediately</li>
                <li><strong>Buyer Notification:</strong> Buyer receives warning and final payment reminder</li>
                <li><strong>Account Suspension:</strong> Buyer account may be suspended until payment is resolved</li>
                <li><strong>Relisting Option:</strong> Seller may relist the item after 7 days of non-payment</li>
                <li><strong>Permanent Ban:</strong> Repeated non-payment results in permanent account ban</li>
                <li><strong>Negative Feedback:</strong> Non-paying buyers may receive negative feedback on their account</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Item Not as Described</h3>
              <p>
                If the item received doesn't match the listing description:
              </p>
              <ul>
                <li><strong>Immediate Contact:</strong> Buyer should contact seller immediately (within 24 hours of receipt)</li>
                <li><strong>Documentation:</strong> Provide clear evidence (photos, videos) showing discrepancies</li>
                <li><strong>Seller Response:</strong> Seller should respond within 48 hours to resolve the issue</li>
                <li><strong>Support Mediation:</strong> If unresolved, contact PhoneHub support for mediation</li>
                <li><strong>Resolution Options:</strong> We may require:
                  <ul>
                    <li>Full or partial refund</li>
                    <li>Return of item for full refund</li>
                    <li>Exchange for item as described</li>
                    <li>Compensation for differences</li>
                  </ul>
                </li>
                <li><strong>Seller Penalties:</strong> Sellers who misrepresent items may face account restrictions</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Seller Refuses to Sell</h3>
              <p>
                If a seller refuses to honor the auction result:
              </p>
              <ul>
                <li><strong>Buyer Action:</strong> Report to PhoneHub support immediately with auction details</li>
                <li><strong>Investigation:</strong> We will investigate and verify the situation</li>
                <li><strong>Seller Penalties:</strong> Seller may face:
                  <ul>
                    <li>Account warning or suspension</li>
                    <li>Requirement to complete the sale</li>
                    <li>Compensation to buyer for inconvenience</li>
                    <li>Permanent ban for repeated violations</li>
                  </ul>
                </li>
                <li><strong>Buyer Protection:</strong> Buyer may receive compensation or assistance finding similar item</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Dispute Resolution Process</h3>
              <ol>
                <li><strong>Direct Communication:</strong> Try to resolve directly with the other party first</li>
                <li><strong>Document Evidence:</strong> Gather all relevant information (messages, photos, transaction details)</li>
                <li><strong>Contact Support:</strong> Email support@phonehub.ae with:
                  <ul>
                    <li>Auction ID and listing details</li>
                    <li>Description of the issue</li>
                    <li>All relevant evidence</li>
                    <li>Desired resolution</li>
                  </ul>
                </li>
                <li><strong>Review Period:</strong> Our team reviews disputes within 3-5 business days</li>
                <li><strong>Mediation:</strong> We may contact both parties for additional information</li>
                <li><strong>Decision:</strong> Final decision is made based on evidence and policies</li>
                <li><strong>Appeal:</strong> Either party may appeal within 7 days with new evidence</li>
              </ol>
            </div>
          </section>

          <section className="policy-section">
            <h2>Prohibited Practices</h2>
            <p>The following practices are strictly prohibited and will result in severe penalties:</p>
            <div className="policy-item">
              <h3>Bidding Violations</h3>
              <ul>
                <li><strong>Shill Bidding:</strong> Sellers bidding on their own auctions or having others bid to inflate prices</li>
                <li><strong>Bid Manipulation:</strong> Coordinating with friends, family, or others to manipulate auction prices</li>
                <li><strong>False Bidding:</strong> Placing bids with no intention to purchase if you win</li>
                <li><strong>Retracting Bids:</strong> Attempting to cancel or retract placed bids without valid reason</li>
                <li><strong>Bid Sniping Abuse:</strong> Using automated tools or scripts to place last-second bids (our system prevents this)</li>
                <li><strong>Multiple Account Bidding:</strong> Using multiple accounts to bid on the same auction</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Transaction Violations</h3>
              <ul>
                <li><strong>Circumventing Fees:</strong> Arranging transactions outside the platform to avoid fees</li>
                <li><strong>Contact Information Sharing:</strong> Sharing phone numbers, emails, or external links in listings or messages to bypass platform</li>
                <li><strong>False Non-Payment Claims:</strong> Sellers falsely claiming non-payment when payment was made</li>
                <li><strong>Payment Fraud:</strong> Using fraudulent payment methods or chargebacks without valid reason</li>
                <li><strong>Item Substitution:</strong> Delivering a different item than what was won in the auction</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Listing Violations</h3>
              <ul>
                <li><strong>Misleading Descriptions:</strong> Intentionally providing false or misleading item descriptions</li>
                <li><strong>Fake Photos:</strong> Using stock photos or images that don't represent the actual item</li>
                <li><strong>Hidden Defects:</strong> Intentionally hiding or not disclosing significant defects or issues</li>
                <li><strong>Price Manipulation:</strong> Setting artificially low starting prices to attract bidders, then refusing to sell</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Consequences of Violations</h3>
              <p>
                Violations may result in:
              </p>
              <ul>
                <li><strong>Immediate Account Suspension:</strong> Temporary suspension while investigation occurs</li>
                <li><strong>Permanent Account Ban:</strong> For serious or repeated violations</li>
                <li><strong>Listing Removal:</strong> All active listings and auctions removed</li>
                <li><strong>Legal Action:</strong> Severe fraud cases may be reported to authorities</li>
                <li><strong>Financial Penalties:</strong> Compensation may be required for affected parties</li>
                <li><strong>Public Disclosure:</strong> Serious violations may be disclosed to protect the community</li>
              </ul>
              <p>
                <strong>Zero Tolerance:</strong> PhoneHub has a zero-tolerance policy for fraud, shill bidding, and intentional misrepresentation.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <h2>Tips for Successful Auctions</h2>
            <div className="policy-item">
              <h3>For Sellers</h3>
              <ul>
                <li><strong>Competitive Starting Price:</strong> Set a starting price that attracts bidders but protects your minimum acceptable price</li>
                <li><strong>High-Quality Photos:</strong> Use clear, well-lit photos showing all angles and any defects</li>
                <li><strong>Detailed Descriptions:</strong> Provide comprehensive information about condition, specifications, and included items</li>
                <li><strong>Strategic Timing:</strong> Set end times during evenings or weekends when more users are active</li>
                <li><strong>Quick Responses:</strong> Respond to bidder questions within a few hours to build trust</li>
                <li><strong>Be Prepared:</strong> Have item ready and be available to complete transaction immediately after auction ends</li>
                <li><strong>Consider Featured Status:</strong> Featured auctions typically receive 2-3x more views and bids</li>
                <li><strong>Set Realistic Reserve:</strong> If using reserve price, set it at your absolute minimum to avoid discouraging bidders</li>
                <li><strong>Monitor Your Auction:</strong> Stay engaged and answer questions to maintain bidder interest</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>For Bidders</h3>
              <ul>
                <li><strong>Read Carefully:</strong> Read the entire listing, including description, photos, and seller terms before bidding</li>
                <li><strong>Check Seller History:</strong> Review seller's ratings, feedback, and previous listings if available</li>
                <li><strong>Set Maximum Bid:</strong> Determine your maximum comfortable price and stick to it - don't get caught in bidding wars</li>
                <li><strong>Use Proxy Bidding:</strong> Set your maximum bid and let the system bid for you up to that amount</li>
                <li><strong>Monitor Closely:</strong> Watch the auction as it nears the end, especially in the final hours</li>
                <li><strong>Be Ready to Pay:</strong> Ensure you have funds available and can complete payment within 7 days if you win</li>
                <li><strong>Ask Questions:</strong> Contact seller with any questions before placing your bid</li>
                <li><strong>Inspect Item:</strong> If meeting in person, inspect the item thoroughly before finalizing payment</li>
                <li><strong>Budget Wisely:</strong> Remember to factor in any shipping costs or additional fees</li>
                <li><strong>Don't Bid Emotionally:</strong> Stay within your budget and don't let competition drive you to overpay</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Best Practices for Both Parties</h3>
              <ul>
                <li><strong>Clear Communication:</strong> Maintain open, honest communication throughout the process</li>
                <li><strong>Document Everything:</strong> Keep records of all messages, agreements, and transaction details</li>
                <li><strong>Use Secure Payment:</strong> Prefer secure payment methods like Ziina for protection</li>
                <li><strong>Meet Safely:</strong> If meeting in person, choose safe, public locations</li>
                <li><strong>Verify Before Finalizing:</strong> Buyers should verify item condition; sellers should verify payment</li>
                <li><strong>Leave Feedback:</strong> Provide honest feedback after transaction completion</li>
                <li><strong>Report Issues:</strong> Contact support immediately if any problems arise</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Contact Us</h2>
            <p>
              For questions about auction policies or to report issues, contact us:
            </p>
            <ul className="contact-info">
              <li><strong>Email:</strong> support@phonehub.ae</li>
              <li><strong>Contact Form:</strong> <a href="/contact">Visit Contact Page</a></li>
            </ul>
          </section>

          <section className="policy-section">
            <p className="last-updated">
              <strong>Last Updated:</strong> January 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuctionPolicy;


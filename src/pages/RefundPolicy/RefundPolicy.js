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
            <h2>Overview</h2>
            <p>
              PhoneHub is a marketplace platform that connects buyers and sellers. We facilitate 
              transactions but do not directly handle payments or product delivery. This policy 
              outlines the guidelines for refunds and returns on our platform.
            </p>
          </section>

          <section className="policy-section">
            <h2>Transaction Responsibility</h2>
            <p>
              All transactions on PhoneHub are conducted directly between buyers and sellers. 
              PhoneHub acts as a platform to facilitate connections but is not a party to the 
              transaction itself.
            </p>
          </section>

          <section className="policy-section">
            <h2>Refund Eligibility</h2>
            <div className="policy-item">
              <h3>Buyer Protection</h3>
              <p>
                Buyers may be eligible for a refund if:
              </p>
              <ul>
                <li>The item received does not match the listing description</li>
                <li>The item is significantly different from what was advertised</li>
                <li>The item is damaged or non-functional (unless stated in listing)</li>
                <li>The seller fails to deliver the item as agreed</li>
                <li>The item is counterfeit or fake</li>
                <li>The seller misrepresented the item's condition or specifications</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Refund Process</h3>
              <p>
                To request a refund:
              </p>
              <ol>
                <li>Contact the seller directly through our messaging system within 7 days of receiving the item</li>
                <li>Provide clear evidence (photos, videos) of the issue</li>
                <li>If the seller agrees, arrange for return and refund</li>
                <li>If the seller does not respond within 48 hours or refuses, contact our support team at support@phonehub.ae</li>
                <li>Our support team will review your case and mediate between parties</li>
                <li>Once approved, the seller will process the refund within 5-7 business days</li>
              </ol>
            </div>

            <div className="policy-item">
              <h3>Refund Methods</h3>
              <p>
                Refunds will be processed using the same payment method used for the original transaction:
              </p>
              <ul>
                <li>Ziina payments will be refunded to the original payment method</li>
                <li>Bank transfers will be refunded to the original bank account</li>
                <li>Cash transactions require direct coordination with the seller</li>
              </ul>
              <p>
                <strong>Processing Time:</strong> Refunds typically take 5-10 business days to appear in your account, 
                depending on your payment provider.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <h2>Return Conditions</h2>
            <div className="policy-item">
              <h3>Acceptable Return Reasons</h3>
              <ul>
                <li>Item not as described</li>
                <li>Item is damaged or defective</li>
                <li>Wrong item received</li>
                <li>Item missing parts or accessories mentioned in listing</li>
                <li>Item does not match the specifications provided in the listing</li>
                <li>Item is counterfeit or fake</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Return Timeframe</h3>
              <p>
                Returns must be requested within <strong>7 days</strong> of receiving the item. 
                The item must be returned in the same condition it was received, with all original 
                packaging and accessories.
              </p>
              <p>
                <strong>Important:</strong> Once a return is approved, you have <strong>14 days</strong> to ship 
                the item back to the seller. Failure to return within this timeframe may result in 
                the return request being cancelled.
              </p>
            </div>

            <div className="policy-item">
              <h3>Return Shipping</h3>
              <p>
                Return shipping costs are typically the responsibility of the buyer, unless the 
                return is due to seller error (wrong item, damaged item, etc.). This should be 
                discussed and agreed upon between buyer and seller.
              </p>
              <p>
                We recommend using tracked shipping services to ensure the item reaches the seller 
                safely. PhoneHub is not responsible for items lost during return shipping.
              </p>
            </div>

            <div className="policy-item">
              <h3>Return Process</h3>
              <ol>
                <li>Contact the seller within 7 days of receiving the item</li>
                <li>Provide clear photos/videos showing the issue</li>
                <li>Wait for seller's approval or contact PhoneHub support if seller doesn't respond</li>
                <li>Package the item securely with all original accessories</li>
                <li>Ship the item back using a tracked shipping method</li>
                <li>Provide tracking information to the seller</li>
                <li>Wait for seller to confirm receipt and process refund</li>
              </ol>
            </div>
          </section>

          <section className="policy-section">
            <h2>Non-Refundable Items & Situations</h2>
            <p>
              The following situations are generally not eligible for refunds:
            </p>
            <ul>
              <li>Buyer's remorse (changed mind, found a better deal elsewhere)</li>
              <li>Item purchased at auction (unless misrepresented by seller)</li>
              <li>Items damaged by buyer after receipt</li>
              <li>Items returned after the 7-day return window</li>
              <li>Items without original packaging or accessories (unless seller didn't mention this requirement)</li>
              <li>Items that have been used beyond normal inspection (unless defective)</li>
              <li>Custom or personalized items (unless defective or not as described)</li>
              <li>Digital items or services (unless not delivered as promised)</li>
              <li>Items purchased from sellers who clearly stated "No Returns" in their listing (unless item is misrepresented)</li>
            </ul>
            <p>
              <strong>Note:</strong> Even in non-refundable situations, if the item was misrepresented 
              or the seller violated our policies, you may still be eligible for a refund. Contact our 
              support team for assistance.
            </p>
          </section>

          <section className="policy-section">
            <h2>Dispute Resolution</h2>
            <p>
              If you cannot reach an agreement with the seller:
            </p>
            <ol>
              <li>Contact PhoneHub support at support@phonehub.ae within 7 days of receiving the item</li>
              <li>Provide all relevant information including:
                <ul>
                  <li>Listing details and ID</li>
                  <li>All messages between you and the seller</li>
                  <li>Clear photos/videos showing the issue</li>
                  <li>Transaction proof (payment receipt, bank statement, etc.)</li>
                  <li>Shipping information and tracking numbers</li>
                </ul>
              </li>
              <li>Our team will review the case within 2-3 business days and mediate between parties</li>
              <li>We may request additional information or evidence from both parties</li>
              <li>Our decision is final and binding. We reserve the right to:
                <ul>
                  <li>Issue full or partial refunds</li>
                  <li>Require item returns</li>
                  <li>Suspend or ban accounts that violate our policies</li>
                  <li>Take legal action in cases of fraud</li>
                </ul>
              </li>
            </ol>
            <p>
              <strong>Appeal Process:</strong> If you disagree with our decision, you may appeal within 
              7 days by providing additional evidence. Appeals are reviewed by our senior support team.
            </p>
          </section>

          <section className="policy-section">
            <h2>Seller Responsibilities</h2>
            <p>
              Sellers are responsible for:
            </p>
            <ul>
              <li>Accurately describing items in listings with complete and truthful information</li>
              <li>Providing clear, honest photos that show the actual condition of the item</li>
              <li>Disclosing any defects, scratches, or issues upfront</li>
              <li>Responding to buyer inquiries and return requests within 48 hours</li>
              <li>Honoring agreed-upon transactions and delivery terms</li>
              <li>Processing refunds promptly once a return is approved</li>
              <li>Ensuring items are properly packaged to prevent damage during shipping</li>
              <li>Providing accurate shipping information and tracking numbers</li>
            </ul>
            <div className="policy-item">
              <h3>Seller Refund Obligations</h3>
              <p>
                If a return is approved:
              </p>
              <ul>
                <li>Sellers must accept the returned item and inspect it within 3 business days of receipt</li>
                <li>If the item is returned in the same condition, sellers must process a full refund within 5-7 business days</li>
                <li>If the item is damaged during return shipping (not seller's fault), sellers may deduct repair costs or refuse refund</li>
                <li>Sellers who fail to process approved refunds may face account suspension</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Partial Refunds</h2>
            <p>
              In certain situations, partial refunds may be issued instead of full refunds:
            </p>
            <div className="policy-item">
              <h3>When Partial Refunds Apply</h3>
              <ul>
                <li>Item has minor cosmetic damage not mentioned in listing (deduction for repair cost)</li>
                <li>Item is missing some accessories but main item is functional (deduction for missing items)</li>
                <li>Item works but has minor issues that don't affect core functionality</li>
                <li>Buyer and seller agree on a partial refund to resolve the issue</li>
              </ul>
              <p>
                Partial refund amounts are determined based on:
              </p>
              <ul>
                <li>Extent of damage or missing items</li>
                <li>Market value of missing/damaged components</li>
                <li>Mutual agreement between buyer and seller</li>
                <li>PhoneHub support team assessment (if dispute arises)</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Order Cancellation</h2>
            <div className="policy-item">
              <h3>Buyer Cancellation</h3>
              <p>
                Buyers may cancel an order before the item is shipped:
              </p>
              <ul>
                <li>Contact the seller immediately to request cancellation</li>
                <li>If seller hasn't shipped, full refund will be processed</li>
                <li>If seller has already shipped, cancellation may not be possible (contact support)</li>
                <li>Refund processing time: 3-5 business days</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Seller Cancellation</h3>
              <p>
                Sellers may cancel an order only in exceptional circumstances:
              </p>
              <ul>
                <li>Item is no longer available (damaged, lost, or sold elsewhere)</li>
                <li>Buyer provided incorrect shipping information that cannot be corrected</li>
                <li>Buyer violated terms of service</li>
              </ul>
              <p>
                <strong>Important:</strong> Sellers who cancel orders without valid reasons may face 
                penalties including account warnings, suspension, or removal from the platform.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <h2>Contact Us</h2>
            <p>
              For questions about refunds or returns, please contact us:
            </p>
            <ul className="contact-info">
              <li><strong>Email:</strong> support@phonehub.ae</li>
              <li><strong>Contact Form:</strong> <a href="/contact">Visit Contact Page</a></li>
              <li><strong>Response Time:</strong> We aim to respond to all inquiries within 24-48 hours</li>
            </ul>
            <p>
              When contacting support, please include:
            </p>
            <ul>
              <li>Your order/listing ID</li>
              <li>Seller's username or listing title</li>
              <li>Description of the issue</li>
              <li>Photos or evidence (if applicable)</li>
              <li>Transaction details</li>
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

export default RefundPolicy;


import React from 'react';
import './PostingPolicy.css';

const PostingPolicy = () => {
  return (
    <div className="policy-page">
      <div className="page-hero">
        <h1>Posting Policy</h1>
        <p>Guidelines for creating and managing listings</p>
      </div>
      <div className="policy-container">
        <div className="policy-content">
          <section className="policy-section">
            <h2>1. Who Can List on PhoneHub</h2>
            <ul>
              <li><strong>Single Listings:</strong> Open to both individual sellers and verified businesses.</li>
              <li><strong>Bulk Listings:</strong> Available only to verified business sellers.</li>
              <li><strong>Auction Listings:</strong> Available only to verified business sellers with completed business registration.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>2. Listing Requirements</h2>
            
            <div className="policy-item">
              <h3>A. All Listings Must Include:</h3>
              <ul>
                <li>Clear, high-resolution photos of the actual iPhone from all angles (front, back, sides, screen on)</li>
                <li><strong>Accurate description including:</strong>
                  <ul>
                    <li>Model and storage capacity</li>
                    <li>Color</li>
                    <li>Network status (locked/unlocked)</li>
                    <li>iCloud status (signed out/clean)</li>
                    <li>Battery health percentage</li>
                    <li>Screen condition (scratches, burns, replacements)</li>
                    <li>Body condition (dents, scratches, wear)</li>
                    <li>Any previous repairs</li>
                    <li>Included accessories (charger, cable, box, etc.)</li>
                  </ul>
                </li>
                <li><strong>Honest condition grading using PhoneHub's standardized categories:</strong>
                  <ul>
                    <li><strong>Mint:</strong> Like new, no visible wear</li>
                    <li><strong>Excellent:</strong> Minor signs of use</li>
                    <li><strong>Good:</strong> Light wear, fully functional</li>
                    <li><strong>Fair:</strong> Visible wear, may have minor issues</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>B. Prohibited Content:</h3>
              <ul>
                <li>iCloud locked devices (Find My iPhone enabled)</li>
                <li>Blacklisted/stolen devices</li>
                <li>Water damaged devices not disclosed</li>
                <li>Non-functional devices (unless clearly listed as "For Parts")</li>
                <li>Counterfeit or fake iPhones</li>
                <li>Devices with non-original parts not disclosed</li>
                <li>Listings with misleading or false information</li>
                <li>Listings with stock photos instead of actual device photos</li>
                <li>Duplicate listings for the same device</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>3. Category-Specific Rules</h2>
            
            <div className="policy-item">
              <h3>Single Listings:</h3>
              <ul>
                <li>Maximum 5 active listings per individual seller</li>
                <li>Must include contact method (phone number is mandatory)</li>
                <li>Price must be clearly stated</li>
                <li>Location must be specific (city/area)</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Bulk Listings:</h3>
              <ul>
                <li>Minimum 3 iPhones per listing</li>
                <li>Must specify quantities available for each model/variant</li>
                <li>Can offer bulk discount pricing</li>
                <li>Must include business verification badge</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Auction Listings:</h3>
              <ul>
                <li>Starting bid must be reasonable (minimum 50% of market value)</li>
                <li>Reserve price optional but must be reasonable</li>
                <li>Auction duration: 3, 5, or 7 days only</li>
                <li>Must offer shipping OR specify "Local Pickup Only"</li>
                <li>Must include detailed condition report</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>4. Pricing & Fee Transparency</h2>
            
            <div className="policy-item">
              <h3>Single/Bulk Listings:</h3>
              <ul>
                <li>Free to post</li>
                <li>No commission on sales</li>
                <li>Optional featured listing fee for increased visibility</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Auction Listings:</h3>
              <ul>
                <li>Free to create auction</li>
                <li>5% commission deducted from final sale price</li>
                <li>Payment processing fees apply (disclosed at checkout)</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>5. Content Standards</h2>
            
            <div className="policy-item">
              <h3>Titles:</h3>
              <p>Must include model, storage, and key feature only</p>
              <ul>
                <li>✅ "iPhone 15 Pro 256GB - Unlocked - Excellent Condition"</li>
                <li>❌ "AMAZING PHONE MUST BUY BEST DEAL!!!!"</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Descriptions:</h3>
              <p>Must be factual and detailed</p>
              <ul>
                <li>✅ Professional, organized information</li>
                <li>❌ Excessive emojis, all caps, or misleading claims</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Photos:</h3>
              <ul>
                <li>Must show actual device (no stock images)</li>
                <li>No watermarks or edited photos that hide defects</li>
                <li>Clear lighting, focused images</li>
                <li><strong>Required:</strong> front, back, all sides, screen on, about page (showing model/serial)</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>6. Account & Listing Management</h2>
            <ul>
              <li>Sellers must respond to buyer inquiries within 24 hours</li>
              <li>Listings automatically expire after 30 days</li>
              <li>Sold items must be marked as sold within 48 hours</li>
              <li>Reactivation of expired listings requires verification of availability</li>
              <li><strong>Account suspension may occur for:</strong>
                <ul>
                  <li>Multiple policy violations</li>
                  <li>Fraudulent activity</li>
                  <li>Consistently poor buyer feedback</li>
                  <li>Failure to update sold listings</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>7. Verification Requirements</h2>
            
            <div className="policy-item">
              <h3>Business Sellers (Bulk/Auction):</h3>
              <ul>
                <li>Business registration document</li>
                <li>Valid trade license (if applicable)</li>
                <li>Government-issued ID of business owner/authorized representative</li>
                <li>Bank account verification for payment processing</li>
                <li>Business address verification</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Individual Sellers (Single Listings):</h3>
              <ul>
                <li>Phone number verification (SMS)</li>
                <li>Email verification</li>
                <li>Optional ID verification for trust badge</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>8. Prohibited Practices</h2>
            <ul>
              <li><strong>Price manipulation:</strong> Artificial price inflation/deflation</li>
              <li><strong>Bid manipulation:</strong> Using secondary accounts to bid on own auctions</li>
              <li><strong>Listing circumvention:</strong> Attempting to move transactions off-platform</li>
              <li><strong>Keyword spamming:</strong> Unrelated keywords in titles/descriptions</li>
              <li><strong>Contact information in listings:</strong> Only through secure PhoneHub messaging</li>
              <li><strong>Misleading location:</strong> False pickup/shipping locations</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>9. Review & Approval Process</h2>
            <ul>
              <li>All listings are subject to automated and manual review</li>
              <li>New sellers' first 5 listings require manual approval</li>
              <li>Listings violating policy will be removed without notice</li>
              <li>Repeat offenders face permanent account suspension</li>
              <li>Appeals can be made within 7 days of removal</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>10. Updates & Compliance</h2>
            <ul>
              <li>PhoneHub reserves the right to modify this policy at any time</li>
              <li>Sellers are responsible for reviewing policy updates</li>
              <li>Continued use of the platform constitutes acceptance of current policies</li>
              <li>Local laws and regulations must be followed by all users</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>11. Reporting Violations</h2>
            <p>Users can report policy violations by:</p>
            <ol>
              <li>Clicking "Report Listing" on any listing page</li>
              <li>Emailing <a href="mailto:violations@phonehub.ae">violations@phonehub.ae</a> with:
                <ul>
                  <li>Listing URL</li>
                  <li>Reason for report</li>
                  <li>Supporting evidence (screenshots, etc.)</li>
                </ul>
              </li>
            </ol>
            <p>Reports are reviewed within 48 business hours.</p>
          </section>

          <section className="policy-section">
            <p>
              By creating a listing on PhoneHub, you acknowledge that you have read, understood, and agree to comply with this Posting Policy.
            </p>
            <p className="last-updated">
              <strong>Last Updated:</strong> December 27, 2025
            </p>
            <p>
              <strong>Effective Date:</strong> Immediately upon posting
            </p>
            <p>
              <strong>Need clarification?</strong> Contact our Listing Support Team: <a href="mailto:listing-support@phonehub.ae">listing-support@phonehub.ae</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostingPolicy;


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
            <h2>Overview</h2>
            <p>
              This policy outlines the rules and guidelines for posting listings on PhoneHub. 
              All users must comply with these policies to maintain a safe and trustworthy 
              marketplace environment.
            </p>
          </section>

          <section className="policy-section">
            <h2>Listing Requirements</h2>
            <div className="policy-item">
              <h3>Required Information</h3>
              <p>All listings must include:</p>
              <ul>
                <li><strong>Accurate Title:</strong> Clear description of the iPhone model and key features (e.g., "iPhone 15 Pro Max 256GB - Space Black - Excellent Condition")</li>
                <li><strong>Detailed Description:</strong> Honest description of condition, features, and any defects. Include:
                  <ul>
                    <li>Model and storage capacity</li>
                    <li>Color/variant</li>
                    <li>Purchase date and warranty status</li>
                    <li>Any included accessories (charger, box, case, etc.)</li>
                    <li>Any known issues or defects</li>
                    <li>Reason for selling</li>
                  </ul>
                </li>
                <li><strong>High-Quality Photos:</strong> Clear images showing the actual item from multiple angles</li>
                <li><strong>Accurate Pricing:</strong> Fair and reasonable price that reflects the item's condition and market value</li>
                <li><strong>Correct Specifications:</strong> Accurate storage, model, year, and condition information</li>
                <li><strong>Location:</strong> Valid city/location where the item is available for pickup or shipping</li>
                <li><strong>Listing Type:</strong> Specify if it's a fixed price listing or auction</li>
                <li><strong>Sell Type:</strong> Indicate if selling single item or bulk quantity</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Photo Requirements</h3>
              <ul>
                <li><strong>Minimum 3 photos per listing</strong> (recommended: 5-8 photos)</li>
                <li>Photos must show the <strong>actual item being sold</strong> - no stock photos or images from other sources</li>
                <li>Include photos of:
                  <ul>
                    <li>Front of the iPhone (screen on, if possible)</li>
                    <li>Back of the iPhone</li>
                    <li>All sides (left, right, top, bottom)</li>
                    <li>Any damage, scratches, or defects (close-up shots)</li>
                    <li>Included accessories (charger, box, case, etc.)</li>
                    <li>Settings screen showing model and storage (if applicable)</li>
                  </ul>
                </li>
                <li>Photos must be <strong>clear and in focus</strong> - blurry or low-quality photos may result in listing removal</li>
                <li>Use good lighting to accurately show the item's condition</li>
                <li>Do not use filters that alter the appearance of the item</li>
                <li>Maximum file size: 10MB per image</li>
                <li>Accepted formats: JPG, JPEG, PNG</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Pricing Guidelines</h3>
              <ul>
                <li>Set prices in <strong>AED (UAE Dirhams)</strong> only</li>
                <li>Research market prices before listing to ensure fair pricing</li>
                <li>Consider the item's condition, age, and included accessories when pricing</li>
                <li>Be open to reasonable negotiations through our messaging system</li>
                <li>Do not include contact information or external links in pricing field</li>
                <li>For bulk listings, specify price per unit or total price clearly</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Prohibited Content</h2>
            <p>You may NOT post listings that contain:</p>
            <div className="policy-item">
              <h3>Illegal or Stolen Items</h3>
              <ul>
                <li><strong>Stolen Items:</strong> Any iPhone that has been stolen or obtained illegally</li>
                <li><strong>Lost/Found Items:</strong> Items that you found or that don't belong to you</li>
                <li><strong>Items with Outstanding Payments:</strong> iPhones still under installment plans without proper authorization</li>
                <li><strong>Blacklisted Devices:</strong> iPhones that are blacklisted or reported as lost/stolen</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Counterfeit or Fake Products</h3>
              <ul>
                <li><strong>Counterfeit Products:</strong> Fake, replica, or counterfeit iPhones</li>
                <li><strong>Refurbished Items Sold as New:</strong> Do not misrepresent refurbished items as brand new</li>
                <li><strong>Non-Apple Products:</strong> Do not list non-Apple products as iPhones</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Misleading Information</h3>
              <ul>
                <li><strong>False Descriptions:</strong> Do not provide false or misleading information about the item</li>
                <li><strong>Fake Photos:</strong> Do not use stock photos, images from other sources, or edited photos that misrepresent the item</li>
                <li><strong>Incorrect Specifications:</strong> Do not list wrong storage capacity, model, or features</li>
                <li><strong>Hidden Defects:</strong> Do not hide or fail to disclose significant defects or issues</li>
                <li><strong>Price Manipulation:</strong> Do not use misleading pricing tactics or hidden fees</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Prohibited Practices</h3>
              <ul>
                <li><strong>Spam or Duplicate Listings:</strong> Multiple identical listings or spam content</li>
                <li><strong>Keyword Stuffing:</strong> Using excessive keywords to manipulate search results</li>
                <li><strong>Contact Information:</strong> Do not include phone numbers, email addresses, or external website links in listings</li>
                <li><strong>Circumventing Fees:</strong> Attempting to avoid platform fees by directing users off-platform</li>
                <li><strong>Inappropriate Content:</strong> Offensive, discriminatory, or inappropriate language or images</li>
                <li><strong>Prohibited Items:</strong> Items that violate local laws or regulations in the UAE</li>
                <li><strong>Items Not for Sale:</strong> Do not create listings for items you don't actually intend to sell</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Listing Categories</h2>
            <div className="policy-item">
              <h3>Fixed Price Listings</h3>
              <ul>
                <li>Set a clear, fixed price for your iPhone</li>
                <li>Price must be in AED (UAE Dirhams)</li>
                <li>Be open to reasonable negotiations through messaging</li>
                <li>Update listing if item is sold or no longer available</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Auction Listings</h3>
              <ul>
                <li>Set a starting price (minimum bid amount)</li>
                <li>Set a clear end date and time for the auction</li>
                <li>All bids are binding - buyers cannot retract bids</li>
                <li>You must honor the auction result and sell to the highest bidder</li>
                <li>Cannot cancel auction after bids have been placed</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Condition Guidelines</h2>
            <p>When describing condition, use these guidelines:</p>
            <ul>
              <li><strong>Brand New:</strong> Unopened, in original packaging with all accessories</li>
              <li><strong>Excellent:</strong> Like new, minimal wear, fully functional</li>
              <li><strong>Very Good:</strong> Minor wear, fully functional, well-maintained</li>
              <li><strong>Good:</strong> Some wear and scratches, fully functional</li>
              <li><strong>Fair:</strong> Visible wear, scratches, or minor issues, still functional</li>
            </ul>
            <p>
              Always disclose any defects, damage, or issues honestly. Buyers appreciate transparency, 
              and it helps avoid disputes.
            </p>
          </section>

          <section className="policy-section">
            <h2>Listing Management</h2>
            <div className="policy-item">
              <h3>Updating Listings</h3>
              <ul>
                <li><strong>Status Updates:</strong> Update listing status immediately if item is sold, reserved, or no longer available</li>
                <li><strong>Mark as Sold:</strong> Mark listing as "Sold" when transaction is complete to help maintain accurate marketplace data</li>
                <li><strong>Price Changes:</strong> You can update the price if you change your asking price (auction listings cannot change starting price after bids are placed)</li>
                <li><strong>Description Updates:</strong> Update description if you discover new information about the item</li>
                <li><strong>Photo Updates:</strong> Add or replace photos if needed to better represent the item</li>
                <li><strong>Response Time:</strong> Respond to buyer inquiries within 24-48 hours to maintain good seller reputation</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Removing Listings</h3>
              <ul>
                <li>You can delete your own listings at any time if no active transactions or bids exist</li>
                <li><strong>Fixed Price Listings:</strong> Can be deleted if no pending messages or inquiries</li>
                <li><strong>Auction Listings:</strong> Cannot be deleted once bids have been placed</li>
                <li><strong>Featured Listings:</strong> Featured listings that are deleted will not be refunded for remaining featured duration</li>
                <li>PhoneHub may remove listings that violate policies without prior notice</li>
                <li>Repeated violations may result in account suspension or permanent ban</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Listing Duration and Renewal</h3>
              <ul>
                <li>Regular listings remain active until sold or manually removed</li>
                <li>Featured listings remain at the top for the duration purchased (7, 14, or 30 days)</li>
                <li>You can renew or extend featured listings before they expire</li>
                <li>Expired featured listings automatically become regular listings</li>
                <li>Inactive listings (no views or messages for 90 days) may be automatically archived</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Best Practices for Successful Listings</h2>
            <div className="policy-item">
              <h3>Photography Tips</h3>
              <ul>
                <li>Take photos in <strong>good natural lighting</strong> or well-lit indoor spaces</li>
                <li>Clean the iPhone before photographing to show its best condition</li>
                <li>Use a plain, neutral background to keep focus on the item</li>
                <li>Take photos from multiple angles to show all sides</li>
                <li>Include close-up shots of any scratches, dents, or damage</li>
                <li>Show the iPhone powered on with the home screen visible</li>
                <li>Photograph all included accessories separately</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Writing Effective Descriptions</h3>
              <ul>
                <li>Write <strong>detailed, honest descriptions</strong> that accurately represent the item</li>
                <li>Use clear, professional language - avoid excessive abbreviations or slang</li>
                <li>Be <strong>transparent about item condition</strong> - buyers appreciate honesty</li>
                <li>Mention any included accessories, original packaging, or documentation</li>
                <li>Include purchase date, warranty status, and reason for selling</li>
                <li>Specify if the device is unlocked or locked to a carrier</li>
                <li>Mention any repairs, replacements, or modifications made to the device</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Pricing and Negotiation</h3>
              <ul>
                <li><strong>Research market prices</strong> before listing to ensure competitive pricing</li>
                <li>Set reasonable prices based on item condition, age, and market value</li>
                <li>Consider including "OBO" (Or Best Offer) if open to negotiations</li>
                <li>Be prepared to negotiate - most buyers expect some flexibility</li>
                <li>Respond to price inquiries promptly and professionally</li>
                <li>Don't overprice hoping for the best - realistic prices sell faster</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Communication and Customer Service</h3>
              <ul>
                <li><strong>Respond to messages promptly</strong> (within 24 hours is ideal)</li>
                <li>Be professional and courteous in all communications</li>
                <li>Answer buyer questions thoroughly and honestly</li>
                <li>Provide additional photos or information if requested</li>
                <li>Be clear about payment methods, shipping options, and pickup locations</li>
                <li>Confirm transaction details before meeting or shipping</li>
                <li>Follow through on commitments and agreements</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Transaction Safety</h3>
              <ul>
                <li>Meet in safe, public locations for in-person transactions</li>
                <li>Verify payment before handing over the item</li>
                <li>Use secure payment methods (Ziina, bank transfer) when possible</li>
                <li>Keep records of all transactions and communications</li>
                <li>Test the iPhone with the buyer present if meeting in person</li>
                <li>Provide a receipt or proof of sale for the buyer's records</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Violations and Consequences</h2>
            <p>
              Violations of this posting policy may result in the following actions:
            </p>
            <div className="policy-item">
              <h3>Warning System</h3>
              <ul>
                <li><strong>First Violation:</strong> Warning notification and listing removal</li>
                <li><strong>Second Violation:</strong> Account warning and temporary listing restrictions</li>
                <li><strong>Third Violation:</strong> Temporary account suspension (7-30 days)</li>
                <li><strong>Repeated Violations:</strong> Permanent account ban</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Immediate Actions</h3>
              <p>PhoneHub may take immediate action (without warnings) for:</p>
              <ul>
                <li>Posting stolen or illegal items</li>
                <li>Posting counterfeit or fake products</li>
                <li>Fraudulent activities or scams</li>
                <li>Severe misrepresentation or fraud</li>
                <li>Harassment or abusive behavior</li>
                <li>Circumventing platform fees or policies</li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>Appeal Process</h3>
              <p>
                If you believe your listing was removed or account was suspended in error:
              </p>
              <ul>
                <li>Contact support@phonehub.ae within 7 days of the action</li>
                <li>Provide your listing ID and explanation</li>
                <li>Include any relevant evidence or documentation</li>
                <li>Our team will review your appeal within 3-5 business days</li>
                <li>Decisions are final, but we will provide clear reasoning</li>
              </ul>
            </div>

            <p>
              <strong>PhoneHub reserves the right</strong> to remove any listing that violates our policies, 
              harms the marketplace community, or violates local laws. We may also report illegal activities 
              to relevant authorities.
            </p>
          </section>

          <section className="policy-section">
            <h2>Contact Us</h2>
            <p>
              If you have questions about posting policies or need assistance, contact us:
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

export default PostingPolicy;


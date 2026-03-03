import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help-page">
      <div className="page-hero">
        <h1>Help Desk</h1>
        <p>Get assistance with your questions</p>
      </div>
      <div className="help-container">
        <div className="help-content">
          <section className="help-section">
            <h2>Frequently Asked Questions</h2>
            
            <div className="faq-item">
              <h3>How do I create an account?</h3>
              <p>
                Click on "Sign Up" in the header, fill in your details including name, email, password, 
                phone number, and city. Once registered, you can start browsing and posting listings.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I post a listing?</h3>
              <p>
                After logging in, click on "Post Ad" button. Fill in all the required 
                information including mobile phone model, condition, storage, price, and upload images. 
                Add your listing details and publish it as a fixed price listing.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I contact a seller?</h3>
              <p>
                Click on "View Details" on any listing, then use the "Contact Seller" button to send a 
                message and you can call the seller directly from the listing page.
                {/* You can also access all your messages from the "Messages" section in your profile. */}
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I edit or delete my listing?</h3>
              <p>
                Yes, you can manage your listings from your profile page. Go to "My Listings" section 
                where you can view, edit, or delete your posted listings.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I search for specific Mobile Phone models?</h3>
              <p>
                Use the search bar on the homepage, or browse by categories. You can filter by model, 
                storage capacity, city, and price range to find exactly what you're looking for.
              </p>
            </div>

            <div className="faq-item">
              <h3>What payment methods are accepted?</h3>
              <p>
                PhoneHub facilitates connections between buyers and sellers. Payment methods are agreed 
                upon directly between the parties. We recommend using secure payment methods and meeting 
                in safe, public locations for transactions.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I report a problem or suspicious listing?</h3>
              <p>
                If you encounter any issues or suspicious activity, please contact us immediately through 
                our <a href="/contact">Contact page</a> or email support@phonehub.ae. We take all reports 
                seriously and will investigate promptly.
              </p>
            </div>
          </section>

          <section className="help-section">
            <h2>Contact Support</h2>
            <p>
              Still need help? Our support team is here to assist you. Reach out to us through:
            </p>
            <ul className="contact-methods">
              <li><strong>Email:</strong> support@phonehub.ae</li>
              <li><strong>Contact Form:</strong> <a href="/contact">Visit Contact Page</a></li>
              <li><strong>Response Time:</strong> We typically respond within 24-48 hours</li>
            </ul>
          </section>

          <section className="help-section">
            <h2>Quick Links</h2>
            <div className="quick-links">
              <a href="/about">About PhoneHub</a>
              <a href="/terms">Terms of Services</a>
              <a href="/refund-policy">Refund Policy</a>
              <a href="/posting-policy">Posting Policy</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;

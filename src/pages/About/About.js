import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-hero">
        <h1>About PhoneHub</h1>
        <p>Learn more about our platform</p>
      </div>
      <div className="about-container">
        <div className="about-content">
          <h2>Welcome to PhoneHub</h2>
          <p>
            PhoneHub is the only dedicated platform built exclusively for iPhone buyers and sellers. 
            We understand the unique needs of iPhone users and have created a specialized marketplace 
            that makes buying and selling iPhones simple, safe, and efficient.
          </p>
          
          <h3>Our Mission</h3>
          <p>
            Our mission is to provide a trusted, user-friendly platform where iPhone enthusiasts can 
            easily buy and sell their devices. We focus exclusively on iPhones to ensure the best 
            experience for our community.
          </p>

          <h3>Why Choose PhoneHub?</h3>
          <ul>
            <li><strong>Dedicated to iPhones:</strong> We specialize exclusively in iPhone transactions</li>
            <li><strong>Safe Transactions:</strong> Secure platform with verified sellers</li>
            <li><strong>Easy to Use:</strong> Simple interface for posting and browsing listings</li>
            <li><strong>Multiple Options:</strong> Choose between fixed price listings or auctions</li>
            <li><strong>Wide Selection:</strong> Browse all iPhone models from iPhone SE to iPhone 16 Pro Max</li>
            <li><strong>Location-Based:</strong> Find iPhones in your city across the UAE</li>
          </ul>

          <h3>How It Works</h3>
          <div className="how-it-works">
            <div className="step">
              <h4>1. Create an Account</h4>
              <p>Sign up for free and create your profile</p>
            </div>
            <div className="step">
              <h4>2. Browse or List</h4>
              <p>Browse available iPhones or post your own listing</p>
            </div>
            <div className="step">
              <h4>3. Connect</h4>
              <p>Contact sellers directly through our messaging system</p>
            </div>
            <div className="step">
              <h4>4. Complete Transaction</h4>
              <p>Meet and complete your iPhone transaction safely</p>
            </div>
          </div>

          <h3>Contact Us</h3>
          <p>
            Have questions? Feel free to reach out to us through our <a href="/contact">Contact page</a> 
            or email us at support@phonehub.ae
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;


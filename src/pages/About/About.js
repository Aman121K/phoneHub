import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-hero">
        <h1>About PhoneHub</h1>
        <p>Built exclusively for buying and selling mobile phones</p>
      </div>
      <div className="about-container">
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>
            We are a dedicated platform built exclusively for buying and selling mobile phones. We
            focus solely on mobile devices, making the experience faster, simpler, and more reliable
            for users who want exactly that. Whether you are upgrading to the latest flagship or
            searching for an affordable pre-owned phone, our niche approach ensures every listing is
            relevant and every connection matters.
          </p>

          <h3>Designed for Buyers and Sellers</h3>
          <p>
            Our platform is designed with both buyers and sellers in mind. Sellers can list their
            devices quickly with clear photos, accurate descriptions, and fair pricing. Buyers can
            browse with confidence, knowing they are viewing phones only, no cars, no furniture, and
            no unrelated clutter. We have built a space where mobile phone transactions happen
            smoothly, without the noise of general classifieds.
          </p>

          <h3>Our Mission</h3>
          <p>
            At the heart of our mission is trust and community. We believe buying and selling a
            phone should be straightforward, secure, and even enjoyable. By creating a space dedicated
            entirely to mobile devices, we are helping people upgrade, sell, and find exactly what
            they need, all in one seamless platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

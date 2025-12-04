import React from 'react';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Choose the Right iPhone Model for You',
      excerpt: 'A comprehensive guide to help you decide which iPhone model best fits your needs and budget. We cover all models from iPhone SE to iPhone 16 Pro Max.',
      date: '2025-01-15',
      category: 'Buying Guide'
    },
    {
      id: 2,
      title: 'Tips for Selling Your iPhone Safely',
      excerpt: 'Learn the best practices for selling your iPhone on PhoneHub and ensuring a safe transaction. Protect yourself and get the best price.',
      date: '2025-01-10',
      category: 'Selling Tips'
    },
    {
      id: 3,
      title: 'Understanding iPhone Storage Options',
      excerpt: 'Everything you need to know about iPhone storage capacities and which one is right for you. From 64GB to 1TB explained.',
      date: '2025-01-05',
      category: 'Buying Guide'
    },
    {
      id: 4,
      title: 'iPhone Battery Health: What You Need to Know',
      excerpt: 'Learn how to maintain your iPhone battery health and when it\'s time to consider a replacement. Tips for extending battery life.',
      date: '2024-12-28',
      category: 'Maintenance'
    },
    {
      id: 5,
      title: 'Best Time to Buy or Sell Your iPhone',
      excerpt: 'Timing is everything when buying or selling iPhones. Discover the best months and strategies for getting the best deals.',
      date: '2024-12-20',
      category: 'Market Tips'
    },
    {
      id: 6,
      title: 'iPhone Condition Guide: Brand New to Fair',
      excerpt: 'Understanding iPhone condition ratings helps you make informed decisions. Learn what each condition level means.',
      date: '2024-12-15',
      category: 'Buying Guide'
    }
  ];

  return (
    <div className="blog-page">
      <div className="page-hero">
        <h1>Our News</h1>
        <p>Stay updated with the latest news and tips about iPhones</p>
      </div>
      <div className="blog-container">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-category">{post.category}</div>
              <h2>{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-date">
                  {new Date(post.date).toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <button className="read-more-btn">Read More</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;


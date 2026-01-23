import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };


  if (loading) {
    return (
      <div className="blog-page">
        <div className="page-hero">
          <h1>Our News</h1>
          <p>Stay updated with the latest news and tips about iPhones</p>
        </div>
        <div className="blog-container">
          <div className="blog-empty">Loading blogs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="page-hero">
        <h1>Our News</h1>
        <p>Stay updated with the latest news and tips about iPhones</p>
      </div>
      <div className="blog-container">
        {blogs.length === 0 ? (
          <div className="blog-empty">
            <p>No blog posts available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map((post) => (
              <article key={post._id || post.id} className="blog-card">
                {post.featuredImage && (
                  <div className="blog-image">
                    <img src={post.featuredImage} alt={post.title} />
                  </div>
                )}
                {/* <div className="blog-category">
                  {getCategoryFromTags(post.tags)}
                </div> */}
                <h2>{post.title}</h2>
                <p className="blog-excerpt">
                Every Android Phone Got Hacked, But Not iPhone?” — The Truth Behind the Claim and bold headline recently made waves:
                  {/* {post.description || post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'No description available.')} */}
                </p>
                <div className="blog-meta">
                  <span className="blog-date">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </span>
                </div>
                <button
                  className="read-more-btn"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  Read More
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;


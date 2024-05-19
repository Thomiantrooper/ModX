import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../features/blogs/blogSlice';

const Blogpage = ({ userRole }) => { // Assuming userRole is passed as a prop
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const blogs = useSelector(state => state.blogs.blogs);

  const handleLikeClick = (blogId) => {
    // Dispatch action to toggle like/dislike
    // Example: dispatch(toggleLike(blogId));
  };

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.map(blog => (
        <div 
          key={blog._id} 
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <p>Category: {blog.category}</p>
          <p>Views: {blog.numViews}</p>
          {/* Display heart emojis for like/dislike */}
          <span role="img" aria-label="like" style={{ cursor: 'pointer' }} onClick={() => handleLikeClick(blog._id)}>
            {blog.isLiked ? '❤️' : '🖤'}
          </span>
          {blog.image && <img src={blog.image} alt="Blog" style={{ maxWidth: '100%', height: 'auto' }} />} {/* Render image if available */}
          {/* Render edit button only if user is admin */}
          {userRole === 'admin' && (
            <button>Edit</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Blogpage;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlogs, getBlogs, updateBlog, deleteBlog } from '../features/blogs/blogSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adminblog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs.blogs); // Accessing blogs from Redux store

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null); // State to track the ID of the blog being edited

  useEffect(() => {
    // Fetch blogs when the component mounts
    dispatch(getBlogs());
  }, [dispatch]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // If editingId exists, it means we are updating an existing blog entry
      dispatch(updateBlog({ id: editingId, title, category, description }));
      setEditingId(null); // Reset editingId after updating
      toast.success('Blog updated successfully');
    } else {
      // Dispatch the createBlog action with the blog data
      dispatch(createBlogs({ title, category, description }));
      toast.success('Blog created successfully');
    }
    // Clear the form fields after submission
    setTitle('');
    setCategory('');
    setDescription('');
  };

  const handleEdit = (blogId) => {
    // Set the editingId state to the ID of the blog being edited
    setEditingId(blogId);
    // Fetch the blog data and populate the form fields with it for editing
    const blogToEdit = blogs.find(blog => blog._id === blogId);
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setCategory(blogToEdit.category);
      setDescription(blogToEdit.description);
    }
  };

  const handleDelete = (blogId) => {
    // Dispatch the deleteBlog action with the ID of the blog to be deleted
    dispatch(deleteBlog(blogId));
    toast.success('Blog deleted successfully');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3>{editingId ? 'Edit Blog' : 'Create New Blog'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ marginRight: '10px' }}>Title:</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ marginRight: '10px' }}>Category:</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={handleCategoryChange}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ marginRight: '10px' }}>Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
      </div>
      
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
            <button onClick={() => handleEdit(blog._id)}>Edit</button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button> {/* Delete button */}
          </div>
        ))}
      </div>
      <ToastContainer /> {/* Toast container */}
    </div>
  );
};

export default Adminblog;

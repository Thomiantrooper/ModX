import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import tasksReducer from '../features/tasks/tasksSlice';
import enquiryReducer from "../features/enquiry/enquirySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks:tasksReducer,
    bCategory: bCategoryReducer,
    blogs: blogReducer,
    products: productReducer,
    enquiries: enquiryReducer,
    Adminenq: enquiryReducer,
    
  },
});

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    throw new Error("User not found");
                }
            } else {
                throw new Error("Token not provided");
            }
        } catch (error) {
            throw new Error("Not authorized, token expired or invalid. Please login again.");
        }
    } else {
        throw new Error("Authorization header is missing or invalid");
    }
});

const isAdmin = asyncHandler(async (req,res,next) => {
    const {email} = req.user;
    const adminUser= await User.findOne({email });
    if(adminUser.role !== "admin"){
        throw new Error("You are not an admin");
    }
    else{
        next();
    }
})

module.exports = { authMiddleware ,isAdmin};

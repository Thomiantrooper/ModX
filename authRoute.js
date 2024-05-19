const express = require("express");
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser,
     updatedUser, unblockUser, blockUser, handleRefreshToken, logout, updatePassword,forgotPasswordToken ,
     resetPassword, loginAdmin, saveAddress, getWishlist, userCart, getUserCart,emptyCart, applyCoupon,
      createOrder, getOrders, updateOrderStatus, getAllOrders, getOrderByUserId, } = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const sendEmail = require("../controller/emailCtrl");


router.post('/register', createUser);
router.post('/forgotPasswordToken',forgotPasswordToken);
router.put('/resetPassword/:token',resetPassword);
router.put('/password',authMiddleware, updatePassword)
router.post('/login', loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get('/all-users', authMiddleware, getallUser);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getOrderByUserId);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout)
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);

router.get('/:id', authMiddleware, getaUser); // Moved authMiddleware to here
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete('/:id', authMiddleware,  deleteaUser);
router.put(
    "/order/update-order/:id",
    authMiddleware,
    isAdmin,
    updateOrderStatus
  );
router.put('/edit-user', authMiddleware, updatedUser); // Added :id parameter for identifying user
router.put("/save-address", authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);





router.post('/send-email', async (req, res) => {
     try {
         const emailData = req.body; // Assuming email data is sent in the request body
         await sendEmail(emailData);
         res.status(200).json({ message: "Email sent successfully" });
     } catch (error) {
         console.error("Error sending email:", error);
         res.status(500).json({ error: "An error occurred while sending the email" });
     }
 });
 

module.exports = router;

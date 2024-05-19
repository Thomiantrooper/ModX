const express = require("express");
const {
    createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct,addToWishlist, rating, uploadImages, deleteImages,updateProductQuantity
} = require("../controller/productCtrl");

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");


const router = express.Router();

router.post("/",authMiddleware, isAdmin, createProduct);
router.put("/upload/",
 authMiddleware, isAdmin, uploadPhoto.array('images', 10),
  productImgResize, uploadImages); // Assuming 'uploadImages' is correctly imported and exported
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);


router.put("/:id",authMiddleware, isAdmin, updateProduct);
router.delete("/:id",authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);
router.get("/", getAllProduct);

router.put("/update-quantity/:id", authMiddleware, isAdmin, updateProductQuantity);



















module.exports = router;
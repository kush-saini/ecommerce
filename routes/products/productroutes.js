const express = require("express");
const router = new express.Router();

const productController = require("./../../controllers/product/productController");
const productUpload = require("./../../multerconfig/products/productStorageConfig");
const adminauthenticate = require("../../middleware/admin/adminauthenticate");

// router.post(
//   "/register",
//   userUpload.single("user_profile"),
//   userAuthController.Register,
// );

router.post("/addcategory",adminauthenticate, productController.AddCategory);
router.get("/getcategory", productController.GetCategory);
router.post("/addProducts", [adminauthenticate,productUpload.single("productimage")], productController.AddProducts);
router.get("/getProducts", productController.getAllProducts);


module.exports = router;

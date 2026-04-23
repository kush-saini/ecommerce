const express = require("express");
const router = new express.Router();

const cartControllers = require("../../controllers/carts/cartController");
const userauthenticate = require("../../middleware/user/userauthenticate");

router.post("/addtocart/:id", userauthenticate, cartControllers.AddToCart);

module.exports = router;

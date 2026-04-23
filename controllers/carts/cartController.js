const cartsdb = require("../../model/carts/cartsModel");
const productsdb = require("../../model/product/ProductModel");

exports.AddToCart = async (req, res) => {
  const { id } = req.params;
  console.log("USER ID:", req.userId);
  console.log("1st");
  try {
    const productfind = await productsdb.findOne({ _id: id });
  console.log("2nd");
    const carts = await cartsdb.findOne({
      userid: req.userId,
      productid: productfind._id,
    });
  console.log("3rd");

    if (productfind?.quantity >= 1) {
          console.log("4th");

      if (carts?.quantity >= 1) {
        carts.quantity = carts.quantity + 1;
        await carts.save();
  console.log("5th");

        productfind.quantity = productfind.quantity - 1;
        await productfind.save();
        res
          .status(200)
          .json({ message: "Product successfully incremented to your cart" });
      } else {
          console.log("6th");

        const addtocart = new cartsdb({
          userid: req.userId,
          productid: productfind._id,
          quantity: 1,
        });
          console.log("7th");

        await addtocart.save();
  console.log("8th");

        productfind.quantity = productfind.quantity - 1;
        await productfind.save();
        res
          .status(200)
          .json({ message: "Product successfully added to your cart" });
      }
        console.log("9th");

    } else {
          console.log("10th");

      res.status(400).json({ error: "This product is sold out !!" });
    }
  } catch (error) {
      console.log("11th error");

    res.status(400).json(error);
  }
};

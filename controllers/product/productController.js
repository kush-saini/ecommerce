const categorydb = require("../../model/product/productCategoryModel");
const cloudinary = require("../../Cloudinary/cloudinary");
const productsdb = require("../../model/product/ProductModel");

exports.AddCategory = async (req, res) => {
  console.log("add category from product is called");
  const { categoryname, description } = req.body;
  console.log(req.body);

  if (!categoryname || !description) {
    res.status(400).json({ error: "Fill All Details !!" });
  }

  try {
    const exisitingCategory = await categorydb.findOne({ categoryname });

    console.log("existing cat", exisitingCategory);

    if (exisitingCategory) {
      res.status(400).json({ error: "This category already exists !!" });
    } else {
      const addCategory = new categorydb({
        categoryname,
        description,
      });
      await addCategory.save();
      res.status(200).json(addCategory);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.GetCategory = async (req, res) => {
  try {
    const getAllCategory = await categorydb.find({});
    res.status(200).json(getAllCategory);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.AddProducts = async (req, res) => {
  console.log("req body is=> ", req.body);
  console.log("req file is=> ", req.file);
  console.log("req query is=> ", req.query);

  const { categoryid } = req.query;
  const file = req.file ? req.file.path : "";
  const { productname, price, discount, quantity, description } = req.body;

  if (
    !productname ||
    !price ||
    !discount ||
    !quantity ||
    !description ||
    !file
  ) {
    res.status(400).json({ error: "All field required !!" });
  }

  try {
    const upload = await cloudinary.uploader.upload(file);
    const exisitingProduct = await productsdb.findOne({
      productname: productname,
    });
    if (exisitingProduct) {
      res.status(400).json({ error: "This product already exists !!" });
    } else {
      const addProduct = new productsdb({
        productname,
        price,
        discount,
        quantity,
        description,
        categoryid,
        productimage: upload.secure_url,
      });
      await addProduct.save();
      res.status(200).json(addProduct);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAllProducts = async (req, res) => {
  const categoryid = req.query.categoryid || "";
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = 8;

  console.log("page", page);
  console.log("categoryid", categoryid);

  const query = {};

  if (categoryid !== "all" && categoryid) {
    query.categoryid = categoryid;
  }

  try {
    const skip = (page - 1) * ITEM_PER_PAGE;

    const count = await productsdb.countDocuments(query);

    const getAllProducts = await productsdb
      .find(query)
      .limit(ITEM_PER_PAGE)
      .skip(skip);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);

    res.status(200).json({
      getAllProducts,
      Pagination: {
        totalProducts: count,
        pageCount,
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

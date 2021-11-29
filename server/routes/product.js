const express = require("express");
const Router = express.Router();
const { Product } = require("../models/Product");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/productImg/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

let upload = multer({ storage: storage }).single("file");

Router.post("/saveImage", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

Router.post("/", (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

Router.post("/getProducts", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, products });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, products });
      });
  }
});

Router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
    Product.find({ _id: { $in: productIds } })
      .populate("writer")
      .exec((err, product) => {
        if (err) return res.status(400).send({ success: false, err });
        return res.status(200).send(product);
      });
  } else {
    Product.findOneAndUpdate(
      { _id: productIds },
      { $inc: { views: 1 } },
      { new: true },
      (err, product) => {
        if (err) return res.json({ success: false, err });
        res.status(200).send(product);
      }
    );
  }
});
Router.get("/top_products", (req, res) => {
  Product.find({})
    .sort({ sold: -1 })
    .limit(3)
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send({ success: false, err });
      return res.status(200).send(product);
    });
});

Router.post("/add_review", (req, res) => {
  const { rate, text, userId, productId, name } = req.body;
  Product.findById(productId).exec((err, product) => {
    if (err) return res.status(400).json({ err });
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      return res.json({
        success: false,
        message: "You've already written a review",
      });
    }

    let review = {
      name,
      rating: Number(rate),
      comment: text,
      user: userId,
    };
    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    product.save((err) => {
      if (err) return res.status(200).json(err);
      res.status(201).json({ success: true, product });
    });
  });
});

module.exports = Router;

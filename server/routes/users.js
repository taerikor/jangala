const express = require("express");
const Router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const { Payment } = require("../models/Payment");
const async = require("async");

Router.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그 정보를 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

Router.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에서 았는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Email not found",
      });
    }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);

        // 토큰을 저장 (쿠키, 로컬스토리지 중 쿠키)
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

Router.get("/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true란 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    shippingAddress: req.user.shippingAddress,
    history: req.user.history,
  });
});

Router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

Router.post("/editUserName", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    { name: req.body.newName },
    (err, name) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
        name,
      });
    }
  );
});

Router.post("/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          // console.log(userInfo)
          if (err) return res.json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              data: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).send(userInfo.cart);
        }
      );
    }
  });
});

Router.get("/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: { id: req.query.id },
      },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, productInfo) => {
          return res.status(200).json({
            productInfo,
            cart,
          });
        });
    }
  );
});

Router.post("/onSuccessBuy", auth, (req, res) => {
  let history = [];
  let transactionData = {
    dateOfPurchase: Date.now(),
    id: req.body.paymentData.orderID,
    price: req.body.price,
  };

  req.body.cartDetail.forEach((item) => {
    history.push({
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
    });
  });

  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    address: req.body.address,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { history: transactionData }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.findOneAndUpdate(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

Router.get("/history", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, history: user.history });
  });
});

Router.post("/add_shipping_address", auth, (req, res) => {
  const { title, address, city, postal, country } = req.body;
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    if (err) return res.status(400).json({ err });

    let location = {
      title,
      address,
      city,
      postal,
      country,
    };

    userInfo.shippingAddress.push(location);

    userInfo.save((err) => {
      if (err) return res.status(200).json(err);
      res.status(201).send(userInfo.shippingAddress);
    });
  });
});

module.exports = Router;

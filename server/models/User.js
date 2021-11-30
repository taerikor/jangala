const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const shippingAddressSchema = mongoose.Schema({
  title: { type: String },
  address: { type: String },
  city: { type: String },
  postal: { type: String },
  country: { type: String },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  shippingAddress: [shippingAddressSchema],
});
userSchema.pre("save", function (next) {
  //유저 정보가 서버로 저장되기 전
  let user = this;
  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRound, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  //plainPassword를 암호화 하여 암호화된 비밀번호랑 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  let user = this;
  // jsonwebtoken을 이용하여 token 생성
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  let oneHour = moment().add(1, "hour").valueOf();

  user.tokenExp = oneHour;

  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  // 토큰을 decode 한다
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 데이터베이스에 보관된 token이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
const User = mongoose.model("User", userSchema);

module.exports = { User };

const express = require('express')
const Router = express.Router()
const { User } = require('../models/User')
const { auth } = require('../middleware/auth')
const multer = require('multer')

Router.post('/register', (req, res) => {
    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //그 정보를 데이터 베이스에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

Router.post('/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 았는지 찾는다.
    User.findOne({ email : req.body.email }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "Email not found"
            })
        }

        // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password"});

            // 비밀번호까지 맞다면 토큰을 생성하기
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                
                // 토큰을 저장 (쿠키, 로컬스토리지 중 쿠키)
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

Router.get('/auth', auth,(req, res) => {

    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true란 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

Router.get('/logout', auth, (req, res) => {
    
    User.findOneAndUpdate({ _id: req.user._id }, 
        { token: "", tokenExp: ""  }
        , (err, user) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        }
    );

});

Router.post('/editUserName',(req, res) => {
    User.findOneAndUpdate({ _id: req.body.userId }, 
        { name:req.body.newName}
        , (err, name) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,name
            });
        }
    );

});


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/userImg/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png is allowed'), false);
        }
        cb(null, true)
    }
})

let upload = multer({ storage: storage }).single("file")


Router.post('/uploadImage',(req,res)=>{
    console.log(storage)

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})

Router.post('/editImage',(req, res) => {
    User.findOneAndUpdate({ _id: req.body.userId }, 
        { image:req.body.image}
        , (err, image) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,image
            });
        }
    );

});


module.exports = Router;
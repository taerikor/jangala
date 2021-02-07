const express = require('express')
const Router = express.Router()
const { Product } = require('../models/Product')
const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/productImg/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

let upload = multer({ storage: storage }).single("file")


Router.post('/saveImage',(req,res)=>{

    upload(req,res,err => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({success: true, filePath: res.req.file.path , fileName: res.req.file.filename})
    })

})

Router.post('/',(req,res)=>{

    const product = new Product(req.body)

    product.save((err)=>{
        if(err) return res.status(400).json({success:false , err})
        return res.status(200).json({success:true})
    })

})


module.exports = Router;
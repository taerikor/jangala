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

Router.post('/getProducts',(req,res)=>{

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm


    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){

            if(key === "price"){
                findArgs[key] = {
                    $gte : req.body.filters[key][0],
                    $lte : req.body.filters[key][1],
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    if(term){
        Product.find(findArgs)
        .find({ $text: { $search: term }})
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, products)=>{
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({success:true , products})
        })
    }else{
        Product.find(findArgs)
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, products)=>{
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({success:true , products})
        })
    }

})

Router.get('/products_by_id',(req,res)=>{

    let type = req.query.type;
    let productId = req.query.id
   
    Product.find({_id:productId})
    .populate('writer')
    .exec((err, product)=>{
        if(err) return res.status(400).send({ success: false, err })
        return res.status(200).send({success:true , product})
    })

})



module.exports = Router;
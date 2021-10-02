const express = require('express')
const Request = require('../models/request.js')
const multer = require('multer')
const uuid = require('uuid').v4
const router = express.Router()

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});


var upload =multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true)
        }else{
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

router.get('/', async(req,res)=>{
    try{
        const requests = await Request.find()
        res.json(requests)
    }catch(err){
        res.send('Error' , + err)
    }
})



router.post('/', upload.single('idimg') , async(req, res, next)=>{
    const url = req.protocol + '://' + req.get('host')
    const request = new Request({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneno: req.body.phoneno,
        instname: req.body.instname,
        email: req.body.email,
        password: req.body.password,
        message: req.body.message,
        idimg: url + '/public/' + req.file.filename,
    })
    try{
        const a1 = await request.save()
        res.status(201).json(a1)
        console.log("Post success")
    }catch(err){
        console.log(err)
        res.send('Error')
    }
})

router.get("/:id", async(req, res) =>{
    try{
        const request = await Request.findById(req.params.id)
        res.json(request)
        console.log("Found it")
    }
    catch(err){
        console.log(err)
        res.send("Error")
    }
})

router.patch("/status/:id", async (req, res) => {
    console.log("Inside change status");
    try {
        console.log(req.body.status)
      const approved = await Request.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        {new : true}
      );
      console.log("Haha 1")
      res.json(approved);
      console.log("haha 2")
    } catch (err) {
      console.log("Error " + err);
    }
  });

  

// router.patch("/status/:id", async(req, res) =>{
//     try{
//         const request = await Request.findById(req.params.id)
//         request.status = req.body.status
//         const a2 = await request.save()
//         res.json(a2)
//     }catch(err){
//         console.log(err)
//         res.send("error")
//     }
// })

router.delete('/:id', async(req,res)=>{
    try{
        const request = await Request.findById(req.params.id)
        const a3 = await request.delete()
        res.json(a3)

    }catch(err){
        console.log(err)
        res.json("error")
    }
})
module.exports = router
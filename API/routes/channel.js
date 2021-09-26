const express = require("express");
const router = express.Router();
const Channel = require("../models/channel");


router.get("/", async (req,res) => {
    const user = await Channel.find();
    res.send(user);
    

});
router.post("/add",(req,res)=> {

    const channelName = req.body.name;
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    const desc = req.body.description;
    const value = req.body.value;
    

     const channel =  new Channel({
         
         name: channelName,
         description: desc,
         latitude: lat,
         longitude: lon,
       
                field1: [
                   
                    {
                        val:value,
                    }
                ]
                 
            
         }
         
    )
    channel.save().then((createdUSer =>{
        res.status(201).json(createdUSer)
    })).catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err,
            succes: false,
        })
    })
    
});


router.put("/update/:chanelname",async(req,res)=>{

    const value = req.body.value;
   

    const updated = await Channel.findOneAndUpdate(
        {
            name: req.params.chanelname
        },
       
         {
             $addToSet:{
                field1: [
                    
                    {
                        val:value,
     
                    }
                ]
                 
             },
         }

         
    )
    res.send(updated);

});
router.delete("/channel:id",(req,res)=>{

});

module.exports = router;
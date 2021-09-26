const mongoose = require("mongoose");

const fieldSchema = mongoose.Schema(
    {
        val:{
            type:String
        },
        
      
        
    },
        {
            timestamps:true
        }
        
  
    
)
const channelSchema = mongoose.Schema({
    name:{
        type:String,
        default: null,
        
    },
    description:{
        type:String,
        default: null,
        
    },
    latitude:{
        type:String,
        default: null,
        
    },
    longitude:{
        type:String,
        default: null,
        
    },
    field1:[
    
        
        fieldSchema
        
    ]
},
    


)
channelSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
channelSchema.set('toJSON',{
    virtuals: true
})

const Channel = mongoose.model("Channel",channelSchema);
module.exports = Channel;
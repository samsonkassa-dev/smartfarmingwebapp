const mongoose = require("mongoose");

var d= new Date();

const fieldSchema = mongoose.Schema(
  {
    val: {
      type: String,

      default: null,
    },

    date: {
      type: String,
      default: d,
    },
    
  },
  
 

);
const channelSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  latitude: {
    type: String,
    default: null,
  },
  longitude: {
    type: String,
    default: null,
  },
  fieldname: [
    {
      type: String,
    },
  ],
  field1: [fieldSchema],
  field2: [fieldSchema],
  field3: [fieldSchema],
  field4: [
    {
      fieldSchema,
    },
  ],
  field5: [
    {
      fieldSchema,
    },
  ],
  pumpcontroller: {
    type: String,
    default: 0,
  },
  fancontroller: {
    type: String,
    default: 0,
  },
});
channelSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
channelSchema.set("toJSON", {
  virtuals: true,
});

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;

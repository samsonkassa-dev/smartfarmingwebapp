const express = require("express");
const router = express.Router();
const Channel = require("../models/channel");

router.get("/pump/:name", async (req, res) => {
  const user = await Channel.findOne({ name: req.params.name });
  res.send(user.pumpcontroller);
});

router.get("/", async (req, res) => {
  const user = await Channel.find();
  res.send(user);
});
router.get("/:name", async (req, res) => {
  const user = await Channel.findOne({ name: req.params.name });
  console.log(user.name);
  const fields = [];
  let f = 3;
  //var fields = [];
  if (f == 1) {
    fields.push(user.field1);
  } else if (f == 2) {
    fields.push(user.field1);
    fields.push(user.field2);
  } else if (f == 3) {
    fields.push(user.field1);
    fields.push(user.field2);
    fields.push(user.field3);
  } else if (f == 4) {
    fields.push(user.field1);
    fields.push(user.field2);
    fields.push(user.field3);
    fields.push(user.field4);
  } else if (f == 5) {
    fields.push(user.field1);
    fields.push(user.field2);
    fields.push(user.field3);
    fields.push(user.field4);
    fields.push(user.field5);
  }

  //res.send(fields)
  //console.log(fields)
  // for(let i=0;i<3;i++)
  // {
  //      const field = "field"+i;
  //       field.toString
  //     user.field

  //      fields.push()

  // }
  //console.log(fields);
  res.send(user);
});
router.post("/add", (req, res) => {
  const channelName = req.body.name;
  const lat = req.body.latitude;
  const lon = req.body.longitude;
  const desc = req.body.description;
  const value = req.body.description;
  const field1name = req.body.field1name;
  const field2name = req.body.field2name;
  const field3name = req.body.field3name;
  const field4name = req.body.field4name;
  const field5name = req.body.field5name;
  // req.body.field1 ? (field1 = req.body.field1) : null;

  // req.body.field2 ? (field1 = req.body.field2) : null;
  // req.body.field3 ? (field1 = req.body.field3) : null;
  // req.body.field4 ? (field1 = req.body.field4) : null;
  // req.body.field5 ? (field1 = req.body.field5) : null;

  // if (req.body.field1){
  //     field1 = req.body.field1;

  // }
  //const field1 = req.body.field1;

  const channel = new Channel({
    name: channelName,
    description: desc,
    latitude: lat,
    longitude: lon,
    fieldname: [field1name, field2name, field3name, field4name, field5name],

    field1: [
      // {fieldname: field1},
    ],
    field2: [
      //{fieldname: field2},
    ],
    field3: [
      //{fieldname: field3},
    ],
    field4: [
      //{fieldname: field4},
    ],
    field5: [
      //{fieldname: field5},
    ],
  });
  channel
    .save()
    .then((createdUSer) => {
      res.status(201).json(createdUSer);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        succes: false,
      });
    });
});

router.put("/turnpump/:channel/:val", async (req, res) => {
  const updated = await Channel.findOneAndUpdate(
    {
      name: req.params.channel,
    },
    {
      $set: {
        pumpcontroller: req.params.val,
      },
    }
  );
  res.send(updated);
});
router.put("/turnfan/:channel", async (req, res) => {
  const updated = await Channel.findOneAndUpdate(
    {
      name: req.params.channel,
    },
    {
      fancontroller: req.body.fancontroller,
    }
  );
});

router.put("/update/:channel", async (req, res) => {
  value1 = req.body.value1;
  value2 = req.body.value2;
  value3 = req.body.value3;
  value4 = req.body.value4;
  value5 = req.body.value5;

  const updated = await Channel.findOneAndUpdate(
    {
      name: req.params.channel,
    },

    {
      $addToSet:{
      field1: [
        {
          val: value1,
        },
      ],
      field2: [
        {
          val: value2,
        },
      ],
      field3: [
        {
          val: value3,
        },
      ],
     
      
    }
  }
  );
  res.send(updated);
});

router.delete("/channel:id", (req, res) => {});

module.exports = router;

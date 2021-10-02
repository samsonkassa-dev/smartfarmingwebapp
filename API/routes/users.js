const express = require("express");
const User = require("../models/user.js");
const { userRegister, userLogin, userAuth } = require("../utils/Auth");
const multer = require("multer");
const uuid = require("uuid").v4;
const router = express.Router();
const { Approved } = require("../templates/approval");
const { Rejected } = require("../templates/rejection");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const auth = require("../middlewares/passport");
const {
  USERNAME,
  PASSWORD,
  CLIENTID,
  CLIENTSECRET,
  REFRESH,
  SECRET,
  SGSECRET
} = require("../config");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/protected", auth, (req, res) => {
  res.status(200).json({
    isLoggedIn: true,
  });
});

router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.json(result);
  } catch (err) {
    res.send("Error", +err);
  }
});

router.get("/user", auth, async (req, res) => {
  console.log("get user");
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.json({ message: "user doesn't exist" });
    }
    return res.json({ user });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  console.log("Inside login");
  await userLogin(req.body, "user", res);
});

// router.post("/admin-login", async (req, res) => {
//   await userLogin(req.body, "admin", res);
// });

// router.get('/get-image', auth, async(req, res) => {
//   console.log("get image")
//   try{
//     const user = await User.findById(req.user.id)
//     if (!user){
//       return res.json({message: "user doesn't exist"})
//     }
//     return res.json({user})
//   }catch(err){
//     console.log(err)
//   }
// })

router.post("/register", async (req, res) => {
  console.log("Inside the register");
  await userRegister(req, "user", res);
});

router.patch("/updatename/:id", async (req, res) => {
  console.log("Inside change name method");
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/updatephone/:id", async (req, res) => {
  console.log("Inside change phone number method");
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { phoneno: req.body.phoneno } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/updateemail/:id", async (req, res) => {
  console.log("Inside change email method");
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { email: req.body.email } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/isUserAuth", auth, (req, res) => {
  return res.json({
    isLoggedIn: true,
    email: req.user.email,
    role: req.user.role,
  });
});

router.patch("/photo/:id", upload.single("idimg"), async (req, res, err) => {
  console.log("Inside photo update");
  try {
    const id = req.params.id;
    const url = req.protocol + "://" + req.get("host");
    const updatedImg = url + "/public/" + req.file.filename;
    const upImage = await User.findByIdAndUpdate(
      id,
      { $set: { idimg: updatedImg } },
      { new: true }
    );
    return res.json(upImage);
  } catch (err) {
    console.log(err);
  }
});

sgMail.setApiKey(SGSECRET);


// const getEmailData = (to, name, template) => {
//   let data = null;
//   switch (template) {
//     case "Approved":
//       data = {
//         from: "yusraa190@gmail.com",
//         to,
//         subject: `Request Approved!`,
//         html: Approved(name),
//       };
//       break;
//     case "Rejected":
//       data = {
//         from: "yusraa190@gmail.com",
//         to,
//         subject: `Dear ${name}`,
//         html: Rejected(),
//       };
//       break;
//     default:
//       data;
//   }
//   return data;
// };

const emailData = (recipient, name, template) => {
  let msg = null;
  switch (template) {
    case "Approved":
      msg = {
        from: "yusraa190@gmail.com",
        to: recipient,
        subject: "Request Approved",
        text: "Your request has been approved. Please log in using the credentials you provided in your request.",
      };
      break;
    case "Rejected":
      msg = {
        from: "yusraa190@gmail.com",
        to: recipient,
        subject: `Dear ${name}`,
        text: "Your request has been rejected due to inadequate information. Please send again."
      };
      break;
      case "Revoke":
        msg = {
          from: "yusraa190@gmail.com",
          to: recipient,
          subject: `Dear ${name}`,
          text: "Your request has been revoked due to inactivity"
        }
    default:
      msg;
  }
  return msg;
}

const sendEmail = (to, uname, type) => {
  msg = emailData(to, uname, type)
  sgMail
    .send(msg)
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
};

router.post("/send-rejection-mail", (req, res)=> {
  const { recipient, name } = req.body;
  sendEmail(recipient, name, "Rejected")
  res.send("Success");
});

router.post("/send-approval-mail", (req, res) => {
  const { recipient, name } = req.body;
  sendEmail(recipient, name, "Approved")
  res.send("Success");
});

router.post("/send-revocation-mail", (req, res) => {
  const { recipient, name } = req.body;
  sendEmail(recipient, name, "Revoke")
  res.send("Success");
});



// const sendEmail = (to, uname, type) => {
//   let transport = nodemailer.createTransport({
//     service: "Gmail",
//     port: 465,
//     auth: {
//       type: "OAuth2",
//       user: USERNAME,
//       pass: PASSWORD,
//       clientId: CLIENTID,
//       clientSecret: CLIENTSECRET,
//       refreshToken: REFRESH,
//     },
//   });
//   const mail = getEmailData(to, uname, type);

//   transport.sendMail(mail, function (err) {
//     if (err) {
//       console.log("Error ", err);
//     } else {
//       console.log("Email sent");
//     }
//   });

//   transport.close();
// };

// const sendEmail = (to, uname, type) => {
//   let transporter = nodemailer.createTransport({
//     secure: true,
//     auth: {
//       type: "OAuth2",
//       user: USERNAME,
//       pass: PASSWORD,
//       clientId: CLIENTID,
//       clientSecret: CLIENTSECRET,
//       refreshToken: REFRESH,
//     },
//   });
//   const mail = getEmailData(to, uname, type);

//   transporter.sendMail(mail, function (err, data) {
//     if (err) {
//       console.log("Error " + err);
//     } else {
//       console.log("Email sent successfully");
//     }
//   });
// };

// router.post("/send-approval-mail", (req, res) => {
//   console.log(req.body);
//   sendEmail(req.body.email, req.body.name, "Approved");
//   res.send("Success");
// });

// router.post("/send-rejection-mail", (req, res) => {
//   console.log(req.body);
//   sendEmail(req.body.email, req.body.name, "Rejected");
//   res.send("Success");
// });

router.delete("/:id", async (req, res) => {
  console.log("Inside user deletion method");
  try {
    const user = await User.findById(req.params.id);
    const a3 = await user.delete();
    res.json(a3);
  } catch (err) {
    console.log(err);
    res.json("error");
  }
});

// router.post("/admin-register", upload.single('idimg'), async (req, res) => {
//   const url = req.protocol + '://' + req.get('host')
//   console.log("Inside admin register");
//   await userRegister(req, "admin", res);
// });

module.exports = router;

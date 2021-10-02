const express = require('express');
const mongoose = require('mongoose')
const requestRoutes = require('./routes/requests')
const approvedRoutes = require('./routes/approvedrequests')
const rejectedRoutes = require('./routes/rejectedrequests')
const researcherRoutes = require('./routes/researchers')
const userRoutes = require('./routes/users')
const cors = require('cors')
const passport = require('passport')
const { DB, PORT } = require('./config');
const channelRoute = require('./routes/channel');


const app = express();

mongoose.set('useFindAndModify', false);
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true })

const con = mongoose.connection


con.on('open', function(){
    console.log("Connected!")
})

app.use(cors());
app.use(express.json())
app.use(passport.initialize());

//require('./middlewares/passport')(passport);

app.use('/public', express.static('public'));
app.use('/researcher', researcherRoutes)
app.use('/requests', requestRoutes)
app.use('/approved', approvedRoutes)
app.use('/rejected', rejectedRoutes)
app.use('/users', userRoutes)
app.use('/channel',channelRoute)


app.get('/', (req, res) => {
    res.send("we are on home");
})



app.listen(PORT, '192.168.43.224',function(){
    console.log("Connected")
} )
// app.listen(PORT)
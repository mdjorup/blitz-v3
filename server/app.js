var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors')
const port = 5000;

var authRouter = require('./routes/authRoutes.js');
var teamsRouter = require('./routes/teamsRoutes.js');


const dbURI = process.env.dbURI;


//initialize express 
var app = express();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//express configuration
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//connect to db
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(()=>console.log("Database connected"))
.catch((err) => console.log(err));

mongoose.Promise = global.Promise;


//Routing
app.use('/auth', authRouter);
app.use('/teams', teamsRouter);


//error handling
app.use((err, req, res, next) => {
  res.status(404).json({
    message: err.message
  })
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});



module.exports = app;

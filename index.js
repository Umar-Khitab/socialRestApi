const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan")
const bodyParser = require('body-parser')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

//import files.


dotenv.config();


//Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('common'))

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)



//Connect mongoDB
mongoose.connect("mongodb://127.0.0.1:27017",
 () => console.log("Connected to mongo db")
 )


 //Port Listening
  app.listen(8800, () => {
      console.log("Backend server is running")
  })
//   heHoObOlVBIIpeCR
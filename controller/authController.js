const User = require('../models/User');
const bcrypt = require('bcrypt');


// @desc Register New user
// @route Post /api/auth/register
// @acess Public
const registerUser = async (req, res) => {
   const { username, email, password} = req.body;
    // Check credential
   if(!username ||!email || !password){
     res.status(400).json("plz fill all the fields")
   } 
   // Check if user Exits
   const userExit =  await User.findOne({email})
   if(userExit){
       res.status(400).json('User already exits')
   } else{
        try {
             

           // Encrypt or Hash a password
           const salt = await bcrypt.genSalt(10);
           const hashedPassword = await bcrypt.hash(password, salt);
        
           //create new user
           const newUser = new User({username, email, password: hashedPassword})
           // Save user and response
           const user = await newUser.save();
           res.status(200).json(user)
        

       } catch (error) {
           res.status(500).json(error)
       }
   }
   
}

// @desc Login user
// @route Post /api/auth/login
// @acess Public
const loginUser = async (req, res) => {
   const {email, password} = req.body;
    // Check for all user
    const user = await User.findOne({email})
  
   if(user && (await bcrypt.compare(password, user.password))){
       res.status(200).json({
           _id: user._id,
           email: user.email
       })
   } else {
    res.status(400).json('Invalid credentials')
  }
   
}
module.exports = {registerUser, loginUser}
const User = require('../models/User')
const bcrypt = require('bcrypt')

// @desc Update User
// @route put /api/users/:id
// @acess Public
const upadateUser = async (req, res) => {
     if(req.body.userId === req.params.id || req.body.isAdmen){
          if(req.body.password){
              try {
                  const salt = await bcrypt.genSalt(10);
                  const validPassword = await bcrypt.hash(req.body.password, salt)
                  
              } catch (error) {
                  res.status(500).json(error)
              }
          }
           try {
               const user = await User.findByIdAndUpdate(req.params.id, {
                   $set: req.body
               })
               res.status(200).json("Account has been updated")
           } catch (error) {
               res.status(500).json(error)
           }
      } else {
          res.status(403).json("You can update only your account")
      }
}

// @desc Delete User
// @route delete /api/users/:id
// @acess Public
const deleteUser = async (req, res) => {
    if(req.body.userId === req.params.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted")
        } catch (error) {
          res.status(500).json(res)  
        }
    }else{
        res.status(403).json("You can delete only your account")
    }
}
// @desc Get User
// @route get /api/users/:id
// @acess Public
const getUser = async (req, res) => {
 try {
        const user = await User.findById(req.params.id)
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
        } catch (error) {
        res.status(500).json(error)
     } 
}
// @desc Follow  User
// @route put /api/users/:id
// @acess Public
const followUser = async (req, res) => {
     if(req.body.userId !== req.params.id){
       try {
           const user = await User.findById(req.params.id)
           const currentUser = await User.findById(req.body.userId)
           if(!user.followers.includes(req.body.userId)){
               await user.updateOne({ $push: { followers: req.body.userId}})
               await currentUser.updateOne({ $push: { followings: req.params.id}})
               res.status(200).json('You follow the user')
           } else{
               res.status(403).json("You already follow this user")
           }
       } catch (error) {
           res.status(500).json(error)
       }
    } else {
        res.status(403).json("You can not follow your self")
    }
}
// @desc Unfollow User
// @route put /api/users/:id
// @acess Public
const unFollowUser = async (req, res) => {
    if(req.body.userId !== req.params.id){
       try {
           const user = await User.findById(req.params.id)
           const currentUser = await User.findById(req.body.userId)
           if(user.followers.includes(req.body.userId)){
              await user.updateOne({ $pull: { followers: req.body.userId}})
              await currentUser.updateOne({ $pull: { followings: req.params.id}})
               res.status(200).json('user has been unfollowed')
           } else{
               res.status(403).json('You do not follow this user')
           }
       } catch (error) {
           res.status(500).json(error)
       }
    } else{
        res.status(403).json('You can not unfollow yourself')
    }
}

module.exports = { upadateUser, deleteUser, getUser, followUser,unFollowUser}
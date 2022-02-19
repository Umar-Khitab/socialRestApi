const router = require("express").Router();
const bcrypt = require('bcrypt');

const {upadateUser, deleteUser, getUser, followUser, unFollowUser} = require('../controller/userController')


 router.route("/:id").put(upadateUser).delete(deleteUser).get(getUser)
 router.put("/:id/follow", followUser)
 router.put("/:id/unfollow", unFollowUser)
 module.exports = router


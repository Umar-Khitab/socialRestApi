const router = require("express").Router();
const User = require("../models/User");
const Post = require('../models/Post');
const { promise } = require("bcrypt/promises");
const { createPost, updatePost, deletePost, likePost, getPost, timelinePosts } = require("../controller/postController");


router.post("/", createPost)
router.route("/:id").delete(deletePost).put(updatePost).get(getPost)
router.put("/:id/like", likePost)
router.post("/timeline/all", timelinePosts)

module.exports = router
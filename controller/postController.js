const User = require("../models/User")
const Post = require("../models/Post");


//@desc Create Post
//route post /api/posts/
//@access Public
const createPost = async (req, res) => {
           const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
   
}

//@desc Update Post
//route put /api/posts/:id
//@access Public
const updatePost = async (req, res) => {
        try {
             const post = await Post.findOne({userId: req.params.id});
             if(post.userId === req.body.userId){
             await post.updateOne({ $set: req.body })
             return res.status(200).json("the post has been updated");
             }else{
               res.status(403).json("you can update only your post");
            }

     } catch (error) {
            res.status(500).json(error) 
     }
    console.log("it's working")
}

//@desc Delete Post
//route put /api/posts/:id
//@access Public
const deletePost =  async (req, res) => {
        try {
             const post = await Post.findOne({userId: req.params.id});
             if(post.userId === req.body.userId){
             await post.deleteOne()
             return res.status(200).json("the post has been delete");
             }else{
               res.status(403).json("you can delete only your post");
            }

     } catch (error) {
            res.status(500).json(error) 
     }
}


//@desc Like 0r Dislike Post
//route put /api/posts/:id/like
//@access Public
const likePost = async (req, res) => {
    try {
             const post = await Post.findOne({userId: req.params.id});
              if(!post.likes.includes(req.body.userId)){
               await post.updateOne({$push: {likes: req.body.userId}})
               return res.status(200).json("the post has been liked");
              }else{
               await post.updateOne({$pull: {likes: req.body.userId}})
               return res.status(200).json("the post has been disliked")
              }

     } catch (error) {
            res.status(500).json(error) 
     }
}
//@desc Get Post
//route get /api/posts/:id
//@access Public
const getPost =  async (req, res) => {
    try {
        const post = await Post.findOne({userId: req.params.id});
        console.log(post)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

//@desc Get all post from timeline
//route post /api/posts/timeline/all
//@access public
const timelinePosts = async(req, res) => {
    try {
        // my posts
        const currentUser = await User.findById(req.body.userId)
        const userPost = await Post.find({userId: currentUser._id})
        // friends post
        const friendPosts = await Promise.all(
            currentUser.followings.map( friendId => {
                return Post.find({userId: friendId})
            })
        ).then( (friendPosts) =>{

            console.log(friendPosts)
        })
    
           
    } catch (error) {
      res.status(500).json(error)  
    } 
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    timelinePosts}
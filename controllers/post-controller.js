const {prisma} = require("../prisma/prisma-client");
const PostController = {
    createPost: async (req, res) => {
        res.send('create post');
    },
    updatePost: async (req, res) => {
        res.send("Update post");
    },
    getPostById: async (req, res) => {
        res.send("get post");
    },
    getAllPosts: async (req, res) => {
        res.send("get all posts");
    },
    deletePost: async (req, res) => {
        res.send("delete post");
    }
}
module.exports = PostController;
const {prisma} = require("../prisma/prisma-client");
const PostController = {
    createPost: async (req, res) => {
        const {content} = req.body;
        const authorId = req.user.userId;
        if(!content) return res.status(400).json({error: "Все поля обязательны!"});

        try {
            const post = await prisma.post.create({
                data: {
                    content,
                    authorId
                }
            })
            res.json(post);
        } catch (error) {
            console.error("Created post error", error);
            res.status(500).json({error: "Internal server error", error});
        }
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
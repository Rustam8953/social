const {prisma} = require("../prisma/prisma-client");

const CommentsController = {
    createComment: async(req, res) => {
        const {postId, content} = req.body;
        const userId = req.user.userId;
        if(!postId || !content) return res.status(400).json({error: "Все поля обязательны!"});
        try {
            const comment = await prisma.comments.create({
                data: {
                    postId,
                    userId,
                    content
                }
            });
            res.json(comment);
        } catch (error) {
            console.error("Error creating comment url", error);
            res.status(500).json({error: "Internal server error"});
        }
    },
    deleteComment: async(req, res) => {
        res.send("Delete comment");
    }
}
module.exports = CommentsController;
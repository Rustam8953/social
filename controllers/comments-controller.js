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
        const {id} = req.params;
        const userId = req.user.userId;

        try {
            const comment = await prisma.comments.findUnique({where: {id}})

            if(!comment) return res.status(404).json({error: "Комментарий не найден"});

            if(comment.userId !== userId) return res.status(403).json({error: "Нет доступа"});

            await prisma.comments.delete({where: {id}});
            res.json(comment);
        } catch (error) {
            console.error("Error delete comment", error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}
module.exports = CommentsController;
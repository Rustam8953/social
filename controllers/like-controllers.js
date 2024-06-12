const {prisma} = require("../prisma/prisma-client");

const LikeController = {
    likePost: async(req, res) => {
        const {postId} = req.body;
        const userId = req.user.userId;
        if(!postId) return res.status(400).json({error: "Недостаточно данных"});
        try {
            const currentLike = await prisma.like.findFirst({
                where: {postId, userId}
            });
            if(currentLike) return res.status(400).json({error: "Лайк уже поставлен!"});
            const like = await prisma.like.create({
                data: {
                    postId,
                    userId
                }
            });
            res.json(like);
        } catch (error) {
            console.error("Error like post", error);
            res.status(500).json({error: "Internal server error!"});
        }
    },
    unlikePost: async(req, res) => {
        res.send("Unlike complate!");
    }
}
module.exports = LikeController;
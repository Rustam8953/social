const {prisma} = require("../prisma/prisma-client");
const { connect } = require("../routes");

const FollowController = {
    followUser: async(req, res) => {
        const {followingId} = req.body;
        const userId = req.user.userId;
        if(followingId === userId) return res.status(500).json({error: "Вы не можете подписаться на самого себя"});
        try {
            const followHistory = await prisma.follows.findFirst({
                where: {
                    AND: [
                        {followerId: userId},
                        {followingId}
                    ]
                }
            })
            if(followHistory) return res.status(400).json({error: "Подписка уже оформолена"});
            await prisma.follows.create({
                data: {
                    follower: {connect: {id: userId}},
                    following: {connect: {id: followingId}},
                }
            })
            res.status(201).json({message: "Подписка успешно создана!"});
        } catch (error) {
            console.error("Follow error", error);
            res.status(500).json({error: "Internal server error"});
        }
    },
    unfollow: async(req, res) => {
        res.send("Unfollow user!");
    }
}
module.exports = FollowController;
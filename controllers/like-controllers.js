const {prisma} = require("../prisma/prisma-client");

const LikeController = {
    likePost: async(req, res) => {
        res.send("Like complate!");
    },
    unlikePost: async(req, res) => {
        res.send("Unlike complate!");
    }
}
module.exports = LikeController;
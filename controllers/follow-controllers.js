const {prisma} = require("../prisma/prisma-client");

const FollowController = {
    followUser: async(req, res) => {
        res.send("follow user!");
    },
    unfollow: async(req, res) => {
        res.send("Unfollow user!");
    }
}
module.exports = FollowController;
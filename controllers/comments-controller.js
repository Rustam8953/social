const prisma = require("../prisma/prisma-client");

const CommentsController = {
    createComment: async(req, res) => {
        res.send("Create Comment");
    },
    deleteComment: async(req, res) => {
        res.send("Delete comment");
    }
}
module.exports = CommentsController;
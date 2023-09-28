const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    username: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: [
        {
        username: String,
        content: String
    },
]
})

const PostModel = mongoose.model("blog", PostSchema);

module.exports = {PostModel};
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }
}, {timestamps: true})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }
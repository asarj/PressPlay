const mongoose = require('mongoose');

const dislikeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }
}, {timestamps: true})


const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }
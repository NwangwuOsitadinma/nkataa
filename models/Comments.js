var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    time: Date,
    commentBody: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

module.exports = mongoose.model('Comment', commentSchema);
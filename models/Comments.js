var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    time: Date,
    commentBody: String
});

module.exports = mongoose.model('Comment', commentSchema);
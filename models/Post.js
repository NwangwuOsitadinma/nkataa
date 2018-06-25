var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    time: Date,
    postBody: String
});

module.exports = mongoose.model('Post', PostSchema);

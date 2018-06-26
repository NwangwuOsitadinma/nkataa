var model = require('../models/Comments');

exports.addComment = function(req, res){
    var time = new Date;
    var data = {
        time: time.toLocaleTimeString(),
        commentBody: req.body.postbody,
        user: req.body.user,
        post: req.body.post,
    }
    model.create(data, function(err){
        if (err) res.json({err: err, message: 'the comment could not be added'});
        res.json({message: 'comment added successfully'});
    });
}

exports.viewComments = function(req, res){
    var post = req.body.post;
    model.find({post:post}, 'commentBody', function(err, data){
        if (err) res.json({err:err, message:'sorry, something went wrong while searching'});
        res.json({message: data});
    });
}
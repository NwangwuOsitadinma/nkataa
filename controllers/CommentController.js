var model = require('../models/Comments');

exports.addComment = function(req, res){
    var data = {
        time: Date.now(),
        commentBody: req.body.commentBody,
        user: req.body.user,
        post: req.body.post,
    }
    model.create(data, function(err){
        if (err) res.json({err: err, message: 'the comment could not be added'});
        res.json({message: 'comment added successfully'});
    });
}

exports.viewComments = function(req, res){
    var post = req.params.post;
    model.find({post:post}, 'commentBody', function(err, data){
        if (err) res.json({err:err, message:'sorry, something went wrong while retrieving'});
        res.json({message: data});
    });
}

exports.deleteComment = function(req, res){
    var options = {_id: req.params.id};
    model.remove(options, function(err){
        if (err) res.json({err:err, message:'an error occurred while deleting'});
        res.json({message: 'comment deleted'});
    });
}

exports.editComment = function(req, res){
    var id = req.body.id;
    model.findById(id, function(err, comment){
        if (err) res.json({err:err, message:'sorry, an error occurred'});
        if (req.body.commentBody) post.commentBody = req.body.commentBody;
        comment.save(function (err, updatedComment){
            if (err) res.json({err:err, message:'sorry an error occurred'});
            res.json(updatedComment);
        });
    });
}
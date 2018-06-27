var model = require('../models/Post');

exports.createPost = function(req, res){
    var data = {
        time: Date.now(),
        postBody: req.body.postBody,
        user: req.body.user,
        comments: [],
    }
    model.create(data, function(err){
        if (err) res.json({err: err, message: 'Sorry, the post could not be created'});
        res.json({message: 'post created successfully'});
    });
}

exports.viewPosts = function(req, res){
    model.find(function(err, posts){
        if (err) res.json({err: err, message: 'something went wrong while fetching posts'});
        res.json(posts);
    });
}

exports.deletePost = function(req, res){
    var options = {_id: req.params.id};
    model.remove(options, function(err){
        if (err) res.json({err:err, message:'an error occurred while deleting the post'});
        res.json({message: 'post deleted'});
    });
}

exports.editPost = function(req, res){
    var id = req.body.id;
    model.findById(id, function(err, post){
        if (err) res.json({err:err, message:'sorry, an error occurred while editing the post'});
        if (req.body.postBody) post.postBody = req.body.postBody;
        post.save(function (err, updatedPost){
            if (err) res.json({err:err, message:'sorry an error occurred while editing the post'});
            res.json(updatedPost);
        });
    });
}

exports.viewPostsByUser = function(req, res){
    var user = req.params.userId;
    model.find({user:user}, 'postBody', function(err, data){
        if (err) res.json({err:err, message:'sorry, something went wrong while retrieving user posts'});
        res.json({message: data});
    });
}
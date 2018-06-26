var model = require('../models/Post');

exports.createPost = function(req, res){
    var time = new Date;
    var data = {
        time: time.toLocaleTimeString(),
        postBody: req.body.postbody,
        user: req.body.user,
        comments: [],
    }
    model.create(data, function(err){
        if (err) res.json({err: err, message: 'the post could not be created'});
        res.json({message: 'post created successfully'});
    });
}

exports.viewPosts = function(req, res){
    //var user = req.body.user;
    model.find(function(err, posts){
        if (err) res.json({err: err, message: 'something went wrong'});
        res.json(posts);
    });
}

exports.deletePost = function(req, res){
    var options = {_id: req.params.id};
    model.remove(options, function(err){
        if (err) res.json({err:err, message:'an error occurred while deleting'});
        res.json({message: 'post deleted'});
    });
}

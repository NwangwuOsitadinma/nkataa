var repository = require('../repositories/UserRepository');

exports.getAllUsers = function (req, res){
    repository.get({},function(err, users){
        if (err) res.json({err: err, message: 'Sorry, something went wrong while retrieving users'});
        res.json(users);
    });
}

exports.getUsersByParam = function (req,res,options){
    repository.get(options, function(err,users){
        if(err) res.json(err);
        res.json(users);
    });
}
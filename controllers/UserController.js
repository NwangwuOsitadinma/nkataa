var model = require('../models/User');

exports.addUser = function(req, res){
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    model.create(data, function(err){
        if (err) res.json({err: err, message: 'the user could not be created'});
        res.json({message: 'user created successfully'});
    });
}
exports.getUsers = function (req, res){
    model.find(function(err, users){
        if (err) res.json({err: err, message: 'something went wrong'});
        res.json(users);
    });
}
exports.deleteUser = function(req, res){
    var options = {_id: req.params.id};
    model.remove(options, function(err){
        if (err) res.json({err:err, message:'an error occurred while deleting'});
        res.json({message: 'user deleted'});
    });
}
exports.getUserByParam = function(req, res){
    var key = req.params.key;
    var value = req.params.value;
    switch (key){
        case 'id':
            model.findById(value, function(err, data){
                if (err) res.json({err:err, message:'sorry, something went wrong while searching'});
                res.json({message: data});
            });
        case 'email':
            model.findOne({email: value}, function(err, data){
                if (err) res.json({err:err, message:'sorry, something went wrong while searching'});
                res.json({message: data});
            });
        case 'name':
            model.find({name: `/${value}/i`}, 'name', function(err, data){
                if (err) res.json({err:err, message:'sorry, something went wrong while searching'});
                res.json({message: data});
            });
        default:
            res.json('invalid paramaters specified');
    }
}
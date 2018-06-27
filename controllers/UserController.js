var model = require('../models/User');

exports.addUser = function(req, res){
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    model.create(data, function(err){
        if (err) res.json({err: err, message: 'Sorry, the user could not be created'});
        res.json({message: 'user created successfully'});
    });
}
exports.getUsers = function (req, res){
    model.find(function(err, users){
        if (err) res.json({err: err, message: 'Sorry, something went wrong while retrieving users'});
        res.json(users);
    });
}
exports.deleteUser = function(req, res){
    var options = {_id: req.params.id};
    model.remove(options, function(err){

        if (err) res.json({err:err, message:'Sorry, an error occurred while deleting'});
        res.json({message: 'user deleted'});
    });
}
exports.getUserByParam = function(req, res){
    var key = req.params.key;
    var value = req.params.value;
    let columns = 'name email'; //the columns we want to display to the user
    switch (key){
        case 'id':
            model.findById(value, columns, function(err, data){
                if (err) res.json({err:err, message:'sorry, something went wrong while retrieving user record'});
                res.json({message: data});
            });
            break;
        case 'email':
            model.findOne({email: value}, columns, function(err, data){
                if (err) res.json({err:err, message:'sorry, something went wrong while retrieving user record'});
                res.json({message: data});
            });
            break;
        case 'name':
            model.find({name:value}, columns, function(err, data){
                if (err) res.json({err:err, message:'sorry, something went wrong while retrieving user record'});
                res.json({message: data});
            });
            break;
        default:
            res.json('invalid paramaters specified, please try again.');
    }
}
exports.updateUser = function(req, res){
    var id = req.body.id;
    var record = req.body;
    model.findById(id, function(err, user){
        if (err) res.json({err:err, message:'sorry, an error occurred while updating user record'});
        if (record.name) user.name = record.name;
        if (record.email) user.email = record.email;
        if (record.password) user.password = record.password;
        user.save(function (err, updatedUser){
            if (err) res.json({err:err, message:'sorry an error occurred while updating user record'});
            res.json(updatedUser);
        });
    });
}
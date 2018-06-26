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
    let columns = 'name email';
    switch (key){
        case 'id':
            model.findById(value, columns, function(err, data){
                if (err) res.json({err:err, message:'sorry, something went wrong while searching'});
                res.json({message: data});
            });
            break;
        case 'email':
            model.findOne({email: value}, columns, function(err, data){
                if (err) res.json({err:err, message:'sorry, something went wrong while searching'});
                res.json({message: data});
            });
            break;
        case 'name':
            model.find({name:value}, columns, function(err, data){
                if (err) res.json({err:err, message:'sorry, something went wrong while searching'});
                res.json({message: data});
            });
            break;
        default:
            res.json('invalid paramaters specified');
    }
}
exports.updateUser = function(req, res){
    //update(id, name, Ibesoft);
    //update(id, all, {name:Ibe, password:kk, email:jj@kk.com})
    var id = req.params.id;
    var column = req.params.column;
    var value = req.params.value;
    model.findByIdAndUpdate(id, {column: value}, function(err, data){
        if (err) res.json({err:err, message:'sorry, an error occurred'});
        res.json({message:`User record with ID:${id} has been updated successfully.\n${data}`});
    });
}
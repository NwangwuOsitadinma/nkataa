var service = require('../services/UserService');

exports.getUsers = function(req,res){
    return service.getAllUsers(req,res);
}

exports.getUsersByParam = function(req,res){
    options = req.query;
    return service.getUsersByParam(req,res,options);
}
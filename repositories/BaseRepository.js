function BaseRepository(model) {
    if (!model) throw new Error("A model must be provided");
    this.model = model;

    //   this.get =
}

BaseRepository.prototype.get = function(options, callback) {
    this.model.find(options, callback);
}

BaseRepository.prototype.add = function(data, callback) {
    this.model.create(data, callback);
}
BaseRepository.prototype.getById = function(id, callback) {
    this.model.findById(id, callback);
}
BaseRepository.prototype.delete = function(options, callback) {
    this.model.remove(options, callback);
}
BaseRepository.prototype.update = function(id, options, callback) {
    this.model.update(id, options, callback);
}



module.exports = function(model) {
    return new BaseRepository(model);
}
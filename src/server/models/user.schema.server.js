module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: [String],
            roles: [String],
            phones: [String],
            type: String
    }, {collection: 'user'});
    return UserSchema;
};
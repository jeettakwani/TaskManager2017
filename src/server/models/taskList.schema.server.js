module.exports = function(mongoose)
{
    var taskSchema = require("./task.schema.server.js")(mongoose);
    // use mongoose to declare a form schema
    var taskList = mongoose.Schema({
        userId: String,
        title: String,
        fields: [taskSchema],
        created: Date //Default : Current Date
        // store form documents in this collection
    }, {collection: 'task'});

    return taskList;
};
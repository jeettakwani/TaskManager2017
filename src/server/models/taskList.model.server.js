var q = require('q');

module.exports = function (db, mongoose) {

    var TaskListSchema = require("./taskList.schema.server.js")(mongoose);

    var TaskListModel = mongoose.model('Task',TaskListSchema);

    var service = {
        createTaskListForUser: createTaskListForUser,
        findAllTaskListForUser: findAllTaskListForUser,
        deleteTaskListId: deleteTaskListId,
        findTaskListById: findTaskListById
    };

    return service;

    function createTaskListForUser(userId, taskList) {
        var deferred = q.defer();

        taskList.userId = userId;
        taskList.fields = [];
        TaskListModel.create(form,function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllTaskListForUser(userId) {
        var deferred = q.defer();

        TaskListModel.find({userId : userId},function(err,doc){
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findTaskListById(taskList) {

        var deferred = q.defer();

        TaskListModel.findById({_id : taskList},function(err,doc)
        {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(doc);
        });

        return deferred.promise;
    }

    function deleteTaskListId(taskList) {
        var deferred = q.defer();

        TaskListModel.remove({_id : taskList},function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
};
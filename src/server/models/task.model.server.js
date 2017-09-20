var uuid = require('node-uuid');

var q = require("q");

module.exports = function(mongoose) {
    var TaskListSchema = require("./taskList.schema.server")(mongoose);

    //create form model from schema
    var TaskListModel = mongoose.model('TaskForTasks',TaskListSchema);
    
    var api = {
        findAllTasks: findAllTasks,
        findTaskById: findTaskById,
        createTask: createTask,
        deleteTask: deleteTask,
        fieldsAsPerType: fieldsAsPerType
    };
    
    return api;

    function findAllTasks(taskListId) {
        var deferred = q.defer();

        TaskListModel.findById({_id : taskListId},function(err,doc)
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

    function findTaskById(taskId, taskListId) {
        var deferred = q.defer();

        TaskListModel.findById({_id : taskListId},function(err,task)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<task.fields.length;i++)
                {
                    if(taskdId == task.fields[i]._id)
                    {
                        deferred.resolve(task.fields[i]);
                        break;
                    }
                }

            }
        });

        return deferred.promise;
    }
    
    function createTask(taskListId,newTask) {
        var deferred = q.defer();

        TaskListModel.findById({_id : taskListId},function(err,task)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                var tasks = task.fields;
                tasks.push(newTask);
                task.fields = tasks;

                task.save(function(err,doc)
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
            }
        });
        //console.log(deferred)
        return deferred.promise;
    }

    function deleteTask(taskId, taskListId) {
        var deferred = q.defer();

        TaskListModel.findById({_id : taskListId}, function(err,task)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<task.fields.length;i++)
                {
                    if(taskId == task.fields[i]._id)
                    {
                        task.fields.splice(i,1);
                        break;
                    }
                }

                task.save(function(err,doc)
                {
                    if(err)
                        deferred.reject(err);
                    else
                    {
                        console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }
};
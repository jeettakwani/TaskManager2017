module.exports = function(app,model){
    "use strict";

    var uuid = require('node-uuid');
    app.get('/api/assignment/user/:userId/task',getAllTaskList);
    app.get('/api/assignment/task/:taskId',getTaskListById);
    app.delete('/api/assignment/task/:taskId',deleteTaskList);
    app.post('/api/assignment/user/:userId/task',createTaskList);

    function getAllTaskList(req,res){
        var userId = req.params.userId;
        model.findAllTaskListForUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getTaskListById(req,res){
        var taskId = req.params.taskId;
        var taskList = model.findTaskListId(taskId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteTaskList(req,res){
        var taskId = req.params.taskId;
        var deletedTaskList = model.deleteTaskListId(taskId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createTaskList(req,res){

        var task = req.body;
        var id =  uuid.v4();
        task.fields = [];
        var userId = req.params.userId;
        model.createTaskListForUser(userId,task)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};
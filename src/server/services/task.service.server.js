module.exports = function(app,model){
    "use strict";

    var uuid = require('node-uuid');
    app.get('/api/assignment/task/:taskId/subtask',getAllTasks);
    app.get('/api/assignment/task/:taskId/subtask/:subTaskId',getTaskById);
    app.delete('/api/assignment/task/:taskId/subtask/:subTaskId',deleteTask);
    app.post('/api/assignment/task/:taskId/subtask',createTask);

    function getAllTasks(req,res){
        var taskId = req.params.taskId;
        model.findAllTasks(taskId)
            .then(
                function (doc) {
                    res.json(doc.fields)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getTaskById(req, res) {

        var taskId = req.params.taskId;
        var subTaskId = req.params.subTaskId;

        var subtask = model.findTaskById(taskId)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteTask(req,res){

        var taskId = req.params.taskId;
        var subTaskId = req.params.subTaskId;

        model.deleteTask(subTaskId,taskId)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createTask(req,res) {
        var taskId = req.params.taskId;
        var subTask = req.body;

        var form = model.createTask(taskId,subTask)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};

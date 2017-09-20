(function () {
    "use strict";
    angular
        .module("TaskManagerApp")
        .factory("TaskService", taskService);

    function taskService($http) {


        var service = {
            createSubTaskForTask: createSubTaskForTask,
            getSubTasksForTask: getSubTasksForTask,
            getSubTaskForTask: getSubTaskForTask,
            deleteSubTaskFromTask: deleteSubTaskFromTask
        };

        return service;

        function createSubTaskForTask(taskId, subTask) {
            return $http.post('/api/assignment/task/' + taskId + '/subtask', subTask);
        }

        function getSubTasksForTask(taskId) {
            return $http.get('/api/assignment/task/' + taskId + '/subtask');
        }

        function getSubTaskForTask(taskId,subTaskId) {

            return $http.get('/api/assignment/task/' + taskId + '/subtask/' + subTaskId);
        }

        function deleteSubTaskFromTask(taskId, subTaskId) {
            return $http.delete('/api/assignment/task/'+taskId+'/subtask/'+ subTaskId);
        }

    }
})();
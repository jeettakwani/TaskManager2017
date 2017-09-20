(function() {
    "use strict";
    angular
        .module("TaskManagerApp")
        .factory("TaskListService", taskListService);

    function taskListService($http) {

        var service = {
            createTaskForUser: createTaskForUser,
            findAllTasksForUser: findAllTasksForUser,
            deleteTaskById: deleteTaskById,
            findTaskById: findTaskById
        };

        return service;

        function createTaskForUser(userId, task) {
            return $http.post('/api/assignment/user/'+ userId + '/task', task);
        }

        function findAllTasksForUser(userId) {
            return $http.get('/api/assignment/user/'+ userId + '/task');
        }

        function deleteTaskById(taskId) {
            return $http.delete('/api/assignment/task/'+ taskId);
        }

        function findTaskById(taskId) {
            return $http.get('/api/assignment/task/' + taskId);
        }
    }
})();
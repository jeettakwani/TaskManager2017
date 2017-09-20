(function () {
    "use strict";
    angular
        .module("TaskManagerApp")
        .controller("TaskController", TaskController);

    function TaskController($rootScope, $routeParams, $scope, $location, TaskService, TaskListService) {
        $scope.$location = $location;
        $scope.userId = $rootScope.user._id;
        $scope.taskId = $routeParams.taskId;

        TaskService.getSubTasksForTask($scope.taskId).then(
            function (response) {
                $scope.tasks = response.data;
            }
        );
        console.log($scope.tasks);

        $scope.addField = function (tasktxt) {

            console.log(tasktxt);
            var task = {};
            task = {"label": "Task", "text": tasktxt};
            TaskService.createSubTaskForTask($scope.taskId, task).then(
                function (response) {
                    TaskService.getSubTasksForTask($scope.taskId).then(
                        function (response) {
                            $scope.tasks = response.data;
                        }
                    );
                }
            );

        };

        $scope.deleteField = function (index) {

            var task_id = $scope.tasks[index]._id;
            console.log(task_id);
            TaskService.deleteSubTaskFromTask($scope.taskId, task_id).then(function (response) {

                TaskService.getSubTasksForTask($scope.taskId).then(
                    function (response) {
                        $scope.tasks = response.data;
                    }
                );

            });
        };
    }
})();

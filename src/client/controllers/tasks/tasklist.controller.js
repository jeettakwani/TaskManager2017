(function () {
    "use strict";
    angular
        .module("TaskManagerApp")
        .controller("TaskListController", TaskListController);

    function TaskListController($rootScope, $scope, $location, TaskListService) {
        $scope.$location = $location;
        $scope.rootScope = $rootScope;
        $scope.tasks = {};

        if ($rootScope.user != null) {

            TaskListService.findAllTasksForUser($scope.rootScope.user._id).then(function (response) {
                console.log(response.data);
                $scope.tasks = response.data;
            });
        }

        $scope.addTask = function () {

            var newTask = {
                title: $scope.taskName,
                userId: $scope.rootScope.user._id
            };

            console.log(newTask);
            TaskListService.createTaskForUser($scope.rootScope.user._id, newTask).then(
                function (response) {
                    $scope.taskName = "";
                    console.log(response);
                    TaskListService.findAllTasksForUser($scope.rootScope.user._id).then(function (response) {
                        $scope.tasks = response.data;
                    });
                });

        };
        

        $scope.deleteTask = function (index) {
            $scope.selectedTaskIndex = index;
            console.log($scope.tasks[index]._id);
            TaskListService.deleteTaskById($scope.tasks[index]._id).then(function (response) {
                TaskListService.findAllTasksForUser($scope.rootScope.user._id).then(function (response) {
                    $scope.tasks = response.data;
                });
            });
        };

    }
})();
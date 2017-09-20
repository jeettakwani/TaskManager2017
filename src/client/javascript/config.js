(function () {
    "use strict";
    angular
        .module("TaskManagerApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller : "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/tasks", {
                    templateUrl: "views/tasks/taskList.view.html",
                    controller : "TaskListController"
                })
                .when("/tasks/:taskId/tasks", {
                    templateUrl: "views/tasks/task.view.html",
                    controller : "TaskController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller : "RegisterController"

                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller : "LoginController"

                })
                .otherwise({
                    redirectTo: "/"
                });
        });

})();

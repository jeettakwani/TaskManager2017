(function () {
    angular
        .module("TaskManagerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        $scope.hide = true;
        $scope.dispalert = false;


        $scope.register = function () {
            if ($scope.password != $scope.verifyPassword)
                dispalert = true;

            $rootScope.user = {};
            $scope.dispalert = false;
            $rootScope.user.username = $scope.username;
            $rootScope.user.password = $scope.password;
            $rootScope.user.type = "assignment";
            $rootScope.user.email = $scope.email;

            UserService.register($rootScope.user).then(
                function (response) {
                    $rootScope.user = response.data;
                });

            $location.path("/profile");
        };


    }


})();
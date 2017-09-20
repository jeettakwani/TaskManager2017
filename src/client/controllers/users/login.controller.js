(function(){
    angular
        .module("TaskManagerApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        "use strict";


        $scope.login = function(){

            $scope.user = {username: $scope.username, password:$scope.password};
            console.log($scope.user);

            UserService.findUserByCredentials($scope.username, $scope.password).then(function(response){

                if (response) {
                    console.log(response);
                    $rootScope.user = response.data;
                    console.log($rootScope.user);
                    $location.path("/profile");
                }
            });
        };

    }

})();
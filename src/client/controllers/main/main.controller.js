(function(){
    angular
        .module("TaskManagerApp")
        .controller("MainController", MainController);
    function MainController($scope, $location) {
        $scope.$location = $location;

    }
})();

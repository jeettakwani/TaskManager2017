(function(){
    angular
        .module("TaskManagerApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope,$rootScope,$location)  {
        $scope.location = $location;
        $scope.rootScope = $rootScope;
    }
})();
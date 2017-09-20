(function () {
    "use strict";
    angular
        .module("TaskManagerApp")
        .factory("UserService", userService);

    function userService($http) {

        var service = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            login: login,
            logout: logout,
            register: register,
            updateUserforAdmin: updateUserforAdmin,
            createUserAdmin:createUserAdmin
        };

        return service;

        function findAllUsers(user) {
            return $http.get('/api/assignment/admin/user',user);
        }

        function createUserAdmin(user) {
            return $http.post('/api/assignment/admin/user', user);
        }

        function createUser(user) {
            return $http.post('/api/assignment/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/admin/user/' + userId);
        }

        function updateUserforAdmin(userId, user) {
            return $http.put('/api/assignment/admin/user/'+ userId, user);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/'+ userId, user);
        }

        function findUserByCredentials(username, password) {
            console.log(password);

            return $http.get('/api/assignment/user?username='+ username
                +'&password=' + password);
        }


        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

    }
})();
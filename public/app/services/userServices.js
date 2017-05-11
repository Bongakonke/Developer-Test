angular.module("userServices", [])

.factory('User', function ($http) {
    console.log("Testing user services file");
    var userFactory = {}; // Create the userFactory object

    // Register users in database
    userFactory.create = function (regData) {
        return $http.post('/api/users', regData);
    };

    // Activate user account with e-mail link
    userFactory.activateAccount = function (token) {
        return $http.put('/api/activate/' + token);
    };

    // Get the current user's permission
    userFactory.getPermission = function () {
        return $http.get('/api/permission/');
    };

    // Get all the users from database
    userFactory.getUsers = function () {
        return $http.get('/api/management/');
    };

    // Get user to then edit
    userFactory.getUser = function (emailAddress) {
        return $http.get('/api/edit/' + emailAddress);
    };

    // Delete a user
    userFactory.deleteUser = function (emailAddress) {
        return $http.delete('/api/management/' + emailAddress);
    };

    // Edit a user
    userFactory.editUser = function (id) {
        return $http.put('/api/edit', id);
    };

    return userFactory; // Return userFactory object
});
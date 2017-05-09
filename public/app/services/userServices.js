angular.module("userServices", [])

    .factory("User", function ($http) {
        console.log("Testing user services file");
        userFactory = {};

        userFactory.create = function (regData) {
            return $http.post("/api/users", regData);
        };

        return userFactory;
})
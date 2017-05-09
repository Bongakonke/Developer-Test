angular.module("authServices", []).factory("Auth", function ($http) {

    uathFactory = {};

    uathFactory.login = function (regData) {
        return $http.post("/api/users", regData);
    };

    return uathFactory;
});
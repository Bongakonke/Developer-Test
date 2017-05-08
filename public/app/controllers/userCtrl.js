angular.module("userControllers", []).controller("regUser", function ($http) {
    this.regUser = function (regData) {
        console.log("Testing user controller file");
        console.log(this.regData);
        $http.post("/api/users", this.regData);
    }; 
});
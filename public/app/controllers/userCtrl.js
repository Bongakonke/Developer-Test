angular.module("userControllers", ["userServices"]).controller("regUser", function ($http, $location, $timeout, User) {

    var app = this;
    this.regUser = function (regData) {
        app.loading = true;
        app.errorMsg = false;
        console.log("Testing user controller file");

        User.create(app.regData).then(function (data) {
            console.log(data.data.success);
            console.log(data.data.message);

            if (data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + "... redirecting";
                $timeout(function() {
                   $location.path("/management");
                }, 2000);
               
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });

    }; 
});
angular.module("mainController", ["authServices"]).controller("mainCtrl", function (Auth, $timeout, $location, $rootScope) {
    console.log("Testing main controller");

    var app = this;

    app.loadme = false;

    $rootScope.$on("$routeChangeStart", function () {
        if (Auth.isLoggedIn()) {
            console.log("Success: User is logged in");
            Auth.getUser().then(function (data) {
                console.log(data.data.firstName);
                app.firstName = data.data.firstName;
                app.emailAddress = data.data.emailAddress;
                app.isLoggedIn = true;
                app.loadme = true;
            });
        } else {
            console.log("Faillure: User is not logged in");
            app.firstName = {};
            app.isLoggedIn = false;
            app.loadme = true;
        }
    });    
   
    this.dologin = function (loginData) {
        app.loading = true;
        app.errorMsg = false;
        console.log("Testing user login");

        Auth.login(app.loginData).then(function (data) {
            console.log(data.data.success);
            console.log(data.data.message);

            if (data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + "... redirecting";
                $timeout(function () {
                    $location.path("/");
                    app.loginData = "";
                    app.successMsg = false;
                }, 2000);

            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };

    this.logout = function () {
        Auth.logout();
        $timeout(function () {
            $location.path("/logout");
            $timeout(function () {
                $location.path("/");
            }, 2000);
        }, 500);
    };

});
angular.module("appRoutes", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        console.log("Testing routes file");

        $routeProvider
            .when("/", {
                templateUrl: "app/views/pages/home.html"
            })

            .when("/adduser", {
                templateUrl: "app/views/pages/users/addUser.html",
                controller: "regUser",
                controllerAs: "register"
            })

            .when("/login", {
                templateUrl: "app/views/pages/users/login.html"
            })

            .otherwise("/", {
                templateUrl: "app/views/pages/about.html"
    });

    $locationProvider.html5Mode({
        enable: true,
        requireBase: false
    });
});
var app = angular.module("appRoutes", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        console.log("Testing routes file");

        $routeProvider
            .when("/", {
                templateUrl: "app/views/pages/home.html",
                authenticated: true
            })

            .when("/about", {
                templateUrl: "app/views/pages/about.html"
            })

            .when("/adduser", {
                templateUrl: "app/views/pages/users/addUser.html",
                controller: "regUser",
                controllerAs: "register",
                authenticated: true
            })

            .when("/login", {
                templateUrl: "app/views/pages/users/login.html",
                authenticated: false
            })

            .when("/profile", {
                templateUrl: "app/views/pages/users/profile.html",
                authenticated: true
            })

            .when("/logout", {
                templateUrl: "app/views/pages/users/logout.html",
                authenticated: true
            })

            .otherwise({redirectTo: "/"});

    $locationProvider.html5Mode({
        enable: true,
        requireBase: false
    });
});

app.run(["$rootScope", "Auth", "$location", function ($rootScope, Auth, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        console.log("Authenticated: " + next.$$route.authenticated);

        if(next.$$route.authenticated == true) {
            console.log("Authentication required");
            if(!Auth.isLoggedIn()) {
                event.preventDefault();
                $location.path("/login");
            }
        } else if (next.$$route.authenticated == false) {
            if(Auth.isLoggedIn()) {
                event.preventDefault();
                $location.path("/profile");
            }
            console.log("Authentication not required");
        } else {
            console.log("Public access");
        }
})
}]);
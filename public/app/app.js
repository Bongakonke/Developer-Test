angular.module("umsApp", ["appRoutes", "userControllers", "userServices", "ngAnimate", "mainController", "authServices", "managementController"]).config(function ($httpProvider) {
    console.log("Testing app file");
    $httpProvider.interceptors.push("AuthInterceptors");
})
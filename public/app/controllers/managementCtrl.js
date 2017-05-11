angular.module("managementController", [])
.controller("managementCtrl", function (User, $location) {
console.log("Testing management controller file");
    var app = this;

    app.loading = true;
    app.accessDenied = false;
    app.errorMsg = false;
        
    User.getUsers().then(function (data) {
        if (data.data.success) {
            if (data.data.permission == "admin") {
                app.users = data.data.users;
                app.loading = false;
                app.accessDenied = false;
                app.editAccess = true;
                app.deleteAccess = true;
            } else {
                app.errorMsg = "You dont have the required rights";
                app.loading = false;
            }
        } else {
            app.errorMsg = data.data.message;
            app.loading = false;
        }
    });

    app.deleteUser = function (emailAddress) {
        User.deleteUser(emailAddress).then(function (data) {
            if (data.data.success) {
                $location.path("/management");
            } else {
                app.showMoreError = data.data.message;
            }
        });
    };
});

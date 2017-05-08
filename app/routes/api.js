var User = require("../models/user");
module.exports = function (router) {
    router.post("/users", function (req, res) {
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.emailAddress = req.body.emailAddress;
        user.password = req.body.password;
        user.cellNumber = req.body.cellNumber;
        user.isLocked = req.body.isLocked;
        user.createdDate = req.body.createdDate;
        user.lastModified = req.body.lastModified;

        if (req.body.emailAddress == null || req.body.emailAddress == "") {
            res.send("Ensure email address is entered");
        } else {
            user.save(function (err) {
                if (err) {
                    res.send("Email already exist");
                } else {
                    res.send("User created");
                }
            });
        }
    });
    return router;
};
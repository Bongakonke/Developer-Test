var User = require("../models/user");
var jwt = require("jsonwebtoken");
var secret = "FingerLikenGood";

module.exports = function (router) {
    router.post("/users", function (req, res) {

        req.body.createdDate = new Date();
        req.body.lastModified = new Date();
        req.body.isLocked = false;
        req.body.permission = "user";

        var user = new User();

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.emailAddress = req.body.emailAddress;
        user.password = req.body.password;
        user.cellNumber = req.body.cellNumber;
        user.isLocked = req.body.isLocked;
        user.createdDate = req.body.createdDate;
        user.lastModified = req.body.lastModified;
        user.permission = req.body.permission;

        if (req.body.emailAddress == null || req.body.emailAddress == "" || req.body.password == null || req.body.password == "" || req.body.firstName == null || req.body.firstName == "" || req.body.lastName == null || req.body.lastName == "" || req.body.cellNumber == null || req.body.cellNumber == "") {
            res.json({success: false, message: "Ensure all fields are filled up"});
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({success: false, message: "Email already exist" });
                } else {
                    res.json({success: true, message: "User created" });
                }
            });
        }
    });

    router.post("/authenticate", function (req, res) {
        //res.send("Testing new route");
        User.findOne({ emailAddress: req.body.emailAddress })
		.select("emailAddress firstName password").exec(function (err, user) {
		    if (err) throw err;
		    if (!user) {
		        res.json({ success: false, message: "Could not authenticate user" });
		    } else if (user) {
		        if (req.body.password) {
		            var validPassword = user.comparePassword(req.body.password);
		            if (!validPassword) {
		                res.json({ success: false, message: "Could not authenticate password" });
		            } else {
		                var token = jwt.sign({ emailAddress: user.emailAddress, firstName: user.firstName }, secret, {expiresIn:"24h"});
		                res.json({ success: true, message: "User authenticated", token: token });
		            } 
		        } else {
		            res.json({success: false, message: "No password provided"});
		        }
		    }

		});
    });

    router.use(function (req, res, next) {
        var token = req.body.token || req.body.query || req.headers["x-access-token"];

        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ success: false, message: "Token invalid" });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.json({ success: false, message: "No token provided" });
        }
    });

    router.post("/me", function (req, res) {
        res.send(req.decoded);
    });

    router.get("/permission", function (req, res) {
        User.findOne({ emailAddress: req.decoded.emailAddress }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "No user was found" });
            } else {
                res.json({ success: true, permission: user.permission });
            }
        });
    });

    router.get("/management", function (req, res) {
        User.find({}, function (err, users) {
            if (err) throw err;
            User.findOne({ emailAddress: req.decoded.emailAddress }, function (err, mainUser) {
                if (err) throw err;
                if (!mainUser) {
                    res.json({ success: false, message: "No user found" });
                } else {
                    if (mainUser.permission == "admin") {
                        if (!users) {
                            res.json({ success: false, message: "Users not found" });
                        } else {
                            res.json({ success: true, users: users, permission: mainUser.permission });
                        }

                    } else {
                        res.json({ success: false, message: "You dont have the required rights" });
                    }
                }
            });
        });
    });

    router.delete("/management/:emailAddress", function (req, res) {
        var deleteUser = req.params.emailAddress;

        User.findOneAndRemove({ emailAddress: deleteUser }, function (err, user) {
            if (err) throw err;
            res.json({ success: true });
        })
    })

    return router;
};
var User = require("../models/user");
module.exports = function (router) {
    router.post("/users", function (req, res) {

        req.body.createdDate = new Date();
        req.body.lastModified = new Date();
        req.body.isLocked = false;

        var user = new User();

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.emailAddress = req.body.emailAddress;
        user.password = req.body.password;
        user.cellNumber = req.body.cellNumber;
        user.isLocked = req.body.isLocked;
        user.createdDate = req.body.createdDate;
        user.lastModified = req.body.lastModified;

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
		        var validPassword = user.comparePassword(req.body.password);
		        if (!validPassword) {
		            res.json({ success: false, message: "Could not authenticate password" });
		        } else 
		            res.json({ success: true, message: "User authenticated" });
		    }

		});
	});

    return router;
};
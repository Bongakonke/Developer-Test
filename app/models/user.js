var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var userSchema = new Schema({
    firstName: { type: String},
    emailAddress: { type: String, lowercase: true, required: true, unique: true },
    lastName: { type: String},
    cellNumber: { type: String},
    isLocked: { type: Boolean},
    createdDate: { type: Date },
    lastModified: { type: Date},
    password: { type: String}
});

userSchema.pre("save", function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model("User", userSchema);
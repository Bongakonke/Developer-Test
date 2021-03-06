var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var userSchema = new Schema({
    firstName: { type: String },
    emailAddress: { type: String, lowercase: true, required: true, unique: true },
    lastName: { type: String},
    cellNumber: { type: String},
    isLocked: { type: Boolean, default: false},
    createdDate: { type: Date },
    lastModified: { type: Date},
    password: { type: String },
    permission: {type: String, required: true, default: "user"}
});

userSchema.pre("save", function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
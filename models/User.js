const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, unique: true},
    confirm_password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now},
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt (10);
    this.password = await bcrypt.hash(this.password,salt);
});
module.exports = mongoose.model("User", userSchema);

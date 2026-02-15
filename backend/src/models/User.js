const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vehicleNumber: { type: String, required: true, unique: true },

    walletBalance: {
        type: Number,
        default: 0
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
});

module.exports = mongoose.model("User", userSchema);

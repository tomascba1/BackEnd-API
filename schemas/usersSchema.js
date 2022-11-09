const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")
const userSchema = new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, lowecase: true, trim: true, unique: true},
    password: {type: String, required: true},
    vaildEmail: {type: Boolean, default: false}
    },
    {timestamps: true} // createdAt, updatedAt
    );


    const User = model("User", userSchema)
    module.exports = User
const { Schema, model } = require ('mongoose')

const userSchema = new Schema({
        fname: {type:String, required: true, lowercase:true},
        lname: {type:String, required: true, lowercase:true},
        gender: {type:String, required: true, lowercase:true},
        email: {type:String, required: true, lowercase:true, unique:true},
        contact: {type:String, required: true, unique:true},
        badge: {type:String, required: true, unique:true},
        location: {type:String, required: true, lowercase:true},
        password: {type:String, required: true, lowercase:true},
        targets: {type:Array, default:[]},
        actuals: {type:Array, default:[]},
        isAdmin: {type: Boolean, required:true}
}, {timestamps:true})

module.exports = model('user', userSchema);

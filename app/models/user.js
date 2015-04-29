var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
    name: String,
    email:String,
    password:String,
    ip:String,
    pic:String,
    location:String,
    gender:String,
    firstTime:Boolean,
    
    alarms:[{
        name:String,
        position:{
            D:String,
            k:String
        }
    }]
});

module.exports = mongoose.model('User', userSchema);

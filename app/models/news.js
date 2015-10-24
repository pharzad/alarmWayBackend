var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    feed: {
        type: String,
        required: true
    },
    image: String
});

module.exports = mongoose.model('News', newsSchema);

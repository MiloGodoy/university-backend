const mongoose = require('mongoose')

module.exports = mongoose.model('services2', {
    title: String,
    description: String,
    imageUrl: String,
});


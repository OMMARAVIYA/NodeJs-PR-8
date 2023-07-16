const mongoose = require('mongoose');

const CrudTbl = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
})

const crud = mongoose.model('Blog', CrudTbl);

module.exports = crud;
const mongoose = require('mongoose');

const CrudTbl = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const crud = mongoose.model('User', CrudTbl);

module.exports = crud;
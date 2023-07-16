const mongoose = require('mongoose')

const CrudTbl = mongoose.Schema({
    category:{
        type:String,
        require:true
    }
})

const crud = mongoose.model('Category',CrudTbl);

module.exports = crud;
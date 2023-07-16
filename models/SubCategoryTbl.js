const mongoose = require('mongoose')

const CrudTbl = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'Category'
    },
    subcategory: {
        type: String,
        require: true
    }
})

const crud = mongoose.model('SubCategory', CrudTbl);

module.exports = crud;
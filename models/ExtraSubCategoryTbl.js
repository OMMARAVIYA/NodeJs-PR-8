const mongoose = require('mongoose')

const CrudTbl = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'Category'
    },
    subcategoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'SubCategory'
    },
    extrasubcategory: {
        type: String,
        require: true
    }
})

const crud = mongoose.model('ExtraSubCategory', CrudTbl);

module.exports = crud;
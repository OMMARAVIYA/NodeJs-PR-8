const mongoose = require('mongoose')

const CrudTbl = mongoose.Schema({
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    subcategoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory'
    },
    extrasubcategoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'ExtraSubCategory'
    },
    pname: {
        type: String,
        require: true
    },
    pqty: {
        type: String,
        require: true
    },
    pprice: {
        type: String,
        require: true
    },
    pdescription: {
        type: String,
        require: true
    },
    pimage: {
        type: String,
        require: true
    }
})

const crud = mongoose.model('Product', CrudTbl);

module.exports = crud;
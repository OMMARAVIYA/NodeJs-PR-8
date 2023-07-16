const CategoryTbl = require('../models/CategoryTbl');

const SubCategoryTbl = require('../models/SubCategoryTbl');

const ExtraSubCategoryTbl = require('../models/ExtraSubCategoryTbl');

const extrasubcategory = async (req, res) => {
    try {
        let category = await CategoryTbl.find({});
        let subcategory = await SubCategoryTbl.find({});
        return res.render('extrasubcategory', {
            category,
            subcategory,
            single :""
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const AddExtraSubCategory = async (req, res) => {
    const { editid, category, subcategory, extrasubcategory } = req.body;
    try {
        if (editid) {
            let singleextrasubcategory = await ExtraSubCategoryTbl.findById(editid);
            if (singleextrasubcategory) {
                let EditExtraSubCategory = await ExtraSubCategoryTbl.findByIdAndUpdate(editid, {
                    categoryId: category,
                    subcategoryId: subcategory,
                    extrasubcategory: extrasubcategory
                })
                if (EditExtraSubCategory) {
                    console.log("ExtraSubCategory Successfully Updated");
                    return res.redirect('viewextrasubcategory');
                }
                else {
                    console.log("ExtraSubCategory Not Updated! Please try Again.");
                    return res.redirect('back');
                }
            }
        }
        else {
            let AddExSubCat = await ExtraSubCategoryTbl.create({
                categoryId: category,
                subcategoryId: subcategory,
                extrasubcategory: extrasubcategory
            })
            if (AddExSubCat) {
                console.log("ExtraSubCategory SuccessFully Add");
                return res.redirect('viewextrasubcategory');
            }
            else {
                console.log("Category Not Add");
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const viewextrasubcategory = async (req, res) => {
    try {
        let extrasubcategory = await ExtraSubCategoryTbl.find({}).populate('categoryId').populate('subcategoryId');
        if (extrasubcategory) {
            return res.render('viewextrasubcategory', {
                extrasubcategory
            });
        }
        else {
            console.log("Data Not Found");
            return res.redirect('viewextrasubcategory');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const EditExtraSubCategory = async (req, res) => {
    try {
        let id = req.query.id;
        let category = await CategoryTbl.find({})
        let subcategory = await SubCategoryTbl.find({});
        let single = await ExtraSubCategoryTbl.findById(id);
        if (single) {
            return res.render('extrasubcategory', {
                single,
                category,
                subcategory
            })
        }
        else {
            console.log("Data Not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    extrasubcategory,
    AddExtraSubCategory,
    viewextrasubcategory,
    EditExtraSubCategory
}
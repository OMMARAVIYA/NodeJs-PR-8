const CategoryTbl = require('../models/CategoryTbl');

const SubCategoryTbl = require('../models/SubCategoryTbl');

const subcategory = async (req, res) => {
    try {
        let category = await CategoryTbl.find({});
        return res.render('subcategory', {
            category,
            single: ""
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const AddSubCategory = async (req, res) => {
    try {
        const { editid,category, subcategory } = req.body;
        if (editid) {
            let singlesubcategory = await SubCategoryTbl.findById(editid);
            if (singlesubcategory) {
                let EditSubCategory = await SubCategoryTbl.findByIdAndUpdate(editid, {
                    categoryId: category,
                    subcategory: subcategory
                })
                if (EditSubCategory) {
                    console.log("SubCategory Successfully Updated");
                    return res.redirect('viewsubcategory');
                }
                else {
                    console.log("SubCategory Not Updated! Please try Again.");
                    return res.redirect('back');
                }
            }
        }
        else {
            let AddSubCat = await SubCategoryTbl.create({
                categoryId: category,
                subcategory: subcategory
            })
            if (AddSubCat) {
                console.log("SubCategory SuccessFully Add");
                return res.redirect('viewsubcategory');
            }
            else {
                console.log("Category Not Add");
                return res.redirect('back');
            }
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewsubcategory = async (req, res) => {
    try {
        let subcategory = await SubCategoryTbl.find({}).populate('categoryId');
        if (subcategory) {
            return res.render('viewsubcategory', {
                subcategory
            })
        }
        else {
            console.log("Record Not Found");
            return res.redirect('viewsubcategory');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const EditSubCategory = async (req, res) => {
    try {
        let id = req.query.id;
        console.log(id);
        let category = await CategoryTbl.find({})
        let single = await SubCategoryTbl.findById(id);
        if (single) {
            return res.render('subcategory', {
                single,
                category
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
    subcategory,
    AddSubCategory,
    viewsubcategory,
    EditSubCategory
}
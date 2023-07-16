const CategoryTbl = require('../models/CategoryTbl');

const category = (req, res) => {
    return res.render('category', {
        single: ""
    });
}

const AddCategory = async (req, res) => {
    try {
        const { editid, category } = req.body;
        if (editid) {
            let singlecategory = await CategoryTbl.findById(editid);
            if (singlecategory) {
                let EditCategory = await CategoryTbl.findByIdAndUpdate(editid, {
                    category: category
                })
                if (EditCategory) {
                    console.log("Category Successfully Updated");
                    return res.redirect('viewcategory');
                }
                else {
                    console.log("Category Not Updated! Please try Again.");
                    return res.redirect('back');
                }
            }
        }
        else {
            let AddCat = await CategoryTbl.create({
                category: category
            })
            if (AddCat) {
                console.log("Category SuccessFully Add");
                return res.redirect('viewcategory');
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

const ViewCategory = async (req, res) => {
    try {
        let category = await CategoryTbl.find({});
        console.log(category);
        if (category) {
            return res.render('viewcategory', {
                category
            })
        }
        else {
            console.log("Record Not Found");
            return res.redirect('viewcategory');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const DeleteCategory = async (req, res) => {
    try {
        let id = req.query.id;
        let deletedata = await CategoryTbl.findByIdAndDelete(id);
        if (deletedata) {
            console.log("Category Successfully deleted");
            return res.redirect('viewcategory');
        }
        else {
            console.log("Something Got Wrong");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const EditCategory = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await CategoryTbl.findById(id);
        if (single) {
            return res.render('category', {
                single
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
    category,
    AddCategory,
    ViewCategory,
    DeleteCategory,
    EditCategory
}
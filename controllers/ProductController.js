const CategoryTbl = require('../models/CategoryTbl');

const SubCategoryTbl = require('../models/SubCategoryTbl');

const ExtraSubCategoryTbl = require('../models/ExtraSubCategoryTbl');

const ProductTbl = require('../models/ProductTbl');

const fs = require('fs');

const product = async (req, res) => {
    try {
        let category = await CategoryTbl.find({});
        let subcategory = await SubCategoryTbl.find({});
        let extrasubcategory = await ExtraSubCategoryTbl.find({});
        return res.render('product', {
            category,
            subcategory,
            extrasubcategory,
            single: ""
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const addproduct = async (req, res) => {
    try {
        const { editid, category, subcategory, extrasubcategory, pname, pqty, pprice, pdescription } = req.body;
        if (editid) {
            if (req.file) {
                let deleteimg = await ProductTbl.findById(editid)
                if (deleteimg) {
                    fs.unlinkSync(deleteimg.pimage)
                }
                else {
                    console.log("image not delete");
                    return false
                }
                let pimage = "";
                if (req.file) {
                    pimage = req.file.path;
                }
                let EditProduct = await ProductTbl.findByIdAndUpdate(editid, {
                    pname: pname,
                    pqty: pqty,
                    pprice: pprice,
                    pdescription: pdescription,
                    pimage: pimage
                })
                if (EditProduct) {
                    console.log("Product Successfully Updated");
                    return res.redirect('viewproduct');
                }
                else {
                    console.log("Product Not Updated! Please try Again.");
                    return res.redirect('back');
                }
            }
            else {
                let pimage = ""
                let singleproduct = await ProductTbl.findById(editid);
                console.log(singleproduct);
                if (singleproduct) {
                    pimage = singleproduct.pimage;
                    let EditProduct = await ProductTbl.findByIdAndUpdate(editid, {
                        pname: pname,
                        pqty: pqty,
                        pprice: pprice,
                        pdescription: pdescription,
                        pimage: pimage
                    })
                    if (EditProduct) {
                        console.log("Product Successfully Updated");
                        return res.redirect('viewproduct');
                    }
                    else {
                        console.log("Product Not Updated! Please try Again.");
                        return res.redirect('back');
                    }
                }
                else {
                    console.log("Data Not Found");
                    return res.redirect('viewproduct');
                }
            }
        }
        else {
            let pimage = "";
            if (req.file) {
                pimage = req.file.path;
            }
            let AddProduct = await ProductTbl.create({
                categoryId: category,
                subcategoryId: subcategory,
                extrasubcategoryId: extrasubcategory,
                pname: pname,
                pqty: pqty,
                pprice: pprice,
                pdescription: pdescription,
                pimage: pimage
            })
            if (AddProduct) {
                console.log("Product SuccessFully Add");
                return res.redirect('viewproduct');
            }
            else {
                console.log("Product Not Add");
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        console.log(err);
        return false
    }
}

const viewproduct = async (req, res) => {
    try {
        let product = await ProductTbl.find({}).populate('categoryId').populate('subcategoryId').populate('extrasubcategoryId');
        if (product) {
            return res.render('viewproduct', {
                product
            });
        }
        else {
            console.log("Data Not Found");
            return res.redirect('viewproduct');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const DeleteProduct = async (req, res) => {
    try {
        let id = req.query.id;
        let deleteproduct = await ProductTbl.findByIdAndDelete(id);
        if (deleteproduct) {
            console.log("Product Successfully deleted");
            return res.redirect('viewproduct');
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

const EditProduct = async (req, res) => {
    try {
        let id = req.query.id;
        let category = await CategoryTbl.find({})
        let subcategory = await SubCategoryTbl.find({});
        let extrasubcategory = await ExtraSubCategoryTbl.find({});
        let single = await ProductTbl.findById(id);
        console.log(single);
        if (single) {
            return res.render('product', {
                single,
                category,
                subcategory,
                extrasubcategory
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
    product,
    addproduct,
    viewproduct,
    DeleteProduct,
    EditProduct
}
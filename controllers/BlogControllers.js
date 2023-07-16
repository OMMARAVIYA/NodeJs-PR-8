const BlogTbl = require('../models/BlogTbl');

const fs = require('fs');

const Blog = (req, res) => {
    return res.render('insertblog', {
        single: ""
    });
}

const InsertBlog = async (req, res) => {
    try {
        const { editid, title, description } = req.body;
        if (editid) {
            if (req.file) {
                if (!title || !description) {
                    console.log("Enter All Data");
                    return res.redirect('back')
                }
                let deleteimg = await BlogTbl.findById(editid)
                if (deleteimg) {
                    fs.unlinkSync(deleteimg.image)
                }
                else {
                    console.log("image not delete");
                    return false
                }
                let image = "";
                if (req.file) {
                    image = req.file.path;
                }
                let EditBlog = await BlogTbl.findByIdAndUpdate(editid, {
                    title: title,
                    description: description,
                    image: image
                })
                if (EditBlog) {
                    console.log("Blog Successfully Updated");
                    return res.redirect('viewblog');
                }
                else {
                    console.log("Blog Not Updated! Please try Again.");
                    return res.redirect('back');
                }
            }
            else {
                let image = ""
                let singledata = await BlogTbl.findById(editid);
                if (!title || !description) {
                    console.log("Enter All Data");
                    return res.redirect('back')
                }
                if (singledata) {
                    image = singledata.image;
                    let EditBlog = await BlogTbl.findByIdAndUpdate(editid, {
                        title: title,
                        description: description,
                        image: image
                    })
                    if (EditBlog) {
                        console.log("Blog Successfully Updated");
                        return res.redirect('viewblog');
                    }
                    else {
                        console.log("Blog Not Updated! Please try Again.");
                        return res.redirect('back');
                    }
                }
            }
        }
        else {
            let image = "";
            if (req.file) {
                image = req.file.path;
            }
            let Blog = await BlogTbl.create({
                title: title,
                description: description,
                image: image
            })
            if (Blog) {
                console.log("Blog SuccessFully Inserted");
                return res.redirect('viewblog');
            }
            else {
                console.log("Something Got Wrong!");
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const View = async (req, res) => {
    try {
        let blogdata = await BlogTbl.find({});
        if (blogdata) {
            return res.render('viewblog', {
                blogdata
            })
        }
        else {
            console.log("Record Not Found");
            return res.redirect('viewblog');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const DeleteBlog = async (req, res) => {
    try {
        let id = req.query.id
        let dltimg = await BlogTbl.findById(id)
        if (dltimg) {
            fs.unlinkSync(dltimg.image)
        }
        else {
            console.log("image not delete");
            return false
        }
        let deletedata = await BlogTbl.findByIdAndDelete(id);
        if (deletedata) {
            console.log("Blog Successfully deleted");
            return res.redirect('viewblog');
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

const EditBlog = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await BlogTbl.findById(id);
        if (single) {
            return res.render('insertblog', {
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
    Blog,
    InsertBlog,
    View,
    DeleteBlog,
    EditBlog
}
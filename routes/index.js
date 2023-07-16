const express = require("express");

const routes = express.Router();

const passport = require('passport');

const fileupload = require('../config/fileupload');

const AdminController = require('../controllers/AdminControllers');
const BlogController = require('../controllers/BlogControllers');
const CategoryController = require('../controllers/CategoryControllers');
const SubCategoryController = require('../controllers/SubCategoryController');
const ExtraSubCategoryController = require('../controllers/ExtraSubCategoryControllers');
const ProductController = require('../controllers/ProductController');

// AdminController
routes.get('/', AdminController.index);
routes.post('/UserLogin', passport.authenticate('local', { failureRedirect: '/' }), AdminController.UserLogin);
routes.get('/register', AdminController.register);
routes.post('/RegisterData', AdminController.RegisterData)
routes.get('/forgot', AdminController.forgot);
routes.post('/ForgotPassword', AdminController.ForgotPassword);
routes.get('/otp', AdminController.OTP);
routes.post('/EnterOTp', AdminController.EnterOTp)
routes.get('/NewpasswordPage', AdminController.NewpasswordPage);
routes.post('/AdminNewPassword', AdminController.UpdatePassword);
routes.get('/dashboard', passport.ChechAuthentication, AdminController.dashboard);

// BlogController
routes.get('/insertblog', passport.ChechAuthentication, BlogController.Blog);
routes.post('/InsertBLog', fileupload, BlogController.InsertBlog);
routes.get('/viewblog', passport.ChechAuthentication, BlogController.View);
routes.get('/DeleteBlog', BlogController.DeleteBlog);
routes.get('/EditBlog', BlogController.EditBlog);

// CategoryController
routes.get('/category', passport.ChechAuthentication, CategoryController.category);
routes.post('/AddCategory', CategoryController.AddCategory);
routes.get('/viewcategory', passport.ChechAuthentication, CategoryController.ViewCategory);
routes.get('/DeleteCategory', CategoryController.DeleteCategory);
routes.get('/EditCategory', CategoryController.EditCategory);

// SubCategoryController
routes.get('/subcategory', passport.ChechAuthentication, SubCategoryController.subcategory);
routes.post('/AddSubCategory', SubCategoryController.AddSubCategory);
routes.get('/viewsubcategory', passport.ChechAuthentication, SubCategoryController.viewsubcategory);
routes.get('/EditSubCategory', SubCategoryController.EditSubCategory);

// ExtraSubCategoryController
routes.get('/extrasubcategory', passport.ChechAuthentication, ExtraSubCategoryController.extrasubcategory);
routes.post('/AddExtraSubCategory', ExtraSubCategoryController.AddExtraSubCategory);
routes.get('/viewextrasubcategory', passport.ChechAuthentication, ExtraSubCategoryController.viewextrasubcategory);
routes.get('/EditExtraSubCategory', ExtraSubCategoryController.EditExtraSubCategory);

// ProductController
routes.get('/product', passport.ChechAuthentication, ProductController.product);
routes.post('/addproduct', fileupload, ProductController.addproduct);
routes.get('/viewproduct', passport.ChechAuthentication, ProductController.viewproduct);
routes.get('/DeleteProduct', ProductController.DeleteProduct);
routes.get('/EditProduct', ProductController.EditProduct);

module.exports = routes;
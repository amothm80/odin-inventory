import { getAllCategoriesDB, addCategoryDB, updateCategoryDB ,deleteCategoryDB} from "../db/queries.js";
import { validationResult, matchedData, checkSchema } from "express-validator";
export async function getAllCategories(req, res, next) {
  const categoriesResult = await getAllCategoriesDB();
  res.locals.categoriesResult = categoriesResult;
  next();
}

export async function getSelectedCategory(req, res, next) {
  const { categoryID } = req.params;
  res.locals.selectedCategory = categoryID;
  next();
}

export async function checkEditItemInCategory(req,res,next){
  if (req.query.editItem){
    res.locals.cancelLink = req.baseUrl;
    res.locals.editItem = req.query.editItem;
  }
  next();
}

export async function checkAddItemInCategory(req,res,next){
  if (req.query.addItem){
    res.locals.cancelLink = req.baseUrl;
    res.locals.addItem = req.query.addItem;
  }
  next();
}

export const checkCategorySchema = checkSchema({
  categoryID: {
    escape: true,
    trim: true,
  },
  categoryName: {
    errorMessage: "Invalid category",
    escape: true,
    trim: true,
    notEmpty: true,
  },
});

export async function addCategory(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    await addCategoryDB(data.categoryName);
    res.redirect("/");
  } else {
    res.locals.errors = result.array();
    res.status(400).render("index");
  }
}

export async function editCategory(req,res){
  res.locals.editCategory = req.params.categoryID
  res.status(400).render("index");
}

export async function saveCategory(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {

    const data = matchedData(req);
    await updateCategoryDB(Number(data.categoryID),data.categoryName)
    res.redirect("/");
  } else {
    res.locals.errors = result.array();
    res.status(400).render("index");
  }
}

export async function deleteCategory(req,res){
  const {categoryID} = req.params
  await deleteCategoryDB(Number(categoryID))
  res.redirect('/')
}
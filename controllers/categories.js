import { getAllCategoriesDB, addCategoryDB } from "../db/queries.js";

export async function getAllCategories(req, res,next) {
  const categoriesResult = await getAllCategoriesDB();
  res.locals.categoriesResult = categoriesResult;
  next();
}

export async function getSelectedCategory(req, res,next){
  const { categoryID } = req.params;
  res.locals.selectedCategory = categoryID;
  next()
}

export async function addCategory(req, res){
  console.log(req.body)
  // await addCategoryDB(name);
  res.redirect(req.get('referer'));
}

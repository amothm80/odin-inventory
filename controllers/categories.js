import { getAllCategoriesDB } from "../db/queries.js";

export async function getAllCategories(req, res,next) {
  const categoriesResult = await getAllCategoriesDB();
  console.log(categoriesResult);
  res.locals.categoriesResult = categoriesResult;
  next();
}

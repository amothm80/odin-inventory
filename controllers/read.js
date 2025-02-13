import { getAllItemsForCategoryDB, getAllCategoriesDB } from "../db/queries.js";

export async function getAllCategories(req, res,next) {
  const categoriesResult = await getAllCategoriesDB();
  console.log(categoriesResult);
  res.locals.categoriesResult = categoriesResult;
  next();
}

export async function getAllItemsForCategory(req, res) {
  console.log(req.params);
  const { categoryID } = req.params;
  let itemsResult;
  if (categoryID) {
    itemsResult = await getAllItemsForCategoryDB(Number(categoryID));
    res.locals.itemsResult = itemsResult;
    console.log(itemsResult);

  }
  res.status(200).render("index");
}

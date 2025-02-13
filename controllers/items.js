import { getAllItemsForCategoryDB } from "../db/queries.js";


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

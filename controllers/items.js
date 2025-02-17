import { getAllItemsForCategoryDB,getItemByIdDB } from "../db/queries.js";

export async function getItemById(req,res,next){
  const { itemId } = req.params;
  let itemResult;
  if (itemId){
    itemResult = await getItemByIdDB(Number(itemId))
    res.locals.itemResult = itemResult;
  }
  next()
}

export async function getAllItemsForCategory(req, res) {
  console.log('get all items')
  const { categoryID } = req.params;
  let itemsResult;
  if (categoryID) {
    itemsResult = await getAllItemsForCategoryDB(Number(categoryID));
    res.locals.itemsResult = itemsResult;
    // console.log(itemsResult);

  }
  res.status(200).render("index");
}

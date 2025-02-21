import { getAllItemsForCategoryDB, getItemByIdDB , addItemDB, updateItemDB,deleteItemDB} from "../db/queries.js";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { querifyErrors } from "../utils/utils.js";


export const checkItemSchema = checkSchema({
  itemId: {
    escape: true,
    trim: true,
  },
  itemName: {
    errorMessage: "Invalid item name",
    escape: true,
    trim: true,
    notEmpty: true,
  },
  itemMake: {
    errorMessage: "Invalid item make",
    escape: true,
    trim: true,
    notEmpty: true,
  },
  itemPrice: {
    errorMessage: "Invalid item price",
    escape: true,
    trim: true,
    // notEmpty: true,
    isCurrency: {
      options: {
        require_symbol: false,
        allow_negatives: false,
        allow_decimal: true,
      },
    },
  },
  itemQuantity: {
    errorMessage: "Invalid item quantity",
    escape: true,
    trim: true,
    // notEmpty: true,
    isNumeric: true,
  },
  itemCategory: {
    errorMessage: "Invalid item category",
    escape: true,
    trim: true,
    notEmpty: true,
    isNumeric: true,
  },
});

export async function saveItem(req, res, next) {
  console.log(req.body)
  const result = validationResult(req);
  // console.log(result.array())
  const referrer = new URL(req.get("Referrer"));
  let addItemParam = referrer.searchParams.get("addItem");
  let editItemParam = referrer.searchParams.get("editItem");
  if (result.isEmpty()) {
    const data = matchedData(req);
    console.log("save item params");
    if (addItemParam){
      await addItemDB(data.itemName, data.itemMake, data.itemPrice, data.itemQuantity, data.itemCategory)
    }else{
      await updateItemDB(data.itemId, data.itemName, data.itemMake, data.itemPrice, data.itemQuantity, data.itemCategory)
    }
    res.redirect(referrer.pathname);
  } else {
    const errorsQuery = querifyErrors(result.array());
    addItemParam = addItemParam ? "addItem=" + addItemParam : "";
    editItemParam = editItemParam ? "editItem=" + editItemParam : "";
    res
      .status(400)
      .redirect(
        referrer.pathname +
          "?" +
          addItemParam +
          "&" +
          editItemParam +
          "&" +
          errorsQuery
      );
  }
}

export async function getItemById(req, res, next) {
  const { itemId } = req.params;
  let itemResult;
  if (itemId) {
    itemResult = await getItemByIdDB(Number(itemId));
    res.locals.itemResult = itemResult;
  }
  next();
}

export async function getAllItemsForCategory(req, res) {
  console.log("get all items");
  const {errors, itemName,itemMake,itemPrice,itemQuantity} = req.query
  const { categoryID } = req.params;
  let itemsResult;
  if (categoryID) {
    itemsResult = await getAllItemsForCategoryDB(Number(categoryID));
    res.locals.itemsResult = itemsResult;
    res.locals.categoryID = categoryID;
    // console.log(itemsResult);
  }
  if (errors){
    res.locals.itemerrors = {itemName,itemMake,itemPrice,itemQuantity}
  }
  res.status(200).render("index");
}

export async function deleteItem(req,res){
  console.log(req.params)
  const {itemId} = req.params
  await deleteItemDB(Number(itemId))
  res.redirect(new URL(req.get("Referrer")))
}
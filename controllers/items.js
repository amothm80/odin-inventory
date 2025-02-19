import { getAllItemsForCategoryDB, getItemByIdDB } from "../db/queries.js";
import { validationResult, matchedData, checkSchema } from "express-validator";

export const checkCategorySchema = checkSchema({
  categoryName: {
    errorMessage: "Invalid category",
    escape: true,
    trim: true,
    notEmpty: true,
  },
});

export const checkItemSchema = checkSchema({
  itemName: {
    errorMessage: "Invalid item name",
    escape: true,
    trim: true,
    notEmpty: true,
  },
  itemMake: {
    errorMessage: "Invalid item name",
    escape: true,
    trim: true,
    notEmpty: true,
  },
  itemPrice: {
    errorMessage: "Invalid item price",
    escape: true,
    trim: true,
    notEmpty: true,
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
    notEmpty: true,
    isNumeric: true
  }
});

export async function saveItem(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    console.log('item data')
    console.log(data)
    // await addCategoryDB(data.categoryName);
    // res.redirect("/");
    console.log('save item params')
    const refererPath = new URL(req.get("Referrer")).pathname;
    const param =   new URL(req.get("Referrer")).searchParams.get('editItem')
    console.log(param)
    res.redirect(refererPath);
  } else {
    console.log('item data errors')
    console.log(result);
    res.locals.errors = result.array();
    res.status(400).render("index");
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
  const { categoryID } = req.params;
  let itemsResult;
  if (categoryID) {
    itemsResult = await getAllItemsForCategoryDB(Number(categoryID));
    res.locals.itemsResult = itemsResult;
    // console.log(itemsResult);
  }
  res.status(200).render("index");
}

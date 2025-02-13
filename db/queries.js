import pool from "./pool.js";

//read categories
export async function getAllCategoriesDB() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

//read items
export async function getAllItemsForCategoryDB(id) {
  const { rows } = await pool.query("SELECT * FROM items where category = $1",[id]);
  return rows;
}

//create categories
export async function addCategoryDB(name) {
  await pool.query("INSERT INTO categories (name) values ($1)", [name]);
}

//create items
export async function addItemDB(name, make, price, quantity, cateogry) {
  await pool.query(
    "INSERT INTO items (name,make,price,quantity,category) values ($1,$2,$3,$4,$5)",
    [name, make, price, quantity, cateogry]
  );
}

//update category
export async function updateCategoryDB(id, name) {
  await pool.query("UPDATE categories SET name = $1 where id = $2", [name, id]);
}

//update item
export async function updateItemDB(id, name, make, price, quantity, cateogry) {
  await pool.query(
    "UPDATE  items set name = $1, make= $2,price = $3,quantity = $4,category = $5 where id = $6",
    [name, make, price, quantity, cateogry, id]
  );
}

//delete cateogry

export async function deleteCategoryDB(id) {
  await pool.query("DELETE FROM items WHERE category = $1", [id]);
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

//delete item

export async function deleteItemDB(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

import pool from "./pool.js";

export async function searchUsernames(query) {
  const { rows } = await pool.query(
    "SELECT * FROM usernames WHERE username LIKE ($1)",
    ['%'+query+'%']
  );
  return rows;
}
export async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

export async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

export async function deleteUsername(id) {
  await pool.query("DELETE FROM usernames WHERE id=($1)", [id]);
}

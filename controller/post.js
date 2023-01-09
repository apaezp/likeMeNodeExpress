const pool = require("../config/pool");

const getPost = async () => {
  const {rows} = await pool.query("SELECT * FROM posts")
  return rows
};

const addPost = async (titulo, img, description, likes) => {
  const query = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, description, likes];
  const result = await pool.query(query, values);
  console.log("Post added successfully ");
};

const addLike = async (id) => {
  const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  console.log("Post liked successfully ");
};

const deletePost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  console.log("Post deleted successfully ");
};

module.exports = {
  getPost,
  addPost,
  addLike,
  deletePost,
};

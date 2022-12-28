const pool = require("../config/pool");

const getPost = async () => {
  const {rows} = await pool.query("SELECT * FROM posts")
  return rows
};

const addPost = async (titulo, img, description, likes) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, description, likes];
  const result = await pool.query(consulta, values);
  console.log("Post added successfully ");
};


module.exports = {
  getPost,
  addPost
};

const express = require("express");
const app = express();

const cors = require("cors");
const { getPost, addPost, addLike, deletePost } = require("./controller/post");
require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname + "/public/index.html");
  } catch (error) {
    res.json({ message: "This is not available. Come back later!" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const post = await getPost();
    let modificado = post.map((p) => ({
      id: p.id,
      titulo: p.titulo,
      img: p.img,
      descripcion: p.description,
    }));
    res.json(modificado);
  } catch (error) {
    res.json({ message: "This is not available. Come back later!" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion, likes } = req.body;
    console.log(req.body);

    await addPost(titulo, url, descripcion, likes);
    res.send("Post added successfully");
  } catch (error) {
    res.json({ message: "This is not available. Come back later! " });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await addLike(id);
    res.status(200).json({
      message: "Like added successfully",
    });
    }  catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
});


app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deletePost(id);
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


app.listen(PORT, console.log(`Server running at : ${PORT}`));


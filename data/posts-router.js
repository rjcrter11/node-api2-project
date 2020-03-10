const express = require("express");

const Post = require("./db");

const router = express.Router();

// ------------- Get requests ------------- //

router.get("/", (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving posts"
      });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

// ---------- Post requests ----------- //

router.post("/", (req, res) => {
  const userPost = req.body;

  if (!userPost.title || !userPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Post.insert(req.body)
      .then((posts) => {
        res.status(201).json(posts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error adding the post"
        });
      });
  }
});

// ----------- Delete requests ----------- //

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Post.remove(id)
    .then((posts) => {
      if (posts > 0) {
        res.status(200).json({ message: "The post has been removed" });
      } else {
        res.status(404).json({ message: "The posts could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "The post could not be removed" });
    });
});

// ----------- Put requests ------------ //

router.put("/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  if (!changes.title || !changes.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Post.update(id, changes)
      .then((posts) => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: "The post could not be found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      });
  }
});

module.exports = router;

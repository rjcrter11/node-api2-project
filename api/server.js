const express = require("express");
const cors = require("cors");
const postsRouter = require("../data/posts-router");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send("<h2>Lambda Posts API</h2>");
});

module.exports = server;

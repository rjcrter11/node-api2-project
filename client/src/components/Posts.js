import React, { useState, useEffect } from "react";
import axios from "axios";

import PostForms from "./PostForms";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>

      <PostForms posts={posts} updatePosts={setPosts} fetchPosts={fetchPosts} />
    </div>
  );
};

export default Posts;

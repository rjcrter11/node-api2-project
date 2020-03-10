import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post-card">
            <h3> Title: {post.title} </h3>
            <h4> {post.contents} </h4>
            <p> created at: {post.created_at} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;

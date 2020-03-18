import React, { useState } from "react";
import axios from "axios";

const initialPost = {
  title: "",
  contents: ""
};

const PostForms = ({ posts, updatePosts, fetchPosts }) => {
  const [editing, setEditing] = useState(false);
  const [postToEdit, setPostToEdit] = useState(initialPost);

  const editPost = (post) => {
    setEditing(true);
    setPostToEdit(post);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/posts/${posts.id}`, postToEdit)
      .then((res) => {
        console.log("put response", res);
        //  updatePosts(res.data);
        setEditing(false);
        // fetchPosts();
      })
      .catch((err) => console.log(err));
  };

  // const deletePost = (post) => {
  //   axios
  //     .delete(`http://localhost:5000/api/posts/${post.id}`)
  //     .then((res) => {
  //       console.log(res);
  //       fetchPosts();
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3> Title: {post.title} </h3>
            <h4> {post.contents} </h4>
            <p> created at: {post.created_at} </p>
            <span className="delete">x</span>
            <button
              type="button"
              onClick={() => editPost(post)}
              className="edit-btn"
            >
              Edit Post
            </button>
          </div>
        ))}
      </div>
      <h5>This will be a form</h5>
      {editing && (
        <form onSubmit={saveEdit}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            onChange={(e) =>
              setPostToEdit({ ...postToEdit, title: e.target.value })
            }
            value={postToEdit.title}
          />
          <label htmlFor="contents">Content: </label>
          <input
            type="text"
            id="contents"
            onChange={(e) =>
              setPostToEdit({ ...postToEdit, contents: e.target.value })
            }
            value={postToEdit.contents}
          />
          <button type="submit"> Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default PostForms;

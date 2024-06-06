import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ post }) => {
const navigate = useNavigate()

  function handlePostDelete () {
    fetch(`http://localhost:8000/posts/${post.id}`, {
      method: "DELETE"
    }).then((response) => {
      return response.json()

    }).then((deletedPost) => {
      alert(`post ${post.title} deleted`)
      // ask chat gpt for better way to do this because it is bad as fuck how will i delete a post in the home page and it will take me to blog :(      navigate('/blogs')
      console.log(deletedPost)
    }).catch(error => {
      alert(error)
    })
  }

  const imagePath = require(`../images/post-covers/${post.id}.webp`)
  return (
    <div className="unit-blog">
      <div className="up">
        <Link to={`/post/${post.id}`}>
          <img className="blog-image" src={imagePath} alt="post cover" />
        </Link>
      </div>
      <div className="down">
        <h3 title={post.title}>{post.title}</h3>
        <div className="description">
          <span className="date">{post.date}</span>
          <span className="views">{post.views} views</span>
        </div>
        <div className="snippet">
          <p>{post.content[0]}</p>
        </div>
        <div className="readmore-cta">
          <Link to={`/post/${post.id}`}>read more</Link>
          <button className="post-delete-button"  onClick={handlePostDelete}> delete</button>
        </div>
      </div>
    </div>
  );
};

export default Post;

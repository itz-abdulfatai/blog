import { useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {

  const imagePath = require(`../images/post-covers/${post.id}.webp`)
  return (
    <div className="unit-blog">
      <div className="up">
        <Link to={`/blog`}>
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
        </div>
      </div>
    </div>
  );
};

export default Post;

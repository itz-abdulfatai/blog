import "../styles/blog-style.css";
import UseFetchPost from "../hooks/UseFetchPosts";
import { useParams, useNavigate } from "react-router-dom";
import Post from "../components/post";
import { useState } from "react";
import UseFetchSinglePost from "../hooks/useFetchSinglePost";
import useFetchImage from "../hooks/useFetchImage";

// src/styles/.css

const Blog = () => {
  const { id } = useParams();
  // const imagePath = require(`../images/post-covers/${id}.webp`);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [addPending, setAddPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const navigate = useNavigate();
  const { imgPending, imgFinished, imgError, stringImg } = useFetchImage(id);

  //   i would normally send two different requsest one for the post in which the endpoint will carry the id and one for the related posts so as to not expose all posts just to see one

  const {
    data: blogs,
    isPending,
    finished,
    randomisedPosts,
    error,
  } = UseFetchPost("http://192.168.43.3:8000/posts");

  let {
    data: singleBlog,
    isPending: singleBlogPending,
    finished: singleBlogFinished,
    error: singleBlogError,
    setData: setSingleBlog,
  } = UseFetchSinglePost(`http://192.168.43.3:8000/posts/${id}`);
  if (singleBlogError) {
    console.error(singleBlogError);
  } else if (singleBlogFinished) {
    console.log("blog loaded successfully");
  }

  function handleAddComment(e) {
    setAddPending(true);
    e.preventDefault();

    fetch(`http://192.168.43.3:8000/posts/${id}`)
      .then((response) => {
        if (response.ok) {
          console.log("response was succesfull");
          return response.json();
        }
      })
      .then(async (post) => {
        console.log(post);
        post.comments.push(newComment);

        try {
          const response = await fetch(`http://192.168.43.3:8000/posts/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ comments: post.comments }),
          });
          const updatedPost = await response.json();

          console.log("post updated", updatedPost);
          setSingleBlog(updatedPost);
          setNewComment({ name: "", comment: "" });
          setAddPending(false);
          setIsAddingComment(false);
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleDeleteComment(commentIndex) {
    setDeletePending(true);

    fetch(`http://192.168.43.3:8000/posts/${id}`)
      .then((response) => {
        if (response.ok) {
          console.log("delete Response was successful");
          return response.json();
        }
      })
      .then(async (post) => {
        console.log(post);

        // Remove the comment at the specified index
        post.comments.splice(commentIndex, 1);

        try {
          const response = await fetch(`http://192.168.43.3:8000/posts/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ comments: post.comments }),
          });
          const updatedPost = await response.json();

          console.log("Post updated", updatedPost);
          setSingleBlog(updatedPost);
          setDeletePending(false);
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handlePostDelete() {

    fetch(`http://192.168.43.3:7000/images/${id}`, {
      method: "DELETE",
    }).catch((err) => {
      alert("err")
    })


    fetch(`http://192.168.43.3:8000/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((deletedPost) => {
        console.log(deletedPost);
        alert(` post: ${singleBlog.title} deleted`);
        navigate("/blogs");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <main className="post-main">
      {singleBlogPending && `${singleBlogPending}`}
      {singleBlogError && `${singleBlogError}`}
      {singleBlogFinished && imgFinished && (
        <section
          className="hero"
          style={{
            backgroundImage: `url(${stringImg})`,
          }}
        >
          <div className="backdrop"></div>
          <div className="intro">
            <div className="Big-text blog-title">
              {singleBlogFinished && singleBlog.title}
            </div>
            <div className="description">
              <span className="date">
                {singleBlogFinished && singleBlog.date}
              </span>
              <span className="views">
                {singleBlogFinished && singleBlog.views} views
              </span>
            </div>

            <div className="author">
              <span className="author-name">
                by {singleBlogFinished && singleBlog.author}
              </span>
            </div>
          </div>
        </section>
      )}
      {imgError && `${imgError}`}
      {imgPending && `${imgPending}`}

      <section className="blog-content">
        <h1 className="blog-title">{singleBlogFinished && singleBlog.title}</h1>

        <div className="post-content">
          {singleBlogFinished &&
            singleBlog.content.map((paragraph) => (
              <p key={singleBlog.content.indexOf(paragraph)}>{paragraph}</p>
            ))}
        </div>

        <div className="comments">
          <h2>comments</h2>
          <div className="comments-container">
            {singleBlogFinished &&
              singleBlog.comments.map((comment) => (
                <div
                  className="unit-comment"
                  key={singleBlog.comments.indexOf(comment)}
                >
                  <div className="name">{comment.name} </div>
                  <div className="comment">{comment.comment}</div>
                  <div className="comment-edit">
                    <button
                      className="comment-btn"
                      onClick={() =>
                        handleDeleteComment(
                          singleBlog.comments.indexOf(comment)
                        )
                      }
                    >
                      {deletePending && "loading"}
                      {!deletePending && "delete"}
                    </button>
                  </div>
                </div>
              ))}
            {!isAddingComment && (
              <button
                className="comment-btn"
                onClick={() => setIsAddingComment(true)}
              >
                add comment
              </button>
            )}
            {isAddingComment && (
              <div>
                {/* add comment logic here */}
                <form className="comment-edit">
                  <input
                    type="text"
                    required
                    placeholder="input commenters name"
                    value={newComment.name}
                    onChange={(e) =>
                      setNewComment({ ...newComment, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    required
                    value={newComment.comment}
                    placeholder="input comment"
                    onChange={(e) =>
                      setNewComment({ ...newComment, comment: e.target.value })
                    }
                  />
                  <button
                    className="comment-btn"
                    type="reset"
                    onClick={() => {
                      setIsAddingComment(false);
                      setNewComment({ name: "", comment: "" });
                    }}
                  >
                    cancel
                  </button>

                  <button
                    className="comment-btn"
                    type="submit"
                    onClick={handleAddComment}
                  >
                    {addPending && "loading"}
                    {!addPending && "add"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="delete-post">
          <div>
            click here to{" "}
            <button className="post-delete-btn" onClick={handlePostDelete}>
              delete
            </button>{" "}
            post
          </div>
        </div>
      </section>

      <section className="related-posts">
        <h2>related-posts</h2>
        <div className="related-posts-container">
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}

          {finished &&
            randomisedPosts.map(
              (singlePost) =>
                //  i will later look for logic to avoid the relate posts from containing the posts that is been shown
                randomisedPosts.indexOf(singlePost) < 3 && (
                  <Post post={singlePost} key={singlePost.id} />
                )
            )}
        </div>
      </section>

      <section className="get-started" id="get-started">
        <div className="inner">
          <h2>You are one click away from premium fitness</h2>
          <div className="cta-input">
            <input type="text" />
            <button>get started</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;

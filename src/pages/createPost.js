import { useState } from "react";
import "../styles/create-post.css";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [addPending, setAddPending] = useState(false);
  const [addError, setAddError] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "",
    author: "",
    views: "",
    content: [],
    image: "",
  });

  const [stringImage, setStringImage] = useState("");

  // class PostTemplate {
  //   constructor (object) {

  const today = new Date();
  const navigate = useNavigate();

  //   }
  // }

  function handleSubmit(e) {
    setAddPending(true);
    e.preventDefault();

    fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: postDetails.title,
        image: "image here",
        author: postDetails.author,
        date: `${today.toDateString()}`,
        views: postDetails.views,
        keywords: [],
        content: postDetails.content,
        comments: [],
      }),
    })
      .then(() => {
        alert("new blog added");
        setAddPending(false);
        navigate("/blogs");
      })
      .catch((err) => {
        setAddError(err);
        setAddPending(false);
      });
  }

  function handleImage(e) {
    const file = e.target.files[0];
    setPostDetails({...postDetails, image: file})
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStringImage(reader.result);
        console.log(stringImage);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <main className="CreatePost-main">
      <section className="post-details">
        <h1>Create new post</h1>

        {/* <p>
          {" "}
          {postDetails.title} - {postDetails.author} - {postDetails.views} -{" "}
          {postDetails.content.map((paragraph) => (
            <p>{paragraph}</p>
          ))}
        </p> */}

        <form action="/">
          <label>title: </label>
          <input
            title="input title"
            required
            placeholder="title here"
            type="text"
            value={postDetails.title}
            onChange={(e) => {
              setPostDetails({ ...postDetails, title: e.target.value });
            }}
          />
          <label>Author: </label>
          <input
            title="input authors name"
            required
            placeholder="input author"
            type="text"
            value={postDetails.author}
            onChange={(e) => {
              setPostDetails({ ...postDetails, author: e.target.value });
            }}
          />
          <label>views: </label>
          <input
            title="input views count"
            required
            placeholder="views: for testing purposes"
            type="number"
            value={postDetails.views}
            onChange={(e) => {
              setPostDetails({ ...postDetails, views: e.target.value });
            }}
          />
          <label> image:</label>
          <input
            type="file"
            accept="image/*"
            value={postDetails.image}
            onChange={handleImage}
          />
          <label>content: </label>{" "}
          <textarea
            title="post content here"
            required
            placeholder="your briliant idea here ..........."
            name=""
            id=""
            value={postDetails.content.join("\n")}
            onChange={(e) => {
              setPostDetails({
                ...postDetails,
                content: e.target.value.split("\n"),
              });
            }}
          ></textarea>
          <button onClick={handleSubmit}>
            {addPending && "loading"}{" "}
            {addError && `${addError.message}, try again later`}{" "}
            {!addPending && !addError && "post"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreatePost;

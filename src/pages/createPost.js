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
    let id = `${Math.floor(Math.random() * 999)}${Math.floor(Math.random() * 99)}`;
if (stringImage !== "") {
  // console.log(id);
    setAddPending(true);
    e.preventDefault();

    fetch("https://coherent-succinct-zircon.glitch.me/api/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        title: postDetails.title,
        image: id,
        author: postDetails.author,
        date: `${today.toDateString()}`,
        views: postDetails.views,
        keywords: [],
        content: postDetails.content.filter((paragraph) => paragraph != ""),
        comments: [],
      }),
    })
      .then(() => {
        fetch("https://coherent-succinct-zircon.glitch.me/api/images", {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            id: id,
            imgString: stringImage,
          }),
        })
          .then(() => {
            alert("new blog added");
            setAddPending(false);
            navigate("/blogs");
          })
          .catch((error) =>
            console.log("image storage encountered ", error.message)
          );
      })
      .catch((err) => {
        setAddError(err);
        setAddPending(false);
      });

}else {
  alert("Error: input image")
}
    
  }

  function handleImage(e) {
    const file = e.target.files[0];
    setPostDetails({ ...postDetails, image: e.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStringImage(reader.result);
        // console.log(typeof reader.result);
        // console.log(stringImage);
        // console.log('done')
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
          <label> post cover:</label>
          <input
            type="file"
            required
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

import "../styles/home-styles.css";
import { Link } from "react-router-dom";
import GetStarted from "../components/getStarted";
import CtaContainer from "../components/cta-container";
import UseFetchPost from "../hooks/UseFetchPosts";
import Post from "../components/post";

const Home = () => {
  const { data, error, isPending, randomisedPosts, finished } = UseFetchPost(
    "http://192.168.43.3:8000/posts"
  );

  console.log(data, randomisedPosts, error, isPending, finished);

  return (
    <main className="home-main">
      <section className="hero">
        <div className="backdrop"></div>
        <div className="intro">
          <h2>how to take care of ourselves?</h2>
          <div className="Big-text">Answers To Fitness & Yoga Questions! </div>
          <CtaContainer />
        </div>
      </section>
      <section className="blogs">
        <h2>recent articles</h2>

        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}

        {finished && (
          <div className="blogs-inner">
            {randomisedPosts.map(
              (singlePost) =>
                randomisedPosts.indexOf(singlePost) < 3 && (
                  <Post post={singlePost} key={singlePost.id} />
                )
            )}
          </div>
        )}

        <div className="more-blogs">
          more posts? <Link to="/blogs">Click here!</Link>
        </div>
      </section>
      <GetStarted />
    </main>
  );
};

export default Home;

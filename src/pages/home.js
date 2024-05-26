import "../styles/home-styles.css";
import { Link } from "react-router-dom";
import GetStarted from "../components/getStarted";
import CtaContainer from "../components/cta-container";
import  UseFetchPost  from "../hooks/UseFetchPosts";

const Home = () => {
    const { data, isPending, error} = UseFetchPost('http://localhost:7000/posts');

    console.log(data, isPending, error)


  return (
    <main>
      <section className="hero">
        <div className="backdrop"></div>
        <div className="intro">
          <h2>how to take care of our selves?</h2>
          <div className="Big-text">Answers To Fitness & Yoga Questions! </div>
          <CtaContainer/>
        </div>
      </section>
      <section className="blogs">
        <h2>recent articles</h2>
        <div className="blogs-inner">
            {/* 3 blogs go here */}
            
        </div>
        <div className="more-blogs">
            more posts? <Link to='/blogs'>Click here!</Link>
        </div>
      </section>
      <GetStarted/>

    </main>
  );
};

export default Home;

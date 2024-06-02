import '../styles/blogs.css'
import UseFetchPost from '../hooks/UseFetchPosts';
import Post from '../components/post';


const Blogs = () => {

    const { data, error, isPending, randomisedPosts, finished } = UseFetchPost(
        "http://localhost:8000/posts"
      );

    return ( 
        <main className='blogs-main'>
        <section className="hero">
          <div className="backdrop"></div>
          <div className="intro">
            <div className="Big-text">welcome to my blog</div>
            <h2>Sign Up for My Monthly Newsletters.</h2> 
            <div className="hero-newsletter">
              <input type="text" placeholder="enter email address" />
              <button>subscribe now</button>
            </div>
          </div>
        </section>
  
        <section className="blogs">
          <h2>Blogs</h2>
          {error && <p>{error}</p> }
          {isPending && <p>loading.....</p> }
          {finished &&   <div className="blogs-container">
            {randomisedPosts.map((singlePost) => (
            <Post post={singlePost} key={singlePost.id}/>

          ))}
          </div>  }
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
}
 
export default Blogs;
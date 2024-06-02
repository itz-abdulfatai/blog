import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import Blogs from "./pages/blogs";
import Blog from "./pages/blog";
import Error404 from "./pages/error404";
import "./styles/shared-styles.css";
import Footer from "./components/footer";
import CreatePost from "./pages/createPost";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          {/* i nameed this path post instead of blog if this causes a problem change back */}
          <Route path="/post/:id" element={<Blog />} />
          <Route  path="/create" element={<CreatePost/>}/>
          <Route path="*" element={<Error404 />} />
          
        </Routes>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;

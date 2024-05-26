import { Link, useNavigate } from "react-router-dom";
import logo from "../images/home-images/logo.png";
import "../styles/header.css";

const Header = () => {
    const navigate = useNavigate();
  const navigateById = (event) => {
    event.preventDefault();
    const getStartedElement = document.querySelector("#get-started");
    if (getStartedElement) {
        getStartedElement.scrollIntoView({behavior:'smooth'})

    } else {
        navigate('*')
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="" className="logo" />
      </Link>

      <nav>
        <Link to="#get-started" onClick={navigateById}>get started</Link>
        <Link to="/blogs">Blog</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
};

export default Header;

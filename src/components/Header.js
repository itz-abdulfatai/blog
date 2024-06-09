import { Link, useNavigate } from "react-router-dom";
import logo from "../images/home-images/logo.png";
import "../styles/header.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {setExpanded(false)}, [location])

  window.addEventListener("scroll", () => {
    setExpanded(false);
  });

  // document.body.addEventListener("click", (e) => {
  //   if (e.target !== nav && expanded) {
  //     setExpanded(false)

  //   }
  // });

  function handleMenuBar(e) {
    !expanded && setExpanded(true);
    expanded && setExpanded(false);
  }

  const navigate = useNavigate();
  const navigateById = (event) => {
    event.preventDefault();
    const getStartedElement = document.querySelector("#get-started");
    if (getStartedElement) {
      getStartedElement.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("*");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="" className="logo" />
      </Link>

      <nav className={expanded ? "nav-expanded" : undefined}>
        <Link to="#get-started" onClick={navigateById}>
          get started
        </Link>
        <Link to="/blogs">Blog</Link>
        <Link to="/create">create</Link>
      </nav>
      <div className="menu-btn" onClick={handleMenuBar}>
        menu
      </div>
    </div>
  );
};

export default Header;

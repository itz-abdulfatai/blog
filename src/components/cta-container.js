import { useNavigate } from "react-router-dom";

const CtaContainer = () => {
  let navigate = useNavigate();

    return ( 
        <div className="cta-container">
            <button>Let's get started</button>
            <button onClick={() => navigate("/blogs")}>visit blogs</button>
          </div>
     );
}
 
export default CtaContainer;
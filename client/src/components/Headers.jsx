import { Link } from "react-router-dom";
import "./css/Headers.css";

export default function Headers() {
  return (
    <>
      <div className="main-header flex justify-between items-center h-[60px]  ">
        <div>
          <img src="/logo.webp" alt="company-logo " className="logo" />
        </div>

        <div className="z-[1] flex gap-7 justify-center items-center">
          <Link to={"/"}>Home</Link>
          <Link to={"/apartments"}>Apartments</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/login"}>
            <button className="login-button ">Get Started</button>
          </Link>
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./css/Headers.css";

export default function Headers() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Header */}
      <div className="main-header flex justify-between items-center h-[60px] z-200">
        <div>
          <img src="/logo.webp" alt="company-logo" className="logo" />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="menu-icon md:hidden">
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Desktop Menu (Always Visible) */}
        <div className="desktop z-[1] flex gap-7 justify-center items-center text-[#383838] hidden md:flex">
          <Link to={"/"}>Home</Link>
          <Link to={"/apartments"}>Apartments</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/login"}>
            <button className="login-button">Get Started</button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu (Toggled by isOpen) */}
      <div
        className={`mobile z-[1] relative flex flex-col gap-2 items-center text-[#383838] transition-all duration-300 ${
          isOpen ? "open h-[200px]" : "h-0 overflow-hidden"
        }`}
      >
        <Link to={"/"} onClick={toggleMenu}>
          Home
        </Link>
        <Link to={"/apartments"} onClick={toggleMenu}>
          Apartments
        </Link>
        <Link to={"/contact"} onClick={toggleMenu}>
          Contact
        </Link>
        <Link to={"/login"} onClick={toggleMenu}>
          <button className="login-button">Get Started</button>
        </Link>
      </div>
    </>
  );
}

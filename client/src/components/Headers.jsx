import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
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
      <div className="main-header flex justify-between items-center h-[60px] z-[50] shadow-md bg-white fixed top-0 left-0 w-full px-4">
        <div>
          <img src="/logo.webp" alt="company-logo" className="logo" />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="menu-icon md:hidden">
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </button>

        {/* Desktop Menu (Always Visible) */}
        <div className="desktop z-[45] flex gap-7 justify-center items-center text-[#383838] hidden md:flex">
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
        className={`mobile relative top-[60px] left-0 w-full bg-white z-[40] flex flex-col gap-2 items-center text-[#383838] transition-all duration-300 ${
          isOpen ? "h-[200px] opacity-100" : "h-0 overflow-hidden"
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

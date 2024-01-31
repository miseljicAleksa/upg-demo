import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handler(e) {
      if (sidebarRef.current) {
        if (
          !e.target.classList.contains("sidebar") &&
          !e.target.classList.contains("sidebar-toggle")
        ) {
          setIsCollapsed(false);
        }
      }
    }

    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });
  console.log(location.pathname, "location.pathname");
  return (
    <>
      <nav>
        <button class="sidebar-toggle" onClick={() => setIsCollapsed(true)}>
          <div class="hamburger-line line1"></div>
          <div class="hamburger-line line2"></div>
          <div class="hamburger-line line3"></div>
        </button>
      </nav>
      <aside
        ref={sidebarRef}
        className={`sidebar ${isCollapsed ? "visible" : ""}`}
      >
        <div className="sidebarItems">
          <Link to="/home">
            <p className={`${location.pathname === "/home" ? "active" : ""}`}>
              home
            </p>
          </Link>
          <Link to="/about">
            {" "}
            <p className={`${location.pathname === "/about" ? "active" : ""}`}>
              about
            </p>
          </Link>
          <Link to="/todos">
            {" "}
            <p className={`${location.pathname === "/todos" ? "active" : ""}`}>
              todos
            </p>
          </Link>
        </div>
        <div className="sidebarItems">
          <div onClick={onLogout}>
            <Link to="/login">{user ? "Sign Out" : "Sign In"}</Link>
          </div>
          <p style={{ userSelect: "none" }}>{user ? user : ""}</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

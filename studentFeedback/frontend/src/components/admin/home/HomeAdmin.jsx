import "./HomeAdmin.css";
import Sidebar from "../nav/Sidebar";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userActions";
import { useEffect } from "react";
import { getForms } from "../../../actions/formActions";

export default function HomeAdmin({ user, setCurrentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getForms(user._id));
  }, [dispatch, user._id]);

  const logoutHandler = () => {
    dispatch(logout());
    setCurrentUser((t) => !t);
    navigate("/", { replace: false });
    // setUser(false);
  };

  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <div className="homeAdmin adminFlex">
      <Sidebar setCurrentUser={setCurrentUser} />
      <div
        className="usernameDisplay"
        style={{ position: "fixed", right: "20px", top: "20px" }}
      >
        Welcome {user.name}
      </div>
      <div className="navMobile">
        <div
          className={`navMobileMenuIcon ${menuOpen ? "white" : "normal"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div></div>
          <div className="mdl"></div>
          <div></div>
        </div>
        <nav className={menuOpen ? "active" : "hide"}>
          <ul>
            <li>
              <NavLink to="">Home</NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to="student"
              >
                students
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to="forms"
              >
                forms
              </NavLink>
            </li>
            <li>
              <span style={{ cursor: "pointer" }} onClick={logoutHandler}>
                logout
              </span>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

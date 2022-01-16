import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userActions";

export default function Sidebar({ setCurrentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());

    setCurrentUser((t) => !t);
    navigate("/", { replace: false });
  };

  let activeStyle = {
    textDecoration: "underline",
  };
  return (
    <div className="sidebar">
      <nav>
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
  );
}

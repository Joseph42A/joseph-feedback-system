import "./Main.css";
import mainImg from "../../../assets/mainImg.svg";
import { Link } from "react-router-dom";
export default function Main() {
  const forms = [];
  return (
    <div>
      {forms.length === 0 ? (
        <div className="mainContainer">
          <div className="mainTop">
            <h3>
              EVERYTHING HERE WILL START AFTER YOU CREATED YOUR FIRST FORM, SO
              WHAT ARE YOU WAITION FOR !? LETS GO AHEAD AND CREATE YOU FORM{" "}
            </h3>
            <Link to="createForm">
              <button>Create Form</button>
            </Link>
          </div>
          <div className="mainBtn">
            <img src={mainImg} alt="" />
          </div>
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "2rem",
            fontWeight: "700",
            padding: "1rem",
          }}
        >
          Joseph sudent feedback system{" "}
        </p>
      )}
    </div>
  );
}

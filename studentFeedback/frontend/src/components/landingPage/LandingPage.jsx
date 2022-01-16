import { Link } from "react-router-dom";

import "./LandingPage.css";

import logo from "../../assets/logo.svg";
import topImg from "../../assets/topImg.svg";
import middleImg from "../../assets/middleImg.svg";
import featureFirstImg from "../../assets/featureFirstImg.svg";
import featureSecondImg from "../../assets/featureSecondImg.svg";
import featureThirdImg from "../../assets/featureThirdImg.svg";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="topLanding">
        <nav>
          <img src={logo} alt="" />
          <h6>
            <Link to="auth">Login</Link>
          </h6>
        </nav>

        <div className="topLandingFlex">
          <div className="flexLeft">
            <h1>HELLO, WELCOME TO JOSEPH FEEDBACK ONLINE EDUCATION WEBSITE</h1>

            <button>
              <Link
                to="auth"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                GET STARTED
              </Link>
            </button>
          </div>
          <div className="flexRight">
            <img src={topImg} alt="" />
          </div>
        </div>
      </div>

      <div className="middleLanding">
        <div className="middleLandingFlex">
          <div className="middleLandingLeft">
            <img src={middleImg} alt="middle-img" />
          </div>
          <div className="middleLandingRight">
            <div className="middleInfo">
              <h2>CONFIGURE ALL OF YOUR WORK HERE</h2>
              <p>
                MANAGE INDIVIDUAL FORMS AND COLLABORATE WITH THOS YOU WANT TO
                PARTICIPATE
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="endLanding">
        <h1>FEATURES</h1>
        <div className="endLandingFlex">
          <div className="endLandingFlexFirst">
            <div className="endLandingInfo">
              <img src={featureFirstImg} alt="" />
              <h5>EASEY TO USE</h5>
            </div>
          </div>
          <div className="endLandingFlexSecond">
            <div className="endLandingInfo">
              <img src={featureSecondImg} alt="" />
              <h5>SHARE WITH ONE CLICK</h5>
            </div>
          </div>
          <div className="endLandingFlexThird">
            <div className="endLandingInfo">
              <img src={featureThirdImg} alt="" />
              <h5>GET DETAILS OF YOUR FORMS</h5>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>
          DESIGNED & DEVELOPED BY{" "}
          <span>
            <a href="https://joseph4lu2cy.netlify.com">JOSEPH</a>
          </span>
        </p>
      </footer>
    </div>
  );
}

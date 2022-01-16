import "./Feedback.css";
// import { useLocation } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useLocation } from "react-router";
import * as api from "../../api/apiEndpoints";
import { useEffect } from "react";
import axios from "axios";

export default function Feedback() {
  const location = useLocation();
  const formId = location.pathname.split("/")[2];
  const [feedbackData, setFeedbackData] = useState();
  const [formDataIsLoading, setForDataIsLoading] = useState(true);

  useEffect(() => {
    const fetchSingleForm = async () => {
      setForDataIsLoading(true);
      const { data } = await axios.get(api.url + "/singleForm/" + formId);
      // console.log(data.data.form);
      setFeedbackData(data.data.form);
      setForDataIsLoading(false);
    };
    fetchSingleForm();
  }, [formId]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  let [currentTeacher, setCurrentTeacher] = useState(0);
  const [retingAnswers, setRatingAnswers] = useState({});
  const [feedbackInfo, setFeedbackInfo] = useState(null);
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState({});
  const userRole = "user"; // this is take from the role of that amdin id

  console.log(feedbackData);

  const [teachers, setTeacherRatings] = useState(
    feedbackData && feedbackData.teachers
  );
  console.log(teachers);

  const questions = [
    {
      id: uuidv4(),
      question: "Is the teacher do he is work very well",
    },
    {
      id: uuidv4(),
      question: "Do you love the teacher is he fine",
    },
  ];
  let btnTextValue = "";
  if (feedbackData?.teachers) {
    btnTextValue =
      currentTeacher === Object.keys(feedbackData.teachers).length - 1
        ? "SUBMIT"
        : " Next";
  }

  const addTeacherData = () => {
    if (feedbackData.teachers) {
      if (Object.keys(retingAnswers).length === Object.keys(questions).length) {
        let realIndex = currentTeacher === 0 ? 0 : currentTeacher;
        setTeacherRatings((t) => {
          t[realIndex].rating = retingAnswers;
          return { ...t };
        });
      }
    }
  };
  const handleNextBtnClick = () => {
    if (feedbackData.teachers) {
      if (userRole === "admin") {
        setCurrentTeacher(++currentTeacher);
      }
      if (
        currentTeacher <= Object.keys(feedbackData.teachers).length - 1 &&
        Object.keys(retingAnswers).length ===
          Object.keys(feedbackData.questions).length
      ) {
        setRatingAnswers({});
        const cheker = document.querySelectorAll(".checkRadio");
        for (let i = 0; i < cheker.length; i++) cheker[i].checked = false;
        setFeedbackInfo(null);

        addTeacherData();

        if (currentTeacher !== Object.keys(feedbackData.teachers).length - 1) {
          // submit data here

          setCurrentTeacher(++currentTeacher);
        }
      } else {
        setFeedbackInfo({
          type: "Blank feel error",
          message: "Please rate for all the questions",
        });
      }

      if (btnTextValue === "SUBMIT") {
        const cheker = document.querySelectorAll(".checkRadio");
        for (let i = 0; i < cheker.length; i++) cheker[i].checked = false;

        // SUBMIT FOR THE LAST TIME
        addTeacherData();

        setFormSubmitted(true);
        setFeedbackInfo({
          type: "success",
          message: "form submitted succefuly",
        });

        console.log("datas : ", feedbackData.teachers);
      }
    }
  };
  const handleUserLoggedIn = (e) => {
    e.preventDefault();

    if (feedbackData.teachers) {
      // get the datas
      if (
        userData.username.length === 0 ||
        !userData.email.includes("@") ||
        !userData.email.includes(".") ||
        userData.password.length === 0
      ) {
        console.log("please fill of all fields correctly!");
      }

      console.log("user logged in : ", userData);
      setUser(userData);
    }
  };

  console.log("fomrloading :", formDataIsLoading, " feedbackData.teachers : ");

  if (!formDataIsLoading) {
    console.log(feedbackData.teachers);
  }
  return !formDataIsLoading ? (
    <div className="feedback">
      <div className="feedbackDesc">
        <h3>{feedbackData.formName}</h3>
        <p>{feedbackData.formDesc}</p>
      </div>

      {userRole === "admin" && (
        <div>
          <div style={{ textAlign: "center" }}>
            <h3>This is preview page</h3>
            <p>All the functionality has been blocked</p>
          </div>

          <div className="questionShowCase">
            <h2>{feedbackData.teachers[currentTeacher]?.teacher}</h2>
            <div className="feedBackQuestions">
              {questions.map((q, indexQuestion) => {
                return (
                  <div key={q.question}>
                    <p>Q {indexQuestion + 1} /</p>
                    <p className="ques">{q.question}</p>

                    <div className="rating">
                      {ratings.map((r) => {
                        return (
                          <span key={r}>
                            <label htmlFor="">{r}</label> <br />
                            <input
                              type="radio"
                              name={q.question}
                              className="checkRadio"
                              // checked={}
                              onChange={(e) =>
                                setRatingAnswers((rating) => {
                                  retingAnswers[indexQuestion] = {};
                                  retingAnswers[indexQuestion] = r;

                                  return { ...retingAnswers };
                                })
                              }
                            />
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="feedbackBtnContainer">
                <button
                  type="button"
                  className="feedbackNextBtn"
                  onClick={handleNextBtnClick}
                >
                  {btnTextValue}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!user && userRole !== "admin" && (
        <div>
          <div className="feedbackAuth">
            <div style={{ fontWeight: "700", textAlign: "center" }}>
              PLEASE LOGIN TO GRANT ACCESS
            </div>
            <form onSubmit={handleUserLoggedIn}>
              <div className="form-control">
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  required
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  required
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  required
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="btnUserLoggedIn">
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {formSubmitted && (
        <div
          style={{
            fontWeight: "700",
            color: "green",
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          Form subitted succefuly
        </div>
      )}

      {user && !formSubmitted && userRole !== "admin" && (
        <div>
          {feedbackInfo && (
            <div
              style={{
                textAlign: "center",
                color: `${feedbackInfo.type === "success" ? "green" : "red"}`,
              }}
            >
              <p>{feedbackInfo.type}!</p>
              <p>{feedbackInfo.message}</p>
            </div>
          )}
          <div className="questionShowCase">
            <h2>
              {" "}
              {feedbackData.teachers[currentTeacher].teacherName}{" "}
              <span style={{ fontSize: "14px" }}>
                {feedbackData.teachers[currentTeacher].teacherSubject}
              </span>
            </h2>
            <div className="feedBackQuestions">
              {feedbackData.questions.map((q, indexQuestion) => {
                return (
                  <div key={indexQuestion}>
                    <p>Q {indexQuestion + 1} /</p>
                    <p className="ques">{q}</p>

                    <div className="rating">
                      {ratings.map((r) => {
                        return (
                          <span key={r}>
                            <label htmlFor="">{r}</label> <br />
                            <input
                              type="radio"
                              name={q}
                              className="checkRadio"
                              // checked={}
                              onChange={(e) =>
                                setRatingAnswers((rating) => {
                                  retingAnswers[indexQuestion] = {};
                                  retingAnswers[indexQuestion] = r;

                                  return { ...retingAnswers };
                                })
                              }
                            />
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="feedbackBtnContainer">
                <button
                  type="button"
                  className="feedbackNextBtn"
                  onClick={handleNextBtnClick}
                >
                  {btnTextValue}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div style={{ textAlign: "center", marginTop: "50%" }}>
      <h1>Loading feedback</h1>
    </div>
  );
}

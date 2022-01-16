import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createForm } from "../../../actions/formActions";
// import { useSelector } from "react-redux";

import "./Forms.css";

export default function Forms({ user }) {
  // const forms = [];

  let [steps, setSteps] = useState(1);
  const [teacherData, setTeacherData] = useState({
    teacherName: "",
    teacherSubject: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [teacherError, setTeacherError] = useState(false);
  const [teacherNextError, setTeaherNextError] = useState(false);
  const [questionData, setQuestionData] = useState("");
  const [questionError, setQuestionError] = useState(false);
  const [questionDoneError, setQuestionDoneError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [formsData, setFormsData] = useState({
    formName: "",
    formDesc: "",
    universityName: "",
    formUserId: user ? user._id : JSON.parse(localStorage.getItem("user"))._id,
    collegeName: "",
    departmentName: "",
    branchName: "",
    teachers: [
      {
        teacherName: "",
        teacherSubject: "",
      },
    ],
    questions: [],
  });
  const [formDataError, setFormDataError] = useState(false);
  const [formIsCreating, setFormIsCreating] = useState(false);
  const [currentFormId, setCurrentFormId] = useState(undefined);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(questions.length === 0)) {
      // dispatch create form action here
      setQuestions([]);
      dispatch(
        createForm(formsData, setSteps, setFormIsCreating, setCurrentFormId)
      );
      setFormsData({});
    }

    // go to preive page
    // setSteps(++steps);
  };
  return (
    <div className="forms">
      {formIsCreating ? (
        <div>Form creating...</div>
      ) : (
        <div className="formContainer">
          <div className="createFormContainer">
            <h1>CREATE A FORM</h1>

            <div className="studentForm">
              <form onSubmit={handleSubmit}>
                {steps === 1 && (
                  <div>
                    <div className="form-control">
                      <label htmlFor="name">
                        name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFormsData({
                            ...formsData,
                            formName: e.target.value,
                          })
                        }
                        value={formsData.formName}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="description">
                        description <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFormsData({
                            ...formsData,
                            formDesc: e.target.value,
                          })
                        }
                        value={formsData.formDesc}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="university name">
                        university name <span className="opt">(optional)</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFormsData({
                            ...formsData,
                            universityName: e.target.value,
                          })
                        }
                        value={formsData.universityName}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="college name">
                        college name <span className="opt">(optional)</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFormsData({
                            ...formsData,
                            collegeName: e.target.value,
                          })
                        }
                        value={formsData.collegeName}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="department name">
                        department name <span className="opt">(optional)</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFormsData({
                            ...formsData,
                            departmentName: e.target.value,
                          })
                        }
                        value={formsData.departmentName}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="branch name">
                        branch name <span className="opt">(optional)</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFormsData({
                            ...formsData,
                            branchName: e.target.value,
                          })
                        }
                        value={formsData.branchName}
                      />
                    </div>

                    {formDataError && (
                      <div
                        className="error"
                        style={{ textAlign: "center", padding: "1rem 0" }}
                      >
                        <p>Please fill in all the required fields</p>
                      </div>
                    )}
                    <div className="formBtnContainer">
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            formsData.formName.trim().length === 0 ||
                            formsData.formDesc.trim().length === 0
                          ) {
                            setFormDataError(true);
                          } else {
                            setFormDataError(false);

                            setSteps(++steps);
                          }
                        }}
                        className="studentFormBtn"
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                )}

                {steps === 2 && (
                  <div className="teacher">
                    <h2>Add Teacher</h2>

                    <div className="formTeacher">
                      <div className="form-control">
                        <label htmlFor="name">Teacher name </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setTeacherData({
                              ...teacherData,
                              teacherName: e.target.value,
                            })
                          }
                          value={teacherData.teacherName}
                        />
                      </div>
                      <div className="form-control">
                        <label htmlFor="name">Teacher's subject </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setTeacherData({
                              ...teacherData,
                              teacherSubject: e.target.value,
                            })
                          }
                          value={teacherData.teacherSubject}
                        />
                      </div>
                      {teacherError && (
                        <div style={{ color: "red", margin: "1rem 0" }}>
                          Please fill all the fields
                        </div>
                      )}
                      <button
                        type="button"
                        className="btnTeacher"
                        onClick={() => {
                          if (
                            teacherData.teacherName.trim().length === 0 ||
                            teacherData.teacherSubject.trim().length === 0
                          ) {
                            console.log("please fill the fileds");
                            // set error message for teacher
                            setTeacherError(true);
                          } else {
                            setTeachers([...teachers, teacherData]);
                            setTeacherError(false);
                            setTeacherData({
                              teacherName: "",
                              teacherSubject: "",
                            });
                            setTeaherNextError(false);
                          }
                        }}
                      >
                        Add Teacher
                      </button>
                    </div>
                    <div className="addedTeachers">
                      <h2>Your Teachers</h2>

                      <div className="subjectTeacher">
                        <span>techer</span>
                        <span>Subject</span>
                      </div>

                      <div className="contentTeacher">
                        {teachers.map((teacher, index) => {
                          return (
                            <div className="teacherList" key={index}>
                              <span>
                                <span className="lecturer">
                                  {teacher.teacherName}
                                </span>
                              </span>
                              <span>
                                <span className="lecture">
                                  {teacher.teacherSubject}
                                </span>
                              </span>
                              <span>
                                <span
                                  className="lecture delete"
                                  onClick={() => {
                                    setTeachers((t) => {
                                      const tech = t.filter(
                                        (_, indexer) => indexer !== index
                                      );
                                      return tech;
                                    });
                                  }}
                                >
                                  delete
                                </span>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {teacherNextError && (
                      <div style={{ color: "red", margin: "1rem 0" }}>
                        Please add teacher
                      </div>
                    )}
                    <div
                      className="btnNext"
                      onClick={() => {
                        if (teachers.length === 0) {
                          setTeaherNextError(true);
                          console.log("please add teacher");
                        } else {
                          setFormsData({ ...formsData, teachers: teachers });
                          setTeaherNextError(false);
                          setTeachers([]);
                          setSteps(++steps);
                        }
                      }}
                    >
                      Next
                    </div>
                  </div>
                )}

                {steps === 3 && (
                  <div className="question">
                    <div className="quesiontTop">
                      <h2>Add Question</h2>
                      <div className="form-control">
                        <textarea
                          name="question"
                          id=""
                          cols="30"
                          rows="6"
                          value={questionData}
                          onChange={(e) => setQuestionData(e.target.value)}
                        ></textarea>
                      </div>
                      {questionError && (
                        <div style={{ color: "red", margin: "1rem 0" }}>
                          please write question
                        </div>
                      )}
                      <button
                        type="button"
                        className="btnTeacher"
                        onClick={() => {
                          if (questionData.trim().length === 0) {
                            //
                            setQuestionError(true);
                          } else {
                            setQuestionData("");
                            setQuestions([...questions, questionData]);

                            setQuestionError(false);
                            setQuestionDoneError(false);
                          }
                        }}
                      >
                        Add Qestion
                      </button>
                    </div>
                    <div className="questionBtm">
                      <h3>Your questions</h3>
                      {questions.map((q, index) => {
                        return (
                          <div className="questinList" key={index}>
                            <h5>{q}</h5>
                            <span
                              onClick={() => {
                                setQuestions((q) => {
                                  const ques = q.filter(
                                    (_, indexer) => indexer !== index
                                  );
                                  return ques;
                                });
                              }}
                            >
                              delete
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {questionDoneError && (
                      <div style={{ color: "red", margin: "1rem 0" }}>
                        Please add qustion
                      </div>
                    )}
                    <button
                      className="btnNext"
                      type="submit"
                      // disabled={questions.length === 0 ? true : false}
                      onClick={() => {
                        if (questions.length === 0) {
                          // console.log("please add questions");
                          setQuestionDoneError(true);
                          return;
                        } else {
                          setFormsData({ ...formsData, questions: questions });
                        }
                      }}
                    >
                      Done
                    </button>
                  </div>
                )}
              </form>
              {steps === 4 && (
                <div className="question">
                  <h2 style={{ padding: "1rem 0" }}>
                    Form created succefully{" "}
                  </h2>
                  {currentFormId && (
                    <div>
                      <br />
                      <Link
                        to={`/feedbackForm/${currentFormId}`}
                        target="_blank"
                      >
                        <div
                          className="btnNext"
                          // onClick={() => (document.title = "submition")}
                        >
                          preview
                        </div>
                      </Link>
                      <br />
                      <br />
                      <br />
                      <div
                        className="btnNext"
                        onClick={() => {
                          navigator.clipboard
                            .writeText(
                              `${
                                window.location.protocol +
                                "//" +
                                window.location.host
                              }/feedbackForm/${currentFormId}`
                            )
                            .then(function () {
                              alert("Copying to clipboard was successful!");
                            });
                        }}
                      >
                        copy Link
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

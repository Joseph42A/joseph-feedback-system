import "./Student.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Students() {
  const students = [
    {
      id: "n5",
      student: "ahmad",
      password: "fdu48hg@#",
      email: "email@gsa.com",
      stage: "1st",
    },
    {
      id: "n4",
      student: "ahmad",
      password: "fdu48hg@#",
      email: "email@gsa.com",
      stage: "1st",
    },
    {
      id: "n3",
      student: "ahmad",
      password: "fdu48hg@#",
      email: "email@gsa.com",
      stage: "1st",
    },
    {
      id: "n2",
      student: "ahmad",
      password: "fdu48hg@#",
      email: "email@gsa.com",
      stage: "1st",
    },
    {
      id: "n1",
      student: "ahmad",
      password: "fdu48hg@#",
      email: "email@gsa.com",
      stage: "1st",
    },
  ];

  const [sendMails, setSendMail] = useState([]);

  console.log(sendMails);

  const handleSubmitStudent = (e) => {
    e.preventDefault();

    if (sendMails.length !== 0) {
      console.log(
        "Message will be send in 24h to all of the students : ",
        sendMails
      );

      // clear the filds
      const checker = document.querySelectorAll(".checkbox");
      for (let i = 0; i < checker.length; i++) {
        checker[i].checked = false;
      }
    } else {
      console.log("please mark at least 5 student");
    }
  };

  return (
    <div className="students">
      <div className="studentTop">
        <h1>Students</h1>
        <p>please add you student here</p>
        <Link to="/dashboard/createStudent">
          <button type="button">add new student</button>
        </Link>
      </div>

      <div className="studentBottom">
        <div className="inputSetter">
          <h2>STUDENTS (23)</h2>
          <form onSubmit={handleSubmitStudent}>
            <input type="text" placeholder="Paste form link here..." />
            <button type="submit">send</button>
          </form>
        </div>
        <p style={{ padding: "10px 0", fontSize: "10px", color: "black" }}>
          <span style={{ textTransform: "uppercase", fontWeight: "600" }}>
            Note /
          </span>{" "}
          Check the marks if u want to allow a student to the link to feedback
        </p>

        <div className="studentBottomContainer">
          <div className="availableSt">
            {students.map((s) => {
              return (
                <div className="stList" key={s.id}>
                  <span className="stName">{s.student}</span>
                  <span className="stEmail">{s.email}</span>
                  <span className="stPassword">{s.password}</span>
                  <span className="stage">{s.stage}</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => {
                      let checked = e.target.checked;
                      if (checked) {
                        setSendMail([...sendMails, s]);
                      } else {
                        setSendMail((mails) =>
                          mails.filter((ms) => ms.id !== s.id)
                        );
                      }
                    }}
                  />
                  <span className="dlt stdlt">delete</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

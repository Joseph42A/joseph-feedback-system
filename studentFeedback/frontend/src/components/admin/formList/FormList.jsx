import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Forms from "../forms/Forms";
import moment from "moment";
import { useDispatch } from "react-redux";

import "./FormList.css";
import { deleteForm } from "../../../actions/formActions";

export default function FormList() {
  const forms = useSelector((s) => s.form);
  const dispatch = useDispatch();

  const deleteFormHandler = (formId) => {
    let resultConfirm = window.confirm(
      "Are you sure you want to delete this form ?"
    );
    if (resultConfirm) {
      // dispatch delete form action
      dispatch(deleteForm(formId));
    }
  };
  return (
    <div className="formList">
      {forms && forms.length === 0 ? (
        <Forms />
      ) : (
        <div className="formListContainer">
          <div className="formListTop">
            <h1>FORMS</h1>
            <p>
              See all of your forms and figuer out the forms you created for you
              industry
            </p>

            <Link to="/dashboard/createForm" className="frmBtn">
              <button>CREATE FORM</button>
            </Link>
          </div>
          <div className="formListBtn">
            <div className="formTableHead">
              <span>FORM NAME</span>
              <span style={{ width: "100px" }}>CREATED</span>
              <span style={{ width: "120px" }}>SUBMITIONS</span>
              <span>DETAILS</span>
              <span>DELETE</span>
              <span>PREVIEW</span>
            </div>

            {forms.map((form) => {
              // let newDate = new Date(form.createdAt);
              // const options = {
              //   year: "numeric",
              //   month: "short",
              //   day: "numeric",
              //   hour: "2-digit",
              //   minute: "2-digit",
              // };
              // newDate = newDate.toLocaleDateString("en-US", options);

              let countSubmitions = 0;
              for (let i in form.students) {
                if (form.students[i].isSubmited === true) countSubmitions++;
              }

              return (
                <div className="formTableHead dataForm" key={form._id}>
                  <span>{form.formName}</span>
                  {/* <span style={{ width: "100px" }}>{newDate}</span> */}
                  <span style={{ width: "100px" }}>
                    {moment(form.createdAt).fromNow()}
                  </span>
                  <span style={{ width: "120px" }}>{countSubmitions} subs</span>
                  <span className="dlt">DETAILS</span>
                  <span
                    className="dlt"
                    onClick={deleteFormHandler.bind(null, form._id)}
                  >
                    DELETE
                  </span>
                  <span className="dlt">PREVIEW</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

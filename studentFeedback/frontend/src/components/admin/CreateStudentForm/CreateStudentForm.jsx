import "./CreateStudentForm.css";

export default function CreateStudentForm() {
  return (
    <div className="CreateStudentForm">
      <div className="createStudentFormContainer">
        <h2
          style={{
            borderBottom: "1px solid black",
            paddingBottom: "4px",
            textTransform: "uppercase",
          }}
        >
          Create a student
        </h2>

        <form>
          <div className="form-control">
            <label htmlFor="studentName">student Name</label>
            <input type="text" required />
          </div>

          <div className="form-control">
            <label htmlFor="studentEmail">
              student Email{" "}
              <span className="opt">
                (Please ensure that email should be the real student email
                address, otherwise he/she wouldn't get any email)
              </span>{" "}
            </label>
            <input type="email" required />
          </div>

          <div className="form-control">
            <label htmlFor="password" required>
              student password
            </label>
            <input type="text" />
          </div>

          <div className="form-control">
            <label htmlFor="stage" required>
              Stage <span className="opt">(1-6)</span>
            </label>
            <input type="number" min={1} max={6} />
          </div>

          <button type="submit">CREATE STUDENT</button>
        </form>
      </div>
    </div>
  );
}

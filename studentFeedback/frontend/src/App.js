import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import "./App.css";
import Auth from "./components/auth/Auth";
import HomeAdmin from "./components/admin/home/HomeAdmin";
import Forms from "./components/admin/forms/Forms";
import Students from "./components/admin/student/Students";
import { useEffect, useState } from "react";
import Main from "./components/admin/main/Main";
import FormList from "./components/admin/formList/FormList";
import Feedback from "./components/feedbackForm/Feedback";
import CreateStudentForm from "./components/admin/CreateStudentForm/CreateStudentForm";
import { useDispatch } from "react-redux";
import Loader from "./components/loader/Loader";
import { Navigate } from "react-router-dom";
function App() {
  const [fetchUser, setFetchUser] = useState(false);

  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  let [currentUser, setCurrentUser] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
  }, [dispatch, currentUser]);

  console.log(user);

  if (fetchUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "50%" }}>
        <Loader />
      </div>
    );
  }
  return (
    <div className="App">
      <Routes>
        {!user && <Route path="/" element={<Home />} />}
        {!user && (
          <Route path="auth" element={<Auth setFetchUser={setFetchUser} />} />
        )}

        {user && (
          <Route
            path="/dashboard"
            element={<HomeAdmin user={user} setCurrentUser={setCurrentUser} />}
          >
            <Route
              path=""
              element={
                <div className="homeContainer">
                  <Main />
                </div>
              }
            />
            <Route path="student" element={<Students />} />
            <Route path="createStudent" element={<CreateStudentForm />} />
            <Route path="forms" element={<FormList />} />
            <Route path="createForm" element={<Forms user={user} />} />
          </Route>
        )}
        <Route path="/feedbackForm/:form_id" element={<Feedback />} />

        {!user && !fetchUser && (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {user && <Route path="*" element={<Navigate to="/dashboard" />} />}
      </Routes>
    </div>
  );
}

export default App;

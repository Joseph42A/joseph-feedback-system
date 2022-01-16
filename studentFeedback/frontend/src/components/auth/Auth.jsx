import { useState } from "react";
import "./Auth.css";
// import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../../actions/userActions";
import { useNavigate } from "react-router";

export default function Auth({ setFetchUser }) {
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [useDataError, setUserDataError] = useState({
    nameError: undefined,
    emailError: undefined,
    passwordError: undefined,
    confirmPasswordError: undefined,

    globalError: undefined,
  });
  const [login, setLogin] = useState(false);

  const clear = () => {
    setUserdata({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login) {
      // disptach login function
      dispatch(loginUser(userData, setUserDataError, setFetchUser));
      clear();
    } else {
      // dispatch signup function
      dispatch(signupUser(userData, setUserDataError, setFetchUser));
      clear();
    }

    navigate("/dashboard", { replace: false });
  };

  return (
    <div className="auth">
      <div>
        <h4 className="formTitle">{login ? "LOGIN" : "SIGNUP"}</h4>
        <form className="authForm" onSubmit={handleSubmit}>
          {!login && (
            <div className="form-control">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                required
                value={userData.name}
                autoComplete="off"
                onChange={(e) => {
                  if (e.target.value.trim().length === 0) {
                    setUserDataError({
                      ...useDataError,
                      nameError: "Username must not be empty",
                    });
                  } else {
                    setUserDataError({
                      ...useDataError,
                      nameError: undefined,
                    });
                  }

                  setUserdata({ ...userData, name: e.target.value });
                }}
              />
              {useDataError.nameError && (
                <p className="error">{useDataError.nameError}</p>
              )}
            </div>
          )}

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              value={userData.email}
              autoComplete="off"
              onChange={(e) => {
                if (e.target.value.trim().length === 0) {
                  setUserDataError({
                    ...useDataError,
                    emailError: "Email must not be empty",
                  });
                } else if (
                  !e.target.value.trim().includes("@") ||
                  !e.target.value.trim().includes(".")
                ) {
                  setUserDataError({
                    ...useDataError,
                    emailError: "Please insert a correct email",
                  });
                } else {
                  setUserDataError({
                    ...useDataError,
                    emailError: undefined,
                  });
                }
                setUserdata({ ...userData, email: e.target.value });
              }}
            />
            {useDataError.emailError && (
              <p className="error">{useDataError.emailError}</p>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="password">
              Password{" "}
              <span
                onClick={() => setTogglePassword(!togglePassword)}
                style={{
                  fontSize: "10px",
                  textDecoration: "underline",

                  padding: "2px",
                  cursor: "pointer",
                }}
              >
                {togglePassword ? "hide" : "show"} password
              </span>
            </label>
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={(e) => {
                if (e.target.value.trim().length === 0) {
                  setUserDataError({
                    ...useDataError,
                    passwordError: "Password must not be empty",
                  });
                } else if (e.target.value.trim().length < 8) {
                  setUserDataError({
                    ...useDataError,
                    passwordError:
                      "Password length must be greater or equal to 8",
                  });
                } else {
                  setUserDataError({
                    ...useDataError,
                    passwordError: undefined,
                  });
                }
                setUserdata({ ...userData, password: e.target.value.trim() });
              }}
            />

            {useDataError.passwordError && (
              <p className="error">{useDataError.passwordError}</p>
            )}
          </div>
          {!login && (
            <div className="form-control">
              <label htmlFor="cpwd">Confirm Password</label>
              <input
                type="password"
                name="cpwd"
                value={userData.confirmPassword}
                onChange={(e) => {
                  if (!(e.target.value.trim() === userData.password)) {
                    setUserDataError({
                      ...useDataError,
                      confirmPasswordError: "Password not match",
                    });
                  } else {
                    setUserDataError({
                      ...useDataError,
                      confirmPasswordError: undefined,
                    });
                  }

                  setUserdata({
                    ...userData,
                    confirmPassword: e.target.value.trim(),
                  });
                }}
              />

              {useDataError.confirmPasswordError && (
                <p className="error">{useDataError.confirmPasswordError}</p>
              )}
            </div>
          )}

          {useDataError.globalError && (
            <p className="error">{useDataError.globalError}</p>
          )}

          <button type="submit">{login ? "LOGIN" : "SIGNUP"}</button>
          <p onClick={() => setLogin((l) => !l)}>
            {" "}
            {!login ? "ALREADY HAVE AN ACCOUNT ?" : "OR CREATE A NEW ACCOUNT ?"}
          </p>
        </form>
      </div>
    </div>
  );
}

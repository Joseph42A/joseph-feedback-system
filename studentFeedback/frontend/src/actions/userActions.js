import * as api from "../api/apiEndpoints";

// thunk
export const signupUser =
  (user, setError, setFetchUser) => async (dispatch) => {
    try {
      setFetchUser(true);

      const { data } = await api.signupUser(user);
      // console.log("user is this ", data.data.others);

      // dispatch redux here
      dispatch({ type: "AUTH", payload: data.data.others });
      setFetchUser(false);
    } catch (err) {
      setError((r) => {
        return { ...r, globalError: err.response.data.message };
      });

      console.log("Error in signup: ", err.response.data.message);
    }
  };

export const loginUser = (user, setError, setFetchUser) => async (dispatch) => {
  try {
    setFetchUser(true);
    const { data } = await api.login(user);
    // console.log("user is this ", data.data.user);

    // dispatch redux here
    // dispatch({ type: "SIGNUP", payload: data.data.others });

    dispatch({ type: "AUTH", payload: data.data.user });
    setFetchUser(false);
  } catch (err) {
    setError((r) => {
      return { ...r, globalError: err.response.data.message };
    });

    console.log("Error in signup: ", err.response.data.message);
  }
};

export const logout = (user, setError) => async (dispatch) => {
  try {
    // dispatch redux here
    dispatch({ type: "LOGOUT" });
  } catch (err) {
    setError((r) => {
      return { ...r, globalError: err.response.data.message };
    });

    console.log("Error in signup: ", err.response.data.message);
  }
};

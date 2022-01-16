import * as api from "../api/apiEndpoints";

// thunk
export const createForm =
  (formData, setStep, setFormIsCreating, setCurrentFormId) =>
  async (dispatch) => {
    try {
      setFormIsCreating(true);
      const data = await api.createForm(formData);
      console.log(data.data.data.CurrentNewForm);
      setCurrentFormId(data.data.data.CurrentNewForm._id);

      // disptach here
      dispatch({ type: "CREATE_FORM", payload: data.data.data.CurrentNewForm });
      setFormIsCreating(false);
      setStep((r) => {
        console.log("step: ", r);
        r++;
        console.log("step: ", r);
        return r;
      });
    } catch (err) {
      // setError((r) => {
      //   return { ...r, globalError: err.response.data.message };
      // });
      console.log("Error in signup: ", err.response.data.message);
    }
  };

export const getForms = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getForm(userId);

    dispatch({ type: "FETCH_FORMS", payload: data.data.formForUser });
  } catch (err) {
    // setError((r) => {
    //   return { ...r, globalError: err.response.data.message };
    // });

    console.log("Error in fetching form : ", err.response.data.message);
  }
};

export const deleteForm = (formId) => async (dispatch) => {
  try {
    await api.deleteForm(formId);

    dispatch({ type: "DELETE_FORM", payload: formId });
  } catch (err) {
    // setError((r) => {
    //   return { ...r, globalError: err.response.data.message };
    // });

    console.log("Error in fetching form : ", err.response);
  }
};

import axios from "axios";

export const url = "https://student-feedback-joseph.herokuapp.com/api";

export const signupUser = (user) => axios.post(url + "/signup", user);
export const login = (user) => axios.post(url + "/login", user);

export const getForm = (userId) => axios.get(url + "/form/" + userId);
export const createForm = (formData) => axios.post(url + "/form", formData);
export const deleteForm = (formId) => axios.delete(url + "/form/" + formId);

// export const getSingleForm = (formId) =>
//   axios.get(url + "/singleForm/" + formId);

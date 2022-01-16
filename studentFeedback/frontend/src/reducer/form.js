const form = (form = [], action) => {
  switch (action.type) {
    case "FETCH_FORMS":
      return action.payload;
    case "CREATE_FORM":
      return [...form, action.payload];
    case "DELETE_FORM":
      return form.filter((f) => !(f._id === action.payload));
    default: {
      return form;
    }
  }
};

export default form;

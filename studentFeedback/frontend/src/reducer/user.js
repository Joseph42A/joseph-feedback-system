const user = (user = null, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case "LOGOUT":
      localStorage.removeItem("user");
      return null;
    default: {
      return user;
    }
  }
};

export default user;

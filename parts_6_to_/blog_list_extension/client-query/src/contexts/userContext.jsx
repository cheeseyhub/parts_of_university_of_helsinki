import { createContext, useReducer } from "react";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      window.localStorage.setItem(
        "LoggedBlogUser",
        JSON.stringify(action.payload)
      );
      return action.payload;
    case "GET_USER":
      const userInStorage = window.localStorage.getItem("LoggedBlogUser");
      return JSON.parse(userInStorage);

    case "CLEAR_USER":
      window.localStorage.clear();
      window.location.reload();
      return null;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(
    userReducer,
    JSON.parse(localStorage.getItem("LoggedBlogUser"))
  );

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

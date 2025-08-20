import { createContext, useReducer } from "react";

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      return action.payload + "Success";
    case "ERROR":
      return action.payload + "Error";
    case "CLEAR":
      return "";
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider
      value={[notificationState, notificationDispatch]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

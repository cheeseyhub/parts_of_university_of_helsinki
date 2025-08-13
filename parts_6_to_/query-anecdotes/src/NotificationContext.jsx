import { createContext, useReducer } from "react";

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SETVOTE":
      return `${action.payload} has been voted`;

    case "ADDNOTIFICATION":
      return `${action.payload} has been added.`;
    
    case "ERROR":
      return `${action.payload}`;

    default:
      return state;
  }
};

const NotificationContext = createContext();
export const NotificationContextProvider = (props) => {
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    []
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

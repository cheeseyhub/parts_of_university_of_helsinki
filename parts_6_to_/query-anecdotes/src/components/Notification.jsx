import { useContext } from "react";
import NotificationContext from "../NotificationContext";
const Notification = () => {
  const [notificationState, notificationDispatch] =
    useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return <div style={style}>{notificationState}</div>;
};

export default Notification;

import React from "react";
import { useSelector } from "react-redux";
import { notificationTypeError,
  notificationTypeConfirm,
  notificationTypeHide } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => {return state.notification;});

  const errorStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'red',
  }

  const confirmStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'green',
  }

  const hideStyle = {
    display: 'none',
  }

  let style = {};

  switch(notification.type) {
    case(notificationTypeError):
      style = errorStyle;
      break;
    case(notificationTypeConfirm):
      style = confirmStyle;
      break;
    case(notificationTypeHide):
      style = hideStyle;
      break;
    default:
      break;
  };

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
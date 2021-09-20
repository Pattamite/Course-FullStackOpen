const actionTypeSetType = 'NOTIFICATION_SET_TYPE';
const actionTypeMessage = 'NOTIFICATION_MESSAGE';
const actionTypeHide = 'NOTIFICATION_HIDE';

export const notificationTypeError = 'TYPE_ERROR';
export const notificationTypeConfirm = 'TYPE_CONFIRM';
export const notificationTypeHide = 'TYPE_HIDE';

const initialState = {
  type: notificationTypeHide,
  message: '',
};

function notificationReducer(state = initialState, action) {
  switch(action.type) {
    case actionTypeSetType:
      return {
        ...state,
        type: action.data.type,
      };
    case actionTypeMessage:
      return  {
        ...state,
        message: action.data.message,
      };
    case actionTypeHide:
      return  {
        ...state,
        message: '',
        type: notificationTypeHide,
      };
    default:
      return state;
  }
}

export function setNotification(message, type = notificationTypeConfirm, timeout = 5000) {
  return async (dispatch) => {
    dispatch({
      type: actionTypeSetType,
      data : { type: type },
    });
    dispatch({
      type: actionTypeMessage,
      data : { message: message },
    });

    await setTimeout(() => {
      dispatch({
        type: actionTypeSetType,
        data : { type: notificationTypeHide },
      });
    }, timeout);
  };
}

export default notificationReducer;


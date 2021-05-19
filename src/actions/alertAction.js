import { HIDE_ALERT, SHOW_ALERT } from "../types";

//----Action to show an alert-------
export function showAlertAction(alert) {
  return (dispatch) => {
    dispatch(showAlert(alert));
  };
}
const showAlert = (alert) => ({
  type: SHOW_ALERT,
  payload: alert,
});

//---Action to hide a deployed alert msg------
export function hideAlertAction() {
  return (dispatch) => {
    dispatch(hideAlert());
  };
}
const hideAlert = () => ({
  type: HIDE_ALERT,
});

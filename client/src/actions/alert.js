import {SET_ALERT, REMOVE_ALERT} from './types'
import uuid from 'uuid/v4'

// These are the functions we export

// msg is mssage you get form resigter form (or any other component)
// alertType is what colour the alert should be (this will add a class later on)
export const setAlert = (msg,alertType) => (dispatch) =>{
    // generate id
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    });

    setTimeout(()=> dispatch({type:REMOVE_ALERT, payload:id}),5000)
};

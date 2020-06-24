import { createLogic } from "redux-logic";
import {
  GET_SESSION_ID,
  getSessionIdSuccess,
  SEND_MESSAGE,
  sendMessageSuccess,
} from ".";
import api from "../api";

export const handleGetSession = () => {
  return createLogic({
    type: GET_SESSION_ID,
    process(_, dispatch, done) {
      fetch(`${api}/chat/session`)
        .then((res) => res.json())
        .then((res) =>{
          console.log(res)
          dispatch(getSessionIdSuccess({ sessionId: res.sessionId }))
        
        })
        .catch((err) => console.log(err))
        .finally(done);
    },
  });
};

export const handleSendMessage = () => {
  return createLogic({
    type: SEND_MESSAGE,
    process(
      {
        action: {
          payload: { data },
        },
      },
      dispatch,
      done
    ) {
      dispatch(
        sendMessageSuccess({ data: { text: data.message, type: "user" } })
      );
      console.log({
        message: data.message,
        sessionId: data.sessionId,
      });
      fetch(`${api}/chat/send`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: data.message,
          sessionId: data.sessionId,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch(
            sendMessageSuccess({ data: { text: res.message, type: "bot" } })
          );
        })
        .catch((err) => console.log(err))
        .finally(done);
    },
  });
};

const configureChatLogics = () => {
  return [handleGetSession(), handleSendMessage()];
};

export default configureChatLogics;

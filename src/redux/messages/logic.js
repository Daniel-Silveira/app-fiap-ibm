import { createLogic } from "redux-logic";
import {
  GET_SESSION_ID,
  getSessionIdSuccess,
  SEND_MESSAGE,
  sendMessageSuccess,
  sendMessageLoading,
  SEND_MESSAGE_AUDIO,
  sendMessage,
} from ".";
import api from "../api";
import axios from "axios";

export const handleGetSession = () => {
  return createLogic({
    type: GET_SESSION_ID,
    process(_, dispatch, done) {
      fetch(`${api}/chat/session`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          dispatch(getSessionIdSuccess({ sessionId: res.sessionId }));
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
      dispatch(sendMessageLoading(true));
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
          dispatch(sendMessageLoading(false));
          dispatch(
            sendMessageSuccess({ data: { text: res.message, type: "bot", options: res.options } })
          );
        })
        .catch((err) => console.log(err))
        .finally(done);
    },
  });
};

export const handleSendMessageAudio = () => {
  return createLogic({
    type: SEND_MESSAGE_AUDIO,
    process(
      {
        action: {
          payload: {
            data: { sessionId, file },
          },
        },
      },
      dispatch,
      done
    ) {
      file
        .then(({ uri }) => {
          const formData = new FormData();
          formData.append("audio", {
            uri,
            type: "audio/webm",
            name: "speech2text",
          });
          return axios.post(`${api}/upload/new/${sessionId}`, formData, {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          });
        })
        .then((res) => res.data)
        .then((res) => {
          dispatch(sendMessage({message: res.text, sessionId: res.sessionId }))
        })
        .catch((err) => {
          console.log("err:", err);
        })
        .finally(done);
    },
  });
};

const configureChatLogics = () => {
  return [handleGetSession(), handleSendMessage(), handleSendMessageAudio()];
};

export default configureChatLogics;

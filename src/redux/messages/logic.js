import { createLogic } from "redux-logic";
import {
  GET_SESSION_ID,
  getSessionIdSuccess,
  SEND_MESSAGE,
  sendMessageSuccess,
  sendMessageLoading,
  SEND_MESSAGE_AUDIO,
  sendMessage,
  sendMessageLoadingAudio,
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
          sessionId: data.sessionId,
          message: data.message,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const finishText = "Muito obrigado pelas informações";
          const list = [
            {
              name: "New Life",
              address: "Avenida Paulista, 1500 - Bela Vista, São Paulo - SP",
              url:
                "https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2011%2F05%2F09%2F14%2FWDL-Logo-3859_12608_035533012_1030591541.jpg",
            },
            {
              name: "Giacomazzi",
              address:
                "Avenida Doutor Enéas Carvalho de Aguiar, 188 - Cerqueira César, São Paulo - SP",
              url:
                "https://lh3.googleusercontent.com/proxy/36gxpMjfRzFDJjyt-wIaHFE959264mpTog2vYlNakWRVWwyPr8Z99nV-qNm6BwWdby0duNIxdmUtxtBTtaQA1LYC3fNiKqXFQGz0x2U",
            },
          ];
          if (res.message.slice(0, 32) === finishText) {
            dispatch(sendMessageLoading(false));
            dispatch(
              sendMessageSuccess({
                data: {
                  list,
                  text: res.message,
                  type: "bot",
                  options: res.options,
                },
              })
            );
          } else {
            dispatch(sendMessageLoading(false));
            dispatch(
              sendMessageSuccess({
                data: { text: res.message, type: "bot", options: res.options },
              })
            );
          }
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
      dispatch(sendMessageLoadingAudio(true));
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
          dispatch(sendMessageLoadingAudio(false));
          dispatch(
            sendMessage({ message: res.text, sessionId: res.sessionId })
          );
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

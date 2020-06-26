import { createActions, handleActions } from "redux-actions";

export const GET_SESSION_ID = "GET_SESSION_ID";
export const GET_SESSION_ID_SUCCESS = "GET_SESSION_ID_SUCCESS";

export const { getSessionId, getSessionIdSuccess } = createActions({
  [GET_SESSION_ID]: () => {},
  [GET_SESSION_ID_SUCCESS]: (sessionId) => sessionId,
});

export const SEND_MESSAGE = "SEND_MESSAGE";
export const SEND_MESSAGE_AUDIO = "SEND_MESSAGE_AUDIO";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_LOADING = "SEND_MESSAGE_LOADING";
export const SEND_MESSAGE_LOADING_AUDIO = "SEND_MESSAGE_LOADING_AUDIO";

export const {
  sendMessage,
  sendMessageAudio,
  sendMessageSuccess,
  sendMessageLoading,
  sendMessageLoadingAudio,
} = createActions({
  [SEND_MESSAGE]: (data) => ({ data }),
  [SEND_MESSAGE_AUDIO]: (data) => ({ data }),
  [SEND_MESSAGE_SUCCESS]: ({ data }) => ({ data }),
  [SEND_MESSAGE_LOADING]: (boolean) => boolean,
  [SEND_MESSAGE_LOADING_AUDIO]: (boolean) => boolean,
});

export const INITIAL_STATE = {
  messages: [
    {
      text:
        "Olá! Meu nome é Emília e vou te ajudar a agendar uma consulta. Vamos começar? Me diga por gentileza, seu nome?",
      type: "bot",
    },
  ],
  sessionId: "",
  loading: false,
  loadingAudio: false,
};

const reducer = handleActions(
  {
    [GET_SESSION_ID_SUCCESS]: (state, { payload: { sessionId } }) => {
      return {
        ...state,
        sessionId,
      };
    },
    [SEND_MESSAGE_LOADING]: (state, { payload }) => {
      return {
        ...state,
        loading: payload,
      };
    },
    [SEND_MESSAGE_LOADING_AUDIO]: (state, { payload }) => {
      return {
        ...state,
        loadingAudio: payload,
      };
    },
    [SEND_MESSAGE_SUCCESS]: (state, { payload: { data } }) => {
      return {
        ...state,
        messages: [...state.messages, data],
      };
    },
  },
  INITIAL_STATE
);

export default reducer;

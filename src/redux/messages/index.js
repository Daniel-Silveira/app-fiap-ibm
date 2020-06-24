import { createActions, handleActions } from "redux-actions";

export const GET_SESSION_ID = "GET_SESSION_ID";
export const GET_SESSION_ID_SUCCESS = "GET_SESSION_ID_SUCCESS";

export const { getSessionId, getSessionIdSuccess } = createActions({
  [GET_SESSION_ID]: () => {},
  [GET_SESSION_ID_SUCCESS]: (sessionId) => sessionId,
});

export const SEND_MESSAGE = "SEND_MESSAGE";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";

export const { sendMessage, sendMessageSuccess } = createActions({
  [SEND_MESSAGE]: (data) => ({ data }),
  [SEND_MESSAGE_SUCCESS]: ({ data }) => ({ data }),
});

export const INITIAL_STATE = {
  messages: [{ text: 'Olá sou sua assistente virtual e estou aqui para te ajudar', type: "bot" }],
  sessionId: "",
};

const reducer = handleActions(
  {
    [GET_SESSION_ID_SUCCESS]: (state, { payload: { sessionId } }) => {
      return {
        ...state,
        sessionId,
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

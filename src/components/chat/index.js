import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import Header from "./header";
import BoxBottom from "./box-bottom";
import Messages from "./messages";
import { useDispatch, useSelector } from "react-redux";
import { getSessionId } from "../../redux/messages";
import { KeyboardAvoidingView, Platform } from "react-native";

const Chat = () => {
  const dispatch = useDispatch();
  const { chat } = useSelector((value) => value);
  const [refMessages, setRefMessages] = useState(undefined);

  useEffect(() => {
    dispatch(getSessionId());
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Container>
        <Header />
        <Messages
          refMessages={refMessages}
          setRefMessages={setRefMessages}
          loading={chat.loading}
          array={chat.messages}
          sessionId={chat.sessionId}
        />
        <BoxBottom refMessages={refMessages} sessionId={chat.sessionId} />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Chat;

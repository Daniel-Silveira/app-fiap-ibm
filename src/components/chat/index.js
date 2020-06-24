import React, { useEffect } from "react";
import { Container } from "./styled";
import Header from "./header";
import BoxBottom from "./box-bottom";
import Messages from "./messages";
import { useDispatch, useSelector } from "react-redux";
import { getSessionId } from "../../redux/messages";

const Chat = () => {
  const dispatch = useDispatch();
  const { chat } = useSelector((value) => value);
  useEffect(() => {
    dispatch(getSessionId());
  }, []);
  console.log(chat);

  return (
    <Container>
      <Header />
      <Messages array={chat.messages} />
      <BoxBottom sessionId={chat.sessionId} />
    </Container>
  );
};

export default Chat;

import React, { useState } from "react";
import { Container, Input, SendButton } from "./styled";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { sendMessage } from "../../../redux/messages";
import { useDispatch } from "react-redux";
import Microphone from "../microphone";
import { Keyboard } from "react-native";

const BoxBottom = ({ sessionId, refMessages }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const send = () => {
    dispatch(sendMessage({ message: text, sessionId: sessionId }));
    setText("");
    setTimeout(() => {
      refMessages.scrollToEnd({ animated: true });
    }, 100);
  };
  return (
    <Container>
      <Input
        multiline
        placeholder="Digite sua mensagem"
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      {!!text ? (
        <SendButton onPress={send}>
          <MaterialIcons name="send" size={18} color="#fff" />
        </SendButton>
      ) : (
        <Microphone sessionId={sessionId} />
      )}
    </Container>
  );
};

export default BoxBottom;

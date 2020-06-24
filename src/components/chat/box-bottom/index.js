import React, { useState } from "react";
import { Container, Input, SendButton } from "./styled";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { sendMessage } from "../../../redux/messages";
import { useDispatch } from "react-redux";

const BoxBottom = ({ sessionId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  return (
    <Container>
      <Input
        multiline
        placeholder="Digite sua mensagem"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <SendButton
        onPress={() => {
          dispatch(sendMessage({ message: text, sessionId: sessionId }));
          setText("");
        }}
      >
        {!!text ? (
          <MaterialIcons name="send" size={18} color="#fff" />
        ) : (
          <FontAwesome name="microphone" size={18} color="#fff" />
        )}
      </SendButton>
    </Container>
  );
};

export default BoxBottom;

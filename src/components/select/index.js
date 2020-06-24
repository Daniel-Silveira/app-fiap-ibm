import React, { useState } from "react";
import { Container, Preview, BoxOptions, Option } from "./styled";
import { Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../redux/messages";

const Select = ({ refMessages, array, sessionId, setScroll }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch();

  return (
    <Container>
      <Preview
        onPress={() => {
          setOpen(!open);
          setScroll(false);
          setTimeout(() => {
            refMessages.scrollToEnd({ animated: true });
          }, 100);
        }}
      >
        <Text>{selected.label || "Selecione uma opção"}</Text>
        <EvilIcons name="chevron-down" size={24} color="black" />
      </Preview>
      {open && (
        <BoxOptions>
          {array.map((i) => (
            <Option
              selected={selected.label === i.label}
              onPress={() => {
                dispatch(
                  sendMessage({ message: i.label, sessionId: sessionId })
                );
                setSelected(i);
                setScroll(true);
                setOpen(false);
              }}
            >
              <Text style={selected.label === i.label && { color: "#fff" }}>
                {i.label}
              </Text>
            </Option>
          ))}
        </BoxOptions>
      )}
    </Container>
  );
};

export default Select;

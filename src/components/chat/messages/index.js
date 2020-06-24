import React, { useState, useEffect } from "react";
import { Container, Message, Box, StyledText } from "./styled";
import { AvatarDoctor, AvatarUser } from "../../icons";
import { WebView } from "react-native-webview";
import {
  getPercentageSizeHeight,
  getPercentageSizeWidth,
} from "../../../utils";
import LottieView from "lottie-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import Select from "../../select";

const Messages = ({ array, loading, refMessages, setRefMessages, sessionId }) => {
  useEffect(() => {
    !!refMessages && refMessages.scrollToEnd({ animated: true });
  }, [refMessages, array.length]);

  const onSpeak = (text) => {
    Speech.speak(text, {
      language: "pt-BR",
      pitch: 1,
      rate: 0.96,
    });
  };

  return (
    <Container ref={setRefMessages}>
      {array.map((i, index) => (
        <Box key={index} user={i.type === "user"}>
          <Message>
            {index !== 0 && i.type !== "user" && (
              <View style={{ alignItems: "center" }}>
                <AvatarDoctor />
                <TouchableOpacity onPress={() => onSpeak(i.text)}>
                  <AntDesign name="sound" size={24} color="#55EFC4" />
                </TouchableOpacity>
              </View>
            )}
            {!!i.text && i.text.slice(0, 7) === "<iframe" ? (
              <WebView
                style={{
                  width: getPercentageSizeWidth(100),
                  height: getPercentageSizeHeight(30),
                }}
                originWhitelist={["*"]}
                source={{ html: i.text }}
              />
            ) : (
              <StyledText user={i.type === "user"}>
                <Text style={i.type === "user" && { color: "#fff" }}>
                  {i.text}
                </Text>
                {i.type != "user" && (
                  <AntDesign name="sound" size={24} color="transparent" />
                )}
                {!!i.options && i.options.length > 0 && (
                  <Select sessionId={sessionId} refMessages={refMessages} array={i.options} />
                )}
              </StyledText>
            )}
            {i.type === "user" && <AvatarUser />}
          </Message>
        </Box>
      ))}
      {loading && (
        <Box>
          <Message>
            <AvatarDoctor />
            <LottieView
              style={{ width: 60, marginLeft: 3 }}
              loop
              source={require("../../../../assets/lf30_editor_K8g6ER.json")}
              autoPlay
            />
          </Message>
        </Box>
      )}
    </Container>
  );
};

export default Messages;

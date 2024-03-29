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
import ListClinics from "../../../clinics";

const Messages = ({
  array,
  loading,
  loadingAudio,
  refMessages,
  setRefMessages,
  sessionId,
}) => {
  useEffect(() => {
    !!refMessages && refMessages.scrollToEnd({ animated: true });
  }, [refMessages, array.length]);

  const [scroll, setScroll] = useState(true);

  const onSpeak = async (text) => {
    Speech.speak(text, {
      language: "pt-BR",
      pitch: 1,
      rate: 0.96,
      volume: 1,
    });
  };

  return (
    <Container ref={setRefMessages} scrollEnabled={scroll}>
      {array.map((i, index) => (
        <Box key={index} user={i.type === "user"}>
          <Message>
            {index !== 0 && i.type !== "user" && (
              <View style={{ alignItems: "center", marginTop: 20 }}>
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
                  <Select
                    scroll={scroll}
                    setScroll={setScroll}
                    sessionId={sessionId}
                    refMessages={refMessages}
                    array={i.options}
                  />
                )}
              </StyledText>
            )}
            {i.type === "user" && <AvatarUser />}
          </Message>
          {i.list && i.list.length > 0 && <ListClinics array={i.list} />}
        </Box>
      ))}
      {loadingAudio && (
        <Box user>
          <Message user>
            <LottieView
              style={{ width: 60, marginRight: 3 }}
              loop
              source={require("../../../../assets/lf30_editor_ZNL1Ce.json")}
              autoPlay
            />
            <AvatarUser />
          </Message>
        </Box>
      )}
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

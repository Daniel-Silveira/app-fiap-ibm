import React, { useEffect } from "react";
import * as Speech from "expo-speech";
import { TouchableOpacity, Text } from "react-native";

const RobotSpeech = ({ text }) => {
  const onSpeak = () => {
    Speech.speak("teste teste, teste teste, teste teste, teste teste", {
      language: "pt-BR",
      pitch: 1,
      rate: 0.9,
      onDone: () => console.log("finish"),
    });
  };

  return (
    <TouchableOpacity onPress={onSpeak}>
      <Text>Falar</Text>
    </TouchableOpacity>
  );
};

export default RobotSpeech;

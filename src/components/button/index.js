import React from "react";
import { StyledButton } from "./styled";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const Button = ({ play, ...rest }) => {
  return (
    <StyledButton {...rest}>
      {play ? (
        <LottieView
          loop
          autoPlay
          source={require("../../../assets/17555-audio-playing.json")}
        />
      ) : (
        <FontAwesome name="microphone" size={24} color="#79c8a2" />
      )}
    </StyledButton>
  );
};

export default Button;

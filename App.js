import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Button from "./src/components/button";
import Chat from "./src/components/chat";
import Constants from "expo-constants";
import store from "./src/redux";
import { Provider } from "react-redux";

const App = () => {
  console.disableYellowBox = true;
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#000",
    //   }}
    // >
    //   <LottieView
    //     style={{ width: 400, height: 400 }}
    //     ref={(animation) => setRobot(animation)}
    //     loop
    //     source={require("./4982-talking-robot-chatbot.json")}
    //   />
    //   {console.log(message)}
    //   <Button play={stateRecording} onPress={startRecording} />
    // </View>
    <Provider store={store}>
      <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <StatusBar style="dark" />
        <Chat />
      </View>
    </Provider>
  );
};

export default App;

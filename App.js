import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "./src/components/button";
import Chat from "./src/components/chat";
import Constants from "expo-constants";
import store from "./src/redux";
import { Provider } from "react-redux";

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <StatusBar style="dark" />
        <Chat />
      </View>
    </Provider>
  );
};

export default App;

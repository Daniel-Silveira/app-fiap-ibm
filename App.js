import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import store from "./src/redux";
import { Provider } from "react-redux";
import Navigation from "./src/navigation";

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <StatusBar style="dark" />
        <Navigation/>
      </View>
    </Provider>
  );
};

export default App;

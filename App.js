import React from "react";
import { View } from "react-native";
import Chat from "./src/components/chat";
import Constants from "expo-constants";
import store from "./src/redux";
import { Provider } from "react-redux";

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <Chat />
      </View>
    </Provider>
  );
};

export default App;

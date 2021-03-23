import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import Modal from "../components/Modal";
import Chat from "../components/chat";
import { getPercentageSizeHeight } from "../utils";

const Navigation = () => {
  const [mode, setMode] = useState("card");

  const defaultOptions = {
    headerShown: false,
    cardStyle: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "#fff",
    },
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode={mode} initialRouteName="Chat">
        <Stack.Screen name="Chat" component={Chat} options={defaultOptions} />
        <Stack.Screen
          name="Modal"
          component={() => <Modal setMode={setMode} />}
          options={{
            gestureDirection: "vertical",
            gestureEnabled: true,
            cardStyle: { backgroundColor: "transparent" },
            gestureResponseDistance: {
              vertical: getPercentageSizeHeight(35),
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

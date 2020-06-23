import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import * as Speech from "expo-speech";
import Button from "./src/components/button";

const App = () => {
  const [robot, setRobot] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [stateRecording, setStateRecording] = useState(false);
  const [message, setMessage] = useState("");
  const [init, setInit] = useState(true);

  const speech = (text) => {
    Speech.speak(text, {
      language: "pt-BR",
      pitch: 1,
      rate: 0.9,
      onStart: () => robot.play(),
      onDone: () => robot.reset(),
    });
  };

  const startRecording = async () => {
    const recording = new Audio.Recording();

    const recordingOptions = {
      // android not currently in use, but parameters are required
      android: {
        extension: ".webm",
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
      },
      ios: {
        extension: ".webm",
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
    };

    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== "granted") return;

    // some of these are not applicable, but are required
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    try {
      const status = await recording.getStatusAsync();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      console.log("iniciado");
      setStateRecording(true);
      setTimeout(async () => {
        await recording.stopAndUnloadAsync();
        getTranscription(FileSystem.getInfoAsync(recording.getURI()));
        setStateRecording(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const getTranscription = async (file) => {
    console.log("initialDate:", new Date());
    const info = await file;
    const uri = info.uri;
    const formData = new FormData();
    formData.append("audio", {
      uri,
      type: "audio/webm",
      // could be anything
      name: "speech2text",
    });
    console.log("formData", formData);
    axios
      .post(`https://speech-to-text-fiap.herokuapp.com/upload/new`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTZjM2QzOWUzOGY5NTA0Yzk1NmYxYiIsImlhdCI6MTU5MDAwNTE1MH0.Kn0U2uRoJhaB7NZ2k7g41xshaW_IlBTUWCqtIv0PyVM`,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log("foi", new Date());
        speech(res.message);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  useEffect(() => {
    if (!message && robot && init) {
      setInit(false);
      speech(
        "Olá, seja bem vindo ao nosso sistema, eu sou a sua assistente virtual e estou aqui para te ajudar."
      );
    }
  }, [robot]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <LottieView
        style={{ width: 400, height: 400 }}
        ref={(animation) => setRobot(animation)}
        loop
        source={require("./4982-talking-robot-chatbot.json")}
      />
      {console.log(message)}
      <Button play={stateRecording} onPress={startRecording} />
    </View>
  );
};

export default App;

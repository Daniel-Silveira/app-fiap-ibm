import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import Constants from "expo-constants";
import { View, Text, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import RobotSpeech from "./speech";
import * as Speech from "expo-speech";

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [stateRecording, setStateRecording] = useState(false);
  const [message, setMessage] = useState("");

  startRecording = async () => {
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
        extension: ".wav",
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
        setMessage(res.message.trim());
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  const speech = (text) => {
    Speech.speak(text, {
      language: "pt-BR",
      pitch: 1,
      rate: 0.9,
    });
  };

  useEffect(() => {
    if (message === "onde voce mora" || message === "onde você mora") {
      console.log("passou");
      speech("Eu moro no seu coração.");
    } else if (!!message) {
      speech("Desculpe, não entendi.");
    }
  }, [message]);

  useEffect(() => {
    !message &&
      speech(
        "Olá, seja bem vindo ao nosso sistema, eu sou a Rayane e estou aqui para te ajudar."
      );
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={() => startRecording()}>
        <Text>{stateRecording ? "Gravando.." : "Gravar"}</Text>
        <Text>{message}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

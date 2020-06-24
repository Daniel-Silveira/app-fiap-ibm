import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SendButton } from "../box-bottom/styled";
import { useDispatch } from "react-redux";
import { sendMessageAudio } from "../../../redux/messages";

const Microphone = ({ sessionId }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [stateRecording, setStateRecording] = useState(false);
  const dispatch = useDispatch();

  const startRecording = async () => {
    const recording = new Audio.Recording();

    const recordingOptions = {
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

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    try {
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      console.log("inicio");
      setStateRecording(true);
      setTimeout(async () => {
        await recording.stopAndUnloadAsync();
        dispatch(
          sendMessageAudio({
            sessionId,
            file: FileSystem.getInfoAsync(recording.getURI()),
          })
        );
        setStateRecording(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SendButton onPress={startRecording}>
      <FontAwesome name="microphone" size={18} color="#fff" />
    </SendButton>
  );
};

export default Microphone;

import { PixelRatio, Platform, Dimensions } from "react-native";

export const getRelativeSize = (size) =>
  Platform.select({ ios: size, android: size });

export const getPercentageSizeWidth = (percentage) =>
  (Dimensions.get("window").width * percentage) / 100;

export const getPercentageSizeHeight = (percentage) =>
  (Dimensions.get("window").height * percentage) / 100;

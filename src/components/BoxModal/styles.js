import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { getPercentageSizeWidth, getPercentageSizeHeight } from "../../utils";

const shadowCard = {
  shadowColor: "rgba(0,0,0, 1)", // IOS
  shadowOffset: { height: 0, width: 0 }, // IOS
  shadowOpacity: 0.25, // IOS
  shadowRadius: 8, //IOS
  elevation: 2, // Android
  zIndex: 16,
};

export const BoxConfig = styled.View`
  justify-content: flex-end;
  /* flex: 1; */
  width: ${getPercentageSizeWidth(100)};
  height: ${getPercentageSizeHeight(100)};
  min-width: ${getPercentageSizeWidth(100)};
  min-height: ${getPercentageSizeHeight(100)};
  flex-shrink: 0;
  /* align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
`;
export const BackArea = styled.TouchableOpacity`
  flex: 1;
  /* background-color: #0ff; */
`;

export const IconBox = styled.View.attrs({ ...shadowCard })`
  /* justify-content: flex-end; */
  width: 100;
  align-items: center;
  height: 30;
  background-color: #eeeeee80;
  background-color: #fff;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
`;

export const Icon = styled.View`
  width: 50px;
  height: 6px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.7);
  margin-top: 10px;
`;

export const Options = styled.View.attrs({ ...shadowCard })`
  /* flex: .5; */
  width: ${getPercentageSizeWidth(100)};
  height: ${getPercentageSizeHeight(100) - getStatusBarHeight() - 80};
  /* min-width: ${getPercentageSizeWidth(100)};
  min-height: ${getPercentageSizeHeight(100) - getStatusBarHeight() - 80}; */
  background-color: #fff;
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
  /* justify-content: space-evenly; */
  align-items: center;
  border-top-right-radius: 25;
  border-top-left-radius: 25;
  ${({ height }) =>
    height &&
    css`
      height: ${getPercentageSizeHeight(height)};
    `}
`;

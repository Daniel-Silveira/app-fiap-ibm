import styled from "styled-components";
import {
  getPercentageSizeWidth,
  getPercentageSizeHeight,
  getRelativeSize,
} from "../../../utils";

export const Container = styled.View`
  width: ${getPercentageSizeWidth(100)};
  height: ${getPercentageSizeHeight(8)};
  border-top-width: 1px;
  border-color: #ddd;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 5px;
  height: ${getPercentageSizeHeight(8)};

`;

export const SendButton = styled.TouchableOpacity`
  width: ${getRelativeSize(30)};
  height: ${getRelativeSize(30)};
  background: #55EFC4;
  margin-right: 10;
  border-radius: 100;
  align-items: center;
  justify-content: center;
`;

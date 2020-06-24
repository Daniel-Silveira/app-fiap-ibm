import styled from "styled-components";
import {
  getPercentageSizeWidth,
  getPercentageSizeHeight,
} from "../../../utils";

export const Container = styled.View`
  width: ${getPercentageSizeWidth(100)};
  height: ${getPercentageSizeHeight(10)};
  border-bottom-width: 1px;
  border-color: #ddd;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`;

export const StyledText = styled.Text`
  margin-left: 10;
  font-weight: bold;
`;

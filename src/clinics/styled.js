import styled, { css } from "styled-components";
import {
  getPercentageSizeHeight,
  getPercentageSizeWidth,
  getRelativeSize,
} from "../utils";

export const Container = styled.View`
  width: ${getPercentageSizeWidth(100)};
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const BoxClinic = styled.View`
  border-width: 1px;
  border-color: #55efc4;
  border-radius: 12px;
  width: ${getPercentageSizeWidth(40)};
  height: ${getPercentageSizeHeight(36)};
  margin: ${getRelativeSize(10)}px 0px;
`;

export const Box = styled.View`
  padding: 10px;
  border-top-width: 1px;
  border-color: rgba(85, 239, 196, 0.3);
  justify-content: space-around;
  flex: 1;
`;

export const Image = styled.Image`
  width: ${getPercentageSizeWidth(39)};
  height: ${getPercentageSizeHeight(15)};
  border-radius: 12px;
`;

export const Name = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 15px;
`;

export const Button = styled.TouchableOpacity`
  width: ${getPercentageSizeWidth(35)};
  height: ${getRelativeSize(40)};
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;
  background: #55efc4;
  border-width: 1px;
  border-color: #55efc4;
  border-radius: 50px;
  align-items: center;
  margin-top: 5px;
  ${({ outline }) =>
    outline &&
    css`
      background: #fff;
    `}
`;

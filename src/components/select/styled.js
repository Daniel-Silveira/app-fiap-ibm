import styled, { css } from "styled-components";
import {
  getPercentageSizeWidth,
  getRelativeSize,
  getPercentageSizeHeight,
} from "../../utils";

export const Container = styled.View`
  border-width: 1px;
  border-radius: 10px;
  border-color: #55efc4;
  width: ${getPercentageSizeWidth(70)};
`;

export const Preview = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

export const BoxOptions = styled.ScrollView`
  height: ${getPercentageSizeHeight(15)};
`;

export const Option = styled.TouchableOpacity`
  padding: 10px;
  ${({ selected }) =>
    selected &&
    css`
      background-color: #55efc4;
    `}
`;

import styled, { css } from "styled-components";
import { getPercentageSizeWidth, getRelativeSize } from "../../../utils";

export const Container = styled.ScrollView`
  width: ${getPercentageSizeWidth(100)};
  flex: 1;
  background: #fff;
`;

export const Box = styled.View`
  margin: 0px 5px;
  ${({ user }) =>
    user &&
    css`
      align-items: flex-end;
    `}
`;

export const Message = styled.View`
  flex-direction: row;
`;

export const StyledText = styled.View`
  padding: 10px;
  max-width: ${getPercentageSizeWidth(70)};
  margin: ${getRelativeSize(10)}px 0px;
  ${({ user }) =>
    user &&
    css`
      align-items: flex-end;
      background: #000;
      border-radius: 10px;
      border-bottom-right-radius: 0;
      margin-right: 5px;
    `}
`;

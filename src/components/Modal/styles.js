import styled, { css } from "styled-components/native";
import { getPercentageSizeHeight } from "../../utils";

const shadowCard = {
  shadowColor: "rgba(0,0,0, 1)", // IOS
  shadowOffset: { height: 0, width: 0 }, // IOS
  shadowOpacity: 0.25, // IOS
  shadowRadius: 8, //IOS
  elevation: 2, // Android
  zIndex: 16,
};

export const Clicable = styled.View`
  justify-content: flex-end;
  flex: 1;
  align-items: center;

  /* background-color: #eeeeee80; */
`;
export const Icon = styled.TouchableWithoutFeedback`
  /* justify-content: flex-end; */
  width: 100;
  height: 30;
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
export const BoxConfig = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* background-color: #eeeeee80; */
`;

export const Card = styled.TouchableOpacity`
  width: 40%;
  height: 45%;
  background-color: #fff;
  border-radius: 16;
  margin-top: 5%;
  ${({ noMargin }) =>
    noMargin &&
    css`
      margin-top: 0%;
    `}
`;
export const Options = styled.View.attrs({ ...shadowCard })`
  /* flex: .5; */
  height: ${getPercentageSizeHeight(100) - 100};
  width: 100%;
  background-color: #fff;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
  border-top-right-radius: 25;
  border-top-left-radius: 25;
`;

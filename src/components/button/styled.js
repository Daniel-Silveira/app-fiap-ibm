import styled from "styled-components";
import { getPercentageSizeWidth } from "../../utils";

export const StyledButton = styled.TouchableOpacity`
  border-radius: 100px;
  flex-direction: row;
  border-width: 2px;
  border-color: #79c8a2;
  justify-content: center;
  align-items: center;
  width: ${getPercentageSizeWidth(15)};
  height: ${getPercentageSizeWidth(15)};
`;

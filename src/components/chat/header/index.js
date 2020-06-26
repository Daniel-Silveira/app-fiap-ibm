import React from "react";
import { Container, StyledText } from "./styled";
import { AvatarDoctor } from "../../icons";

const Header = () => {
  return (
    <Container>
      <AvatarDoctor />
      <StyledText>Emília</StyledText>
    </Container>
  );
};

export default Header;

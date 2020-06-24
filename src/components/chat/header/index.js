import React from "react";
import { Container, StyledText } from "./styled";
import { AvatarDoctor } from "../../icons";

const Header = () => {
  return (
    <Container>
      <AvatarDoctor />
      <StyledText>Assistente Virtual</StyledText>
    </Container>
  );
};

export default Header;

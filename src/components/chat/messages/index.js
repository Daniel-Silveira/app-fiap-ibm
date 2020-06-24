import React from "react";
import { Container, Message, Box, StyledText } from "./styled";
import { AvatarDoctor, AvatarUser } from "../../icons";

const Messages = ({ array }) => {
  return (
    <Container>
      {array.map((i, index) => (
        <Box key={index} user={i.type === "user"}>
          <Message style={{ flexDirection: "row" }}>
            {index !== 0 && i.type !== "user" && <AvatarDoctor />}
            <StyledText user={i.type === "user"}>{i.text}</StyledText>
            {i.type === "user" && <AvatarUser />}
          </Message>
        </Box>
      ))}
    </Container>
  );
};

export default Messages;

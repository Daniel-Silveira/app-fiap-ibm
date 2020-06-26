import React from "react";
import { Container, BoxClinic, Image, Name, Box, Button } from "./styled";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Linking from "expo-linking";

const ListClinics = ({ array }) => {
  const outline = false;
  return (
    <Container>
      {array.map((i) => (
        <BoxClinic>
          <Image source={{ uri: i.url }} />
          <Box>
            <Name>{i.name}</Name>
            <Text style={{ textAlign: "center" }}>
              {i.address.length > 45
                ? `${i.address.slice(0, 45)}...`
                : i.address}
            </Text>
            <Button
              outline={outline}
              onPress={() =>
                Linking.openURL("https://goo.gl/maps/yNY5t2TgF2DYYp3y5")
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: outline ? "#55efc4" : "#fff",
                }}
              >
                Ver no mapa
              </Text>
              <Feather
                name="map"
                size={24}
                color={outline ? "#55efc4" : "#fff"}
              />
            </Button>
          </Box>
        </BoxClinic>
      ))}
    </Container>
  );
};

export default ListClinics;

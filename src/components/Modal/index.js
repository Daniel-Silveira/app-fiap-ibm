import React, { useEffect } from "react";
import * as Styled from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

const Modal = ({ setMode }) => {
  const { goBack, navigate, addListener } = useNavigation();
  const {
    params: { component: Component, action, noReturn },
  } = useRoute();

  const handleGoBack = () => {
    goBack();
    action && action();
  };

  useEffect(() => {
    addListener("focus", () => setMode("modal"));
    addListener("blur", () => setMode("card"));
  }, []);

  return (
    <Styled.Clicable onRequestClose={goBack} transparent={true}>
      {Component && (
        <Component
          setMode={setMode}
          handleGoBack={handleGoBack}
          noReturn={noReturn}
          navigate={navigate}
        />
      )}
    </Styled.Clicable>
  );
};

export default Modal;

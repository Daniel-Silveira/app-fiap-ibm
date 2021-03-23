import React, { useEffect, useState } from "react";
import * as Styled from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

const BoxModal = (props) => {
  const { handleGoBack } = props;
  const route = useRoute();
  const size = route.params?.size;
  const noReturn = route.params?.noReturn;

  let elements = React.Children.toArray(props.children);

  if (elements.length === 1) {
    elements = React.cloneElement(elements[0], { handleGoBack: handleGoBack });
  } else if (elements.length > 0) {
    let lastElement = elements[elements.length - 1];
    elements = [React.cloneElement(elements[0], { handleGoBack: handleGoBack })]
      .concat(elements.slice(1, -1))
      .concat(React.cloneElement(lastElement, { handleGoBack: handleGoBack }));
  }

  return (
    <Styled.BoxConfig>
      <Styled.BackArea onPress={handleGoBack} />
      <Styled.Options height={size}>
        {!noReturn && <Styled.Icon onPress={handleGoBack}></Styled.Icon>}
        {props.children && elements}
      </Styled.Options>
    </Styled.BoxConfig>
  );
};

export default BoxModal;

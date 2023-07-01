import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  renderComponent: () => React.ReactNode;
}

function Screen({ renderComponent }: Props) {
  const insets = useSafeAreaInsets();
  console.log(insets);
  return (
    <BottomTabBarHeightContext.Consumer>
      {(tabBarHeight) => {
        console.log(tabBarHeight);
        return (
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height - (60 + insets.bottom),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {renderComponent()}
          </View>
        );
      }}
    </BottomTabBarHeightContext.Consumer>
  );
}

export default Screen;

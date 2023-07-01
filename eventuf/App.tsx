import React from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Events from "./src/Components/Events/Events";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Screen from "./src/Components/Navigation/Screen";
import User from "./src/Components/User/User";
import Friends from "./src/Components/Friends/Friends";

const Tab = createBottomTabNavigator();

const focusColor = (focused: boolean) => (focused ? "#9681EB" : "#777");

const routeToIcon = (route: string, focused: boolean) => {
  switch (route) {
    case "Events":
      return (
        <MaterialIcons name="event" size={36} color={focusColor(focused)} />
      );
    case "Användare":
      return <FontAwesome name="user" size={36} color={focusColor(focused)} />;
    case "Vänner":
      return (
        <FontAwesome5
          name="user-friends"
          size={36}
          color={focusColor(focused)}
        />
      );
  }

  return <></>;
};

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={{ flexDirection: "row", height: 60 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          console.log(isFocused, event);
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1 }}
            key={route.name}
            onLayout={(e) => console.log(e.nativeEvent.layout)}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              {routeToIcon(route.name, isFocused)}
              <Text
                style={{
                  fontSize: 16,
                  color: focusColor(isFocused),
                  fontWeight: "900",
                }}
              >
                {route.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const EventScreen = () => <Screen renderComponent={() => <Events />} />;
const FriendScreen = () => <Screen renderComponent={() => <Friends />} />;
const UserScreen = () => <Screen renderComponent={() => <User />} />;

function Navigation() {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(e) => (
          <View style={{ paddingBottom: insets.bottom }}>{TabBar(e)}</View>
        )}
      >
        <Tab.Screen name="Events" component={EventScreen} />
        <Tab.Screen name="Vänner" component={FriendScreen} />
        <Tab.Screen name="Användare" component={UserScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;

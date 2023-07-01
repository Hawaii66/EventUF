import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Friend } from "../../Interfaces/User";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  friend: Friend;
  actions: [{ icon: React.ReactNode; onPress: () => void }];
  fullPress?: boolean;
}

function FriendRender({ friend, actions, fullPress }: Props) {
  return (
    <TouchableOpacity disabled={!fullPress} onPress={actions[0].onPress}>
      <View
        key={friend.id}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          borderColor: friend.color,
          borderWidth: 2,
          marginBottom: 8,
          borderRadius: 8,
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backgroundColor: friend.color,
            opacity: 0.6,
          }}
        />
        <Text
          style={{
            flexGrow: 1,
            fontSize: 20,
            fontWeight: "600",
            textAlign: "left",
            color: "#111",
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          {friend.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {actions.map((action) => (
            <TouchableOpacity onPress={action.onPress}>
              {action.icon}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default FriendRender;

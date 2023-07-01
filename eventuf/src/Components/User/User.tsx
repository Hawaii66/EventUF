import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ActiveUser, sid } from "../../Interfaces/User";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import FriendRender from "../Friends/FriendRender";

function User() {
  const [user, setUser] = useState<ActiveUser>({
    email: "hawaiilive@outlook.com",
    friendCount: 3,
    color: "#45CFDD",
    friends: [
      {
        friendCount: 3,
        id: "g",
        name: "Gustaf",
        color: "#FFD6A5",
        chat: [],
      },
      {
        friendCount: 1,
        id: "a",
        name: "Arvid",
        color: "#FF8989",
        chat: [],
      },
      {
        friendCount: 5,
        id: "k",
        name: "Karar",
        color: "#A2FF86",
        chat: [],
      },
    ],
    id: "s",
    name: "Sebastian",
    phoneNumber: "070-545 123",
    groups: [],
  });

  const insets = useSafeAreaInsets();

  const removeFriend = (id: sid) => {
    Alert.alert("Ta bort en vän", "Vill du verkligen ta bort en vän?", [
      {
        isPreferred: true,
        style: "cancel",
        text: "Nej",
      },
      {
        isPreferred: false,
        style: "destructive",
        text: "Ja",
        onPress: () =>
          setUser({
            ...user,
            friends: user.friends.filter((i) => i.id !== id),
          }),
      },
    ]);
  };

  return (
    <View
      style={{
        height: "100%",
        width: "95%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: insets.top * 1.5,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 36,
          color: user.color,
          fontWeight: "800",
        }}
      >
        {user.name}
      </Text>
      <View style={{ width: "95%", height: 2, backgroundColor: "#000" }} />
      <View style={{ marginVertical: 8 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#000",
            textAlign: "center",
          }}
        >
          Information
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 4,
            marginHorizontal: 8,
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              width: "25%",
              fontWeight: "800",
              fontSize: 16,
              color: "#000",
            }}
          >
            ID:{" "}
          </Text>
          <TextInput
            style={{
              flexGrow: 1,
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: "#CCC",
              fontSize: 16,
              fontWeight: "600",
              color: "#FFF",
              borderRadius: 8,
            }}
            value={user.id}
            editable={false}
            onPressIn={() => Alert.alert("ID", "Kan inte ändra ditt id")}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 4,
            marginHorizontal: 8,
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              width: "25%",
              fontWeight: "800",
              fontSize: 16,
              color: "#000",
            }}
          >
            Email:{" "}
          </Text>
          <TextInput
            style={{
              flexGrow: 1,
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: "#777",
              fontSize: 16,
              fontWeight: "600",
              color: "#FFF",
              borderRadius: 8,
            }}
            value={user.email}
            onChangeText={(e) => setUser({ ...user, email: e })}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 4,
            marginHorizontal: 8,
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              width: "25%",
              fontWeight: "800",
              fontSize: 16,
              color: "#000",
            }}
          >
            Telefon:{" "}
          </Text>
          <TextInput
            style={{
              flexGrow: 1,
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: "#777",
              fontSize: 16,
              fontWeight: "600",
              color: "#FFF",
              borderRadius: 8,
            }}
            value={user.phoneNumber}
            onChangeText={(e) => setUser({ ...user, phoneNumber: e })}
          />
        </View>
      </View>
      <View style={{ width: "95%", height: 2, backgroundColor: "#000" }} />
      <View style={{ marginTop: 8, maxHeight: "60%", width: "100%" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#000",
            textAlign: "center",
          }}
        >
          Vänner: {user.friendCount} st
        </Text>
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <FlatList
            contentContainerStyle={{ maxWidth: "75%", paddingRight: 12 }}
            data={user.friends}
            renderItem={({ item: friend }) => (
              <FriendRender
                key={friend.id}
                actions={[
                  {
                    icon: (
                      <MaterialIcons name="delete" size={24} color="black" />
                    ),
                    onPress: () => removeFriend(friend.id),
                  },
                ]}
                friend={friend}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default User;

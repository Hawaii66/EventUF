import React, { useEffect, useState } from "react";
import { Friend, Group, User } from "../../Interfaces/User";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  user: User;
  group: Group;
  friends: Friend[];
  send: (message: string) => void;
  goBack: () => void;
}

function Chat({ goBack, user, friends, group, send }: Props) {
  const [message, setMessage] = useState("");

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          position: "relative",
          paddingBottom: 8,
        }}
      >
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 16,
          }}
        >
          <View style={{ height: 24, aspectRatio: 1 }}>
            <TouchableOpacity onPress={goBack}>
              <AntDesign name="caretleft" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#000" }}>
          {group.name}
        </Text>
      </View>
      <KeyboardAvoidingView
        style={{
          width: "100%",
          height: "100%",
        }}
        behavior="height"
        keyboardVerticalOffset={40}
      >
        <View style={{ width: "90%", flexGrow: 1, marginHorizontal: 20 }}>
          <FlatList
            data={group.chat}
            renderItem={({ item: chatBubble }) => (
              <View
                style={{
                  marginVertical: 4,
                  alignSelf:
                    chatBubble.user === user.id ? "flex-end" : "flex-start",
                }}
              >
                <View
                  style={{
                    width: "60%",
                    backgroundColor:
                      chatBubble.user === user.id
                        ? "#DDE6ED"
                        : friends.find((i) => i.id === chatBubble.user)?.color, // "#A7ECEE",
                    opacity: 0.6,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    marginHorizontal: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {chatBubble.text}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#777",
                    fontSize: 12,
                    fontWeight: "500",
                    textAlign: chatBubble.user === user.id ? "right" : "left",
                  }}
                >
                  {chatBubble.user === user.id
                    ? "Jag"
                    : friends.find((i) => i.id === chatBubble.user)?.name || ""}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 36,
            maxHeight: "35%",
          }}
        >
          <View style={{ width: "90%", height: 2, backgroundColor: "#000" }} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "90%",
              gap: 4,
            }}
          >
            <TextInput
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: "#000",
                textAlign: "left",
                width: "90%",
              }}
              multiline
              placeholder="Skriv något..."
              placeholderTextColor={"#777"}
              value={message}
              onChangeText={(e) => setMessage(e)}
            />
            <TouchableOpacity
              onPress={() => {
                send(message);
                setMessage("");
                Keyboard.dismiss();
              }}
            >
              <Feather name="send" size={36} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Chat;

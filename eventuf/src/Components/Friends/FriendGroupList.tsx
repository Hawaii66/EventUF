import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { ActiveUser, Friend, User } from "../../Interfaces/User";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FriendRender from "./FriendRender";
import { Ionicons } from "@expo/vector-icons";
import NewGroup from "./NewGroup";
import { RandomFunColor } from "../../Function/Color";

interface Props {
  user: ActiveUser;
  setUser: (u: ActiveUser) => void;
  setShowFriends: (b: (b: boolean) => boolean) => void;
  chatWithFriend: (i: number) => void;
  chatWithGroup: (i: number) => void;
  showFriends: boolean;
  showGroups: boolean;
  setShowGroups: (b: (b: boolean) => boolean) => void;
  setShowCreate: (b: boolean) => void;
}

function FriendGroupList({
  user,
  setUser,
  setShowFriends,
  chatWithFriend,
  chatWithGroup,
  setShowGroups,
  showFriends,
  showGroups,
  setShowCreate,
}: Props) {
  return (
    <>
      <View
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          marginVertical: 12,
        }}
      >
        <TouchableOpacity onPress={() => setShowFriends((s) => !s)}>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 8,
              }}
            >
              <AntDesign
                name={showFriends ? "caretdown" : "caretup"}
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 24, color: "#000", fontWeight: "800" }}>
                Vänner
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                Alert.prompt("Namn", "Temporarät skapa en ny vän", (name) => {
                  setUser({
                    ...user,
                    friends: [
                      ...user.friends,
                      {
                        color: RandomFunColor(),
                        friendCount: 0,
                        id: name,
                        name: name,
                        chat: [],
                      },
                    ],
                  });
                })
              }
            >
              <Ionicons name="add-circle" size={36} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {showFriends && (
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlatList
              contentContainerStyle={{
                maxWidth: "85%",
                paddingRight: 12,
              }}
              data={user.friends}
              renderItem={({ item: friend, index: idx }) => (
                <FriendRender
                  key={friend.id}
                  friend={friend}
                  fullPress
                  actions={[
                    {
                      icon: (
                        <MaterialCommunityIcons
                          name="message-arrow-right"
                          size={28}
                          color="black"
                        />
                      ),
                      onPress: () => chatWithFriend(idx),
                    },
                  ]}
                />
              )}
            />
          </View>
        )}
      </View>
      <View
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          marginVertical: 12,
        }}
      >
        <TouchableOpacity onPress={() => setShowGroups((s) => !s)}>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 8,
              }}
            >
              <AntDesign
                name={showGroups ? "caretdown" : "caretup"}
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 24, color: "#000", fontWeight: "800" }}>
                Grupper
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowCreate(true)}>
              <Ionicons name="add-circle" size={36} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {showGroups && (
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlatList
              contentContainerStyle={{ maxWidth: "85%", paddingRight: 12 }}
              data={user.groups}
              renderItem={({ item: group, index: idx }) => (
                <TouchableOpacity onPress={() => chatWithGroup(idx)}>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      position: "relative",
                      borderColor: group.color,
                      borderWidth: 2,
                      borderRadius: 12,
                      marginVertical: 4,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundColor: group.color,
                        opacity: 0.6,
                        overflow: "hidden",
                      }}
                    />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#000",
                          fontWeight: "700",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {group.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#777",
                          fontWeight: "500",
                          paddingLeft: 12,
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {group.members.length} st i gruppen
                      </Text>
                    </View>
                    <MaterialCommunityIcons
                      name="message-arrow-right"
                      size={16 * 2}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </>
  );
}

export default FriendGroupList;

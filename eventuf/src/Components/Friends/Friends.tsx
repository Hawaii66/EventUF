import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { ActiveUser, Friend } from "../../Interfaces/User";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FriendRender from "./FriendRender";
import { Ionicons } from "@expo/vector-icons";
import NewGroup from "./NewGroup";
import { RandomFunColor } from "../../Function/Color";
import FriendGroupList from "./FriendGroupList";
import Chat from "../Chat/Chat";

const arvid: Friend = {
  friendCount: 1,
  id: "a",
  name: "Arvid",
  color: "#FF8989",
  chat: [],
};
const gustaf: Friend = {
  friendCount: 3,
  id: "g",
  name: "Gustaf",
  color: "#FFD6A5",
  chat: [],
};
const karar: Friend = {
  friendCount: 5,
  id: "k",
  name: "Karar",
  color: "#A2FF86",
  chat: [
    {
      text: "Hej",
      user: "k",
    },
    {
      text: "hallå",
      user: "s",
    },
    {
      text: "he",
      user: "s",
    },
    {
      text: "v",
      user: "k",
    },
    {
      text: "aksdöjas jsap jadspsd japs jdaj ösaj dasj lkasj lksda",
      user: "s",
    },
  ],
};

function Friends() {
  const [user, setUser] = useState<ActiveUser>({
    email: "hawaiilive@outlook.com",
    friendCount: 3,
    color: "#45CFDD",
    friends: [karar, gustaf, arvid],
    id: "s",
    name: "Sebastian",
    phoneNumber: "070-545 123",
    groups: [
      {
        color: "#1B6B93",
        name: "Madde 18 år",
        members: [
          karar,
          gustaf,
          arvid,
          {
            color: "45CFDD",
            friendCount: 3,
            id: "s",
            name: "Sebastian",
            chat: [],
          },
        ],
        chat: [
          {
            text: "Hej",
            user: "g",
          },
          {
            text: "En längre text för att testa word wrap",
            user: "a",
          },
          {
            text: "Kul med fest",
            user: "k",
          },
          {
            text: "Nu kör vi",
            user: "s",
          },
        ],
      },
    ],
  });

  const [showFriends, setShowFriends] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [chatIndex, setChatIndex] = useState(-1);

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        paddingTop: insets.top * 1.5,
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {chatIndex === -1 ? (
        <FriendGroupList
          user={user}
          setUser={(s) => setUser(s)}
          setChatIndex={setChatIndex}
          setShowCreate={setShowCreate}
          setShowFriends={setShowFriends}
          setShowGroups={setShowGroups}
          showFriends={showFriends}
          showGroups={showGroups}
        />
      ) : (
        <Chat
          send={(message) => {
            setUser({
              ...user,
              friends: [
                ...user.friends.filter((_, idx) => idx !== chatIndex),
                {
                  ...user.friends[chatIndex],
                  chat: [
                    ...user.friends[chatIndex].chat,
                    {
                      text: message,
                      user: user.id,
                    },
                  ],
                },
              ],
            });
            setChatIndex(user.friends.length - 1);
          }}
          group={{
            chat: user.friends[chatIndex].chat,
            color: user.friends[chatIndex].color,
            members: [],
            name: user.friends[chatIndex].name,
          }}
          user={user}
          friends={user.friends}
        />
      )}

      {showCreate && (
        <NewGroup
          friends={user.friends}
          onCreate={(g) => {
            setUser({ ...user, groups: [...user.groups, g] });
            setShowCreate(false);
          }}
          user={user}
        />
      )}
    </View>
  );
}

export default Friends;

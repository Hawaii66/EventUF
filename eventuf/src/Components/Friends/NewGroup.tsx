import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Friend, Group, User, sid } from "../../Interfaces/User";
import { RandomFunColor } from "../../Function/Color";

interface Props {
  friends: Friend[];
  onCreate: (group: Group) => void;
  user: User;
}

function NewGroup({ friends, onCreate, user }: Props) {
  const [name, setName] = useState("");
  const [members, setMembers] = useState<Friend[]>([
    {
      color: user.color,
      friendCount: user.friendCount,
      id: user.id,
      name: user.name,
    },
  ]);

  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "90%",
          height: "80%",
          position: "relative",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "#000",
            opacity: 0.6,
          }}
        />
        <Text>Ny grupp</Text>
        <View>
          <FlatList
            data={friends.filter((i) => !members.includes(i))}
            renderItem={({ item: friend }) => (
              <TouchableOpacity
                onPress={() => setMembers((s) => [...s, friend])}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text>{friend.name}</Text>
                  <Text>Add</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <TextInput value={name} onChangeText={(e) => setName(e)} />
        <TouchableOpacity
          onPress={() =>
            onCreate({
              chat: [],
              color: RandomFunColor(),
              members: members,
              name: name,
            })
          }
        >
          <Text>Klar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NewGroup;

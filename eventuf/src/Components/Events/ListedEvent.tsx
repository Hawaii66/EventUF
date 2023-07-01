import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { RandomFunColorIndex } from "../../Function/Color";
import { Business } from "../../Interfaces/Business";
import { Event } from "../../Interfaces/Event";

interface Props {
  event: Event;
  business: Business;
}

function ListedEvent({ event, business }: Props) {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [previousHeight, setPreviousHeight] = useState(-1);
  const [animateShow, setAnimateShow] = useState(true);
  const [showExtra, setShowExtra] = useState(false);
  const [youGoing, setYouGoing] = useState(false);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
    { width: 1, height: 1 }
  );

  const show = () => {
    Animated.timing(animatedHeight, {
      toValue: 1,
      useNativeDriver: false,
      delay: 0,
      duration: 1000,
    }).start();
    setShowExtra(true);
    setAnimateShow(true);
  };

  const updateHeight = (n: number) => {
    if (n !== previousHeight && animateShow) {
      setPreviousHeight(n);
      return;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setHeight(previousHeight), 300);

    () => clearTimeout(timer);
  }, [previousHeight]);

  const setHeight = (height: number) => {
    animatedHeight.setValue(height);
  };

  const hide = () => {
    setAnimateShow(false);
    Animated.timing(animatedHeight, {
      toValue: 0,
      useNativeDriver: false,
      delay: 0,
      duration: 500,
    }).start(() => setShowExtra(false));
  };

  return (
    <View
      style={{
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.6,
        shadowRadius: 20 * 0.6,
        minHeight: 100,
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              aspectRatio: 1,
              width: "20%",
            }}
          >
            <Image
              source={{
                uri: event.calendar.icon,
              }}
              style={{
                height: "100%",
                aspectRatio: 1,
              }}
            />
          </View>
          <View style={{ width: "80%", paddingHorizontal: 15 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: "#000",
                  fontWeight: "800",
                }}
              >
                {event.name}
              </Text>
              {event.sponsored && (
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Sponsrat Event",
                      "Eventet är sponsrat vilket betyder att det rankas högre i listor"
                    )
                  }
                >
                  <View
                    style={{
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: "#DDD",
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        opacity: 0.6,
                        backgroundColor: "#DDD",
                      }}
                    />
                    <Text style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
                      Sponsrad
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#777",
                    fontWeight: "500",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {business.name}
                </Text>
                <AntDesign name="caretright" size={12} color="#777" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginTop: 10,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <FlatList
            data={event.tags}
            horizontal
            contentContainerStyle={{
              paddingBottom: event.tags.length > 3 ? 12 : 0,
            }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: RandomFunColorIndex(index),
                  borderRadius: 999,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  marginHorizontal: 5,
                  borderWidth: 1,
                  borderColor: "#777",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#777",
                    fontWeight: "300",
                  }}
                  key={index}
                >
                  {item}
                </Text>
              </View>
            )}
          />
          <View
            style={{
              height: "100%",
              width: 2,
              backgroundColor: "#777",
              marginHorizontal: 10,
            }}
          />
          <View
            style={{
              position: "relative",
              borderWidth: 1,
              borderColor: "#777",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                backgroundColor: "#777",
                opacity: 0.6,
                height: "100%",
                width: "100%",
                position: "absolute",
                overflow: "hidden",
              }}
            />
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() => {
                showExtra ? hide() : show();
              }}
            >
              <AntDesign
                name={showExtra ? "caretup" : "caretdown"}
                size={24}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        </View>
        {showExtra && (
          <Animated.View
            style={{
              maxHeight: animatedHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000],
              }),
              marginTop: 10,
            }}
          >
            <View onLayout={(e) => updateHeight(e.nativeEvent.layout.height)}>
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        "Vänner som kommer:",
                        [
                          "Arvid",
                          "Gustaf",
                          "Jamal",
                          "Karar",
                          "Gergö",
                          "Elin",
                          "Ronja",
                          youGoing ? "Och du :D" : undefined,
                        ]
                          .filter((i) => i !== undefined)
                          .map((i) => `•${i}`)
                          .join("\n")
                      )
                    }
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        gap: 4,
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome name="users" size={20} color={"#609966"} />
                      <Text
                        style={{
                          color: "#609966",
                          fontWeight: "700",
                          fontSize: 20,
                        }}
                      >
                        {134 + (youGoing ? 1 : 0)}
                      </Text>
                      <Text
                        style={{
                          color: "#000",
                          fontWeight: "700",
                          fontSize: 20,
                        }}
                      >
                        kommer
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setYouGoing((s) => !s)}>
                    <View
                      style={{
                        position: "relative",
                        borderRadius: 8,
                        borderColor: youGoing ? "#A2FF86" : "#F7DB6A",
                        borderWidth: 2,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          backgroundColor: youGoing ? "#A2FF86" : "#F7DB6A",
                          opacity: 0.6,
                        }}
                      />
                      <Text
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 4,
                          color: "#777",
                          fontWeight: "800",
                          fontSize: 20,
                        }}
                      >
                        {youGoing ? "+1" : "Jag kommer"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 12, marginHorizontal: 8 }}>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert("Beskrivning", event.description)
                    }
                  >
                    <Text
                      numberOfLines={4}
                      style={{
                        fontSize: 16,
                        color: "#000",
                        fontWeight: "500",
                      }}
                    >
                      - {event.description}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    {event.calendar.type === "Range" && (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          gap: 4,
                        }}
                      >
                        <Image
                          source={{
                            uri: event.calendar.icon,
                          }}
                          style={{
                            height: 20,
                            aspectRatio: 1,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "500",
                            color: "#333",
                          }}
                        >
                          {new Date(event.calendar.start)
                            .toDateString()
                            .substring(4, 10)}
                          {" - "}
                          {new Date(event.calendar.end)
                            .toDateString()
                            .substring(4, 10)}
                        </Text>
                      </View>
                    )}
                    {event.calendar.type === "OneDay" && (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          minHeight: 24,
                        }}
                      >
                        <Image
                          source={{
                            uri: event.calendar.icon,
                          }}
                          style={{
                            height: 20,
                            aspectRatio: 1,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "500",
                            color: "#333",
                          }}
                        >
                          {new Date(event.calendar.day)
                            .toDateString()
                            .substring(4, 10)}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 20, fontWeight: "500", color: "#333" }}
                    >
                      {event.price === 0 ? "Gratis" : `${event.price} kr`}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 12,
                  }}
                >
                  <Image
                    onLoad={(e) =>
                      setImageSize({
                        height: e.nativeEvent.source.height,
                        width: e.nativeEvent.source.width,
                      })
                    }
                    source={{
                      uri: event.image,
                    }}
                    style={{
                      width: "95%",
                      aspectRatio: imageSize.width / imageSize.height,
                      borderRadius: 20,
                    }}
                  />
                </View>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

export default ListedEvent;

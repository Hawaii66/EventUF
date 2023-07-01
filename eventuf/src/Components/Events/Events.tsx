import React from "react";
import { View, FlatList } from "react-native";
import { Business } from "../../Interfaces/Business";
import ListedEvent from "./ListedEvent";
import { Event } from "../../Interfaces/Event";

const data: { event: Event; business: Business }[] = [
  {
    business: {
      description: "Nyköpings enskilda gymnasium ordnar visa aktiviteter",
      email: "neg@asjdas.com",
      icon: "https://yt3.googleusercontent.com/ytc/AGIKgqP5IavAuPxd5SxpkSGi0k8m0-ugiKc95ulSigx7=s176-c-k-c0x00ffffff-no-rj",
      name: "Nyköpings Enskilda Gymnasium",
      phoneNumber: "060-123-1234",
      type: "Skola",
    },
    event: {
      tags: ["Fotboll", "Gymnasie", "Enskilda", "Dricka", "Tröja"],
      attendees: 20,
      calendar: {
        type: "OneDay",
        day: 1688067483743,
        icon: "https://cdn-icons-png.flaticon.com/512/1099/1099672.png",
      },
      description:
        "Skol IF anordnar en fotbolls turnering på Rosvalla för alla elever på Nyköpings Enskilda Gymnasium. Vi bjuder på dricka och tröjor till vinande laget. Välkomen att spela fotboll!",
      image:
        "https://cached-images.bonnier.news/gcs/bilder/dn-tag/cyxxudcf3ev7piip4424mhnjzrjweb4t3lb3ufxya7vd57xxhkmq-1920x1077.jpeg?interpolation=lanczos-none&fit=around%7C1024:576&crop=1024:h;center,top&output-quality=80",
      location: {
        address: "Rosvalla till höger",
        latitude: 0,
        longitude: 0,
        name: "Rosvalla",
      },
      name: "Fotboll",
      price: 0,
      sponsored: false,
      tagline: "Spela fotboll",
    },
  },
  {
    business: {
      description: "Nyköpings enskilda gymnasium ordnar visa aktiviteter",
      email: "neg@asjdas.com",
      icon: "https://yt3.googleusercontent.com/ytc/AGIKgqP5IavAuPxd5SxpkSGi0k8m0-ugiKc95ulSigx7=s176-c-k-c0x00ffffff-no-rj",
      name: "Nyköpings Enskilda Gymnasium",
      phoneNumber: "060-123-1234",
      type: "Skola",
    },
    event: {
      tags: ["Fotboll", "Gymnasie", "Enskilda"],
      attendees: 20,
      calendar: {
        type: "Range",
        start: 1688067483743,
        end: Date.now(),
        icon: "https://cdn-icons-png.flaticon.com/512/1099/1099672.png",
      },
      description:
        "Skol IF anordnar en fotbolls turnering på Rosvalla för alla elever på Nyköpings Enskilda Gymnasium. Välkomen att spela fotboll!",
      image:
        "https://cached-images.bonnier.news/gcs/bilder/dn-tag/cyxxudcf3ev7piip4424mhnjzrjweb4t3lb3ufxya7vd57xxhkmq-1920x1077.jpeg?interpolation=lanczos-none&fit=around%7C1024:576&crop=1024:h;center,top&output-quality=80",
      location: {
        address: "Rosvalla till höger",
        latitude: 0,
        longitude: 0,
        name: "Rosvalla",
      },
      name: "Fotboll",
      price: 129,
      sponsored: true,
      tagline: "Spela fotboll",
    },
  },
];

function Events() {
  return (
    <View style={{ height: "100%", width: "95%" }}>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingTop: 40 }}
        renderItem={({ item, index }) => (
          <ListedEvent
            business={item.business}
            event={item.event}
            key={index}
          />
        )}
      />
    </View>
  );
}

export default Events;

import React from "react";
import { View, Text } from "react-native";

export default function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B1B26",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#E5E7EB", fontSize: 16, fontWeight: "700" }}>
        {title}
      </Text>
      <Text style={{ color: "#E5E7EB", marginTop: 8 }}>Cooking...</Text>
    </View>
  );
}

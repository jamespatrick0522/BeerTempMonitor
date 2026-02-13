import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function MiniHeader() {
  return (
    <LinearGradient
      colors={["#0B1B26", "#0B1B26", "rgba(6,182,212,0.08)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.06)",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#102735",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Ionicons name="person" size={18} color="#9ADAE6" />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ color: "#E5E7EB", fontSize: 14, fontWeight: "800" }}>
            Temperature Monitor
          </Text>
          <Text style={{ color: "#94A3B8", fontSize: 12, marginTop: 2 }}>
            Real-time beer container monitoring
          </Text>
        </View>

        <View
          style={{
            width: 34,
            height: 34,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="notifications-outline" size={20} color="#CBD5E1" />
          <View
            style={{
              position: "absolute",
              top: 8,
              right: 9,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#EF4444",
            }}
          />
        </View>

        <View
          style={{
            width: 34,
            height: 34,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="ellipsis-vertical" size={18} color="#CBD5E1" />
        </View>
      </View>
    </LinearGradient>
  );
}

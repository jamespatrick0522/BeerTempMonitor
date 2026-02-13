import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import type { Beer } from "../../core/types/beer";

export function BeerCard({
  beer,
  temperatureC,
}: {
  beer: Beer;
  temperatureC: number | null;
}) {
  const inRange =
    temperatureC === null
      ? null
      : temperatureC >= beer.minTempC && temperatureC <= beer.maxTempC;

  const tempColor =
    inRange === null ? "#9CA3AF" : inRange ? "#22C55E" : "#EF4444";

  const pct =
    temperatureC === null
      ? 0
      : Math.max(0, Math.min(1, temperatureC / 7)) * 100;

  return (
    <View style={styles.card}>
      <Image
        source={
          beer.imageUrl
            ? { uri: beer.imageUrl }
            : require("../../../assets/icon.png")
        }
        style={styles.image}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.title}>{beer.name}</Text>
        <Text style={styles.sub}>Current</Text>
        <Text style={styles.range}>
          Range: {beer.minTempC.toFixed(1)}°C - {beer.maxTempC.toFixed(1)}°C
        </Text>

        <View style={styles.barTrack}>
          <View
            style={[
              styles.barFill,
              { width: `${pct}%`, backgroundColor: "#22C55E" },
            ]}
          />
        </View>
      </View>

      <Text style={[styles.temp, { color: tempColor }]}>
        {temperatureC === null ? "--" : `${temperatureC.toFixed(1)}°C`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#163041",
    alignItems: "center",
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: "#0B1B26",
  },
  title: { color: "white", fontWeight: "700", fontSize: 16 },
  sub: { color: "#A7B4C0", marginTop: 4 },
  range: { color: "#A7B4C0", marginTop: 4, fontSize: 12 },
  temp: { fontSize: 16, fontWeight: "800", marginLeft: 10 },
  barTrack: {
    height: 6,
    backgroundColor: "#2A475A",
    borderRadius: 999,
    marginTop: 10,
    overflow: "hidden",
  },
  barFill: { height: 6, borderRadius: 999 },
});

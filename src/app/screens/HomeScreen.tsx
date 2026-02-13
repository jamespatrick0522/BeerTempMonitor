import React from "react";
import { View, FlatList, Text, RefreshControl, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { fetchBeers } from "../../core/api/beerApi";
import { useBeersStore } from "../../core/store/beerStore";
import { BeerCard } from "../../ui/components/BeerCard";
import MiniHeader from "../../ui/components/MiniHeader";

export default function HomeScreen({ navigation }: any) {
  const fallbackBeers = useBeersStore((s) => s.beers);

  const { data, isFetching, refetch, isError } = useQuery({
    queryKey: ["beers"],
    queryFn: () => fetchBeers("always"),
    refetchInterval: 3000,
    staleTime: 2000,
  });

  const list =
    data ??
    (isError
      ? fallbackBeers.map((b) => ({
          id: b.id,
          name: b.name,
          range: { minTempC: b.minTempC, maxTempC: b.maxTempC },
          imageUrl: b.imageUrl ?? null,
          current: { temperatureC: null, recordedAt: null, inRange: null },
        }))
      : []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1B26" }}>
      <MiniHeader />
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: "#E5E7EB",
            marginBottom: 12,
          }}
        >
          Beer Containers
        </Text>

        {isError ? (
          <Text style={{ color: "#FCA5A5", marginBottom: 10 }}>
            API unreachable. Showing fallback data.
          </Text>
        ) : null}
      </View>

      <FlatList
        contentContainerStyle={{
          padding: 16,
          paddingTop: 0,
          paddingBottom: 120,
        }}
        data={list}
        keyExtractor={(b) => b.id}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor="#E5E7EB"
          />
        }
        renderItem={({ item }) => (
          <BeerCard
            beer={{
              id: item.id,
              name: item.name,
              minTempC: item.range.minTempC,
              maxTempC: item.range.maxTempC,
              imageUrl: item.imageUrl ?? undefined,
            }}
            temperatureC={item.current.temperatureC}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      <Pressable
        onPress={() => navigation.navigate("AddBeer")}
        style={({ pressed }) => ({
          position: "absolute",
          right: 18,
          bottom: 18,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: "#06B6D4",
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.85 : 1,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        })}
      >
        <Ionicons name="add" size={30} color="#001018" />
      </Pressable>
    </View>
  );
}

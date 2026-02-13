import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBeer } from "../../core/api/beerApi";

export default function AddBeerScreen({ navigation }: any) {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [minTempC, setMinTempC] = useState("2");
  const [maxTempC, setMaxTempC] = useState("5");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createBeer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["beers"] });
      navigation.goBack();
    },
    onError: () => {
      setError("Failed to add beer. Check API URL / server is running.");
    },
  });

  const onSave = () => {
    setError(null);

    if (!name.trim()) {
      setError("Beer name is required.");
      return;
    }

    const min = Number(minTempC);
    const max = Number(maxTempC);

    if (Number.isNaN(min) || Number.isNaN(max)) {
      setError("Min/Max temperature must be numbers.");
      return;
    }
    if (min > max) {
      setError("Min temperature must be <= Max temperature.");
      return;
    }

    mutation.mutate({
      name: name.trim(),
      minTempC: min,
      maxTempC: max,
      imageUrl: imageUrl.trim() || undefined,
    });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
        Add Beer
      </Text>

      {error ? (
        <Text style={{ color: "#EF4444", marginBottom: 10 }}>{error}</Text>
      ) : null}

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Min Temp (°C)"
        value={minTempC}
        onChangeText={setMinTempC}
        keyboardType="numeric"
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Max Temp (°C)"
        value={maxTempC}
        onChangeText={setMaxTempC}
        keyboardType="numeric"
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
          marginBottom: 16,
        }}
      />

      <Pressable
        onPress={onSave}
        disabled={mutation.isPending}
        style={{
          backgroundColor: mutation.isPending ? "#94A3B8" : "#06B6D4",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {mutation.isPending ? <ActivityIndicator color="#fff" /> : null}
        <Text style={{ color: "white", fontWeight: "800" }}>
          {mutation.isPending ? "Saving..." : "Save"}
        </Text>
      </Pressable>
    </View>
  );
}

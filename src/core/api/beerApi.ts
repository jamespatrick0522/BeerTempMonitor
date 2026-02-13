import { api } from "./client";

export type BeerApiItem = {
  id: string;
  name: string;
  range: { minTempC: number; maxTempC: number };
  imageUrl?: string | null;
  current: {
    temperatureC: number | null;
    recordedAt: string | null;
    inRange: boolean | null;
  };
};

export type CreateBeerPayload = {
  name: string;
  minTempC: number;
  maxTempC: number;
  imageUrl?: string;
};

export async function createBeer(payload: CreateBeerPayload) {
  const res = await api.post("/beers", payload);
  return res.data;
}

export async function fetchBeers(
  refresh: "always" | "throttle" | "false" = "always",
) {
  const res = await api.get<BeerApiItem[]>("/beers", {
    params: { refresh },
  });
  return res.data;
}

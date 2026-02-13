import { create } from "zustand";
import type { Beer } from "../types/beer";

type State = {
  beers: Beer[];
  setBeers: (beers: Beer[]) => void;
  addBeerLocal: (beer: Beer) => void;
};

export const useBeersStore = create<State>((set) => ({
  beers: [],
  setBeers: (beers) => set({ beers }),
  addBeerLocal: (beer) => set((s) => ({ beers: [beer, ...s.beers] })),
}));

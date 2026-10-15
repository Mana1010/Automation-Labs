import { create, type StoreApi } from "zustand";

type Store = {
  isAutomating: boolean;
  setIsAutomating: (val: boolean) => void;
};

const store = (set: StoreApi<Store>["setState"]) => ({
  isAutomating: false,
  setIsAutomating: (val: boolean) => set({ isAutomating: val }),
});

export const useAppStore = create<Store>(store);

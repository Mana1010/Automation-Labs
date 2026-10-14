import { create, type StoreApi } from "zustand";

type Store = {
  isAutomating: boolean;
  toggleIsAutomating: () => void;
};

const store = (set: StoreApi<Store>["setState"]) => ({
  isAutomating: true,
  toggleIsAutomating: () =>
    set((state) => ({ isAutomating: !state.isAutomating })),
});

export const useAppStore = create<Store>(store);

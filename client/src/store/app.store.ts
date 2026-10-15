import { create, type StoreApi } from "zustand";

export type BrewResult = {
  value: string | number;
  label: string;
};

type Store = {
  isAutomating: boolean;
  setIsAutomating: (val: boolean) => void;
  /** last successful result, shown in the magic smoke above the cauldron */
  result: BrewResult | null;
  setResult: (result: BrewResult | null) => void;
  /** true for a few seconds after a failed run — the cauldron turns red */
  isFailed: boolean;
  failBrew: () => void;
};

const FAIL_DURATION = 3000;
let failTimer: ReturnType<typeof setTimeout> | undefined;

const store = (set: StoreApi<Store>["setState"]) => ({
  isAutomating: false,
  setIsAutomating: (val: boolean) => set({ isAutomating: val }),

  result: null,
  setResult: (result: BrewResult | null) => set({ result }),

  isFailed: false,
  failBrew: () => {
    clearTimeout(failTimer);
    set({ isFailed: true, result: null });
    failTimer = setTimeout(() => set({ isFailed: false }), FAIL_DURATION);
  },
});

export const useAppStore = create<Store>(store);

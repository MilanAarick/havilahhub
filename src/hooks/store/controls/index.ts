import { create } from "zustand";

interface ControlsObjectStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useControls = create<ControlsObjectStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

import { create } from "zustand";

interface UserObjectStore {
  firstName: string;
  lastName: string;
  email: string;
}

export const useUserStore = create<UserObjectStore>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
}));

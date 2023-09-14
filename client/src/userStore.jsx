import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
  user: {},
  currentChat: null,
  updateUser: (newUser) =>
    set(() => ({
      user: newUser,
    })),
  deleteUser: () =>
    set(() => ({
      user: null,
    })),
  setCurrentChat: (chat) =>
    set(() => ({
      currentChat: chat,
    })),
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "user",
    })
  )
);

export default useUserStore;

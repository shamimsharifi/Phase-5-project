import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
  user: {},
  currentChat: null,
  chatBoxes: [],
  updateUser: (newUser) => set(() => ({ user: newUser })),
  deleteUser: () => set(() => ({ user: null })),
  setCurrentChat: (chat) => set(() => ({ currentChat: chat })),
  setChatBoxes: (chatBoxes) => set(() => ({ chatBoxes })),
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "user",
    })
  )
);

export default useUserStore;

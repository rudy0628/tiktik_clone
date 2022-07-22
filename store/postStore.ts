import create from 'zustand';
import { persist } from 'zustand/middleware';

const postStore = (set: any) => ({
	isDesc: true,
	chatroomIsOpen: false,
	setIsDesc: () => set((state: any) => ({ isDesc: !state.isDesc })),
	setChatroomIsOpen: (setOpen: boolean) => set({ chatroomIsOpen: setOpen }),
});

const usePostStore = create(
	persist(postStore, {
		name: 'post',
	})
);

export default usePostStore;

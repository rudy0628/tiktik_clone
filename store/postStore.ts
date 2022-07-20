import create from 'zustand';
import { persist } from 'zustand/middleware';

const postStore = (set: any) => ({
	isDesc: true,
	setIsDesc: () => set((state: any) => ({ isDesc: !state.isDesc })),
});

const usePostStore = create(
	persist(postStore, {
		name: 'post',
	})
);

export default usePostStore;

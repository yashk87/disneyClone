import create from 'zustand';

const useStore = create((set) => ({
  loading: true,
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useStore;
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StoreState {
  loading: boolean;
  showLogin: boolean;
  showRegister: boolean;
  showForgotPassword: boolean;
  updateLoading: (loadingState: boolean) => void;
  updateShowLogin: (showState: boolean) => void;
  updateShowRegister: (showState: boolean) => void;
  updateShowForgotPassword: (showState: boolean) => void;
}

const useStore = create<StoreState>()(devtools((set) => ({
  loading: false,
  showLogin: false,
  showRegister: false,
  showForgotPassword: false,
  updateLoading: (loadingState) => set({ loading: loadingState }),
  updateShowLogin: (showState) => set({ showLogin: showState }),
  updateShowRegister: (showState) => set({ showRegister: showState }),
  updateShowForgotPassword: (showState) => set({ showForgotPassword: showState }),
})));

export default useStore;
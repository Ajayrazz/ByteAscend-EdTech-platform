import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userApi } from '../api';

export interface User {
  id: string;
  email: string;
  fullName: string;
  nickname?: string | null;
  profilePictureUrl?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  websiteUrl?: string | null;
  roles: { id: number; name: string }[] | string[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateProfilePicture: (url: string) => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (user, token) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      updateProfilePicture: (url) => set((state) => ({
        user: state.user ? { ...state.user, profilePictureUrl: url } : null
      })),
      updateProfile: async (data) => {
        try {
          const response = await userApi.put('/users/profile', data);
          set((state) => ({ user: { ...state.user, ...response.data } }));
        } catch (error) {
          console.error("Failed to update profile", error);
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

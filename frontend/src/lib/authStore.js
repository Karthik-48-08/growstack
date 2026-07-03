import { create } from 'zustand';
import { authApi } from './api';

/**
 * Auth store — persists token + user to localStorage so reloads keep you signed in.
 * The axios interceptor reads `gs_token` directly, so we just keep state in sync here.
 */
const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('gs_user') || 'null'),
  token: localStorage.getItem('gs_token') || null,
  isLoading: false,
  error: null,

  isAuthenticated: () => !!get().token,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authApi.login(email, password);
      localStorage.setItem('gs_token', data.token);
      localStorage.setItem('gs_user', JSON.stringify(data));
      set({ user: data, token: data.token, isLoading: false });
      return data;
    } catch (err) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authApi.register(payload);
      localStorage.setItem('gs_token', data.token);
      localStorage.setItem('gs_user', JSON.stringify(data));
      set({ user: data, token: data.token, isLoading: false });
      return data;
    } catch (err) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  // Refresh profile from server (useful after XP gains, badge unlocks)
  refresh: async () => {
    if (!get().token) return null;
    try {
      const { data } = await authApi.me();
      const merged = { ...get().user, ...data };
      localStorage.setItem('gs_user', JSON.stringify(merged));
      set({ user: merged });
      return merged;
    } catch (err) {
      // Interceptor handles 401; silent fail otherwise
      return null;
    }
  },

  // Update XP/level/streak locally without a roundtrip — used after socket events
  applyProgress: (nextXp, nextLevel, nextStreak, nextBadges) => {
    const u = get().user;
    if (!u) return;
    const merged = {
      ...u,
      xp: nextXp ?? u.xp,
      level: nextLevel ?? u.level,
      currentStreak: nextStreak ?? u.currentStreak,
      badges: nextBadges ?? u.badges,
    };
    localStorage.setItem('gs_user', JSON.stringify(merged));
    set({ user: merged });
  },

  logout: () => {
    localStorage.removeItem('gs_token');
    localStorage.removeItem('gs_user');
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
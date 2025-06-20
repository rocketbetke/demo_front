import { defineStore } from 'pinia';
import { generateGameToken } from '@/services/jwtService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    login(credentials) {
      this.user = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        username: credentials.username,
        balance: 10000,
        currency: 'KES'
      };
      this.isAuthenticated = true;
    },
    register(credentials) {
      this.user = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        balance: 10000,
        currency: 'KES'
      };
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
    updateBalance(amount) {
      if (this.user && amount) {
        this.user.balance = Math.max(0, this.user.balance + amount);
      }
    },
    getGameToken() {
      return this.user ? generateGameToken(this.user) : null;
    }
  }
});
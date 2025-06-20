<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg">
    <h2 class="text-2xl mb-4 text-center">Login to JetBet</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block mb-2">Username</label>
        <input v-model="username" type="text" class="w-full p-2 bg-gray-700 rounded" required>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Password</label>
        <input v-model="password" type="password" class="w-full p-2 bg-gray-700 rounded" required>
      </div>
      <button type="submit" class="w-full bg-red-500 p-2 rounded">Login</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return { authStore, router };
  },
  methods: {
    handleLogin() {
      this.authStore.login({ username: this.username, password: this.password });
      this.router.push('/crash');
    },
  },
};
</script>
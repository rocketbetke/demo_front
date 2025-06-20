<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg">
    <h2 class="text-2xl mb-4 text-center">Register for JetBet</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label class="block mb-2">Email</label>
        <input v-model="email" type="email" class="w-full p-2 bg-gray-700 rounded" required>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Password</label>
        <input v-model="password" type="password" class="w-full p-2 bg-gray-700 rounded" required>
      </div>
      <button type="submit" class="w-full bg-red-500 p-2 rounded">Register</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return { authStore, router };
  },
  methods: {
    handleRegister() {
      // Simulate registration (replace with actual API call)
      this.authStore.register({ email: this.email, password: this.password });
      this.router.push('/crash');
    },
  },
};
</script>
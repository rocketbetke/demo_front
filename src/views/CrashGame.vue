<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <header class="bg-gray-800 py-3 px-6 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-2xl font-bold text-red-500">JETBET</div>
        <div class="flex items-center space-x-4">
          <div class="bg-gray-700 px-4 py-2 rounded">
            Balance: {{ authStore.user?.balance.toLocaleString() }} KES
          </div>
          <button 
            @click="authStore.logout()"
            class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
    <main class="container mx-auto py-8 px-4">
      <div class="bg-gray-800 rounded-xl p-6 shadow-xl">
        <h1 class="text-3xl font-bold text-center mb-6 text-red-500">JETCRASH</h1>
        <div class="bg-black rounded-lg overflow-hidden">
          <iframe
            v-if="gameUrl"
            :src="gameUrl"
            width="100%"
            height="600"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <div v-else class="p-8 text-center text-gray-400">
            Loading game...
          </div>
        </div>
        <div v-if="lastWebhook" class="mt-4 p-3 bg-gray-700 rounded text-sm">
          <div class="font-medium mb-1">Last Webhook Received:</div>
          <pre class="text-xs overflow-x-auto">{{ JSON.stringify(lastWebhook, null, 2) }}</pre>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const gameUrl = ref(null);
const lastWebhook = ref(null);
const GAME_PROVIDER_URL = 'https://api.yourgameprovider.com'; // Configurable

const generateGameUrl = () => {
  const token = authStore.getGameToken();
  if (token) {
    gameUrl.value = `${GAME_PROVIDER_URL}/game?token=${token}`;
  }
};

const handleMessage = (event) => {
  try {
    if (event.origin !== GAME_PROVIDER_URL) return;
    const data = JSON.parse(event.data);
    if (data.type === 'webhook') {
      lastWebhook.value = data.payload;
      if (data.payload.status === 'won') {
        authStore.updateBalance(data.payload.payout || 0);
      } else if (data.payload.status === 'lost') {
        authStore.updateBalance(-data.payload.bet_amount || 0);
      }
    }
  } catch (e) {
    console.error('Error processing message:', e);
  }
};

onMounted(() => {
  generateGameUrl();
  window.addEventListener('message', handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
});
</script>
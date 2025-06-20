<template>
  <router-view />
</template>

<style>
/* Global styles */
body {
  @apply bg-gray-900 text-white;
}

/* Smooth scrolling for bet history */
table tbody {
  display: block;
  overflow-y: auto;
}

table thead, table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>
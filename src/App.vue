<template>
  <Navbar />
  <div class="mb-6">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import Navbar from '@/components/Navbar/Navbar.vue';
</script>

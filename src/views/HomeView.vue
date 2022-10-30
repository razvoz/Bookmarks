<template>
  <div class="widgets">
    <div class="box">
      <BookmarksWidgetContainer />
    </div>
  </div>

  <div class="m-4">
    <BookmarksTableContainer />
  </div>
</template>

<script setup lang="ts">
  import BookmarksWidgetContainer from '@/containers/BookmarksWidgetContainer.vue';
  import BookmarksTableContainer from '@/containers/BookmarksTableContainer.vue';
</script>

<style scoped>
  .widgets {
    display: flex;
    padding: 16px;
  }
  .box {
    min-width: 400px;
  }
</style>
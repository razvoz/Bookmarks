<template>
  <BookmarksTable
    :list="list"
    @onRemoveBookmark="removeBookmark"
  />
</template>

<script setup lang="ts">
  import BookmarksTable from '@/components/Bookmarks/BookmarksTable.vue';
  import type { IBookmark } from '@/types/bookmarks';

  import { onMounted, computed } from 'vue';
  import { useBookmarksStore } from '@/stores/bookmarks';

  const bookmarksStore = useBookmarksStore();

  onMounted(() => {
    bookmarksStore.loadBookmarks();
    bookmarksStore.loadTags();
  });

  const list = computed(() => {
    return [...bookmarksStore.list].sort((a: IBookmark, b: IBookmark) => {
      return +b.immediate - +a.immediate;
    });
  })

  const removeBookmark = (id: string) => {
    bookmarksStore.deleteBookmark(id);
  };
</script>

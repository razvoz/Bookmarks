<template>
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Заголовок</th>
          <th align="center">
            <fa icon="fa-star" :color="GRAY_COLOR" />
          </th>
          <th></th>
          <th align="center">
            <fa icon="fa-screwdriver-wrench" :color="GRAY_COLOR" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bookmark in list" :key="bookmark.id">
          <td>
            <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
            <br>
            {{ getDomainFromUrl(bookmark.url) }}
            <div class="field is-grouped is-grouped-multiline mt-2">
              <div v-for="(tag, index) in bookmark.tags" :key="index" class="control">
                <div class="tags has-addons">
                  <div class="tag is-light">{{ tag }}</div>
                </div>
              </div>
            </div>
          </td>
          <td align="center">
            <fa v-if="bookmark.immediate" icon="fa-star" :color="GOLD_COLOR" />
          </td>
          <td align="center">{{ bookmark.type }}</td>
          <td align="center">
            <div class="dropdown is-hoverable is-right">
              <div class="dropdown-trigger">
                <button class="button is-ghost is-small" aria-haspopup="true" aria-controls="dropdown-menu4">
                  <fa icon="fa-ellipsis-vertical" />
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                <div class="dropdown-content">
                  <a @click="removeBookmark(bookmark.id)" class="dropdown-item">
                    <div class="icon-text">
                      <div class="icon">
                        <fa icon="fa-trash" />
                      </div>
                      <span>Удалить</span>
                    </div>                    
                  </a>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script setup lang="ts">
  import { getDomainFromUrl } from '@/utils';
  import type { TBookmarks } from '@/types/bookmarks';

  const GOLD_COLOR = '#FFD700';
  const GRAY_COLOR = '#b5b5b5';

  interface Props {
    list: TBookmarks
  };

  withDefaults(defineProps<Props>(), {
    list: () => [],
  });

  const emit = defineEmits(['onRemoveBookmark']);

  const removeBookmark = (id: string) => {
    emit('onRemoveBookmark', id);
  };
</script>

<style scoped>
  .search {
    max-width: 500px;
  }
</style>
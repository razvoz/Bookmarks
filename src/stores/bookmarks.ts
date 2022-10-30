import { ref } from 'vue'
import { defineStore } from 'pinia'
import { bookmarksService } from '@/api/services';

import type { TBookmarks, TTags } from '@/types/bookmarks';

export const useBookmarksStore = defineStore('bookmarks', () => {
  const list = ref<TBookmarks>([]),
        tags = ref<TTags>([]);

  const loadBookmarks = async () => {
    await bookmarksService.getBookmarks()
      .then(resp => {
        list.value = resp;
      });  
  }

  const loadTags = async () => {
    await bookmarksService.getTags()
      .then((resp) => {
        tags.value = resp;
        console.log('INFO: Теги загружены');
      });
  }

  interface IAddBookmarkResp {
    success: boolean,
    data?: {
      id: string,
    }
  }

  const addBookmark = async (
    url: string,
    title: string,
    description: string,
    type: string,
    immediate: boolean,
    selectedTags: string[],
  ) => {
    if (list.value.find((bookmark) => bookmark.url === url)) {
      console.log('ERROR: Закладка уже существует');

      return { success: false }
    } else {
      return await bookmarksService.addBookmark(
        url,
        title,
        description,
        type,
        immediate,
        selectedTags,
      )
        .then((resp: IAddBookmarkResp) => {
          const { success, data } = resp;

          const id = data?.id || '';

          if (success) {
            list.value.push({
              id,
              url,
              title,
              description,
              type,
              immediate,
              tags: selectedTags
            });

            selectedTags.forEach((tag) => {
              if (tags.value.indexOf(tag) === -1) {
                tags.value.push(tag);
              }
            });

            console.log('INFO: Закладка успешно добавленна!');
          } else {
            console.log('ERROR: Закладка не была добавленна');
          }

          return resp;
        });
    }
  }

  const deleteBookmark = async (id: string) => {
    await bookmarksService.deleteBookmark(id)
      .then((resp) => {
        if (resp.success) {
          const item = list.value.find((el) => el.id === id);
          const itemTags = item ? item.tags : [];

          list.value = list.value.filter((el) => el.id !== id);

          itemTags.forEach((tag: string) => {
            const bookmarkWidthTag = list.value.find((bookmark) => bookmark.tags.find((t) => t === tag))
            
            if (!bookmarkWidthTag) {
              tags.value = tags.value.filter((t2) => t2 !== tag);
            }
          });

          console.log('INFO: Закладка была успешно удалена!');
        } else {
          console.log('ERROR: Закладка не была удалена');
        }
      })
  }

  return {
    list,
    tags,
    loadBookmarks,
    addBookmark,
    deleteBookmark,
    loadTags
  };
})

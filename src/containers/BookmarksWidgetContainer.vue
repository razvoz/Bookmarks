<template>
  <BookmarksWidget
    :url="url"
    :title="title"
    :description="description"
    :type="type"
    :immediate="immediate"
    :tags="bookmarksStore.tags"
    :selectedTags="selectedTags"
    :tagSelectorInputText="tagSelectorInputText"
    :urlInputFocused="isUrlInputFocused"
    :loading="loading"
    :isUrlValidated="isUrlValidated"
    :isUrlHasErrors="isUrlHasErrors"
    :isFormDisabled="isFormDisabled"
    @onChangeUrlValue="changeUrlValue"
    @onChangeTitleValue="changeTitleValue"
    @onChangeDescriptionValue="changeDescriptionValue"
    @onChangeTypeValue="changeTypeValue"
    @onChangeImmediateValue="changeImmediateValue"
    @onChangeUrlInputFocus="changeUrlInputFocus"
    @onSelectTag="selectTag"
    @onRemoveTag="removeTag"
    @onSetTagSelectorInputText="setTagSelectorInputText"
    @onPressPastButton="pastUrlFromClipboard"
    @onSubmit="submit"
    @onClear="clear"
  />
</template>

<script setup lang="ts">
  import BookmarksWidget from '@/components/Bookmarks/BookmarksWidget.vue';
  import { ref, watch, computed, nextTick } from 'vue';
  import { pastFromClipboard, isUrlStringValid } from '@/utils';
  import { pageInfoService } from '@/api/services';
  import { useBookmarksStore } from '@/stores/bookmarks';

  const bookmarksStore = useBookmarksStore();

  const url = ref(''),
        title = ref(''),
        description = ref(''),
        type = ref(''),
        immediate = ref(false),
        selectedTags = ref<string[]>([]),
        tagSelectorInputText = ref(''),
        loading = ref(false),
        isUrlTouched = ref(false),
        isUrlInputFocused = ref(false),
        isUrlRequestHasError = ref(false);

  const changeUrlValue = (value: string) => {
    url.value = value;
  };

  const changeTitleValue = (value: string) => {
    title.value = value;
  };

  const changeDescriptionValue = (value: string) => {
    description.value = value;
  };

  const changeTypeValue = (value: string) => {
    type.value = value;
  };

  const changeImmediateValue = (value: boolean) => {
    immediate.value = value;
  };

  const isUrlStringHasError = computed(() => {
    return isUrlTouched.value
      && !isUrlStringValid(url.value);
  });

  const isFormDisabled = computed(() => {
    return !isUrlTouched.value
      || isUrlStringHasError.value
      || isUrlRequestHasError.value;
  });

  const isUrlValidated = computed(() => {
    return isUrlTouched.value && !isUrlRequestHasError.value;
  });

  const isUrlHasErrors = computed(() => {
    return isUrlTouched.value
      && isUrlStringHasError.value
      || isUrlRequestHasError.value;
  });  

  watch(() => url.value, () => {
    if (!url.value) return;

    isUrlTouched.value = true;
    title.value = '';
    description.value = '';
    type.value = '';
    immediate.value = false;
    selectedTags.value = [];
    tagSelectorInputText.value = '';

    if (!isUrlStringHasError.value) {
      loadPageInfo();
    }
  });  

  const pastUrlFromClipboard = async () => {
    url.value = await pastFromClipboard();
  };

  interface IPageInfo {
    error?: boolean,
    data?: {
      title: string,
      description: string,      
    },
  }

  const loadPageInfo = async () => {
    loading.value = true;

    const resp: IPageInfo = await pageInfoService.getByUrl(url.value);

    if (resp.error) {
      isUrlRequestHasError.value = true;
    } else {
      const resultTitle = resp.data?.title || '';
      const resultDescription = resp.data?.description || '';

      title.value = resultTitle;
      description.value = resultDescription;
      isUrlRequestHasError.value = false;
    }

    loading.value = false;
    await nextTick();
    isUrlInputFocused.value = true;
  };

  const changeUrlInputFocus = (focused: boolean) => {
    isUrlInputFocused.value = focused;
  };

  const selectTag = (tag: string) => {
    selectedTags.value.push(tag);
  };

  const removeTag = (tag: string) => {
    selectedTags.value = selectedTags.value.filter((tagValue) => tagValue !== tag);
  };

  const setTagSelectorInputText = (value: string) => {
    tagSelectorInputText.value = value;
  }  

  const submit = async () => {
    loading.value = true;

    await bookmarksStore.addBookmark(
      url.value,
      title.value,
      description.value,
      type.value,
      immediate.value,
      selectedTags.value,
    )
      .then(resp => {
        if (resp.success) {
          clear();
        }
        
        loading.value = false;
      })
  }

  const clear = () => {
    url.value = '';
    title.value = '';
    description.value = '';
    type.value = '';
    immediate.value = false;
    selectedTags.value = [];
    tagSelectorInputText.value = '';
    isUrlTouched.value = false;
    isUrlRequestHasError.value = false;

    isUrlInputFocused.value = true;
  };
</script>

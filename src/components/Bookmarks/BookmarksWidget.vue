<template>
  <label class="label">Адрес страницы</label>
  <div class="field has-addons">
    <div 
      :class="{
        'control is-expanded': true,
        'is-loading': loading,
      }">
      <input
        ref="urlInput"
        v-model="urlInputValue"
        :class="{
          'input': true,
          'is-success': isUrlValidated,
          'is-danger': isUrlHasErrors,
        }"
        :disabled="loading"
        placeholder="Введите адрес страницы"
        type="text"
      >
    </div>
    <div class="control">
      <button
        @click="pastUrl"
        :class="{
          'button is-outlined': true,
          'is-success': isUrlValidated,
          'is-danger': isUrlHasErrors,          
        }"
        type="button"
      >
        <fa icon="fa-paste" />
      </button>
    </div>
  </div>

  <div class="field">
    <label class="label">Заголовок</label>
    <div :class="{
      'control': true,
      'is-loading': loading,
    }">
      <input
        v-model="titleInputValue"
        :disabled="isFormDisabled || loading"
        class="input"
        placeholder="Введите заголовок страницы"
        type="text"
      >
    </div>
  </div>

  <div class="field">
    <label class="label">Описание</label>
    <div :class="{
      'control': true,
      'is-loading': loading,
    }">
      <input
        v-model="descriptionInputValue"
        :disabled="isFormDisabled || loading"
        class="input"
        placeholder="Введите описание страницы"
        type="text"
      >
    </div>
  </div>

  <label class="label">Тип закладки</label>
  <div class="field has-addons">
    <p class="control">
      <button
        @click="changeType('article')"
        :class="{
          'button is-small': true,
          'is-info': type === 'article'
        }"
        :disabled="isFormDisabled"
      >Статья</button>
    </p>
    <p class="control">
      <button
        @click="changeType('video')"
        :class="{
          'button is-small': true,
          'is-info': type === 'video'
        }"
        :disabled="isFormDisabled"
      >Видео</button>
    </p>
    <p class="control">
      <button
        @click="changeType('music')"
        :class="{
          'button is-small': true,
          'is-info': type === 'music'
        }"
        :disabled="isFormDisabled"
      >Музыка</button>
    </p>
    <p class="control">
      <button
        @click="changeType('image')"
        :class="{
          'button is-small': true,
          'is-info': type === 'image'
        }"
        :disabled="isFormDisabled"
      >Картинка</button>
    </p>
  </div>

  <label class="label">Теги</label>
    <div class="mb-4">
      <TagSelector
        :tags="tags"
        :selectedTags="selectedTags"
        :inputText="tagSelectorInputText"
        :disabled="isFormDisabled"
        @onSelectTag="selectTag"
        @onRemoveTag="removeTag"
        @onInputText="setTagSelectorInputText"
      />
    </div>  

  <label :class="{
    'checkbox': true,
    'is-disabled': isFormDisabled
  }">
    <input v-model="immediateValue" :disabled="isFormDisabled" type="checkbox">
    Закрепить
  </label>  
  
  <div class="field is-grouped mt-5">
    <div class="control is-expanded">
      <button
        @click="submit"
        :class="{
          'button is-success is-fullwidth': true,
          'is-loading': loading,
        }"
        :disabled="isFormDisabled"
        type="button"
      >
        <div class="icon-text">
          <div class="icon">
            <fa icon="fa-file-circle-plus" />
          </div>
          <span>Добавить закладку</span>
        </div>      
      </button>
    </div>
    <div class="control">
      <button
        @click="clear"
        class="button is-light"
        type="button"
      >
        <div class="icon-text">
          <div class="icon">
            <fa icon="fa-trash" />
          </div>
          <span>Очистить</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TagSelector from '@/components/Shared/TagSelector.vue';
  import { ref, computed, watch } from 'vue';
  import { useFocus } from '@vueuse/core'

  interface Props {
    url: string,
    title: string,
    description: string,
    type: string,
    immediate: boolean,
    tags: string[],
    selectedTags: string[],
    tagSelectorInputText: string,
    loading: boolean,
    urlInputFocused: boolean,
    isFormDisabled: boolean,
    isUrlValidated: boolean,
    isUrlHasErrors: boolean,
  };

  const props = withDefaults(defineProps<Props>(), {
    url: '',
    title: '',
    description: '',
    type: '',
    immediate: false,
    tags: () => [],
    selectedTags: () => [],
    tagSelectorInputText: '',
    loading: false,
    urlInputFocused: false,
    isFormDisabled: false,
    isUrlValidated: false,
    isUrlHasErrors: false,
  });  

  const emit = defineEmits([
    'onChangeUrlValue',
    'onChangeTitleValue',
    'onChangeDescriptionValue',
    'onChangeTypeValue',
    'onChangeImmediateValue',
    'onPressPastButton',
    'onChangeUrlInputFocus',
    'onSelectTag',
    'onRemoveTag',
    'onSetTagSelectorInputText',
    'onSubmit',
    'onClear',
  ]);

  const urlInput = ref();

  const { focused } = useFocus(urlInput);

  const urlInputValue = computed({
    get() {
      return props.url;
    },
    set(value) {
      emit('onChangeUrlValue', value);
    },
  });

  const titleInputValue = computed({
    get() {
      return props.title;
    },
    set(value) {
      emit('onChangeTitleValue', value);
    },
  });

  const descriptionInputValue = computed({
    get() {
      return props.description;
    },
    set(value) {
      emit('onChangeDescriptionValue', value);
    },
  });

  const immediateValue = computed({
    get() {
      return props.immediate;
    },
    set(value) {
      emit('onChangeImmediateValue', value);
    },
  });

  const pastUrl = () => {
    emit('onPressPastButton');
  };

  watch(() => props.urlInputFocused, () => {
    focused.value = props.urlInputFocused;
  });

  watch(focused, (focused) => {
    emit('onChangeUrlInputFocus', focused);
  });

  const submit = () => {
    emit('onSubmit');
  };

  const clear = () => {
    emit('onClear');
  };

  const changeType = (type: string) => {
    emit('onChangeTypeValue', type);
  };

  const selectTag = (tag: string) => {
    emit('onSelectTag', tag);
  };

  const removeTag = (tag: string) => {
    emit('onRemoveTag', tag);
  };

  const setTagSelectorInputText = (text: string) => {
    emit('onSetTagSelectorInputText', text);
  };
</script>

<style scoped>
  .checkbox.is-disabled {
    color: #7a7a7a;
    cursor: not-allowed;
  }
</style>

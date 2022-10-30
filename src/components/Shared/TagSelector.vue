<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <Autocomplete
        :list="filteredTags"
        :value="inputText"
        :disabled="disabled"
        @onSelectValue="selectTag"
        @onInputText="setInputValue"
        @onPressEnter="addTag"
      />
    </div>
  </div>
  <div class="field is-grouped is-grouped-multiline">
    <div v-for="(tag, index) in selectedTags" :key="index" class="control">
      <div class="tags has-addons">
        <div class="tag">{{ tag }}</div>
        <div @click="removeSelectedTag(tag)" class="tag is-delete"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Autocomplete from '@/components/Shared/Autocomplete.vue';

  interface Props {
    tags: string[],
    selectedTags: string[],
    inputText: string,
    disabled: boolean,
  };

  const props = withDefaults(defineProps<Props>(), {
    tags: () => [],
    selectedTags: () => [],
    inputText: '',
    disabled: false,
  });

  const emit = defineEmits([
    'onSelectTag',
    'onRemoveTag',
    'onInputText',
  ]);

  const filteredTags = computed(() => {
    return props.tags.filter(
      (loadedTag) => !props.selectedTags.some((selectedTag) => selectedTag === loadedTag)
    );
  });  

  const selectTag = (tag: string) => {
    emit('onSelectTag', tag);
  }

  const removeSelectedTag = (tag: string) => {
    emit('onRemoveTag', tag);
  }

  const setInputValue = (val: string) => {
    emit('onInputText', val);
  }

  const addTag = () => {
    if (!props.inputText) {
      console.log('ERROR: Введите название тега');
      
      return;
    }

    const enteredValue = props.inputText.toLocaleLowerCase();    

    if (props.selectedTags.find((tag) => tag.toLocaleLowerCase() === enteredValue)) {
      console.log('ERROR: Такой тег уже выбран');

      return;
    }

    if (props.tags.find((tag) => tag.toLocaleLowerCase() === enteredValue)) {
      console.log('ERROR: Такой тег уже существует, выберите существующий');

      return;
    }

    emit('onSelectTag', props.inputText);
    emit('onInputText', '');
  }
</script>
<template>
  <input
    ref="inputField"
    v-model="inputValue"
    :disabled="disabled"
    @keyup.enter="enterPressed"
    class="input"
    type="text"
    autocomplete="off"
    placeholder="Введите текст для поиска..."
  >
</template>

<script setup lang="ts">
  import autocomplete from 'autocompleter';
  import { ref, computed, onMounted } from 'vue';

  interface Props {
    list: string[],
    value: string,
    disabled: boolean,
  }
  
  const props = withDefaults(defineProps<Props>(), {
    list: () => [],
    value: '',
    disabled: false,
  });

  const emit = defineEmits([
    'onSelectValue',
    'onInputText',
    'onPressEnter',
  ]);

  const inputField = ref();

  const inputValue = computed({
    get() {
      return props.value;
    },
    set(value) {
      emit('onInputText', value);
    },
  });

  const mappedList = computed(() => {
    return props.list.map((el) => ({
      label: el,
    }));
  });

  const selectValue = (value: string) => {
    emit('onSelectValue', value);
    emit('onInputText', '');
  }

  const enterPressed = () => {
    emit('onPressEnter');
  }

  interface IItemValue {
    label: string,
  }

  onMounted(() => {
    const input = inputField.value;

    autocomplete({
        input: input,
        fetch: (text, update) => {
          text = text.toLowerCase();
          const suggestions = mappedList.value.filter((el) => el.label.toLowerCase().startsWith(text))
          update(suggestions);
        },
        onSelect: (item: IItemValue) => {
          selectValue(item.label);
        },
        keysToIgnore: [],
        disableAutoSelect: true,
    });    
  });  
</script>

<style>
  .autocomplete {
    background-color: #fff;
    border-radius: 3px;
    -webkit-box-shadow: 3px 4px 10px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 3px 4px 10px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 3px 4px 10px 0px rgba(34, 60, 80, 0.2);    
  }

  .autocomplete div {
    padding: 4px 12px;
  }

  .autocomplete div:hover,
  .autocomplete div.selected {
    cursor: pointer;
    background-color: #f5f5f5;
  }
</style>
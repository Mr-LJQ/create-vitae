import { ref } from "vue";
import { defineStore } from "pinia";
import { serialize } from "@/utils";
import { Delta } from "@vueup/vue-quill";

export const interestsStoreDefault = {
  get content() {
    return new Delta();
  },
  get tags() {
    return new Set() as Set<string>;
  },
};

export const useInterestsStore = defineStore(
  "interests",
  () => {
    const content = ref(interestsStoreDefault.content);
    const tags = ref<Set<string>>(interestsStoreDefault.tags);
    function addTag(tag: string) {
      return tags.value.add(tag);
    }
    function hasTag(tag: string) {
      return tags.value.has(tag);
    }
    function deleteTag(tag: string) {
      return tags.value.delete(tag);
    }
    return {
      tags,
      content,
      hasTag,
      addTag,
      deleteTag,
    };
  },
  {
    persistedState: {
      serialize,
      deserialize(state: string) {
        const _state = JSON.parse(state);
        _state.content = new Delta(_state.content);
        _state.tags = new Set(_state.tags);
        return _state;
      },
    },
  },
);

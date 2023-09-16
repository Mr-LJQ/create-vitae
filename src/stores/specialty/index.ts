import { ref } from "vue";
import { defineStore } from "pinia";
import { Delta } from "@vueup/vue-quill";
import { serialize } from "@/utils";
import type { proficiency, presentation } from "@/features/editor/specialty";
export const useSpecialtyStore = defineStore(
  "specialty",
  () => {
    const content = ref(new Delta());
    const tags = ref<
      Map<
        string,
        {
          proficiency: (typeof proficiency)[number];
          presentation: (typeof presentation)[number];
        }
      >
    >(new Map());
    function addTag(tag: string) {
      return tags.value.set(tag, {
        proficiency: "一般",
        presentation: "文字",
      });
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
        _state.tags = new Map(_state.tags);
        return _state;
      },
    },
  }
);

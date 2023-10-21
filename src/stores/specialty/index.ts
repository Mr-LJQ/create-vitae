import { ref } from "vue";
import { defineStore } from "pinia";
import { Delta } from "@vueup/vue-quill";
import { serialize } from "@/utils";
import type { Proficiency, Presentation } from "@/types";

export const specialtyDefault = {
  get content() {
    return new Delta();
  },
  get tags() {
    return new Map() as Map<
      string,
      {
        proficiency: Proficiency[number];
        presentation: Presentation[number];
      }
    >;
  },
};

export const useSpecialtyStore = defineStore(
  "specialty",
  () => {
    const content = ref(specialtyDefault.content);
    const tags = ref<
      Map<
        string,
        {
          proficiency: Proficiency[number];
          presentation: Presentation[number];
        }
      >
    >(specialtyDefault.tags);
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
      deserialize(jsonData: string) {
        const state = JSON.parse(jsonData);
        state.content = new Delta(state.content);
        state.tags = new Map(state.tags);
        return state;
      },
    },
  },
);

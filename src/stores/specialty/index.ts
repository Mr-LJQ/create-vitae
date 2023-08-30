import { defineStore } from "pinia";
import { shallowRef, reactive } from "vue";
import { Delta } from "@vueup/vue-quill";
import type { proficiency, presentation } from "@/components/specialty";
export const useSpecialtyStore = defineStore("specialty", () => {
  const content = shallowRef(new Delta());
  const tags: Map<
    string,
    {
      proficiency: (typeof proficiency)[number];
      presentation: (typeof presentation)[number];
    }
  > = reactive(new Map());
  function addTag(tag: string) {
    return tags.set(tag, {
      proficiency: "一般",
      presentation: "文字",
    });
  }
  function hasTag(tag: string) {
    return tags.has(tag);
  }
  function deleteTag(tag: string) {
    return tags.delete(tag);
  }
  return {
    tags,
    content,
    hasTag,
    addTag,
    deleteTag,
  };
});

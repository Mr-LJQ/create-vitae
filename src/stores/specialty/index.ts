import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useSpecialtyStore = defineStore("specialty", () => {
  const content = ref("");
  const tags: Set<string> = reactive(new Set());
  function addNewTag(tag: string) {
    return tags.add(tag);
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
    addNewTag,
    deleteTag,
  };
});

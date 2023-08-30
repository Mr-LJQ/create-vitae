import { defineStore } from "pinia";
import { shallowRef, reactive } from "vue";
import { Delta } from "@vueup/vue-quill";

export const useCertificateStore = defineStore("certificate", () => {
  const content = shallowRef(new Delta());
  const tags: Set<string> = reactive(new Set());
  function addTag(tag: string) {
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
    addTag,
    deleteTag,
  };
});

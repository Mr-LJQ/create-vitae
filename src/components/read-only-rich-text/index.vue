<template>
  <div :class="OVERRIDE_QUILL_READ_ONLY">
    <QuillEditor
      :content="content"
      :read-only="true"
      :options="{
        modules: {
          toolbar: false,
        },
      }"
    />
  </div>
</template>
<script lang="ts" setup>
import { QuillEditor } from "@vueup/vue-quill";
import { OVERRIDE_QUILL_READ_ONLY } from "@/styles";
import { propsType } from ".";
defineOptions({
  name: "ReadOnlyRichText",
});
defineProps(propsType);
</script>

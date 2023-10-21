import { defineStore } from "pinia";
import { computed, onUnmounted, ref } from "vue";
import figure from "@/assets/images/figure.svg";

export const usePictureBlobStore = defineStore(
  "PictureBlob",
  () => {
    const picture = ref<Blob | null>(null);
    let pictureObjectURL: string | null = null;
    const pictureUrl = computed(() => {
      if (picture.value) {
        pictureObjectURL && URL.revokeObjectURL(pictureObjectURL);
        pictureObjectURL = URL.createObjectURL(picture.value);
        return pictureObjectURL;
      }
      return figure;
    });
    onUnmounted(() => {
      pictureObjectURL && URL.revokeObjectURL(pictureObjectURL);
    });
    return {
      picture,
      pictureUrl,
    };
  },
  {
    persistedState: {
      serialize(state) {
        return state;
      },
      deserialize(data) {
        return data;
      },
    },
  },
);

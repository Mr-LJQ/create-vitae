import { defineStore } from "pinia";
import { computed, onUnmounted, ref } from "vue";
import figure from "@/assets/images/figure.svg";

export const usePictureBlobStore = defineStore(
  "picture-blob",
  () => {
    /**
     * 只应该放置唯一一个state，也即只应该有 picture 这一个 state (computed、actions可多个)
     *  这是因为在 download 与 uploadJSON 的代码中，默认了该 store 只需要处理 picture 这一 state
     */
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
        /**
         * 理论上这样写是存在问题的，特别是当 localforage 回退到使用 localStorage 做本地缓存时，
         *  但是该项目本身就只支持现代浏览器，因此当需要回退到使用 localStorage 时，
         *    意味着不单单此处会出现问题，整个项目都会因为低版本浏览器而出现各种问题，
         *      因此，此处不对该问题进行处理。(该问题是：localStorage 不支持对 Blob 数据的直接缓存)
         */
        return state;
      },
      deserialize(data) {
        return data;
      },
    },
  },
);

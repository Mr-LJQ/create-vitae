import { computed, onUnmounted, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import type { StoreState } from "pinia";
import figure from "@/assets/images/figure.svg";
type AdditionalInfos = { [key in string]: string };

export const useBasicInfosStore = defineStore(
  "BasicInfos",
  () => {
    const name = ref("");
    const birth = ref<Date | null>(null); //值为 null 是可能的，例如：当用户按下 clear 时
    const phone = ref("");
    const email = ref("");
    const picture = ref<File>();
    const yearsOfWorking = ref("");
    const gender = ref("");
    const maritalStatus = ref("");
    const height = ref("");
    const weight = ref("");
    const nation = ref("");
    const nativePlace = ref("");
    const politicsStatus = ref("");
    const convertToAge = ref(false);
    const showPhoto = ref(false);
    const additionalInfos = ref<AdditionalInfos>({});
    function addInfo(key: string, value: string) {
      additionalInfos.value[key] = value;
    }
    function deleteInfo(key: string) {
      return delete additionalInfos.value[key];
    }
    function hasInfo(key: string) {
      return Object.prototype.hasOwnProperty.call(additionalInfos.value, key);
    }
    let pictureObjectURL: string | null = null;
    const pictureUrl = computed(() => {
      if (picture.value) {
        pictureObjectURL && URL.revokeObjectURL(pictureObjectURL);
        pictureObjectURL = URL.createObjectURL(picture.value);
        return pictureObjectURL;
      }
      return figure;
    });
    onMounted(() => {
      if (picture.value) {
        pictureObjectURL = URL.createObjectURL(picture.value);
      }
    });
    onUnmounted(() => {
      pictureObjectURL && URL.revokeObjectURL(pictureObjectURL);
    });
    return {
      name,
      birth,
      phone,
      email,
      picture,
      pictureUrl,
      yearsOfWorking,
      gender,
      maritalStatus,
      height,
      weight,
      nation,
      nativePlace,
      politicsStatus,
      convertToAge,
      showPhoto,
      additionalInfos,
      addInfo,
      hasInfo,
      deleteInfo,
    };
  },
  {
    persistedState: {
      serialize(state) {
        const _state = JSON.stringify(state);
        const pictureFile = state.picture;
        return {
          _state,
          pictureFile,
        };
      },
      deserialize(data) {
        const state = JSON.parse(data._state);
        state.picture = data.pictureFile;
        return state;
      },
    },
  },
);

export type State = StoreState<ReturnType<typeof useBasicInfosStore>>;

import { ref } from "vue";
import { defineStore } from "pinia";
import { omit } from "lodash";
import type { StoreState } from "pinia";
type AdditionalInfos = { [key in string]: string };

export const useBasicInfosStore = defineStore(
  "BasicInfos",
  () => {
    const name = ref("");
    const birth = ref("");
    const phone = ref("");
    const email = ref("");
    const picture = ref<File>();
    const yearsOfWorking = ref("不填");
    const gender = ref("不填");
    const maritalStatus = ref("不填");
    const height = ref("");
    const weight = ref("");
    const nation = ref("");
    const nativePlace = ref("");
    const politicsStatus = ref("不填");
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
    return {
      name,
      birth,
      phone,
      email,
      picture,
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
        let _state = JSON.stringify(state);
        let pictureFile = state.picture;
        return {
          _state,
          pictureFile,
        };
      },
      deserialize(data) {
        let state = JSON.parse(data._state);
        state.picture = data.pictureFile;
        return state;
      },
    },
  }
);

export type State = StoreState<ReturnType<typeof useBasicInfosStore>>;

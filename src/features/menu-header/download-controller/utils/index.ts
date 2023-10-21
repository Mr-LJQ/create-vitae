import {
  useInterestsStore,
  useSpecialtyStore,
  useBasicInfosStore,
  useCertificateStore,
  usePictureBlobStore,
  useCustomModuleStore,
  useModulesInfosStore,
  useJobIntentionStore,
  useConfigurationStore,
  useSelfEvaluationStore,
  useWorkExperienceStore,
  useCampusExperienceStore,
  useProjectExperienceStore,
  useInternshipExperienceStore,
  useEducationalBackgroundStore,
} from "@/stores";

function useAllStore() {
  const interestsStore = useInterestsStore();
  const specialtyStore = useSpecialtyStore();
  const basicInfosStore = useBasicInfosStore();
  const certificateStore = useCertificateStore();
  const pictureBlobStore = usePictureBlobStore();
  const customModuleStore = useCustomModuleStore();
  const modulesInfosStore = useModulesInfosStore();
  const jobIntentionStore = useJobIntentionStore();
  const configurationStore = useConfigurationStore();
  const selfEvaluationStore = useSelfEvaluationStore();
  const workExperienceStore = useWorkExperienceStore();
  const campusExperienceStore = useCampusExperienceStore();
  const projectExperienceStore = useProjectExperienceStore();
  const internshipExperienceStore = useInternshipExperienceStore();
  const educationalBackgroundStore = useEducationalBackgroundStore();
  const stores = [
    interestsStore,
    specialtyStore,
    basicInfosStore,
    certificateStore,
    customModuleStore,
    modulesInfosStore,
    jobIntentionStore,
    configurationStore,
    selfEvaluationStore,
    workExperienceStore,
    campusExperienceStore,
    projectExperienceStore,
    internshipExperienceStore,
    educationalBackgroundStore,
    /**
     * 放在最后，因为它是图片资源，将其转换为JSON后是不具有可读性，
     *  因此将其放在所生成的JSON的最后
     */
    pictureBlobStore,
  ];
  return stores;
}

export async function downloadJSON() {
  /**
   * 多种情况：
   *  该 store 为首次加载，因此本地缓存的数据还未添加到 $state
   *    - 此种情况下，需要监听 isReady ,以确保本地数据已加载完毕
   *  非首次加载，则直接从 $state 获取数据
   */
  const stores = useAllStore();
  const data = {} as Record<(typeof stores)[number]["$id"], string | null>;
  await new Promise((resolve) => {
    let count = stores.length;
    stores.forEach((item) => {
      const { isReady, writeStorageValue } = item.$persistedState;
      const id = item.$id;
      isReady().then(async () => {
        /**
         * PictureBlob 是一个blob数据，其转换为JSON需要特殊处理
         */
        if (id === "picture-blob") {
          const blob = item.$state.picture;
          data[id] = await transformBlobToJSON(blob);
        } else {
          /**
           * 使用与将数据存入本地缓存同样的写入处理，这样生成的JSON，
           *  本质上与缓存在本地缓存的数据具有一致性
           */
          data[id] = writeStorageValue(item.$state);
        }
        count--;
        if (count === 0) resolve(void 0);
      });
    });
  });
  const a = document.createElement("a");
  a.download = "vitae-data.json";
  a.style.display = "none";
  const _data = JSON.stringify(data);
  const blob = new Blob([_data], { type: "application/json" });
  a.href = URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function uploadJSON(file: File) {
  const type = file.type;
  //上传的文件类型不正确，应该向用户发出提示
  if (type !== "application/json") return;
  const text = await file.text();
  const data = JSON.parse(text);
  const stores = useAllStore();
  stores.forEach((item) => {
    const { readStorageValue } = item.$persistedState;
    const id = item.$id;
    if (id === "picture-blob") {
      const parsedData = JSON.parse(data[id]);
      const blob = JSONToBlob(parsedData);
      return item.$patch((state) => {
        state.picture = blob;
      });
    }
    /**
     * 此处调用 readStorageValue 方法，该方法与从本地缓存中读取数据所需要经过的处理一样
     */
    const _state = readStorageValue(data[id]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    item.$patch((state) => {
      /**
       * 只更新存在的state，对于不存在的进行忽略
       */
      Object.keys(state).forEach((key) => {
        state[key] = _state[key];
      });
    });
  });
}

type JSONData = {
  blobData: string;
  type: string;
};

export async function transformBlobToJSON(blob: Blob | null) {
  if (blob == null) return null;
  const type = blob.type;
  const arrayBuffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const base64 = btoa(
    String.fromCharCode.apply(null, uint8Array as unknown as number[]),
  );
  const data: JSONData = { blobData: base64, type };
  const jsonData = JSON.stringify(data);
  return jsonData;
}

export function JSONToBlob(jsonData: string | null) {
  if (jsonData == null) return null;
  const parsedData = JSON.parse(jsonData) as JSONData;
  const base64Data = parsedData.blobData;
  const decodedData = atob(base64Data);
  const decodedArray = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; ++i) {
    decodedArray[i] = decodedData.charCodeAt(i);
  }
  const restoredBlob = new Blob([decodedArray], { type: parsedData.type });
  return restoredBlob;
}

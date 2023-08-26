import { ElNotification } from "element-plus";
import type { Ref } from "vue";

interface Handler {
  hasTag: (tag: string) => boolean;
  addNewTag: (tag: string) => void;
}

export function useHandleAddCustom(
  customRef: Ref<string>,
  { hasTag, addNewTag }: Handler
) {
  return function handleAddCustom() {
    const currentTag = customRef.value.trim();
    //避免添加空项
    if (currentTag === "") {
      ElNotification.warning({
        title: "提醒",
        message: "请输入自定义标签名称",
      });
      return;
    }
    //避免重复添加
    if (hasTag(currentTag)) {
      ElNotification.warning({
        title: "提醒",
        message: `标签名称：${currentTag},已经添加，重复添加无效。`,
      });
      return;
    }
    addNewTag(currentTag);
    //清空，以便于用户再次输入
    customRef.value = "";
  };
}
export function useHandleToggleTag({
  hasTag,
  addNewTag,
  deleteTag,
}: Handler & {
  deleteTag: (tag: string) => boolean;
}) {
  return function handleToggleTag(tag: string) {
    if (hasTag(tag)) {
      deleteTag(tag);
    } else {
      addNewTag(tag);
    }
  };
}

/**
 * 此处的目的是为了使得引用更加方便，允许直接使用 "@/components" 这样的短路径进行引用
 *  但是这可能会导致一个问题，那便是异步加载的代码，因为在这里被引用，因此导致其被同步加载，
 *  那样的话，异步加载的效果就无法实现。
 */
export * from "./tabs";
export * from "./buttons";
export * from "./popover";
export * from "./share-modules";
import EditInput from "./edit-input/index.vue";
import EditSwitch from "./edit-switch/index.vue";
import EditInputItem from "./edit-input-item/index.vue";
/**
 * 注意，异步加载的组件不能够在该文件中同步引入，
 * 否则它会在此处的引用中进行加载，最终导致异步加载无法得到想要的效果
 */
//import PictureCropper from "./picture-cropper/index.vue";

import RichTextEditor from "./rich-text-editor/index.vue";
import ShowCheckedTags from "./show-checked-tags/index.vue";
import ReadOnlyRichText from "./read-only-rich-text/index.vue";

export {
  EditInput,
  EditSwitch,
  EditInputItem,
  RichTextEditor,
  //PictureCropper,
  ShowCheckedTags,
  ReadOnlyRichText,
};

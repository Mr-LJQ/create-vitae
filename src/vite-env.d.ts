/// <reference types="vite/client" />
declare module "element-plus/dist/locale/zh-cn.mjs";
/**
 * 这主要用于清除一个怪异的 implicitly has an 'any' type. 类型报错，
 *  这个报错的文件位于第三方库 vue-cropper 内部的代码之中，其中的某条引入语句：
 *    import VueCropper from './vue-cropper.vue'
 *  导致了该报错的发生，我为该报错感到奇怪。
 */
declare module "*/vue-cropper.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

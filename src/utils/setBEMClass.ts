/**
 * 该函数用于生成 BEM 格式的 class,
 * 此方法设置的类型应该与 Sass 上的 BEM混合(@mixin)相匹配
 */

const element_separator = "__";
const modifier_separator = "--";

function _bem(block: string, element?: string, modifier?: string) {
  let result = "";
  if (block) {
    result += block;
  }
  if (element) {
    result += element_separator + element;
  }
  if (modifier) {
    result += modifier_separator + modifier;
  }
  return result;
}

export function setBEMClass(block: string) {
  const __bem = _bem.bind(null, block);
  //只有 b 部分的类名，例如： .edit
  const b = () => __bem();
  //有 be 部分的类名： .edit__label
  const be = (element: string) => __bem(element);
  //有 bm 部分的类名： .edit--left
  const bm = (modifier: string) => __bem(void 0, modifier);
  //有 bem 部分的类名： .edit__label--left
  const bem = (element: string, modifier: string) => __bem(element, modifier);

  return { b, be, bm, bem };
}

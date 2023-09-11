import type { AnyFunction } from "@/types";
export function moveOneStep(index: number, to: -1 | 1, targetArray: any[]) {
  let targetIndex = index + to;
  if (targetIndex < 0) return;
  if (targetIndex >= targetArray.length) return;
  swap(index, targetIndex, targetArray);
}

export function swap(i: number, j: number, arr: any[]) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function createDragThrottle() {
  let sign = 0;
  let prevTime = 0;
  return (callback: AnyFunction, wait: number, i: number, j: number) => {
    /**
     * 拖动的时候因为会触发过渡动画，而过渡动画会导致元素移动，而元素移动会导致 dragenter 被触发，
     *  进而导致一种“鬼畜”的动画效果，那是因为 dragenter 改变数据，数据改变UI,UI动画再次触发 dragenter，
     *  这形成了某种递归，所以动画效果频繁触发，形成“鬼畜”的动画效果。
     * 此处的解决方案是，通过 currentIndex 与 index 生成唯一的 sign,当两次dragenter间的 sign 相同时，
     *  这进行节流，节流的频率就是动画所需要的持续时间，这样就避免了动画过程中触发 dragenter 所导致的递归
     *  另一方面，当 sign 不同的时候，无需进行节流。节流的目的是阻止递归，避免“鬼畜”动画的出现。
     */

    //sign 的计算方法意味着 任意两个整数 i,j,无论他们的位置如何互换，它们计算出来的 sign 总是唯一的
    //这里实际上存在一个隐性BUG,当 i,j 大于 1 << 16 时，不能够继续保证唯一性，
    //  但是该BUG基本上是不可能触发的，因为触发该BUG意味着用户要在列表中生成 65536 项，
    //  而这么多项本身就是一种错误用法
    let _sign = Math.max(i, j) + (Math.min(i, j) << 16);
    if (_sign !== sign) {
      prevTime = 0; //使得 callback 能够马上被调用
      sign = _sign;
    }
    let currTime = Date.now();
    if (currTime - prevTime >= wait) {
      prevTime = currTime;
      callback();
    }
  };
}

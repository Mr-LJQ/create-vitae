// Credit:
//  - https://stackoverflow.com/a/30753870
const focusableSelector = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
]
  .map(
    process.env.NODE_ENV === "test"
      ? // TODO: Remove this once JSDOM fixes the issue where an element that is
        // "hidden" can be the document.activeElement, because this is not possible
        // in real browsers.
        (selector) =>
          `${selector}:not([tabindex='-1']):not([style*='display: none'])`
      : (selector) => `${selector}:not([tabindex='-1'])`,
  )
  .join(",");

export enum Focus {
  /** Focus the first non-disabled element */
  First = 1 << 0,

  /** Focus the previous non-disabled element */
  Previous = 1 << 1,

  /** Focus the next non-disabled element */
  Next = 1 << 2,

  /** Focus the last non-disabled element */
  Last = 1 << 3,

  /** Wrap tab around */
  WrapAround = 1 << 4,

  /** Prevent scrolling the focusable elements into view */
  NoScroll = 1 << 5,
}

export enum FocusResult {
  Error,
  Overflow,
  Success,
  Underflow,
}

enum Direction {
  Previous = -1,
  Next = 1,
}

/**
 * 获取 container 内部所有可聚焦元素,并根据其按下 Tab 键时聚焦的先后顺序排序
 * @param container
 * @returns 排序后的可聚焦元素数组，下标小的先聚焦
 */
export function getFocusableElements(
  container: HTMLElement | null = document.body,
) {
  if (container == null) return [];
  //升序排列，tabIndex 小的值在前，大的值在后，值为 0/不设置 的全都在最后
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  ).sort(
    // We want to move `:tabindex="0"` to the end of the list, this is what the browser does as well.
    (a, z) =>
      Math.sign(
        (a.tabIndex || Number.MAX_SAFE_INTEGER) -
          (z.tabIndex || Number.MAX_SAFE_INTEGER),
      ),
  );
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
const selectableSelector = ["textarea", "input"].join(",");
function isSelectableElement(
  element: Element | null,
): element is HTMLInputElement | HTMLTextAreaElement {
  return element?.matches?.(selectableSelector) ?? false;
}

export function sortByDomNode<T>(
  nodes: T[],
  resolveKey: (item: T) => HTMLElement | null = (i) =>
    i as unknown as HTMLElement | null,
): T[] {
  return nodes.slice().sort((aItem, zItem) => {
    const a = resolveKey(aItem);
    const z = resolveKey(zItem);

    if (a === null || z === null) return 0;

    const position = a.compareDocumentPosition(z);

    if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });
}

export function focusIn(container: HTMLElement | HTMLElement[], focus: Focus) {
  const ownerDocument =
    (Array.isArray(container)
      ? container.length > 0
        ? container[0].ownerDocument
        : document
      : container?.ownerDocument) ?? document;

  const elements = Array.isArray(container)
    ? container
    : getFocusableElements(container);

  const relativeTo = ownerDocument.activeElement as HTMLElement;

  const direction = (() => {
    //如果第一个 Tab 无法聚焦，则应该向下一个 Tab 寻找
    if (focus & (Focus.First | Focus.Next)) return Direction.Next;
    //如果最后一个 Tab 无法聚焦，则应该向上一个 Tab 寻找
    if (focus & (Focus.Previous | Focus.Last)) return Direction.Previous;
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
      );
    }
  })()!;

  const startIndex = (() => {
    if (focus & Focus.First) return 0;
    //Math.max(0) 的作用是：当焦点在 Tabs 以外的地方时，聚焦于第一个 Tab(即下标为 0)
    if (focus & Focus.Previous)
      return Math.max(0, elements.indexOf(relativeTo)) - 1;
    if (focus & Focus.Next)
      return Math.max(0, elements.indexOf(relativeTo)) + 1;
    if (focus & Focus.Last) return elements.length - 1;

    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
      );
    }
  })()!;

  const focusOptions = focus & Focus.NoScroll ? { preventScroll: true } : {};

  let offset = 0;
  const total = elements.length;
  let next = undefined;
  do {
    // Guard against infinite loops
    if (offset >= total || offset + total <= 0) return FocusResult.Error;

    let nextIdx = startIndex + offset;

    if (focus & Focus.WrapAround) {
      nextIdx = (nextIdx + total) % total;
    } else {
      if (nextIdx < 0) return FocusResult.Underflow;
      if (nextIdx >= total) return FocusResult.Overflow;
    }

    next = elements[nextIdx];

    // Try the focus the next element, might not work if it is "hidden" to the user.
    next?.focus(focusOptions);

    // Try the next one in line
    offset += direction;
  } while (next !== ownerDocument.activeElement); //焦点更改成功，则不在继续循环

  if (focus & (Focus.Next | Focus.Previous) && isSelectableElement(next)) {
    next.select();
  }

  return FocusResult.Success;
}

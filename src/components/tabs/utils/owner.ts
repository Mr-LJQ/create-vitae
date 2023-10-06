import { type Ref, isRef } from "vue";
import { dom } from "./dom";

export function getOwnerDocument<T extends Element | Ref<Element | null>>(
  element: T | null | undefined,
) {
  if (element == null) return null;
  if (element instanceof Node) return element.ownerDocument;
  if (isRef(element)) {
    const domElement = dom(element);
    if (domElement) return domElement.ownerDocument;
  }

  return document;
}

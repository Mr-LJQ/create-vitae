import {
  cloneVNode,
  Fragment,
  h,
  RendererElement,
  RendererNode,
  type Slots,
  type VNode,
} from "vue";

export enum Features {
  /** No features at all */
  None = 0,

  /**
   * When used, this will allow us to use one of the render strategies.
   *
   * **The render strategies are:**
   *    - **Unmount**   _(Will unmount the component.)_
   *    - **Hidden**    _(Will hide the component using the [hidden] attribute.)_
   */
  RenderStrategy = 1,

  /**
   * When used, this will allow the user of our component to be in control. This can be used when
   * you want to transition based on some state.
   */
  Static = 2,
}

export enum RenderStrategy {
  Unmount,
  Hidden,
}

export function render({
  ourProps,
  theirProps,
  visible = true,
  ...main
}: {
  slots: Slots;
  name: string;
  slot: Record<string, unknown>;
  attrs: Record<string, unknown>;
  ourProps: Record<string, unknown>;
  theirProps: Record<string, unknown>;
} & {
  visible?: boolean;
}) {
  const props = mergeProps(theirProps, ourProps);
  const mainWithProps = Object.assign(main, { props });

  // Visible always render
  if (visible) return _render(mainWithProps);
  return _render({
    ...main,
    props: { ...props, hidden: true, style: { display: "none" } },
  });
}

function _render({
  props,
  attrs,
  slots,
  slot,
  name,
}: {
  props: Record<string, unknown>;
  slot: Record<string, unknown>;
  attrs: Record<string, unknown>;
  slots: Slots;
  name: string;
}) {
  const { as, ...incomingProps } = props;

  let children = slots.default?.(slot);

  if (as === "template") {
    children = flattenFragments(children ?? []);

    if (
      Object.keys(incomingProps).length > 0 ||
      Object.keys(attrs).length > 0
    ) {
      const [firstChild, ...other] = children ?? [];

      //如果并非有且仅有一个有效子元素，则报错。因为不知道应该将相关参数传递给谁
      if (!isValidElement(firstChild) || other.length > 0) {
        throw new Error(
          [
            'Passing props on "template"!',
            "",
            `The current component <${name} /> is rendering a "template".`,
            `However we need to passthrough the following props:`,
            Object.keys(incomingProps)
              .concat(Object.keys(attrs))
              .map((name) => name.trim())
              .filter((current, idx, all) => all.indexOf(current) === idx)
              .sort((a, z) => a.localeCompare(z))
              .map((line) => `  - ${line}`)
              .join("\n"),
            "",
            "You can apply a few solutions:",
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',
              "Render a single element as the child so that we can forward the props onto that element.",
            ]
              .map((line) => `  - ${line}`)
              .join("\n"),
          ].join("\n"),
        );
      }

      const mergedProps = mergeProps(firstChild.props ?? {}, incomingProps);
      const cloned = cloneVNode(firstChild, mergedProps, true);
      // Explicitly override props starting with `on`. This is for event handlers, but there are
      // scenario's where we set them to `undefined` explicitly (when `aria-disabled="true"` is
      // happening instead of `disabled`). But cloneVNode doesn't like overriding `onXXX` props so
      // we have to do it manually.
      //手动重写事件相关属性，因为 cloneVNode 函数只添加额外的属性，
      // 而并非覆盖，因此此处手动覆盖事件相关属性
      for (const prop in mergedProps) {
        if (prop.startsWith("on")) {
          cloned.props ||= {};
          cloned.props[prop] = mergedProps[prop];
        }
      }
      return cloned;
    }

    if (Array.isArray(children) && children.length === 1) {
      return children[0];
    }

    return children;
  }

  return h(as as Parameters<typeof h>[0], Object.assign({}, incomingProps), {
    default: () => children,
  });
}

/**
 * 递归解开 <template> 嵌套
 * @returns
 */
function flattenFragments(children: VNode[]): VNode[] {
  return children.flatMap((child) => {
    if (child.type === Fragment) {
      return flattenFragments(child.children as VNode[]);
    }

    return [child];
  });
}

type EventCallbackType = (
  event: { defaultPrevented: boolean },
  ...args: unknown[]
) => void | undefined;

function mergeProps(...listOfProps: Record<string, unknown>[]) {
  if (listOfProps.length === 0) return {};
  if (listOfProps.length === 1) return listOfProps[0];

  const target: Record<string, unknown> = {};

  const eventHandlers: Record<string, EventCallbackType[]> = {};

  for (const props of listOfProps) {
    for (const prop in props) {
      // Collect event handlers
      if (prop.startsWith("on") && typeof props[prop] === "function") {
        eventHandlers[prop] ??= [];
        eventHandlers[prop].push(props[prop] as EventCallbackType);
      } else {
        // Override incoming prop
        target[prop] = props[prop];
      }
    }
  }

  // Do not attach any event handlers when there is a `disabled` or `aria-disabled` prop set.
  if (target.disabled || target["aria-disabled"]) {
    return Object.assign(
      target,
      // Set all event listeners that we collected to `undefined`. This is
      // important because of the `cloneElement` from above, which merges the
      // existing and new props, they don't just override therefore we have to
      // explicitly nullify them.
      Object.fromEntries(
        Object.keys(eventHandlers).map((eventName) => [eventName, undefined]),
      ),
    );
  }

  // Merge event handlers
  for (const eventName in eventHandlers) {
    Object.assign(target, {
      [eventName](event: { defaultPrevented: boolean }, ...args: unknown[]) {
        const handlers = eventHandlers[eventName];

        for (const handler of handlers) {
          if (event instanceof Event && event.defaultPrevented) {
            return;
          }

          handler(event, ...args);
        }
      },
    });
  }

  return target;
}

function isValidElement(
  input: VNode<
    RendererNode,
    RendererElement,
    {
      [key: string]: unknown;
    }
  >,
): boolean {
  if (input == null) return false; // No children
  if (typeof input.type === "string") return true; // 'div', 'span', ...
  if (typeof input.type === "object") return true; // Other components
  if (typeof input.type === "function") return true; // Built-ins like Transition
  return false; // Comments, strings, ...
}

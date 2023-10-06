import {
  ref,
  inject,
  provide,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
  defineComponent,
  type InjectionKey,
  type Ref,
} from "vue";
import { omit } from "lodash";
import {
  dom,
  Keys,
  match,
  Focus,
  render,
  focusIn,
  microTask,
  FocusResult,
  sortByDomNode,
  getOwnerDocument,
  useResolveButtonType,
} from "./utils";

enum Direction {
  Forwards,
  Backwards,
}

enum Ordering {
  Less = -1,
  Equal = 0,
  Greater = 1,
}

type StateDefinition = {
  // State
  selectedIndex: Ref<number | null>;
  orientation: Ref<"vertical" | "horizontal">;
  activation: Ref<"auto" | "manual">;

  tabs: Ref<Ref<HTMLElement | null>[]>;
  panels: Ref<Ref<HTMLElement | null>[]>;

  // State mutators
  setSelectedIndex(index: number): void;
  registerTab(tab: Ref<HTMLElement | null>): void;
  unregisterTab(tab: Ref<HTMLElement | null>): void;
  updateTab(tab: Ref<HTMLElement | null>): void;
  registerPanel(panel: Ref<HTMLElement | null>): void;
  unregisterPanel(panel: Ref<HTMLElement | null>): void;
  updatePanel(panel: Ref<HTMLElement | null>): void;
};
function createUseContext<T>(_context: InjectionKey<T>, parentName: string) {
  return (component: string) => {
    const context = inject(_context, null);

    if (context === null) {
      const err = new Error(
        `<${component} /> is missing a parent <${parentName} /> component.`,
      );
      throw err;
    }

    return context;
  };
}
const TabsContext = Symbol("TabsContext") as InjectionKey<StateDefinition>;
const useTabsContext = createUseContext(TabsContext, "TabGroup");

type PanelsDefinition = {
  lazy: boolean;
};
const TabPanelsContext = Symbol(
  "TabPanelsContext",
) as InjectionKey<PanelsDefinition>;
const useTabPanelsContext = createUseContext(TabPanelsContext, "TabPanels");

let id = 0;
function getId() {
  return id++;
}
// ---
const UPDATE_MODEL_VALUE = "update:modelValue";
export const TabGroup = defineComponent({
  name: "TabGroup",
  emits: {
    change: (index: number) => typeof index === "number",
    [UPDATE_MODEL_VALUE]: (value: number) => typeof value === "number",
  },

  props: {
    manual: { type: [Boolean], default: false },
    defaultIndex: { type: [Number], default: 0 },
    modelValue: { type: [Number], default: null },
    vertical: { type: [Boolean], default: false },
    as: { type: [Object, String], default: "template" },
  },
  inheritAttrs: false,
  setup(props, { slots, attrs, emit }) {
    const internalIndex: Ref<number> = ref(props.defaultIndex);
    const selectedIndex = computed({
      get() {
        if (props.modelValue == null) {
          return internalIndex.value;
        }
        return props.modelValue;
      },
      set(val) {
        if (props.modelValue == null) {
          return (internalIndex.value = val);
        }
        emit(UPDATE_MODEL_VALUE, val);
      },
    });
    const tabs: StateDefinition["tabs"] = ref([]);
    const panels: StateDefinition["panels"] = ref([]);

    /**
     * 主要用于处理越界回归问题
     */
    function setSelectedIndex(indexToSet: number) {
      const focusableTabs = tabs.value.filter(
        (tab) => !dom(tab)?.hasAttribute("disabled"),
      );

      /**
       * 此处解决的问题是：让用户在切换tab时，如果 tab 超出范围则聚焦到第一个/最后一个
       *  解决的是越界切换 tab 的问题
       */
      if (
        // Underflow
        indexToSet < 0 ||
        // Overflow
        indexToSet > tabs.value.length - 1
      ) {
        const direction = match(
          selectedIndex.value === null // Not set yet
            ? Ordering.Equal
            : Math.sign(indexToSet - selectedIndex.value!),
          {
            [Ordering.Less]: () => Direction.Backwards, //新参小于旧值
            [Ordering.Equal]: () => {
              return match(Math.sign(indexToSet), {
                [Ordering.Less]: () => Direction.Forwards, //非零小数在前
                [Ordering.Equal]: () => Direction.Forwards, //零在前
                [Ordering.Greater]: () => Direction.Backwards, //非零正数在后
              });
            },
            [Ordering.Greater]: () => Direction.Forwards, //新参大于旧值
          },
        );

        const nextSelectedIndex = match(direction, {
          [Direction.Forwards]: () => tabs.value.indexOf(focusableTabs[0]),
          [Direction.Backwards]: () =>
            tabs.value.indexOf(focusableTabs[focusableTabs.length - 1]),
        });
        //存在一种情况是，如果所有元素不可聚焦，则 nextSelectedIndex === -1
        if (nextSelectedIndex !== -1) {
          selectedIndex.value = nextSelectedIndex;
        }
      }

      // Middle
      else {
        const before = tabs.value.slice(0, indexToSet);
        const after = tabs.value.slice(indexToSet);

        const next = [...after, ...before].find((tab) =>
          focusableTabs.includes(tab),
        );
        //没有任何可聚焦的 tab
        if (!next) return;

        let localSelectedIndex = tabs.value.indexOf(next);
        if (localSelectedIndex === -1)
          localSelectedIndex = api.selectedIndex.value;

        //改变当前被选中的元素
        selectedIndex.value = localSelectedIndex;
      }
    }
    let sortedTab: StateDefinition["tabs"]["value"] | null = null;
    let sortedPanel: StateDefinition["panels"]["value"] | null = null;
    const api = {
      selectedIndex,
      orientation: computed(() => (props.vertical ? "vertical" : "horizontal")),
      //通过键盘切换 tab 时，是否需要用户手动按下 Space、Enter 才进行内容的切换
      activation: computed(() => (props.manual ? "manual" : "auto")),
      tabs,
      panels,
      setSelectedIndex(index: number) {
        const prevSelectedIndex = selectedIndex.value;
        /**
         * 只在通过 Tabs 改变 index 的时候进行越界校正
         * 如果是用户直接提供的 modelValue 越界，则不进行校正
         */
        setSelectedIndex(index);
        if (prevSelectedIndex !== selectedIndex.value)
          emit("change", selectedIndex.value);
      },

      registerTab(tab: (typeof tabs)["value"][number]) {
        if (tabs.value.includes(tab)) return;
        const activeTab = tabs.value[selectedIndex.value];

        tabs.value.push(tab);
        tabs.value = sortByDomNode(tabs.value, dom);
        //排完序后重新定位到正确的index
        //主要用于 插入随机位置的新的 tab 时，能够重新定位正确的选中 tab
        const localSelectedIndex = tabs.value.indexOf(activeTab);
        if (localSelectedIndex !== -1) {
          selectedIndex.value = localSelectedIndex;
        }
        //存在 -1 的可能性，此时 相关位置的 Tab 还未创建
      },
      unregisterTab(tab: (typeof tabs)["value"][number]) {
        const activeTab = tabs.value[selectedIndex.value];
        const idx = tabs.value.indexOf(tab);
        if (idx !== -1) tabs.value.splice(idx, 1);

        //重新定位到正确的index
        const localSelectedIndex = tabs.value.indexOf(activeTab);
        if (localSelectedIndex !== -1) {
          selectedIndex.value = localSelectedIndex;
        }
        //存在值是 -1 的可能性，此时原先聚焦的 Tab 被移除
      },
      updateTab(tab: (typeof tabs)["value"][number]) {
        // tab 顺序发生改变时，所有 tab 的 onUpdated 都会触发
        // 而此时每次执行 sortByDomNode 得到的结果都是一样的
        // 因此，下面的写法是为了缓存，避免重复触发
        if (sortedTab == null) {
          sortedTab = sortByDomNode(tabs.value, dom);
          microTask(() => {
            sortedTab = null;
          });
        }
        const oldIndex = tabs.value.indexOf(tab);
        const newIndex = sortedTab.indexOf(tab);
        if (oldIndex !== newIndex) {
          const activeTab = tabs.value[selectedIndex.value!];
          tabs.value = sortedTab;
          const localSelectedIndex = tabs.value.indexOf(activeTab);
          //不确定是否会出现 -1 的情况，因此使用保守的写法，保留下面的判断
          if (localSelectedIndex !== -1) {
            selectedIndex.value = localSelectedIndex;
          }
        }
      },

      registerPanel(panel: (typeof panels)["value"][number]) {
        if (panels.value.includes(panel)) return;
        panels.value.push(panel);
        panels.value = sortByDomNode(panels.value, dom);
      },
      unregisterPanel(panel: (typeof panels)["value"][number]) {
        const idx = panels.value.indexOf(panel);
        if (idx !== -1) panels.value.splice(idx, 1);
      },
      updatePanel(panel: (typeof panels)["value"][number]) {
        // tab 顺序发生改变时，所有 tab 的 onUpdated 都会触发
        // 而此时每次执行 sortByDomNode 得到的结果都是一样的
        // 因此，下面的写法是为了缓存，避免重复触发
        if (sortedPanel == null) {
          sortedPanel = sortByDomNode(panels.value, dom);
          microTask(() => {
            sortedPanel = null;
          });
        }
        const oldIndex = panels.value.indexOf(panel);
        const newIndex = sortedPanel.indexOf(panel);
        if (oldIndex !== newIndex) {
          panels.value = sortedPanel;
        }
      },
    };

    provide(TabsContext, api);

    return () => {
      const slot = { selectedIndex: selectedIndex.value };
      return render({
        theirProps: {
          ...attrs,
          ...omit(props, [
            "modelValue",
            "defaultIndex",
            "manual",
            "vertical",
            "onChange",
            UPDATE_MODEL_VALUE,
          ]),
        },
        ourProps: {},
        slot,
        slots, //实际上只有默认插槽
        attrs,
        name: "TabGroup",
      });
    };
  },
});

// ---

export const TabList = defineComponent({
  name: "TabList",
  props: {
    as: { type: [Object, String], default: "div" },
  },
  setup(props, { attrs, slots }) {
    const api = useTabsContext("TabList");
    return () => {
      const slot = { selectedIndex: api.selectedIndex.value };
      const ourProps = {
        role: "tablist",
        "aria-orientation": api.orientation.value,
      };
      const theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name: "TabList",
      });
    };
  },
});

// ---

export const Tab = defineComponent({
  name: "Tab",
  props: {
    disabled: { type: [Boolean], default: false },
    as: { type: [Object, String], default: "button" },
    id: { type: String, default: () => `tabs-tab-${getId()}` },
  },
  setup(props, { attrs, slots, expose }) {
    const api = useTabsContext("Tab");
    const internalTabRef = ref<HTMLElement | null>(null);
    expose({ el: internalTabRef, $el: internalTabRef });

    onUpdated(() => api.updateTab(internalTabRef));
    onMounted(() => api.registerTab(internalTabRef));
    onUnmounted(() => api.unregisterTab(internalTabRef));
    const myIndex = computed(() => {
      return api.tabs.value.indexOf(internalTabRef);
    });
    const selected = computed(() => myIndex.value === api.selectedIndex.value);

    /**
     * 将 selectedIndex 切换为当前聚焦的元素
     */
    function activateUsing(cb: () => FocusResult) {
      const result = cb();

      if (result === FocusResult.Success && api.activation.value === "auto") {
        const newTab = getOwnerDocument(internalTabRef)?.activeElement;
        const idx = api.tabs.value.findIndex((tab) => dom(tab) === newTab);
        if (idx !== -1) api.setSelectedIndex(idx);
      }
      return result;
    }

    /**
     * 根据用户的键盘操纵切换 Tab
     */
    function handleKeyDown(event: KeyboardEvent) {
      const list = api.tabs.value
        .map((tab) => dom(tab))
        .filter(Boolean) as HTMLElement[];

      //选中 tab
      if (event.key === Keys.Space || event.key === Keys.Enter) {
        event.preventDefault();
        event.stopPropagation();

        api.setSelectedIndex(myIndex.value);
        return;
      }

      //提供一种能力，使用户可以通过键盘直接选中第一个 tab 或者 最后一个 tab
      switch (event.key) {
        case Keys.Home:
        case Keys.PageUp:
          event.preventDefault();
          event.stopPropagation();
          // focusIn 的作用是：根据 第二个参数 Focus，确定下一个被聚焦的 Tab.
          // activateUsing 则是根据被聚焦的 Tab，来赋值 selectedIndex.
          return activateUsing(() => focusIn(list, Focus.First));

        case Keys.End:
        case Keys.PageDown:
          event.preventDefault();
          event.stopPropagation();
          return activateUsing(() => focusIn(list, Focus.Last));
      }

      //通过方向键切换 tab,根据垂直与水平的不同，通过不同的方向键来进行切换
      const result = activateUsing(() =>
        match(api.orientation.value, {
          vertical() {
            if (event.key === Keys.ArrowUp)
              return focusIn(list, Focus.Previous | Focus.WrapAround);
            if (event.key === Keys.ArrowDown)
              return focusIn(list, Focus.Next | Focus.WrapAround);
            return FocusResult.Error;
          },
          horizontal() {
            if (event.key === Keys.ArrowLeft)
              return focusIn(list, Focus.Previous | Focus.WrapAround);
            if (event.key === Keys.ArrowRight)
              return focusIn(list, Focus.Next | Focus.WrapAround);
            return FocusResult.Error;
          },
        }),
      );

      if (result === FocusResult.Success) {
        return event.preventDefault();
      }
    }

    /**
     * 点击切换 Tab
     */
    const ready = ref(false);
    function handleSelection() {
      if (ready.value) return;
      ready.value = true;
      //此处决定了 disabled 使得点击无法切换 tab
      if (props.disabled) return;

      dom(internalTabRef)?.focus({ preventScroll: true });
      api.setSelectedIndex(myIndex.value);

      microTask(() => {
        ready.value = false;
      });
    }

    // This is important because we want to only focus the tab when it gets focus
    // OR it finished the click event (mouseup). However, if you perform a `click`,
    // then you will first get the `focus` and then get the `click` event.
    function handleMouseDown(event: MouseEvent) {
      //会导致 拖拽相关事件无法触发
      event.preventDefault();
    }

    const type = useResolveButtonType(
      computed(() => ({ as: props.as, type: attrs.type })),
      internalTabRef,
    );

    return () => {
      const slot = { selected: selected.value };
      const { id, ...theirProps } = props;
      const ourProps = {
        ref: internalTabRef,
        onKeydown: handleKeyDown,
        onMousedown: handleMouseDown,
        onClick: handleSelection,
        id,
        role: "tab",
        type: type.value,
        "aria-controls": dom(api.panels.value[myIndex.value])?.id,
        "aria-selected": selected.value,
        tabIndex: selected.value ? 0 : -1,
        disabled: props.disabled ? true : undefined,
      };

      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name: "Tab",
      });
    };
  },
});

// ---

export const TabPanels = defineComponent({
  name: "TabPanels",
  props: {
    lazy: { type: Boolean, default: false },
    as: { type: [Object, String], default: "div" },
  },
  setup(props, { slots, attrs }) {
    const api = useTabsContext("TabPanels");
    provide(TabPanelsContext, {
      lazy: props.lazy,
    });
    return () => {
      const slot = { selectedIndex: api.selectedIndex.value };

      return render({
        theirProps: props,
        ourProps: {},
        slot,
        attrs,
        slots,
        name: "TabPanels",
      });
    };
  },
});

export const TabPanel = defineComponent({
  name: "TabPanel",
  props: {
    tabIndex: { type: Number, default: 0 },
    lazy: { type: Boolean, default: void 0 },
    as: { type: [Object, String], default: "div" },
    id: { type: String, default: () => `tabs-panel-${getId()}` },
  },
  setup(props, { attrs, slots, expose }) {
    const api = useTabsContext("TabPanel");
    const { lazy: _lazy } = useTabPanelsContext("TabPanels");
    const lazy = props.lazy ?? _lazy;
    const internalPanelRef = ref<HTMLElement | null>(null);

    expose({ el: internalPanelRef, $el: internalPanelRef });

    onUpdated(() => api.updatePanel(internalPanelRef));
    onMounted(() => api.registerPanel(internalPanelRef));
    onUnmounted(() => api.unregisterPanel(internalPanelRef));

    const myIndex = computed(() => {
      return api.panels.value.indexOf(internalPanelRef);
    });
    let neverSelected = true;
    const selected = computed(() => myIndex.value === api.selectedIndex.value);

    return () => {
      const slot = { selected: selected.value };
      const { id, tabIndex, ...theirProps } = props;
      const ourProps = {
        ref: internalPanelRef,
        id,
        role: "tabpanel",
        "aria-labelledby": dom(api.tabs.value[myIndex.value])?.id,
        tabIndex: selected.value ? tabIndex : -1,
      };

      if (lazy && !selected.value && neverSelected) {
        return null;
      }
      neverSelected = false;
      return render({
        slot,
        attrs,
        slots,
        ourProps,
        theirProps,
        name: "TabPanel",
        visible: selected.value,
      });
    };
  },
});

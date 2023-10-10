<template>
  <div>
    <Switch
      ref="switchRef"
      v-model="enabled"
      :class="motionSwitchClass"
      class="relative inline-flex h-4 cursor-pointer rounded-full outline-none border-2 border-transparent focus-visible:outline-[#13ce66] transition-all duration-300"
    >
      <span class="sr-only">{{ alt }}</span>
      <span
        aria-hidden="true"
        :class="motionSpanClass"
        class="pointer-events-none inline-block w-3 h-3 rounded-full transform translate-x-0 transition duration-300"
      />
    </Switch>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { Switch } from "@headlessui/vue";
import { propsType, emitsType, UPDATE_MODEL_VALUE } from ".";
defineOptions({
  name: "EditSwitch",
});
const props = defineProps(propsType);
const emits = defineEmits(emitsType);
const enabled = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits(UPDATE_MODEL_VALUE, val);
  },
});
/**
 * 在不同的状态，Switch 会表现出 缩成原点 与 完全展开 两种UI，此处处理这些逻辑
 */
const motionSwitchClass = computed(() => {
  //背景颜色只跟 enabled 有关
  let className = [enabled.value ? "bg-[#13ce66]" : "bg-[#ccc]"];
  className.push("group-hover:w-9 w-4");
  return className.join(" ");
});
const motionSpanClass = computed(() => {
  let className = [];
  className.push("translate-x-0"); //正常状态总是位于原地
  className.push(enabled.value ? "bg-[#13ce66]" : "bg-[#ccc]"); //缩起时颜色由 enabled 决定
  //hover 时，总是白色
  className.push("group-hover:bg-white");
  //hover 时，原点位置由 enabled 决定
  enabled.value && className.push("group-hover:translate-x-5");
  return className.join(" ");
});

/**
 * Switch 的 tabindex 恒定为 0，而我需要能够自定义，因此有下面 hack 写法
 */

const switchRef = ref<{ el: HTMLButtonElement }>();
watchEffect(() => {
  if (!switchRef.value) return;
  if (props.tabindex == null) return;
  const el = switchRef.value.el;
  el.setAttribute("tabindex", String(props.tabindex));
});
</script>

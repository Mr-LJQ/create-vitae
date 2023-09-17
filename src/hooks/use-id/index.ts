import { computed, getCurrentInstance, inject } from "vue";
import { isClient } from "@vueuse/core";
import { debugWarn } from "@/utils";
import type { InjectionKey } from "vue";

export interface IdInjectionContext {
  prefix: number | string;
  current: number;
}

export const ID_INJECTION_KEY: InjectionKey<IdInjectionContext> =
  Symbol("id_injection_key");

const defaultContext: IdInjectionContext = {
  prefix: Math.random().toString(16).slice(2),
  current: 0,
};
const useIdInjection = () => {
  return getCurrentInstance()
    ? inject(ID_INJECTION_KEY, defaultContext)
    : defaultContext;
};

export const useId = () => {
  const context = useIdInjection();
  if (!isClient && context === defaultContext) {
    debugWarn(
      "",
      `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
    usage: app.provide(ID_INJECTION_KEY, {
      prefix: number,
      current: number,
    })`,
    );
  }
  const idRef = computed(() => {
    return `id-${context.prefix}-${context.current++}`;
  });
  return idRef;
};

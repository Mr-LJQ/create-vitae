import type {
  StateTree,
  PiniaPlugin,
  PiniaPluginContext,
  SubscriptionCallback,
} from "pinia";
import type { PluginOptions, CommonOptions } from "./type";

function defaultTo<T>(a: T | null | undefined, b: T) {
  return a != null ? a : b;
}

function getOption<T, K extends keyof T>(
  fallback: T[K],
  key: K,
  options1: T,
  options2: T,
) {
  return defaultTo(
    defaultTo(options1[key], options2[key]),
    fallback,
  ) as Required<T>[K];
}

export function createPersistedStatePlugin<S extends StateTree = StateTree>(
  options?: PluginOptions<S>,
): PiniaPlugin {
  const pluginOptions = options || ({} as PluginOptions<StateTree>);

  function plugin(context: PiniaPluginContext) {
    // normalize
    const options = (function () {
      try {
        return context.options.persistedState || {};
      } catch {
        return {};
      }
    })();
    if (getOption(true, "persist", options, pluginOptions) === false) return;

    const key = getOption(context.store.$id, "key", options, {});
    const storage = getOption(
      (function () {
        try {
          return window.localStorage;
        } catch {
          return {
            getItem: function () {},
            setItem: function () {},
            removeItem: function () {},
          };
        }
      })(),
      "storage",
      options,
      pluginOptions,
    );
    const serialize = getOption(
      JSON.stringify,
      "serialize",
      options,
      pluginOptions,
    );
    const deserialize = getOption(
      JSON.parse,
      "deserialize",
      options,
      pluginOptions,
    );
    const assertStorage = getOption(
      function (storage: Required<CommonOptions<S>>["storage"]) {
        const uniqueKey = "@@";
        const result = storage.setItem(uniqueKey, "1");
        const removeItem = function () {
          storage.removeItem(uniqueKey);
        };
        if (result instanceof Promise) {
          result.then(removeItem);
        } else {
          removeItem();
        }
      },
      "assertStorage",
      options,
      pluginOptions,
    );
    function parseThenPatch(value: unknown) {
      if (value != null) {
        const state = readStorageValue(value);
        context.store.$patch(state);
      }
      resolveIsReady();
    }

    function readStorageValue(value: unknown) {
      return deserialize(value);
    }

    // initialize custom properties
    let resolveIsReady: (value: void | PromiseLike<void>) => void;
    const isReadyPromise = new Promise<void>(function (resolve) {
      resolveIsReady = resolve;
    });
    let pendingCount = 0;
    const onFulfilledCallbacks: Array<() => void> = [];
    context.store.$persistedState = {
      isReady: function () {
        return isReadyPromise;
      },
      pending: false,
      onFulfilled: (callback: () => void) => {
        onFulfilledCallbacks.push(callback);
      },
      readStorageValue,
      writeStorageValue,
    };

    // hydrate
    try {
      if (process.env.NODE_ENV !== "production") {
        const assertStorageValue = assertStorage(storage);
        if (assertStorageValue instanceof Promise) {
          assertStorageValue
            .then(() => hydrate())
            .catch((error) => console.warn(error));
        } else {
          hydrate();
        }
      } else {
        hydrate();
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.warn(error);
      resolveIsReady!();
    }
    function hydrate() {
      const value = storage.getItem(key);
      if (value instanceof Promise) {
        value.then(parseThenPatch);
      } else {
        parseThenPatch(value);
      }
    }

    function writeStorageValue(state: S) {
      return serialize(state);
    }

    // persist
    const callback: SubscriptionCallback<S> = function (_mutation, state) {
      const value = writeStorageValue(state);
      const result = storage.setItem(key, value);
      if (result instanceof Promise) {
        ++pendingCount;
        context.store.$persistedState.pending = pendingCount !== 0;
        result
          .catch(function () {})
          .finally(function () {
            --pendingCount;
            const pending = pendingCount !== 0;
            context.store.$persistedState.pending = pending;
            if (!pending) {
              //如果 promise 完成，则触发相关回调
              onFulfilledCallbacks.forEach((fn) => fn());
              //相关回调只触发一次便会被清空
              onFulfilledCallbacks.length = 0;
            }
          });
      }
    };
    context.store.$subscribe(callback);
  }

  return plugin;
}

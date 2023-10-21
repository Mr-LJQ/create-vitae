/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateTree } from "pinia";
export interface IStorage {
  getItem: (key: string) => any | Promise<any>;
  setItem: (key: string, value: any) => void | Promise<void>;
  removeItem: (key: string) => void | Promise<void>;
}

/**
 * @description
 * PluginOptions and StoreOptions shares CommonOptions interface,
 *
 * @example
 *
 * You could pass most commonly used option to PluginOptions:
 *
 * `store1` will persist to and rehydrate from `localStorage`, and
 * `store2` will persist to and rehydrate from `sessionStorage`:
 *
 * ```
 * const plugin = createPersistedStatePlugin({ storage: localStorage })
 * const store1 = defineStore('store-1', () => {})
 * const store2 = defineStore('store-2', () => {}, { persistedState: { storage: sessionStorage } })
 * ```
 */
export interface CommonOptions<S extends StateTree = StateTree> {
  /**
   * Whether to persist store.
   * @default true
   */
  persist?: boolean;

  /**
   * Where to store persisted state.
   *
   * @default localStorage
   */
  storage?: IStorage;

  /**
   * To ensure storage is available.
   */
  assertStorage?: (storage: IStorage) => void | Promise<void> | never;

  /**
   * This method will be called right before `storage.setItem`.
   *
   * @default JSON.stringify
   */
  serialize?: (state: S) => any;

  /**
   * This method will be called right after `storage.getItem`.
   *
   * @default JSON.parse
   */
  deserialize?: (value: any) => any;
}

export type PluginOptions<S extends StateTree> = CommonOptions<S>;

export type StoreOptions<S extends StateTree> = CommonOptions<S> & {
  /**
   * The key to store the persisted state under.
   *
   * @default store.$id
   */
  key?: string;
};

declare module "pinia" {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persistedState?: StoreOptions<S>;
  }

  export interface PiniaCustomProperties<
    Id extends string = string,
    S extends StateTree = StateTree,
    G /* extends GettersTree<S> */ = _GettersTree<S>,
    A /* extends ActionsTree */ = _ActionsTree,
  > {
    $persistedState: {
      /**
       * Whether store is hydrated
       */
      isReady: () => Promise<void>;

      /**
       * Whether store is persisting
       */
      pending: boolean;

      /**
       * 用于为外部提供 pending === false 时的监听
       */
      onFulfilled: (callback: () => void) => void;

      /**
       * 这是用于解析缓存到本地的数据的方法
       */
      readStorageValue: (value: unknown) => any;
      writeStorageValue: (state: S) => any;
    };
  }
}

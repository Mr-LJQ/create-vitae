import { isString } from ".";

export function debugWarn(err: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== "production") {
    const error: Error = isString(scope)
      ? new Error(`[${scope} ${message}]`)
      : scope;

    console.warn(error);
  }
}

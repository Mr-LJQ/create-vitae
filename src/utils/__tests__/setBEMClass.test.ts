import { expect, test } from "vitest";
import { setBEMClass } from "../setBEMClass";

test("测试 setBEMClass 函数是否如期工作:", () => {
  const { b, be, bem, bm } = setBEMClass("edit");
  expect(b()).toBe("edit");
  expect(be("label")).toBe("edit__label");
  expect(bm("right")).toBe("edit--right");
  expect(bem("label", "left")).toBe("edit__label--left");
});

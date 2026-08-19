import { describe, expect, it } from "vitest";

import { formatStoreName } from "./format-store-name";

describe("formatStoreName", () => {
  it("normalizes the storefront name", () => {
    expect(formatStoreName("  wyrd ")).toBe("WYRD");
  });
});

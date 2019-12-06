import { sleep } from "../src";

jest.setTimeout(10000);

describe("converting", () => {
  it("sleeps", async () => {
    const before = Date.now();
    await sleep(3);
    const now = Date.now();
    expect(now - before).toBeGreaterThanOrEqual(3000);
  });
});

import { hello } from "../src/hello";

describe("hello from c++", () => {
  it("prints hello", async () => {
    expect(hello()).toEqual("world");
  });
});

import { convert } from "../src";

jest.setTimeout(120000);

describe("converting", () => {
  it("converts", async () => {
    const res = await convert(
      "https://cdn-global1.unicareer.com/uni-classroom-pc-bff/dev/%E9%A9%AC%E7%8E%89%E7%9A%84%E5%89%AF%E6%9C%AC1574230081124.xlsx"
    );

    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual("application/pdf");
    expect(res.body instanceof Buffer).toBe(true);
  });
});

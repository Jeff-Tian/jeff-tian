import { nativeRequire } from "./native-require";

const addon = nativeRequire("addon");

export const hello = addon.hello;

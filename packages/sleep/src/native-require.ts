export const nativeRequire = (what: string) => {
  try {
    return require(`../build/Release/${what}.node`);
  } catch (err) {
    return require(`../build/Debug/${what}.node`);
  }
};

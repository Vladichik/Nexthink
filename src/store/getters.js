export const foo = (state) => state.foo
export const initIgnoredUrls = (state) => {
  const existingUrls = localStorage.getItem("ignored");
  return existingUrls ? JSON.parse(existingUrls) : [];
}

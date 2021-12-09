import { done, start } from "nprogress";
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
 function getPageComponents(components) {
  return async () => {
    start();
    if (process.env.NODE_ENV === "development") {
      await delay(1000);
    }
    const comp = await components();
    done();
    return comp;
  };
}
export default getPageComponents;

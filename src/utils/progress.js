import { done, start } from "nprogress";
function getPageComponents(components) {
  return async () => {
    start();
    const comp = await components();
    done();
    return comp;
  };
}
export default getPageComponents;

import store from "./store";
store.dispatch("setting/fetchSetting");
store
  .dispatch("blog/getBlog")
  .then((res) => {
    let getGroup = (data) => {
      let groups = {};
      data.forEach((c) => {
        let value = c.category;
        let num = 0;
        groups[value] = groups[value] || [];
        groups[value].push(c);
      });
      return groups;
    };
    let getGroups = getGroup(res);
    console.log(getGroups);
    store.dispatch("classification/calculateTheTotalNumberOf", {
      getGroups,
    });
  })
  .then((res) => {});

export default function(defaultDataValue = null) {
  return {
    data() {
      return {
        isLoading: true,
        data: defaultDataValue,
      };
    },
    async created() {
      let res = await this.fetchData();
      this.data = res.data;
      this.isLoading = false;
    },
  };
}

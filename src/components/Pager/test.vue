<template>
  <div>
    <Pager
      :total="total"
      :current="current"
      :limit="10"
      @pageChange="handlePageChange($event)"
    />
  </div>
</template>

<script>
import Pager from "./";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      current: 1,
      total: 302,
    };
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
   
    },
  },
};
</script>

<style scoped></style>

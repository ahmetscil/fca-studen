<template>
  <div class="mt-3">
    <CourseList></CourseList>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
  }),
  created() {
    this.returnNormal();
  },
  computed: {
    ...mapState(["apiLink", "showStudent"])
  },
  methods: {
    ...mapMutations(["goToLivePage", "returnNormal"]),


  }
};
</script>
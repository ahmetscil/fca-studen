<template>
  <div>
    <Header></Header>
    <div class="container mt-5">
      <div class="row" v-for="(lecture, idx) in studentHomeData.user_courses" :key="idx" :id="'table'+idx">
        <div class="dataList dataList02 col-12" v-for="(course,idy) in lecture[0].lectures" :key="'crs'+idy">
          <div class="dataList collapsetable row p-2 mt-3">
            <div class="miniLoader" id="coursesLoader" style="display: none"></div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8">
              <h3>{{idx}}</h3>
              <h3>{{course.lecture_title}}</h3>
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 text-right">
              <button @click="collapseThis('div'+idy,course.lecture_ID)" type="button" class="mr-1 btn btn-warning btn-sm"><i class="fas fa-plus-square"></i></button>
            </div>
            <div class="col-12">
              <div class="miniLoader" id="lectureLoader" style="display: none"></div>

              <div class="row dataList collapseInner" :id="'div' + idy">
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="(item,idx) in getLectureItems.items" :key="'i'+idx">
                  <div class="dataBox px-2">
                    <div v-if="item.is_live_item == true" class="liveItem"></div>
                    <div class="dataImg">
                      <router-link v-if="item.is_live_item == true" :to="{name: 'Live', params: {url: item.item_ID}}">
                        <img :src="'https://img.youtube.com/vi/' + item.video_url + '/maxresdefault.jpg'">
                      </router-link>
                      <router-link v-else :to="{name: 'Live', params: {url: item.item_ID}}">
                        <img :src="'https://img.youtube.com/vi/' + item.video_url + '/maxresdefault.jpg'">
                      </router-link>
                    </div>
                    <router-link :to="{name: 'Live', params: {url: item.item_ID}}">
                      <h5 class="text-center">{{item.item_name}}</h5>
                    </router-link>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>
<style lang="sass">
  .collapsetable
    position: relative
    .collapseInner
      display: none
</style>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({}),
  mounted() {
    this.listMyData();
  },
  created() {
    this.returnNormal();
  },
  computed: {
    ...mapState(["studentHomeData", "themeClasses","getLectureItems"])
  },
  methods: {
    ...mapMutations(["returnNormal"]),
    listMyData() {
      this.$store.dispatch("loadStudentHomePage", {
        ...this.selectedUser,
        email: localStorage.getItem("userEmail"),
        user_type: localStorage.getItem("user_type")
      });
    },
    collapseThis(e,l) {
      $('.collapseInner').hide()
      $('#'+e).css('display','flex')
      this.$store.dispatch('getLectureItems', {...this.lecture, lect: l})
    },
    instructorHomepage() {
      $('#coursesLoader').show()
    }
  }
};
</script>


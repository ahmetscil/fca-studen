<template>
  <div class="col-12">
    <div>
      <div  :class="themeClasses.dataListClass" class="row px-0 mt-3" v-for="course in lessonTitle" :key="course.id">
        <div class="miniLoader" id="universitiesLoader" style="display: none"></div>
        <div class="col-sm-8 col-md-10 col-lg-10 pl-0">
          <h3><router-link :to="{name: 'Lecture', params: {url: course.id}}" tag="a">{{course.title}}</router-link></h3>
        </div>
        <div class="col-sm-4 col-md-2 col-lg-2 pr-0 text-center">
        </div>
        <div class="dataBox col-3" v-for="lecture in course.lessons" :key="lecture.id">
          <router-link :to="{name: 'Live', params: {url: lecture.id}}" tag="a">
            <div class="dataImg">
              <div class="courseLive" v-if="lecture.live != false"></div>
              <img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg">
            </div>
            <h5>{{lecture.title}}</h5>
            <p>{{lecture.instructor}}</p>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
  export default {
    data: () => ({
      lessonTitle: [
        {id:'1', title: 'Physics I', href: 'Physics I', lessons: [
          {id: '2', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
        ]}
      ],
      search: ''
    }),
    methods: {
      ...mapMutations(['returnNormal'])
    },
    computed: {
      ...mapState(['dataListClass','themeClasses'])
    },
    created() {
      this.returnNormal()
    }
  }
</script>

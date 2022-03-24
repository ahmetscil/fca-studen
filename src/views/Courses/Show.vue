<template>
  <div>
    <div class="dataList row" v-for="course in lessonTitle" :key="course.id">
      <div class="col-12 pl-0">
        <h3>{{course.title}}</h3>
      </div>
      <div class="col-3 dataBox" v-for="lesson in course.lessons" :key="lesson.id">
        <router-link :to="{name: 'Live', params: {url: lesson.id}}" tag="a">
          <div class="dataImg">
            <template v-if="lesson.live"><i class="courseLive"></i></template>
            <img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg">
          </div>
          <h5>{{lesson.title}}</h5>
          <p>{{lesson.instructor}} {{lesson.date}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      lessonTitle: [
        {id:'4', title: 'Physics I', href: 'Physics I', lessons: [
          {id: '1', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
          {id: '2', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
          {id: '3', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
          {id: '4', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
          {id: '5', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
          {id: '6', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
          {id: '7', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
          {id: '8', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
          {id: '9', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false},
          {id: '10', title: 'Lorem Ipsum is simply dummy of the printing and typesetting', instructor: 'ilker bekmezci', date: '15.06.2019', live: false}
        ]}
      ],
      search: ''
    })
  }
</script>

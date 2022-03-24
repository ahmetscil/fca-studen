<template>
  <nav aria-label="breadcrumb">
    <ol v-if="getLecture.data" class="breadcrumb">
      <li class="breadcrumb-item"><router-link active-class="active" exact tag="a" :to="{name: 'MyPage'}">{{getLecture.university_name}}</router-link></li>
      <li class="breadcrumb-item"><router-link tag="a" :to="{name: 'MyPage'}">{{getLecture.faculty_name}}</router-link></li>
      <li class="breadcrumb-item"><router-link tag="a" :to="{name: 'MyPage'}">{{getLecture.department_name}}</router-link></li>
      <li class="breadcrumb-item"><router-link active-class="active" exact tag="a" :to="{name: 'ShowLecture', params: {url: getLecture.lecture_ID}}">{{getLecture.course_name}}</router-link></li>
      <li v-if="itemname" class="breadcrumb-item">
        <router-link active-class="active" exact tag="a" :to="{name: 'ShowItems'}">{{getItems.item_name}} itemname</router-link>
      </li>
    </ol>
    <ol v-else class="breadcrumb">
      <li class="breadcrumb-item"><router-link active-class="active" exact tag="a" :to="{name: 'MyPage'}">{{university}}</router-link></li>
      <li class="breadcrumb-item"><router-link tag="a" :to="{name: 'MyPage'}">{{faculty}}</router-link></li>
      <li class="breadcrumb-item"><router-link tag="a" :to="{name: 'MyPage'}">{{department}}</router-link></li>
    </ol>
  </nav>
</template>
<script>
  import axios from 'axios'
import { mapState, mapMutations } from 'vuex';
  export default {
    data: () => ({
      itemname: false,
      university: localStorage.getItem('userUniversity'),
      faculty: localStorage.getItem('userFaculty'),
      department: localStorage.getItem('userDepartment'),
      course: null,
      user: null
    }),
    computed: {
      ...mapState(['apiLink','breadmenu','getLecture','getItems'])
    },
    created() {
      if(`${this.$route.params.itemurl}`) {
        this.itemName = true
        this.itemData(`${this.$route.params.itemurl}`)
      }
    },
    methods: {
      itemData(uni) {
        this.$store.dispatch('getItems', { ...this.selected, id: uni })
      }
    },
    watch:{
      $route (to, from){
        if(`${this.$route.params.itemurl}` != 'undefined') {
          this.itemData(`${this.$route.params.itemurl}`)
          this.itemName = true
        }
      }
    }
  }
</script>
<style lang="sass">
  .breadcrumb
    color: #c3c3c3 !important
    text-transform: uppercase
    font-family: 'Open Sans Condensed', sans-serif
    background: none !important
    padding: 5px 0 0 0
    .breadcrumb-item+.breadcrumb-item::before
      content: "»"
    .breadcrumb-item
      .active
        color: #fff !important
        font-weight: bold
        & a
          color: #fff !important
          &:hover
            text-decoration: none
    .breadcrumb-item
      & a
        color: #c3c3c3 !important
        &:hover
          color: #fff !important
          text-decoration: none
</style>
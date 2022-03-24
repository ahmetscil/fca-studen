<template>
  <div class="row pt-3 mx-0">
    <div class="col-12">
      <div :class="themeClasses.dataListClass">
        <div class="dataList row pt-2 pb-0 px-2">
          <div class="col-xs-12 col-sm-6 col-md-5 col-lg-3 dataListLogo">
            <img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg">
          </div>
          <div class="col-xs-12 col-sm-6 col-md-7 col-lg-9">
            <div class="row">
              <div class="col-sm-12">
                <h3>{{getUser.name_surname}}</h3>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-4">
                <h4><i class="far fa-envelope"></i> <a :href="'mailto:' + getUser.email">{{getUser.email}}</a></h4>
                <h4><i class="fas fa-university"></i> {{getUser.user_university_name}}</h4>
                <h4>{{getUser.user_faculty_name}}</h4>
                <h4>{{getUser.user_department_name}}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
  export default {
    data: () => ({
    }),
    computed: {
      ...mapState(['themeClasses','getUser'])
    },
    created() {
      this.studentData()
      this.$store.dispatch('breadcrumb', {...this.select, what: 'user', id: '', name: 'Settings'})
    },
    methods: {
      studentData() {
        if (localStorage.getItem('user_type') != 'admin') {
          this.$store.dispatch('getUser', { ...this.selected, usermail: localStorage.getItem('userEmail') })
        } else {
          alert('bu ekran şuan yalnızca standart üyeler içindir. adminler görüntüleyemez. Gerekli API güncellemesi yapıldıktan sonra ekran görünür olacaktır.')
          this.$router.push({name: 'Universities'})
        }
      },
    },
  }
</script>
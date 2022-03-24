 <template>
  <header class="container-fluid fixed-top shadow navbar02">
    <div class="row">
      <div class="col-lg-9">
        <div class="asc__header-logo">
          <router-link tag="a" :to="{name: 'MyPage'}">{{siteName}}</router-link>
        </div>
        <ul class="ahm__navbarItems">
          <li><router-link tag="a" :to="{name: 'MyPage'}" active-class="current" exact>My Courses</router-link></li>
          <li><router-link tag="a" :to="{name: 'Surveys'}" active-class="current" exact>Surveys</router-link></li>
          <li><router-link tag="a" :to="{name: 'Settings'}" active-class="current" exact>Settings</router-link></li>
          <li><router-link tag="a" :to="{name: 'Settings'}" active-class="current" exact>OBS Profiles</router-link></li>
        </ul>
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="profileBox d-none d-sm-block col-lg-3" v-for="stu in student" :key="stu.id">
        <div class="profimg">
          <img :src="stu.img">
        </div>
        <div class="profText">
          <h4>{{stu.university}}</h4>
          <div class="btn-group">
            <p class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{stu.name}}</p>
            <div class="dropdown-menu shadow dropdown-menu-right">
              <router-link class="dropdown-item" :to="{name: 'Settings'}">Settings</router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#"><b>Themes</b></a>
              <a class="dropdown-item" href="#" @click="changeTheme('dark')">Dark Theme</a>
              <a class="dropdown-item" href="#" @click="changeTheme('colourful')">Colourful Theme</a>
              <a class="dropdown-item" href="#" @click="changeTheme('light')">Light Theme</a>
              <div class="dropdown-divider"></div>
              <a @click.prevent="logout()" class="dropdown-item">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
  export default {
    data: () => ({
      student: [
        {
          id: localStorage.getItem('userId'), 
          name: localStorage.getItem('userName'), 
          university: localStorage.getItem('userUniversity'), 
          img: localStorage.getItem('userAvatar')
        }
      ]
    }),
    computed: {
      ...mapState(['themeClasses','siteName'])
    },
    methods: {
      ...mapMutations(['selectTheme']),
      changeTheme(e) {
        TweenMax.to('.pageLoader', 1, { width: '100%', left: '0px', ease: Expo.easeOut })
        this.selectTheme({
          what: e,
        })
      },
      logout() {
        this.$store.dispatch("logout")
      }
    }
  }
</script>
<style lang="sass">
  .profileBox
    padding-top: 10px
    color: #CACACA
    text-align: right
    font-family: 'Open Sans Condensed', sans-serif
    .profText
      float: right
      margin-right: 10px
      & h4
        font-size: 14px
        padding: 3px 0 0 0
        margin: 0px
        font-weight: bold
      & p
        font-size: 16px
        padding: 0px
        margin: 0px
        cursor: pointer
      .dropdown-menu
        background: #13181F
        border-radius: 3px
        .dropdown-item
          font-size: 12px
          color: #cacaca
          cursor: pointer
          &:hover
            background: #000
        .dropdown-divider
          border-top: 1px solid #323842
    .profimg
      width: 40px
      height: 40px
      border-radius: 50px
      overflow: hidden
      float: right
      background: #000
      & img
        width: 100%
  .asc__header-logo
    display: inline-block
    float: left
    margin-right: 50px
    font-size: 40px
    line-height: 70px
    font-weight: bold
    & a
      color: #fff
      &:hover
        cursor: pointer
        color: #ddd
  .ahm__navbarItems
    font-size: 12px
    padding: 10px 0 0 0
    margin-bottom: 0px
    & li
      list-style: none
      display: inline-block
      margin-right: 15px
      &:last-child
        margin-right: 0px
    & a
      color: #fff
</style>
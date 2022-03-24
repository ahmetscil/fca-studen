 <template>
  <nav :class="themeClasses.navigationClass">
    <div :class="themeClasses.navbarClass">
      <router-link :to="{name: 'MyPage'}">{{siteName}}</router-link>
    </div>
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item"><router-link tag="a" :to="{name: 'MyPage'}" active-class="current" exact>My Courses</router-link></li>
        <li class="nav-item"><router-link tag="a" :to="{name: 'Surveys'}" active-class="current" exact>Surveys</router-link></li>
        <li class="nav-item"><router-link tag="a" :to="{name: 'Settings'}" active-class="current" exact>Settings</router-link></li>
        <li class="nav-item"><router-link tag="a" :to="{name: 'Settings'}" active-class="current" exact>OBS Profiles</router-link></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapState } from 'vuex';
  export default {
    data: () => ({
      userType: localStorage.getItem('user_type')
    }),
    computed: {
      ...mapState(['themeClasses','siteName'])
    }
  }
</script>
<style lang="sass">
  .sidebar01
    background: url(../assets/img/navbg.png)
  .sidebar02
    background-image: url('../assets/img/nav02.png'), linear-gradient(45deg, #e75190, #6d1b68)
    background-position: bottom
    backgorund-size: cover
    background-repeat: no-repeat
  .navbar-brand01
    background-color: rgba(0, 0, 0, .25)
    color: #fff
    & a
      color: #fff
  .navbar-brand02
    background-color: none
    color: #fff !important
    & a
      color: #fff !important
  .navbar01
    background-color: #343a40 !important
  .navbar02
    // background-color: #422038 !important
    background-image: url('../assets/img/nav02.png'), linear-gradient(182deg, #e75190, #6d1b68)
    background-position: right
    background-repeat: no-repeat
  .sidebar
    position: fixed
    top: 0
    bottom: 0
    left: 0
    z-index: 100
    padding: 0
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1)
    font-family: 'Open Sans Condensed', sans-serif
    .sidebar-sticky
      position: relative
      top: 0
      height: calc(100vh - 48px)
      padding-top: .5rem
      overflow-x: hidden
      overflow-y: auto
      @supports ((position: -webkit-sticky) or (position: sticky))
        position: -webkit-sticky
        position: sticky
    & h1
      color: #fff
      font-family: 'Open Sans Condensed', sans-serif
      & a
        color: #fff
        &:hover
          text-decoration: none
    & ul
      padding: 0px 0px 0px 15px
      list-style: none
      & li
        font-size: 16px
        font-weight: bold
        & a
          color: #CACACA
          margin-bottom: 0.2rem
          &:hover
            color: #CACACA
            text-decoration: none
        .current
          color: #fff
        & ul
          margin-bottom: 10px
          margin-left: 0px
          padding-left: 0px
          & li
            margin-bottom: 10px
            font-size: 12px
            font-weight: normal
            & a
              display: block
              color: #CACACB
            .current
              color: #fff
            &:hover
              color: #fff
              text-decoration: none
  .navbar-brand
    font-weight: bold
    padding-top: 1rem
    padding-bottom: 1rem
    font-size: 1rem
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25)
</style>
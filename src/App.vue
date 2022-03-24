<template>
  <div class="container-fluid body02 body0201">
    <div class="pageLoader"></div>
    <div class="row">
      <main role="main" class="col-md-12 col-lg-12 ml-sm-auto">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'App',
    data () {
      return {
      }
    },
    mounted() {
      TweenMax.to('.pageLoader', 1, { width: '0px', left: '100%', ease: Expo.easeOut })
      // if (localStorage.getItem('selectedTheme')) {
      //   this.selectTheme({what: localStorage.getItem('selectedTheme')})
      // }
    },
    methods: {
      ...mapMutations(['selectTheme']),
      toggleNav() {
        $("#wrapper").toggleClass("toggled");
      }
    },
    computed: {
      ...mapState(['myFaculty','themeClasses']),
    }
  }
</script>
<style lang="sass">
  @import '~bootstrap/dist/css/bootstrap.min.css'
  @import '~vue-select/dist/vue-select.css'
  @import '~vue-good-table/dist/vue-good-table.css'
  @import '~pretty-checkbox/src/pretty-checkbox.scss'
  @import '~vuejs-dialog/dist/vuejs-dialog.min.css'
  $dark1: #323842
  $dark2: #13181F
  $yellow: #ffc107

  body
    font-family: 'Open Sans', sans-serif
    min-height: 100vh
  .body01
    background: linear-gradient(-45deg, #13181F, #323842)
    min-height: 100vh
  .body02
    background-image: linear-gradient(-45deg, #1f1227, #614767)
    min-height: 100vh
  .body0201
    // background-image: url('./assets/img/nav02.png'), linear-gradient(-45deg, #1f1227, #614767)
    // background-image: url('./assets/img/nav02.png'), linear-gradient(45deg, #e75190, #6d1b68)
    background-position: bottom right
    background-repeat: no-repeat
  a
    &:hover
      text-decoration: none
  .cursor-pointer
    cursor: pointer
  .pageLoader
    position: fixed
    top: 0px
    left: 0px
    width: 100%
    height: 100%
    background: #000
    background-image: url(./assets/img/loader.svg)
    background-repeat: no-repeat
    background-position: center center
    z-index: 1212
  .fullPage
    width: 100%
    min-height: 100vh
    padding: 0px
    margin: 0px
    position: relative
  .fade-enter-active,
  .fade-leave-active
    transition-duration: 0.3s
    transition-property: opacity
    transition-timing-function: ease
  .fade-enter,
  .fade-leave-active
    opacity: 0
  [role="main"]
    padding-top: 133px
    @media (min-width: 768px)
      padding-top: 48px
    @media (max-width: 414px)
      padding-top: 53px
  .operationPage
    position: relative
    font-size: 12px
    font-weight: 300
    margin-bottom: 1.5rem
    border-bottom: 1px #00000030 solid
    border-radius: 5px
    background: $dark1
    min-height: 50vh
    color: #fff
  .miniLoader
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 100%
    background-color: rgba(0,0,0,.7)
    background-image: url(./assets/img/loader.svg)
    background-repeat: no-repeat
    background-position: center center
    z-index: 999
    & p
      text-align: center
      padding-top: 5rem
      font-size: 20px
  .v--modal
    background-color: $dark1 !important
  .dashBox
    border: 1px $dark1 solid
    background: linear-gradient(-45deg, $dark1, $dark2)
    color: #cacaca
    font-size: 12px
    border-radius: 5px 5px 0 0
    position: relative
    & header
      background: $yellow
      border-radius: 5px 5px 0 0
      padding: 3px 5px 3px 5px
      color: #323232
      height: 4vh
      & h4
        font-weight: bold !important
    & footer
      position: absolute
      bottom: 0px
      width: 100%
      background: #00000060
      padding: 3px 5px 3px 5px
      color: #323232
      height: 4vh
      text-align: center
      .btn
        font-weight: bold
        padding: 1px 25px
        margin-top: 3px
    & ul
      list-style: none
      padding: 0px
      & li
        border-bottom: 1px #00000050 solid
        line-height: 30px
        height: 30px
        overflow: hidden
        width: 100%
        &:last-child
          border-bottom: none
        & a
          color: #cacaca
          display: block
          &:hover
            color: #fff
    & h3
      padding: 0px
      margin: 0px
    & h4
      font-size: 22px
      padding: 0px
      margin: 0px
    & h5
      padding: 0px
      margin: 0px
  .operationHeader
    color: #fff
    background: $dark2
  .hasError
    & label
      color: red
    & input
      border: 1px red solid !important
      color: #fff
  .vs__dropdown-toggle
    background: #cacaca
  .vgt-table
    font-size: 12px !important
  .dataList01
    border-bottom: 1px #00000030 solid
    background-color: #00000010
  .dataList02
    background-image: url('./assets/img/list02.png')
    background-position: top left
    background-repeat: no-repeat
    border-bottom: 3px #00000020 solid
    background-color: #27182fad
  .dataList
    position: relative
    font-size: 12px
    font-weight: 300
    margin-bottom: 1.5rem
    border-radius: 5px
    .dataListLogo
      width: 100%
      max-height: 200px
      overflow: hidden
      & img
        width: 100%
    & h3
      color: #CACACB
      margin-bottom: 0.5rem
      margin-right: 1rem
      letter-spacing: -1px
      font-weight: 300
      font-size: 22px
      background: #191919
      padding: 2px 15px 5px 10px
      transition: 0.3s
      width: fit-content
      float: left
      & a
        color: #CACACB
        transition: 0.3s
      &:hover
        background: #000
        transition: 0.3s
        & a
          text-decoration: none
          color: #fff
          transition: 0.3s
    & h4
      color: #CACACB
      margin-bottom: 0.5rem
      letter-spacing: -1px
      font-weight: 300
      font-size: 18px
      background: #191919
      padding: 3px 10px 3px 10px
      transition: 0.3s
      & a
        color: #CACACB
        transition: 0.3s
      &:hover
        background: #000
        transition: 0.3s
        & a
          text-decoration: none
          color: #fff
          transition: 0.3s
    .dataSearch
      width: 250px
      outline: none
      float: left
      background: #191919
      color: #fff
      padding: 0px 5px 0px 5px
      & input
        width: 100%
        background: none
        color: #fff
        border: none
        font-size: 13px
        outline: none !important
        box-shadow: none !important
        &::-webkit-input-placeholder
          color: #cacaca
        &:-ms-input-placeholder
          color: #cacaca
        &::placeholder
          color: #cacaca
    .dataBox
      border-radius: 5px
      overflow: hidden
      color: #CACACB
      transition: 0.3s
      & h5
        font-weight: 300
        margin-bottom: 0.5rem
        font-size: 16px
      & a
        color: #CACACB
      .dataImg
        margin-top: 0.5rem
        width: 100%
        height: 160px
        overflow: hidden
        border-radius: 5px
        margin-bottom: 0.5rem
        position: relative
        background: #000
        & img
          width: 100%
          opacity: 0.7
          transition: 0.3s
        .courseLive
          position: absolute
          width: 15px
          height: 15px
          border-radius: 15px
          box-shadow: 0px 0px 9px 4px #da2323
          background: #da2323
          left: 15px
          top: 15px
          z-index: 2
        .operations
          position: absolute
          background: #00000070
          right: 5px
          top: 5px
          z-index: 2
          border-radius: 2px
          cursor: pointer
          & i
            color: #cacaca
            padding: 2px 6px
          .dropdown-menu
            background: rgba(0,0,0,.9)
            .dropdown-item
              color: #cacaca
              font-size: 12px
              padding: .25rem 0.5rem
              &:hover
                background: #000
                color: #fff
            .dropdown-divider
              border-top: 1px #ffffff60 solid
        .instructorOperations
          .dropdown-menu
            background-color: #ffc107
            border-color: #ffc107
            .dropdown-item
              color: #212529
              font-size: 12px
              padding: .25rem 0.5rem
              &:hover
                background: #ddd
                color: #000
            .dropdown-divider
              border-top: 1px #ffc107 solid
      &:hover
        & a
          color: #fff
          text-decoration: none
        .dataImg
          & img
            transition: 0.3s
            opacity: 1
      .liveItem
        position: absolute
        top: 15px
        left: 25px
        width: 20px
        height: 20px
        border-radius: 20px
        background: #ff0000
        box-shadow: 0 0 10px #ff0000
        z-index: 99
    .dataTable
      color: #CACACB
      transition: 0.3s
      border-bottom: 2px #00000050 solid
      padding-top: 0.7rem
      padding-bottom: 0.5rem
      &:last-child
        border-bottom: none
      & h5
        font-weight: 300
        margin-bottom: 0.5rem
        font-size: 16px
      & a
        color: #CACACB
      .operations
        float: right
        background: #00000070
        padding: 3px 15px
        border-radius: 2px
        cursor: pointer
        & i
          color: #cacaca
          padding: 2px 6px
        .dropdown-menu
          background: rgba(0,0,0,.9)
          .dropdown-item
            color: #cacaca
            font-size: 12px
            padding: .25rem 0.5rem
            &:hover
              background: #000
              color: #fff
          .dropdown-divider
            border-top: 1px #ffffff60 solid
      &:hover
        background: #00000060
        transition: 0.3s
        & a
          color: #fff
          text-decoration: none
        .dataImg
          & img
            transition: 0.3s
            opacity: 1
  .nav-tabs
    border-bottom: 3px solid #00000082
    .nav-link
      border: none
      border-top-left-radius: 0
      border-top-right-radius: 0
      padding: .4rem 1rem
      color: #cacaca !important
      & a
        color: #cacaca !important
    .nav-link.active
      background-color: #1a1a1a
      color: #cacaca !important
  .vgt-global-search
    border: none !important
    background: rgba(0,0,0,.7)
  .vgt-input
    background: none !important
    color: #cacaca
    border: none
    border-bottom: 1px #cacaca solid
    &::-webkit-input-placeholder
      color: #cacaca
    &:-ms-input-placeholder
      color: #cacaca
    &::placeholder
      color: #cacaca
    &:focus
      border: none
      border-bottom: 1px #cacaca solid
  .vgt-wrap__footer
    border: none !important
    background: rgba(0,0,0,.7)
  .dg-content-cont--floating
    transform: none !important
  .dg-btn--cancel
    background-color: #dc3545
    border: 2px solid #dc3545
    font-weight: 400
    font-size: 14px
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out
    &:hover
      color: #fff
      background-color: #c82333
      border-color: #bd2130
  .dg-btn--ok
    color: #212529
    background-color: #ffc107
    border-color: #ffc107
    &:hover
      color: #212529
      background-color: #e0a800
      border-color: #d39e00
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out
  .dg-main-content
    background: linear-gradient(-45deg, #1f1227, #614767)
  .dg-content-body
    border: none
    color: #cacaca
  .userInfo
    .userImg
      width: 100%
      height: 220px
      overflow: auto
      & img
        width: 100%
  .notFound
    width: 100%
    line-height: 125px
    text-align: center
    color: #ffffff
    font-weight: bolder
    letter-spacing: -0.1em
    font-family: Open Sans Condensed
    text-shadow: 0 0 0.6rem rgba(0,0,0,.5)
</style>
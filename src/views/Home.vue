 <template>
  <div>
    <div v-if="loader" class="pageLoader"></div>
    <div class="slider">
      <div class="opacity">
        <h1>FCA</h1>
        <h3>flip learning platform</h3>
        <button @click="load">start</button>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
  .slider
    position: fixed
    top: 0px
    left: 0px
    background-image: url(../assets/img/port02.jpg), linear-gradient(45deg, #00000060, #ffffff50)
    background-repeat: no-repeat
    background-size: cover
    background-position: center
    width: 100vw
    z-index: 250039
    height: 100vh
    .opacity
      width: 100%
      height: 100%
      background: #00000090
      text-align: center
      color: #CACACA
      padding-top: 13%
      & h1
        font-weight: bold
        letter-spacing: -1px
        font-size: 50px
      & h3
        font-weight: lighter
        letter-spacing: 5px
      & button
        font-size: 30px
        color: #cacaca
        background: none
        letter-spacing: 2px
        border: 1px #cacaca solid
        padding: 5px 55px
        margin: 50px auto
        display: block
        width: fit-content
        transition: 0.3s
        &:hover
          background: #00000090
          text-decoration: none
          letter-spacing: 10px
          border: 1px #000 solid
          transition: 0.3s
</style>
<script>
import { mapMutations } from 'vuex';
  export default {
    data: () => ({
      loader: false
    }),
    created() {
      this.homePage()
    },
    mounted() {
      this.homePage()
    },
    methods: {
      ...mapMutations(['homePage']),
      load() {
        TweenMax.to('.pageLoader', 1, { width: '100%', left: '0%', ease: Expo.easeOut })
        setTimeout(() => {
          this.$router.push({name: 'Auth'})
        }, 250);
      }
    }
  }
</script>

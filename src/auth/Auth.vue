<template>
  <div class="loginPage">
    <div class="row loginBox">
      <div class="col-11">
        <form @submit.prevent="onSubmit">
          <div class="form-group" :class="{ 'hasError': $v.user.email.$error }">
            <label>E-Mail Address</label>
            <input class="form-control" v-model="user.email" name="login" label="Login" type="text">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input class="form-control" v-model="user.password" name="password" label="Password" id="password" type="password">
          </div>
          <div class="float-left">
            <router-link :to="{name: 'ForgotPassword'}" tag="a">Forgot Password ?</router-link>
          </div>
          <div class="float-right">
            <button type="submit" class="btn btn-warning">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
  .loginPage
    background-image: url('../assets/img/loginbg.jpg')
    background-size: cover
    background-position: center
    height: 100vh
    width: 100vw
    position: fixed
    left: 0px
    top: 0px
    z-index: 0
    .loginBox
      width: 25vw
      height: 100%
      float: right
      color: #fff
      background: #00000090
      padding: 50px 10px
      font-size: 12px
      @media (max-width: 500px)
        width: 100vw
      @media (min-width: 501px) and (max-width: 1200px)
        width: 50vw
      & input
        border: 1px #323232 solid
        background: #323232
        width: 100%
        color: #fff
        font-size: 12px !important
      & a
        line-height: 40px
        color: #fff
        text-decoration: underline

</style>
<script>
  import { mapMutations } from 'vuex';
  import { required, email, minLength } from 'vuelidate/lib/validators'
  export default {
    data() {
      return {
        user: {
          email: null,
          password: null
        },
        isUser: true
      }
    },
    validations: {
      user: {
        email: {required, email, min: minLength(3)},
      }
    },
    created() {
      this.homePage()
      TweenMax.to('.pageLoader', 1, { width: '0%', left: '100%', ease: Expo.easeOut })
    },
    methods: {
      ...mapMutations(['homePage']),
      onSubmit() {
        this.$v.user.$touch();
        if(this.$v.user.$error) {
          this.$toasted.show('Please fill in the required fields', {
            type: 'error',
            keepOnHover: true,
            theme: 'bubble'
          })
          return
        } else {
          TweenMax.to('.pageLoader', 1, { width: '100%', left: '0px', ease: Expo.easeOut })
          this.$store.dispatch('login', { ...this.user, isUser : this.isUser  })
        }
      }
    }
  }
</script>

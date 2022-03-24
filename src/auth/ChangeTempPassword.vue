<template>
  <div class="loginPage">
    <div class="row loginBox">
      <div class="col-11">
        <h5>Lütfen şifrenizi değiştirin</h5>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>E-Mail Address</label>
            <input class="form-control" v-model="user.email" name="login" label="Login" type="text">
          </div>
          <div class="form-group">
            <label>Old Password</label>
            <input class="form-control" v-model="user.oldpassword" name="oldpassword" label="Password" id="oldpassword" type="password">
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input class="form-control" v-model="user.newpassword" name="newpassword" label="Password" id="newpassword" type="password">
          </div>
          <div class="float-left">
            <router-link :to="{name: 'ForgotPassword'}" tag="a">Forgot Password ?</router-link>
          </div>
          <div class="float-right">
            <button type="submit" class="btn btn-warning">Change</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'
  export default {
    data() {
      return {
        user: {
          oldpassword: null,
          newpassword: null,
          email: null
        },
        isUser: true
      }
    },
    created() {
      this.homePage()
    },
    computed: {
      ...mapState(['apiLink','returncode'])
    },
    methods: {
      ...mapMutations(['homePage']),
      onSubmit() {
        TweenMax.to('.pageLoader', 1, { width: '100%', left: '0%', ease: Expo.easeOut })
        axios.put(
        this.apiLink + 'password/temp-password', { old_password: this.user.oldpassword, new_password: this.user.newpassword, email: this.user.email }, {method: 'PUT'},
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).then(response => {
        TweenMax.to('.pageLoader', 1, { width: '0px', left: '100%', ease: Expo.easeOut })
        let ret = response.data.status
        switch (ret) {
          case 200:
            this.$toasted.show('Şifreniz Başarıyla Değiştirildi', {
              type: 'success',
              duration: 2500,
              keepOnHover: true,
              theme: 'bubble'
            })
            location.replace('/auth')
          break
          default:
            this.$toasted.show(this.returncode[ret], {
              type: 'error',
              duration: 2500,
              keepOnHover: true,
              theme: 'bubble'
            })
            router.push('/auth')
          break
        }
      })
      }
    }
  }
</script>

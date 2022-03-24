<template>
  <div class="loginPage">
    <div class="row loginBox">
      <div class="col-11">
        <form @submit.prevent="onSubmit">
          <div class="form-group" :class="{ 'hasError': $v.user.email.$error }">
            <label>E-Mail Address</label>
            <input class="form-control" v-model="user.email" name="login" label="Login" type="text">
          </div>
          <div class="form-group" :class="{ 'hasError': $v.user.confirmation_code.$error }">
            <label>Confirmation Code</label>
            <input class="form-control" v-model="user.confirmation_code" name="confirmation_code" label="Confirmation Code" type="text">
          </div>
          <div class="form-group" :class="{ 'hasError': $v.user.new_password.$error }">
            <label>New Password</label>
            <input class="form-control" v-model="user.new_password" name="new_password" label="New Password" type="password">
          </div>
          <div class="float-right">
            <button type="button" @click="create()" class="btn btn-warning">Reset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapMutations } from 'vuex'
  import { required, email, minLength } from 'vuelidate/lib/validators'
  export default {
    data: () => ({
      user: {
        email: null,
        confirmation_code: null,
        new_password: null
      }
    }),
    validations: {
      user: {
        email: {required, email, min: minLength(3)},
        confirmation_code: {required, min: minLength(3)},
        new_password: {required, min: minLength(6)}
      }
    },
    computed: {
      ...mapState(['apiLink','returncode'])
    },
    methods: {
      ...mapMutations(['homePage']),
      create() {
        this.$v.user.$touch();
        if(this.$v.user.$error) {
          this.$toasted.show('Please fill in the required fields', {
            type: 'error',
            keepOnHover: true,
            theme: 'bubble'
          })
          return
        } else {
          this.$toasted.show('Please Wait...', {
            type: 'info',
            duration: 2500,
            keepOnHover: true,
            theme: 'bubble'
          })
          axios.put( this.apiLink + 'password/change-with-confirm?', { 
            email: this.user.email,
            confirmation_code: this.user.confirmation_code,
            new_password: this.user.new_password
          }).then(response => {
            let ret = response.data.status
            switch (ret) {
              case 200:
                this.$toasted.show('Şifreniz Sıfırlandı.', {
                  type: 'success',
                  duration: 2500,
                  keepOnHover: true,
                  theme: 'bubble'
                })
                this.$router.push({name: 'Auth'})
                break
              case 504:
                this.$toasted.show(this.returncode[ret], {
                  type: 'error',
                  duration: 2500,
                  keepOnHover: true,
                  theme: 'bubble'
                })
                this.$router.push({name: 'ForgotPassword'})
                break
              default:
                this.$toasted.show(this.returncode[ret], {
                  type: 'error',
                  duration: 2500,
                  keepOnHover: true,
                  theme: 'bubble'
                })
                break
            }
            })
        }
      }

    }
  }
</script>

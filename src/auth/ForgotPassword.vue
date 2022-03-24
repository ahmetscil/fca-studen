<template>
  <div class="loginPage">
    <div class="row loginBox">
      <div class="col-11">
        <form @submit.prevent="onSubmit">
          <div class="form-group" :class="{ 'hasError': $v.user.email.$error }">
            <label>E-Mail Address</label>
            <input class="form-control" v-model="user.email" name="login" label="Login" type="text">
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
  import { mapState } from 'vuex'
  import { required, email, minLength } from 'vuelidate/lib/validators'
  export default {
    data: () => ({
      user: {
        email: null
      }
    }),
    validations: {
      user: {
        email: {required, email, min: minLength(3)}
      }
    },
    computed: {
      ...mapState(['apiLink','returncode'])
    },
    methods: {
      create() {
        this.$v.user.$touch();
        if(this.$v.user.$error) {
          this.$toasted.show('Please fill in the required fields', {
            type: 'error',
            duration: 2500,
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
          axios.put( this.apiLink + 'password/reset?', { 
            email: this.user.email
          }).then(response => {
            let ret = response.data.status
            switch (ret) {
              case 200:
                this.$toasted.show('Password recovery mail has been sent', {
                  type: 'success',
                  duration: 2500,
                  keepOnHover: true,
                  theme: 'bubble'
                })
                this.$router.push({name: 'ChangePassword'})
              break
              default:
                this.$toasted.show(this.returncode[ret], {
                  type: 'error',
                  duration: 2500,
                  keepOnHover: true,
                  theme: 'bubble'
                })
                this.$router.push({name: 'Auth'})
              break
            }
          })
        }
      }

    }
  }
</script>

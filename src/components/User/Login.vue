<template>
  <b-container>
    <h2>Log In</h2>
    <b-form @submit="onSubmit">
      <div class="pb-1">
        <b-input placeholder="Email" v-model="email"></b-input>
      </div>
      <div class="pb-1">
        <b-input placeholder="Password" v-model="userPw"></b-input>
      </div>
      <div class="pb-1">
        <b-button type="submit" class="btn-dark">Login</b-button>
      </div>
      <div class="pb-1">
        <b-button type="join" class="btn-outline-dark">Join</b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
  export default {
    name: "Login",
    data: () => ({
      email: '',
      userPw: ''
    }),
    methods: {
      onSubmit() {
        console.log(this.email)
        console.log(this.userPw)
      }
    }
  }
</script>

<style scoped>
  button {
    width: 100%;
  }
</style>
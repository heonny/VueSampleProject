<template>
  <div>
    <h2>Log In</h2>
    <b-form @submit="onSubmit">
      <b-table-simple>
        <b-tr >
          <b-td>
            <b-input placeholder="Email" v-model="email"></b-input>
            <b-input placeholder="Password" v-model="userPw"></b-input>
          </b-td>
          <b-td colspan="2">
            <b-button type="submit" class="btn-dark">Login</b-button>
          </b-td>
        </b-tr>
      </b-table-simple>
      <div class="mt-1">
        <b-button type="join" class="mr-1 btn-danger">Join</b-button>
      </div>
    </b-form>
  </div>
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

</style>
<template>
    <b-container>
        <h2>Log In</h2>
        <div class="row">
            <div class="col-3">
            </div>
            <div class="col-6">
                <b-form>
                    <div class="pb-1">
                        <b-input placeholder="Email" v-model="email"></b-input>
                    </div>
                    <div class="pb-1">
                        <b-input placeholder="Password" v-model="userPw"></b-input>
                    </div>
                    <div class="pb-1">
                        <b-button class="btn btn-dark" v-on:click="goLogin">Login</b-button>
                    </div>
                    <div class="pb-1 pt-3">
                        <a class="pr-5" v-on:click="goFind">Forgot Password</a>
                        <a v-on:click="goJoin">Join</a>
                    </div>
                </b-form>
            </div>
            <div class="col-3">
            </div>
        </div>
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
        goLogin: function () {
            console.log(this.email)
            console.log(this.userPw)

            let vm = this
            let param = {
                "email": vm.email,
                "userPw": vm.userPw
            }
            vm.$http.post('/api/goLogin/', param).then(function () {
                console.log('Login Success')
            }).catch(function (e) {
                console.log('Fail : ' + e)
            })
        },
        goJoin() {
            console.log("Join")
        },
        goFind() {
            console.log("Find")
        }
    }
}
</script>

<style scoped>
button {
    width: 100%;
}
</style>
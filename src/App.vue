<template>
    <div id="app">
        <img alt="Rapod logo" src="./assets/ra-logo.png" width="10%" v-on:click="Redirect">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    methods: {
        Redirect() {
            this.$router.push('/')
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
}
</style>

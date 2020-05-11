<template>
  <div class="MainPage">
    <strong>File List</strong>
    <hr>

    <ul v-if="fileList && fileList.length">
      <li v-for="fileEl of fileList">
        {{fileEl.fileName}}<hr>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "MainPage",
    data: () => {
      return {
        fileList: []
      }
    },
    created() {
      this.$http.get('/api/getAllFiles').then(
          response => {
            this.fileList = response.data
          }
      ). catch(e => {
        console.log(e)
      })
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>
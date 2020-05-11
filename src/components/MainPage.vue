<template>
  <div class="MainPage">
    <b-card
        header="File Upload"
        style="max-width: 40rem; margin: auto; margin-top: 10vh;"
        class="mb-2"
        border-variant="info"
        align="left">
      <b-form-group id="file-input">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="10">
              <b-form-file v-model="file" id="file" ref="file" type="file" v-on:change="handleFileUpload()"/>
            </b-col>
            <b-col sm="2">
              <b-button variant="outline-primary" v-on:click="submitFile()">Submit!</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-form-group>
<!--      <b-list-group v-if="fileList && fileList.length">-->
<!--        <b-list-group-item-->
<!--          v-for="fileItem of fileList"-->
<!--          v-bind:data="fileItem.fileName"-->
<!--          v-bind:key="fileItem.fileNameKey">-->
<!--        </b-list-group-item>-->
<!--      </b-list-group>-->
    </b-card>
<!--    <div class="large-12 medium-12 small-12 cell">-->
<!--      <strong>File Upload</strong>-->
<!--      <hr>-->
<!--      <label>One File Upload<input type="file" id="file" ref="file"-->
<!--                                   v-on:change="handleFileUpload()"></label>-->
<!--      <button v-on:click="submitFile()">Submit</button>-->
<!--      <hr>-->
<!--      {{imageFile}}-->
<!--      <hr>-->

<!--    </div>-->
    <strong>File List</strong>
    <hr>
    <ul v-if="fileList && fileList.length">
      <li v-for="fileEl of fileList">
        {{fileEl.fileNameKey}}
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "MainPage",
    data: () => {
      return {
        fileList: [],
        file: ''
      }
    },
    created() {
      this.$http.get('/api/getAllFiles').then(
          response => {
            this.fileList = response.data
          }
      ).catch(e => {
        console.log(e)
      })
    },
    methods: {
      handleFileUpload() {
        this.file = this.$refs.file.files[0]
      },
      submitFile() {
        let formData = new FormData()
        formData.append('file', this.file)

        this.$http.post('/api/uploadFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function () {
          console.log('Success')
        }).catch(function () {
          console.log('Fail')
        })
      }
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
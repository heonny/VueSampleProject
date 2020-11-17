<template>
  <b-form-group id="file-input">
    <b-container>
      <b-row class="my-1">
        <b-col sm="10">
          <b-form-file v-model="files" id="files" ref="files" type="file" multiple
                       v-on:change="handleFileUpload()"/>
        </b-col>
        <b-col sm="2">
          <b-button variant="outline-primary" v-on:click="submitFile()">Submit!</b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-form-group>
</template>

<script>
  // import FileList from "./FileList";

  export default {
    name: "FileUpload",

    data: () => {
      return {
        fileList: [],
        files: []
      }
    },
    methods: {
      initFunc() {
        let vm = this
        vm.$http.get('/api/getAllFiles').then(
            response => {
              vm.fileList = response.data
              vm.files = null
            }
        ).catch(error => {
          console.log('Fail' + error)
        })
      },
      handleFileUpload() {
        let vm = this
        vm.files = vm.$refs.files.files
      },
      submitFile() {
        let formData = new FormData()
        let vm = this
        for (let i = 0; i < vm.files.length; i++) {
          let file = vm.files[i]
          // formData.append('files[' + i + ']', file)  // if need list
          formData.append('files', file)
          console.log('files[' + i + ']', file)
        }
        // formData.append('file', vm.file)

        if (!formData.has('files')) {
          console.log('No File Check')
          return
        }

        vm.$http.post('/api/uploadMultipleFiles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function () {
          console.log('Success')

          vm.initFunc()
          vm.file = ""
          this.$emit('submitMessage', "Success")
        }).catch(function (e) {
          console.log('Fail' + e)
        })
      },
    }
  }
</script>

<style scoped>

</style>
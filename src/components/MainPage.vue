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
              <b-form-file v-model="files" id="files" ref="files" type="file" multiple
                           v-on:change="handleFileUpload()"/>
            </b-col>
            <b-col sm="2">
              <b-button variant="outline-primary" v-on:click="submitFile()">Submit!</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-form-group>
      Current File List
      <b-list-group v-if="fileList && fileList.length">
        <b-list-group-item
            v-for="fileItem of fileList"
            v-bind:data="fileItem.fileName"
            v-bind:key="fileItem.fileNameKey">
          {{fileItem.fileName}}
          <b-button class="float-right" variant="outline-danger" v-on:click="deleteFile(fileItem)">
            Delete!
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
  export default {
    // vue.js의 Component 는 name, data, methods, created(init method)로 구성
    // name : 해당 vue Component 를 구별하는 이름
    name: "MainPage",
    // data : 이 Component(this)에 생성될 데이터들
    data: () => {
      return {
        fileList: [],
        files: []
      }
    },
    created() {
      this.initFunc()
    },
    // methods : name, data 처럼 이 vue가 실행할 수 있는 method들
    methods: {
      initFunc() {
        let vm = this
        vm.$http.get('/api/getAllFiles').then(
            response => {
              vm.fileList = response.data
            }
        ).catch(error => {
          console.log('Fail' + error)
        })
      },
      handleFileUpload() {
        let vm = this
        vm.files = vm.$refs.files.files[0]
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
        }).catch(function (e) {
          console.log('Fail' + e)
        })
      },
      deleteFile(fileItem) {
        console.log("Delete File Button Clicked")
        if (!fileItem) {
          console.log('Can not Detect File Item')
          return
        }
        let vm = this

        let reqData = {
          "fileNameKey": fileItem.fileNameKey
        }

        vm.$http.post('/api/fileDelete', reqData).then(
            response => {
              vm.initFunc()
              console.log(response.data)
            }
        ).catch(
            error => {
              console.log(error)
            }
        )
      }
    }
  }
</script>

<style scoped>

</style>
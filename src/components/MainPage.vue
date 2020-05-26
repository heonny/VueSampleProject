<template>
  <div>
    <b-card
        header="File Form"
        style="max-width: 40rem; margin: 10vh auto auto;"
        class="mb-2"
        border-variant="info"
        align="left" v-bind:style="backImg">
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

      <b-img :src="imgRaw" width="100%"></b-img>
      <b-list-group v-if="fileList && fileList.length">
        <div class="list-header">
          <span>Current File List</span>
          <span class="float-right">Number of files : {{fileList.length}}</span>
        </div>
        <b-list-group-item
            v-for="fileItem of fileList"
            v-bind:data="fileItem.fileName"
            v-bind:key="fileItem.fileNameKey" :class="backTrans">
          <b-icon-music-note-beamed
              v-if="fileItem.mimeType.includes('audio')"></b-icon-music-note-beamed>
          <b-icon-card-image v-else-if="fileItem.mimeType.includes('image')"></b-icon-card-image>
          <b-icon-file-earmark v-else></b-icon-file-earmark>
          {{fileItem.fileName}}
          <b-button class="float-right" variant="outline-danger"
                    v-on:click="deleteFile(fileItem)">
            Delete
          </b-button>
          <b-button class="float-right" variant="outline-primary" style="margin-right: 5px;"
                    v-on:click="downloadFile(fileItem)">
            View
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
  export default {
    // vue.js의 Component 는 name, data, methods, created(init method)로 구성
    // name : 해당 vue Component 를 구별
    name: "MainPage",
    // data : 이 Component(this)에 생성될 데이터
    data: () => {
      return {
        fileList: [],
        files: [],
        imgRaw: "",
        backToggle: true
      }
    },
    created() {
      this.initFunc()
    },
    computed: {
      backTrans: function () {
        return {
          backT000: this.backToggle,
          backT008: !this.backToggle
        }
      },
      backImg: function () {
        return {
          'background-image': 'url(' + this.imgRaw + ')'
        }
      }
    },
    // methods : name, data 와 같은 실행할 수 있는 method
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
      downloadFile(fileItem) {
        console.log("Download File Button Clicked")
        if (!fileItem) {
          console.log('Can not Detect File Item')
          return
        }
        let vm = this

        let reqData = fileItem.fileNameKey

        vm.$http.get('/api/downloadFile/' + reqData, {responseType: 'blob'}).then(
            function (response) {
              console.log(response.headers['content-type'])
              if (response.headers['content-type'].includes('image')) {
                let reader = new FileReader()
                reader.readAsDataURL(response.data)
                reader.onload = () => {
                  vm.imgRaw = reader.result
                }
                vm.backToggle = false
              } else {
                vm.imgRaw = null
                vm.backToggle = true
              }
              console.log('success!' + response)
            }).catch(function (response) {
          console.log(response)
        })
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
  .list-header {
    margin-left: 0;
    display: block;
    font-size: .875rem;
    color: #6c757d;
    white-space: nowrap;
  }

  .backT008 {
    background-color: rgba(0, 0, 0, 0.08);
  }

  .backT000 {
    background-color: rgba(0, 0, 0, 0);
  }

</style>
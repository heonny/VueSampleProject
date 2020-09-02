<template>
  <b-container>
    <b-card
        header="File Form"
        style="max-width: 40rem; margin: 30px auto auto;"
        class="mb-2"
        border-variant="info"
        align="left" v-bind:style="backImg">
      <b-form-group id="file-input">
        <b-row>
          <b-col cols="9">
            <b-form-file v-model="files" id="files" ref="files" type="file" multiple
                         v-on:change="handleFileUpload()"/>
          </b-col>
          <b-col class="btnSm" cols="3">
            <b-button variant="outline-primary" v-on:click="submitFile()">Submit!</b-button>
          </b-col>
        </b-row>
      </b-form-group>

      <b-img v-if="imgRaw" :src="imgRaw" width="100%"></b-img>
      <p v-else>{{ this.curFile }}</p>
      <b-list-group v-if="fileList && fileList.length">
        <div class="list-header">
          <span>Current File List</span>
          <span class="float-right">Number of files : {{ fileList.length }}</span>
        </div>
        <b-list-group-item
            v-for="fileItem of fileList"
            v-bind:data="fileItem.fileName"
            v-bind:key="fileItem.fileNameKey" :class="backTrans">
          <b-row>
            <b-col class="align-self-center" cols="6">
              <b-icon-music-note-beamed
                  v-if="fileItem.mimeType.includes('audio')"></b-icon-music-note-beamed>
              <b-icon-card-image v-else-if="fileItem.mimeType.includes('image')"></b-icon-card-image>
              <b-icon-file-earmark v-else></b-icon-file-earmark>
              {{ fileItem.fileName }}
            </b-col>
            <b-col class="btnCol" cols="2">
              <b-button class="float-right" variant="outline-danger"
                        v-on:click="deleteFile(fileItem)">Del
              </b-button>
            </b-col>
            <b-col class="btnCol" cols="2">
              <b-button class="float-right" variant="outline-primary"
                        v-on:click="viewFile(fileItem)">View
              </b-button>
            </b-col>
            <b-col class="btnCol" cols="2">
              <b-button class="float-right" variant="outline-primary"
                        v-on:click="downFile(fileItem)">Down
              </b-button>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
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
      curFile: null,
      imgRaw: null,
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
        // 'background-image': 'url(' + this.imgRaw + ')'
      }
    },
    initF: function () {
      return {
        imgRaw: null,
        backToggle: true
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
    viewFile(fileItem) {
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
              // vm.backToggle = false
            } else {
              console.log(response.headers['content-disposition'])
              vm.curFile = vm.getFileName(response.headers['content-disposition'])
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
    },
    getFileName(content) {
      let result = content.slice(content.indexOf('"')).replace(/"/g, '').replace(/\+/g, ' ')
      console.log(result)
      return result
    },
    downFile(fileItem) {
      console.log("Down File Button Clicked")
      if (!fileItem) {
        console.log("Can't detect FileItem")
      }
      let vm = this
      let reqData = fileItem.fileNameKey
      vm.$http.post('/api/downFile/' + reqData, "", {responseType: "blob"}).then(
          res => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            const contentDisposition = res.headers['content-disposition']

            let fileName = 'unknown'
            if (contentDisposition) {
              const [fileNameMatch] = contentDisposition.split(';').filter(str => str.includes('filename'))
              if (fileNameMatch) {
                [, fileName] = fileNameMatch.split('=')
              }
            }
            link.href = url
            link.setAttribute('download', `${fileName}`)
            link.style.cssText = 'display:none'
            document.body.appendChild(link)
            link.click()
            link.remove()
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
button {
  width: 100%;
}

.btnSm {
  padding-left: 0;
}

.btnCol {
  padding-left: 10px;
  padding-right: 0;
}

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
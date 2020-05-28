<template>
  <div>
    <b-card
        header="File Form"
        style="max-width: 40rem; margin: 30px auto auto;"
        class="mb-2"
        border-variant="info"
        align="left" v-bind:style="backImg">
      <file-upload></file-upload>
      <file-list></file-list>
    </b-card>
  </div>
</template>

<script>
  import FileUpload from "./FileUpload";
  import FileList from "./FileList";

  export default {
    // vue.js의 Component 는 name, data, methods, created(init method)로 구성
    // name : 해당 vue Component 를 구별
    name: "FileController",
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
      }
    },
    components: {
      'file-upload': FileUpload,
      'file-list': FileList
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
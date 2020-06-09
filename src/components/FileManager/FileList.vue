<template>
  <div>
    <b-img v-if="imgRaw" :src="imgRaw" width="100%"></b-img>
    <p v-else>{{this.curFile}}</p>
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
  </div>
</template>

<script>
  export default {
    name: "FileList",

    data: () => {
      return {
        fileList: [],
        files: [],
        curFile: null,
        imgRaw: null
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
      }
    },
    methods: {
      initFunc() {
        let vm = this
        console.log('init called')
        vm.$http.get('/api/getAllFiles').then(
            response => {
              vm.fileList = response.data
            }
        ).catch(error => {
          console.log('Fail' + error)
        })
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
        let result = decodeURI(
            content.slice(content.indexOf('"')).replace(/"/g, '').replace(/\+/g, ' ')
        )
        console.log(result)
        return result
      }
    }
  }
</script>

<style scoped>

</style>
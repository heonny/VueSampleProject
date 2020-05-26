<template>
  <b-list-group v-if="fileList && fileList.length">
    <b-list-group-item
        v-for="fileItem of fileList"
        v-bind:data="fileItem.fileName"
        v-bind:key="fileItem.fileNameKey">
      <b-icon-music-note-beamed v-if="fileItem.mimeType.includes('audio')"></b-icon-music-note-beamed>
      <b-icon-card-image v-else-if="fileItem.mimeType.includes('image')"></b-icon-card-image>
      <b-icon-file-earmark v-else></b-icon-file-earmark>
      {{fileItem.fileName}}
      <b-button class="float-right" variant="outline-danger" v-on:click="deleteFile(fileItem)">
        Delete
      </b-button>
      <b-button class="float-right" variant="outline-primary" style="margin-right: 5px;"
                v-on:click="downloadFile(fileItem)">
        Download
      </b-button>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
  export default {
    name: "FileList",

    data: () => {
      return {
        fileList: [],
        files: []
      }
    },
    created() {
      this.initFunc()
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

        vm.$http.get('/api/downloadFile/' + reqData).then(function (data) {
          console.log('success!' + data)
        }).catch(function (data) {
          console.log(data)
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
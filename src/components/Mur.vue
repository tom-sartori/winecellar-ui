<template>
  <div>
    <header>
      <h3>{{ content }}</h3>
    </header>

    <input
        style="display: none"
        type="file"
        @change="onFileSelected"
        ref="fileInput">
    <button @click="$refs.fileInput.click()">Choisir une image</button>
    <button @click="onUpload">Télécharger</button>

    <img v-if="murImageSrc" alt="image" :src="murImageSrc">

  </div>
</template>

<script>
import UserService from "../services/user.service"
import axios from "axios";
import CONSTANTS from '../config/constants'

export default {
  name: "MurItem",
  data() {
    return {
      content: "",
      selectedFile: null,
      murImageSrc: null
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      fd.append('caveId', '1')  // TODO : create a cave.
      axios.post(process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.CAVE.MUR + CONSTANTS.ROOT.ACTION.CREATE, fd, {
        onUploadProgress: uploadEvent => {
          console.log('Upload progress : ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
        }
      })
          .then(res => {
            this.murImageSrc = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.IMAGE.MUR_IMAGE_PATH + '/' + res.data.image
          })
    }
  },
  mounted() {
    UserService.getPublicContent()
        .then( (response) => {
              this.content = response.data
            },
            (error) => {
              this.content =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString()
            }
        )
  },
}
</script>

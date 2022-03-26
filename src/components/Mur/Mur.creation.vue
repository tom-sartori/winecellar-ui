<template>
  <div>
    <input
        style="display: none"
        type="file"
        @change="onFileSelected"
        ref="fileInput">
    <button @click="$refs.fileInput.click()">Choisir une image</button>
    <button @click="onUpload">Télécharger</button>
  </div>
</template>

<script>
import MurService from "../../services/Mur.service"

export default {
  name: "MurCreation",
  props: {
    caveId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: "",
      selectedFile: null,
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      fd.append('caveId', this.caveId)

      MurService.createMur(fd)
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
    }
  }
}
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <input
        style="display: none"
        type="file"
        @change="onFileSelected"
        ref="fileInput">
    <button @click="$refs.fileInput.click()" v-text="buttonSelectText"></button>
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
      title: 'Ajouter un mur à ma cave',
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
                this.selectedFile = null
                this.$emit('isMurListUpdated')
              },
              (error) => {
                this.content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    }
  },
  computed: {
    buttonSelectText () {
      if (this.selectedFile) {
        return 'Appeyer sur télécharger pour valider'
      }
      else {
        return 'Choisir une image'
      }
    }
  }
}
</script>

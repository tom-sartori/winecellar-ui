<template>
  <div class="divMain">
    <h3 class="h3">{{ title }}</h3>

    <div v-show="isLoading" class="progress">
      <div class="indeterminate"></div>
    </div>

    <input
        style="display: none"
        type="file"
        @change="onFileSelected"
        ref="fileInput">
    <button @click="$refs.fileInput.click()" v-text="buttonSelectText" :disabled="isLoading"></button>
    <button @click="onUpload" :disabled="isLoading">Télécharger</button>
  </div>
</template>

<script>
import WallService from "../../services/Wall.service"

export default {
  name: "WallCreation",
  props: {
    cellarId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: 'Ajouter un wall à ma cellar',
      content: "",
      selectedFile: null,
      isLoading: false
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
      this.isLoading = true
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      fd.append('cellarId', this.cellarId)

      WallService.createWall(fd)
          .then( (response) => {
                this.content = response.data
                this.selectedFile = null
                this.$emit('isWallListUpdated')
                this.isLoading = false
              },
              (error) => {
                this.isLoading = false
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

<style scoped>

button {
  font-size: var(--normal-text-size);
  margin: 20px;
}

</style>

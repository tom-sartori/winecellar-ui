<template>
  <div class="main">
    <h3>{{ title }}</h3>

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
      fd.append('caveId', this.caveId)

      MurService.createMur(fd)
          .then( (response) => {
                this.content = response.data
                this.selectedFile = null
                this.$emit('isMurListUpdated')
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

.main {
  background-color: var(--blue-3);
  border-radius: var(--border-radius);
  padding: 20px;
}

button {
  font-size: var(--normal-text-size);
  margin: 10px;
}

</style>

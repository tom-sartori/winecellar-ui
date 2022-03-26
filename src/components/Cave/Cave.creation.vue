<template>
  <div>
    <label for="caveName"></label>
    <input
        v-model="newCaveName"
        name="caveName"
        id="caveName"
        type="text"
        placeholder="Nom de ma cave"
    >
    <button @click="onAddCave">Ajouter</button>

    <p>{{content}}</p>
  </div>
</template>

<script>
import CaveService from "../../services/Cave.service"

export default {
  name: "CaveCreation",
  data() {
    return {
      content: "",
      newCaveName: ""
    }
  },
  methods: {
    onAddCave() {
      CaveService.createCave(this.newCaveName)
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

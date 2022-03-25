<template>
  <div>

    <ul>
      <li
          v-for="bouteille in listBouteille"
          :key="bouteille.id"
      >
        {{ bouteille }}

        <button @click="handlerClickButtonSub(bouteille.id)">-</button>
        <button @click="handlerClickButtonAdd(bouteille.id)">+</button>
      </li>
    </ul>

    {{ errorMessage }}

  </div>
</template>

<script>
import BouteilleService from "../services/bouteille.service"
import EmplacementService from "../services/emplacement.service"

export default {
  name: "BouteilleEmplacementList",
  props: {
    emplacementId: {
      String,
      required: true
    }
  },
  watch: {
    emplacementId() {
      this.fetchBouteille()
    }
  },
  data() {
    return {
      listBouteille: '',
      errorMessage: ''
    }
  },
  mounted() {
    this.fetchBouteille()
  },
  methods: {
    fetchBouteille () {
      BouteilleService.getListBouteilleByEmplacement(this.emplacementId)
          .then( (response) => {
                this.listBouteille = response.data
              },
              (error) => {
                this.errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    handlerClickButtonSub (bouteilleId) {
      this.updateEmplacement(bouteilleId, -1)
    },
    handlerClickButtonAdd (bouteilleId) {
      this.updateEmplacement(bouteilleId, 1)
    },
    updateEmplacement (bouteilleId, quantity) {
      // Locally update the value while de request is processing, for more reactivity.
      this.listBouteille.forEach( bouteille => {
        if (bouteille.id === bouteilleId) {
          bouteille.quantity = parseInt(bouteille.quantity, 10) + quantity
        }
      })
      // Send the request.
      EmplacementService.updateEmplacement(this.emplacementId, bouteilleId, quantity)
          .then( () => {
                this.fetchBouteille()
              },
              (error) => {
                this.errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    }
  }
}
</script>

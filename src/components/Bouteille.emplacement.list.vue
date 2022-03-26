<template>
  <div>

    <ul>
      <li
          v-for="bouteille in listBouteille"
          :key="bouteille.id"
      >
        {{ bouteille }}

        <!-- Used to remove a bottle from an emplacement.-->
        <button @click="handlerClickButtonSub(bouteille)" v-if="emplacementId" v-text="subButtonText(bouteille)"></button>
        <!-- Used to add a bottle from an emplacement.-->
        <button @click="handlerClickButtonAdd(bouteille.id)" v-if="emplacementId">+</button>
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
    murId: {
      String,
      required: false
    },
    emplacementId: {
      String,
      required: false
    },
    isBouteilleListUpdated: {
      Boolean,
      required: true
    }
  },
  watch: {
    murId() {
      this.fetchListBouteille()
    },
    emplacementId() {
      this.fetchListBouteille()
    },
    isBouteilleListUpdated () {
      this.fetchListBouteille()
    }
  },
  data() {
    return {
      listBouteille: '',
      errorMessage: ''
    }
  },
  mounted() {
    this.fetchListBouteille()
  },
  methods: {
    fetchListBouteille () {
      let fetchFunction = null
      let fetchParam = null

      if (this.emplacementId) {
        console.log('emplacementId : ' + this.emplacementId)
        fetchFunction = BouteilleService.getListBouteilleByEmplacement
        fetchParam = this.emplacementId
      }
      else if (this.murId) {
        console.log('murId : ' + this.murId)
        fetchFunction = BouteilleService.getListBouteilleByMur
        fetchParam = this.murId
      }
      else {
        console.log('by user ')
        fetchFunction = BouteilleService.getListBouteille
        fetchParam = null
      }

      // BouteilleService.getListBouteilleByEmplacement(this.emplacementId)
      fetchFunction(fetchParam)
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
    handlerClickButtonSub (bouteille) {
      if (bouteille.quantity <= 0) {
        // Remove the bottle from the emplacement.
        BouteilleService.deleteByEmplacement(bouteille.id, this.emplacementId)
            .then( () => {
                  this.fetchListBouteille()
                },
                (error) => {
                  this.errorMessage =
                      (error.response && error.response.data && error.response.data.message) ||
                      error.message ||
                      error.toString()
                }
            )
      }
      else {
        this.updateEmplacement(bouteille.id, -1)
      }
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
                this.fetchListBouteille()
              },
              (error) => {
                this.errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    subButtonText (bouteille) {
      if (bouteille.quantity < 1) {
        return 'x'
      }
      return '-'
    }
  }
}
</script>

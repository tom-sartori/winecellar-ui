<template>
  <div class="divMain">
    <h3 v-if="listBouteille.length || isLoading" class="h3">{{ captionText }}</h3>

    <div v-show="isLoading" ref="loading" class="progress">
      <div class="indeterminate"></div>
    </div>

    <table v-if="listBouteille.length" class="striped highlight centered responsive-table">
<!--      <caption v-text="captionText"></caption>-->
      <thead>
      <tr>
        <th>Quantité</th>
        <th>Nom</th>
        <th>Appellation</th>
        <th>Domaine</th>
        <th>Millésime</th>
        <th>Type de vin</th>
        <th>Taille de la bouteille</th>
        <th v-if="emplacementId">Actions</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="bouteille in listBouteille"
          :key="bouteille.id">
        <td>{{ bouteille.quantity }}</td>
        <td>{{ bouteille.bouteille.nomBouteille.name }}</td>
        <td>{{ bouteille.bouteille.appellation.name }}</td>
        <td>{{ bouteille.bouteille.domaine.name }}</td>
        <td>{{ bouteille.bouteille.millesime.name }}</td>
        <td>{{ bouteille.bouteille.typeVin.name }}</td>
        <td>{{ bouteille.bouteille.tailleBouteille.name }}</td>
        <td v-if="emplacementId">
          <!-- Used to remove a bottle from an emplacement.-->
          <button @click="handlerClickButtonSub(bouteille)" v-if="emplacementId">
            <i class="material-icons" v-text="subButtonText(bouteille)"></i>
          </button>
          <!-- Used to add a bottle from an emplacement.-->
          <button @click="handlerClickButtonAdd(bouteille.id)" v-if="emplacementId">
            <i class="material-icons">add_circle_outline</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    {{ errorMessage }}

  </div>
</template>

<script>
import BouteilleService from "../../services/Bouteille.service"
import EmplacementService from "../../services/Emplacement.service"

export default {
  name: "BouteilleList",
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
      errorMessage: '',
      isLoading: true
    }
  },
  mounted() {
    this.fetchListBouteille()
  },
  methods: {
    fetchListBouteille () {
      this.isLoading = true
      let fetchFunction = null
      let fetchParam = null

      // This component displays a list on bottles. This list can be for an emplacement, a 'mur' or the full list of an user.
      // So we set de good function and attrivutes.
      if (this.emplacementId) {
        fetchFunction = BouteilleService.getListBouteilleByEmplacement
        fetchParam = this.emplacementId
      }
      else if (this.murId) {
        fetchFunction = BouteilleService.getListBouteilleByMur
        fetchParam = this.murId
      }
      else {
        fetchFunction = BouteilleService.getListBouteille
        fetchParam = null
      }

      // BouteilleService.getListBouteilleByEmplacement(this.emplacementId)
      fetchFunction(fetchParam)
          .then( (response) => {
                this.listBouteille = response.data
                this.isLoading = false
              },
              (error) => {
                this.isLoading = false
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
        return 'delete_forever'
      }
      return 'remove'
    }
  },
  computed: {
    captionText () {
      let text = "Liste des bouteilles"
      if (this.emplacementId) {
        return text + " dans l'emplacement sélectionné"
      }
      else if (this.murId) {
        return text + " dans le mur sélectionné"
      }
      else {
        return text
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

table {
  border-collapse: collapse;
  border-radius: var(--border-radius);
  overflow: hidden;
  font-size: var(--normal-text-size);
}

thead {
  background-color: var(--clear-color);
  font-size: var(--thead-text-size);
}

th, td {
  padding: 1em;
  border-bottom: 2px solid white;
}

</style>

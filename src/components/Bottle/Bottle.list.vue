<template>
  <div class="divMain">
    <h3 v-if="listBottle.length || isLoading" class="h3">{{ captionText }}</h3>

    <div v-show="isLoading" ref="loading" class="progress">
      <div class="indeterminate"></div>
    </div>

    <table v-if="listBottle.length" class="striped highlight centered responsive-table">
<!--      <caption v-text="captionText"></caption>-->
      <thead>
      <tr @click="handlerOnclickThead">
        <th abbr="quantity">Quantité</th>
        <th abbr="name">Nom</th>
        <th abbr="designation">Appellation</th>
        <th abbr="vineyard">Domaine viticole</th>
        <th abbr="vintage">Millésime</th>
        <th abbr="wineType">Type de vin</th>
        <th abbr="bottleSize">Taille de la bouteille</th>
        <th v-if="compartmentId">Actions</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="bottle in listBottle"
          :key="bottle.id">
        <td>{{ bottle.quantity }}</td>
        <td>{{ bottle.bottleName.name }}</td>
        <td>{{ bottle.designation.name }}</td>
        <td>{{ bottle.vineyard.name }}</td>
        <td>{{ bottle.vintage.name }}</td>
        <td>{{ bottle.wineType.name }}</td>
        <td>{{ bottle.bottleSize.name }}</td>
        <td v-if="compartmentId">
          <!-- Used to remove a bottle from an compartment.-->
          <button @click="handlerClickButtonSub(bottle)" v-if="compartmentId">
            <i class="material-icons" v-text="subButtonText(bottle)"></i>
          </button>
          <!-- Used to add a bottle from an compartment.-->
          <button @click="handlerClickButtonAdd(bottle.id)" v-if="compartmentId">
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
import BottleService from "../../services/Bottle.service"
import CompartmentService from "../../services/Compartment.service"

export default {
  name: "BottleList",
  props: {
    wallId: {
      String,
      required: false
    },
    compartmentId: {
      String,
      required: false
    },
    isBottleListUpdated: {
      Boolean,
      required: true
    }
  },
  watch: {
    wallId() {
      this.fetchListBottle()
    },
    compartmentId() {
      this.fetchListBottle()
    },
    isBottleListUpdated () {
      this.fetchListBottle()
    }
  },
  data() {
    return {
      listBottle: '',
      errorMessage: '',
      isLoading: true,
      currentOrder: 'name',
      currentDirection: 'ASC'
    }
  },
  mounted() {
    this.fetchListBottle()
  },
  methods: {
    fetchListBottle () {
      this.isLoading = true
      let fetchFunction = null

      let fetchParam = {}
      fetchParam.order = this.currentOrder
      fetchParam.direction = this.currentDirection

      // This component displays a list on bottles. This list can be for an compartment, a 'wall' or the full list of an user.
      // So we set de good function and attributes.
      if (this.compartmentId) {
        fetchFunction = BottleService.getListBottleByCompartment
        fetchParam.compartmentId = this.compartmentId
      }
      else if (this.wallId) {
        fetchFunction = BottleService.getListBottleByWall
        fetchParam.wallId = this.wallId
      }
      else {
        fetchFunction = BottleService.getListBottle
      }

      /// FIXME : Need order direction
      // BottleService.getListBottleByCompartment(this.compartmentId)
      fetchFunction(fetchParam)
          .then( (response) => {
                this.listBottle = response.data
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
    handlerClickButtonSub (bottle) {
      if (bottle.quantity <= 0) {
        // Remove the bottle from the compartment.
        BottleService.deleteByCompartment(bottle.id, this.compartmentId)
            .then( () => {
                  this.fetchListBottle()
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
        this.updateCompartment(bottle.id, -1)
      }
    },
    handlerClickButtonAdd (bottleId) {
      this.updateCompartment(bottleId, 1)
    },
    updateCompartment (bottleId, quantity) {
      // Locally update the value while de request is processing, for more reactivity.
      this.listBottle.forEach( bottle => {
        if (bottle.id === bottleId) {
          bottle.quantity = parseInt(bottle.quantity, 10) + quantity
        }
      })
      // Send the request.
      CompartmentService.updateCompartment(this.compartmentId, bottleId, quantity)
          .then( () => {
                this.fetchListBottle()
              },
              (error) => {
                this.errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    subButtonText (bottle) {
      if (bottle.quantity < 1) {
        return 'delete_forever'
      }
      return 'remove'
    },
    handlerOnclickThead (event) {
      if (event.target.abbr === '') {
        return
      }
      if (this.currentOrder === event.target.abbr) {  // Changing direction
        this.currentDirection = this.currentDirection === 'ASC' ? 'DESC' : 'ASC'
      }
      else {
        this.currentOrder = event.target.abbr
        this.currentDirection = 'ASC'
      }
      this.fetchListBottle()
    }
  },
  computed: {
    captionText () {
      let text = "Liste des bouteilles"
      if (this.compartmentId) {
        return text + " dans le compartiment sélectionné"
      }
      else if (this.wallId) {
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

th[abbr]:hover {
  cursor: pointer;
}

</style>

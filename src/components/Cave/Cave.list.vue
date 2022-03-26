<template>
  <div>
    <h3>{{ title }}</h3>
    <label>
      <select @change="selectId">
        <option disabled selected value> -- Sélectionnez une cave -- </option>
        <option
            v-for="(item) in options"
            :key="item.id"
            :value="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </label>

    <p>{{content}}</p>
  </div>
</template>

<script>
import CaveService from "../../services/Cave.service"

export default {
  name: "CaveList",
  props: {
    isCaveUpdated: {
      Boolean,
      required: true
    }
  },
  watch: {
    isCaveUpdated() {
      this.fetchCaveList()  // Trigerred when a cave is added. It means that we need to update the cave list.
    }
  },
  data() {
    return {
      title: 'Sélectionner une cave',
      content: "",
      options: {},
      selectedId: '',
    }
  },
  mounted() {
    this.fetchCaveList()
  },
  methods: {
    fetchCaveList () {
      CaveService.getCave()
          .then( (response) => {
                this.options = response.data
              },
              (error) => {
                this.listCave =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    selectId (event) {
      if(event.target.options.selectedIndex > -1) {
        this.selectedId = event.target.options[event.target.options.selectedIndex].value
        this.$emit('selected-caveId', event.target.options[event.target.options.selectedIndex].value)
      }
    }
  }
}
</script>

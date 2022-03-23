<template>
  <div>
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
import CaveService from "../services/cave.service"

export default {
  name: "CaveList",
  data() {
    return {
      content: "",
      options: {},
      selectedId: '',
    }
  },
  mounted() {
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
  methods: {
    selectId (event) {
      if(event.target.options.selectedIndex > -1) {
        this.selectedId = event.target.options[event.target.options.selectedIndex].value
        this.$emit('selected-caveId', event.target.options[event.target.options.selectedIndex].value)
      }
    }
  }
}
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <label>
      <select @change="selectId">
        <option disabled selected v-text="loadingText"></option>
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
      loadingText: '',
      options: {},
      selectedId: '',
    }
  },
  mounted() {
    this.fetchCaveList()
  },
  methods: {
    fetchCaveList () {
      this.loadingText = 'Chargement...'
      CaveService.getCave()
          .then( (response) => {
                this.options = response.data
                this.loadingText = '-- Sélectionnez une cave -- '
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

<style scoped>

select {
  display: flex;
  border-radius: var(--border-radius);
  border: 0;
  outline: none;
  font-size: var(--normal-text-size);
  background-color: var(--clear-color);
}

select, option {
  padding-left: 30px;
}

select:hover {
  background-color: var(--hover-color);
}



</style>

<template>
  <div>
    <h3 class="h3">{{ title }}</h3>
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
import CellarService from "../../services/Cellar.service"

export default {
  name: "CellarList",
  props: {
    isCellarUpdated: {
      Boolean,
      required: true
    }
  },
  watch: {
    isCellarUpdated() {
      this.fetchCellarList()  // Trigerred when a cellar is added. It means that we need to update the cellar list.
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
    this.fetchCellarList()
  },
  methods: {
    fetchCellarList () {
      this.loadingText = 'Chargement...'
      CellarService.getCellar()
          .then( (response) => {
                this.options = response.data
                this.loadingText = '-- Sélectionnez une cave -- '
              },
              (error) => {
                this.listCellar =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    selectId (event) {
      if(event.target.options.selectedIndex > -1) {
        this.selectedId = event.target.options[event.target.options.selectedIndex].value
        this.$emit('selected-cellarId', event.target.options[event.target.options.selectedIndex].value)
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

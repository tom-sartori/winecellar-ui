<template>
  <div>

    <ul>
      <li
          v-for="bouteille in content"
          :key="bouteille.id"
      >
        {{ bouteille }}
      </li>
    </ul>

    {{ errorMessage }}

  </div>
</template>

<script>
import BouteilleService from "../services/bouteille.service"

export default {
  name: "BouteilleList",
  data() {
    return {
      content: '',
      errorMessage: ''
    }
  },
  mounted() {
    BouteilleService.getListBouteille()
        .then( (response) => {
              this.content = response.data
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
</script>

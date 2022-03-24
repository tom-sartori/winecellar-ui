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


  </div>
</template>

<script>
import BouteilleService from "../services/bouteille.service"

export default {
  name: "BouteilleList",
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    BouteilleService.getListBouteille()
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
</script>

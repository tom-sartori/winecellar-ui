<template>
  <div v-if="currentUser">
    <h3>
      {{ title }}
    </h3>
    <p>
      <strong>Email :</strong>
      {{currentUser.email}}
    </p>
    <p>
      <strong>Nom de famille :</strong>
      {{currentUser.lastName}}
    </p>
    <p>
      <strong>Prénom :</strong>
      {{currentUser.firstName}}
    </p>
    <p v-if="isAdmin">
      <strong>Vous êtes administrateur. </strong>
    </p>

    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
import UtilisateurService from "../../services/Utilisateur.service"


export default {
  name: 'UserDetail',
  data() {
    return {
      title: 'Mon profile',
      currentUser: null,
      errorMessage: null
    }
  },
  mounted() {
    this.fetchUser()

  },
  methods: {
    fetchUser() {
      const user = this.$store.state.auth.user
      UtilisateurService.getUser(user.id)
          .then((response) => {
                this.currentUser = response.data
              },
              (error) => {
                this.errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    isAdmin() {
      for (let role of this.currentUser.roles) {
        if (role.name === 'admin') {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>

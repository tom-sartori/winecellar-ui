<template>
  <div class="divMain">

    <div v-show="isLoading" ref="loading" class="progress">
      <div class="indeterminate"></div>
    </div>

    <div v-if="currentUser">
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
    </div>

    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
import UtilisateurService from "../../services/Utilisateur.service"


export default {
  name: 'UserDetail',
  data() {
    return {
      currentUser: null,
      isLoading: true,
      errorMessage: null
    }
  },
  mounted() {
    this.fetchUser()

  },
  methods: {
    fetchUser() {
      this.isLoading = true
      const user = this.$store.state.auth.user
      UtilisateurService.getUser(user.id)
          .then((response) => {
                this.currentUser = response.data
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
    }
  },
  computed: {
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

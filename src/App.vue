<template>
  <div id="app">
    <nav>
      <ul>

        <!--  Home page for all users. -->
        <li>
          <router-link to="/home">Accueil</router-link>
        </li>

        <!--  Cave -->
        <li v-if="currentUser">
          <router-link to="/cave">Cave</router-link>
        </li>

        <!--  Bouteille -->
        <li v-if="currentUser">
          <router-link to="/bouteille">Bouteille</router-link>
        </li>


        <!--  Admin part. -->
        <li v-if="showAdminBoard">
          <router-link to="/admin">Administration</router-link>
        </li>

        <!--  User part  -->
        <li v-if="currentUser">
          <router-link to="/user">Partie utilisateur</router-link>
        </li>

        <!--  Without connected user. -->
        <li v-if="!currentUser">
          <router-link to="/register">S'enregistrer</router-link>
        </li>
        <li v-if="!currentUser">
          <router-link to="/login">S'identifier</router-link>
        </li>

        <!--  User connected.  -->
        <li v-if="currentUser">
          <router-link to="/profile">{{ currentUser.username }}</router-link>
        </li>
        <li v-if="currentUser">
          <router-link @click.prevent="logOut" to="/home">Deconnexion</router-link>
        </li>

      </ul>
    </nav>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN')
      }
      return false
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
          .then( () => {
            this.$router.push('/login')
          })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
li {
  list-style: none;
}
</style>

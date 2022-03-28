<template>
  <div id="app" class="row">
    <nav class="navbar-fixed">
      <div class="nav-wrapper">
        <ul class="left hide-on-med-and-down">
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

          <!--  Without connected user. -->
          <li v-if="!currentUser">
            <router-link to="/register">Créer un compte</router-link>
          </li>
          <li v-if="!currentUser">
            <router-link to="/login">Se connecter</router-link>
          </li>

          <!--  User connected.  -->
          <li v-if="currentUser">
            <router-link to="/profile">Mon profile</router-link>
          </li>
          <li v-if="currentUser">
            <router-link @click.prevent="logOut" to="/home">Deconnexion</router-link>
          </li>

        </ul>
      </div>
    </nav>
    <div>
      <router-view class="col s10 offset-s1"/>
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

:root {
  --background-color: #ababb3;
  --text-color-dark: #2c3e50;
  --text-color-white: white;
  --dark-color: black;
  --clear-color: white;
  --hover-color: grey;
  --blue: #3532A7;  /* // #646ECB */
  --blue-1: #00334E;
  --blue-2: #145374;
  --blue-3: #5588A3;
  --border-radius: 50px;
  --normal-text-size: 18px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color-dark);
  margin-top: 0;
}

body {
  background-color: var(--background-color);
}

button {
  border-radius: var(--border-radius);
  font-size: var(--normal-text-size);
  background-color: var(--clear-color);
  border: 0;
  padding: 10px;
}

button:hover {
  background-color: var(--hover-color);
  cursor: grab;
}

select:hover {
  cursor: grab;
  background-color: var(--hover-color);
}


</style>

<style scoped>
li {
  list-style: none;
}
</style>

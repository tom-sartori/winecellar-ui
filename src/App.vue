<template>
  <div id="app" class="row">
    <div class="navbar-fixed">
      <nav class="nav-center grey" role="navigation">
        <div class="nav-wrapper container">
          <ul>
            <li>
              <router-link to="/home">
                <i class="fa-solid fa-house-chimney fa-2xl"></i>
              </router-link>
            </li>

            <!--  Cave -->
            <li v-if="currentUser">
              <router-link to="/cave">
                <i class="fa-solid fa-wine-glass fa-2xl"></i>
              </router-link>
            </li>

            <!--  Bouteille -->
            <li v-if="currentUser">
              <router-link to="/bouteille">
                <i class="fa-solid fa-wine-bottle fa-2xl"></i>
              </router-link>
            </li>

            <!--  Admin part. -->
            <li v-if="showAdminBoard">
              <router-link to="/admin">
                <i class="fa-solid fa-user-shield fa-2xl"></i>
              </router-link>
            </li>

            <!--  Without connected user. -->
            <li v-show="!currentUser">
              <router-link to="/register">
                <i class="fa-solid fa-user-plus fa-2xl"></i>
              </router-link>
            </li>
            <li v-if="!currentUser">
              <router-link to="/login">
                <i class="fa-solid fa-user fa-2xl"></i>
              </router-link>
            </li>

            <!--  User connected.  -->
            <li v-if="currentUser">
              <router-link to="/profile">
                <i class="fa-solid fa-user fa-2xl"></i>
              </router-link>
            </li>
            <li v-if="currentUser">
              <router-link @click.prevent="logOut" to="/home">
                <i class="fa-solid fa-right-from-bracket fa-2xl"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
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
  --background-color: #DFDFDE;
  --dark-color: #141E27;
  --clear-color: #F7F7F7;
  --hover-color: grey;
  --green-color: #acece6;

  --background-main-color: #D5D0CD; /* 5588A3 */

  --border-green: 5px solid var(--green-color);
  --border-dark: 2px solid var(--dark-color);
  --border-radius: 50px;

  --text-color-dark: var(--dark-color);
  --text-clear-color: var(--clear-color);
  --error-color: #DA1212;

  --normal-text-size: 18px;
  --thead-text-size: 22px;
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

.divMain {
  background-color: var(--background-main-color);
  border-radius: var(--border-radius);
  font-size: var(--normal-text-size);
  padding: 20px;
}

</style>

<style scoped>

li {
  list-style: none;
}

nav {
  border-bottom: var(--border-green);
}
nav.nav-center ul {
  text-align: center;
}

nav.nav-center ul li {
  display: inline;
  float: none;
}

nav.nav-center ul li a {
  display: inline-block;
}

ul > li {
  margin-right: 2%;
  margin-left: 2%;
}

h1 {
  font-size: 4.2rem;
  line-height: 110%;
  margin: 2.8rem 0 1.68rem 0;
}

@media only screen and (max-width: 550px) {
  ul > li {
    margin-right: 0;
    margin-left: 0;
  }
  .container {
    margin: 0;
    width: 100% !important;
  }
}

</style>

<template>
  <div class="divMain">
    <h3 class="h3">{{ title }}</h3>

    <div v-show="isLoading" ref="loading" class="progress">
      <div class="indeterminate"></div>
    </div>

    <table v-if="listUser.length" class="striped highlight centered responsive-table">
<!--      <caption v-text="title"></caption>-->
      <thead>
      <tr>
        <th>Username</th>
        <th>Adresse mail</th>
        <th>Nom de famille</th>
        <th>Prenom</th>
        <th>Admin</th>
        <th>Action</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="user in listUser"
          :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.lastName || '-' }}</td>
        <td>{{ user.firstName || '-' }}</td>
        <td v-if="isAdmin(user)">Oui</td>
        <td v-else>
          <button @click="handlerClickButtonAdmin(user)">Promouvoir</button>
        </td>
        <td>
          <!-- Used to delete an user.-->
          <button @click="handlerClickButtonDelete(user)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>

    <p>{{ errorMessage }}</p>

  </div>
</template>

<script>

import UserService from "../../services/User.service"


export default {
  name: "UserList",
  data() {
    return {
      title: 'Liste des users',
      content: '',
      listUser: [],
      isLoading: true,
      errorMessage: null
    }
  },
  mounted() {
    this.fetchListUser()
  },
  methods: {
    fetchListUser() {
      this.isLoading = true
      UserService.getListUser()
          .then((response) => {
                this.isLoading = false
                this.listUser = response.data
              },
              (error) => {
                this.isLoading = false
                this.errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    handlerClickButtonDelete(user) {
      UserService.deleteUser(user.id, user.username, user.email)
          .then(() => {
                this.fetchListUser()
              },
              (error) => {
                this.errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    isAdmin(user) {
      for (let role of user.roles) {
        if (role.name === 'admin') {
          return true
        }
      }
      return false
    },
    handlerClickButtonAdmin (user) {
      UserService.promoteAdmin(user.id, user.username, user.email)
          .then(() => {
                this.fetchListUser()
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
}
</script>

<style scoped>

button {
  font-size: var(--normal-text-size);
  margin: 10px;
}

table {
  border-collapse: collapse;
  border-radius: var(--border-radius);
  overflow: hidden;
  font-size: var(--normal-text-size);
}

thead {
  background-color: var(--clear-color);
  font-size: var(--thead-text-size);
}

th, td {
  padding: 1em;
  border-bottom: 2px solid white;
}

</style>

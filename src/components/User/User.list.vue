<template>
  <div>
    <h3>{{ title }}</h3>

    <p>{{ content }}</p>

    <table v-if="listUser.length">
      <caption v-text="title"></caption>
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

import UtilisateurService from "../../services/Utilisateur.service"


export default {
  name: "UserList",
  data() {
    return {
      title: 'Liste des utilisateurs',
      content: '',
      listUser: [],
      errorMessage: null
    }
  },
  mounted() {
    this.fetchListUser()
  },
  methods: {
    fetchListUser() {
      UtilisateurService.getListUser()
          .then((response) => {
                this.listUser = response.data
              },
              (error) => {
                this.errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    handlerClickButtonDelete(user) {
      UtilisateurService.deleteUser(user.id, user.username, user.email)
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
      UtilisateurService.promoteAdmin(user.id, user.username, user.email)
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

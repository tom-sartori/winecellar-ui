<template>
  <div>
    <h1 class="h1">{{ title }}</h1>
    <div class="divMain">
      <Form @submit="handleRegister" :validation-schema="schema" v-if="!content" class="form">
        <div class="divField">
          <label for="username">Username</label>
          <Field name="username" id="username" type="text" class="field"/>
          <ErrorMessage name="username" class="errorMessage"/>
        </div>
        <div class="divField">
          <label for="email">Email</label>
          <Field name="email" id="email" type="email" class="field"/>
          <ErrorMessage name="email" class="errorMessage"/>
        </div>
        <div class="divField">
          <label for="firstName">Prénom</label>
          <Field name="firstName" id="firstName" type="text" class="field"/>
          <ErrorMessage name="firstName" class="errorMessage"/>
        </div>
        <div class="divField">
          <label for="lastName">Nom de famille</label>
          <Field name="lastName" id="lastName" type="text" class="field"/>
          <ErrorMessage name="lastName" class="errorMessage"/>
        </div>
        <div class="divField">
          <label for="password">Mot de passe</label>
          <Field name="password" id="password" type="password" class="field"/>
          <ErrorMessage name="password" class="errorMessage"/>
        </div>

        <div v-show="isLoading" ref="loading" class="progress">
          <div class="indeterminate"></div>
        </div>

        <div class="divField">
          <button :disabled="isLoading">
            Créer mon compte
          </button>
        </div>
      </Form>
      <p v-if="content">{{ content }}</p>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"

export default {
  name: "RegisterView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
          .string()
          .required("Identifiant requis !")
          .min(3, "3 caractères au minimum. ")
          .max(20, "20 caractères au maximum. "),
      email: yup
          .string()
          .required("Email requis !")
          .email("Email invalide. ")
          .max(50, "50 caractères maximum. "),
      firstName: yup
          .string()
          .required("Requis !")
          .min(1, "1 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      lastName: yup
          .string()
          .required("Requis !")
          .min(1, "1 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      password: yup
          .string()
          .required("Mot de passe requis !")
          .min(6, "6 caractères minimum. ")
          .max(40, "40 caractères au maximum. "),
    })
    return {
      title: 'Créer un compte',
      isLoading: false,
      content: "",
      schema,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile")
    }
  },
  methods: {
    handleRegister(user) {
      this.isLoading = true
      this.content = ""
      this.$store.dispatch("auth/register", user).then(
          (data) => {
            this.content = data.message
            this.isLoading = false
          },
          (error) => {
            this.isLoading = false
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
          }
      )
    },
  },
}
</script>

<style scoped>

.form {
  border: var(--border-green);
  border-radius: var(--border-radius);
  padding: 20px
}

.divField {
  margin-top: 20px;
}

label {
  color: var(--text-color-dark);
  font-size: var(--thead-text-size);
}

.field {
  color: var(--text-color-dark);
  font-size: var(--normal-text-size);
  text-align: center;
}

.field:hover {
  background-color: var(--hover-color);
  transition: background-color 0.5s;
  border-radius: var(--border-radius);
}

.errorMessage {
  color: var(--error-color);
  font-size: var(--normal-text-size);
}

button {
  width: 100%;
  transition: background-color 0.5s;
  font-size: var(--normal-text-size);
}

button:hover {
  transition: background-color 0.5s;
}


</style>

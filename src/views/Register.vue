<template>
  <div>
    <div>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div>
            <label for="username">Username</label>
            <Field name="username" id="username" type="text"/>
            <ErrorMessage name="username"/>
          </div>
          <div>
            <label for="email">Email</label>
            <Field name="email" id="email" type="email"/>
            <ErrorMessage name="email"/>
          </div>
          <div>
            <label for="firstName">Prénom</label>
            <Field name="firstName" id="firstName" type="text"/>
            <ErrorMessage name="firstName"/>
          </div>
          <div>
            <label for="lastName">Nom de famille</label>
            <Field name="lastName" id="lastName" type="text"/>
            <ErrorMessage name="lastName"/>
          </div>
          <div>
            <label for="password">Password</label>
            <Field name="password" id="password" type="password"/>
            <ErrorMessage name="password"/>
          </div>
          <div>
            <button :disabled="loading">
              <span v-show="loading"></span>
              Créer mon compte
            </button>
          </div>
        </div>
      </Form>
      <div v-if="message" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
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
      successful: false,
      loading: false,
      message: "",
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
      this.message = ""
      this.successful = false
      this.loading = true
      this.$store.dispatch("auth/register", user).then(
          (data) => {
            this.message = data.message
            this.successful = true
            this.loading = false
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            this.successful = false
            this.loading = false
          }
      )
    },
  },
}
</script>

<style scoped>

</style>

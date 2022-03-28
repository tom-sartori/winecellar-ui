<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <Form @submit="handleLogin" :validation-schema="schema">
        <div>
          <label for="username">Username</label>
          <Field name="username" id="username" type="text"/>
          <ErrorMessage name="username"/>
        </div>
        <div>
          <label for="password">Password</label>
          <Field name="password" id="password" type="password"/>
          <ErrorMessage name="password"/>
        </div>

        <div v-show="isLoading" ref="loading" class="progress">
          <div class="indeterminate"></div>
        </div>

        <div>
          <button :disabled="isLoading">
            Login
          </button>
        </div>
        <div>
          <p v-if="message">{{ message }}</p>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"

export default {
  name: "LoginView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    })
    return {
      title: 'Se connecter',
      isLoading: false,
      message: "",
      schema,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile")
    }
  },
  methods: {
    handleLogin(user) {
      this.isLoading = true
      this.$store.dispatch("auth/login", user)
          .then(() => {
                this.$router.push("/profile")
                this.isLoading = false
              },
              (error) => {
                this.isLoading = false
                this.message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
  },
}
</script>

<style scoped>

</style>

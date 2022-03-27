<template>
  <div>
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
        <div>
          <button :disabled="loading">
            <span v-show="loading"></span>
            <span>Login</span>
          </button>
        </div>
        <div>
          <div v-if="message" role="alert">
            {{ message }}
          </div>
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
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile")
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true
      this.$store.dispatch("auth/login", user)
          .then(() => {
                this.$router.push("/profile")
              },
              (error) => {
                this.loading = false
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

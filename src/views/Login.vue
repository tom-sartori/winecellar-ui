<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="divMain">
      <Form @submit="handleLogin" :validation-schema="schema" class="form">
        <div class="divField">
          <label for="username">Username</label>
          <Field name="username" id="username" type="text" class="field"/>
          <ErrorMessage name="username" class="errorMessage"/>
        </div>
        <div class="divField">
          <label for="password">Password</label>
          <Field name="password" id="password" type="password" class="field"/>
          <ErrorMessage name="password"  class="errorMessage"/>
        </div>

        <div v-show="isLoading" ref="loading" class="progress">
          <div class="indeterminate"></div>
        </div>

        <div class="divField">
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
                this.$router.push("/cave")
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

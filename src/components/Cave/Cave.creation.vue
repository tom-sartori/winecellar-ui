<template>
  <div>

    <h3>{{ this.title }}</h3>

    <Form
        @submit="onSubmit"
        :validation-schema="schema"
        class="form"
    >
      <label for="caveName"></label>
      <Field name="caveName" id="caveName" type="text" placeholder="Nom de ma cave" class="field"></Field>
      <ErrorMessage name="caveName" class="errorMessage"/>

      <div v-show="isLoading" ref="loading" class="progress">
        <div class="indeterminate"></div>
      </div>

      <button type="submit" :disabled="isLoading">
        Valider
      </button>

    </Form>


    <p>{{content}}</p>
  </div>
</template>

<script>
import CaveService from "../../services/Cave.service"
import {ErrorMessage, Field, Form} from "vee-validate"
import * as yup from "yup"

export default {
  name: "CaveCreation",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      caveName: yup
          .string()
          .required("")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
    })
    return {
      title: 'Ajouter une cave',
      content: "",
      newCaveName: "",
      isLoading: false,
      schema
    }
  },
  methods: {
    onSubmit(values, { resetForm }) {
      this.isLoading = true
      CaveService.createCave(values.caveName)
          .then( () => {
                resetForm()
                this.isLoading = false
                this.$emit('update-isCaveUpdated')  // When a cave is created, the cave list has to be updated.
              },
              (error) => {
                this.isLoading = false
                this.content =
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

.form {
  border-radius: var(--border-radius);
  padding: 20px;
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

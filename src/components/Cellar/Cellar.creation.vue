<template>
  <div>

    <h3 class="h3">{{ this.title }}</h3>

    <Form
        @submit="onSubmit"
        :validation-schema="schema"
        class="form"
    >
      <label for="cellarName"></label>
      <Field name="cellarName" id="cellarName" type="text" placeholder="Nom de ma cellar" class="field"></Field>
      <ErrorMessage name="cellarName" class="errorMessage"/>

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
import CellarService from "../../services/Cellar.service"
import {ErrorMessage, Field, Form} from "vee-validate"
import * as yup from "yup"

export default {
  name: "CellarCreation",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      cellarName: yup
          .string()
          .required("")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
    })
    return {
      title: 'Ajouter une cave',
      content: "",
      newCellarName: "",
      isLoading: false,
      schema
    }
  },
  methods: {
    onSubmit(values, { resetForm }) {
      this.isLoading = true
      CellarService.createCellar(values.cellarName)
          .then( () => {
                resetForm()
                this.isLoading = false
                this.$emit('update-isCellarUpdated')  // When a cellar is created, the cellar list has to be updated.
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

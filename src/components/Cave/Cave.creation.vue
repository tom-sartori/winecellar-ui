<template>
  <div>

    <h3>{{ this.title }}</h3>

    <Form
        @submit="onSubmit"
        :validation-schema="schema"
    >
      <label for="caveName"></label>
      <Field name="caveName" id="caveName" type="text" placeholder="Nom de ma cave"></Field>
      <ErrorMessage name="caveName"/>

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

button {
  font-size: var(--normal-text-size);
  width: 100%;
  margin: 10px;
}

</style>

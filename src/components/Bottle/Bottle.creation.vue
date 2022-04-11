<template>
  <div>
    <h3 class="h3">{{ title }}</h3>
    <p>{{content}}</p>

    <Form
        @submit="onSubmit"
        :validation-schema="schema"
        class="form"
    >

      <div class="divField">
        <label for="bottleNameName">Nom</label>
        <Field name="bottleNameName" id="bottleNameName" type="text" class="field"/>
        <ErrorMessage name="bottleNameName" class="errorMessage"/>
      </div>

      <div class="divField">
        <label for="designationName">Appellation</label>
        <Field name="designationName" id="designationName" type="text" class="field"/>
        <ErrorMessage name="designationName" class="errorMessage"/>
      </div>

      <div class="divField">
        <label for="vineyardName">Domaine viticole</label>
        <Field name="vineyardName" id="vineyardName" type="text" class="field"/>
        <ErrorMessage name="vineyardName" class="errorMessage"/>
      </div>

      <div class="divField">
        <label for="vintageName">Millésime</label>
        <Field name="vintageName" id="vintageName" type="number" min="0" class="field"/>
        <ErrorMessage name="vintageName" class="errorMessage"/>
      </div>

      <div class="divField">
        <label for="wineTypeName">Type de vin</label>
        <Field name="wineTypeName" id="wineTypeName" type="text" class="field"/>
        <ErrorMessage name="bottleNameName" class="errorMessage"/>
      </div>

      <div class="divField">
        <label for="bottleSizeName">Taille de la bouteille (en litres)</label>
        <Field name="bottleSizeName" id="bottleSizeName" type="number" value="0.75" min="0" class="field"/>
        <ErrorMessage name="bottleSizeName" class="errorMessage"/>
      </div>

      <div v-show="isLoading" ref="loading" class="progress">
        <div class="indeterminate"></div>
      </div>

      <div class="divField">
        <button @submit="resetForm({ values: {bottleNameName: ''}})" :disabled="isLoading">
          Valider
        </button>
      </div>

    </Form>

  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"
import BottleService from "../../services/Bottle.service"


export default {
  name: "BottleCreation",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    compartmentId: {
      Number,
      required: false
    }
  },
  data() {
    const schema = yup.object().shape({
      bottleNameName: yup
          .string()
          .required("Requis !")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      designationName: yup
          .string()
          .required("Requis !")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      vineyardName: yup
          .string()
          .required("Requis !")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      vintageName: yup
          .number().integer()
          .typeError()
          .required("Requis !")
          .min(1000, "Millésime minimal : 1000")
          .max(2100, "Millésime maximal : 2100"),
      wineTypeName: yup
          .string()
          .required("Requis !")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      bottleSizeName: yup
          .number()
          .typeError()
          .required("Requis ! Indiquez la quantité en litres. ")
          .min(0, "0 litre")
          .max(50, "50 litres au maximum. "),
    })
    return {
      title: "Ajouter une bouteille de vin",
      content: "",
      isLoading: false,
      schema
    }
  },
  methods: {
    onSubmit (values, { resetForm }) {
      this.isLoading = true
      if (this.compartmentId) { // If compartmentId is set, it means that to bottle is added to an compartment.
        values['compartmentId'] = this.compartmentId
      }
      BottleService.createBottle(values)
          .then( () => {
                this.$emit('change-isBottleListUpdated') // When a bottle is created, the bottle list has to be updated.
                resetForm()
                this.isLoading = false
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
  border: var(--border-dark);
  border-radius: var(--border-radius);
  padding: 20px;
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

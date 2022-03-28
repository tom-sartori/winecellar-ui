<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{content}}</p>

    <Form
        @submit="onSubmit"
        :validation-schema="schema"
    >

      <div>
        <label for="nomBouteilleName">Nom : </label>
        <Field name="nomBouteilleName" id="nomBouteilleName" type="text"/>
        <ErrorMessage name="nomBouteilleName"/>
      </div>

      <div>
        <label for="appellationName">Appellation : </label>
        <Field name="appellationName" id="appellationName" type="text"/>
        <ErrorMessage name="appellationName"/>
      </div>

      <div>
        <label for="domaineName">Domaine viticole : </label>
        <Field name="domaineName" id="domaineName" type="text"/>
        <ErrorMessage name="domaineName"/>
      </div>

      <div>
        <label for="millesimeName">Millésime : </label>
        <Field name="millesimeName" id="millesimeName" type="number" min="0"/>
        <ErrorMessage name="millesimeName"/>
      </div>

      <div>
        <label for="typeVinName">Type de vin : </label>
        <Field name="typeVinName" id="typeVinName" type="text"/>
        <ErrorMessage name="nomBouteilleName"/>
      </div>

      <div>
        <label for="tailleBouteilleName">Taille de la bouteille (en litres) : </label>
        <Field name="tailleBouteilleName" id="tailleBouteilleName" type="number" value="0.75" min="0"/>
        <ErrorMessage name="tailleBouteilleName"/>
      </div>

      <div v-show="isLoading" ref="loading" class="progress">
        <div class="indeterminate"></div>
      </div>

      <div>
        <button @submit="resetForm({ values: {nomBouteilleName: ''}})" :disabled="isLoading">
          Valider
        </button>
      </div>

    </Form>

  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"
import BouteilleService from "../../services/Bouteille.service"


export default {
  name: "BouteilleCreation",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    emplacementId: {
      Number,
      required: false
    }
  },
  data() {
    const schema = yup.object().shape({
      nomBouteilleName: yup
          .string()
          .required("Requis !")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      appellationName: yup
          .string()
          .required("Requis !")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      domaineName: yup
          .string()
          .required("Requis !")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      millesimeName: yup
          .number().integer()
          .typeError()
          .required("Requis !")
          .min(1000, "Millésime minimal : 1000")
          .max(2100, "Millésime maximal : 2100"),
      typeVinName: yup
          .string()
          .required("Requis !")
          .min(2, "2 caractères au minimum. ")
          .max(50, "50 caractères au maximum. "),
      tailleBouteilleName: yup
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
      if (this.emplacementId) { // If emplacementId is set, it means that to bottle is added to an emplacement.
        values['emplacementId'] = this.emplacementId
      }
      BouteilleService.createBouteille(values)
          .then( () => {
                this.$emit('change-isBouteilleListUpdated') // When a bottle is created, the bottle list has to be updated.
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

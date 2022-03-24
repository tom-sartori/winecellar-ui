<template>
  <div>
    <header>
      <h3>{{ title }}</h3>
    </header>

    <bouteille-create></bouteille-create>
    <bouteille-list></bouteille-list>

  </div>
</template>

<script>


import BouteilleCreate from "@/components/Bouteille.create";
import BouteilleList from "@/components/Bouteille.list";
export default {
  name: "CaveVue",
  components: {BouteilleList, BouteilleCreate},
  data() {
    return {
      title: "Mes bouteilles",
      content: "",
      caveId: null
    }
  },
  methods: {
  }
}

</script>

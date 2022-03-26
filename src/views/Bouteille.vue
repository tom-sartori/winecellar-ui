<template>
  <div>
    <header>
      <h3>{{ title }}</h3>
    </header>

    <bouteille-creation></bouteille-creation>
    <bouteille-list :isBouteilleListUpdated="true"></bouteille-list>

  </div>
</template>

<script>


import BouteilleCreation from "@/components/Bouteille/Bouteille.creation";
import BouteilleList from "@/components/Bouteille/Bouteille.list";
export default {
  name: "BouteilleView",
  components: {BouteilleList, BouteilleCreation},
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

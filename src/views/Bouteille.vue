<template>
  <div>
    <header>
      <h3>{{ title }}</h3>
    </header>

    <bouteille-list :isBouteilleListUpdated=true></bouteille-list>

  </div>
</template>

<script>
import BouteilleList from "@/components/Bouteille/Bouteille.list";
export default {
  name: "BouteilleView",
  components: {BouteilleList},
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

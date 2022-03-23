<template>
  <div>
    <header>
      <h3>{{ title }}</h3>
    </header>

    <cave-creation></cave-creation>
    <cave-list @selected-caveId="setCaveId"></cave-list>
    <mur-creation v-if="caveId" :cave-id="caveId"></mur-creation>
    <mur-list v-if="caveId" :cave-id="caveId"></mur-list>

  </div>
</template>

<script>
import CaveCreation from "@/components/Cave.creation";
import CaveList from "@/components/Cave.list";
import MurCreation from "@/components/Mur.creation";
import MurList from "@/components/Mur.list";


export default {
  name: "CaveVue",
  components: {
    MurList,
    MurCreation,
    CaveList,
    CaveCreation
  },
  data() {
    return {
      title: "Mes caves",
      content: "",
      caveId: null
    }
  },
  methods: {
    setCaveId (caveId) {
      this.caveId = caveId
    }
  }
}

</script>

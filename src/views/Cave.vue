<template>
  <div>
    <header>
      <h3>{{ title }}</h3>
    </header>

    <cave-creation @update-isCaveUpdated="switchIsCaveUpdated"></cave-creation>
    <cave-list @selected-caveId="setCaveId" :isCaveUpdated="isCaveUpdated"></cave-list>
    <mur-creation v-if="caveId" :cave-id="caveId" @isMurListUpdated="switchIsMurListUpdated"></mur-creation>
    <mur-list v-if="caveId" :cave-id="caveId" :isMurListUpdated="isMurListUpdated"></mur-list>

  </div>
</template>

<script>
import CaveCreation from "@/components/Cave/Cave.creation";
import CaveList from "@/components/Cave/Cave.list";
import MurCreation from "@/components/Mur/Mur.creation";
import MurList from "@/components/Mur/Mur.list";


export default {
  name: "CaveView",
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
      caveId: null,
      isCaveUpdated: true,    // Used to trigger cave list when a cave is created.
      isMurListUpdated: true  // Used to trigger mur list when a mur is created.
    }
  },
  methods: {
    setCaveId (caveId) {
      this.caveId = caveId
    },
    switchIsCaveUpdated () {
      this.isCaveUpdated = !this.isCaveUpdated
    },
    switchIsMurListUpdated () {
      this.isMurListUpdated = !this.isMurListUpdated
    }
  }
}

</script>

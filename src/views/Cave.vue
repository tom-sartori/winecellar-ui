<template>
  <div class="row">
    <header class="col s12">
      <h1>{{ title }}</h1>
    </header>

    <div class="divFlex">
      <cave-creation @update-isCaveUpdated="switchIsCaveUpdated" class="colFlex"></cave-creation> <!-- class="col s12 m4 l6" -->
      <cave-list @selected-caveId="setCaveId" :isCaveUpdated="isCaveUpdated" class="colFlex"></cave-list>
    </div>
    <mur-creation v-if="caveId" :cave-id="caveId" @isMurListUpdated="switchIsMurListUpdated" class="col s12"></mur-creation>
    <mur-list v-if="caveId" :cave-id="caveId" :isMurListUpdated="isMurListUpdated" class="col s12"></mur-list>

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

<style scoped>

.row {
  display: grid;
  grid-gap: 20px;
}

.divFlex {
  display: flex;
  width: 100%;

  background-color: var(--background-main-color);
  border-radius: var(--border-radius);
}

.colFlex {
  flex: 1;
  padding: 20px;
}

@media only screen and (max-width: 800px) {
  .divFlex {
    display: block;
    width: 100%;
  }
}

</style>

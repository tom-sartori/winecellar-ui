<template>
  <div class="row">
    <header class="col s12">
      <h1 class="h1">{{ title }}</h1>
    </header>

    <div class="divFlex">
      <cellar-creation @update-isCellarUpdated="switchIsCellarUpdated" class="colFlex"></cellar-creation> <!-- class="col s12 m4 l6" -->
      <cellar-list @selected-cellarId="setCellarId" :isCellarUpdated="isCellarUpdated" class="colFlex"></cellar-list>
    </div>
    <wall-creation v-if="cellarId" :cellar-id="cellarId" @isWallListUpdated="switchIsWallListUpdated" class="col s12"></wall-creation>
    <wall-list v-if="cellarId" :cellar-id="cellarId" :isWallListUpdated="isWallListUpdated" class="col s12"></wall-list>

  </div>
</template>

<script>
import CellarCreation from "@/components/Cellar/Cellar.creation";
import CellarList from "@/components/Cellar/Cellar.list";
import WallCreation from "@/components/Wall/Wall.creation";
import WallList from "@/components/Wall/Wall.list";


export default {
  name: "CellarView",
  components: {
    WallList,
    WallCreation,
    CellarList,
    CellarCreation
  },
  data() {
    return {
      title: "Mes cellars",
      content: "",
      cellarId: null,
      isCellarUpdated: true,    // Used to trigger cellar list when a cellar is created.
      isWallListUpdated: true  // Used to trigger wall list when a wall is created.
    }
  },
  methods: {
    setCellarId (cellarId) {
      this.cellarId = cellarId
    },
    switchIsCellarUpdated () {
      this.isCellarUpdated = !this.isCellarUpdated
    },
    switchIsWallListUpdated () {
      this.isWallListUpdated = !this.isWallListUpdated
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

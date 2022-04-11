<template>
  <div>
    <header>
      <h3 class="h3">{{ title }}</h3>
    </header>

    <bottle-list :isBottleListUpdated=true></bottle-list>

  </div>
</template>

<script>
import BottleList from "@/components/Bottle/Bottle.list";
export default {
  name: "BottleView",
  components: {BottleList},
  data() {
    return {
      title: "Mes bouteilles",
      content: "",
      cellarId: null
    }
  },
  methods: {
  }
}

</script>

<template>
  <div>
    <header>
      <h3>{{ title }}</h3>
    </header>

    <mur-detail></mur-detail>

  </div>
</template>

<script>
import MurDetail from "@/components/Mur.detail"

export default {
  name: "MurVue",
  components: {MurDetail},
  data() {
    return {
      title: "Détail du mur",
      content: ""
    }
  },
  methods: {
  }
}

</script>

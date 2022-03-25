<template>
  <div>
    <header>
      <h3>{{ title }}</h3>
    </header>

    <mur-detail
        :mur-id=1
        :src-image=srcimage
    ></mur-detail>

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
      content: "",
      srcimage: "http://localhost:3000/api/mur-image/2022-03-23T00:39:02.554ZtestImage.png"
    }
  },
  methods: {
  }
}

</script>

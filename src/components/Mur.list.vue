<template>
  <div>
    <ul>
      <li
          v-for="(item) in listMurImageSrc"
          :key="item.id"
      >
        <img :src="item.image" alt="image">
      </li>
    </ul>

  </div>
</template>

<script>
import MurService from "../services/mur.service"

export default {
  name: "MurList",
  props: {
    caveId: {
      type: String,
      required: true,
    }
  },
  watch: {
    caveId() {
      this.fetchListMur()
    }
  },
  data() {
    return {
      listMurImageSrc: null,
      content: ''
    }
  },
  methods: {
    fetchListMur () {
      MurService.getListMur(this.caveId)
          .then( (response) => {
                this.listMurImageSrc = response.data
                this.listMurImageSrc.forEach(mur => mur.image = (MurService.getCaveImageSrc(mur.image)))
              },
              (error) => {
                this.content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    }
  },
  mounted() {
    this.fetchListMur()
  }
}
</script>

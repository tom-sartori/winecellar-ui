<template>
  <div>
    <ul>
      <li
          v-for="(item) in listMur"
          :key="item.id"
      >
        <mur-detail
            :mur-id="item.id"
            :src-image="item.image"
        ></mur-detail>
      </li>
    </ul>

  </div>
</template>

<script>
import MurService from "../services/mur.service"
import MurDetail from "@/components/Mur.detail";

export default {
  name: "MurList",
  components: {MurDetail},
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
      listMur: null,
      content: ''
    }
  },
  methods: {
    fetchListMur () {
      MurService.getListMur(this.caveId)
          .then( (response) => {
                this.listMur = response.data
                this.listMur.forEach(mur => mur.image = (MurService.getMurImageSrc(mur.image)))
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

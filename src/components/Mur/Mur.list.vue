<template>
  <div class="main">
    <h3 v-show="listMur && listMur.length">{{ title }}</h3>

    <ul>
      <li
          v-for="(mur) in listMur"
          :key="mur.id"
          class="main2"
      >
        <button
            @click="handlerClickDeleteButton(mur.id)"
        >Supprimer le mur en dessous</button>

        <mur-detail
            :mur-id="mur.id"
            :src-image="mur.image"
        ></mur-detail>
      </li>
    </ul>

  </div>
</template>

<script>
import MurService from "../../services/Mur.service"
import MurDetail from "@/components/Mur/Mur.detail";

export default {
  name: "MurList",
  components: {MurDetail},
  props: {
    caveId: {
      type: String,
      required: true,
    },
    isMurListUpdated: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    caveId() {
      this.fetchListMur()
    },
    isMurListUpdated() {
      this.fetchListMur()
    }
  },
  data() {
    return {
      title: 'Voici les différents murs de ma cave',
      listMur: null,
      content: ''
    }
  },
  mounted() {
    this.fetchListMur()
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
    },
    handlerClickDeleteButton (murId) {
      MurService.deleteMur(murId)
          .then( () => {
                this.fetchListMur()
              },
              (error) => {
                this.content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    }
  }
}
</script>

<style>

.main {
  background-color: var(--blue-3);
  border-radius: var(--border-radius);
  padding: 20px;
}

.main2 {
  background-color: var(--blue-2);
  border-radius: var(--border-radius);
  padding: 20px;
  margin: 20px;
}

button {
  font-size: var(--normal-text-size);
  margin: 10px;
}

</style>

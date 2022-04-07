<template>
  <div v-show="listWall && listWall.length" class="divMain">
    <h3 class="h3">{{ title }}</h3>

    <ul>
      <li
          v-for="(wall) in listWall"
          :key="wall.id"
          class="liWallList"
      >
        <button
            @click="handlerClickDeleteButton(wall.id)"
        >Supprimer le wall en dessous</button>

        <wall-detail
            :wall-id="wall.id"
            :src-image="wall.image"
        ></wall-detail>
      </li>
    </ul>

  </div>
</template>

<script>
import WallService from "../../services/Wall.service"
import WallDetail from "@/components/Wall/Wall.detail";

export default {
  name: "WallList",
  components: {WallDetail},
  props: {
    cellarId: {
      type: String,
      required: true,
    },
    isWallListUpdated: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    cellarId() {
      this.fetchListWall()
    },
    isWallListUpdated() {
      this.fetchListWall()
    }
  },
  data() {
    return {
      title: 'Voici les différents walls de ma cellar',
      listWall: null,
      content: ''
    }
  },
  mounted() {
    this.fetchListWall()
  },
  methods: {
    fetchListWall () {
      WallService.getListWall(this.cellarId)
          .then( (response) => {
                this.listWall = response.data
                this.listWall.forEach(wall => wall.image = (WallService.getWallImageSrc(wall.image)))
              },
              (error) => {
                this.content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
              }
          )
    },
    handlerClickDeleteButton (wallId) {
      WallService.deleteWall(wallId)
          .then( () => {
                this.fetchListWall()
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

.liWallList {
  border-radius: var(--border-radius);
  border: var(--border-green);
  padding: 20px;
  margin: 20px;
}

button {
  font-size: var(--normal-text-size);
  margin: 10px;
}

</style>

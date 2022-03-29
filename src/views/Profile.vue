<template>
  <div>
    <h1>
      {{ title }}
    </h1>

    <user-detail></user-detail>
  </div>
</template>

<script>
import UserDetail from "@/components/User/User.detail";
export default {
  name: 'ProfileView',
  components: {UserDetail},
  data () {
    return {
      title: 'Mon profil'
    }
  }
}
</script>

<style scoped>

</style>

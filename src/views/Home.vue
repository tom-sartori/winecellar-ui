<template>
  <div>
    <header>
      <h3 class="h3">{{ title }}</h3>
    </header>

    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      title: "Page d'accueil",
      content: "",
    }
  },
  mounted() {

  },
}
</script>

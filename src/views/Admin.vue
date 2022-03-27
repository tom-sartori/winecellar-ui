<template>
  <div>
    <header>
      <h3>{{ title }}</h3>
    </header>

    <user-list></user-list>

  </div>
</template>

<script>
import UserList from "@/components/User/User.list";
export default {
  name: "AdminView",
  components: {UserList},
  data() {
    return {
      title: "Administration",
      content: ""
    }
  },
  methods: {
  }
}

</script>

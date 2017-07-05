<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: 'app',

  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },

  watch: {
    user (val) {
      this.$router.replace({ name: 'hello' })
    }
  },

  beforeCreate () {
    this.$store.dispatch('auth/authenticate').catch(error => {
      if (!error.message.includes('Could not find stored JWT')) {
        console.error(error)
      }
    })
  }
}
</script>

<style lang="scss" src="../node_modules/bulma/bulma.sass"></style>

<template lang="pug">
  .container
    .columns
      .column.is-one-third.is-offset-one-third
        .title Welcome Back
        .subtitle sign in to get started
        form.form(@submit.prevent="login(username, password)")
          .field
            .control
              input.input.is-expanded(
                type="text"
                placeholder="Username"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                v-model="username")
          .field
            .control
              input.input.is-expanded(
                type="password"
                placeholder="Password"
                v-model="password")
          .field
            .control
              button.button.is-primary Sign In
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'login',

  data () {
    return {
      username: undefined,
      password: undefined
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),

    login (username, password) {
      return this.authenticate({
        strategy: 'local',
        username,
        password
      })
    }
  }
}
</script>

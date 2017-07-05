<template lang="pug">
  .error
    .title(v-if="title") {{ title }}
    .subtitle(v-if="message") {{ message }}
    .content(v-if="description") {{ description }}
</template>

<script>
import errors from 'feathers-errors'

export default {
  name: 'error',

  props: {
    error: {
      type: Object,
      required: false,
      default () {
        return {
          title: 'Error',
          message: 'Oops, something went wrong',
          description: null
        }
      }
    }
  },

  created () {
    console.log(errors)
  }
}
</script>

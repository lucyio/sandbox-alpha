<template lang="pug">
  #hello.page
    .hero.is-fullheight
      .hero-head
        nav.nav
          .container
            .nav-left
            .nav-center
              router-link.nav-item(to="/")
                | mirror
            .nav-right(v-if="user")
              .nav-item {{ user.username }}:
                .dropdown-content
                  ul.dropdown-item(v-for="account in user.accounts")
                    li
                      a(@click="switchAccount(account.id)") {{ account.email_address }}
      .hero-body
        .container
          article.media(v-for="thread in threads.data")
            .media-content
              .content
                .sender
                  span  {{ sender(thread).name }}
                  span  {{ sender(thread).email }}
                p.subject {{ thread.subject }} &nbsp;
                p.snippet {{ thread.snippet }} &nbsp;
            .media-right
              .help {{ timestampToDatetime(thread.last_message_received_timestamp) }}
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'hello',

  data () {
    return {
      moment
    }
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('accounts', { findAccountsInStore: 'find' }),
    ...mapGetters('contacts', { findContactsInStore: 'find' }),
    ...mapGetters('threads', { findThreadsInStore: 'find' }),

    accounts () {
      return this.findAccountsInStore()
    },

    contacts () {
      return this.findContactsInStore()
    },

    threads () {
      return this.findThreadsInStore()
    }
  },

  created () {
    if (!this.user) {
      return this.$router.replace({ name: 'login' })
    } else {
      return Promise.all([
        this.findAccounts({
          query: {
            id: {
              $in: this.user.account_ids
            }
          }
        }),
        this.findContacts({
          query: {
            account_id: {
              $in: this.user.account_ids
            }
          }
        }),
        this.findThreads({
          query: {
            // pagination
            $sort: { last_message_received_timestamp: -1 },
            $limit: 20,

            // filter by accounts
            account_id: {
              $in: this.user.account_ids
            },

            // filter by category
            category_ids: {
              $in: [
                'conversation',
                'calendar_invite'
              ]
            },

            approved: 1
          }
        })
      ])
    }
  },

  methods: {
    ...mapActions('accounts', { findAccounts: 'find' }),
    ...mapActions('contacts', { findContacts: 'find' }),
    ...mapActions('threads', { findThreads: 'find' }),
    ...mapActions('auth', ['logout']),

    sender ({last_message_from}) {
      return last_message_from[0] || {}
    },

    timestampToDatetime (ts) {
      return moment(ts, 'X').format('MM/DD/YY hh:mmA')
    },

    switchAccount (accountId) {
      console.log('hello#switchAccount', accountId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .subject { font-weight: 700; }
</style>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header
      class="text-black"
      style="background:grey"
    >
      <q-tabs
        align="left"
        indicator-color="transparent"
        v-model="active"
      >
        <q-route-tab
          v-for="(tab, index) in tabs"
          :key="index"
          :to="{ name: 'dropZone', params: { slug: tab.slug}}"
          style="border-radius: 24px 24px 0 0;text-transform:none"
          :style="{
            backgroundColor: tab.hexColor,
            margin: (tab.slug===activeTabName)?'1px 0 0 1px':'10px 0 1px 1px'
          }"
          :label="tab.name" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  data () {
    return {
      activeColor: 'white',
      test: 'ok'
    }
  },
  computed: {
    store () {
      return this.$store.getters['auth/invitationCode']
    },
    logged () {
      return this.$store.getters['auth/logged']
    },
    tabs () {
      return this.$store.getters['tabs/all']
    },
    activeTabName () {
      return this.$route.params.slug
    },
    active: {
      get () {
        return this.$store.getters['tabs/active']
      },
      set (active) {
        this.$store.commit('tabs/setActive', active)
      }
    }
  },
  methods: {
    /**
     * Change the active color by loading the color in the right tab object
     */
    setActiveColor () {
      let tab = this.tabs.find((value) => {
        return value.slug === this.$route.params.slug
      })
      this.activeColor = tab.hexColor
    }
  },
  watch: {
    logged (n, o) {
      if (n) {
        console.log('mounted')
        console.log(localStorage.id)
        this.$store.dispatch('tabs/loadAndWatch')
      }
    },
    /**
     * When change route (tab) change the header color
     */
    $route () {
      this.setActiveColor()
    },
    '$q.appVisible' (val) {
      if (!val) {
        this.$store.dispatch('stats/endSession')
      } else {
        console.log('shown')
      }
    },
    /**
     * When tabs change and at least one tab is available:
     *   If no tab is selected go to the first one
     *   Else just load the color
     */
    tabs (tabs) {
      if (!this.$route.params.slug && tabs[0]) {
        this.$router.push({ name: 'dropZone', params: { slug: tabs[0].slug } })
      } else if (tabs[0]) {
        this.setActiveColor()
      }
    }
  },
  mounted () {
    console.log(localStorage)
    if (this.logged) {
      this.$store.dispatch('tabs/loadAndWatch')
    }
    this.$store.dispatch('stats/connectConnect').then(() => {
      console.log('connected')
      this.$store.dispatch('stats/startSession').then(() => {
        console.log('session started')
      })
    })
    this.$store.dispatch('tts/init')
  }
}
</script>

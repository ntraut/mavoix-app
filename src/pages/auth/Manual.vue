<template>
  <q-page class="flex flex-center justify-around">
    <q-form
      @submit="onSubmit"
      class="column flex-center"
    >
      <!-- Invitation code input -->
      <q-input
        :value="username"
        @input="setUsername"
        outlined
        label="nom d'utilisateur"
      />
      <br/>
      <q-input
        :value="password"
        @input="setPassword"
        outlined
        type="password"
        label="mot de passe"
      />
      <br/>
      <!-- Submit -->
      <q-btn
        flat
        label="Submit"
        type="submit"
        color="primary"
      />
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'PageAuthManual',
  computed: {
    username () {
      return this.$store.getters['auth/username']
    },
    password () {
      return this.$store.getters['auth/password']
    },
    error () {
      return this.$store.getters['auth/error']
    }
  },
  methods: {
    setUsername (value) {
      this.$store.commit('auth/setUsername', value)
    },
    setPassword (value) {
      this.$store.commit('auth/setPassword', value)
    },
    onSubmit () {
      this.$store.dispatch('auth/login')
      // already handled by watching 'auth/logged' in layouts/AuthLayout.vue
      // this.$router.push({ name: 'home' })
    }
  },
  watch: {
    error (newVal, oldVal) {
      this.$q.notify({ position: 'top-right', message: newVal, color: 'blue' })
    }
  }
}
</script>

<template>
  <div id="markcook-app" :class="[showMenu ? 'show-menu' : '', 'markcook']">
    <sideMenu />
    <main>
      <navBar /> 
      <section>
        <inputer />
        <outputer />
      </section>
    </main>
  </div>
</template>

<script>
import sideMenu from './components/sideMenu.vue'
import navBar from './components/navBar.vue'
import inputer from './components/inputer.vue'
import outputer from './components/outputer.vue'

export default {
  components: {
    sideMenu,
    navBar,
    inputer,
    outputer
  },
  mounted () {
    this.$store.dispatch('loadCache')
  },
  computed: {
    showMenu () {
      return this.$store.state.showMenu
    }
  }
}
</script>
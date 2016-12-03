<template>
	<div class="outputer" v-html='ripeTxt'></div>
</template>

<script>
  export default {
    data () {
      return {
        scrollTrigger: false
      }
    },
    computed: {
      ripeTxt () {
        return this.$store.getters.articleMd
      }
    }
  }
</script>
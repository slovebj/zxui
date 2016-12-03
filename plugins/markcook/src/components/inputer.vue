<template>
	<div class="inputer">
		<textarea id="inputer" :value='rawTxt' @input='inputting' @scroll='syncStroll' @drop.stop.prevent='dragging' autofocus></textarea>
	</div>
</template>

<script>
	export default {
		computed: {
			rawTxt () {
				return this.$store.getters.articleRaw
			}
		},
		methods: {
			inputting (e) {
				this.$store.dispatch('textInput', e.target.value)
				this.$store.dispatch('saveToCache')
			},
			syncStroll (e) {
				let outputer = document.querySelector('.outputer')
				outputer.scrollTop = e.target.scrollTop
			},
			dragging (e) {
				let self = this
	      let dt = e.dataTransfer;
	      let files = dt.files;
	      let fileReader = new FileReader();
	      fileReader.readAsText(files[0], 'UTF-8');
	      fileReader.onloadend = function (e) {
	        let value = e.target.result
	        self.$store.dispatch('textInput', value)
	        self.$store.dispatch('saveToCache')
	      }
			}
		}
	}
</script>
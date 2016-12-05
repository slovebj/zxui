<template>
	<div class="mc_menu">
		<ul class="files">
			<template v-for='i in articleList.length'>
				<li :class='{"current": articleList[i - 1].current}'>
					<span @click='selectThis(i)'>{{ articleList[i - 1].content.split('\n')[0] }}</span>
					<button v-if='articleList.length > 1' class="delete-btn" @click='deleteThis(i)'><i class="fa fa-times"></i></button>
				</li>
			</template>
		</ul>
		<ul class="options">
			<li>
				<button class="add-one-btn" @click='newArticle'>
					<i class="fa fa-plus"></i>
				</button>
			</li>
			<li>
				<a :href='htmlDataUrl' :download='titleHtml' @mouseenter='createUrl("html")'>
					<i class="fa fa-html5"></i>
					保存为 .html
				</a>
			</li>
			<li>
				<a :href='mdDataUrl' :download='titleMd' @mouseenter='createUrl("md")'>
					<i class="fa fa-download"></i>
					保存为 .md
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				htmlDataUrl: '',
				mdDataUrl: ''
			}
		},
		computed: {
			articleList () {
				return this.$store.getters.articleList
			},
			titleHtml () {
				return this.$store.getters.articleRaw.split('\n')[0] + '.html'
			},
			titleMd () {
				return this.$store.getters.articleRaw.split('\n')[0] + '.md'
			}
		},
		methods: {
			selectThis (i) {
				this.$store.dispatch('selectThis', i - 1)
			},
			newArticle () {
				let filesBox = document.querySelector('.files')
				this.$store.dispatch('newArticle')
				setTimeout(() => {
					filesBox.scrollTop = filesBox.scrollHeight + 180
				}, 100)
			},
			deleteThis (i) {
				this.$store.dispatch('deleteThis', i - 1)
			},
			saveToCache () {
				this.$store.dispatch('saveToCache')
			},
			readFromCache () {
				this.$store.dispatch('readFromCache')
			},
			createUrl (mode) {
	      let self = this
	      let val = ''
	      if (mode === 'md') {
	        val = self.$store.getters.articleRaw
	        let blobObj = new Blob([val])
	        let objectURL = URL.createObjectURL(blobObj)
	        self.mdDataUrl = objectURL
	      } else {
	        val = self.$store.getters.articleMd
	        let blobObj = new Blob([val])
	        let objectURL = URL.createObjectURL(blobObj)
	        self.htmlDataUrl = objectURL
	      }
	    }
		}
	}
</script>
<template>
	<view>
		<!-- {{webURL}} -->
		<web-view :src="webURL"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webURL:'',
			}
		},
		onLoad(options) {
			this.webURL = options.url
			uni.setNavigationBarTitle({
			  title: options.title
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

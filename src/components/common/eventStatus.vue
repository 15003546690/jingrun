<template>
	<div class="eventStatus">
		<img src="../../assets/img/index_state_yizanting.png" v-if="eventStatus == 1" alt="">
		<img src="../../assets/img/index_state_yiqingsuan.png" v-if="eventStatus == 2" alt="">
		<img src="../../assets/img/index_state_yijieshu.png" v-if="eventStatus == 3 && group" alt="">
		<img src="../../assets/img/index_state_daiqingsuan.png" v-if="eventStatus == 3 && !group" alt="">
		<img src="../../assets/img/index_state_kaishi.png" v-if="eventStatus == 4" alt="">
	</div>
</template>
<script>
	export default{
		props:{
			eventStatus:{
				default(){return 0}
			},
			group:{
				default(){return false;}
			}
		}
	}
</script>
<style scoped="scoped">
	.eventStatus{width: 56px; height: 56px; position: absolute; right: 10px; top: 50%; margin-top: -28px;}
</style>
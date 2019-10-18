<template>
	<div class="shares">
		<img src="../../../assets/img/shares/shares-back.jpg" alt="" />
		<div class="btn" @click="btn">
			<img src="../../../assets/img/shares/shares-btn.png" alt="" />
		</div>
	</div>
</template>
<script>
	export default{
		methods:{
			btn(){
				this.$router.push({path:'/activity/150898731359666176'})
			}
		}
	}
</script>
<style type="text/css" scoped="scoped">
	.shares{
		position: relative;
	}
	img{
		width: 100%;
	}
	.btn{
		width: 13%;
		position: absolute;
		top: 53%;
    	left: 43.5%;
    	cursor: pointer;
	}
</style>
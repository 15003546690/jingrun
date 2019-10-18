<template>
	<div class="redPocket">
		<p class="redPocket_img1"></p>
		<p class="redPocket_img2"></p>
		<p class="redPocket_img3"></p>
		<p class="redPocket_img4"></p>
	</div>
</template>
<style scoped>
	*{
		padding: 0;
		margin: 0;
	}
	body{
		font-family: "微软雅黑";
		background: #ffe013;
	}
	.redPocket{
		max-width: 1920px;
		min-width: 1200px;
		margin: auto;
		font-size: 0;
	}
	.redPocket>p{
		width: 100%;
	}
	.redPocket_img1{
		width: 100%;
		height: 401px;
		background: url(../../../assets/img/boxchest/redPocket-img1.png) no-repeat center;
		background-size: cover;
	}
	.redPocket_img2{
		width: 100%;
		height: 486px;
		background: url(../../../assets/img/boxchest/redPocket-img2.png) no-repeat center;
		background-size: cover;
	}
	.redPocket_img3{
		width: 100%;
		height: 462px;
		background: url(../../../assets/img/boxchest/redPocket-img3.png) no-repeat center;
		background-size: cover;
	}
	.redPocket_img4{
		width: 100%;
		height: 838px;
		background: url(../../../assets/img/boxchest/redPocket-img4.png) no-repeat center;
		background-size: cover;
	}
</style>
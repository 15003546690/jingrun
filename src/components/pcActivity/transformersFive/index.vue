<template>
	<div class="bingxing">
		<div class="bingxing_trand"></div>
		<div class="bianxing_center">
			<p class="bianxing_center_p">
				<button class="button1"></button>
			</p>
			<p class="bianxing_center_pp">
				<button class="button2"></button>
			</p>
		</div>
	</div>
</template>
<style scoped>
	* {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	
	.bingxing {
		width: 100%;
		height: 2447px;
		background: url(../../../assets/img/transformersFive/transformers_01.png) no-repeat center;
		background-size: cover;
		min-width: 1220px;
		max-width: 1920px;
	}
	
	.bingxing_trand {
		width: 100%;
		height: 638px;
		background: url(../../../assets/img/transformersFive/1_02.png) no-repeat center;
		background-size: cover;
	}
	
	.bianxing_center {
		margin: 0 auto;
		width: 1200px;
		height: 1812px;
		overflow: hidden;
		background: url(../../../assets/img/transformersFive/2_03.png) no-repeat center;
		background-size: cover;
		text-align: center;
	}
	.bianxing_center_p {
		margin-top: 430px;
	}
	.bianxing_center_pp {
		margin-top: 517px;
	}
	.button1,
	.button2 {
		width: 152px;
		height: 50px;
		background: none;
		outline: none;
		margin-left: 12px;
		cursor: pointer;
		border: none;
	}
</style>
<template>
	<div>
		<!--banner-->
		<div class="flames_war"></div>
		<!--内容-->	
		<div class="flames_content">
			<div class="flames_content_center">
					<div class="center_award"><p><button></button></p></div>
					<div class="center_substance"></div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	* {
	padding: 0;
	margin: 0;
	list-style: none;
	}
	.flames_war{
		width: 100%;
		height:486px;
		min-width: 1220px;
		max-width: 1920px;
		background: url(../../../assets/img/flamesofwar/war_banner_02.png) no-repeat center;
		background-size: cover;
	}
	.flames_content{
		min-width: 1220px;
		max-width: 1920px;
	}
	.flames_content_center{
		height: 1164px;
	}
	.center_award{
		width: 100%;
		height: 563px;
		min-width: 1220px;
		max-width: 1920px;
		background: url(../../../assets/img/flamesofwar/1_02.png) no-repeat center;
		background-size:cover;
	}
	.center_award>p{
		width:1200px;
		height: 563px;
		margin: 0 auto;
		position: relative;
	}
	.center_award>p>button{
		width:102px;
		height: 33px;
		border: none;
		position: absolute;
		bottom: 112px;
        left: 548px;
        background: none;
        outline: none;
        cursor: pointer;
	}
	.center_substance{
		height: 600px;
		min-width: 1220px;
		max-width: 1920px;
		background: url(../../../assets/img/flamesofwar/2_02.png) no-repeat center;
		background-size: cover;
	}
</style>
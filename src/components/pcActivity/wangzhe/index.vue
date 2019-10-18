<template>
	<div class="body">
		<input type="hidden" id="crumb_name" value="王者浪一夏">
		<div class="King_glory"></div>
		<div class="King_body">
			<div class="Active_process">

			</div>
			<div class="Activities_reward">
			<button></button>
			</div>
			<div class="Activities_that">

			</div>
		</div>
		<span class="go_up"></span>
	</div>
</template>
<style scoped>
	* {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.King_glory {
		width: 100%;
		min-width: 1200px;
		height: 638px;
		background: url(../../../assets/img/wangzhe/banner_bg.png) no-repeat center;
		background-size: cover;
	}
	.King_body {
		min-width: 1200px;
	}
	.Active_process {
		width: 100%;
		height: 965px;
		margin: 0 auto;
		background: url(../../../assets/img/wangzhe/2.png) no-repeat center;
		background-size: cover;
	}
	.Activities_reward {
		width: 100%;
		height: 962px;
		margin: 0 auto;
		background: url(../../../assets/img/wangzhe/3.png) no-repeat center;
		background-size: cover;
		text-align: center;
	}
	
	.Activities_reward>button {
		width: 162px;
		height: 42px;
		background: none;
		margin: 0 auto;
		margin-top: 920px;
		cursor: pointer;
		outline: none;
		border: none;
	}
	
	.Activities_that {
		width: 100%;
		height: 748px;
		margin: 0 auto;
		background: url(../../../assets/img/wangzhe/4.png) no-repeat center;
		background-size: cover;
	}
	
	.go_up {
		width: 52px;
		height: 67px;
		background: url(../../../assets/img/wangzhe/go_up.png) no-repeat center;
		background-size: cover;
		position: fixed;
		bottom: 145px;
		right: 88px;
		cursor: pointer;
		display: none;
	}
</style>
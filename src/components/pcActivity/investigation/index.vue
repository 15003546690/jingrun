<template>
	<div>
		<div class="survey_banner"></div>
		<div class="survey_button">
			<div class="survey_button_pic">
				<button></button>
		</div>
	</div>
	</div>
</template>
<style scoped>
	  *{
 		margin: 0;
 		padding: 0;
 		list-style: none;
	 	}
	 	.survey_banner{
	 		height: 480px;
	 		min-width: 1200px;
	 		background: url(../../../assets/img/newguide/survey_banner_02.png) no-repeat center;
			background-size: cover;
	 	}
	 	.survey_button{
	 		width: 100%;
	 		height: 902px;
	 		background: #ffb001;
	 		min-width: 1200px;
	 	}
	 	.survey_button_pic{
	 		width:1200px;
	 		height: 902px;
	 		margin: 0 auto;
	 		background: url(../../../assets/img/newguide/survey_button_03.png) no-repeat center;
			background-size: cover;
			position: relative;
	 	}
	 	.survey_button_pic>button{
	 		width: 248px;
			height: 92px;
			background: none;
			border: none;
			outline: none;
			cursor: pointer;
			position: absolute;
			bottom: 125px;
			left: 450px;
	 	}
</style>
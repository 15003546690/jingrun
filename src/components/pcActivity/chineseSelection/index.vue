<template>
	<div class="body_main">
		<div class="banner"></div>
	    <div class="chinese">
	    	<div class="chinese_center">
	    		<img src="../../../../src/components/pcActivity/chineseSelection/img/chinese.png"/>
	    	</div>
	    </div>
	    <div class="topTen">
	    	<div class="topTen_center">
	    		<img src="../../../../src/components/pcActivity/chineseSelection/img/chinese_02.jpg"/>
	    		<img src="../../../../src/components/pcActivity/chineseSelection/img/chinese_03.jpg"/>
	    		<img src="../../../../src/components/pcActivity/chineseSelection/img/chinese_04.jpg"/>
	    	</div>
	    </div>
	    <div class="ranking">
	    	<div class="ranking_center">
	    		<img src="../../../../src/components/pcActivity/chineseSelection/img/chinese_05.jpg"/>
	    	</div>
	    </div>
	</div>
</template>
<style scoped>
.banner{
	max-width: 1920px;
	min-width: 1000px;
	height: 627px;
	background: url(../../../../src/components/pcActivity/chineseSelection/img/chinese_01.jpg) no-repeat center top;
}	
.chinese{
	height: 762px;
	text-align: center;
	background:#900011;
}
.chinese_center{
	width: 1000px;
	line-height: 762px;
	margin: 0 auto;
}
.chinese img{
	vertical-align: middle;
}
.topTen{
	background:#900011;
}
.topTen_center{
	width: 1000px;
	margin: 0 auto;
}
.ranking{
	height: 985px;
	background:#900011;
}
.ranking_center{
	width: 1000px;
	margin: 0 auto;
}
.ranking_center>img{
	margin-top: 80px;
}
</style>

<template>
	<li>
		<p class="rank_main_figure"><i>{{rank.ranking}}</i></p>
		<p class="rank_main_username"><img :src="rank.userImg"/><span>{{rank.userNickname}}</span></p>
		<p class="rank_main_profit">{{rank.totalProfit}}</p>
	</li>
</template>

<script>
	export default{
		props: [
			'rank'
		]
	}
</script>

<style scoped>
.rank_main_body>li{
	height: 40px;
	margin-top: 20px;
}
.rank_main_body>li>p{
	float: left;
}
.rank_main_figure{
	width: 163px;
	height: 40px;
	line-height: 50px;
	text-align: center;
	color: #676767;
	font-size: 12px;
}
.rank_main_body>li>p>i{
	width: 44px;
	height: 35px;
	display: inline-block;
}
.rank_main_body>li:first-child>p>i{
	background: url(../../../assets/img/active/rank_one.png) no-repeat center;
}
.rank_main_body>li:nth-child(2)>p>i{
	background: url(../../../assets/img/active/rank_two.png) no-repeat center;
}
.rank_main_body>li:nth-child(3)>p>i{
	background: url(../../../assets/img/active/rank_three.png) no-repeat center;
}
.rank_main_username{
	width: 250px;
	line-height: 40px;
	color: #676767;
	font-size: 14px;
	margin-left: 98px;
}
.rank_main_username>img{
	width: 40px;
	height: 40px;
	vertical-align: middle;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
}
.rank_main_username>span{
	vertical-align: middle;
	margin-left: 5px;
}
.rank_main_profit{
	width: 115px;
	line-height: 40px;
	text-align: center;
	color: #676767;
	font-size: 14px;
	font-weight: bold;
}
</style>
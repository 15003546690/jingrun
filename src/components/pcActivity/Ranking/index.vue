<template>
	<div class="rank">
		<!-- <img src="../../../assets/img/ranking.jpg" alt=""> -->
		<div class="rank-top">
			<img src="../../../assets/img/ranking/top.jpg" alt="">
		</div>
		<div class="rank-name">
			<img src="../../../assets/img/ranking/name.jpg" alt="">
		</div>
		<div class="rank-bottom">
			<div><img src="../../../assets/img/ranking/bottom.jpg" alt=""></div>
		</div>
		<div class="rank-footer"></div>
	</div>
</template>
<style scoped='scoped'>
	.rank{
		width: 100%;background: #fdedd6;
	}
/*	.rank-top{
		height: 1114px;background: url(../../../assets/img/ranking/top.jpg) no-repeat center top; background-size: 100%;
	}*/
	.rank-top img{width: 100%;}
	.rank-name{
		height: 1830px;width: 1200px;margin: auto;background: red
	}
	.rank-bottom{
		height: 993px;background: url(../../../assets/img/ranking/top_ten.png) no-repeat center top;margin-top: 100px;overflow: hidden;
	}
	.rank-bottom div{
		width: 1200px;margin: auto;margin-top: 140px;
	}
	.rank-footer{
		height: 245px;background: url(../../../assets/img/ranking/footer.jpg) no-repeat center top;
	}
</style>
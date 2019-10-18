<template>
	<div class="luckAlert">
		<!-- 未中奖 -->
		<div class="noLuck" v-show='num==2'>
			<div class="noLuck-top">
				<div class="noLuck-top-text">
					<div class="noLuck-close" @click='close()'></div>
					<p>很遗憾没能中奖，感谢您的参与...</p>
				</div>
			</div>
			<div class="noLuck-bottom">
				<div class="noLuck-bottom-share">
					<div class="share-wx weixin">
						<img src="../../../assets/img/luck/wx.png" alt="">
						<i><img :src="weixinShare"/></i>
					</div>
					<!-- <div class="share-pyq"><img src="../../../assets/img/luck/pyq.png" alt=""></div> -->
					<div class="share-wb"><img src="../../../assets/img/luck/wb.png" alt=""></div>
					<div class="share-qq"><img src="../../../assets/img/luck/qq.png" alt=""></div>
				</div>
				<div class="noLuck-bottom-btn">
					<div class="noLuck-btn-left" @click='close()'>返回</div>
					<div class="noLuck-btn-right" @click='continues()'></div>
				</div>
			</div>
		</div>
		<!-- 已中奖 -->
		<div class="goodLuck" v-show='num==1 || num==3'>
			<div class="goodLuck-title" v-show='num!=1'>恭喜您中奖啦！</div>
			<div class="goodLuck-title" v-show='num==1'>您有未领取的奖品</div>
			<div class="goodLuck-content">
				<div class="goodLuck-content-pic"><img :src="luckCheck.checkedImg" alt=""></div>
				<div class="goodLuck-content-text">{{luckCheck.checkedName}}</div>
			</div>
			<div class="goodLuck-bottom">
				<div class="noLuck-bottom-share">
					<div class="share-wx weixin">
						<img src="../../../assets/img/luck/wx.png" alt="">
						<i><img :src="weixinShare"/></i>
					</div>
					<!-- <div class="share-pyq"><img src="../../../assets/img/luck/pyq.png" alt=""></div> -->
					<div class="share-wb"><img src="../../../assets/img/luck/wb.png" alt=""></div>
					<div class="share-qq"><img src="../../../assets/img/luck/qq.png" alt=""></div>
				</div>
				<div class="noLuck-bottom-btn" v-show='luckCheck.isfictitious==0 || luckCheck.isfictitious==1'>
					<div class="noLuck-btn-left" @click='close()'>取消</div>
					<div class="noLuck-btn-right" @click='continues()'></div>
				</div>
				<div class="goodLuck-btn" @click='receive()' v-show='luckCheck.isfictitious==2 || luckCheck.isfictitious==3'></div>
			</div>
		</div>
		<!-- 领取成功 -->
		<div class="successLuck" v-show='num==5'>
			<div class="successLuck-box">
				<div class="goodLuck-content">
					<div class="goodLuck-content-pic"><img :src="sucesImg" alt=""></div>
					<div class="goodLuck-content-text">{{sucesName}}</div>
				</div>
				<div class="successLuck-bottom-btn">
					<div class="noLuck-btn-left" @click='close()'>取消</div>
					<div class="noLuck-btn-right" @click='continues()'></div>
				</div>
			</div>
		</div>
		<!-- 余额不足 -->
		<div class="failLuck" v-show='num==4'>
			<div class="failLuck-btn">
				<div class="noLuck-bottom-btn">
					<div class="noLuck-btn-left" @click='close()'>返回</div>
					<div class="noLuck-btn-right" @click='continues()'></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:[
			'numAlert',
			'luckCheck'
		],
		data(){
			return{
				num:0,
				weixinShare:this.$base_url+' /mall/v1/draw/shareLotteryDrawPC',
				sucesImg:null,
				sucesName:null
			}
		},
		created(){
			this.successLuck();
			this.num=this.numAlert;
			// this.wx()
		},
		methods:{
			successLuck(){
				let success=JSON.parse(sessionStorage.getItem("successluck"));
				if(success!=null){
					this.sucesImg=success.luckImg;
					this.sucesName=success.luckName
				}
			},
			//领取奖品
			receive(){
				this.$router.push({path:'/mall/newincreased?id=0'})
			},
			close(){
				this.$emit('vshow');
			},
			continues(){
				this.$emit('continues');
			},
			wx(){
				/*this.$CGET('/mall/v1/draw/shareLotteryDrawPC',(res)=>{
					console.log(res)
				})*/
			}
		}
	}
</script>
<style scoped='scoped'>
	/* 余额不足 */
	.failLuck{
		width: 342px;
		height: 260px;
		background: url(../../../assets/img/luck/fail.png) no-repeat;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -171px;
		margin-top: -130px;
	}
	.failLuck-btn{
		width: 100%;
		height: 64px;
		margin-top: 196px;
		overflow: hidden;
	}
	/* 领取成功 */
	.successLuck{
		width: 342px;
		height: 387px;
		background: url(../../../assets/img/luck/success.png) no-repeat;
		overflow: hidden;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -171px;
		margin-top: -193px;
	}
	.successLuck-box{
		width: 100%;
		height: 233px;
		margin-top: 154px;
	}
	.successLuck-bottom-btn{
		width: 263px;
		height: 37px;
		margin: auto;
		display: flex;
		justify-content: space-between;
	}
	/* 中奖啦 */
	.goodLuck{
		width: 342px;
		height: 430px;
		background: url(../../../assets/img/luck/goodLucy.png) no-repeat;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -171px;
		margin-top: -215px;

	}
	.goodLuck-title{
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 18px;
		margin-top: 20px;
		margin-top: 70px;
		letter-spacing:4px;
		margin-left: 5px;
	}
	.goodLuck-content{
		width: 100%;
		height: 166px;
		margin-top: 7px;
	}
	.goodLuck-content-pic{
		width: 100%;
		display: flex;
		justify-content: center;
		height: 114px;
		padding-top: 10px;
	}
	.goodLuck-content-pic img{
		width: 200px;
	}
	.goodLuck-content-text{
		width: 100%;
		line-height: 30px;
		text-align: center;
		color: #b20d0d;
	}
	.goodLuck-bottom{
		width: 100%;
		height: 110px;
		margin-top: -10px;
	}
	.goodLuck-btn{
		width: 240px;
		height: 36px;
		background: url(../../../assets/img/luck/now.png);
		margin: auto;
		margin-top: 18px;
		cursor: pointer;
	}
	/* 未中奖 */
	.luckAlert{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.8);
		z-index: 99
	}
	.noLuck{
		width: 342px;
		height: 334px;
		background: url(../../../assets/img/luck/no_luck.png);
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -171px;
		margin-top: -167px;
	}
	.noLuck-top{
		width: 100%;
		height: 186px;
		overflow: hidden;
	}
	.noLuck-top-text{
		width: 175px;
		height: 40px;
		margin: auto;
		margin-top:113px;
	}
	.noLuck-close{
		width: 24px;
		height: 24px;
		float: left;
		background: url(../../../assets/img/luck/close.png);
		cursor: pointer;
	}
	.noLuck-top-text p{
		font-size: 17px;
		color: #fff;
		margin-left: 32px;
	}
	.noLuck-bottom-share{
		width: 222px;
		height: 36px;
		margin: auto;
		margin-top: 43px;
		display: flex;
		justify-content: space-around;
	}
	.noLuck-bottom-share div{
		width: 34px;
		height: 34px;
		cursor: pointer;
	}
	.noLuck-bottom-btn{
		width: 263px;
		height: 37px;
		margin: auto;
		display: flex;
		justify-content: space-between;
		margin-top: 18px;
	}
	.noLuck-bottom-btn div,.successLuck-bottom-btn div{
		width: 122px;
		height: 36px;
		cursor: pointer;
	}
	.noLuck-btn-left{
		font-size: 18px;
		line-height: 36px;
		font-weight: bold;
		color: #f83432;
		text-align: center;
	}
	.noLuck-btn-right{
		background: url(../../../assets/img/luck/continue.png);
	}
	.weixin>i {
		width: 246px;height: 233px;position: absolute;bottom: 56px;left: -237px;z-index: 57;background: red;background:url(../../../assets/img/newAct/wxewm.png) no-repeat;display: none;
	} 	
	.weixin>i>img {
	    width: 72%;margin-top: 16px;margin-left: 24px;
	}
	.weixin:hover.weixin>i {
		display: block;
	}
</style>
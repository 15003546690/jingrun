<template>
	<div id="chinese">
		<div class="chinese_box">
			<div class="chinese_header">
				<img src="../../../assets/img/chinese/images/zc-header.png" alt="" />
			</div>
			<div class="chinese_hb">
				<div class="hb_tab">
					<div class="hb_taba" @click="one">
						<img src="../../../assets/img/chinese/images/yellow-one.png" alt=""  v-show="pic.onePic==true"/>
						<img src="../../../assets/img/chinese/images/blue-one.png" alt="" v-show="pic.onePic==false"/>
					</div>
					<div class="hb_tabb" @click="two">
						<img src="../../../assets/img/chinese/images/yellow-two.png" alt="" v-show="pic.twoPic==true"/>
						<img src="../../../assets/img/chinese/images/blue-two.png" alt="" v-show="pic.twoPic==false"/>
					</div>
					<div class="hb_tabc" @click="three">
						<img src="../../../assets/img/chinese/images/yellow-three.png" alt="" v-show="pic.threePic==true"/>
						<img src="../../../assets/img/chinese/images/blue-three.png" alt="" v-show="pic.threePic==false"/>
					</div>
				</div>
				<router-view></router-view>
			</div>
			<div class="chinese_footer">
			</div>
		</div>
		<Aalert :alertText='alertText' @vNum='vNum' v-show='alertIsShow'/>
	</div>
</template>
<script>
	import Aalert from './solicitation/alertNum'
	export default{
		components:{
			Aalert
		},
		data(){
			return{
				alertText:null,
				alertIsShow:false,
				activityId:null,
				pic:{
					onePic:false,
					twoPic:false,
					threePic:true
				}
			}
		},
		created(){
			this.activityId=this.GetQueryString('activityId');
		},
		methods:{
			GetQueryString(name){
		     	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
			},
			vNum(){
				this.alertIsShow=false
			},
			one(){
				this.$router.push({path:'/chinese/solicitation?activityId='+this.activityId})
				this.pic.onePic=true
				this.pic.twoPic=false
				this.pic.threePic=false
			},
			two(){
				/*this.alertIsShow=true
				this.alertText='暂未开放敬请期待'*/
				this.$router.push({path:'/chinese/competition?activityId='+this.activityId})
				this.pic.onePic=false
				this.pic.twoPic=true
				this.pic.threePic=false
			},
			three(){
				/*this.alertIsShow=true
				this.alertText='暂未开放敬请期待'*/
				this.$router.push({path:'/chinese/selectionn?activityId='+this.activityId})
				this.pic.onePic=false
				this.pic.twoPic=false
				this.pic.threePic=true
			}
		}
		
	}
</script>
<style scoped="scoped">
	#chinese{
		width: 100%;
		min-width: 1000px;
		margin: auto;
		height: 2920px;
		background: url(../../../assets/img/chinese/images/zc-background.png) no-repeat;
		background-size: 100% 100%;
		float: left;
	}
	.chinese_box{
		height: 100%;
		width: 1000px;
		margin: auto;
	}
	.chinese_header{
		height: 512px;
		margin-top: 89px;
	}
	.chinese_hb{
		margin-top: 17px;
		width: 100%;
		height: 1475px;
		background: url(../../../assets/img/chinese/images/zc-hbcommon.png) no-repeat;
		background-size: 100%;
	}
	.chinese_footer{
		width: 100%;
		height: 827px;
		background: url(../../../assets/img/chinese/images/zc-footer.png) no-repeat;
	}
	.hb_tab{
		overflow: hidden;
		width: 100%;
		height: 96px;
	}
	.hb_taba{
		width: 247px;
		height: 79px;
		margin-top: 10px;
		margin-left: 60px;
		float: left;
		cursor: pointer;
	}
	.hb_tabb{
		width: 248px;
		height: 79px;
		margin-left: 72px;
		float: left;
		margin-top: 10px;
		cursor: pointer;
	}
	.hb_tabc{
		width: 247px;
		height: 79px;
		margin-top: 10px;
		margin-right: 60px;
		float: right;
		cursor: pointer;
	}
</style>
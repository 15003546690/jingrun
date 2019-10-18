<template>
	<div id="timea-box">
		<div class="timea-content">
			<div class="timea-header" @click='close'>
				<img src="../../assets/img/time_close.png" alt="">
			</div>
			<div class="timea-main" @click='ckImg()'>
				<img :src='timeImg' alt="">
			</div>
			<div class="timea-bottom">
				<p @click='imgCk()'>
					<span>
						<img src="../../assets/img/time_no.png" alt="" v-show='timeH'>
						<img src="../../assets/img/time_yes.png" alt="" v-show='!timeH'>
					</span>
					今日不再显示
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				timeH:true,
				timeImg:null,
				actId:null,
				num:null,
				path:null,
				href:null
			}
		},
		created(){
			this.$CPOST('/share/v1/popup/queryPopupMsgPc',{
				},(res)=>{
					this.timeImg=res.resultValue.pcImg;
					this.actId=res.resultValue.relateId;
					this.num=res.resultValue.relate;
					this.href=res.resultValue.pcUrl;
				})
		},
		methods:{
			imgCk(){
				if(this.timeH==true){
					this.timeH=false;
				}else{
					this.timeH=true;
				}
			},
			close(){
				this.$emit('times',this.timeH)
			},
			ckImg(){
				var type = 0;
				if (this.num == 2) {
					this.path = '/newActivity/' + this.actId;
					type = 1;
				} else if (this.num == 3) {
					this.$Bury(this.href,this.actId,type,'advertising_01002');
					window.open(this.href);
				} else if (this.num == 0) {
					type = 2;
					this.path = '/group/' + this.actId;
					// this.$router.push({path:this.path})
				} else if (this.num == 1) {
					type = 3;
					this.path = '/event/' + this.actId;
					
				}
				this.$Bury(this.path,this.actId,type,'advertising_01002');
				setTimeout(()=>{
					this.$router.push({path:this.path})
				},500)
			}
		}
	}
</script>
<style scoped='scoped'>
	#timea-box{
		width: 100%;height: 100%;background: rgba(0,0,0,0.8);position: fixed;top:0;z-index: 999;
	}
	.timea-content{
		width: 518px;left: 50%;top: 50%;margin-left: -259px;margin-top: -260px;position: absolute;
	}
	.timea-header{
		width: 100%;height: 40px;cursor: pointer;
	}
	.timea-header img{
		float: right;
	}
	.timea-main{
		width: 436px;margin-left: 40px;cursor: pointer;
	}
	.timea-main img{
		width: 100%;
	}
	.timea-bottom{
		width: 100%;height: 95px;line-height: 95px;text-align: center;
	}
	.timea-bottom p{
		color: #fff;font-size: 24px;width: 180px;height: 30px;margin: auto;cursor: pointer;
	}
	.timea-bottom span{
		display: inline-block;width: 18px;height: 18px;float: left;vertical-align: center;
	}
</style>
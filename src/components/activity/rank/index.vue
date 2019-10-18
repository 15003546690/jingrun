<template>
	<div>
		<img :src="rankImg" alt="">
	</div>
</template>
<script>
	export default{
		data(){
			return{
				// rankImg:'/static/img/activity_pic_group.2849e23.png'
				rankImg:null
			}
		},
		created(){
			this.$Bury(window.location.href,this.GetQueryString('actId'),1,'huodongpaihang_04001')
			this.rank()
		},
		methods:{
			GetQueryString(name){
			    return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(window.document.URL)||[,""])[1].replace(/\+/g,'%20'))||null;
			},
			//活动详情、排行请求
			rank(){
				this.$CPOST('/activity/v1/activity/showNewActivity',{
					activityId:this.GetQueryString('actId')
				},(res)=>{
					if(res.resultCode === 200){
						this.rankImg=res.resultValue.rankImg.pc
						console.log(res.resultValue.rankImg.pc)
					}
				})
			}
		}
	}
</script>
<style scoped='scoped'>
	img{
		width: 100%;
	}
</style>
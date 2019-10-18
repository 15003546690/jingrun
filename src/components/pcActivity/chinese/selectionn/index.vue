<template>
	<div class="solicitation">
		<div class="competition_bg">
			
		</div>
		<div class="solicitation_content">
			<img src="../../../../assets/img/chinese/images/three_content.png" alt="" />
		</div>
		<div class="solicitation_btn" @click="participate">
			<img src="../../../../assets/img/chinese/images/zc-btn.png" alt="" />
		</div>
		<div class="solicitation_look" @click='locklock'>
			<img src="../../../../assets/img/chinese/images/zc-look.png" alt="" />
		</div>
		<alertText v-show='alertTextS' @vshow='vshow'/>
		<alertRecord v-show='alertRecordS' @vRecShow='vRecShow'/>
		<login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"/>
		<Aalert :alertText='alertText' @vNum='vNum' v-show='alertIsShow'/>
	</div>
</template>
<script>
	import alertText from '../alertt/alertText'
	import alertRecord from '../alertt/alertRecord'
	import login from '../../../common/Login'
	import Aalert from '../solicitation/alertNum'
	export default{
		components:{
			alertText,
			alertRecord,
			login,
			Aalert
		},
		data(){
			return{
				alertTextS:false,
				alertRecordS:false,
				isShowLoginModal: false,
				token:null,
				loginToken:null,
				myPage:{
					countPage:null,
					indexPage:0,
					content:null,
					rightShow:true,
					leftShow:false
				},
				userId:null,
				activityId:null,
				pageHide:false,
				alertText:null,
				alertIsShow:false
			}
		},
		created(){
			this.activityId=this.GetQueryString('activityId')
			this.page(this.myPage.indexPage)
		},
		methods:{
			vNum(){
				this.alertIsShow=false
			},
			GetQueryString(name){
		     	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
			},
			participate(){
				/*this.alertIsShow=true
				this.alertText='本阶段暂暂未开始，敬请期待！'*/
				if(this.$store.state.refreshToken == ''){
					this.isShowLoginModal=true
				}else{
					/*this.alertTextS=true
					this.$children[0]._data.mychineseNum=null*/
					this.$router.push({path:'/activity/142940015549218816'})
				}
			},
			locklock(){
				if(this.$store.state.refreshToken == ''){
					this.isShowLoginModal = true;
				}else{   
					this.alertRecordS = true;
					this.$children[1].lookLk();
				}
			},
			vshow(){
				this.alertTextS = false;
			},
			vRecShow(){
				this.alertRecordS = false;
			},
			page(page){
				this.$CPOST('/account/v1/userSubject/updateUserSubject', {
					activityId: this.activityId,
					page: page,
					size: 30
			    },(res) => {
			      	this.myPage.countPage = res.resultValue.userSubjectEntitysCount;
			      	this.myPage.content = res.resultValue.userSubjectEntitys;
			      	this.userId = res.resultValue.userId;
			      	let arr = document.querySelectorAll('.solicitation_matt_chin');
			      	//向上取整
			      	if(Math.ceil(this.myPage.countPage/30)!=0){
			      		this.pageHide = true;
			      	}
			      	if(Math.ceil(this.myPage.countPage/30)==1){
			      		this.myPage.rightShow = false;
			      	}
			    })
				//
		        this.isShowPageBtn();
		        let indexPage=this.myPage.indexPage + 1;
				let countPage=Math.ceil(this.myPage.countPage/30);
			},
			//上一页
			prevPage(){
				this.myPage.indexPage=this.myPage.indexPage - 1;
				this.page(this.myPage.indexPage);
				this.isShowPageBtn();
			},
			//下一页
			nextPage(){
				this.myPage.indexPage = this.myPage.indexPage + 1;
				this.page(this.myPage.indexPage);
				this.isShowPageBtn();
			},
			isShowPageBtn(){
				let indexPage = this.myPage.indexPage + 1;
				let countPage = Math.ceil(this.myPage.countPage/30);
				let page = this.myPage.indexPage;
				if(indexPage==countPage){
					this.myPage.rightShow = false;
					this.myPage.leftShow = true;
				}else{
					this.myPage.rightShow = true;
					this.myPage.leftShow = false;
				}
			},
			hideLoginModal() {
		      this.isShowLoginModal = false
		    }
		}
	}
</script>
<style scoped>
	.competition_bg{
		width: 100%;
		height: 700px;
	}
	.bg{
		background: url(../../../../assets/img/chinese/images/tzg-red.png) no-repeat !important;
		color: #fde936 !important;
	}
	.solicitation{
		height: 1380px;
		padding: 0 56px;
		background: url(../../../../assets/img/chinese/images/two-bg.png) no-repeat;
		overflow: hidden;
		background-size: 100%;

	}
	.solicitation_page{
		display: none;
		width: 100%;
		height: 23px;
		margin-top: 520px;
		background: url(../../../../assets/img/chinese/images/zc-page.png) no-repeat;
	}
	.solicitation_matt{
		width: 100%;
		height: 266px;
		margin-top: 520px;
	}
	.solicitation_matt_chin{
		cursor: pointer;
		width: 81px;
		height: 81px;
		line-height: 81px;
		text-align: center;
		font-size: 50px;
		color: #FFFFFF;
		float: left;
		margin-left: 3px;
		margin-right: 4px;
		margin-bottom: 9px;
		background: url(../../../../assets/img/chinese/images/zc-tzg.png) no-repeat;
	}
	.solicitation_page_bottom{
		width: 100%;
		height: 33px;
		margin-top: 25px;
		padding: 0 364px 0 355px;
		box-sizing: border-box;
	}
	.solicitation_page_left{
		width: 33px;
		height: 33px;
		float: left;
		cursor: pointer;
	}
	.solicitation_page_center{
		text-align: center;
		line-height: 33px;
		font-size: 20px;
		color: #FFFFFF;
		width: 60px;
		height: 33px;
		float: left;
		margin-left: 24px;
	}
	.solicitation_page_right{
		width: 33px;
		height: 33px;
		float: right;
		cursor: pointer;
	}
	.solicitation_btn{
		width:364px;
		height: 101px;
		margin-top: 80px;
		margin-left: 266px;
		cursor: pointer;
	}
	.solicitation_look{
		width: 185px;
		height: 29px;
		cursor: pointer;
		margin-left: 352px;
		margin-top: 21px;
	}
	.solicitation_content{
		margin-left: -20px;
		margin-top: 40px;
	}
</style>
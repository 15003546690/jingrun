<template>
	<div class="solicitation">
		<div class="solicitation_page"></div>
		<!--页面字显示-->
		<div class="solicitation_matt">
			<div class="solicitation_matt_chin" v-for="i in myPage.content" :data-content='i.content' :class="i.userId == userId ? 'bg' : ''" :data-userId='i.userId' @click='detai($event)'>
				{{i.title}}
			</div>
		</div>
		<!--分页-->
		<div class="solicitation_page_bottom">
			<div v-show="pageHide">
				<div class="solicitation_page_left" @click="myPage.leftShow && prevPage()">
					<img src="../../../../assets/img/chinese/images/page-left-ncolor.png" alt="" v-show="myPage.leftShow==false"/>
					<img src="../../../../assets/img/chinese/images/page-left-ycolor.png" alt="" v-show="myPage.leftShow==true"/>
				</div>
				<div class="solicitation_page_center">{{myPage.indexPage+1}}/{{Math.ceil(myPage.countPage/30)}}</div>
				<div class="solicitation_page_right" @click="myPage.rightShow && nextPage()">
					<img src="../../../../assets/img/chinese/images/page-right-ycolor.png" alt=""  v-show="myPage.rightShow==true"/>
					<img src="../../../../assets/img/chinese/images/page-right-ncolor.png" alt="" v-show="myPage.rightShow==false"/>
				</div>
			</div>
		</div>
		<div class="solicitation_content">
			<img src="../../../../assets/img/chinese/images/zc-hbcontent.png" alt="" />
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
		<alertDetail v-if='alertDetail' @vdetail='vdetail' :alertText='alertText'/>
		<Aalert :alertText='alertNumText' @vNum='vNum' v-show='alertIsShow'/>
	</div>
</template>
<script>
	import alertText from '../alertt/alertText'
	import alertRecord from '../alertt/alertRecord'
	import login from '../../../common/Login'
	import alertDetail from './alertDetails'
	import Aalert from './alertNum'
	export default{
		components:{
			alertText,
			alertRecord,
			login,
			alertDetail,
			Aalert
		},
		data(){
			return{
				alertTextS:false,
				alertRecordS:false,
				alertDetail:false,
				isShowLoginModal: false,
				myPage:{
					countPage:null,
					indexPage:0,
					content:null,
					rightShow:true,
					leftShow:false
				},
				userId:null,
				activityId:null,
				pageHide:true,//分页
				alertText:null,
				alertNumText:null,
				alertIsShow:false
			}
		},
		created(){
			//获取地址栏的ID
			this.activityId = this.GetQueryString('activityId');
			this.page(this.myPage.indexPage);
		},
		methods:{
			vNum(){
				this.alertIsShow = false;
			},
			detai(e){
				let content=e.path[0].getAttribute('data-content');
				this.alertDetail=true;
				this.alertText=content;
			},
			//弹层显示
			vdetail(){
				this.alertDetail = false;
			},
			GetQueryString(name){
		     	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
			},
			//第一阶段点击
			participate(){
				this.alertIsShow=true;
				this.alertNumText = '本阶段已结束';
			},
			locklock(){
				if(this.$store.state.refreshToken == ''){
					this.isShowLoginModal=true;
				}else{
					this.alertRecordS=true;
					this.$children[1].lookLk()
				}
			},
			//弹层
			vshow(){
				this.alertTextS=false;
			},
			//弹层
			vRecShow(){
				this.alertRecordS=false;
			},
			page(page){
				this.$CPOST('/account/v1/userSubject/queryAllActivitySubject', {
					activityId: '141898831263432704',
					page: page,
					size: 30
			    },(res) => {
			      	this.myPage.countPage = res.resultValue.userSubjectEntitysCount;
			      	this.myPage.content = res.resultValue.userSubjectEntitys;
			      	this.userId = res.resultValue.userId;
			      	//获取所有div类名solicitation_matt_chin
			      	let arr = document.querySelectorAll('.solicitation_matt_chin');
			      	//执行向上舍入，即它总是将数值向上舍入为最接近的整数；
			      	if(Math.ceil(this.myPage.countPage/30)!=0){
			      		this.pageHide=true;
			      	}
			      	//执行向上舍入，即它总是将数值向上舍入为最接近的整数；
			      	if(Math.ceil(this.myPage.countPage/30)==1){
			      		this.myPage.rightShow=false;
			      	}
			    })
				//
		        let indexPage = this.myPage.indexPage + 1;
				let countPage = Math.ceil(this.myPage.countPage/30);
			},
			//上一页
			prevPage(){
				this.myPage.indexPage=this.myPage.indexPage - 1;
				this.page(this.myPage.indexPage);
				this.prevShowBtn();
			},
			//下一页
			nextPage(){
				this.myPage.indexPage = this.myPage.indexPage + 1;
				this.page(this.myPage.indexPage)
				this.isShowPageBtn()
			},
			//点击翻转
			prevShowBtn(){
				let indexPage=this.myPage.indexPage + 1;
				let countPage=Math.ceil(this.myPage.countPage/30)
				let page=this.myPage.indexPage;
				if(indexPage<countPage && indexPage==1){
					this.myPage.rightShow=true;
					this.myPage.leftShow=false;
				}
				if(indexPage!=1){
					this.myPage.rightShow=true;
					this.myPage.leftShow=true;
				}
			},
			isShowPageBtn(){
				this.myPage.leftShow=true;
				let indexPage = this.myPage.indexPage + 1;
				let countPage = Math.ceil(this.myPage.countPage/30)
				let page = this.myPage.indexPage;
				if(indexPage==countPage){
					this.myPage.rightShow=false;
					this.myPage.leftShow=true;
				}
			},
			hideLoginModal() {
		      this.isShowLoginModal = false;
		    }
		}
	}
</script>
<style scoped>
	.bg{
		background: url(../../../../assets/img/chinese/images/tzg-red.png) no-repeat !important;
		color: #fde936 !important;
	}
	.solicitation{
		height: 1380px;
		padding: 0 56px;
		background: url(../../../../assets/img/chinese/images/zc-hbback.png) no-repeat;
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
		margin-top: 7px;
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
		margin-top: 101px;
	}
</style>
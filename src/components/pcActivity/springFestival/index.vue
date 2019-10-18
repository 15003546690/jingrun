<template>
	<div>
		<!--banner-->
		<div class="header"><div><a @click="participate()"></a></div></div>
		<!--参与时间-->
		<div class="setaion">
			<div class="setaion_main">
				<ul>
					<li class="l1"></li>
					<li class="l2" @click="activity_prizes('activity_prizes')"></li>
					<li class="l3" @click="activity_prizes('details_activities')"></li>
					<li class="l4" @click="l4()"></li>
					<li class="l5" @click="l5()"></li>
				</ul>
				<p><img src="../../../../src/components/pcActivity/springFestival/img/act_three.png"/></p>
			</div>
		</div>
        <!--活动奖品-->
        <div class="activity_prizes" id="activity_prizes">
        	<p></p><p></p>
        </div>
        <!--活动详情-->
        <div class="details_activities" >
        	<p class="details_top"></p>
        	<!--征集-->
        	<div class="Solicitation">
        		<div class="Solicitation_center">
        			<a @click="Nomination()"></a>
        		</div>
        	</div>
        	<!--我要提名-->	
        	<div class="Nomination">
        		<div class="nomination_top">
        			<img @click="partic()" src="../../../components/pcActivity/springFestival/img/Nomination_btn.png"/>
        		</div>
        		<div class="nomination_main">
        			<!--列表-->
                   <div class="nomination_main_div">
        				<ul>
        				<li class="solicitation_matt_chin" v-for="item in myPage.content" :data-content='item.content' :data-userId='item.userId' @click='detai(item.content)'><!---->
        					<span><img :src="item.headimg"/></span>
        					<div class="nomination_infor">
        						<p class="nomination_infor_1p">{{item.nickname}}<i>{{formatDate(item.createTime)}}</i></p>
        						<p class="nomination_infor_2p">提名艺人：{{item.title}}</p>
        						<p class="nomination_infor_3p">提名理由：{{item.content}}</p>
        						<div class="nomination_infor_div">{{item.content}}</div>
        					</div>
        				</li>
        				</ul>
        			</div>
        			<!--分页-->
        			<div class="page" v-show="pageHide">
        				<div class="page_A" @click="myPage.leftShow && prevPage()">
        					<i v-show="myPage.leftShow==false" class="prevPage" disabled="disabled">上一页</i>
        					<i v-show="myPage.leftShow==true">上一页</i>
        				</div>
        				<span>{{myPage.indexPage+1}}/{{Math.ceil(myPage.countPage/8)}}</span>
        				<div class="page_B" @click="myPage.rightShow && nextPage()">
        					<i v-show="myPage.rightShow==true">下一页</i>
        					<i v-show="myPage.rightShow==false" disabled="disabled" class="prevPage">下一页</i>
        				</div>
        			</div>
        		</div>
        	</div>
        	<!--入围阶段-->
        	<div class="competition" >
        		<p><img src="../../../components/pcActivity/springFestival/img/competition.png"/></p>
        	</div>
        	<!--评选阶段-->
        	<div class="Selection" id="details_activities">
        		<p><img src="../../../components/pcActivity/springFestival/img/Selection.png"/></p>
        	</div>
        	<!--须知-->
        	<div class="Notice">
        		<p><img src="../../../components/pcActivity/springFestival/img/Other.png"/></p>
        	</div>
        	<!--立即参与-->
        	<div class="immediately">
        		<p><img @click="participate()" src="../../../components/pcActivity/springFestival/img/come_btn.png"/></p>
        		<p>本活动最终解释权 归未来无限网所有</p>
        	</div>
        </div>
	<Prompt v-if="prompt" @close="close" :Text="Text"></Prompt>
	<Record v-if="Record" @close="close"></Record>
	<Note v-if="Note" @close="close"></Note>
	<Reason v-if="reason" @close="close" :Text="Text"></Reason>
	<login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"/>
	</div>
</template>
<script>
    import Prompt from './alert/prompt'
    import Record from './alert/Record'
    import Note from './alert/note'
    import Reason from './alert/reason'
    import login from '@/components/common/login'
	export default{
		components:{
			Prompt,
			Record,
			Note,
			login,
			Reason
		},
		data(){
			return{
				pageHide:true,
				prompt:false,
				Record:false,
				Note:false,
				Text:null,
				reason:false,
				activityId:'',
				isShowLoginModal: false,
				myPage:{
					countPage:null,
					indexPage:0,
					content:null,
					rightShow:false,
					leftShow:false
				}
			}
		},
		created(){
			this.activityId = this.GetQueryString('activityId');
			this.list(this.myPage.indexPage);
		},
		methods:{
			GetQueryString(name){
		     	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
			},
			//我要参与 
			participate(){
				if(this.$store.state.refreshToken == ''){
					this.isShowLoginModal=true;
				}else{
//					this.Record = true;
//	                this.prompt = true;
//					this.Text="本阶段已结束！"
					this.$router.push({path:'/activity/162864913151164416'})
				}
			},
			//
			partic(){
				if(this.$store.state.refreshToken == ''){
					this.isShowLoginModal=true;
				}else{
//					this.Record = true;
	                this.prompt = true;
					this.Text="本阶段已结束！"
//					this.$router.push({path:'/activity/162864913151164416'})
				}
			},
			//关闭按钮
			close(){
				this.Record = false;//艺人提名弹层
				this.prompt = false;//成功失败   提示
				this.Note = false;//记录弹层
				this.reason = false;
			},
			//点击全部话题
			l4(){
//				this.prompt = true;
//				this.Text="暂未开始，敬请期待!"
				this.$router.push({path:'/activity/162864913151164416'})
			},
			//点击查看全部排行榜
			l5(){
				this.$router.push({path:'/Ranking'})
			},
			//查看提名记录
			Nomination(){
				if(this.$store.state.refreshToken == ''){
					this.isShowLoginModal=true;
				}else{
					this.Note = true;//记录弹层
				}
			},
			//转化时间戳
			formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
		    },
		    //
		    activity_prizes(activity_prizes){
		    	var top = $('#'+ activity_prizes).offset().top +'px';
		    	    $("html,body").animate({ scrollTop: top }, {duration: 500,easing: "swing"});
		    },
			//查询通过列表
			list(page){
				let indexPage = this.myPage.indexPage + 1;
				let countPage = Math.ceil(this.myPage.countPage/8);
				this.$CPOST('/account/v1/userSubject/queryApprovalActivitySubject', {
					activityId: this.activityId,
					page: page,
					size: 8
			    },(res) => {
			      	this.myPage.countPage = res.resultValue.userSubjectEntitysCount;//总页数
			      	this.myPage.content = res.resultValue.userSubjectEntitys;//列表
			      	this.userId = res.resultValue.userId;
			      	if(this.myPage.content.length==0){
					   this.myPage.rightShow == false;
				    }
			      	if(Math.ceil(this.myPage.countPage/8)!=0){
			      		this.pageHide=true;
			      	}
			      	if(Math.ceil(this.myPage.countPage/8)>1){
			      		this.myPage.rightShow = true;
			      	}
			      	if(indexPage==countPage){
					this.myPage.rightShow = false;
				}
			    })
			},
			//点击列表显示小弹层
			detai(content){
				this.reason = true;
				this.Text=content;
			},
			//上一页
			prevPage(){
				this.myPage.indexPage=this.myPage.indexPage - 1;
				this.list(this.myPage.indexPage);
				this.prevShowBtn();
			},
			//下一页
			nextPage(){
				this.myPage.indexPage = this.myPage.indexPage + 1;
				this.list(this.myPage.indexPage)
				this.isShowPageBtn()
			},
			//点击翻转
			prevShowBtn(){
				let indexPage=this.myPage.indexPage + 1;
				let countPage=Math.ceil(this.myPage.countPage/8)
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
				let countPage = Math.ceil(this.myPage.countPage/8)
				let page = this.myPage.indexPage;
				if(indexPage==countPage){
					this.myPage.rightShow=false;
					this.myPage.leftShow=true;
				}
			},
			hideLoginModal(){
		      this.isShowLoginModal = false;
		    }
        }
	}
</script>
<style scoped>
	.header {height: 956px;background: url(../../../../src/components/pcActivity/springFestival/img/banner.jpg) no-repeat center;}
	.header>div{width: 1238px;height: 956px;margin: 0 auto;position: relative;}
	.header>div>a{width:328px;height:70px;position: absolute;left: 455px;bottom: 71px;cursor: pointer;}
	.setaion {height: 320px;background: #fdedd6;}
	.setaion_main{width: 1236px;height: 320px;margin: 0 auto;}
	.setaion_main>ul{width: 1276px;display: inline-block;}
	.setaion_main>ul>li{height: 94px;width: 215px;float: left;margin-right:38px;cursor: pointer;}
    .l1{background: url(../../../components/pcActivity/springFestival/img/act_time.png) no-repeat center;}
    .l2{background: url(../../../components/pcActivity/springFestival/img/act_grif.png) no-repeat center;}
    .l3{background: url(../../../components/pcActivity/springFestival/img/act_del.png) no-repeat center;}
    .l4{background: url(../../../components/pcActivity/springFestival/img/act_word.png) no-repeat center;}
    .l5{background: url(../../../components/pcActivity/springFestival/img/act_bang.png) no-repeat center;}
    .setaion_main>p{ text-align: center;margin-top: 48px;}
    .activity_prizes>p{height: 148px;background: url(../../../../src/components/pcActivity/springFestival/img/activity_prizes.jpg) no-repeat center;}
    .activity_prizes>p+p{height: 856px;background: url(../../../../src/components/pcActivity/springFestival/img/activity_prizes1.jpg) no-repeat center;}
    .details_activities{}
    .details_top{height: 148px;background: url(../../../components/pcActivity/springFestival/img/details_top.jpg) no-repeat center;}
    .Solicitation{height: 570px;background: url(../../../components/pcActivity/springFestival/img/stage_02.png) no-repeat center;}
    .Solicitation_center{width: 1231px;height: 570px;margin: 0 auto;text-align: right;}
    .Solicitation_center a{width: 194px;height: 30px;display: block;float: right;margin-top: 106px; margin-right: 53px;cursor: pointer;}
    .Nomination{background: url(../../../components/pcActivity/springFestival/img/details_bg.jpg) no-repeat center;}
    .nomination_top{height: 134px;padding-top: 30px;text-align: center;}
    .nomination_top>img{cursor: pointer;}
    .nomination_main{height: 610px;width: 1205px;margin: 0 auto;padding-top:100px;background: url(../../../components/pcActivity/springFestival/img/look_name.png) no-repeat center;}
    .nomination_main_div{width: 1150px;height: 539px;margin: 0 auto;overflow: hidden;}
    .nomination_main_div>ul{width: 1170px;height: 539px;}
    .nomination_main_div>ul>li{width: 560px;height: 113px;cursor:pointer;float: left;border:solid 1px #efb2a8;margin-right: 22px;margin-bottom: 19px;}
    .nomination_main_div>ul>li>span{width: 78px;float: left;height: 113px;text-align: center;}
    .nomination_main_div>ul>li>span>img{width: 55px;height: 55px;border-radius: 50%;margin-top:8px;}
    .nomination_infor{width: 482px;height: 113px;float: right;position: relative;font-family: "Microsoft YaHei";}
    .nomination_infor_1p{font-size: 16px;color: #acacac;line-height: 26px;margin-top: 14px;}
    .nomination_infor_div{display: none;}
    /*.nomination_infor:hover .nomination_infor_div{width: 332px;padding: 10px 10px;display: block;position: absolute;top: 24px;right: 0;font-size: 14px;line-height: 16px;color: #acacac;background: white;}*/
    .nomination_infor_2p,.nomination_infor_3p{color: #333333;font-size: 20px;line-height: 30px;}
    .nomination_infor_3p{overflow: hidden;white-space: nowrap;text-overflow:ellipsis;}
    .nomination_infor>p>i{float: right;margin-right: 14px;}
    .page{width: 368px;line-height: 30px;margin: 0 auto;font-size: 16px;color: #444444;text-align: center;margin-top: 19px;}
    .page_A{float: left;cursor: pointer;}
    .page_B{float: right;cursor: pointer;}
    .competition,.Selection,.Notice{background: url(../../../components/pcActivity/springFestival/img/details_bg.jpg) no-repeat center;}
    .competition>p{width: 1165px;height: 560px;margin: 0 auto;padding-top: 65px;}
    .Selection>p{width: 1165px;height:494px;margin: 0 auto;padding-top: 65px;}
    .Notice>p{width: 1165px;height:532px;margin: 0 auto;padding-top: 65px;}
    .immediately{height: 318px;background: url(../../../components/pcActivity/springFestival/img/act_footer.jpg) no-repeat center;}
    .immediately>p{width: 1232px;margin: 0 auto;text-align: center;}
    .immediately>p>img{cursor: pointer;}
    .immediately>p+p{margin-top: 50px;font-size: 24px;color: #fdf0dd;}
    .prevPage{color: #c0b6a7;}
</style>
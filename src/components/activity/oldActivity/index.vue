<template>
	<div class="activityD_main">
		
		<div class="activityD_mes">
			<div class="activityD_mes_left">
				<p class="activityD_mes_head">{{detail.allName}}</p>
				<ul class="eventDetail_head_label">
					<li class="eventGroup_center_huodong"><span>活动</span></li>
					<li v-for="item in detail.tags"><i></i><span>{{item}}</span></li>
				</ul>
			</div>
			<div class="activityD_mes_right">
				<div class="eventGroup_center_share">
					<span class="eventG_center_attention eventG_center_add" v-show='follow.add' @click="attention(activityId)"><img src="../../../assets/img/eventGroup/event_add.png"/> 关注</span>
					<span class="eventG_center_attention" v-show='follow.yet'>已关注</span>
					<p class="eventG_share">
						<span>分享至:</span>
						<a @click='qq'>
							<img src="../../../assets/img/eventGroup/share_qq_01.png"/>
							<img src="../../../assets/img/eventGroup/share_qq_11.png"/>
						</a>
						<a @click='wb'>
							<img src="../../../assets/img/eventGroup/share_weibo_02.png"/>
							<img src="../../../assets/img/eventGroup/share_weibo_22.png"/>
						</a>
						<a class="weixin">
							<img src="../../../assets/img/eventGroup/share_weixin_03.png"/>
							<img src="../../../assets/img/eventGroup/share_weixin_33.png"/>
							<i><img :src="weixinShare"/></i>
						</a>
						<a @click='kj'>
							<img src="../../../assets/img/eventGroup/share_kongjian_04.png"/>
							<img src="../../../assets/img/eventGroup/share_kongjian_44.png"/>
						</a>
					</p>
				</div>
				<p class="activityD_main_eventG">当前活动共<i>{{detail.groupNum}}</i>个题材组</p>
			</div>		
		</div>
		<div class="activityD_text">
			<div class="eventGroup_center_balance" v-show='moneyType==0 && len>1?true:false'>
				<span>账户盈亏:</span>
				<p class="eventG_num" v-if="isShowBalance">
					<span><i>{{profit.toFixed(2)}}</i><img title="“无限豆”是未来无限网用于话题交易的专属货币，可以通过充值、任务、签到或平台赠送等方式获得" src="../../../assets/img/eventGroup/event_wuxian.png"/></span>
				</p>
				<i class="eventG_eye" v-else @click="showBalance"><img src="../../../assets/img/eventGroup/yanjing.png"/></i>
			</div>
			<div class="eventGroup_center_balance" v-show='moneyType==1 && len>1?true:false'>
				<span>账户盈亏:</span>
				<p class="eventG_num" v-if="isShowBalance">
					<span><i>{{profit.toFixed(2)}}</i><img title="“未来豆”是未来无限网用于话题交易的专属货币，可以通过充值、任务、签到或平台赠送等方式获得" src="../../../assets/img/eventGroup/event_weilai.png"/></span>
				</p>
				<i class="eventG_eye" v-else @click="showBalance"><img src="../../../assets/img/eventGroup/yanjing.png"/></i>
			</div>
			<div class="activityD_rank" v-if="detail.showRang">
				<span>我的排行：</span>
				<i>{{detail.rangNum}}名</i>
				<router-link :to="'/activity/' + detail.avtiveId + '/rank'" tag="a"><span @click='lookLok' id='title'>查看活动排行&gt;</span></router-link>
				<!-- <span @click='lookLok' id='title'>查看活动排行&gt;</span> -->
			</div>
		</div>
		<div class="activityD_main_head" @click="piClick && titlee()" ref='height'>
			<img :src="detail.imgUrlPc"/>
		</div>
		
		<router-view :detail="detail" :len="len"></router-view>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
		<Aalert :text='alertText' v-show='alert' @vshow='vshow'/>
		<confirm  :ticket='confirm.ticket' :ticketType='confirm.ticketType' :titleeDate='titleeDate' v-show='confirm.confirm' @vClose='vClose'/>
		<confirmNoPay class='confirmNoPay'/>
	</div>
</template>

<script>
	import confirm from './activityDetail/confirmModal'
	import confirmNoPay from './activityDetail/confirmNoPay'
	import Aalert from '../../common/alert'
	import Login from '../../common/Login'
	export default {
		components: {
	    	Aalert,
	    	Login,
	    	confirm,
	    	confirmNoPay,
	  	},
		data() {
			return {
				profit:null,
				isShowBalance: false,
				moneyType:null,
				alert:false,
				alertText:null,
				isAttent: '',
				Attent:false,
        		isShowLoginModal: false,
        		piClick:false,
        		detail: [],
        		len:0,
        		confirm:{
        			confirm:false,
        			ticket:null,
        			ticketType:null,
        		},
        		titleeDate:{
        			titleId:null,
        			groupPurchaseType:null,
        			groupEventType:null
        		},
        		follow:{
					add:true,
        			yet:false
        		},
        		share:{
					url: 'www.ifuturex.com',
					title:null,
					img:null,
        		},
        		weixinShare:this.$base_url+'/activity/v1/activity/shareAct/' + this.$route.params.id
			}
		},
		created () {
			setTimeout(()=>{
				this.activityDetail();
			},50)
	  	},
	  	methods: {
	  		lookLok(){
	  			let h=this.$refs.height.clientHeight+237;
	  			window.scroll(0,h);
	  			setTimeout(()=>{
	  				let h=this.$refs.height.clientHeight+237;
	  				window.scroll(0,h);
	  			},10)
	  		},
	  		//点击盈亏判断是否登录
	  		showBalance() {
	  			if(this.$store.state.refreshToken==''){
	  				this.isShowLoginModal=true;
	  				return false
	  			}else{
	  				this.showUserAccount();
	  				
	  			}
	  		},
	  		//账户盈亏展示==>未来豆 and 无限豆
	  		showUserAccount(){
	  			this.$CPOST('/activity/v1/activity/showUserAccount', {
		    		activityId: this.$route.params.id
		    	},(res)=>{
	  				this.moneyType=res.resultValue.moneyType;
	  				this.profit=res.resultValue.profit;
	  				this.isShowBalance = true;
	  			})
	  		},
	  		vClose(){
	  			this.confirm.confirm=false;
	  		},
	  		vshow(){
				this.alert=false;
			},
	  		titlee(){
	  			if(this.$store.state.refreshToken==''){
	  				this.isShowLoginModal=true;
	  				return false
	  			}
	  			this.titleeDate.titleId=this.detail.groups[0].groupId;
	  			this.titleeDate.groupPurchaseType=this.detail.groups[0].groupPurchaseType;
	  			this.titleeDate.groupEventType=this.detail.groups[0].groupEventType;
	  			this.$CPOST('/activity/v1/activity/showActMsg',{
		    		activityId: this.$route.params.id
		    	},(res) => {
		    		this.confirm.ticket=res.resultValue.ticket;
		    		if(res.resultValue.ticketType==0){
		    			this.confirm.ticketType='金豆';
		    		}else{
		    			this.confirm.ticketType='未来豆';
		    		}
		    		if(res.resultValue.activityStatus!=0){
		    			if(res.resultValue.join==true){//是否已参加
		    				if(this.titleeDate.groupEventType==0 && this.titleeDate.groupPurchaseType==1){//跳申购
		    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId});
		    				}else{
		    					this.$router.push({path:'/group/'+this.titleeDate.titleId});
		    				}
		    			}else{
		    				this.alert=true;
							this.alertText='活动已结束';
		    			}
		    		}else if(res.resultValue.activityStatus==2){
		    			if(res.resultValue.join==true){//是否已参加
		    				if(this.titleeDate.groupEventType==0 && this.titleeDate.groupPurchaseType==1){//跳申购
		    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId});
		    				}else{
		    					this.$router.push({path:'/group/'+this.titleeDate.titleId});
		    				}
		    			}else{
		    				this.alert=true;
							this.alertText='活动已暂停';
		    			}
		    		}else{
		    			if(res.resultValue.join==true){
		    				if(this.titleeDate.groupEventType==0 && this.titleeDate.groupPurchaseType==1){
		    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId});
		    				}else{
		    					this.$router.push({path:'/group/'+this.titleeDate.titleId});
		    				}
		    			}else{
		    				if(res.resultValue.free!=0){//付费
		    					this.confirm.confirm=true;
		    				}else{
		    					this.$CPOST('/activity/v1/activity/app/recordUserJoin',{//新版活动免费/v1/activity/app/recordUserJoin
									activityId:this.$route.params.id
								},(res)=>{
		    						this.alert=true;
									this.alertText='恭喜您成功参加该活动';
		    					})
		    				}
		    			}
		    				
		    		}
		    	})
	  		},
	  		//关闭登录弹框
	  		hideLoginModal() {
	  			this.isShowLoginModal = false;
	  		},
	  		qq(){
	  			window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + this.share.url + '&title=' + this.share.title + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！&pics=' + this.share.img)
	  		},
	  		wb(){
	  			window.open('http://service.weibo.com/share/share.php?url=' + this.share.url + '&title=' + this.share.title + '   玩预测 享快乐！让预测更有价值，让豪礼只属于你！' + '&ralateUid=5517272291&appkey=134613650&searchPic=true&pic=' + this.share.img)
	  		},
	  		kj(){
	  			window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.share.url + '&title=' + this.share.title + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！&summary=&site=&pics=' + this.share.img)
	  		},
	  		//获取图片以下部分
		    activityDetail () {
		    	this.$CPOST('/activity/v1/activity/showActMsg', {
		    		activityId: this.$route.params.id
		    	},(res) => {
		    		console.log(res)
		    		this.detail = res.resultValue;
		    		console.log(this.detail.showRang)
		    		this.share.title=res.resultValue.allName;
					this.share.img=res.resultValue.imgUrlPc;
					this.len=this.detail.groups.length;
					if(this.detail.groups.length==1){
						this.piClick=true;
					}
					if(this.$store.state.refreshToken!=''){
						this.isAttention();
					}
					
		    	})
		    },
		    //是否关注
		    isAttention () {
		    	this.$CPOST('/account/v1/userAttention/queryIsUserAttention', {
		    		attentionEventType: 2,
		    		attentionType: 2,
		    		attentionTypeId: this.$route.params.id
		    	},(res) => {
					if(res.resultValue==false){
	                  this.follow.add=true;
	                  this.follow.yet=false;
	                }else{
	                  this.follow.add=false;
	                  this.follow.yet=true;
	                }
		    	})
		    },
		    //点击关注
		    attention () {
				if(this.$store.state.refreshToken=='') {
					this.isShowLoginModal = true;
				}else{
					this.follow.add=false;
        			this.follow.yet=true;
					this.$CPOST('/account/v1/userAttention/addUserAttention', {
			    		attentionEventType: 2,
			    		attentionType: 2,
			    		attentionTypeId: this.$route.params.id
			    	},(res) => {
			    		this.isAttent = false;
			    		if(res.resultMessages=="SUCCESS"){
			    			this.isAttent=false;
			    			this.Attent=true;
			    		}
			    	})
				}
		    }
		}
	}
</script>

<style scoped>
.activityD_main{
	width: 1200px;
	margin: auto;
	margin-bottom: 50px;
}
.activityD_main_head{
	width: 1200px;
	position: relative;
}
.activityD_main_head>img{
	width: 100%;
}
.activityD_main_head_time{
	width: 217px;
	height: 45px;
	position: absolute;
	padding-left: 18px;
	right: 9px;
	top: 0;
}
.activityD_main_head_time>p:nth-child(1){
	color: #ce9b45;
	font-size: 14px;
}
.activityD_main_head_time>p:nth-child(2){
	color: #ffd71b;
	font-size: 18px;
}
.activityD_mes{
	width: 100%;
	height: 56px;
	margin-top: 20px;
}
.activityD_mes_left{
	float: left;
}
.activityD_mes_head{
	height: 22px;
	line-height: 22px;
	font-size: 18px;
	color: #676767;
	border-left: 3px solid #ce9b45;
	padding-left: 5px;
}
.eventDetail_head_label{
	height: 24px;
	margin-top: 11px;
}
.eventDetail_head_label>li{
	height: 100%;
	line-height: 24px;
	font-size: 14px;
	color: #a4a4a4;
	float: left;
	margin-right: 6px;
}
.eventDetail_head_label>li>span{
	margin-left: 6px;
    vertical-align: middle;
}
.eventDetail_head_label>li>span>img{
	vertical-align: top;
	cursor: pointer;
}
.eventDetail_head_label>li>i{
	font-size: 10px;
    height: 12px;
    line-height: 12px;
    display: inline-block;
}
.eventDetail_head_label>li.eventGroup_center_huodong{
	width: 48px;
	color: #fff;
	text-align: center;
	background: url(../../../assets/img/active/activity_bg.png) no-repeat center;
}
.eventDetail_head_label>li.eventGroup_center_huodong>span{
	margin-left: 0;
}
.activityD_text{
	height: 26px;
	margin-top: 10px;
}
.eventGroup_center_balance{
	height: 26px;
	line-height: 26px;
	float: left;
}
.eventGroup_center_balance>span{
	color: #a4a4a4;
	font-size: 14px;
}
.eventGroup_center_balance>i{
	display: inline-block;
	vertical-align: middle;
	cursor: pointer;
}
.eventGroup_center_balance>p{
	display: inline-block;
	vertical-align: middle;
}
.eventGroup_center_balance>p>span>i{
	color: #323232;
	font-size: 22px;
}
.eventGroup_center_balance>p>span>img{
	margin-left: 3px;
}
.eventGroup_center_balance>p>button{
	width: 72px;
	height: 26px;
	background: #fff;
	border: 1px solid #dfdfdf;
	color: #c71220;
	font-size: 12px;
	cursor: pointer;
	margin-left: 5px;
    vertical-align: top;
}
.eventGroup_center_balance>p>button>img{
	vertical-align: text-top;
	margin-right: 5px;
}
.activityD_rank{
	height: 26px;
	float: left;
	line-height: 15px;
	margin-left: 56px;
}
.activityD_rank>span{
	font-size: 14px;
	color: #676767;
}
.activityD_rank>i{
	font-size: 22px;
	color: #323232;
}
.activityD_rank>a{
	font-size: 14px;
	color: #888888;
	margin-left: 5px;
}
.activityD_mes_right{
	float: right;
}
.eventGroup_center_share{
	height: 14px;
	line-height: 14px;
	margin-top: 10px;
}
.eventG_center_attention{
	height: 100%;
	padding: 0 8px;
	font-size: 12px;
	border-right: 1px solid #e6e6e6;
	cursor: pointer;
	color: #a4a4a4;
}
.eventG_center_add{
	color: #e83c49;
}
.eventG_share{
	display: inline-block;
	color: #a4a4a4;
	font-size: 12px;
	margin-left: 5px;
    vertical-align: bottom;
}
.eventG_share>a>img,.eventG_share>span{
	vertical-align: middle;
}
.eventG_share>a>img{
	cursor: pointer;
    margin: 1px;
}
.eventG_share>a>img+img{
	display: none;
}
.eventG_share>a:hover>img{
	display: none;
}
.eventG_share>a:hover>img+img{
	display: inline;
}
.activityD_main_eventG{
	color: #a4a4a4;
	font-size: 14px;
	margin-top: 22px;
	text-align: right;
}
.activityD_main_eventG>i{
	color: #323232;
	font-weight: bold;
}
.confirmNoPay{
	display: none;
}
.weixin {
	position: relative;
}

.weixin>i {
	position: absolute;
	top: 18px;
	left: -40px;
	width: 120px;
	height: 120px;
	z-index: 57;
	display: none;
}

.weixin>i>img {
	width: 100%;
	height: 100%;
}

.weixin:hover.weixin>i {
	display: block;
}
</style>
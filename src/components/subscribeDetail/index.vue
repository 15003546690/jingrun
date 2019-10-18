<template>
<div>
	<div class="eventDetail">
			<div class="eventDetail_top">
				<!-- 题材组头部信息开始 -->
				<div class="eventGroup_head">
					<h2 class="head_title">
						{{pachet.eventName}}
						<box :eventGroup="eventGroup" :eventBox="eventBox"></box>
					</h2>
					<div class="group_key">
						<ul class="clearfix">
							<li class="shengou">申购</li>
							<li v-for="item in tities">
			                    {{item}}
							</li>
						</ul>
					</div>
					<div class="group_time displayFlex">
						<div>开始时间：{{formatDate(pachet.eventStartTime)}}</div>
						<div>结束时间：{{formatDate(pachet.eventEndTime)}}</div>
						<div class="share_box displayFlex flexMidle">
							<!-- <div class="attention_box">
								<a href="javascript:;" v-if="!add" @click="attention()">关注</a>
								<span v-if="add">已关注</span>
							</div> -->
							<div>分享至：</div>
							<div class="share_ico displayFlex">
								<a href="javascript:;" class="qq" @click="qq"></a>
								<a href="javascript:;" class="weibo" @click="wb"></a>
								<a href="javascript:;" class="weixin"><i><img :src="weixinShare" /></i></a>
								<a href="javascript:;" class="qzone" @click="kj"></a>
							</div>
						</div>
					</div>
				</div>
				<!-- 题材组头部信息结束 -->
				<!--下单位置-->
				<div class="eventDetail_order displayFlex flexMidle">
						<div class="eventDetail_order_text">
							<p class="eventGroup_center_detail_img">
								<img v-lazy="pachet.eventImgpath"/>
							</p>
						</div>
					<div class="eventDetail_order_right flex1">
						<p>
							交易货币:<img :title="this.$store.state.wuxianTitle" src="../../assets/img/eventGroup/event_wuxian.png"/>
						</p>
						<a href="javascript:;" class="shengouBuy" v-if="pachet.eventStatus == 0" @click="gotoTrade">申购</a>
						<a href="javascript:;" class="shengouBuy disbeld" v-if="pachet.eventStatus > 0">申购</a>
						<EventStatus :eventStatus="pachet.eventStatus"></EventStatus>
					</div>
				</div>
			</div>
			<!--tab-->
			<div class="eventGroup_detail">
				<div class="eventGroup_detail_top">
					<ul class="eventGroup_detail_list">
						<li :class="activeTab==0?'eventGroup_detail_active':''" @click="switchTab(0)">详情</li>
						<li :class="activeTab==1?'eventGroup_detail_active':''" @click="switchTab(1)">规则</li>
						<li :class="activeTab==2?'eventGroup_detail_active':''" @click="switchTab(2)">评论</li>
					</ul>
				</div>
				<div class="eventGroup_box">
					<!--详情-->
					<div class="eventGroup_lists" v-show="activeTab==0">
						<div class="eventGroup_details">
							<div class="eventD_text" v-html="eventDetail">
								
							</div>
					</div>
					</div>
					<!--规则-->
					<div class="eventGroup_lists" v-if="activeTab==1">
						<div class="eventGroup_details">
							<pre>{{ruleData}}</pre>
						</div>
					</div>
					<!--评论-->
					<div class="eventGroup_lists" v-if="activeTab==2">
						<Comment :objType="0"></Comment>
					</div>
				</div>
			</div>
			<!--detail end-->
			<div class="eventGroup_other" v-if="activeTab==10">
				<div class="eventGroup_other_top">
					<h2>{{eventGroup.groupName}}</h2>
					<router-link tag="a" :to="/subscribe/+'?id=' +eventGroup.groupId" class="group_back">返回话题列表</router-link>
				</div>
				<div class="eventGroup_new">
					<div class="eventGroup_lists_top">
						<p class="eventGroup_lists_top_p1">题材名称</p>
						<p class="eventGroup_lists_top_p2">申购价格</p>
						<p class="eventGroup_lists_top_p3">已购总数</p>
					</div>
					<ul class="eventGroup_lists_bottom">
						<li v-for="(item,index) in grouplist">
							<router-link tag="div" :to="{path:'/subscribeDetail/' + item.eventId, query: {type:item.eventType}}" class="eventGroup_lists_left"><!--+ grouplist.eventId-->
								<span><img v-lazy="item.eventImgpath"/></span>
								<p>{{ item.eventShort }}</p>
							</router-link>
							<div class="eventGroup_lists_center">{{item.groupevent}}</div>
							<div class="eventGroup_lists_right">{{item.eventTradeSum | comdify}}</div>
					  </li>
					</ul>
				</div>
				<router-link tag="a" :to="/subscribe/+'?id=' +eventGroup.groupId" class="group_more">查看更多</router-link>
			</div>
			</div>
			<div class="announcement cement conmit" v-show="showindexID">
				<div class="report">
					<div class="report_main">
						<div class="To_report">
							<div class="To_report_title">
								<span>提示</span>
								<a class="conmit_img">
									<img  @click="hideindex" src="../../assets/img/eventGroup/event_close.png">
								</a>
							</div>
							<div class="conmit_body">
								<div class="confirm_text_box">
									<p id="Text">{{message}}</p>
								</div>
								<div class="success" v-show="isSHow">
									<router-link tag="button" to="/personal/orders">查看订单</router-link>
									<button @click="jixu">继续下单</button>
								</div>
							</div>
						</div>
					</div>
				</div>	
			</div>
			<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
			<Aalert :text='alertText' v-if='alert' @yes="yes"></Aalert>
		</div>
</template>
<script>
	import Login from '../common/Login'
	import Aalert from '../common/alert'
	import Comment from '../common/comment'
	import box from '../common/box'
	import EventStatus from '../common/eventStatus'
	export default {
		data() {
				return {
					accountcurrency:0,//账户余额
					pachet:{},
					eventGroup:{},
					activeTab:0,//详情TAB切换
					eventDetail:'',//题材详情
					ruleData:'',//题材规则
					details:'',
					share:{
						img:'',//分享图片
						url:'',//分享地址
						title:''//分享标题
					},
					eventBox:{},//红包
					tities:[],
					dateCurrent:'',
					currentPage:1,
					totalPage:0,
					comment:{
						groupcomment:[],//评论列表
						commentCount:0,//评论数量
						commentContent:'',//评论内容
						tolist:[],//回复评论
						flag:true,

					},
					isShowLoginModal:false,//登录显示隐藏
					alert:false,
					alertText:'',
					yesType:'',
					showindexID:false,//下单弹窗
					isSHow:false,//下单是否成功
					message:'',//下单提示
					counter:'',//购买分数
					add:false,//分享显示
					isBox:false,//宝箱
					weixinShare:this.$base_url+'/event/v1/eventGroup/userInvitationEventPc/' + this.$route.params.id + '/' + 1,
					grouplist:[{"eventId":"4097","groupId":"1301","eventName":"特朗普将在12月访华","eventShort":"12月","eventType":1,"eventCleaned":1,"eventPurchaseType":2,"eventStatus":2,"eventRecommend":0,"eventTradeSum":0,"eventStartTime":1502251200000,"eventEndTime":1514782800000,"eventLiquidationPrice":"0.00","eventInitialPrice":"25.00","eventAnnexUrl":"","eventImgpath":"https://www.kinrank.com/image/event/sever-1502241149013-460.png","eventQsTime":1508207792000,"isComment":0,"eventCurrentPrice":{"eventId":"4097","currentPrice":"21.50","lastPrice":"18.80","updown":0,"scope":"2.70"}}],
					orderAwait:[
						{
							orderId:"148034125966692352",
							eventName:"赖清德会在2017年内重启核一反应堆吗？",
							eventId:"3393",
							currency:1,
							currentPrice:"23.10",
							upOrDown:1,
							range:"0.47",
							tradeType:1,
							placeQuantity:1,
							remainQuantity:1,
							placePrice:"100.00",
							delegateType:0,
							createTime:1513223685000
						}
					],
					noData:false,
					isShow: false,
					orderId: '',
				}
			},
			components: {
				Login,
				Aalert,
				Comment,
				box,
				EventStatus
			},
			filters:{
				decimal:function(val){
	                if(val.toFixed){
					    return val.toFixed(2)
					} else {
					    return val
					}
	           	},
				 comfy(c) { 
				 	let re = /\d{1,3}(?=(\d{3})+$)/g; 
				 	let n1 = String(c).replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { 
				 	return s1.replace(re, "$&,") + s2; 
				 	}); 
				 	return n1; 
				 } ,
				data:function (input) {
	             var d = new Date(input);
	             var year = d.getFullYear();
	             var month = d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1: ''+d.getMonth() + 1;
	             var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
	             var hour = d.getHours() <10 ? '0' + d.getHours() :''+d.getHours();
	             var minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
	             var seconds = d.getSeconds() <10 ? '0' + d.getSeconds() : '' + d.getSeconds();
	             return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	         	},
	         	formatDate (timestamp) {
					return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
				 },
				days:function(input){
					var d = new Date(input);
					var year = d.getFullYear();
					var month = d.getMonth() + 1;
					var day = d.getDate() <10 ? + d.getDate() : '' + d.getDate();
					var hour = d.getHours();
					var minutes = d.getMinutes();
					var seconds = d.getSeconds();
					return  day;
				},
			},
			created() {
				this.$Bury(window.location.href,this.$route.params.id,3,'shengouxiangqingye_03035');
				this.getEvent();
				this.getdetail();//详情
				this.isAttention();//关注
			},
			methods: {
			formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
		    },
			    //切换详情TAB
			switchTab(index) {
				this.activeTab = index;
				switch(index){
					case 0:
					this.$Bury(window.location.href,this.$route.params.id,3,'shengouxiangqing_04025');
					this.getdetail();//获取详情
					break;
					case 1:
					this.$Bury(window.location.href,this.$route.params.id,3,'shengouguize_04026');
					this.detailevent();//获取规则
					break;
					case 2:
					this.$Bury(window.location.href,this.$route.params.id,3,'shengoupinglun_04027');
					this.detailevent();//获取规则
					break;
				}
			},
				//QQ 微信 微博 分享
			qq() {
				this.$Bury(window.location.href,this.$route.params.id,3,'shengou_qq');
				window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(encodeURI(this.urladd)) + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！')
			},
			wb() {
				this.$Bury(window.location.href,this.$route.params.id,3,'shengou_weibo');
				window.open('http://service.weibo.com/share/share.php?url=' + this.urladd + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！' )
			},
			kj() {
				this.$Bury(window.location.href,this.$route.params.id,3,'shengou_qzone');
				window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.urladd +  '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！')
			},
			attention(){
		      	
		        this.$CPOST('/account/v1/userAttention/addUserAttention', {
		              /*attentionEventType: this.$route.query.type,*/
		              attentionEventType:0,
		              attentionType: 0,
		              attentionTypeId: this.$route.params.id,
		          }, (res) => {
		            this.add=true;
		          })
		      },
			alertDailog(txt){
				this.alert = true;
				$('.confirm_modal').show();
				this.alertText=txt;
			},
			gotoTrade(){
				if(this.$store.state.refreshToken == ''){
					this.isShowLoginModal = true;
				}else{
					this.$router.push({path:'/subscribeTrade/'+this.$route.params.id})
				}
			},
			//详情
			getEvent() {
				this.$CPOST('/event/v1/eventInformation/queryEventInformation', {
						 eventId: this.$route.params.id
					}, (res) => {
						this.pachet = res.resultValue.eventInformationEntity;
						this.eventGroup = res.resultValue.eventGroup;
						this.eventBox = res.resultValue.groupBoxData;
						this.eventid=res.resultValue.eventInformationEntity.eventId;
						this.tities=res.resultValue.eventTagEntities;
						this.details = res.resultValue.eventInformationEntity.eventDetailDataResponse;
				     	if(this.eventGroup.shared == true)
								this.optentyue();
							else {
								this.Eventyue();
							}
				     	this.urladd = res.resultValue.shareConstant.url;
				     	if(this.pachet.eventStatus === 4) {
							this.dateCurrent = '距开始' + res.resultValue.dateCurrent
						} else if(this.pachet.eventStatus === 0 || this.pachet.eventStatus === 1) {
							if(res.resultValue.dateCurrent == "超过30天") {
								this.dateCurrent = '结束时间' + this.formatDate(this.eventGroup.groupEndTime);
							} else {
								this.dateCurrent = '距结束' + res.resultValue.dateCurrent;
							}
						} else if(this.pachet.eventStatus === 2) {
							this.dateCurrent = '已清算'
						} else {
							this.dateCurrent = '待清算';
						}
					})
				},
				//独立余额
			    Eventyue() {
					this.$CPOST('/event/v1/eventUniqueUser/queryEventUniqueUser', {
						groupId: this.eventGroup.groupId
					}, (res) => {
						this.accountcurrency = res.resultValue.eventUniqueUserEntity.uniqueBalance
					})
				},
				//公开余额
			   optentyue() {
					this.$CPOST('/account/v1/userAccount/queryUserAccount', {
						userId: 10
					},(res) => {
						this.accountcurrency = res.resultValue.userAccountEntity.currency
					})
				},

         	//下单
				saveOrder() {
					if(this.$store.state.refreshToken == ''){
						this.$router.push('/login');
					}
					var reg =  /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
					if(!reg.test(this.counter)){
						this.alertDailog('请输数字');
						return false;
					}
					if(parseInt(this.counter) <= 0){
						this.alertDailog('请输入大于0的数字');
						return false;
					}
					this.$CPOST('/order/v1/order/saveOrder',{
						delegateType: this.delegateType,
						eventId: this.eventid,
						expireSycned: "1",
						groupId: this.eventGroup.groupId,
						placePrice: this.eventGroup.groupPValue,
						placeQuantity: this.counter,
						tradeType: '1'
					},(res) => {
						this.message = res.resultMessages;
						var showText=document.getElementById('Text')
						if(res.resultMessages=='SUCCESS'){
							this.alertDailog('下单成功');
						}else{
							this.alertDailog(res.resultMessages);
						}
					})
				},
			//详情中的详情
			getdetail(){
				this.$CPOST('/event/v1/eventInformation/queryEventInformationData', {
						 eventId:this.$route.params.id
					}, (res) => {
                        this.eventDetail = res.resultValue.eventDetails
					})
				},
		    //规则
			detailevent() {
				var configKey = 'event_sg'
				this.$CPOST('/share/v1/shareConfig/queryShareConfig', {
						configKey: configKey
					}, (res) => {
						this.ruleData = res.resultValue.configEntity.configValue
				})
			},
			jixu(){
				this.showindexID = false;
				this.getEvent();
			},
			isAttention () {
		    	this.$CPOST('/account/v1/userAttention/queryIsUserAttention', {
		    		attentionEventType: 0,
		    		attentionType: 0,
		    		attentionTypeId: this.$route.params.id
		    	},(res) => {
					this.add = res.resultValue;
		    	})
		    },
		    hideindex() {
				this.showindexID=false;
				this.isSHow=false;
		   }
		}
	}
</script>
<style scoped>

.eventDetail{
	width: 1200px;
	margin: auto;
	margin-top: 20px;
}
.eventDetail_top{
}	
.eventGroup_head{border:solid 1px #d5d5d5; border-width:1px 0; padding:14px 0;}
.eventGroup_head h2.head_title{font-size: 24px; color: #323232; font-weight: bold; line-height: 24px; margin-bottom: 10px;}
.eventGroup_head h2.head_title span{display: inline-block; vertical-align: middle; margin-left: 15px; width: 36px;}
.eventGroup_head h2.head_title span img,.share_box .share_ico a.weixin i img{width: 100%;}
.eventGroup_head .group_key{margin-bottom:10px;}
.eventGroup_head .group_key li{line-height: 24px; border:solid 1px #e5e5e5; display: inline-block; padding:0 8px; color: #343434; float:left; margin-right: 10px;}
.eventGroup_head .group_key li.yuce{background: #e83c49; border-color: #e83c49; color: #fff;}
.eventGroup_head .group_key li.pingjian{background: #4867aa; border-color: #4867aa; color: #fff;}
.eventGroup_head .group_key li.shengou{background: #ffac53; border-color: #ffac53; color: #fff;}
.eventGroup_head .group_time{color: #676767; position: relative;}
.eventGroup_head .group_time>div{margin-right: 35px;}
.eventGroup_head .group_time .price{color: #323232;}
.eventGroup_head .group_time .share_box{position: absolute;right: 0; top:0; font-size: 12px; margin-right: 0;}
.share_box .attention_box{border-right:solid 1px #e6e6e6; padding-right: 10px; margin-right: 10px;}
.share_box .attention_box a{color:#e83c49; display: inline-block; background: url(../../assets/img/eventGroup/event_add.png) no-repeat left center; padding-left: 14px;}
.share_box .share_ico a{display: block; width:14px; height: 14px; margin-right: 6px;}
.share_box .share_ico a.qq{background: url(../../assets/img/eventgroup/share_qq_01.png) no-repeat;}
.share_box .share_ico a.qq:hover{background-image: url(../../assets/img/eventgroup/share_qq_11.png);}
.share_box .share_ico a.weibo{background: url(../../assets/img/eventgroup/share_weibo_02.png) no-repeat;}
.share_box .share_ico a.weibo:hover{background-image: url(../../assets/img/eventgroup/share_weibo_22.png);}
.share_box .share_ico a.weixin{background: url(../../assets/img/eventgroup/share_weixin_03.png) no-repeat; position: relative;}
.share_box .share_ico a.weixin i{display: none; position: absolute; top: 18px;left: -40px;
		width: 120px;}
.share_box .share_ico a.weixin:hover{background-image: url(../../assets/img/eventgroup/share_weixin_33.png);}
.share_box .share_ico a.weixin:hover i{display: block;}
.share_box .share_ico a.qzone{background: url(../../assets/img/eventgroup/share_kongjian_04.png) no-repeat;}
.share_box .share_ico a.qzone:hover{background-image: url(../../assets/img/eventgroup/share_kongjian_44.png);}


.eventDetail{
	width: 1200px;
	margin: auto;
	margin-top: 29px;
}

.eventDetail_top_head{
	width: 100%;
	height: 57px;
}
.eventDetail_head_left{
	float: left;
}
.eventDetail_head_left_text{
	height: 33px;
	line-height: 33px;
	color: #323232;
	font-size: 24px;
}
.eventDetail_head_left_text>i{
	vertical-align: middle;
}
.eventD_box{
	height: 19px;
	margin-top: 5px;
}
.eventDetail_head_label{
	height: 19px;
	float: left;
}
.eventDetail_head_label>li{
	height: 100%;
	line-height: 19px;
	font-size: 12px;
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
.eventDetail_head_label>li.eventGroup_center_shengou{
	color: #fff;
	background: #ffb25f;
	padding-right: 4px;
}
.eventDetail_head_label>li.eventGroup_center_yuce{
	color: #fff;
	background: #e83c49;
	padding-right: 4px;
}
.eventDetail_head_label>li.eventGroup_center_pingjian{
	color: #fff;
	background: #4867aa;
	padding-right: 4px;
}


/***下单***/

.eventDetail_order{
	border-bottom:solid 1px #d5d5d5;
}
.eventDetail_order_left{
	margin-top: 11px;
	padding-bottom: 11px;
	margin-right: 30px;
	width: 208px;
	height: 130px;
}
.eventDetail_order_left>img{
		width: 100%;
		height: 100%;
	}
.eventDetail_order_right{position: relative;}
.eventDetail_order_right>p{color: #676767; font-size: 14px; vertical-align: middle; margin-bottom: 15px;}
.eventDetail_order_right>p>img{vertical-align: middle;margin-left: 10px;}
.eventDetail_order_right .shengouBuy{display: block; width: 98px; height: 32px; line-height: 32px; border-radius: 3px; color: #fff; font-size: 16px; text-align: center; background: #f52f3e;}
.eventDetail_order_right .shengouBuy:hover{background: #c60c1b;}
.eventDetail_order_right .shengouBuy.disbeld,.eventDetail_order_right .shengouBuy.disbeld:hover{background: #d5d5d5;}
.eventD_position{
	width: 100%;
	height: 38px;
	margin-top: 6px;
}
.eventD_position>li{
	width: 114px;
	height: 100%;
	padding-left: 44px;
	border-right: 1px solid #e8e8e8;
	float: left;
}

.applyEventD_rule{
	height: 26px;
	line-height: 26px;
	font-size: 14px;
	margin-left: 20px;
}
.applyEventD_rule>i{
	color: #676767;
}
.applyEventD_rule>span{
	color: #323232;
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
}
.eventG_center_add{
	color: #e83c49;
}
.eventG_center_yet{
	color: #a4a4a4;
}
.eventG_center_yet>img{
	display: none;
}
.eventG_share {
		display: inline-block;
		color: #a4a4a4;
		font-size: 12px;
		margin-left: 5px;
		vertical-align: bottom;
	}
	
	.eventG_share>span>img,
	.eventG_share>span {
		vertical-align: middle;
	}
	
	.eventG_share>span>img {
		cursor: pointer;
		margin: 1px;
	}
	
	.eventG_share>span>img+img {
		display: none;
	}
	
	.eventG_share>span:hover>img {
		display: none;
	}
	
	.eventG_share>span:hover>img+img {
		display: inline;
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

.eventDetail_order{
	height: 171px;
}
.eventDetail_order_left{
	height: 160px;
	margin-top: 11px;
	float: left;
}
.eventDetail_order_text{
	height: 130px;
}
.eventGroup_center_detail_img{
	width: 208px;
	height: 130px;
    display: inline-block;
    margin-right: 15px;
}
.eventGroup_center_detail_img>img{
	width: 100%;
	height: 100%;
}
.eventDetail_order_detail{
	display: inline-block;
	vertical-align: top;
}
.eventD_position{
	width: 100%;
	height: 38px;
	margin-top: 6px;
}
.eventD_position>li{
	width: 114px;
	height: 100%;
	padding-left: 44px;
	border-right: 1px solid #e8e8e8;
	float: left;
}
.eventD_position>li.border_none{
	border-right: 0;
}
.eventD_position>li:first-child{
	padding-left: 22px;
}
.eventD_position_num{
	color: #323232;
	font-size: 22px;
	font-weight: bold;
}
.eventD_position_name{
	color: #676767;
	font-size: 14px;
}
.applyEventD_box{
	width: 357px;
	height: 38px;
	margin-top: 24px;
	margin-left: 20px;
}
.applyEventD_num{
	width: 238px;
	height: 36px;
	border: 1px solid #cccccc;
	border-right: 0;
	float: left;
}
.applyEventD_num>input{
	width: 188px;
	padding-left: 10px;
	color: #e52735;
	font-size: 20px;
	height: 36px;
	line-height: 36px;
	border: 0;
	outline: none;
}
.applyEventD_num>i{
	width: 37px;
	display: inline-block;
	text-align: center;
}
.applyEventD_box>button{
	width: 116px;
	height: 38px;
	background: #e52735;
	border: 1px solid #e52735;
	color: #FFFFFF;
	font-size: 16px;
	outline: none;
	cursor: pointer;
}
.applyEventD_box>button.disbled{
	 background:#d5d5d5;border-color:#ccc; color: #666;
}
.applyEventD_rule{
	height: 26px;
	line-height: 26px;
	font-size: 14px;
	margin-left: 20px;
}
.applyEventD_rule>i{
	color: #676767;
}
.applyEventD_rule>span{
	color: #323232;
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
}
.eventG_center_add{
	color: #e83c49;
}
.eventG_center_yet{
	color: #a4a4a4;
}
.eventG_center_yet>img{
	display: none;
}
.eventG_share {
		display: inline-block;
		color: #a4a4a4;
		font-size: 12px;
		margin-left: 5px;
		vertical-align: bottom;
	}
	
	.eventG_share>span>img,
	.eventG_share>span {
		vertical-align: middle;
	}
	
	.eventG_share>span>img {
		cursor: pointer;
		margin: 1px;
	}
	
	.eventG_share>span>img+img {
		display: none;
	}
	
	.eventG_share>span:hover>img {
		display: none;
	}
	
	.eventG_share>span:hover>img+img {
		display: inline;
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

/*tab切换*/
/*详情*/
.eventGroup_detail{width: 100%;margin-top: 30px;margin-bottom: 30px;}
.eventGroup_detail_top{height: 52px;border: 1px solid #e6e6e6;}
.eventGroup_detail_list{height: 50px;float: left;}
.eventGroup_detail_list>li{width: 123px;height: 100%;cursor: pointer;line-height: 50px;text-align: center;color: #323232;font-size: 16px;border-left: 1px solid #fff;border-right: 1px solid #fff;float: left;}
.eventGroup_detail_list>li.eventGroup_detail_active{color: #e52735;border-top: 2px solid #e52735;margin-top: -1px;border-left: 1px solid #e6e6e6;border-right: 1px solid #e6e6e6;}
.eventGroup_lists{border: 1px solid #e6e6e6;border-top: 0;overflow: hidden;}
.eventGroup_details{width: 1079px;margin: auto;margin-bottom: 26px;}
.eventD_text{margin-top: 36px;margin-left: 10px; }
.eventD_text>p{color: #676767;font-size: 14px;line-height: 24px;}
.eventD_text>h4{line-height: 30px;}
.eventD_text>h4>span{color: #323232;font-size: 16px;}
.eventD_text>h4>i{color: #e8e8e8;font-size: 16px;font-weight: 500;margin-left: 5px;}
.eventD_text>p>i{width: 4px;height: 4px;background: #ea525d;display: inline-block;-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;margin-right: 5px;vertical-align: middle;}
.eventD_text>p>a{color: #3282ff;text-decoration: underline;}
/*规则*/
.eventGroup_rule{margin-top: 26px;}
.eventGroup_rule>li{color: #323232;font-size: 14px;line-height: 24px;}
/*弹层*/
.conmit_img{float: right;margin-right: 0 !important;margin-top: 6px;}
.conmit_body{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;}
.success{width: 100%;height: 32px;line-height: 32px;text-align: center;color: #323232;font-size: 14px;}
.success>button{width: 98px;height: 32px;background: url(../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
/***列表***/
.eventGroup_other{}
.eventGroup_other_top{position: relative;}
.eventGroup_other_top h2{color: #333; font-size: 14px; font-weight: bold; margin-bottom: 15px;}
.group_more{display: block; height: 54px; line-height: 54px; text-align: center; color: #999;}
.group_more:hover{color: #c60c1b;}
.group_back{display: inline-block; position: absolute; color: #c60c1b; right: 0; bottom:0;}
	.eventGroup_new{
		border: 1px solid #e6e6e6;
		overflow: hidden;
	}
.eventGroup_lists_top {
		height: 67px;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.eventGroup_lists_top>p {
		height: 100%;
		line-height: 67px;
		text-align: center;
		font-size: 14px;
		color: #676767;
		float: left;
	}
	
	.eventGroup_lists_top_p1 {
		width: 464px;
		margin-right: 50px;
	}
	
	.eventGroup_lists_top_p2 {
		width: 220px;
		
	}
	
	.eventGroup_lists_top_p3 {
		width: 220px;
		margin-left: 50px;
	}
	.eventGroup_lists_top_p4 {
		width: 160px;
		text-align: center;
		margin-left: 32px;
	}
	
	.eventGroup_lists_top_p5 {
		width: 160px;
		text-align: center;
		
	}
	
	.eventGroup_lists_bottom {
		padding: 10px 17px 22px 47px;
	}
	
	.eventGroup_lists_bottom>li {
		height: 60px;
		line-height: 60px;
		font-size: 14px;
		color: #676767;
		clear: both;
	}
	.eventGroup_lists_bottom>li>img{width: 100%;}
	.eventGroup_lists_left{
	width: 464px;
	height: 100%;
	float: left;
}
.eventGroup_lists_left>span{
	width: 94px;
	height: 60px;
	display: inline-block;
    vertical-align: middle;
}
.eventGroup_lists_left>span>img{
	width: 100%;
	height: 100%;
}
.eventGroup_lists_left>p{
	display: inline-block;
	vertical-align: middle;
	margin-left: 5px;
	cursor: pointer;
}
.eventGroup_lists_center,.eventGroup_lists_right{
	width: 220px;
	height: 100%;
	float: left;
	text-align: center;
	color: #323232;
	font-size: 16px;
}
.eventGroup_lists_right{
	margin-left: 52px;
}
/*.eventGroup_lists_center>span,.eventGroup_lists_right>span{
	width: 64px;
	text-align: center;
	display: inline-block;
	color: #323232;
	font-size: 16px;
}*/
.eventGroup_lists_center>p,.eventGroup_lists_right>p{
	font-size: 16px;
	width: 66px;
	display: inline-block;
}
.eventGroup_lists_center>p.eventGroup_num_top,
.eventGroup_lists_right>p.eventGroup_num_top{
	color: #c60c1b;
}
.eventGroup_lists_center>p.eventGroup_num_down,
.eventGroup_lists_right>p.eventGroup_num_down{
	color: #098959;
}
.eventGroup_lists_bottom>li:nth-child(odd){
	background:#f2f2f2;
}
.eventGroup_lists_state,.eventGroup_lists_result{
	height: 60px;
	text-align: center;
    width: 160px;
    float: left;
}
.eventGroup_lists_state{
	margin-left: 34px;
}
.eventGroup_lists_state>img{
	width: 56px;
	height: 56px;
}
.eventGroup_lists_result>img{
	width: 51px;
	height: 51px;
}
</style>
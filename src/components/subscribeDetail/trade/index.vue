<template>
<div>
	<div class="eventDetail">
			<div class="eventDetail_top">
				<!-- 题材组头部信息开始 -->
				<div class="eventGroup_head">
					<h2 class="head_title">
						{{pachet.eventName}}
						<box v-if="redPacket" :eventGroup="eventGroup" :eventBox="eventBox"></box>
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
						<div>开始时间：{{formatDate(eventGroup.groupStartTime)}}</div>
						<div>结束时间：{{formatDate(eventGroup.groupEndTime)}}</div>
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
			</div>
			<!--tab-->
			<div class="eventGroup_detail">
				<div class="eventGroup_box">
					<!--详情-->
					<div class="eventGroup_lists">
						<div class="sg_box">
							<div class="sg_head displayFlex flexCenter">
								<div>交易类型【IPO】</div>
								<div>
									交易货币:
									<img :title="this.$store.state.wuxianTitle" src="../../../assets/img/eventGroup/event_wuxian.png"/>
								</div>
							</div>
							<div class="sg_content">
								<div class="sg_c1">
									<div class="sg_item displayFlex">
										<div class="text">申购价格：</div>
										<div class="text2 flex1">{{eventGroup.groupPValue}}</div>
									</div>
									<div class="sg_item displayFlex">
										<div class="text">申购数量：</div>
										<div class="text2 flex1"><input type="number" v-model="counter"></div>
									</div>
									<div class="sg_item displayFlex">
										<div class="text">最大可申购量：</div>
										<div class="text2 flex1">{{eventGroup.groupNValue}}</div>
									</div>
								</div>
								<div class="sg_c2">
									<div class="sg_item displayFlex">
										<div class="text">持仓数量：</div>
										<div class="text2 flex1">{{details.positionQuantity}}</div>
									</div>
								</div>
								<div>
									<div class="sg_item displayFlex">
										<div class="text">余额：</div>
										<div class="text2 flex1">{{accountcurrency|comfy}}<img :title="this.$store.state.wuxianTitle" src="../../../assets/img/eventGroup/event_wuxian.png"/></div>
									</div>
								</div>
							</div>
						</div>
						<div class="order_btn_box displayFlex flexCenter">
							<a href="javascript:;" class="yes" @click="saveOrder()">确认</a>
							<a href="javascript:;" class="concel" @click="cancel">取消</a>
						</div>
					</div>
				</div>
			</div>
			</div>
			<div v-if="showindexID" class="confirm-main">
				<div class="confirm_box">
					<div class="confirm_main_or">
						<div class="confirm_main_head">
							<p>提示</p>
							<span></span>
						</div>
						<div class="confirm_text">
							<div class="confirm_text_box" id="Text">
								{{message}}
							</div>
						</div>
						<div class="confirm_btn">
							<router-link to="/personal/orders" tag="button">我的订单</router-link>
							<button @click="jixu">继续下单</button>
						</div>
					</div>
				</div>
			</div>
			
			<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
			<Aalert :text='alertText' v-if='alert' @yes="yes"></Aalert>
		</div>
</template>
<script>
	import Login from '../../common/Login'
	import Aalert from '../../common/alert'
	import Comment from '../../common/comment'
	import box from '../../common/box'
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
					redPacket:false,
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
					buyFlag:true
				}
			},
			components: {
				Login,
				Aalert,
				Comment,
				box
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
				this.$Bury(window.location.href,this.$route.params.id,3,'shengoujiaoyi_04028');
				this.getEvent();
				// this.isAttention();//关注
			},
			methods: {
		    cancel(){
				this.$router.push({path:'/subscribeDetail/'+this.$route.params.id})
			},
				//QQ 微信 微博 分享
			qq() {
				window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + this.urladd + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！')
			},
			wb() {
				window.open('http://service.weibo.com/share/share.php?url=' + this.urladd + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！' )
			},
			kj() {
				window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.urladd +  '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！')
			},
			yes(){
				
			},
			attention(){
		      	//alert(this.eventType)
		      	this.add=false;
		        this.$CPOST('/account/v1/userAttention/addUserAttention', {
		              attentionEventType: 0,
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
			formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
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
						this.redPacket=true;

				     	if(this.$store.state.refreshToken != ''){
			            	this.isAttention();
			            	if(this.eventGroup.shared == true)
								this.optentyue()
							else {
								this.Eventyue()
							}
			            }
				     	this.urladd = res.resultValue.shareConstant.url;
				     	if(this.pachet.eventStatus === 4) {
							this.dateCurrent = '距开始' + res.resultValue.dateCurrent
						} else if(this.pachet.eventStatus === 0 || this.pachet.eventStatus === 1) {
							if(res.resultValue.dateCurrent == "超过30天") {
								//console.log(this.formatDate(this.groupEndTime))
								this.dateCurrent = '结束时间' + this.formatDate(this.eventGroup.groupEndTime)
							} else {
								this.dateCurrent = '距结束' + res.resultValue.dateCurrent
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
						this.isShowLoginModal = true;
					}
					var reg =  /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
					if(!reg.test(this.counter)){
						this.alertDailog('请输入正确数量');
						return false;
					}
					if(parseInt(this.counter) <= 0){
						this.alertDailog('请输入大于0的数字');
						return false;
					}
					if(this.buyFlag){
						this.buyFlag = false;
						this.$CPOST('/order/v1/order/saveOrder',{
							delegateType: this.delegateType,
							eventId: this.eventid,
							expireSycned: "1",
							groupId: this.eventGroup.groupId,
							placePrice: this.eventGroup.groupPValue,
							placeQuantity: this.counter,
							tradeType: '1'
						}, (res) => {
							if(res.resultCode==200){
								// this.alertDailog('下单成功');
								this.showindexID = true;
								this.message = "下单成功";
							}else{
								this.alertDailog(res.resultMessages);
							}
	                        // this.showindexID=true
						})
					}

				},

			jixu(){
				this.$Bury(window.location.href,this.$route.params.id,3,'jixuxiadan_05006');
				this.$router.go(0);
			},
			//关注接口
			isAttention () {
		    	this.$CPOST('/account/v1/userAttention/queryIsUserAttention', {
		    		attentionEventType: 0,
		    		attentionType: 0,
		    		attentionTypeId: this.$route.params.id
		    	},(res) => {
					this.add = res.resultValue;
					console.log(this.add)
					// if(res.resultValue==false){
	    //               this.add=true;
	    //             }else{
	    //               this.add=false;
	    //             }
		    	})
		    },
		    hideindex() {
				this.showindexID=false;
				this.isSHow=false;
		   },
		},
		watch:{
			counter(curVal){
				//console.log('curVal=='+curVal+'maxBuyNum=='+this.maxBuyNum)
				if(curVal != ''){
					// var shengyu = Number(this.eventGroup.groupNValue)-Number(this.details.positionQuantity);
					var shengyu = Number(this.eventGroup.groupNValue)
					console.log(shengyu)
					if(Number(curVal)>shengyu){
						this.counter = shengyu;
					}else if(Number(curVal)<0){
						this.counter = 0;
					}else{
						curVal+='';
						var len = curVal.split('.').length;
						if(len > 1){
							this.counter = curVal.split('.')[0];
						}
					}
				}
			}
		}
	}
</script>
<style scoped>
.sg_box{width: 406px; margin: 0 auto; border:solid 1px #d9d9d9; margin-bottom: 20px;}
.sg_box .sg_head{height: 42px; line-height: 42px;border-bottom:solid 1px #d9d9d9; background: #f2f2f2; color: #343434; font-size: 16px;}
.sg_box .sg_head>div{padding:0 10px;}
.sg_box .sg_head>div>img{vertical-align: middle;}
.sg_box .sg_content{width: 370px; margin:0 auto;}
.sg_content .sg_item{margin-bottom: 10px; line-height: 32px;}
.sg_content .sg_item .text{width: 125px; color: #323232; font-size: 16px;padding-left: 20px;}
.sg_content .sg_item .text.yue{width: 60px;}
.sg_content .sg_item .text2{font-size: 18px;}
.sg_content .sg_item .text2 input{width: 80%; height: 30px; border:solid 1px #e6e6e6; padding-left: 10px; font-size: 18px;}
.sg_content .sg_item .text2 img,.success_yu img{vertical-align: middle; margin-left: 5px;}
.sg_content .sg_c1{border-bottom:solid 1px #d9d9d9; padding-top:30px; padding-bottom: 15px;}
.sg_content .sg_c2{border-bottom:solid 1px #d9d9d9; padding-top:15px; padding-bottom: 5px; margin-bottom: 10px;}
.order_btn_box{}
.order_btn_box a{display: block; width: 100px; height: 32px; margin:0 22px; text-align: center; font-size: 14px; border-radius: 3px; line-height: 32px;}
.order_btn_box a.yes{color: #fff;background: -webkit-linear-gradient(#f92927,#d10602);
    background: -moz-linear-gradient(#f92927,#d10602);
    background: linear-gradient(#f92927,#d10602);}
.order_btn_box a.yes:hover{color: #fff;background: -webkit-linear-gradient(#d10602,#f92927);
    background: -moz-linear-gradient(#d10602,#f92927);
    background: linear-gradient(#d10602,#f92927);}
.order_btn_box a.concel{height: 30px; line-height: 30px; color: #323232; border:solid 1px #e3e3e3;}
.order_btn_box a.concel:hover{border-color:#888;}

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
.share_box .attention_box a{color:#e83c49; display: inline-block; background: url(../../../assets/img/eventGroup/event_add.png) no-repeat left center; padding-left: 14px;}
.share_box .share_ico a{display: block; width:14px; height: 14px; margin-right: 6px;}
.share_box .share_ico a.qq{background: url(../../../assets/img/eventgroup/share_qq_01.png) no-repeat;}
.share_box .share_ico a.qq:hover{background-image: url(../../../assets/img/eventgroup/share_qq_11.png);}
.share_box .share_ico a.weibo{background: url(../../../assets/img/eventgroup/share_weibo_02.png) no-repeat;}
.share_box .share_ico a.weibo:hover{background-image: url(../../../assets/img/eventgroup/share_weibo_22.png);}
.share_box .share_ico a.weixin{background: url(../../../assets/img/eventgroup/share_weixin_03.png) no-repeat; position: relative;}
.share_box .share_ico a.weixin i{display: none; position: absolute; top: 18px;left: -40px;
		width: 120px;}
.share_box .share_ico a.weixin:hover{background-image: url(../../../assets/img/eventgroup/share_weixin_33.png);}
.share_box .share_ico a.weixin:hover i{display: block;}
.share_box .share_ico a.qzone{background: url(../../../assets/img/eventgroup/share_kongjian_04.png) no-repeat;}
.share_box .share_ico a.qzone:hover{background-image: url(../../../assets/img/eventgroup/share_kongjian_44.png);}

.confirm_box {
		width: 435px;
	    height: 196px;
	    background: #e6e6e6;
	    position: fixed;
	    left: 50%;
	    top: 50%;
	    margin-left: -267px;
	    margin-top: -98px;
	}
	
	.confirm_main_or {
		/*display: none;*/
	}
	
	.confirm_main,
	.confirm_main_or {
		width: 423px;
		height: 184px;
		background: #fff;
		border: 1px solid #c9c9c9;
		margin: auto;
		margin-top: 5px;
	}
	
	.confirm_main_head {
		width: 100%;
		height: 32px;
	}
	
	.confirm_main_head>p {
		float: left;
		line-height: 32px;
		color: #323232;
		font-size: 14px;
		padding-left: 13px;
	}
	
	.confirm_main_head>span {
		display: block;
		float: right;
		cursor: pointer;
	}
	
	.confirm_text {
		width: 340px;
		height: 85px;
		line-height: 85px;
		text-align: center;
		margin: auto;
	}
	
	.confirm_text_box {
		display: inline-block;
		vertical-align: middle;
	}
	
	.confirm_btn {
		width: 100%;
		height: 32px;
		text-align: center;
		color: #323232;
		font-size: 14px;
	}
	
	.confirm_btn>button {
		width: 98px;
		height: 32px;
		background: #f0080a;
		/*background: url(../../../assets/img/eventGroup/event-btn.png) no-repeat center;*/
		border: 0;
		outline: none;
		color: #fff;
		font-size: 14px;
		cursor: pointer;
	}
	
	.confirm_btn>button:nth-child(1) {
		float: left;
		margin-left: 80px;
	}
	.confirm_btn>button:nth-child(2) {
		float: right;
		margin-right: 80px;
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
.eventDetail_order_right>p{color: #676767; font-size: 14px; vertical-align: middle; margin-bottom: 15px;}
.eventDetail_order_right>p>img{vertical-align: middle;margin-left: 10px;}
.eventDetail_order_right .shengouBuy{display: block; width: 98px; height: 32px; line-height: 32px; border-radius: 3px; color: #fff; font-size: 16px; text-align: center; background: #f52f3e;}
.eventDetail_order_right .shengouBuy:hover{background: #c60c1b;}
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
/*距结束*/
.eventGroup_center_right{
	width: 287px;
	height: 145px;
	border-left: 1px dashed #dfdfdf;
	float: right;
}
.eventGroup_center_time{
    width: 90px;
    height: 90px;
    color: #323232;
    font-size: 12px;
    margin: auto;
    margin-bottom: 10px;
    position: relative;
    	border: 10px solid #eeeeee;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
    /*background: url(/static/img/dongxiao.0bed4b3.gif) no-repeat center;*/
}
.eventGroup_center_main{
	position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
   
}

.eventGroup_center_time_box{
	/*margin-left: 16px;
	margin-top: 13px;*/
	width: 90%;
	height: 73%;
	font-size: 14px !important;
	text-align: center;
	color: #323232;
	margin: 0 auto;
	padding-top: 33px;
   
}
.eventGroup_center_time_box>span{
	display: block;
}
.eventGroup_center_time_box>span>i{
	font-size: 12px;
	color: #a5a5a5;
}
.eventGroup_center_begin{
	height: 22px;
	line-height: 22px;
	text-align: center;
	font-size: 14px;
	color: #a4a4a4;
}
.eventGroup_center_time_box>span>i.eventGroup_center_yet{
	color: #323232;
}
.eventGroup_center_yet{
	color: #323232;
}

/*tab切换*/
/*详情*/
.eventGroup_detail{
	width: 100%;
	margin-top: 30px;
	margin-bottom: 80px;
}

.eventGroup_lists{
	border: 1px solid #e6e6e6;
    overflow: hidden;
    padding-top: 25px;
    padding-bottom: 50px;
}
.eventGroup_details{
	width: 1079px;
	margin: auto;
	margin-bottom: 26px;
}
.eventD_text{
	margin-top: 36px;
	margin-left: 10px; 
}
.eventD_text>p{
	color: #676767;
	font-size: 14px;
	line-height: 24px;
}
.eventD_text>h4{
	line-height: 30px;
}
.eventD_text>h4>span{
	color: #323232;
	font-size: 16px;
}
.eventD_text>h4>i{
	color: #e8e8e8;
	font-size: 16px;
	font-weight: 500;
	margin-left: 5px;
}
.eventD_text>p>i{
	width: 4px;
	height: 4px;
	background: #ea525d;
	display: inline-block;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
	margin-right: 5px;
	vertical-align: middle;
}
.eventD_text>p>a{
	color: #3282ff;
	text-decoration: underline;
}
/*规则*/
.eventGroup_rule{
	margin-top: 26px;
}
.eventGroup_rule>li{
	color: #323232;
	font-size: 14px;
	line-height: 24px;
}

/*弹层*/
.conmit_img{
  float: right;
  margin-right: 0 !important;
  margin-top: 6px;
}
.conmit_body{
	width: 340px;
	height: 85px;
	line-height: 85px;
	text-align: center;
	margin: auto;
}
.confirm_text_box{
	display: inline-block;
	vertical-align: middle;
}
.success{
	width: 100%;
	height: 32px;
	line-height: 32px;
	text-align: center;
	color: #323232;
	font-size: 14px;
}
.success>button{
	width: 98px;
	height: 32px;
	background: url(../../../assets/img/eventGroup/event-btn.png) no-repeat center;
	border: 0;
	outline: none;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}
.confirm-main{
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0,0,0,.8);
	top: 0;
	z-index: 999;
}
</style>
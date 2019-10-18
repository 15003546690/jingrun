<template>
	<div class="eventDetail">
		<!--开始-->
		<div class="eventDetail_top">
			<!-- 题材组头部信息开始 -->
			<div class="eventGroup_head">
				<h2 class="head_title">
					{{eventTop.eventName}}
					<box :eventGroup="eventGroup" :eventBox="eventBox"></box>
				</h2>
				<div class="group_key">
					<ul class="clearfix">
						<li v-if="eventGroup.groupEventType == 1" class="yuce">预测</li>
						<li v-if="eventGroup.groupEventType == 0" class="pingjian">评鉴</li>
						<li v-for="item in tities">
		                    {{item}}
						</li>
					</ul>
				</div>
				<div class="group_time displayFlex">
					<div>开始时间：{{formatDate(eventTop.eventStartTime)}}</div>
					<div>结束时间：{{formatDate(eventTop.eventEndTime)}}</div>
					<div class="price" v-if="btnShow">
						【Yes】最新成交价 {{eventTop.eventCurrentPrice.currentPrice}}
						<i v-if="eventTop.eventCurrentPrice.updown" :class="eventTop.eventCurrentPrice.updown==1?'eventGroup_num_down' :eventTop.eventCurrentPrice.updown==2 ? 'eventGroup_num_top':''">
                        <img v-if="eventTop.eventCurrentPrice.updown==1" src="../../assets/img/index_down.png"/>
		                <img v-if="eventTop.eventCurrentPrice.updown==2" src="../../assets/img/index_top.png"/>
                        {{eventTop.eventCurrentPrice.scope}}
                        </i>
					</div>
					<div class="share_box displayFlex flexMidle" v-if="needShare != 1">
						<div class="attention_box">
							<a href="javascript:;" v-if="add" @click="attention">关注</a>
							<span v-if="!add">已关注</span>
						</div>
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
			<!--下单按钮-->
			<div class="eventDetail_order clearfix" v-if="btnShow">
				<div class="eventDetail_order_left">
					<div class="eventDetail_order_text">
						<p class="eventGroup_center_detail_img">
							<img :src="eventTop.eventImgpath" /></p>
						<div class="eventDetail_order_detail">
							<div class="eventD_order_yes">
								<p class="eventD_order_yes_p1">{{yesPriceTxt}}</p>
								<p class="eventD_order_yes_num">
									<span>{{buyPrice|decimal}}</span>
									<i v-if="updown" :class="updown==1 ? 'eventGroup_num_down' : updown==2 ? 'eventGroup_num_top' : ''">
                                    <img v-if="updown==1" src="../../assets/img/index_down.png"/>
                                    <img v-if="updown==2" src="../../assets/img/index_top.png"/>
                                   {{scope}}
                                 </i>
								</p>
								<div>
									<button id="btnYes1" v-if="buttonType == 1" class="eventD_order_btn eventD_btn_yes" @click="showIndexshow(1)">买入【Yes】</button>
									<button id="btnYes2" v-if="buttonType == 2" class="eventD_order_btn eventD_btn_yes" @click="showIndexshow(1)">买入【Yes】</button>
									<button id="btnYes3" v-if="buttonType == 3" class="eventD_order_btn eventD_btn_no" @click="showIndexshow(3)">买入【No】</button>
									<button id="btnYes4" v-if="buttonType == 4 || buttonType == 5" class="eventD_order_btn eventD_btn_ban">买入【Yes】</button>
									<button id="btnYes4" v-if="buttonType == 6" class="eventD_order_btn eventD_btn_ban">买入【No】</button>
								</div>
							</div>
							<p class="eventD_order_xian"></p>
							<div class="eventD_order_no">
								<p class="eventD_order_yes_p1">{{noPriceTxt}}</p>
								<p class="eventD_order_yes_num">
									<span>{{sellPrice|decimal|toNum}}</span>
									<i v-if="updown" :class="updown==2?'eventGroup_num_down' : updown==1 ? 'eventGroup_num_top':''">
				                        <img v-if="updown==2" src="../../assets/img/index_down.png"/>
				                        <img v-if="updown==1" src="../../assets/img/index_top.png"/>
				                        {{scope}}
				                   	</i>
								</p>
								<div>
									<button v-if="buttonType == 1" id="r1" class="eventD_order_btn eventD_btn_no" @click="showIndexshow(3)">买入【No】</button>
									<button v-if="buttonType == 2" id="r2" class="eventD_order_btn eventD_btn_yes" @click="showIndexshow(2)">卖出【Yes】</button>
									<button v-if="buttonType == 3" id="r3" class="eventD_order_btn eventD_btn_no" @click="showIndexshow(4)">卖出【No】</button>
									<button v-if="buttonType == 4" id="r4" class="eventD_order_btn eventD_btn_ban">买入【No】</button>
									<button v-if="buttonType == 5" id="r5" class="eventD_order_btn eventD_btn_ban">卖出【Yes】</button>
									<button v-if="buttonType == 6" id="r6" class="eventD_order_btn eventD_btn_ban">卖出【No】</button>
									
								</div>

							</div>
						</div>
					</div>

					<EventStatus :eventStatus="eventTop.eventStatus"></EventStatus>
				</div>
			</div>

		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
	</div>
</template>
<script>
	import sellmonolayer from './sellmonolayer'
	import buymonolayer from './buymonolayer'
	import Login from '../common/Login'
	import box from '../common/box'
	import EventStatus from '../common/eventStatus'
	export default {
		props: {
			btnShow:{
				default() { return true; }
			},
			eventTop:{
				type: Object,
        		default() { return {}; }
			},
			eventGroup:{
				type: Object,
        		default() { return {}; }
			},
			eventBox:{
				type: Object,
        		default() { return {}; }
			},
			tities:{
				type: Array,
        		default() { return []; }
			},
			sellFivePrice:{
				type: Array,
        		default() { return []; }
			},
			buyFivePrice:{
				type: Array,
        		default() { return []; }
			},
			share:{
				type: Object,
        		default() { return {}; }
			},
			dateCurrent:{
				type: String,
        		default() { return ''; }
			},
			updown:{
				type: Number,
        		default() { return 0; }
			},
			scope:{
				type: String,
				default() { return 0; }
			},
			needShare:{
				type: Number,
        		default() { return 0; }
			}

		},
		data() {
			return {
				eventTopSelf:{},
				latest:0,//最新成交价
				yesPriceTxt:'买入【Yes】最优价',//yes最新成交价
				noPriceTxt:'买入【No】最优价',//no最新成交价
				buyPrice:0,
				dateCurrentSelf:'',//题材状态
				positionQuantity:'',
				positionType:'',
				buttonType:2,
				sellPrice:0,
				add:true,//关注按钮状态
				evenType:0,
				isshowindex: false,
				showindex: false,
				isLogin:false,//登录框显示隐藏
				isShowLoginModal:false,//登录框
				weixinShare:this.$base_url+'/event/v1/eventGroup/userInvitationEventPc/' + this.$route.params.id + '/' + 1

			}
		},
		filters: {
			days: function(input) {
				var d = new Date(input);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? +d.getDate() : '' + d.getDate();
				var hour = d.getHours();
				var minutes = d.getMinutes();
				var seconds = d.getSeconds();
				return day;
			},
			formatDate(timestamp) {
				return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
			},
			//
			fixed: function(value) {
				return value.toFixed(0);
			},
			toNum: function(value) {
				if(value == 'NaN'){
					return '--';
				}else{
					return value;
				}
			},
			//两位小数
			decimal: function(val) {
				if(val.toFixed) {
					return val.toFixed(2)
				} else {
					return val
				}
			}
		},
		created() {
			// console.log(this.eventTop.eventCurrentPrice)
			this.getEvent();
			
		},
		components: {
			sellmonolayer,
			buymonolayer,
			Login,
			box,
			EventStatus
		},
		methods: {
			//详情
			getEvent() {
				
				this.shared = this.eventGroup.shared;
				var positionQuantity1 = this.eventTop.eventDetailDataResponse.positionQuantity;
				if(positionQuantity1 > 0) {
					this.latest = true
				} else {
					this.latest = false
				}
				if(this.eventTop.eventStatus === 4) {
					this.dateCurrentSelf = '距开始' + this.dateCurrent
				} else if(this.eventTop.eventStatus === 0) {
					if(this.dateCurrent == "超过30天") {
						//console.log(this.formatDate(this.groupEndTime))
						this.dateCurrentSelf = '结束时间' + this.formatDate(this.eventGroup.groupEndTime)
					} else if(this.dateCurrent != ''){
						this.dateCurrentSelf = '距结束' + this.dateCurrent;
					}
				}else if(this.eventTop.eventStatus === 1){
					this.dateCurrentSelf = '已暂停'
				} else if(this.eventTop.eventStatus === 2) {
					this.dateCurrentSelf = '已清算'
				} else {
					this.dateCurrentSelf = '待清算'
				}
				if(this.btnShow){
					this.buttonshaft(this.eventTop.eventDetailDataResponse, this.eventTop);
				}
				if(this.$store.state.refreshToken != ''){
					this.isCartState();
					this.isAttention();
				}
			},
			hideLoginModal(){
				this.isShowLoginModal = false;
			},
			//下单按钮判断依据
			isCartState(){
				this.$CPOST('/order/v1/order/getUserPosition', {
					currency: 0,
					eventName: this.eventTop.eventName,
					page: 0,
					size: 10
				}, (res) => {
					console.log('res.resultValue===>'+res.resultValue)
					this.positionQuantity = res.resultValue.orderPositionResponseList[0].positionQuantity;
					this.positionType = res.resultValue.orderPositionResponseList[0].positionType;
					
				})
			},
			// 下单按钮判断
			//positionType  持仓类型 0YES  1NO  -1没有
			//eventCleaned  是否清算 0正常  1已清算
			buttonshaft(v, m) {
				var eventCleaned = m.eventCleaned;
				var eventStatus = m.eventStatus;
				var positionType = parseInt(v.positionType);
				if(eventStatus > 0){
					this.buttonType = 4;
				}else{
					if(eventCleaned === 0){
						if(positionType === 0){
							this.buttonType = 2;
							this.yesPriceTxt = '买入【Yes】最优价';
							this.noPriceTxt = '卖出【Yes】最优价';
						}
						else if(positionType === 1){
							this.buttonType = 3;
							this.yesPriceTxt = '买入【No】最优价';
							this.noPriceTxt = '卖出【No】最优价';
						}
						else{
							// if(v.remainQuantity > 0)
							this.buttonType = 1;
							this.yesPriceTxt = '买入【Yes】最优价';
							this.noPriceTxt = '买入【No】最优价';
						}
					}else{
						if(positionType === 0){
							this.buttonType = 4;
							this.yesPriceTxt = '买入【Yes】最优价';
							this.noPriceTxt = '卖出【Yes】最优价';
						}else if(positionType === 1){
							this.buttonType = 5;
							this.yesPriceTxt = '买入【No】最优价';
							this.noPriceTxt = '卖出【No】最优价';
						}else{
							this.buttonType = 6;
							this.yesPriceTxt = '买入【Yes】最优价';
							this.noPriceTxt = '买入【No】最优价';
						}
					}
				}
				//最优价取值判断
				if(eventStatus === 4){
					this.buyPrice = '--';
					this.sellPrice = '--';
					this.eventTop.eventCurrentPrice.currentPrice = '--';
				}else{
					if(this.buttonType == 3 || this.buttonType == 5){
						this.buyPrice = this.buyFivePrice[0].price == '--' ? '--' : 100 - this.buyFivePrice[0].price;
						this.sellPrice = this.sellFivePrice[0].price == '--' ? '--' : 100 - this.sellFivePrice[0].price;
					}else if(this.buttonType == 2 || this.buttonType == 4){
						this.buyPrice = this.sellFivePrice[0].price;
						this.sellPrice = this.buyFivePrice[0].price;
					}else{
						this.buyPrice = this.sellFivePrice[4].price;
						this.sellPrice = 100 - this.buyFivePrice[0].price;
					}
				}


				
				if(this.buyPrice == 100 || this.buyPrice == 0){
					this.buyPrice = '市价';
				}
				if(this.sellPrice == 100 || this.sellPrice == 0){
					this.sellPrice = '市价';
				}
			},
			//QQ 微信 微博 分享
			qq() {
				this.$Bury(window.location.href,this.$route.params.id,3,'event_qq');
				this.userDoTask();
				window.open('http://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(encodeURI(this.share.url))+'&title=玩预测 享快乐！让预测更有价值，让豪礼只属于你！' )
				
			},
			wb() {
				this.$Bury(window.location.href,this.$route.params.id,3,'event_weibo');
				this.userDoTask();
				window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(this.share.url) + '&title=玩预测 享快乐！让预测更有价值，让豪礼只属于你！' )
			},
			kj() {
				this.$Bury(window.location.href,this.$route.params.id,3,'event_qzone');
				this.userDoTask();
				window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.share.url +  '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！')
			},
			userDoTask(){
				if(this.$store.state.refreshToken != ''){
					this.$CPOST('/task/v1/task/userDoTask', {
						key: 'DAILY_SHARE',
					})
				}
			},
			showIndexx(n) {
				this.n = n
				this.isshowindex = true
			},
			hideIndex() {
				this.isshowindex = false
			},
			showIndexshow(n) {
				if(this.$store.state.refreshToken != ''){
					this.$router.push({path:'/event/trade/'+this.$route.params.id+'?type='+n})
				}else{
					this.isShowLoginModal = true;
				}
				// this.n = n
				// this.showindex = true
				// if(this.n == 1 || this.n == 2) {
				// 	this.showindex = true
				// 	this.isshowindex = false
				// } else {
				// 	this.showindex = false
				// 	this.isshowindex = true
				// }
			},
			hideindex() {
				this.showindex = false
			},
			formatDate(timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
			},
			isAttention() {

				this.$CPOST('/account/v1/userAttention/queryIsUserAttention', {
						attentionEventType: this.eventGroup.groupEventType,
						attentionType: 0,
						attentionTypeId: this.$route.params.id,
					}, (res) => {
						if(res.resultValue == false) {
							this.add = true
							this.yet = false
						} else {
							this.add = false
							this.yet = true
						}
					})
			},
			attention() {
				if(this.$store.state.refreshToken == '') {
					this.isShowLoginModal = true;
					return false
				}
				//用户新增关注
				this.$CPOST('/account/v1/userAttention/addUserAttention', {
						attentionEventType: this.eventGroup.groupEventType,
						attentionType: 0,
						attentionTypeId: this.$route.params.id,
					}, (res) => {
						if(res.resultCode == 200){
							this.add = false
						}
					})
			}
		}
	}
</script>
<style scoped>
	.eventDetail {
		width: 1200px;
		margin: auto;
		margin-top: 10px;
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
.eventDetail_order_left{position: relative;}
	
	/***下单***/
	
	.eventDetail_order {
		border-bottom:solid 1px #d5d5d5;
	}
	
	.eventDetail_order_left {
		margin-top: 11px;
		padding-bottom: 11px;
	}
	
	.eventDetail_order_text {
		height: 130px;
	}
	
	.eventGroup_center_detail_img {
		width: 208px;
		height: 130px;
		display: inline-block;
	}
	
	.eventGroup_center_detail_img>img {
		width: 100%;
		height: 100%;
	}
	
	.eventDetail_order_detail {
		height: 105px;
		display: inline-block;
		vertical-align: bottom;
	}
	
	.eventD_order_yes {
		width: 185px;
		float: left;
		margin-left: 30px;
	}
	
	.eventD_order_yes_p1 {
		color: #676767;
		font-size: 16px;
		line-height: 24px;
		margin-left: -5px;
	}
	.eventD_order_yes_num{height: 32px; overflow: hidden; line-height: 32px;}
	.eventD_order_yes_num>span {
		font-size: 30px;
		color: #323232;
		vertical-align: top;
	}
	
	.eventGroup_num_top {
		color: #c60c1b;
	}
	
	.eventGroup_num_down {
		color: #098959;
	}
	
	.eventD_order_btn {
		width: 108px;
		height: 32px;
		border: 0;
		color: #fff;
		font-size: 14px;
		margin-top: 5px;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		border-radius: 2px;
		cursor: pointer;
		outline: none;
	}
	
	.eventD_btn_yes {
		background: #f52f3e;
	}
	
	.eventD_btn_no {
		background: #5090fb;
	}
	
	.eventD_btn_ban {
		background: #d5d5d5;
	}
	
	.eventD_order_xian {
		width: 1px;
		height: 82px;
		float: left;
		border-left: 1px dashed #d4d4d4;
	}
	
	.eventD_order_no {
		width: 185px;
		float: left;
		margin-left: 55px;
	}
	
	.eventGroup_center_share {
		height: 14px;
		line-height: 14px;
		margin-top: 10px;
	}
	
	.eventG_center_attention {
		height: 100%;
		padding: 0 8px;
		font-size: 12px;
		border-right: 1px solid #e6e6e6;
	}
	
	.eventG_center_add {
		color: #e83c49;
		cursor: pointer;
	}
	
	.eventG_center_yet {
		color: #a4a4a4;
	}
	
	.eventG_center_yet>img {
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
	/*距结束*/
	
	.eventGroup_center_right {
		width: 287px;
		/*height: 145px;*/
		border-left: 1px dashed #dfdfdf;
		float: right;
	}
	
	.eventGroup_center_time_bg {
		width: 90px;
		height: 90px;
		color: #323232;
		font-size: 12px;
		margin: auto;
		margin-bottom: 10px;
		position: relative;
		border-radius: 50%;
		border: solid 6px gainsboro;
		/*display: none;*/
		/*background: url(../../assets/img/dongxiao.gif) no-repeat center;*/
	}
	
	.eventGroup_center_time {
		width: 90px;
		height: 90px;
		color: #323232;
		font-size: 12px;
		margin: auto;
		margin-bottom: 10px;
		/*position: relative;*/
		/*background: url(../../assets/img/dongxiao.gif) no-repeat center;*/
		z-index: 2;
	}
	
	.eventGroup_center_main {
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: auto;
	}
	
	.eventGroup_center_time_box {
		margin-left: 8px;
		margin-top: 30px;
	}
	
	.eventGroup_center_time_box>span {
		display: block;
		margin-left: -29px;
		width: 76px;
	}
	
	.eventGroup_center_time_box>span>i {
		font-size: 12px;
		color: #a5a5a5;
		padding-left: -30px;
	}
	
	.eventGroup_center_begin {
		height: 22px;
		line-height: 22px;
		text-align: center;
		font-size: 14px;
		color: #a4a4a4;
		width: 230px !important;
	}
	
	.eventGroup_center_time_box>span>i.eventGroup_center_yet {
		color: #323232;
	}
	
	.eventGroup_center_yet {
		color: #323232;
		width: 78px;
		height: 22px;
		text-align: center;
		font-size: 14px;
		padding-left: 30px;
	}
	
	.eventD_position {
		width: 100%;
		height: 54px;
		margin-top: 20px;
	}
	
	.eventD_position>li {
		width: 177px;
		height: 100%;
		padding-left: 122px;
		border-right: 1px solid #e8e8e8;
		float: left;
	}
	
	.eventD_position>li.border_none {
		border-right: 0;
	}
	
	.eventD_position_num {
		color: #323232;
		font-size: 25px;
		font-weight: bold;
	}
	
	.eventD_position_name {
		color: #676767;
		font-size: 14px;
	}
	
	.eventD_position_num>button {
		width: 72px;
		height: 26px;
		background: #fff;
		border: 1px solid #dfdfdf;
		color: #c71220;
		font-size: 12px;
		cursor: pointer;
		vertical-align: top;
	}
	
	.eventD_position_num>button>img {
		vertical-align: text-top;
		margin-right: 5px;
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
	
	#most {
		line-height: 22px !important;
	}
</style>
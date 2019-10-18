<template>
	<div class="eventDetail">
		<Eventtop v-if="eventVis" :needShare="needShare" :eventTop="eventTop" :eventGroup="eventGroup" :dateCurrent="dateCurrent" :updown="updown" :scope="scope" :tities="tities" :buyFivePrice="fivePrice.buyPrice" :sellFivePrice="fivePrice.sellPrice" :share="share" :eventBox="eventBox">
		</Eventtop> 
		<!--tab-->
		<div class="eventGroup_detail">
			<!--tab切换-->
			<div class="eventGroup_detail_top">
				<ul class="eventGroup_detail_list">
					<li :class="activeTab==0?'eventGroup_detail_active':''" @click="switchTab(0)">行情</li>
					<li :class="activeTab==2?'eventGroup_detail_active':''" @click="switchTab(2)">详情</li>
					<li :class="activeTab==1?'eventGroup_detail_active':''" @click="switchTab(1)">规则</li>
					<li :class="activeTab==3?'eventGroup_detail_active':''" @click="switchTab(3)">评论</li>
					<li :class="activeTab==4?'eventGroup_detail_active':''" @click="switchTab(4)">订单</li>
				</ul>
			</div>
			<!--切换页码-->
			<div class="eventGroup_box">
				<!--第一tab-->
				<div class="eventGroup_lists" v-if="activeTab==2">
					<div class="eventGroup_details">
						<div class="eventD_text" v-html="eventDetail">
							
						</div>
					</div>
				</div>
				<!--第二tab-->
				<div class="eventGroup_lists" v-if="activeTab==1">
					<div class="eventGroup_details">
						<pre>{{ruleData}}</pre>
					</div>
				</div>
				<!--第三tab-->
				<div class="eventGroup_lists" v-show="activeTab==0">
					<div class="five_price displayFlex flexCenter">
						<div class="end_box" v-if="eventTop.eventStatus == 2">
							<div class="end_mask"></div>
							<div class="end_chuo">
								<p v-if="eventGroup.groupEventType == 0">
									<img v-if="eventTop.eventStatus" src="../../assets/img/trade_clear1.png" alt="">
									<span class="pj_endPrice">{{eventTop.eventLiquidationPrice}}</span>
								</p>
								<span v-if="eventGroup.groupEventType == 1">
									<img v-if="eventTop.eventLiquidationPrice > 0" src="../../assets/img/trade_clear2.png" alt="">
									<img v-else src="../../assets/img/trade_clear3.png" alt="">
								</span>
							</div>
						</div>
						<div class="five_item">
							<ul class="five_head displayFlex">
								<li class="flex1">【Yes】</li>
								<li class="flex1">价格</li>
								<li class="flex1">数量</li>
							</ul>
							<table class="five_table" border="0" cellspacing="0" cellpadding="0">
								<tbody>
									<tr v-for="(item,index) in fivePrice.sellPrice">
										<td><span class="blue">{{sellFiveKey[index]}}</span></td>
										<td>{{item.price|decimal|market}}</td>
										<td>{{item.count}}</td>
									</tr>
								</tbody>
							</table>
							<div class="five_line"></div>
							<table class="five_table" border="0" cellspacing="0" cellpadding="0">
								<tbody>
									<tr v-for="(item,index) in fivePrice.buyPrice">
										<td><span class="red">{{buyFiveKey[index]}}</span></td>
										<td>{{item.price}}</td>
										<td>{{item.count}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="five_item">
							<ul class="five_head displayFlex">
								<li class="flex1">【No】</li>
								<li class="flex1">价格</li>
								<li class="flex1">数量</li>
							</ul>
							<table class="five_table" border="0" cellspacing="0" cellpadding="0">
								<tbody>
									<tr v-for="(item,index) in fiveNoPrice.buyPrice">
										<td><span class="blue">{{sellFiveKey[index]}}</span></td>
										<td>{{item.price=='--'?'--':100-item.price|decimal|market}}</td>
										<td>{{item.count}}</td>
									</tr>
								</tbody>
							</table>
							<div class="five_line"></div>
							<table class="five_table" border="0" cellspacing="0" cellpadding="0">
								<tbody>
									<tr v-for="(item,index) in fiveNoPrice.sellPrice">
										<td><span class="red">{{buyFiveKey[index]}}</span></td>
										<td>{{item.price=='--'?'--':100 - item.price|decimal|market}}</td>
										<td>{{item.count}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="event_echarts">
						<div id="mainLine" style="width:100%;height:500px;"></div>
					</div>
					<div class="event_echarts">
						<div id="mainBar" style="width: 100%;height:300px;">
					</div>
					
					</div>
				</div>
				<!--第四tab-->
				<div class="eventGroup_lists" v-if="activeTab==3">
					<Comment :objType="0"></Comment>
				</div>
				<!--订单tab-->
				<div class="eventGroup_lists" v-if="activeTab==4">
					<orderList></orderList>
				</div>
			</div>
			<div class="eventGroup_detail" v-if="activeTab==2 && this.$route.query.type == 10">
				<!--列表-->
				<div class="group_title">
					<h2>{{eventGroup.groupName}}</h2>
					<router-link tag="a" :to="/group/+eventGroup.groupId">返回话题列表</router-link>
				</div>
				<div class="eventGroup_lists">
					<div class="eventGroup_lists_top">
						<p class="eventGroup_lists_top_p1">题材名称</p>
						<p class="eventGroup_lists_top_p2">【Yes】最新成交价</p>
						<p class="eventGroup_lists_top_p3">【No】最新成交价</p>
						<p class="eventGroup_lists_top_p4">状态</p>
						<p class="eventGroup_lists_top_p5">清算价</p>
					</div>
					<ul class="eventGroup_lists_bottom">
						<Event v-for="item in groupList" :key="item.eventId" :eventlist="item" />
					</ul>
				</div>
				<router-link tag="a" class="group_more" :to="/group/+eventGroup.groupId">查看更多</router-link>
			</div>
		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
		<Aalert :text='alertText' v-if='alert' @yes="yes"></Aalert>
	</div>
	
</template>

<script>
	import Rule from './Rule'
	import Eventtop from './eventtop'
	import buymonolayer from './buymonolayer'
	import Login from '../common/Login'
	import Aalert from '../common/alert'
	import Comment from '../common/comment'
	import orderList from './orderList'
	import Event from '../group/Event'
	export default {
		data() {
			return {
				uView:false,//持仓板块是否显示
				accountcurrency:0,//账户余额
				eventTop:{},
				eventGroup:{},
				activeTab:0,//详情TAB切换
				eventDetail:'',//题材详情
				ruleData:'',//题材规则
				fivePrice:{
					buyPrice:[],//买入五价
					sellPrice:[]//卖出五价
				},
				fiveNoPrice:{
					buyPrice:[],//买入No五价
					sellPrice:[]//卖出No五价
				},
				share:{
					img:'',//分享图片
					url:'',//分享地址
					title:''//分享标题
				},
				eventBox:{},//红包
				tities:[],
				dateCurrent:'',
				updown:0,
				scope:'',
				eventVis:false,//头部是否显示
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
				buyFiveKey:['买一','买二','买三','买四','买五'],
				sellFiveKey:['卖五','卖四','卖三','卖二','卖一'],
				groupList:[],//同组的其他题材列表
				needShare:0
			}
		},
		components: {
			buymonolayer,
			Eventtop,
			Login,
			Rule,
			Aalert,
			Comment,
			orderList,
			Event
		},
		created() {
			this.$Bury(window.location.href,this.$route.params.id,3,'ticaixiangqingye_03021');
			setTimeout(() => {
				this.getEvent();
            	this.getdetail();
			},50)
            
		},
		filters: {
			//两位小数
			decimal: function(val) {
				if(val.toFixed) {
					return val.toFixed(2)
				} else {
					return val
				}
			},
			//默认0或者100的时候为市价
			market: function(value) {
				return value == 0 || value == 100 ? '市价' : value
			},
			//千分位
			comdify(n) {
				if(typeof n == 'string'){
					let re = /\d{1,3}(?=(\d{3})+$)/g;
						let n1 = n.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
							return s1.replace(re, "$&,") + s2;
						});
				return n1;
				}
				
			}
		},
		mounted() {
			this.echarts();
		},
		methods: {
			//点击显示宝箱弹层
			showBoxModal() {
				this.isBox = !this.isBox;
			},
			hideLoginModal(){
				this.isShowLoginModal = false;
			},
			otherEvent(){
				this.$CPOST('/event/v1/eventInformation/queryOtherEvent', {
						eventId: this.$route.params.id
					}, (res) => {
						this.groupList = res.resultValue.eventInformationEntityList
					})
			},
			//详情
			getEvent() {
				this.$CPOST('/event/v1/eventInformation/queryEventInformation', {
						eventId: this.$route.params.id
					}, (res) => {
						if(res.resultCode == 200){
							this.needShare = res.resultValue.needShare
							this.eventTop = res.resultValue.eventInformationEntity;
							this.tities = res.resultValue.eventTagEntities;
							this.eventGroup = res.resultValue.eventGroup;
							this.dateCurrent = res.resultValue.dateCurrent;
							this.eventBox = res.resultValue.groupBoxData;
							this.share = res.resultValue.shareConstant;
							this.updown = this.eventTop.eventCurrentPrice.updown;
							this.scope = this.eventTop.eventCurrentPrice.scope;
							this.eventVis = true;
							// 导航当前状态
							if(this.eventGroup.groupEventType){
								this.$store.commit('setNavIdx',1);
							}else{
								this.$store.commit('setNavIdx',2);
							}
							//持仓数据是否显示
							if(this.$store.state.refreshToken != ''){
				            	this.uView = true;
				            }
							this.fivePrice.buyPrice = res.resultValue.eventInformationEntity.fivePriceResponse.buyFivePrice;
							this.fivePrice.sellPrice = res.resultValue.eventInformationEntity.fivePriceResponse.sellFivePrice;
							this.fiveNoPrice.buyPrice = this.fivePrice.buyPrice.slice();
							this.fiveNoPrice.sellPrice = this.fivePrice.sellPrice.slice();
							// console.log('price1==>'+JSON.stringify(this.fivePrice.buyPrice))
							function minArr(propertyName) { 
								return function (object1, object2) { 
									var value1 = Number(object1[propertyName]); 
									var value2 = Number(object2[propertyName]); 
									if (value2 < value1) { 
										return -1; 
									} 
									else if (value2 > value1) { 
										return 1; 
									} 
									else { 
										return 0; 
									} 
								} 
							}
							function maxArr(propertyName) { 
								return function (object1, object2) { 
									var value1 = Number(object1[propertyName]); 
									var value2 = Number(object2[propertyName]); 
									if (value2 < value1) { 
										return 1; 
									} 
									else if (value2 > value1) { 
										return -1; 
									} 
									else { 
										return 0; 
									} 
								} 
							}
							this.fivePrice.sellPrice.sort(minArr('price'));
							this.fiveNoPrice.buyPrice.sort(maxArr('price'));
							
							var buyLenth = this.fivePrice.buyPrice.length;
							var sellLenth = this.fivePrice.sellPrice.length;
							var nullPrice = {
									count: "--",
									price: "--"
								}
							if(buyLenth < 5) {
								for(var i = 0; i<5-buyLenth; i++){
									this.fivePrice.buyPrice.push(nullPrice);
									this.fiveNoPrice.buyPrice.unshift(nullPrice);
								}
							}
							if(sellLenth < 5) {
								for(var i = 0; i<5-sellLenth; i++){
									this.fivePrice.sellPrice.unshift(nullPrice);
									this.fiveNoPrice.sellPrice.push(nullPrice);
								}
							}
							setTimeout(()=> {console.log('price2==>'+JSON.stringify(this.fivePrice.buyPrice))},50)
						}else if(res.resultCode == 10128){
							this.$router.push({path:'/powerError/'});
						}else if(res.resultCode == 10129){
							this.$router.push({path:'/login/'});
						}else if(res.resultCode == 10130){
							// console.log(res.resultValue.activityId)
							this.$router.push({path:'/newActivity/'+res.resultValue.activityId});
						}else{
							alert(res.resultMessages);
							this.$router.go(-1);
						}
						
				})

			},
			//公开余额
			yue() {
				this.$CPOST('/account/v1/userAccount/queryUserAccount', {
						userId: 10
					},(res) => {
						this.accountcurrency = res.resultValue.userAccountEntity.currency
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
			//切换详情TAB
			switchTab(index) {
				if(index == 4 && this.$store.state.refreshToken == ''){
			        this.isShowLoginModal = true;
			        return false;
			    }

				this.activeTab = index;
				switch(index){
					case 2:
					this.$Bury(window.location.href,this.$route.params.id,3,'ticaixiangqing_04015');
					this.getdetail();//获取详情
					this.otherEvent();
					break;
					case 1:
					this.$Bury(window.location.href,this.$route.params.id,3,'ticaiguize_04016');
					this.detailevent();//获取规则
					break;
					case 3:
					this.$Bury(window.location.href,this.$route.params.id,3,'ticaipinglun_04017');
					break;
					case 4:
					this.$Bury(window.location.href,this.$route.params.id,3,'ticaidingdan_04024');
					break;
				}
			},
			yes(){
				switch(this.yesType){
					case 'pinglun':
					this.getComment();
					break;
				}
			},
			alertDailog(txt){
				this.alert = true;
				$('.confirm_modal').show();
				this.alertText=txt;
			},

			
			echarts() {
				var myChart = this.$echarts.init(document.getElementById('mainBar'));
				var myCharts = this.$echarts.init(document.getElementById('mainLine'));
				myChart.setOption({
					title: {
						text:'成交量柱形图',
						x:'center',
						top:0
					},
					grid: {
						containLabel: true,
						left:45,
						right:45
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
        				boundaryGap: false,
						data: []
					},
					yAxis: {
						type:'value',
						min: 0,
						minInterval:1
					},
					toolbox: {
			            left: 'center',
			            top:'7%',
			            feature: {
			                dataZoom: {
			                    yAxisIndex: 'none'
			                },
			                restore: {},
			                saveAsImage: {}
			            }
			        },
					series: [{
						name: '销量',
						type: 'bar',
						barWidth: 15,
						itemStyle: {
							normal: {
								color: '#f52f3e'
							}
						},
						data: []
					}]
				});
				myCharts.setOption({
					title: {
						text:'价格走势图',
						x:'center'
					},
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						containLabel: true,
						left:45,
						right:45
					},
					xAxis: {
						type: 'category',
        				boundaryGap: false
					},
					yAxis: {
						type:'value',
						gridIndex:0,
						max:100,
						maxInterval:5,
						splitLine: {
			                show: true
			            }
					},
					toolbox: {
			            left: 'center',
			            top:'5%',
			            feature: {
			                dataZoom: {
			                    yAxisIndex: 'none'
			                },
			                restore: {},
			                saveAsImage: {}
			            }
			        },
			        
					series: [{
						name: '价格',
						type: 'line',
						itemStyle: {
							normal: {
								color: '#d34723'
							}
						},
						data: []
					}]
				});

				this.$CPOST('/event/v1/eventInformation/queryEventChart', {
						eventId: this.$route.params.id
					},(res) => {
						var names = [];
						var names2 = [];
						var nums = [];
						var trade=[];
						var result = res.resultValue.orderTrendChartsResponse;
						function compare(propertyName) { 
							return function (object1, object2) { 
								var value1 = object1[propertyName]; 
								var value2 = object2[propertyName]; 
								if (value2 < value1) { 
									return 1; 
								} 
								else if (value2 > value1) { 
									return -1; 
								} 
								else { 
									return 0; 
								} 
							} 
						}
						result.sort(compare('statisticsTime'));
						if(result) {
							for(var i = 0; i < result.length; i++) {
								if(i == 0){
									names.push(' ');
									trade.push(0);
								}else{								
									names.push(this.days(result[i].statisticsTime));
									names2.push(this.days(result[i].statisticsTime));
									trade.push(result[i].tradeQuantity);
								}
								if(result[i].middleRate == '0.00' && i != 0) {
									// var nums2 = nums;
									nums.push(result[i - 1].middleRate);
									result[i].middleRate = result[i - 1].middleRate;
								} else {
									nums.push(result[i].middleRate);
								}
								
							}
							myChart.setOption({
								xAxis: {
									data: names
								},
								dataZoom: [{
						            startValue: names[0]
						        }, {
						            type: 'inside'
						        }],
								series: [{
									name: '销量',
									data: trade
								}]
							});
							myCharts.setOption({
								xAxis: {
									data: names
								},
								 dataZoom: [{
						            startValue: names[0]
						        }, {
						            type: 'inside'
						        }],
								series: [{
									name: '价格',
									data: nums
								}]
							});
						}
					})

			},
			days(dates) {
				var d = new Date(dates);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? +d.getDate() : '' + d.getDate();
				var hour = d.getHours();
				var minutes = d.getMinutes();
				var seconds = d.getSeconds();
				return year + '-' + month + '-' + day;
			},
			//详情中的详情
			getdetail() {
				this.$CPOST('/event/v1/eventInformation/queryEventInformationData', {
					eventId: this.$route.params.id
				},(res) => {
					this.eventDetail = res.resultValue.eventDetails
				})
			},
			//规则
			detailevent() {
				if(this.eventGroup.groupEventType==1){
					var configKey = 'event_yc'
				}else{
					var configKey = 'event_pj'
				}
				this.$CPOST('/share/v1/shareConfig/queryShareConfig', {
						configKey: configKey
					}, (res) => {
						this.ruleData = res.resultValue.configEntity.configValue
				})

			},

		},
		watch:{
			$route(){
			  this.$router.go(0)
			}
	  },
	}
</script>

<style scoped>
.group_title{position: relative; margin-bottom: 15px;}
.group_title h2{font-size: 14px; color:#000;}
.group_title a{display: inline-block; position: absolute; right: 0; top: 0; color: #c60c1b;}
.group_more{display: block; line-height: 50px; text-align: center; color: #999;}
.group_more:hover{color: #c60c1b;}
	.hide {
		display: none !important;
	}
	.event_echarts{margin-bottom: 40px; width: 1200px;}
	.eventDetail {
		width: 1200px;
		margin: auto;
		margin-top: 29px;
	}
	.five_price{
		padding-top: 28px;margin:0 auto; margin-bottom: 22px; position: relative;
	}
	.five_price .five_item{width: 270px; min-height: 300px; border:solid 1px #d5d5d5; margin-left: -1px;}
	.five_price .five_item .five_head{background: #f2f2f2; height: 48px;}
	.five_price .five_item .five_head li{text-align: center; line-height: 48px; color: #676767; font-size: 16px;}
	.five_price .five_item .five_table{width:100%;}
	.five_price .five_item .five_table td{width: 33.33%; text-align: center; line-height: 30px; color: 3333; font-size: 16px;}
	.five_price .five_item .five_table td .blue{color: #4867aa;}
	.five_price .five_item .five_table td .red{color: #c60c1b;}
	.five_price .five_item .five_line{width: 240px; margin:0 auto; border-bottom: solid 1px #d5d5d5; margin-bottom: 5px;}

	.five_price .end_box{}
	.five_price .end_box .end_mask{width: 100%; height: 100%; position: absolute; background: rgba(255,255,255,.7); z-index: 10;}
	.five_price .end_box .end_chuo{width: 140px; height: 140px; position: absolute; z-index: 20; left: 50%; top: 50%; margin:-70px 0 0 -70px;}
	.five_price .end_box .end_chuo img{width: 100%;}
	.pj_endPrice{position: absolute;width: 100%; left: 0; top: 73px; font-size: 20px; text-align: center; color: #4867a9; font-weight: bold;}
	/***下单***/
	
	.eventDetail_order {
		height: 171px;
	}
	
	.eventDetail_order_left {
		height: 160px;
		margin-top: 11px;
		float: left;
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
	
	.eventD_order_yes_num>span {
		font-size: 30px;
		color: #323232;
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
	
	.eventG_share>i>img,
	.eventG_share>span {
		vertical-align: middle;
	}
	
	.eventG_share>i>img {
		cursor: pointer;
		margin: 1px;
	}
	
	.eventG_share>i>img+img {
		display: none;
	}
	
	.eventG_share>i:hover>img {
		display: none;
	}
	
	.eventG_share>i:hover>img+img {
		display: inline;
	}
	
	/*tab切换*/
	/*详情*/
	
	.eventGroup_detail {
		width: 100%;
		margin-top: 30px;
		margin-bottom: 80px;
	}
	
	.eventGroup_detail_top {
		height: 52px;
		border: 1px solid #e6e6e6;
	}
	
	.eventGroup_detail_list {
		height: 50px;
		float: left;
	}
	
	.eventGroup_detail_list>li {
		width: 123px;
		height: 100%;
		cursor: pointer;
		line-height: 50px;
		text-align: center;
		color: #323232;
		font-size: 16px;
		border-left: 1px solid #fff;
		border-right: 1px solid #fff;
		float: left;
	}
	
	.eventGroup_detail_list>li.eventGroup_detail_active {
		color: #e52735;
		border-top: 2px solid #e52735;
		margin-top: -1px;
		border-left: 1px solid #e6e6e6;
		border-right: 1px solid #e6e6e6;
	}
	
	.eventGroup_lists {
		border: 1px solid #e6e6e6;
		border-top: 0;
		overflow: hidden;
	}
	/***列表***/
	
	.eventGroup_lists_top {
		height: 60px;
		border-bottom: 1px solid #e6e6e6;
		border-top: 1px solid #e6e6e6;
	}
	
	.eventGroup_lists_top>p {
		height: 100%;
		line-height: 60px;
		text-align: center;
		font-size: 14px;
		color: #676767;
		float: left;
	}
	
	.eventGroup_lists_top_p1 {
		width: 364px;
	}
	
	.eventGroup_lists_top_p2 {
		width: 160px;
		margin-left: 34px;
	}
	
	.eventGroup_lists_top_p3 {
		width: 160px;
		margin-left: 70px;
	}
	
	.eventGroup_lists_top_p4 {
		width: 160px;
		text-align: center;
		margin-left: 50px;
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
	
	.eventGroup_details {
		width: 1079px;
		margin: auto;
		margin-bottom: 26px;
	    line-height: 24px;
		color: #323232;
	}
	
	.eventD_text {
		margin-top: 36px;
	}
	
	.eventD_text>p {
		color: #676767;
		font-size: 14px;
		line-height: 24px;
	}
	
	.eventD_text>h4 {
		line-height: 30px;
	}
	
	.eventD_text>h4>span {
		color: #323232;
		font-size: 16px;
	}
	
	.eventD_text>h4>i {
		color: #e8e8e8;
		font-size: 16px;
		font-weight: 500;
		margin-left: 5px;
	}
	
	.eventD_text>p>i {
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
	
	.eventD_text>p>a {
		color: #3282ff;
		text-decoration: underline;
	}
	/*规则*/
	
	.eventGroup_rule {
		margin-top: 26px;
	}
	
	.eventGroup_rule>li {
		color: #323232;
		font-size: 14px;
		line-height: 24px;
	}
	/*行情*/
	
	
	
	
	
	.relevant_comments_body {
		position: relative;
	}
	
	.paging {
		margin: 30px 0;
	}
	.el-pagination{
		text-align: center;
	}
	.eventD_price_buy .buy_best_price>tr>td {
		height: 40px;
	}
	.eventGroup_details>p {
		color: #323232;
		font-size: 14px;
		line-height: 22px;
		margin-top: 26px;
	}
	pre {
		width: 1079px !important;
		white-space: pre-wrap !important;
		word-wrap: break-word !important;
	}
	
</style>
<template>
	<div class="eventDetail">
		<Eventtop v-if="eventVis" :eventTop="eventTop" :eventGroup="eventGroup" :dateCurrent="dateCurrent" :updown="updown" :scope="scope" :tities="tities" :buyFivePrice="fivePrice.buyPrice" :sellFivePrice="fivePrice.sellPrice" :share="share" :eventBox="eventBox" :btnShow="false">
		</Eventtop> 
		<!--tab-->
		<div class="eventGroup_detail">
			<!--tab切换-->
			<div class="eventGroup_detail_top">
				<ul class="eventGroup_detail_list displayFlex flexCenter">
					<li :class="activeTab==0?'eventGroup_detail_active':''" @click="switchTab(0)">{{tabList[0]}}</li>
					<li :class="activeTab==1?'eventGroup_detail_active':''" @click="switchTab(1)">{{tabList[1]}}</li>
				</ul>
			</div>
			<!--切换页码-->
			<div class="eventGroup_box" v-if="eventVis">
				<!--第一tab-->
				<div class="eventGroup_lists" v-if="activeTab==0">
					<div class="eventGroup_details">
						<!-- trade start -->
						<div class="order_box">
							<div class="order_top displayFlex flexCenter">
								<div>交易类型【{{tradeType}}】</div>
								<div>
									交易货币:
									<!--1是公开账户  0是独立账户-->
	                            	<img v-if="eventGroup.shared==1" :title="this.$store.state.weilaiTitle" src="../../../assets/img/eventGroup/event_weilai.png"/>
	                            	<img v-if="eventGroup.shared==0" :title="this.$store.state.wuxianTitle" src="../../../assets/img/eventGroup/event_wuxian.png"/>
								</div>
							</div>
							<div class="displayFlex">
								<!-- five start -->
								<div class="order_five">
									<ul class="five_head displayFlex">
										<li class="flex1">【{{tradeType}}】</li>
										<li class="flex1">价格</li>
										<li class="flex1">数量</li>
									</ul>
									<table class="five_table" border="0" cellspacing="0" cellpadding="0">
										<tbody>
											<tr v-for="(item,index) in fivePrice.sellPrice">
												<td><span class="blue">{{sellFiveKey[index]}}</span></td>
												<td>{{item.price=='--'?'--':item.price|decimal|market}}</td>
												<td>{{item.count|comdify}}</td>
											</tr>
										</tbody>
									</table>
									<div class="new_price">
										最新成交价 {{type >2 ? 100 - eventTop.eventCurrentPrice.currentPrice : eventTop.eventCurrentPrice.currentPrice|decimal}}
										<span v-if="type > 2">
											<i v-if="eventTop.eventCurrentPrice.updown" :class="eventTop.eventCurrentPrice.updown==2?'eventGroup_num_down' :eventTop.eventCurrentPrice.updown==1 ? 'eventGroup_num_top':''">
					                        <img v-if="eventTop.eventCurrentPrice.updown==2" src="../../../assets/img/index_down.png"/>
							                <img v-if="eventTop.eventCurrentPrice.updown==1" src="../../../assets/img/index_top.png"/>
					                        {{eventTop.eventCurrentPrice.scope}}
					                        </i>
										</span>
										<span v-if="type < 3">
										<i v-if="eventTop.eventCurrentPrice.updown" :class="eventTop.eventCurrentPrice.updown==1?'eventGroup_num_down' :eventTop.eventCurrentPrice.updown==2 ? 'eventGroup_num_top':''">
				                        <img v-if="eventTop.eventCurrentPrice.updown==1" src="../../../assets/img/index_down.png"/>
						                <img v-if="eventTop.eventCurrentPrice.updown==2" src="../../../assets/img/index_top.png"/>
				                        {{eventTop.eventCurrentPrice.scope}}
				                        </i>
				                        </span>
									</div>
									<table class="five_table" border="0" cellspacing="0" cellpadding="0">
										<tbody>
											<tr v-for="(item,index) in fivePrice.buyPrice">
												<td><span class="red">{{buyFiveKey[index]}}</span></td>
												<td>{{item.price=='--'?'--':item.price|decimal|market}}</td>
												<td>{{item.count|comdify}}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<!-- five end -->
								<div class="order_right flex1">
									<div class="right_cc">
										<div class="right_item displayFlex">
											<div class="text">持仓均价：</div>
											<div class="text2 flex1">{{eventTop.eventDetailDataResponse.positionAverage}}</div>
										</div>
										<div class="right_item displayFlex">
											<div class="text">持仓数量：</div>
											<div class="text2 flex1">{{eventTop.eventDetailDataResponse.positionQuantity|comdify}}</div>
										</div>
									</div>
									<div>
										<div class="right_item displayFlex">
											<div class="text">{{tabList[0]}}价格：</div>
											<div class="text2 flex1"><input type="number" v-model="currentbuy"></div>
										</div>
										<div class="right_item displayFlex">
											<div class="text">{{tabList[0]}}数量：</div>
											<div class="text2 flex1"><input type="number" v-model="counter"></div>
										</div>
										<div class="right_item displayFlex">
											<div class="text">最大可{{buyName}}数量：</div>
											<div class="text2 flex1">{{maxBuyNum|comdify}}</div>
										</div>
									</div>
									<div class="right_acount">
										<div class="right_item displayFlex">
											<div class="text yue">余额：</div>
											<div class="text2 flex1" style="text-align:right">
												{{accountcurrency|comdify}}
												<img v-if="eventGroup.shared==1" :title="this.$store.state.weilaiTitle" src="../../../assets/img/eventGroup/event_weilai.png"/>
	                            				<img v-if="eventGroup.shared==0" :title="this.$store.state.wuxianTitle" src="../../../assets/img/eventGroup/event_wuxian.png"/>
	                            				<router-link tag="a" to="/personal/recharge" v-if="eventGroup.shared==1" class="chong_btn"><span>充值</span></router-link>
	                            			</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- trade end -->
						<div class="success_yu" v-if="eventGroup.groupEventType">
							如果预测成功，预计赚{{yuceProfit|decimal}}
							<img v-if="eventGroup.shared==1" :title="this.$store.state.jindouTitle" src="../../../assets/img/eventGroup/event_jindou.png"/>
                        	<img v-if="eventGroup.shared==0" :title="this.$store.state.wuxianTitle" src="../../../assets/img/eventGroup/event_wuxian.png"/>
						</div>
						<div class="order_btn_box displayFlex flexCenter">
							<a href="javascript:;" class="yes" @click="getsure()">确认</a>
							<a href="javascript:;" class="concel" @click="cancel">取消</a>
						</div>
					</div>
				</div>
				<!--第二tab-->
				<div class="eventGroup_lists" v-if="activeTab==1">
					<div class="eventGroup_details">
						<!-- trade start -->
						<div class="order_box">
							<div class="order_top displayFlex flexCenter">
								<div>交易类型【{{tradeType}}】</div>
								<div>
									交易货币:
									<!--1是公开账户  0是独立账户-->
	                            	<img v-if="eventGroup.shared==1" :title="this.$store.state.weilaiTitle" src="../../../assets/img/eventGroup/event_weilai.png"/>
	                            	<img v-if="eventGroup.shared==0" :title="this.$store.state.wuxianTitle" src="../../../assets/img/eventGroup/event_wuxian.png"/>
								</div>
							</div>
							<div class="displayFlex">
								<!-- five start -->
								<div class="order_five">
									<ul class="five_head displayFlex">
										<li class="flex1">【{{tradeType}}】</li>
										<li class="flex1">价格</li>
										<li class="flex1">数量</li>
									</ul>
									<table class="five_table" border="0" cellspacing="0" cellpadding="0">
										<tbody>
											<tr v-for="(item,index) in fivePrice.sellPrice">
												<td><span class="blue">{{sellFiveKey[index]}}</span></td>
												<td>{{item.price=='--'?'--':item.price|decimal|market}}</td>
												<td>{{item.count|comdify}}</td>
											</tr>
										</tbody>
									</table>
									<div class="new_price">
										最新成交价 {{type >2 ? 100 - eventTop.eventCurrentPrice.currentPrice : eventTop.eventCurrentPrice.currentPrice|decimal}}
										<span v-if="type > 2">
											<i v-if="eventTop.eventCurrentPrice.updown" :class="eventTop.eventCurrentPrice.updown==2?'eventGroup_num_down' :eventTop.eventCurrentPrice.updown==1 ? 'eventGroup_num_top':''">
					                        <img v-if="eventTop.eventCurrentPrice.updown==2" src="../../../assets/img/index_down.png"/>
							                <img v-if="eventTop.eventCurrentPrice.updown==1" src="../../../assets/img/index_top.png"/>
					                        {{eventTop.eventCurrentPrice.scope}}
					                        </i>
										</span>
										<span v-if="type < 3">
										<i v-if="eventTop.eventCurrentPrice.updown" :class="eventTop.eventCurrentPrice.updown==1?'eventGroup_num_down' :eventTop.eventCurrentPrice.updown==2 ? 'eventGroup_num_top':''">
				                        <img v-if="eventTop.eventCurrentPrice.updown==1" src="../../../assets/img/index_down.png"/>
						                <img v-if="eventTop.eventCurrentPrice.updown==2" src="../../../assets/img/index_top.png"/>
				                        {{eventTop.eventCurrentPrice.scope}}
				                        </i>
				                        </span>
									</div>
									<table class="five_table" border="0" cellspacing="0" cellpadding="0">
										<tbody>
											<tr v-for="(item,index) in fivePrice.buyPrice">
												<td><span class="red">{{buyFiveKey[index]}}</span></td>
												<td>{{item.price=='--'?'--':item.price|decimal|market}}</td>
												<td>{{item.count|comdify}}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<!-- five end -->
								<div class="order_right flex1">
									<div class="right_cc">
										<div class="right_item displayFlex">
											<div class="text">持仓均价：</div>
											<div class="text2 flex1">{{eventTop.eventDetailDataResponse.positionAverage}}</div>
										</div>
										<div class="right_item displayFlex">
											<div class="text">持仓数量：</div>
											<div class="text2 flex1">{{eventTop.eventDetailDataResponse.positionQuantity|comdify}}</div>
										</div>
									</div>
									<div>
										<div class="right_item displayFlex">
											<div class="text">{{tabList[0]}}价格：</div>
											<div class="text2 flex1">{{disbled==true ? '--' : currentbuy|market}}</div>
										</div>
										<div class="right_item displayFlex">
											<div class="text">{{tabList[0]}}数量：</div>
											<div class="text2 flex1"><input type="number" v-model="counter" :disabled="disbled"></div>
										</div>
										<div class="right_item displayFlex">
											<div class="text">最大可{{buyName}}数量：</div>
											<div class="text2 flex1">{{disbled==true ? 0 : currentTotal|comdify}}</div>
										</div>
										<div class="order_tips">
											选择市价交易时， 按照五档价格中最优价格撮合成交
										</div>
									</div>
									<div class="right_acount">
										<div class="right_item displayFlex">
											<div class="text yue">余额：</div>
											<div class="text2 flex1" style="text-align:right">
												{{accountcurrency|comdify}}
												<img v-if="eventGroup.shared==1" :title="this.$store.state.weilaiTitle" src="../../../assets/img/eventGroup/event_weilai.png"/>
	                            				<img v-if="eventGroup.shared==0" :title="this.$store.state.wuxianTitle" src="../../../assets/img/eventGroup/event_wuxian.png"/>
	                            				<router-link tag="a" to="/personal/recharge" v-if="eventGroup.shared==1" class="chong_btn"><span>充值</span></router-link>
	                            			</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- trade end -->
						<div class="success_yu" v-if="!disbled && eventGroup.groupEventType">
							如果预测成功，预计赚{{yuceProfit|decimal}}
							<img v-if="eventGroup.shared==1" :title="this.$store.state.jindouTitle" src="../../../assets/img/eventGroup/event_jindou.png"/>
                        	<img v-if="eventGroup.shared==0" :title="this.$store.state.wuxianTitle" src="../../../assets/img/eventGroup/event_wuxian.png"/>
						</div>
						<div class="success_yu" v-if="disbled">
							当前五价暂无挂单，您可以自定义价格进行挂单
						</div>
						<div class="order_btn_box displayFlex flexCenter">
							<a href="javascript:;" class="yes" @click="getsure()" v-if="!disbled">确认</a>
							<a href="javascript:;" class="yes disbld" v-if="disbled">确认</a>
							<a href="javascript:;" class="concel" @click="cancel">取消</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="confirm_dialog" v-if="isBuyModal">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box" id="Text">
							{{resultmassage}}
						</div>
					</div>
					<div class="confirm_btn">
						<router-link to="/personal/orders" tag="button">我的订单</router-link>
						<button @click="confir">继续下单</button>
					</div>
				</div>
			</div>
			<div class="mask"></div>
		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
		<Aalert :text='alertText' v-if='alert'></Aalert>
	</div>
	
</template>

<script>
	import Eventtop from '../eventtop'
	import Login from '../../common/Login'
	import Aalert from '../../common/alert'
	export default {
		data() {
			return {
				uView:false,//持仓板块是否显示
				accountcurrency:0,//账户余额
				eventTop:{
					eventCurrentPrice:{
						currentPrice:0,
						updown:0
					}
				},
				orderShow:false,
				eventGroup:{},
				activeTab:0,//详情TAB切换
				eventDetail:'',//题材详情
				ruleData:'',//题材规则
				fivePrice:{
					buyPrice:[],//买入五价
					sellPrice:[]//卖出五价
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
				currentPrice:0,
				eventVis:false,//头部是否显示
				isShowLoginModal:false,//登录显示隐藏
				isBuyModal:false,
				buttonhide:false,
				resultmassage: '',
				isSHow: false,
				alert:false,
				alertText:'',
				yesType:'',
				buyFiveKey:['买一','买二','买三','买四','买五'],
				sellFiveKey:['卖五','卖四','卖三','卖二','卖一'],
				tabList:['买入','市价买入'],
				buyName:'买',
				tradeType:'Yes',
				currentbuy:'',//购买价格
				counter:1,//购买数量
				currentTotal:0,//最大可购数量
				type:1,//购买类型 1买入yes  2卖出yes  3买入no  4卖出no
				disbled:false,
				delegateType:0,
				moreMoney:false
			}
		},
		components: {
			Eventtop,
			Login,
			Aalert
		},
		created() {
			this.init();
			this.$Bury(window.location.href,this.$route.params.id,3,'xiadanyemian_04018');
			setTimeout(() => {				
				this.getEvent();
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
				var n = n.toString();
				if(typeof n == 'string'){
					let re = /\d{1,3}(?=(\d{3})+$)/g;
						let n1 = n.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
							return s1.replace(re, "$&,") + s2;
						});
				return n1;
				}
				
			}
		},
		methods: {
			//点击显示宝箱弹层
			showBoxModal() {
				this.isBox = !this.isBox;
			},
			hideLoginModal(){
				this.isShowLoginModal = false;
			},
			cancel(){
				this.$router.push({path:'/event/'+this.$route.params.id})
			},
			init(){
				this.type = this.$route.query.type;
				switch(parseInt(this.type)){
					case 1:
					this.tabList=['买入','市价买入'];
					this.tradeType='Yes';
					this.buyName = '买';
					break;
					case 2:
					this.tabList=['卖出','市价卖出'];
					this.tradeType='Yes';
					this.buyName = '卖';
					break;
					case 3:
					this.tabList=['买入','市价买入'];
					this.tradeType='No';
					this.buyName = '买';
					break;
					case 4:
					this.tabList=['卖出','市价卖出'];
					this.tradeType='No';
					this.buyName = '卖';
					break;
				}
			},
			decimal(val) {
				if(val.toFixed) {
					return val.toFixed(2)
				} else {
					return val
				}
			},
			//详情
			getEvent() {
				this.$CPOST('/event/v1/eventInformation/queryEventInformation', {
						eventId: this.$route.params.id
					}, (res) => {
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
			            	if(this.eventGroup.shared == true)
								this.yue()
							else {
								this.Eventyue()
							}
			            }
						
						
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
								}else if (value2 > value1) { 
									return -1; 
								} 
								else { 
									return 0; 
								} 
							} 
						}
						var buyPrice = res.resultValue.eventInformationEntity.fivePriceResponse.buyFivePrice;
						var sellPrice = res.resultValue.eventInformationEntity.fivePriceResponse.sellFivePrice;
						// console.log(JSON.stringify('1111='+this.sellPrice.sellPrice))
						if(this.type<=2){
							this.fivePrice.buyPrice = buyPrice;
							this.fivePrice.sellPrice = sellPrice;
							// this.fivePrice.buyPrice.sort(maxArr('price'));
							this.fivePrice.sellPrice.sort(minArr('price'));
						}else{
							for(let i=0;i<sellPrice.length;i++){
								let obj = {
									price:100 - sellPrice[i].price,
									count:sellPrice[i].count
								}
								this.fivePrice.buyPrice[i] = obj;
							}
							for(let i=0;i<buyPrice.length;i++){
								let obj = {
									price:100 - buyPrice[i].price,
									count:buyPrice[i].count
								}
								this.fivePrice.sellPrice[i] = obj;
							}
							this.fivePrice.sellPrice.sort(minArr('price'));
						}
						var buyLenth = this.fivePrice.buyPrice.length;
						var sellLenth = this.fivePrice.sellPrice.length;
						console.log(buyLenth,sellLenth)
						var nullPrice = {
								count: "--",
								price: "--"
							}
						if(buyLenth < 5) {
							for(var i = 0; i<5-buyLenth; i++){
								this.fivePrice.buyPrice.push(nullPrice)
							}
						}
						if(sellLenth < 5) {
							
							for(var i = 0; i<5-sellLenth; i++){
								this.fivePrice.sellPrice.unshift(nullPrice)
							}
						}
						if(this.type == 1 || this.type == 3){
							if(sellLenth == 0){
								this.disbled = true;
							}
						}else{
							if(buyLenth == 0){
								this.disbled = true;
							}
						}
						
						
						this.orderInit();
					
					})
			},
			orderInit(){
				if(this.activeTab === 1){
					switch(parseInt(this.type)){
						case 1:
						var len = this.fivePrice.sellPrice.length - 1;
						this.currentbuy = this.decimal(this.fivePrice.sellPrice[len].price);
						this.currentTotal = this.fivePrice.sellPrice[len].count;
						break;
						case 2:
						this.currentbuy = this.decimal(this.fivePrice.buyPrice[0].price);
						var youCount = this.fivePrice.buyPrice[0].count;
						var chicang = this.eventTop.eventDetailDataResponse.positionQuantity;
						this.currentTotal = youCount < chicang ? youCount : chicang;
						break;
						case 3:
						var len = this.fivePrice.sellPrice.length - 1;
						this.currentbuy = this.decimal(this.fivePrice.sellPrice[len].price);
						this.currentTotal = this.fivePrice.sellPrice[len].count;
						break;
						case 4:
						this.currentbuy = this.decimal(this.fivePrice.buyPrice[0].price);
						var youCount = this.fivePrice.buyPrice[0].count;
						var chicang = this.eventTop.eventDetailDataResponse.positionQuantity;
						this.currentTotal = youCount < chicang ? youCount : chicang;
						break;
					}
				}else{
					this.currentbuy = '';
				}
			},
			getsure(n) {
				if(this.$store.state.refreshToken == '') {
					this.isShowLoginModal = true
				} else {
					var total = this.activeTab == 0 ? Number(this.maxBuyNum) : Number(this.currentTotal);
					var reg =  /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
					if(this.activeTab === 0){
						var curPrice = Number(this.currentbuy).toFixed(3)
						// this.currentbuy = curPrice.substring(0,curPrice.lastIndexOf('.')+3)						
					
						if(!reg.test(this.currentbuy)){
							this.alertDailog('请输入正确价格');
							return false;
						}
						
						if(this.currentbuy <= 0){
							this.alertDailog('请输入大于0的数字');
							return false;
						}
						if(this.currentbuy >= 100){
							this.alertDailog('请输入小于100的数字');
							return false;
						}
						if(this.currentbuy > Number(this.accountcurrency) && this.eventGroup.share == 1){
							this.alertDailog('您的余额不足，请充值！');
							return false;
						}
					}
					if(!reg.test(this.counter)){
							this.alertDailog('请输入正确数量');
							return false;
						}
					if(this.counter <= 0) {
						this.alertDailog('下单数量不能为0');
						return false;
					}
					if(this.counter == ''){
						this.alertDailog('下单数量不能为空');
						return false;
					}
					if(Number(this.counter) > total){
						this.alertDailog('下单数量不能超出最大购买数量');
						return false;
					}
						if(this.$postFlag){
							this.$postFlag = false;
							this.delegateType = this.activeTab;
			                this.$CPOST('/order/v1/order/saveOrder',{
									delegateType: this.delegateType,
									eventId: this.$route.params.id,
									expireSycned: "1",
									groupId: this.eventGroup.groupId,
									placePrice: this.currentbuy == "--" ? "0" : this.currentbuy,
									placeQuantity: this.counter,
									tradeType: this.type
						        },(res) =>{
									
									this.isBuyModal = true;
									if(res.resultCode == 200) {
										this.resultmassage = "下单成功";
										this.isSHow = true;
									} else {
										this.resultmassage = res.resultMessages;
										this.buttonhide = true;
										this.isSHow = false;
									}
						    })
					    }
				    
				}
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
				this.activeTab = index;
				this.orderInit();
				if(index === 1){
					this.$Bury(window.location.href,this.$route.params.id,3,'shijiamairu_05008');
				}
			},
			alertDailog(txt){
				this.alert = true;
				$('.confirm_modal').show();
				this.alertText=txt;
			},
			confir(v) {
				this.$Bury(window.location.href,this.$route.params.id,3,'jixuxiadan_05006');
				this.isBuyModal = false;
				this.$postFlag = true;
				if(v!=2){
					setTimeout(()=>{
						this.$router.go(0);
					},300)
				}
			}

		},
		computed:{
			yuceProfit(){
				var reg =  /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
				if(!reg.test(this.currentbuy) || !reg.test(this.counter)){
					return 0;
				}else{
					if(Number(this.currentbuy) > 0){
						return (100-Number(this.currentbuy))*Number(this.counter);					
					}else{
						return 0;
					}
				}
			},
			maxBuyNum(){
				if(this.type == 2 || this.type == 4){
					return this.eventTop.eventDetailDataResponse.positionQuantity
				}else{
					if(this.currentbuy != '' && this.currentbuy != '--' && this.currentbuy > 0){
						return Math.floor(this.accountcurrency/this.currentbuy).toFixed(0);
					}else{
						return '';
					}
				}
			}
		},
		watch:{
			currentbuy(curVal){
				if(curVal != '' && this.activeTab === 0){
					if(curVal>=99.99){
						this.currentbuy = 99.99
					}else if(curVal<0.01){
						this.currentbuy = 0.01
					}else{
						if(curVal.indexof('.') > 0){
							var len = curVal.split('.')[1].length;
							if(len > 2){
								this.currentbuy = Number(curVal).toFixed(2);
							}
						}
					}
				}
			},
			counter(curVal){
				console.log('curVal=='+curVal+'maxBuyNum=='+this.maxBuyNum)
				if(curVal != ''){
					if(Number(curVal)< 1){
						this.counter = 1;
					}
					if(this.activeTab === 0){
						if(Number(curVal)>=Number(this.maxBuyNum)){
							this.counter = this.maxBuyNum
						}
					}else{
						if(Number(curVal)>=Number(this.currentTotal)){
							this.counter = this.currentTotal
						}						
					}
					if(curVal.indexof('.') > 0){
						var len = curVal.split('.')[1].length;
						if(len > 0){
							this.counter = curVal.split('.')[0];
						}
					}
					
				}
			}
		}
	}
</script>

<style scoped>
	
	.hide {
		display: none !important;
	}
	.eventDetail {
		width: 1200px;
		margin: auto;
		margin-top: 29px;
	}
	/***下单***/
	
	
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
	
	.eventGroup_details {
		padding-top:25px; padding-bottom: 40px;
	}
	/*下单*/
	.order_box{width: 658px; border:solid 1px #d5d5d5; margin:0 auto; position: relative;}
	.order_box .order_top{height: 44px; line-height: 44px; color: #343434; font-size: 16px; background: #e9e9e9;border-bottom:solid 1px #d5d5d5;}
	.order_box .order_top>div{padding:0 10px; vertical-align: middle;}
	.order_box .order_top>div img{vertical-align: middle;}
	.order_box .order_five{width: 279px; border-right:solid 1px #d5d5d5; min-height: 300px;}
	.order_five .five_head{height: 30px;}
	.order_five .five_head li{text-align: center; line-height: 30px; color: #676767; font-size: 14px;}
	.order_five .five_table{width:100%;}
	.order_five .five_table td{width: 33.33%; text-align: center; line-height: 30px; color: 3333; font-size: 14px;}
	.order_five .five_table td .blue{color: #4867aa;}
	.order_five .five_table td .red{color: #c60c1b;}
	.order_five .new_price{border:solid 1px #d5d5d5; border-width:1px 0; line-height: 32px; text-align: center; color: #323232; width: 90%; margin:0 auto;}

	.order_right{padding:0 10px;}
	.order_right .right_cc{border-bottom: solid 1px #d5d5d5; padding:10px 0; margin-bottom: 10px;}
	.order_right .right_item{margin-bottom: 10px; line-height: 32px;}
	.order_right .right_item .text{width: 125px; color: #323232; font-size: 16px;padding-left: 20px;}
	.order_right .right_item .text.yue{width: 60px;}
	.order_right .right_item .text2{font-size: 18px;}
	.order_right .right_item .text2 input{width: 80%; height: 30px; border:solid 1px #e6e6e6; padding-left: 10px; font-size: 18px;}
	.order_right .right_item .text2 img,.success_yu img{vertical-align: middle;}

	.order_right .right_acount{border-top: solid 1px #d5d5d5; padding-top: 15px; position: absolute; width: 360px; right: 10px; bottom:10px;}
	.order_right .order_tips{color: #676767; font-size: 12px; padding-left: 20px;}
	.chong_btn{display: inline-block; line-height: 24px; padding:0 15px; color: #c71220; font-size: 12px; border:solid 1px #dfdfdf; vertical-align: middle; border-radius: 3px;}
	.chong_btn span{display: inline-block; background: url('../../../assets/img/eventGroup/event_chong.png') no-repeat left center; padding-left: 16px;}
	.chong_btn:hover{border-color:#c71220;}

	.success_yu{text-align: center; color: #676767; font-size: 14px; padding-top: 20px;}
	.order_btn_box{ padding-top: 20px;}
	.order_btn_box a{display: block; width: 100px; height: 32px; margin:0 22px; text-align: center; font-size: 14px; border-radius: 3px; line-height: 32px;}
	.order_btn_box a.yes{color: #fff;background: -webkit-linear-gradient(#f92927,#d10602);
        background: -moz-linear-gradient(#f92927,#d10602);
        background: linear-gradient(#f92927,#d10602);}
    .order_btn_box a.yes:hover{color: #fff;background: -webkit-linear-gradient(#d10602,#f92927);
        background: -moz-linear-gradient(#d10602,#f92927);
        background: linear-gradient(#d10602,#f92927);}

    .order_btn_box a.yes.disbld{background: #dfdcdc;}

    .order_btn_box a.concel{height: 30px; line-height: 30px; color: #323232; border:solid 1px #e3e3e3;}
    .order_btn_box a.concel:hover{border-color:#888;}
	.eventGroup_num_top {
		color: #c60c1b;
	}
	
	.eventGroup_num_down {
		color: #098959;
	}
	.confirm_dialog{}
	.confirm_dialog .mask{width: 100%; height: 100%;background: rgba(0,0,0,.7); position: fixed; z-index: 999; left: 0; top: 0;}
	.confirm_box {
		width: 435px;
		height: 196px;
		background: #e6e6e6;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		z-index: 1000;
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
	.buttona {
		text-align: center;
	}
	.buttona>button {
		cursor: pointer;
		width: 86px;
		height: 23px;
		background: red;
		border: none;
		color: white;
		border-radius: 2px;
	}
	
	.buy_best_price tr {
		height: 40px;
	}
	
	.buy_best_price tr td {
		height: 100%;
	}
	
	.placeOrder_main.eventD_price_buy .buy_best_price {}
	.buttona{
		text-align: center;
	}
	.buttona button{
		width: 72px;
		height: 30px;
	    border-radius: 4px;
	    border: none;
	    color: white;
	    background: #f52f3e;
	    cursor: pointer;
	}
</style>
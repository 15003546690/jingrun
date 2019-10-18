<template>
	<div class="placeOrder_modal">
		<!-- v-show="buyLayer"-->
		<div class="report_main" v-if="isOrder">
			<div class="placeOrder_box" v-show="oderter">
				<!-- v-show="islayer"-->
				<div class="placeOrder_yes">
					<div class="placeOrder_top placeOrder_yes">
						<p>买入【Yes】</p>
						<p>卖出【Yes】</p>
						<span class="placeOrder_close">
							<img @click="hideindex" src="../../assets/img/eventGroup/event_close.png"/>
						</span>
					</div>
					<div class="placeOrder_main">
						<table class="eventD_price_buy" border="0" cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<th>最优价</th>
									<th>数量</th>
								</tr>
							</thead>
							<tbody class="buy_best_price">
								<tr v-for="item in buyPrice" :key="item.count" :buyPrice="item">
									<td>{{item.price=='--'?'--':item.price|decimal|market}}</td>
									<td>{{item.count}}</td>
								</tr>
							</tbody>
						</table>
						<p><img src="../../assets/img/fenge.png" /></p>
						<table class="eventD_price_buy" border="0" cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<th>最优价</th>
									<th>数量</th>
								</tr>
							</thead>
							<tbody class="buy_best_price">
								<tr v-for="item in sellPrice" :key="item.count" :sellPrice="item">
									<td>{{item.price=='--'?'--':item.price|decimal|market}}</td>
									<td>{{item.count}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="placeOrder_main_text placeOrder_main_quick">
						<div class="placeOrder_way">
							<span>快速下单：</span>
							<p>
								<i class="placeOrder_way_check" @click="showToggle">
                        	        <img v-if="isChecked" src="../../assets/img/eventGroup/checked.png"/>
                                </i>
								<label>是</label>
							</p>
							<p>
								<i @click="showToggle">
                        	      <img v-if="!isChecked" src="../../assets/img/eventGroup/checked.png"/>
                                </i>
								<label>否</label>
							</p>
						</div>
						<p class="placeOrder_price" v-if='Toggleshow'>
							<span  v-if="n==1">买入价格：</span>
							<span  v-if="n==2">卖出价格：</span>
							<input type="text" v-model="currentbuy" />
						</p>
						<div class="placeOrder_num">
							<span v-if="n==1">买入数量：</span>
							<span v-if="n==2">卖出数量：</span>
							<p class="placeOrder_num_text">
								<i v-on:click="min"><img src="../../assets/img/eventGroup/subtract.png"/></i>
								<input type="text" v-model="counter" id="searchVal" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'1')}"/>
								<i v-on:click="add"><img src="../../assets/img/eventGroup/add.png"/></i>
							</p>
							<i>份</i>
						</div>
						<!--0是评鉴   1是预测-->
						<p class="placeOrder_predict" v-show="Toggleshow" v-if="eventTop.eventType==1 && n==1">
							如果预测成功，预计赚
							<i>{{yuceProfit|decimal}}</i>
							<img src="../../assets/img/eventGroup/event_jindou.png" />
						</p>

						<p class="placeOrder_hint" v-if="explainshow">选择[快速下单]时，系统会以当前最优价快速成交</p>
						<button class="placeOrder_btn" @click="getsure(n)">确定</button>
					</div>
				</div>
			</div>
		</div>
		<div class="confirm_box" v-if="isBuyModal">
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
				<div class="confirm_btn" v-show="isSHow">
					<router-link to="/personal/orders" tag="button">我的订单</router-link>
					<button @click="confir">继续下单</button>
				</div>
				<div class="buttona" @click="confir(2)" v-show="buttonhide"><button>取消</button></div>
			</div>
		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"/>
		<Aalert :text='alertText' v-if='alert'></Aalert>
	</div>
</template>
<script>
	import sayno from './sellmonolayer'
	import confire from './confirmModal'
	import Login from '../common/Login'
	import Aalert from '../common/alert'
	export default {
		props: [
			'n',
			'buyNo',
			'sellYes',
			'buyPrice',
			'sellPrice',
			'eventDetail',
			'eventTop',
			'groupid',
		],
		components: {
			sayno,
			confire,
			Login,
			Aalert
		},
		data() {
			return {
				saveOrder: [],
				counter: 1,
				currency: null,
				buyLayer: true,
				islayer: true,
				conModel: false,
				isChecked: true,//快速下单是否选项
				explainshow: true,
				token: null,
				loginToken: null,
				currentPrice: null,
				delegateType: null,
				eventid: null,
				tradeType: null,
				isshowindex: false,
				showindex: false,
				tradeType: 1,
				isBuyModal: false,
				isOrder: true,
				aaa: false,
				resultmassage: '',
				isSHow: false,
				buttonhide: false,
				type: '',
				Toggleshow: false,
				oderter: true,
				isShowLoginModal: false,
				isquickly:true,
				currentbuy:0,
				alert:false,
				alertText:'',
			}
		},
		filters: {
			decimal: function(val) {
				if(val.toFixed) {
					return val.toFixed(2)
				} else {
					return val
				}
			},
			market: function(value) {
				return value == 0 || value == 100 ? '市价' : value
			}
		},
		created() {
			this.getbuyPrice()
		},
		methods: {
			hideindex() {
				this.$emit('hideindex')
			},
			add() {
				if(this.counter != '' && parseInt(this.counter) >= 0){
					this.counter = parseInt(this.counter) + 1;
				}
			},
			min: function() {
				if(this.counter > 0) {
					this.counter = parseInt(this.counter) - 1;
				}
			},
			alertDailog(txt){
				this.alert = true;
				$('.confirm_modal').show();
				this.alertText=txt;
			},
			showToggle: function() {
				this.isChecked = !this.isChecked;
				this.Toggleshow = !this.Toggleshow;
				this.explainshow = !this.explainshow;
				this.isquickly = !this.isquickly;
			},
			hideLoginModal() {
				this.isShowLoginModal = false
			},
			//详情
			getbuyPrice() {
				this.eventid = this.eventTop.eventId;
				//最优价填写
				var currentPricee = 0;
				if(this.n == 1) {
					currentPricee = this.buyPrice[0].price;
				} else {
					currentPricee = this.sellPrice[0].price;
				}
				if(currentPricee == "--") {
					this.currentbuy = 0
				} else {
					this.currentbuy = currentPricee
				}
			},
			getsure(n) {
				if(this.$store.state.refreshToken == '') {
					this.isShowLoginModal = true
				} else {
					this.islayer = false;
					this.delegateType = this.isChecked ? 1 : 0;
					if(this.counter <= 0) {
						this.alertDailog('下单数量不能为0');
						return false;
					}else if(this.counter > 1000000){
						this.alertDailog('下单数量不能超出一百万');
						return false;
					} else {
						if(this.Toggleshow){
							var curPrice = Number(this.currentbuy).toFixed(3)
							this.currentbuy = curPrice.substring(0,curPrice.lastIndexOf('.')+3)
							var reg =  /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
						
							if(!reg.test(this.currentbuy)){
								this.alertDailog('请输正确数字');
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
						}
						this.$emit('update:sellYes', true)
						this.$emit('update:buyNo', false)
						// alert(this.isquickly)
						if(this.isquickly){
		                  this.currentbuy='1'
		                }
		                this.$CPOST('/order/v1/order/saveOrder',{
								delegateType: this.delegateType,
								eventId: this.eventid,
								expireSycned: "1",
								groupId: this.groupid,
								placePrice: this.currentbuy == "--" ? "0" : this.currentbuy,
								placeQuantity: this.counter,
								tradeType: this.n
					        },(res) =>{
								this.saveOrder = res.resultValue
								eventtype: this.eventType,
								this.isOrder = false;
								this.isBuyModal = true;
								this.getbuyPrice()
								var Text = document.getElementById('Text')
								if(res.resultCode == 200) {
									this.resultmassage = "下单成功"
								} else {
									this.resultmassage = res.resultMessages
									this.buttonhide = true
								}
								if(res.resultCode == 200) {
									this.isSHow = true
								} else {
									this.isSHow = false
								}
								if(res.resultValue.eventInformationEntity.fivePriceResponse.sellFivePrice[0] == 0){
									
								}
					    })
					    }
				}
			},
			confir(v) {
				this.hideindex();
				if(v!=2){
					this.$router.go(0);
				}
			}

		},
		computed:{
			yuceProfit(){
				if(parseInt(this.currentbuy) > 0){
					return (100-this.currentbuy)*this.counter;					
				}else{
					return 0;
				}
			}
		}

	}
</script>
<style scoped>
	/*******下单弹层******/
	
	.placeOrder_modal {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;
		background-size: 100%;
		z-index: 5;
		display: table;
	}
	
	.report_main {
		display: table-cell;
		vertical-align: middle;
	}
	
	.To_report {
		width: 318px;
		background: white;
		margin: 0 auto;
		vertical-align: middle;
		text-align: center;
		overflow: hidden;
	}
	
	.To_report_title {
		height: 35px;
		line-height: 35px;
		background: #f3f3f3;
	}
	
	.To_report_title span {
		float: left;
		font-size: 14px;
		color: #676767;
		margin-left: 20px;
	}
	
	.To_report_title a {
		float: right;
		margin-right: 10px;
	}
	
	.To_report_body {
		min-height: 73px;
		margin-top: 20px;
	}
	
	.To_report_body ul li {
		float: left;
		width: 50%;
		height: 36px;
		line-height: 36px;
		text-align: left;
		font-size: 14px;
		color: #676767;
	}
	
	.To_report_body ul li input {
		margin-left: 25px;
		margin-right: 7px;
		cursor: pointer;
	}
	
	.sub_mit {
		height: 30px;
		margin-top: 28px;
		text-align: center;
		margin-bottom: 12px;
		cursor: pointer;
	}
	
	.To_report .textarea {
		width: 288px;
		height: 80px;
		margin: 0 auto;
		display: none;
		position: relative;
	}
	
	.To_report .textarea textarea {
		width: 288px;
		height: 80px;
		line-height: 30px;
		resize: none;
		text-indent: 5px;
		border: solid 1px #e0e0e0;
	}
	
	.To_report .textarea span {
		height: 30px;
		line-height: 30px;
		position: absolute;
		bottom: -5px;
		right: 10px;
		font-size: 14px;
		color: #a9a9a9;
	}
	
	.textarea_main {
		display: block;
	}
	
	.comment_login_btn {
		cursor: pointer;
	}
	
	.To_view {
		height: 46px;
		line-height: 46px;
		font-size: 14px;
		color: #5e5e5e;
		text-align: center;
		margin-bottom: 8px;
	}
	
	.Leave_message {
		min-height: 104px;
	}
	
	.Leave_message_in {
		width: 1100px;
		min-height: 104px;
		float: right;
		margin-right: 8px;
	}
	
	.Leave_message_in textarea {
		width: 100%;
		min-height: 60px;
		border-radius: 2px;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		resize: none;
		outline: none;
		overflow-y: hidden;
		text-indent: 26px;
		font-size: 16px;
		border: solid 1px #d3d3d3;
		line-height: 18px;
		padding: 5px 0px;
	}
	
	.check_in_click {
		width: 100%;
		height: 82px;
		line-height: 82px;
		text-align: center;
		font-size: 16px;
		color: #333333;
	}
	
	.check_in_click a {
		cursor: pointer;
	}
	
	.Leave_message_button span {
		margin-right: 0 !important;
	}
	
	.placeOrder_box {
		width: 421px;
		padding: 6px;
		background: #e6e6e6;
		margin: auto;
		border: 1px solid #c9c9c9;
	}
	
	.placeOrder_yes {
		width: 419px;
		border: 1px solid #c2c2c2;
		background: #fff;
		position: relative;
	}
	
	.placeOrder_close {
		text-align: right;
		width: 100%;
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
	
	.placeOrder_top {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #c2c2c2;
		border-right: none;
		border-left: none;
		border-top: none;
	}
	
	.placeOrder_top>p {
		width: 50%;
		height: 100%;
		line-height: 50px;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		float: left;
		color: #3e97ff !important;
	}
	
	.placeOrder_yes>p {
		color: #f52f3e !important;
	}
	
	.placeOrder_no>p {
		color: #3e97ff;
	}
	
	.placeOrder_main {
		height: 260px;
		box-shadow: 0px 5px 13px -6px #c7c7c7;
	}
	
	.buy_best_price {}
	
	.eventD_price_buy {
		height: 260px;
		width: 49%;
		text-align: center;
		float: left;
	}
	
	.eventD_price_buy>thead>tr>th {
		width: 25%;
		height: 50px;
		color: #676767;
		font-size: 14px;
	}
	
	.eventD_price_buy>tbody>tr>td {
		height: 40px;
		color: #323232;
		font-size: 14px;
	}
	
	.placeOrder_main {
		border-bottom: solid 1px #c4c4c4;
	}
	
	.placeOrder_main>p {
		width: 2px;
		line-height: 260px;
		float: left;
	}
	
	.placeOrder_main>p>img {
		vertical-align: middle;
	}
	
	.placeOrder_main_text {
		width: 100%;
		background: #FFFFFF;
	}
	
	.placeOrder_way {
		height: 26px;
		line-height: 26px;
		color: #323232;
		font-size: 14px;
		margin-top: 14px;
	}
	
	.placeOrder_way>p {
		display: inline-block;
	}
	
	.placeOrder_way>p:nth-child(2) {
		margin-left: 10px;
	}
	
	.placeOrder_way>p:nth-child(3) {
		margin-left: 28px;
	}
	
	.placeOrder_way>p>i {
		vertical-align: middle;
	}
	/*.placeOrder_way>p>i>img {
		cursor: pointer;
	}
	*/
	/*.placeOrder_way>p>i>img+img {
		display: none;
	}
	
	.placeOrder_way>p>i.placeOrder_way_check>img+img {
		display: inline;
	}
	
	.placeOrder_way>p>i.placeOrder_way_check>img {
		display: none;
	}*/
	
	.placeOrder_way>p>i {
		width: 12px;
		height: 12px;
		line-height: 12px;
		border: solid 1px #cccccc;
		display: inline-block;
		border-radius: 50%;
		margin-top: -3px;
		cursor: pointer;
	}
	
	.placeOrder_way>p>i>img {
		vertical-align: middle;
		margin-top: -2px;
	}
	
	.placeOrder_price,
	.placeOrder_num {
		height: 32px;
		margin-top: 9px;
		color: #323232;
		font-size: 14px;
		margin-bottom: 10px;
	}
	
	.placeOrder_price>span,
	.placeOrder_way>span,
	.placeOrder_num>span {
		width: 172px;
		display: inline-block;
		text-align: right;
	}
	
	.placeOrder_price>input {
		height: 30px;
		line-height: 30px;
		width: 114px;
		border: 1px solid #e6e6e6;
		padding-left: 10px;
		outline: none;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		border-radius: 2px;
	}
	
	.placeOrder_num_text {
		width: 124px;
		height: 30px;
		font-size: 0;
		border: 1px solid #e6e6e6;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		border-radius: 2px;
		display: inline-block;
		vertical-align: middle;
	}
	
	.placeOrder_num_text>i {
		width: 32px;
		height: 30px;
		line-height: 30px;
		font-size: 0;
		text-align: center;
		display: inline-block;
		vertical-align: middle;
		cursor: pointer;
	}
	
	.placeOrder_num_text>i>img {
		vertical-align: middle;
	}
	
	.placeOrder_num_text>input {
		width: 60px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 0;
		outline: none;
		display: inline-block;
		vertical-align: middle;
	}
	
	.placeOrder_hint,
	.placeOrder_predict {
		height: 23px;
		line-height: 23px;
		color: #676767;
		font-size: 14px;
		text-align: center;
		margin-top: 10px;
		margin-bottom: 15px;
	}
	
	.placeOrder_predict>img {
		margin-left: 5px;
		vertical-align: text-top;
	}
	
	.placeOrder_btn {
		width: 93px;
		height: 32px;
		background: url(../../assets/img/eventGroup/event-btn.png) no-repeat center;
		color: #ffffff;
		font-size: 14px;
		display: block;
		margin: auto;
		border: 0;
		margin-bottom: 16px;
		cursor: pointer;
	}
	
	.placeOrder_main_quick .placeOrder_price {
		/*display: none;*/
	}
	
	.placeOrder_main_quick .placeOrder_predict {
		/*display: none;*/
	}
	
	.confirm_box {
		width: 435px;
		height: 196px;
		background: #e6e6e6;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
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
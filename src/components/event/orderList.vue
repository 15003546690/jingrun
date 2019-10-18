<template>
	<div>
		<div class="ticket_nav">
			<ul class="ticket_nav_tab">
	        	<li @click="orderTab(0)" :class="tabNum == 0 ? 'active' : ''">
	        		待成交
	        	</li>
	       		<li @click="orderTab(1)" :class="tabNum == 1 ? 'active' : ''">
	       			<i></i>
	       			持仓
	       		</li>
	       		<li @click="orderTab(2)" :class="tabNum == 2 ? 'active' : ''">
	       			<i></i>
	       			平仓
	       		</li>
	       	</ul>
       	</div>
       	<!--订单详情开始-->
       	<div class="positionBox">
       		<!-- 待成交开始 -->
			<div class="unsettled" v-if="tabNum == 0">
				<table border="0" cellspacing="0" cellpadding="0">
					<thead>
						<tr>
							<th class="td1">题材名称</th>
							<th class="td2">类型</th>
							<th class="td3">最新价</th>
							<th class="td4">价格</th>
							<th class="td5">待成交量</th>
							<th class="td6">委托总量</th>
							<th class="td7">交易货币</th>
							<th class="td8">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr class="content" v-for="(item,index) in orderAwait" :key="item.eventId">
							<td class="td1">
								<div>{{item.eventName}}</div>
								<p>下单时间：{{formatDate(item.createTime)}}</p>
							</td>
							<td class="td2">{{item.tradeType==1 ? '买入【YES】' : item.tradeType==2 ? '卖出【YES】' : item.tradeType==3 ? '买入【NO】' : item.tradeType==4 ? '卖出【NO】':''}}</td>
							<td class="td3" :class="item.upOrDown==1 ? 'color_green' : item.upOrDown==2 ? 'color_red' : ''">{{item.currentPrice}}
								<img v-if="item.upOrDown==2" src="../../assets/img/index_top.png"/>
								<img v-if="item.upOrDown==1" src="../../assets/img/index_down.png"/>
								{{item.range}}
							</td>
							<td class="td4" v-if="item.placePrice==100||0">市价</td>
							<td class="td4" v-else>{{item.placePrice}}</td>
							<td class="td5">{{item.remainQuantity}}</td>
							<td class="td6">{{item.placeQuantity}}</td>
							<td class="td7">
								<img v-if="item.currency==0" :title="$store.state.wuxianTitle" src="../../assets/img/center/infinite.png" />
								<img v-if="item.currency==1" :title="$store.state.weilaiTitle" src="../../assets/img/center/bean.png" />
							</td>
							<td class="td8">
								<a href="javascript:;" @click="showModal(index,item.orderId)">取消下单</a>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="noData" v-show="orderAwait.length == 0">
					<p><img src="../../assets/img/nodata_icon.png"/></p>
				</div>
			</div>
			<!-- 待成交结束 -->
			<!-- 持仓开始 -->
			<div class="unsettled" v-if="tabNum == 1">
				<table border="0" cellspacing="0" cellpadding="0">
					<thead>
						<tr>
							<th class="td1">题材名称</th>
							<th class="td2">类型</th>
							<th class="td3">最新价</th>
							<th class="td4">持仓均价</th>
							<th class="td5">数量</th>
							<th class="td6">持仓总成本</th>
							<th class="td7">交易货币</th>
							<th class="td8">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in orderPosition" :key="item.positionId">
							<td>
								<p>成交时间：{{formatDate(item.createTime)}}</p>
								<div>{{item.eventName}}</div>
							</td>
							<td class="td2" v-if="item.eventStatus !== 1">【{{item.positionType == 0 ? 'YES' : 'NO'}}】</td>
							<td class="td2" v-if="item.eventStatus == 1">申购</td>
							<td class="td3" v-if="item.eventStatus !== 1" :class="item.upOrDown==1 ? 'color_green' : item.upOrDown==2 ? 'color_red' : ''">{{item.currentPrice}}
								<span v-if="item.upOrDown!=0">
									<img v-if="item.upOrDown==2" src="../../assets/img/index_top.png"/>
									<img v-if="item.upOrDown==1" src="../../assets/img/index_down.png"/>
									{{item.range}}
								</span>
							</td>
							<td class="td3" v-if="item.eventStatus == 1">{{item.middleRate}}</td>
							<td class="td4">{{item.middleRate}}</td>
							<td class="td5">{{item.positionQuantity}}</td>
							<td class="td6">{{item.positionAmount}}</td>
							<td class="td7">
								<img v-if="item.currency==0" :title="$store.state.wuxianTitle" src="../../assets/img/center/infinite.png"/>
								<img v-if="item.currency==1" :title="$store.state.weilaiTitle" src="../../assets/img/center/bean.png"/>
							</td>
							<td class="td8">
								<button class="a5_button" @click="positionList(item.positionId,item.eventName,item.currency,item.eventTime,item.eventStatus)">查看明细</button>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="noData" v-show="orderPosition.length == 0">
					<p><img src="../../assets/img/nodata_icon.png"/></p>
				</div>
			</div>			
			<!-- 持仓结束 -->
			<!-- 平仓开始 -->
			<div class="unsettled" v-if="tabNum == 2">
				<table border="0" cellspacing="0" cellpadding="0">
					<thead>
						<tr>
							<tr>
				    			<th class="a1">题材名称</th>
				    			<th class="a2">类型</th>
				    			<th class="a3">持仓</th>
				    			<th class="a4">收支</th>
				    			<th class="a5">操作</th>
				    		</tr>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in orderClear" :key="item.positionId">
	    			<td>
	    				<div>{{item.eventName}}</div>
	    				<!--<p>下单时间：{{formatDate(item.createTime)}}</p>-->
	    			</td>
	    			<td class="a2">{{item.positionStatus==0?'卖出':item.positionStatus==1?'持仓':item.positionStatus==2?'清算':''}}</td>
	    			<td class="a3">{{item.positionType==0?'【YES】':item.positionType==1?'【NO】':''}}</td>
	    			<td class="a4">
	    				<span>
		    				{{item.primeCost}}
		    				<img v-if="item.currency==0" src="../../assets/img/center/infinite.png" :title="$store.state.wuxianTitle"/>
							<img v-if="item.currency==1" src="../../assets/img/center/bean.png" :title="$store.state.weilaiTitle"/>
	    				</span>
	    				<span v-if="item.currency==1">
		    				+{{item.gold}}<img src="../../assets/img/center/venosa.png" :title="$store.state.jindouTitle"/>
	    				</span>
	    			</td>
	    			<td class="a5"><button class="a5_button" @click="positionList(item.positionId,item.eventName,item.currency)">查看明细</button></td>
	    		</tr>
					</tbody>
				</table>
				<div class="noData" v-show="orderClear.length == 0">
					<p><img src="../../assets/img/nodata_icon.png"/></p>
				</div>
			</div>
			<!-- 平仓结束 -->
	<!-- 		<div class="paging">
	  			<el-pagination
			      @size-change = "handleSizeChange"
			      @current-change = "handleCurrentChange"
			      :current-page = "currentPage"
			      :page-size = 1
			      layout = "prev, pager, next, jumper"
			      :total = "totalPage">
			    </el-pagination>
		  	</div> -->
			
			<div class="confirm_modal" v-if="isShow">
					<div class="confirm_box">
						<div class="confirm_main_or">
							<div class="confirm_main_head">
								<p>提示</p>
								<span @click='hideModal'><img src="../../assets/img/center/close.png"/></span>
							</div>
							<div class="confirm_text">
								<div class="confirm_text_box">
									<p>是否取消下单？</p>
								</div>
							</div>
							<div class="confirm_btn">
								<button @click='cancelOrder()'>确定</button>
								<button @click='hideModal'>取消</button>
							</div>
						</div>
					</div>
				</div>
		</div>
       	<!--订单详情结束-->
		<LookList v-if="isShowSign" :eventName="eventName" :status="status" :positionLists="positionLists" @hideSignModal="hideSignModal" />
	</div>
</template>
<script>
	import LookList from '../personal/order/lookList'
	export default {
		data() {
			return {
				tabNum:1,
				currentPage:1,
				isShowSign:false,//订单详细显示
				totalPage:0,
				status: 0,
				orderAwait:[],
				orderPosition:[],
				orderClear:[],
				noData:false,
				isShow: false,
				orderId: '',
				otherEventList:[],
				isShowSign:false,
				positionLists:[]
			}
		},
		components: {
			LookList
		},
		mounted(){
			this.userPosition();
		},
		methods:{
			formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
			},
			orderTab(num){
				this.tabNum = num;
				switch(num){
					case 0:
					this.userAwait();
					break;
					case 1:
					this.userPosition();
					break;
					case 2:
					this.userClear();
					break;
				}
			},
			//持仓列表
			userPosition () {
				/*持仓信息*/
		    	this.$CPOST('/order/v1/order/getUserPosition',{
		    		currency: 0,
			  		page: this.currentPage-1,
			  		eventId :this.$route.params.id,
					size: 60
		    	},(res) => {
		    		this.orderPosition = res.resultValue.orderPositionResponseList;
		    		this.totalPage = Math.ceil(res.resultValue.totalElements/6);
		    	})
		   	},
		   	//分页
		   	handleSizeChange(val) {
				this.pagesize = val;
	        	if(this.tabNum == 0){
	    			this.userAwait();
	    		}else if(this.tabNum == 2){
	    			this.userClear();
	    		}else{
	    			this.userPosition();
	    		}
		    },
		    //分页
		    handleCurrentChange(val) {
	    		this.currentPage = val;
	    		if(this.tabNum == 0){
	    			this.userAwait();
	    		}else if(this.tabNum == 2){
	    			this.userClear();
	    		}else{
	    			this.userPosition();
	    		}
		    },
	   		//待成交列表
	   		userAwait() {
	   			/*用户挂单信息*/
	   			this.$CPOST('/order/v1/order/findHangOrder',{
		    		currency: 0,
			  		page: this.currentPage-1,
			  		eventId :this.$route.params.id,
					size: 60
		    	},(res) => {
		    		this.orderAwait = res.resultValue.orderInfoResponseList;
		    		this.totalPage = Math.ceil(res.resultValue.totalElements/6);
		    	})
	   		},
	   		//平仓列表
	   		userClear() {
	   			this.$CPOST('/order/v1/order/getSettleAccounts',{
		    		currency: 0,
			  		page: this.currentPage-1,
			  		eventId :this.$route.params.id,
					size: 60
		    	},(res) => {
		    		this.orderClear = res.resultValue.orderEveningUpResponseList;
		    		this.totalPage = Math.ceil(res.resultValue.totalElements/6);
		    	})
	   		},
	   		cancelOrder() {
	        	this.$CPOST('/order/v1/order/cancelOrder',{
		          	orderId: this.orderId
		        },(res) => {
	 	           	this.hideModal();
	 	           	this.orderAwait.splice(this.listIndex,1);
		        })
	       	},
			positionList(positionId,eventName,currency,eventTime,status) {
				this.eventName = eventName;
				this.currency = currency;
				this.positionId = positionId;
				this.status = status;
	   			this.$CPOST('/order/v1/order/getPositionDetail', {
		    		currency: this.currency,
			  		positionId: this.positionId
		    	},(res) => {
		    		this.positionLists = res.resultValue.responses;
		    		this.showSignModal();
		    	})
			},
			showSignModal () {
		      this.isShowSign = true;
		   	},
		   	hideSignModal () {
		      this.isShowSign = false;
		   	},
		   	showModal(ind,itemId) {
				this.orderId=itemId
				this.isShow = true;
				this.listIndex = ind;
			},
			hideModal() {
				this.isShow = false;
			},
		}
	}
</script>
<style scoped>
.paging{text-align: center;}
/*订单*/

.ticket_nav{position: relative; margin-top: 15px; border-bottom: solid 2px #cfd3dc; height: 28px; margin-bottom: 20px;}
.ticket_nav>ul{position: absolute;left: 0;bottom: -2px; width: 100%; text-align: center;}
.ticket_nav>ul>li{width: 92px;display:inline-block; line-height: 26px;text-align: center;font-size: 14px;color: #676767;cursor: pointer; border-bottom: solid 2px transparent;}
.ticket_nav>ul>li>i{width: 1px; height: 12px; border-left: 1px solid #ced4e0; float: left; margin-top: 7px;}
.ticket_nav>ul>li>a{width: 100%; height: 100%; display: block; color: #676767;border-bottom: solid 2px #ced4e0;}
.ticket_nav>ul>li.active{color: #e52735;border-bottom: solid 2px #e52735;}
/*空白页*/
.noData{width: 100%;text-align: center;padding:50px 0;}
.unsettled>table{width: 100%;}
.unsettled>table>thead>tr>th{background: #f0f0f0;height: 42px;font-size: 14px;color: #323232; text-align: center;}
.unsettled>table>tbody>tr>td{height: 117px;font-size: 14px;color: #323232;border-bottom: solid 1px #eee; padding:0 10px;}
.unsettled>table>tbody>tr>td>div{line-height: 18px;font-size: 14px;color: #323232;}
.unsettled>table>tbody>tr>td>p{line-height: 20px;font-size: 12px;color: #a4a4a4;}
.unsettled>table>tbody>tr>td>a>button{width: 72px;height: 26px;border-radius: 2px;outline: none;border: none;color: white;font-size: 12px;background: #e52735;cursor: pointer;display: block;margin: auto;}
.unsettled>table>tbody>tr>td>a+a{width: 72px;height: 26px; display: block; line-height: 26px; text-align: center; margin: auto; color: #a4a4a4;font-size: 12px;}
.unsettled>table>tbody>tr>td>a+a:hover{text-decoration: underline;}
.td1{width: 25%;}
.td2,.td4,.td5,.td6,.td7,.td8{width: 10%;text-align: center;}
.td3{width: 15%;text-align: center;}
.td8 a{color: #999;}
.td3>span{margin-left: 7px;}
.a2,.a3,.a4,.a5{text-align: center;}
.a5_button{width: 72px;height: 26px;background: #e52735;color: white;font-size: 12px;border-radius: 2px;outline: none;border: none;cursor: pointer;}
.unsettled>table>thead>tr>th.td1,.unsettled>table>thead>tr>th.a1{padding-left: 30px; text-align: left;}
/*取消下单弹层*/
.confirm_modal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box{width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or{width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head{width: 100%;height: 32px;}
.confirm_main_head>p{float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span{display: block;float: right;cursor: pointer;}
.confirm_text{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;}
.confirm_btn{width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button{width: 98px;height: 32px;background: url(../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
</style>
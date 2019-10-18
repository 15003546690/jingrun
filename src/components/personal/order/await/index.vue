<template>
<div class="positionBox">
	<!--待成交-->
	<div class="unsettled" v-show="orderAwait">
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
					<td>
						<div>{{item.eventName}}</div>
						<p>下单时间：{{formatDate(item.createTime)}}</p>
					</td>
					<td class="td2">{{item.tradeType==1 ? '买入【YES】' : item.tradeType==2 ? '卖出【YES】' : item.tradeType==3 ? '买入【NO】' : item.tradeType==4 ? '卖出【NO】':''}}</td>
					<td class="td3" :class="item.upOrDown==1 ? 'color_green' : item.upOrDown==2 ? 'color_red' : ''">{{item.currentPrice}}
						<img v-if="item.upOrDown==2" src="../../../../assets/img/index_top.png"/>
						<img v-if="item.upOrDown==1" src="../../../../assets/img/index_down.png"/>
						{{item.range}}
					</td>
					<td class="td4" v-if="item.placePrice==100||0">市价</td>
					<td class="td4" v-else>{{item.placePrice}}</td>
					<td class="td5">{{item.remainQuantity}}</td>
					<td class="td6">{{item.placeQuantity}}</td>
					<td class="td7">
						<img v-if="item.currency==0" :title="$store.state.wuxianTitle" src="../../../../assets/img/center/infinite.png"/>
						<img v-if="item.currency==1" :title="$store.state.weilaiTitle" src="../../../../assets/img/center/bean.png"/>
					</td>
					<td class="td8">
						<router-link :to="/event/ + item.eventId" tag="a" ><button>继续下单</button></router-link>
						<a href="javascript:;" @click="showModal(index,item.orderId)">取消下单</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="noData" v-show="noData">
		<p><img src="../../../../assets/img/nodata_icon.png"/></p>
	</div>
	<div class="confirm_modal" v-if="isShow">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='hideModal'><img src="../../../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p>是否取消下单？</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='userAwait()'>确定</button>
						<button @click='hideModal'>取消</button>
					</div>
				</div>
			</div>
		</div>
</div>
</template>

<script>
export default{
	data() {
		return {
			isShow: false,
			orderId: '',
			listIndex:0,
			orderClear:true,
			noData:false
		}
	},
	props: {
		orderAwait:{
	        type: Array,
	        default() { return [1]; },
	      },
		totalPage:{
	        type: Number,
	        default() { return 0; },
	      },
	},
	created(){
		setTimeout(()=>{
			this.$emit('DCJ');
		},50)
	},
	methods: {
		formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
		},
		showModal(ind,itemId) {
			this.orderId=itemId
			this.isShow = true;
			this.listIndex = ind;
		},
		hideModal() {
			this.isShow = false;
		},
		userAwait() {
	        this.$CPOST('/order/v1/order/cancelOrder',{
	          	orderId: this.orderId
	        },(res) => {
 	           	this.hideModal();
 	           	this.orderAwait.splice(this.listIndex,1);
   	           	this.$Bury(window.location.href,this.orderId,3,'quxiaoxiadan_05003')
	        })
       	}
	}
}
</script>
<style scoped>
.positionBox{position: relative;width: 100%;min-height: 1006px;}
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
.unsettled>table{width: 100%;}
.unsettled>table>thead>tr>th{background: #f0f0f0;height: 42px;font-size: 14px;color: #323232;}
.unsettled>table>tbody>tr>td{height: 117px;font-size: 14px;color: #323232;border-bottom: solid 1px #eee;}
.unsettled>table>tbody>tr>td>div{line-height: 18px;font-size: 14px;color: #323232;}
.unsettled>table>tbody>tr>td>p{line-height: 20px;font-size: 12px;color: #a4a4a4;}
.unsettled>table>tbody>tr>td>a>button{width: 72px;height: 26px;border-radius: 2px;outline: none;border: none;color: white;font-size: 12px;background: #e52735;cursor: pointer;display: block;margin: auto;}
.unsettled>table>tbody>tr>td>a+a{width: 72px;height: 26px; display: block; line-height: 26px; text-align: center; margin: auto; color: #a4a4a4;font-size: 12px;}
.unsettled>table>tbody>tr>td>a+a:hover{text-decoration: underline;}
.td1{width: 182px;text-align: left;padding-left: 30px;}
.td2{width: 115px;text-align: center;}
.td3{width: 146px;text-align: center;}
.td3>span{margin-left: 7px;}
.td4,.td5{width: 94px;text-align: center;}
.td6{width: 90px;text-align: center;}
.td7{width:102px;text-align: center;}
/*取消下单弹层*/
.confirm_modal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box{width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or{width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head{width: 100%;height: 32px;}
.confirm_main_head>p{float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span{display: block;float: right;cursor: pointer;}
.confirm_text{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;}
.confirm_btn{width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button{width: 98px;height: 32px;background: url(../../../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
</style>
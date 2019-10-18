<template>
<div class="positionBox">
	<!--持仓-->
	<div class="Positions" v-show="orderClear">
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
							<img v-if="item.upOrDown==2" src="../../../../assets/img/index_top.png"/>
							<img v-if="item.upOrDown==1" src="../../../../assets/img/index_down.png"/>
							{{item.range}}
						</span>
					</td>
					<td class="td3" v-if="item.eventStatus == 1">{{item.middleRate}}</td>
					<td class="td4">{{item.middleRate}}</td>
					<td class="td5">{{item.positionQuantity}}</td>
					<td class="td6">{{item.positionAmount}}</td>
					<td class="td7">
						<img v-if="item.currency==0" :title="$store.state.wuxianTitle" src="../../../../assets/img/center/infinite.png"/>
						<img v-if="item.currency==1" :title="$store.state.weilaiTitle" src="../../../../assets/img/center/bean.png"/>
					</td>
					<td class="td8">
						<router-link :to="/event/ + item.eventId" tag="a" v-if="item.eventStatus != 1"><button>继续下单</button></router-link>
						<router-link :to="/subscribeDetail/ + item.eventId" tag="a" v-if="item.eventStatus == 1"><button>继续下单</button></router-link>
						<a href="javascript:;" @click="positionList(item.positionId,item.eventName,item.currency,item.eventTime,item.eventStatus)">查看明细</a>
					</td>
				</tr>
			</tbody>
		</table>
		<LookList v-if="isShowSign" :eventName="eventName" :currency="currency" :eventTime="eventTime" :status="status" :positionLists="positionLists" @hideSignModal="hideSignModal" />
	</div>
	<div class="noData" v-show="noData">
		<p><img src="../../../../assets/img/nodata_icon.png"/></p>
	</div>
</div>
</template>

    
<script>
import LookList from '../lookList'
	
export default{
	components: {
	    LookList
  	},
	data() {
		return {
			isShowSign: false,
			positionLists: [],
			eventName: '',
			currency: '',
			eventTime: '',
			status: 0,
			positionId: '',
			orderClear:true,
			noData:false
		}
	},
	props: {
		orderPosition:{
	        type: Array,
	        default() { return [1]; },
	      },
		totalPage:{
	        type: Number,
	        default() { return 0; },
	      },
	},
	methods: {
		handleSizeChange(val) {
			this.$emit('handleSizeChange')
		},
		handleCurrentChange(val) {
			this.$emit('handleCurrentChange')
		},
		formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
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
		goto(index){
	      if(index == this.current) return;
	        this.current = index;
	        this.userPosition ()
	    },
		showSignModal () {
	      this.isShowSign = true;
	   	},
	   	hideSignModal () {
	      this.isShowSign = false;
	   	}
	}
}
</script>

<style scoped>
.positionBox{position: relative;width: 100%;min-height: 1006px;}
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
.Positions>table{width: 100%;}
.Positions>table>thead>tr>th{background: #f0f0f0;height: 42px;font-size: 14px;color: #323232;}
.Positions>table>tbody>tr>td{height: 117px;font-size: 14px;color: #323232;border-bottom: solid 1px #eee;}
.Positions>table>tbody>tr>td:nth-child(2){text-align: center;}
.Positions>table>tbody>tr>td>div{line-height: 18px;font-size: 14px;color: #323232;}
.Positions>table>tbody>tr>td>p{line-height: 20px;font-size: 12px;color: #a4a4a4;margin-top: -23px;}
.td1{width: 182px;text-align: left;padding-left: 30px;}
.td2{width: 115px;text-align: center;}
.td3{width: 146px;text-align: center;}
.td3>span{margin-left: 8px;}
.td4,.td5{width: 94px;text-align: center;}
.td6{width: 90px;text-align: center;}
.td7{width:102px;text-align: center;}
.color_red{color: #c60c1b !important;}
.color_green{color: #098959 !important;}
.Positions>table>tbody>tr>td>a>button{width: 72px;height: 26px;border-radius: 2px;outline: none;border: none;color: white;font-size: 12px;background: #e52735;cursor: pointer;display: block;margin: auto;}
.Positions>table>tbody>tr>td>a+a{width: 72px;height: 26px; display: block; margin: auto; line-height: 26px; text-align: center; color: #e52735;font-size: 12px;}
.Positions>table>tbody>tr>td>a+a:hover{text-decoration: underline;}
.pagination {position: relative;}
.pagination li{display: inline-block;margin:0 5px;}
.pagination li a{padding:.5rem 1rem;display:inline-block;border:1px solid #ddd;background:#fff;color:#0E90D2;}
.pagination li a:hover{background:#eee;}
.pagination li.active a{background:#0E90D2;color:#fff;}
</style>
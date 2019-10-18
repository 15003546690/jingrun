<template>
<div class="positionBox">
	<!--平仓-->
	<div class="closeout" v-if="orderClear.length>0">
	    <table border="0" cellspacing="0" cellpadding="0">
	    	<thead>
	    		<tr>
	    			<th class="a1">题材名称</th>
	    			<th class="a2">类型</th>
	    			<th class="a3">持仓</th>
	    			<th class="a4">收支</th>
	    			<th class="a5">操作</th>
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
		    				<img v-if="item.currency==0" src="../../../../assets/img/center/infinite.png" :title="$store.state.wuxianTitle"/>
							<img v-if="item.currency==1" src="../../../../assets/img/center/bean.png" :title="$store.state.weilaiTitle"/>
	    				</span>
	    				<span v-if="item.currency==1">
		    				+{{item.gold}}<img src="../../../../assets/img/center/venosa.png" :title="$store.state.jindouTitle"/>
	    				</span>
	    			</td>
	    			<td class="a5"><button class="a5_button" @click="awaitList(item.positionId,item.eventName,item.currency)">查看明细</button></td>
	    		</tr>
	    	</tbody>
	    </table>
	    <LookList v-if="isShowSign" :eventName="eventName" :currency="currency" :positionLists="positionLists" @hideSignModal="hideSignModal" />
	</div>
	<div class="noData" v-if="noData">
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
			positionId:'',
			noData:false
		}
	},
	props: {
		orderClear:{
	        type: Array,
	        default() { return []; },
	      },
		totalPage:{
	        type: Number,
	        default() { return 0; },
	      },
	},
	created() {
		setTimeout(()=>{
			this.$emit('PC');
		},50)
	},
	methods: {
		formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
		},
		awaitList(positionId,eventName,currency) {
			this.eventName = eventName;
			this.currency = currency;
			this.positionId = positionId;
   			this.$CPOST('/order/v1/order/getPositionDetail', {
	    		currency: this.currency,
		  		positionId: this.positionId
	    	},(res) => {
	    		this.positionLists = res.resultValue.responses;
	    		this.showSignModal();
	    	})
		},
		showSignModal (){
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
.closeout>table{width: 100%;}
.closeout>table>thead>tr>th{font-size: 14px;color: #333;height: 42px;background: #f0f0f0;}
.closeout>table>tbody>tr>td{font-size: 14px;color: #333;height: 83px;border-bottom: solid 1px #eee;}
.closeout>table>tbody>tr>td>img{vertical-align: middle;margin-top: -2px;cursor: pointer;}
.closeout>table>tbody>tr>td>span>img{vertical-align: middle;margin-top: -2px;cursor: pointer;}
.closeout>table>tbody>tr>td>span:nth-child(2){margin-left: 10px;}
.a5_button{width: 72px;height: 26px;background: #e52735;color: white;font-size: 12px;border-radius: 2px;outline: none;border: none;cursor: pointer;float: right;}
.closeout>table>thead>tr>th.a1{width: 224px;text-align: left;padding-left: 29px;}
.closeout>table>thead>tr>th.a2{width: 238px;}
.closeout>table>thead>tr>th.a3{width: 88px;}
.closeout>table>thead>tr>th.a4{width: 294px;}
.closeout>table>thead>tr>th.a5{width:100px;text-align: right;padding-right: 48px;}
.closeout>table>tbody>tr>td>div{width: 214px;line-height: 18px;color: #323232;font-size: 14px;margin-left: 10px;}
.closeout>table>tbody>tr>td>p{width: 214px;line-height: 20px;color: #a4a4a4;font-size: 12px;margin-left: 10px;}
.closeout>table>tbody>tr>td.a2{width: 238px;text-align: center;}
.closeout>table>tbody>tr>td.a3{width: 88px;text-align: center;}
.closeout>table>tbody>tr>td.a4{width: 294px;text-align: center;}
.closeout>table>tbody>tr>td.a5{width:100px;text-align: right;padding-right: 27px;text-align: center;}
</style>
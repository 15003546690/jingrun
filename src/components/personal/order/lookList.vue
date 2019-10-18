<template>
<div class="masking">
	<div class="masking_most">
		<div class="masking_center">
		<div class="masking_center_body">
			<div class="masking_content">
				<div class="masking_content_main">
					<p class="masking_content_main_title">{{eventName}}</p>
					<!--<p class="masking_content_main_time">清算时间：{{formatDate(eventTime)}}</p>-->
					<div class="masking_content_box">
						<table border="0" cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<th class="x1">下单时间</th>
									<th class="x2">类型</th>
									<th class="x3">数量</th>
									<th class="x4">收支</th>
									<th class="x5">获利</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in positionLists">
									<td>{{formatDate(item.createTime)}}</td>
									<td v-if="status==1">申购</td>
									<td v-if="status!=1">{{item.tradeType==1?'买入【YES】':item.tradeType==3?'买入【NO】':item.tradeType==2?'卖出【YES】':'卖出【NO】'}}</td>
									<td>{{item.tradeQuantity}}份</td>
									<td>{{item.currency}}<img v-if="currency==0" src="../../../assets/img/center/infinite.png"/>
									<img v-if="currency==1" src="../../../assets/img/center/bean.png"/></td>
									<td>{{item.gold}}<img v-if="currency==1" src="../../../assets/img/center/venosa.png"/></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<img class="close" @click="hideSignModal" src="../../../assets/img/center/close.png"/>
			</div>
		</div>
	</div>
	</div>
</div>
</template>

<script>
export default{
	props: [
   		'positionLists',
   		'eventName',
   		'awaitLists',
   		'currency',
   		'status'
   	],
	methods: {
		hideSignModal () {
	      this.$emit('hideSignModal')
	   	},
	   	formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
		}
	}
}
</script>

<style scoped>
.masking{width: 100%;height: 100%;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: url(../../../assets/img/center/masking_03.png);background-size: 100% 100%;z-index: 3;}
.masking_most{width: 100%;height: 100%;display: table;}
.masking_center{display: table-cell;vertical-align: middle;}
.masking_center_body{width: 658px;height: 396px;background: #e6e6e6;margin: 0 auto;overflow: hidden;}
.masking_content{width: 640px;height: 382px;background: #fff;margin: 0 auto;margin-top: 6px;border: solid 1px #c9c9c9;position: relative;}
.masking_content_main{width: 608px;min-height: 226px;margin: 0 auto;padding-top: 12px;padding-bottom: 17px;}
.masking_content_main_title{font-size: 14px;line-height: 24px;color: #323232;font-weight: bold;}
.masking_content_main_time{font-size: 12px;color: #a4a4a4;line-height: 18px;margin-bottom: 9px;}
.masking_content_box{height: 300px;overflow: auto;}
.masking_content_box>table{width: 100%;}
.masking_content_box>table>thead>tr>th{line-height: 30px;font-size: 14px;color: #333;}
.masking_content_box>table>tbody>tr>td{line-height: 35px;font-size: 14px;color: #676767;text-align: center;}
.masking_content_box>table>tbody>tr>td>img{vertical-align: middle;margin-left: 2px;}
.x1{width: 136px;text-align: left;padding-left: 56px;}
.x2,.x3{width: 102px;}
.x4{width: 109px;}
.x5{width: 132px;}
.close{position: absolute;top: 0;right: 0;cursor: pointer;}
</style>
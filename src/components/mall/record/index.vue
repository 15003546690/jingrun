<template>
	<div class="right_box1_body_table orders-page">
		<table border="0" cellspacing="0" cellpadding="0">
			<thead>
				<tr>
				    <th class="td">兑换日期</th>
				    <th class="td2">商品图片</th>
				    <th class="td3">商品名称</th>
				    <th class="td5">兑换价格</th>
				    <th class="td6">交易状态</th>
				    <th class="td7">订单编号</th>
				    <th class="td8 td9">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in MyExchange">
				    <td >
				    	<p>{{formatDate(item.exchangeTime)}}</p>
				    </td>
				    <td class="td2"><img v-lazy="item.url"/></td>
				    <td class="td3">
				    	<p>{{item.goodsName}}</p>
				    </td>
				    <td class="td5"><a>{{item.price}}</a><img src="../../../assets/img/eventGroup/event_jindou.png"/></td>
				    <td class="td6" v-if="item.orderStatus==0">未发货</td>
				    <td class="td6" v-if="item.orderStatus==1">已发货</td>
				    <td class="td7"><p>{{item.orderId}}</p></td>
				    <td :class="item.goodsType==1 ? 'font_soli' :'hide'">
				    	<p @click="istics(index)">物流信息</p>
				    </td>
				    <td :class="item.goodsType==0 ? 'td8' : 'hide'">
				    	<p v-on:click="isInfo(index)">查看卡密</p>
				    </td>
				</tr>
			</tbody>
		</table>
		<div class="paging">
			<el-pagination
		      	@current-change = "handleCurrentChange"
		      	:current-page = "currentPage"
		      	:page-size = 1
		      	layout = "prev, pager, next"
		      	:total = "totalPage">
		    </el-pagination>
	  	</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			MyExchange:[],
			oodId:null,
			derId:null,
			currentPage: 1,
			totalPage: null
		}
	},
	created () {
		this.$Bury(window.location.href,'',0,'wodeduihuan_03016')
		setTimeout(() => {
			this.getMyExchange()
		},50)
	},
	methods:{
		formatDate(timestamp) {
			return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
		},
	    handleCurrentChange(val) {
			this.currentPage = val;
			this.getMyExchange();
	    },
		getMyExchange () {
	        this.$CPOST('/mall/v1/mall/getMyExchange', {
			 page: this.currentPage-1,
			 size: 5
	      },(res) => {
 			this.MyExchange = res.resultValue.myExchanges;
 			this.totalPage = Math.ceil(res.resultValue.totalElements/5);
	      })
	    },
	    istics(i){
	    	this.oodId=this.MyExchange[i].goodsId;
	    	this.derId=this.MyExchange[i].orderId;
	    	this.$router.push({path:'/mall/logistics',query:{oodId:this.oodId,derId:this.derId}});
	    },
	    isInfo(i){
	    	this.oodId=this.MyExchange[i].goodsId;
	    	this.derId=this.MyExchange[i].orderId;
	    	this.$router.push({path:'/mall/info',query:{oodId:this.oodId,derId:this.derId}});
	    }
	}
}
</script>
<style scoped>
.paging{position: absolute;bottom: 96px;width: 971px;}
.el-pagination{text-align: center;}
.right_box1_body_table{min-height:600px;}
table{width: 960px;display:inline-block;border: solid 1px #e8e8e8;margin-bottom: 20px;}
thead,tbody{width: 960px;}
th{width: 114px;height: 48px;line-height: 48px;font-size: 14px;color: #262626 !important;background: #f4f4f4;}
tbody>tr{height: 69px;}
td{width: 114px;height: 69px;text-align: center;font-size: 12px;color: #45413e;border-top: solid 1px #e8e8e8;word-break: break-word;}
.td2{width: 116px;}
.td2>img{height:59px;vertical-align: middle;}
.td3{width: 137px;}
.td5{width: 180px;}
.td5>img{margin-left: 5px;vertical-align: text-bottom;}
.td6{width: 120px !important;}
.td7{width: 180px;}
.td8{width: 140px;color: #aaa !important;cursor: pointer;}
td>a{color: #dd2727;font-size: 14px;}
.font_soli{color: #dd2727 !important;cursor: pointer;}
.td7>p{line-height: 16px;}
.td9{color: #262626 !important;}
</style>
<template>
	<div class="activities">
    	<!--最近交易的题材-->
		<div class="center_page_table">
			<div class="center_page_table_top">
				<p>最近交易题材</p>
			</div>
			<div v-if="neweventdata != null">
				<table border="0" cellspacing="0" cellpadding="0" class="table_one">
			        <thead>
			          <tr>
			            <th class="thed1">到期时间</th>
			            <th class="thed2">题材名称</th>
			            <th class="thed3">状态</th>
			            <th class="thed4">持仓</th>
			            <th class="thed5">平均买价</th>
			            <th class="thed6">现价</th>
			            <th class="two_tt">操作</th>
			          </tr>
			        </thead>
			        <tbody>  
			          <tr v-for="elem in neweventdata" :key="elem.eventId">
			            <td>
			              <P>{{formatDate(elem.eventEndTime)}}</P>
			            </td>
			            
			            <td class="thed2"><p>{{elem.eventName}}</p></td>
			            <td>
			            	<p v-if="elem.eventStatus==0">交易中</p>
			            	<p v-if="elem.eventStatus==1">已暂停</p>
			            	<p v-if="elem.eventStatus==2">已清算</p>
			            	<p v-if="elem.eventStatus==3">待清算</p>
			            </td>
			            <td>
			            	<p>{{elem.positionType==0?'【YES】':'【NO】'}}</p>
			                <p>{{elem.positionQuantity}}份</p>
			            </td>
			            <td>{{elem.averagerice}}</td>
			            <td>{{elem.currentPrice}}</td>
			            <td class="check"><a @click="goDetail(elem.eventId)">查看详情</a></td>
			          </tr>
			        </tbody>
			    </table>
			    <div class="paging">
			  		<el-pagination
				      @size-change = "handleSizeChange"
				      @current-change = "handleCurrentChange"
				      :current-page = "currentPage"
				      :page-size = 1
				      layout = "prev, pager, next, jumper"
				      :total = "totalPage">
				    </el-pagination>
			  	</div>
			</div>
	  	</div>
	  	<div class="noData" v-if="neweventdata == null">
	    	<p><img src="../../../assets/img/nodata_icon.png"/></p>
	    </div>
    </div>
</template>

<script>
	export default{
		data() {
			return {
				neweventdata: [], //获取最近交易题材列表的数据
				currentPage: 1,  //当前页
				totalPage: null  //页数
			}
		},
		created() {
			this.getNewestData();
		},
		methods: {
			//获取最近交易题材列表的数据
			getNewestData(){
		        this.$CPOST('/account/v1/userInfo/userNewestEventInfo',{
		        	size: 10,
		        	page: this.currentPage-1
		        },(res) => {
	         		this.neweventdata=res.resultValue.userNewestEventInfo;
	         		this.totalPage = Math.ceil(res.resultValue.userNewestEventInfoCount/10);
				})
		        this.$Bury(window.location.href,'',0,'zuijinjiaoyi_03034')
      		},
      		goDetail(id) {
		      	this.$CPOST('/event/v1/eventInformation/queryEventInformation',{
		      		eventId: id
		      	},(res) => {
		      		this.type = res.resultValue.eventInformationEntity.eventPurchaseType
		      		if(this.type == 1) {
		      			this.$router.push({path: '/subscribeDetail/' + id})
		      		}else{
		      			this.$router.push({path: '/event/' + id})
		      		}
						})
		      },
      		handleSizeChange(val) {
				this.pagesize = val;
		        this.getNewestData()
		    },
		    handleCurrentChange(val) {
	    		this.currentPage = val;
	    		this.getNewestData()
		    },
      		formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
			}
		}
	}
</script>

<style scoped>
.paging{position: absolute;bottom: 80px;width: 890px;}
.el-pagination{text-align: center;}
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
/**/
.activities{width: 940px;height: 1006px;margin-left: 32px;position: relative;}
.center_page_table{margin-top: 20px;}
.center_page_table_top{line-height: 60px;}
.center_page_table_top>p{font-size: 18px;color: #323232;font-weight: bold;display: inline-block;}
.table_one{width: 938px;}
.table_one>thead>tr>th{width: 137px;height: 42px;background: #f0f0f0;}
.table_one>thead>tr>th.two_tt{width: 90px;text-align: right;padding-right: 34px;}
.table_one>thead>tr>th.thed2{width: 180px;}
.table_one>tbody>tr>td{width: 137px;height: 63px;text-align: center;border-bottom: solid 1px #eee;font-size: 14px;color: #323232;}
.center_page{height: 202px;border-bottom: dashed 1px #ccc;}
.center_page_left,.center_page_right{width: 50%;height: 202px;float: left;}
.center_page_left{overflow: hidden;}
.center_page_left>p,.center_page_right>p{line-height: 54px;font-size: 18px; color: #474e5d;	 margin-top: 18px;}
.center_page_left_div{line-height: 40px;color: #474e5d;font-size: 40px;}
.check>a:hover{text-decoration: underline;}
.td_div{height: 115px;}
.td_div_img{width: 236px;height: 100%;float: left;}
.td_div_img>img{width: 100%;height: 100%;}
.td_div_title{float: left;margin-left: 6px;width: 210px;}
.td_div_title>div{line-height: 18px;font-size: 16px;color: #323232;margin-top: 6px;}
.td_div_title>p{font-size: 14px;color: #676767;margin-top: 8px;}
</style>

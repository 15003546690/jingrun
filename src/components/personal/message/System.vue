<template>
	<div>
		<!--交易消息-->
		<div class="listData" v-if="system.length>0">
			<div class="announcement" v-for="(item,index) in system">
				<div class="announcement_div" :data-id="item.messageId">
					<span><img src="../../../assets/img/center/message.png"/></span>
					<div class="announcement_div_most">
						<div class="announcement_div_content">
							<p>{{item.title}}</p>
							<i><a @click="showModal(index,item.messageId)">删除</a>{{formatDate(item.createTime)}}</i>
						</div>
						<div class="announcement_content">{{item.content}}</div>
					</div>
				</div>
			</div>
			<div class="paging">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size=1 layout="prev, pager, next, jumper" :total="totalPage">
				</el-pagination>
			</div>
		</div>
		<div class="noData" v-if="system.length==0">
			<p><img src="../../../assets/img/nodata_icon.png" /></p>
		</div>
		<div class="confirm_modal" v-if="isShow">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='hideModal'><img src="../../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p>确定要删除吗？</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='clean()'>确定</button>
						<button @click='hideModal'>取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				system: [],//列表
				totalPage: 0,//总共页数
				currentPage: 1,//默认当前页数1
				messageId: '',//当前题材/题材组的id
				isShow: false
			}
		},
		created() {
			this.getMessage()
		},
		methods: {
			formatDate(timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
			},
			getMessage() {
				// 根据分类获取信息
				this.$CPOST('/message/v1/message/findMessageByTypePc', {
					type: 2,
					size: 5,
					page: this.currentPage - 1
				},(res) => {
					this.system = res.resultValue.list;
					this.totalPage= Math.ceil(res.resultValue.totalElement/5);
				})
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getMessage()
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getMessage()
			},
			showModal(ind,messageId) {
				this.messageId=messageId;
				this.isShow = true;
				this.listIndex = ind;
			},
			hideModal() {
				this.isShow = false;
			},
	   		//单条删除
	        clean() {
	        	this.$CPOST('/message/v1/message/deleteMessage', {
	             	messageId: [this.messageId],
	                messageType:2
	           },(res)=>{
	           		this.hideModal();
	              	this.system.splice(this.listIndex,1);
	            })
	        }
		}
	}
</script>
<style scoped>
.listData {width: 100%;height: 886px;position: relative;}
/*空白页*/
.noData {position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
.more {float: right;color: #a5a5a5;font-size: 12px;cursor: pointer;}
.announcement {position: relative;}
.announcement_div {border-bottom: dashed 1px #e1e1e1;display: inline-block;padding-bottom: 14px;margin-bottom: 16px;}
.announcement_div>span {width: 67px;height: 60px;display: block;float: left;}
.announcement_div_most {width: 873px;float: left;}
.announcement_div_content {width: 873px;float: left;}
.announcement_div_content>p {float: left;height: 20px;font-size: 14px;color: #323232;}
.announcement_div_content>i {float: right;height: 20px;font-size: 12px;color: #a5a5a5;display: block;}
.announcement_content {line-height: 22px;font-size: 14px;color: #676767;}
.announcement_div_content>i>a {margin-right: 10px;}
.paging {width: 100%;position: absolute;bottom: 150px;}
.el-pagination {text-align: center;}
/*取消下单弹层*/
.confirm_modal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box{width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or{width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head{width: 100%;height: 32px;}
.confirm_main_head>p{float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span{display: block;float: right;cursor: pointer;}
.confirm_text{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;}
.confirm_btn{width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button{width: 98px;height: 32px;background: url(../../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
</style>
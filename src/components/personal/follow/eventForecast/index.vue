<template>
	<!--预测-->
	<div class="forecast">
		<div>
			<div class="forecast_div" v-for="(item,index) in lists" :key="item.eventId">
				<div class="forecast_div_content">
					<div class="forecast_content_left" @click="pushDetail(item.eventReslutType,item.eventId)">
						<img v-lazy="item.eventImgpath">
					</div>
					<div class="forecast_content_right">
						<div class="content_right_title" @click="pushDetail(item.eventReslutType,item.eventId)">{{item.eventName}}</div>
						<div class="content_right_time">
							<p class="content_left_time">
								<span>{{item.eventType==0?'评鉴':item.eventType==1?'预测':''}}</span>
								<a>结束时间：{{formatDate(item.eventEndTime)}}</a>
							</p>
							<p class="content_right_fllow" v-on:click="showModal(item.eventId,index,item.eventReslutType)"><a>取消关注</a></p>
						</div>
					</div>
				</div>
			</div>
			<div class="paging">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size=1 layout="prev, pager, next, jumper" :total="totalPage">
				</el-pagination>
				<!--pageSize 改变时会触发-->
				<!--currentPage 改变时会触发-->
				<!--当前页数-->
				<!--每页显示条目个数-->
				<!--组件布局，子组件名用逗号分隔-->
				<!--总条目数-->
			</div>
		</div>
		<div class="noData" v-if="noData">
			<p><img src="../../../../assets/img/nodata_icon.png" /></p>
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
							<p>确定要取消关注吗？</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='updateAttention()'>确定</button>
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
				lists: [],//列表
				totalPage: null,//总页数
				currentPage: 1,//默认页数1
				isShow: false,//弹层
				eventId: null,//题材ID
				eventReslutType: null,
				listIndex: 0,//取消关注默认值
				noData: false
			}
		},
		created() {
			setTimeout(()=>{
				this.userAttentionEvent();
			},50)
		},
		methods: {
			formatDate(timestamp) {
				return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
			},
			userAttentionEvent() {
				this.$CPOST('/account/v1/userAttention/queryUserAttentionEventInformation', {
					attentionEventType: '1',
					page: this.currentPage - 1,
					size: 8
				},(res) => {
					this.lists = res.resultValue.eventInfo;
					this.totalPage = Math.ceil(res.resultValue.count / 8)
					if(this.lists.length>0){
			        	this.noData = false;
			        }else{
			        	this.noData = true;
			        }
				})
				this.$Bury(window.location.href,'',0,'wodeguanzhu_03007')//链接，事件id,类型（ 0-默认 1-活动 2-题材组 3-题材 4-专题），名称
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.userAttentionEvent();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.userAttentionEvent();
			},
			showModal(eventId,ind,eventType) {
				this.eventId = eventId;
				this.eventReslutType = eventType;
				this.isShow = true;
				this.listIndex = ind;
			},
			hideModal() {
				this.isShow = false;
			},
			pushDetail(eventType,eventId) {
				this.eventReslutType = eventType;
				this.eventId = eventId;
				if(this.eventReslutType == 0) {
					this.$router.push({
						path: '/group/' + this.eventId + '?type=1'
					})
				} else {
					this.$router.push({
						path: '/event/' + this.eventId + '?type=1'
					})
				}
			},
			updateAttention() {
				if(this.eventReslutType == 0) {
					this.type = 1
				} else {
					this.type = 0
				}
				this.$CPOST('/account/v1/userAttention/updateUserAttention', {
					attentionEventType: 1,
					attentionType: this.type,
					attentionTypeId: this.eventId
				},(res) => {
					this.hideModal();
					this.lists.splice(this.listIndex, 1)
				})
			}
		}
	}
</script>
<style scoped>
/*空白页*/
.noData {position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
/*弹层*/
.confirm_modal {width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box {width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or {width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head {width: 100%;height: 32px;}
.confirm_main_head>p {float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span {display: block;float: right;cursor: pointer;}
.confirm_text {width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box {display: inline-block;vertical-align: middle;}
.confirm_btn {width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button {width: 98px;height: 32px;background: url(../../../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
.forecast_div {height: 87px;border-bottom: solid 1px #e5e5e5;overflow: hidden;position: relative;}
.forecast_div_content {height: 68px;margin: 0 auto;margin-top: 10px;}
.forecast_content_left {float: left;width: 117px;height: 100%;cursor: pointer;}
.forecast_content_left>img {width: 107px;height: 68px;}
.forecast_content_right {float: right;width: 823px;height: 68px;}
.content_right_title {line-height: 20px;font-size: 16px;color: #444;font-weight: bold;padding-top: 2px;cursor: pointer;}
.content_right_time {height: 26px;overflow: hidden;}
.content_left_time>span {width: 44px;height: 17px;line-height: 17px;font-size: 12px;color: white;text-align: center;background: #dd6d76;border-radius: 10px;display: block;margin-left: 2px;margin-top: 5px;float: left;}
.content_left_time>a {height: 26px;line-height: 26px;font-size: 14px;color: #888;margin-left: 6px;float: left;}
.content_right_fllow {font-size: 14px;color: #3282ff;float: right;margin-right: 25px;cursor: pointer;}
.content_right_fllow:hover a{
	text-decoration: underline;
}
.forecast_icon {position: absolute;bottom: 5px;right: 12px;width: 66px;height: 64px;text-align: center;line-height: 64px;}
.forecast_icon>img {vertical-align: middle;}
.content_time>span {background: #7990bf;}
.paging {width: 100%;position: absolute;bottom: 80px;}
.el-pagination {text-align: center;}
</style>
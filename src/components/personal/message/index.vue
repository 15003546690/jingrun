<template>
	<!--我的消息-->
	<div class="message">
		<div class="message_title">我的消息</div>
		<div class="message_nav">
			<div>
				<p :class="activeTab==0?'font-w':''" @click="switchTab(0)" id="announcementbtn">公告消息
					<a v-show='read'></a>
				</p>
				<span><i></i></span>
				<p :class="activeTab==2?'font-w':''" @click="switchTab(2)" id="systembtn">交易消息
					<a v-show='readd'></a>
				</p>
				<span><i></i></span>
				<p :class="activeTab==1?'font-w':''" @click="switchTab(1)">系统消息
					<a v-show='readdd'></a>
				</p>
			</div>
			<span @click="showModal()" id="delAll" v-show="hideshow">全部删除</span>
		</div>
		<div class="message_div">
			<!--公告消息-->
			<Announce :class="activeTab==0?'announcement':'hide'"/>
			<!--系统消息-->
			<Deal :class="activeTab==1?'announcement':'hide'" v-show='dele.xtmes!=1'/>
			<!--交易消息-->
			<System  :class="activeTab==2?'announcement':'hide'" v-show='dele.jymes!=2'/>
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
						<button @click='deleteAllMessage()'>确定</button>
						<button @click='hideModal()'>取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Announce from './Announce'
	import Deal from './Deal'
	import System from './System'

	export default {
		data() {
			return {
				activeTab: 0,//tab切换
				message: [],//
				system: [],
				messageId: '',//消息id
				read: false,//未读标识
				readd: false,//未读标识
				readdd: false,//未读标识
				hideshow: false,
				systemList:[],
				dele:{
					xtmes:5,
					jymes:5
				},
				totalPage: 0,//总页数
				currentPage: 1,//页数默认1
				messageId:'',//当前题材的id
				isShow: false,
				isRead: ''
			}
		},
		components: {
			Announce,
			Deal,
			System
		},
		created() {
			this.$Bury(window.location.href,'',0,'gonggaoxiaoxi_04020')
			setTimeout(()=>{
				this.getMessage();
				this.unRead();
			},50)
		},
		methods: {
			switchTab(index) {
				this.activeTab = index;
				if(this.activeTab == 0) {
					this.hideshow = false
				} else {
					this.hideshow = true
				}
				if(this.activeTab == 0) {
					this.read = false;
				} else if(this.activeTab == 2) {
					this.readd = false;
				} else {
					this.readdd = false;
				}
				if(this.activeTab == 0){
					this.$Bury(window.location.href,'',0,'gonggaoxiaoxi_04020')
				}else if(this.activeTab == 1){
					this.$Bury(window.location.href,'',0,'xitongxiaoxi_04022')
				}else if(this.activeTab == 2){
					this.$Bury(window.location.href,'',0,'jiaoyixiaoxi_04021')
				}
				this.getMessage();
			},
			getMessage() {
				this.$CPOST('/message/v1/message/findMessageByTypePc', {
						type: this.activeTab,
						size: 5,
						page: this.currentPage - 1
					},(res) => {
						this.system = res.resultValue.list;
						this.isRead = res.resultValue.unRead;
						this.totalPage = res.resultValue.totalPage;
					})
			},
			formatDate (timestamp) {
				return this.$dateFormat(timestamp,'yyyy-mm-dd HH:MM')
			},
			showModal() {
				this.isShow = true;
			},
			hideModal() {
				this.isShow = false;
			},
			//全部删除
			deleteAllMessage(){
				//this.activeTab==1  系统消息   2  交易消息
				if(this.activeTab==2) {
					this.messageType = 2;
				} else if(this.activeTab==1) {
					this.messageType = 1;
				} else {
					this.messageType = 0;
				}
				this.$CPOST('/message/v1/message/deleteAllMessage', {
					messageType: this.messageType
				},(res) => {
					if(this.messageType==1){
						this.dele.xtmes=1;
						this.hideModal();
					}else if(this.messageType==2){
						this.dele.jymes=2;
						this.hideModal();
					}
				})
			},
			//未读消息
			unRead(){
				this.$CPOST('/message/v1/message/findUnreadMessage', {
				},(res) => {
					this.readdd = res.resultValue.messageNum;
					this.read = res.resultValue.noticeNum;
					this.readd = res.resultValue.tradeNum;
					if(this.readdd != 0){
						this.readdd = true
					}else{
						this.readdd = false
					}
					if(this.readd != 0){
						this.readd = true
					}else{
						this.readd = false
					}
					if(this.read != 0){
						this.read = true
					}else{
						this.read = false
					}
				})
			}
		}
	}
</script>

<style scoped>
.paging{text-align: center;}
.noData{text-align: center; padding-top: 80px;}
.message {width: 940px;min-height: 1006px;margin-left: 33px;}
.message_title {line-height: 58px;font-size: 18px;color: #323232;font-weight: bold;}
.message_nav {height: 38px;border-bottom: 2px solid #ced4e0;margin-bottom: 20px;position: relative;}
.message_nav>div {display: inline-block;position: absolute;left: 0;top: 11px;}
.message_nav>div>p {width: 92px;float: left;line-height: 27px;text-align: center;font-size: 14px;color: #676767;cursor: pointer;position: relative;}
.message_nav>span {width: 92px;float: right;margin-top: 10px;font-size: 12px;color: #676767;cursor: pointer;}
.message_nav>div>p>a {width: 6px;height: 6px;background: #e52735;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;top: 0;right: 10px;}
.message_nav>div>span {width: 30px;line-height: 27px;float: left;vertical-align: middle;text-align: center;}
.message_nav>div>span>i{height: 12px; display: inline-block; border-left: 1px solid #ced4e0;}
.font-w {color: #e52735 !important;border-bottom: solid 2px #e52735;}
.announcement_div {border-bottom: dashed 1px #e1e1e1;display: inline-block;padding-bottom: 14px;margin-bottom: 16px;}
.announcement_div>span {width: 67px;height: 60px;display: block;float: left;}
.announcement_div_most {width: 873px;float: left;}
.announcement_div_content {width: 873px;float: left;}
.announcement_div_content>p {float: left;height: 20px;font-size: 14px;color: #323232;}
.announcement_div_content>i {float: right;height: 20px;font-size: 12px;color: #a5a5a5;display: block;}
.announcement_content {line-height: 22px;font-size: 14px;color: #676767;}
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
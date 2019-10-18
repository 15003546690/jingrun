<template>
  <li class="dayTask_body_detail" @click='rout()'>
    <p class="dayTask_body_detail_text" :data-type='taskList.taskCode' :data-id='taskList.groupId'>{{slice(taskList.taskName)}}</p>
    <a :class="taskList.finish == false ? 'dayTask_body_go' : 'hide'">去做任务>></a>
    <button :class="taskList.finish == true && taskList.get == false ?'dayTask_body_btn':'hide'">领取奖励</button>
    <a :class="taskList.get==true && taskList.finish == true ? 'dayTask_body_go' : 'hide'">已完成</a>
  </li>
</template>

<script>
import Login from '../common/Login'
export default {
	data() {
		return {
			loginToken: '',
			isShowLoginModal: false,
			isShow: false,
			text: '',
			key: '',
			keyId: ''
		}
	},
	props: [
		'taskList'
	],
	created() {

	},
	/*	else if(event.path[1].querySelector('.task_text_img').getAttribute('data-type')=='FIRST_EVALUATION'){
						this.$router.push({path:'/criticism'});
					}*/
	methods: {

		hideModal() {
			//alert(1)
			this.isShow = false
		},
		slice(substring) {
			if (substring.length > 18) {
				return substring.substring(0, 18) + '...'
			} else {
				return substring
			}
		},
		rout() {
			if (this.$store.state.refreshToken == '') {
				this.$emit('showLogin');
			} else {
				if (this.taskList.finish == true && this.taskList.get == false) {
					this.$CPOST('/task/v1/task/getReward',{
							key: this.taskList.taskCode
						},(res) =>{
				        	if (res.resultCode == 200) {
								this.$emit('imgChange', '领取成功');
							} else {
								this.$emit('imgChange', '领取失败');
							}
				      })
				} else if (this.taskList.finish == false) {
					switch(this.taskList.taskCode) {
						case 'DAILY_PREDICT': this.$router.push({path: '/predict'});
						break;
						case 'DAILY_EVALUATION': this.$router.push({path: '/criticism'});
						break;
						case 'DAILY_SHARE': this.$router.push({path: '/predict'});
						break;
						case 'DAILY_DISCUSS': this.$router.push({path: '/predict'});
						break;
						case 'DAILY_EARNGOLD': 
						break;
						default: {
							if (this.taskList.taskCode.indexOf('DAILY_GROUP_') >= 0) {
								this.$router.push({
									path: '/group/' + this.taskList.groupId
								});
							}
						}
					
					} 
				}
			}
		}
	}
}
</script>

<style scoped>
.dayTask_body_detail{
	width: 100%;
	height: 26px;
	line-height: 26px;
	margin-top: 10px;
}
.dayTask_body_detail_text{
	float: left;
	color: #444444;
	font-size: 14px;
}
.dayTask_body_go{
	float: right;
	color: #666666;
	font-size: 12px;
}
.dayTask_all{
	padding-right: 0;
}
.dayTask_body_btn{
	height: 18px;
	line-height: 16px;
	padding: 0 7px;
	float: right;
	color: #c60c1b;
	font-size: 12px;
	border: 1px solid #c60c1b;
	-webkit-border-radius: 8px;
	-moz-border-radius: 8px;
	border-radius: 8px;
	background: #ffffff;
	margin-right: 3px;
	cursor: pointer;
    margin-top: 4px;
}
.dayTask_body_detail:hover .dayTask_body_detail_text{
	color: #c60c1b;
	cursor: pointer;
}
.confirm_modal{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;
	background-size: 100%;
	z-index: 5;
}
.confirm_box{
	width: 435px;
	height: 196px;
	background: #e6e6e6;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
}
/*.confirm_main_or{
	display: none;
}*/
.confirm_main,.confirm_main_or{
	width: 423px;
	height: 184px;
	background: #fff;
	border: 1px solid #c9c9c9;
	margin: auto;
	margin-top: 5px;
}
.confirm_main_head{
	width: 100%;
	height: 32px;
}
.confirm_main_head>p{
	float: left;
	line-height: 32px;
	color: #323232;
	font-size: 14px;
	padding-left: 13px;
}
.confirm_main_head>span{
	display: block;
	float: right;
	cursor: pointer;
}
.confirm_text{
	width: 340px;
	height: 85px;
	line-height: 85px;
	text-align: center;
	margin: auto;
}
.confirm_text_box{
	display: inline-block;
	vertical-align: middle;
}
.confirm_btn{
	width: 100%;
	height: 32px;
	text-align: center;
	color: #323232;
	font-size: 14px;
}
.confirm_btn>button{
	width: 98px;
	height: 32px;
	background: url(../../assets/img/eventGroup/event-btn.png) no-repeat center;
	border: 0;
	outline: none;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}
</style>

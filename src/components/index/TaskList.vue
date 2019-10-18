<template>
	<div class="task_modal">
		<div class="task_box">
			<div class="task_top">
				<ul class="task_tab">
					<li :class="activeTab==0?'task-active':''" @click="switchTab(0)" :data-type="0">每日任务<i v-if="redPoint.daily > 0">{{redPoint.daily}}</i></li>
					<li :class="activeTab==1?'task-active':''" @click="switchTab(1)" :data-type="1">新手任务<i v-if="redPoint.first > 0">{{redPoint.first}}</i></li>
					<li :class="activeTab==2?'task-active':''" @click="switchTab(2)" :data-type="2">邀请任务<i v-if="redPoint.invite > 0">{{redPoint.invite}}</i></li>
				</ul>
				<div class="task_text">
					<p class="task_award">成长奖励：+{{userMsg.totalReward}}</p>
					<span class="close"><img @click="hideTaskModal" src="../../assets/img/center/close.png"/></span>
				</div>
			</div>
			<!-- 每日任务 -->
			<div class="task_main" v-if="activeTab==0">
				<div class="task_main_text" v-for="(item,index) in taskDetails" :key="item.taskId" @click='xsrout(index)'>
					<p class="task_text_img" :data-type='item.taskCode' :data-id="item.groupId"><img src="../../assets/img/task/day_yuce.png"/></p>
					<p class="task_text_p1">{{slice(item.taskName)}}</p>
					<p class="task_text_money"><img src="../../assets/img/eventGroup/event_weilai.png"/><i>{{item.taskReward}}</i></p>
					<button :class="item.isFinished==0 ? '' : 'hide' ">去完成</button>
					<button :class="item.isFinished==1 && item.isReceived==0 ? 'task_get' : 'hide'">领取</button>
					<button :class="item.isFinished==1 && item.isReceived==1 ? 'task_finish' : 'hide'">已领取</button>
				</div>
			</div>
			<!-- 新手任务 -->
			<div class="task_main" v-if="activeTab==1">
				<div class="task_main_text" v-for="(item,index) in taskDetails" :key="item.taskId" @click='xsrout(index)'>
					<p class="task_text_img" :data-type='item.taskCode' :data-id="item.groupId"><img src="../../assets/img/task/new_yuce.png"/></p>
					<p class="task_text_p1">{{slice(item.taskName)}}</p>
					<p class="task_text_money"><img src="../../assets/img/eventGroup/event_weilai.png"/><i>{{item.taskReward}}</i></p>
					<button :class="item.isFinished==0 ? '' : 'hide' ">去完成</button>
					<button :class="item.isFinished==1 && item.isReceived==0 ? 'task_get' : 'hide'" >领取</button>
					<button :class="item.isFinished==1 && item.isReceived==1 ? 'task_finish' : 'hide'">已领取</button>
				</div>
			</div>
			<!-- 邀请任务 -->
			<div class="task_main" v-if="activeTab==2">
				<p class="task_invite"><img src="../../assets/img/task/invite_img1.png"/></p>
				<div class="task_content">
					<p class="task_left" @click='right'><img src="../../assets/img/task/invite_left.png"/></p>
					<ul class="task_invite_list">
						<li v-for="(item,index) in taskDetails" :key="item.taskId">
							<router-link tag="p" to="/personal/invite" class="task_invite_p1" :data-type='item.taskCode'><img src="../../assets/img/task/invite_img2.png"/></router-link>
							<p class="task_invite_p2">{{item.taskName}}</p>
							<p class="task_invite_p3">奖励{{item.taskReward}}未来豆</p>
							<a href="javascript:;" :class="item.isFinished==1 && item.isReceived==0 ? 'yq_btn' : 'hide'" @click='yqBtn(item.taskCode)'>领取</a>
							<a href="javascript:;" :class="item.isFinished==1 && item.isReceived==1 ? 'no_yq_btn' : 'hide'">已领取</a>
						</li>
					</ul>
					<p class="task_right" @click='left'><img src="../../assets/img/task/invite_right.png"/></p>
				</div>
			</div>
		</div>
		
		<div class="confirm_modal" v-if="isShow">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='hideModal'><img src="../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p class="confirm_content" v-model="text">{{text}}</p>
						</div>
					</div>
					<div class="confirm_btn">
						<!--<button @click='hideModal'>取消</button>-->
						<button @click='hideModal'>确定</button>
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
				taskDetails: [],
				twoTaskDetails:[],
				threeTaskDetails:[],
				redPoint:{},
				userMsg: {},
				count:0,
				activeTab:0,
				num:0,
				isShow: false,
				key:'',
				text: '',
				receive:false,
				unRead: true
			}
		},
		/*props: [
			'taskList'
		],*/
		created() {
			this.$Bury(window.location.href,'',0,'renwuye_02007');
			this.taskDetail()
		},
		watch: {
		    // 如果路由有变化，会再次执行该方法
		    '$route' () {
		    	if(this.$route.path.indexOf('newbie')>-1){
		    		this.taskDetail()
		    	}else if(this.$route.path.indexOf('invite')>-1){
		    		this.taskDetail()
		    	}else{
		    		this.taskDetail()
		    	}
		    }
	 	},
		methods: {
			hideModal() {
	    		this.isShow = false
	    	},
	    	slice(substring) {
		   		if(substring.length>22){
		   		  return substring.substring(0,22) + '...'
		   		}else{
		   			return substring
		   		}
		   },
			right(){
				let ulWidth=document.querySelector('.task_invite_list').style.marginLeft=0;
			},
			left(){
				let ulWidth=document.querySelector('.task_invite_list').style.marginLeft=-215+'px';
			},
			/*新手任务*/
			xsrout(i){
				var task = this.taskDetails[i];
				if(task.isFinished == 0){
					switch(task.taskCode) {
						case 'FIRST_READ': this.$router.push({path:'/others/problems'});
						break;
						case 'FIRST_EVALUATION': this.$router.push({path:'/criticism'});
						break;
						case 'FIRST_FOCUS': this.$router.push({path:'/criticism'});
						break;
						case 'FIRST_ACTIVITY': this.$router.push({path:'/activity'});
						break;
						case 'FIRST_RECHARGE': this.$router.push({path:'/personal/recharge'});
						break;
						case 'FIRST_SEEORDER': this.$router.push({path:'/personal/orders'});
						break;
						case 'FIRST_SEEMONEY': this.$router.push({path:'/personal/assets'});
						break;
						case 'FIRST_GIVETITLE': this.$router.push({path:'/personal/subject'});
						break;
						case 'FIRST_ACCEPTTITLE': this.$router.push({path:'/personal/subject'});
						break;
						case 'FIRST_BINDWX': this.$router.push({path:'/personal/account/bind'});
						break;
						case 'FIRST_BINDWB': this.$router.push({path:'/personal/account/bind'});
						break;
						case 'FIRST_SHOPPING': this.$router.push({path:'/mall/list'});
						break;
						case 'FIRST_PREDICT': this.$router.push({path:'/predict'});
						break;
						case 'FIRST_DISCUSS': this.$router.push({path:'/predict'});
						break;
						case 'DAILY_SHARE': this.$router.push({path:'/predict'});
						break;
						case 'DAILY_EARNGOLD': 
						break;
						case 'DAILY_DISCUSS': this.$router.push({path:'/predict'});
						break;
						case 'DAILY_EVALUATION': this.$router.push({path:'/criticism'});
						break;
						case 'DAILY_PREDICT': this.$router.push({path:'/predict'});
						break;
						case 'All': 
						break;
						default: {
							if(task.taskCode.indexOf('DAILY_GROUP_')>=0){
								this.$router.push({path:'/group/'+ task.groupId});
							}
						}
						break;
						
					}
				}else if(task.isFinished == 1 && task.isReceived == 0){
					this.$CPOST('/task/v1/task/getReward',{
						key:task.taskCode
					},(res) =>{
			          	if(res.resultCode==200){
							this.isShow = true
				    		this.text = '领取成功'
				    		this.$CPOST('/task/v1/task/userFindTaskByType',{
						        taskCategory: this.num
					      	},(res) =>{
				    			this.taskDetails = res.resultValue.tasks;
						 		this.redPoint = res.resultValue.redPoint;
						 		this.userMsg = res.resultValue.userMsg;
					      	})
			    		}else{
			    			this.isShow = true
				    		this.text = '领取失败'
			    		}
				    })
				}
			},
			
			//邀请任务领取
			yqBtn(code){
				this.$CPOST('/task/v1/task/getReward',{
					key:code
					},(res) =>{
			          	if(res.resultCode==200){
			    			this.$CPOST('/task/v1/task/userFindTaskByType',{
						        taskCategory: 2
						      },(res) =>{
					    		this.taskDetails = res.resultValue.tasks;
						 		this.redPoint = res.resultValue.redPoint;
						 		this.userMsg = res.resultValue.userMsg;
						      })

							this.isShow = true;
				    		this.text = '领取成功';
			    		}else{
			    			this.isShow = true;
				    		this.text = '领取失败';
			    		}
				    })
			},
			hideTaskModal () {
		      	this.$emit('hideTaskModal')
		   	},
			switchTab(index){
				this.activeTab=index;
				this.num=index;
				this.taskDetail()
			},
			taskDetail() {
				/*if(this.num===0){*/
					this.$CPOST('/task/v1/task/userFindTaskByType', {
				 		taskCategory: this.num
				 	},(res) => {
				 		this.taskDetails = res.resultValue.tasks;
				 		this.redPoint = res.resultValue.redPoint;
				 		this.userMsg = res.resultValue.userMsg;
				 	})
				/*}else if(this.num===1){
					this.$CPOST('/task/v1/task/userFindTaskByType', {
				 		taskCategory: 1
				 	},(res) => {
				 		this.twoTaskDetails=res.resultValue.tasks;
				 		this.redPoint = res.resultValue.redPoint;
				 		this.userMsg = res.resultValue.userMsg;
				 	})
				}else if(this.num===2){
					this.$CPOST('/task/v1/task/userFindTaskByType', {
				 		taskCategory: 2
				 	},(res) => {
				 		this.threeTaskDetails=res.resultValue.tasks;
				 		this.redPoint = res.resultValue.redPoint;
				 		this.userMsg = res.resultValue.userMsg;
				 	})
				}
		   		*/
		   	}
		}
	}
</script>

<style scoped>
.yq_btn{display: block; width: 140px; height: 40px; line-height: 40px; background: #ffd341; color: #676767; font-size: 14px; text-align: center; border-radius: 3px;box-shadow:0px 2px 5px rgba(0,0,0,.3); -webkit-box-shadow:0px 2px 5px rgba(0,0,0,.3); margin:0 auto; margin-top: 15px;}
.no_yq_btn{
	display: block;
	width: 140px;
	height: 40px;
	line-height: 40px;
	background: #e8e8e8;
	color: #a4a4a4;
	font-size: 14px;
	text-align: center;
	border-radius: 3px;
	box-shadow:0px 2px 5px rgba(0,0,0,.3);
	-webkit-box-shadow:0px 2px 5px rgba(0,0,0,.3);
	margin:0 auto;
	margin-top: 15px;
}
.task_modal{
	width: 100%;
	height: 100%;
	background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;
	background-size: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 11;
}
.task_box{
	width: 902px;
	height: 520px;
	background: #333333;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}
.task_top{
	width: 882px;
	height: 39px;
	margin: auto;
	margin-top: 10px;
}
.task_tab{
	height: 100%;
	float: left;
}
.task_tab>li{
	width: 150px;
	height: 100%;
	line-height: 39px;
	text-align: center;
	font-size: 18px;
	float: left;
	margin-right: 6px;
	background: #717171;
	color: #343434;
	-webkit-border-radius: 4px 4px 0 0;
	-moz-border-radius: 4px 4px 0 0;
	border-radius: 4px 4px 0 0;
	cursor: pointer;
	position: relative;
}
.task_tab>li.task-active{
	background: #fff;
	color: #323232;
}
.task_tab>li>i{
	width: 24px;
	height: 24px;
	background: #e52735;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
	position: absolute;
    right: -13px;
    top: -8px;
    z-index: 12;
    color: #FFFFFF;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
}
.task_text{
	float: right;
}
.task_award{
	height: 100%;
	line-height: 39px;
	color: #ffffff;
	font-size: 16px;
	float: left;
}
.close{
	float: right;
	margin-left: 10px;
}
.close>img{
	cursor: pointer;
}
.task_main{
	width: 862px;
	height: 458px;
	padding: 0 10px;
	margin: auto;
    overflow-y: auto;
    overflow-x: hidden;
	background: #fff;
	-webkit-border-radius: 0 0 2px 2px;
	-moz-border-radius: 0 0 2px 2px;
	border-radius: 0 0 2px 2px;
}
.task_main_text{
	width: 100%;
	height: 71px;
	line-height: 71px;
    clear: both;
	border-bottom: 1px solid #e5e5e5;
}
.task_text_img{
	width: 74px;
	height: 100%;
	text-align: center;
	float: left;
}
.task_text_img>img{
	vertical-align: middle;
}
.task_text_p1{
	width: 476px;
	float: left;
	color: #323232;
	font-size: 16px;
}
.task_text_money{
	width: 150px;
	float: left;
	color: #ffa800;
	font-size: 16px;
}
.task_text_money>img{
	margin-right: 10px;
	vertical-align: middle;
}
.task_text_money>i{
	vertical-align: sub;
}
.task_main_text>button{
	width: 140px;
	height: 40px;
	background: #fff;
	border: 2px solid #ffd341;
	font-size: 18px;
	color: #676767;
	outline: none;
	cursor: pointer;
	-webkit-border-radius: 2px;
	-moz-border-radius: 2px;
	border-radius: 2px;
}
.task_main_text>button.task_get{
	background: #ffd341;
}
.task_main_text>button.task_finish{
	background: #e8e8e8;
	border: 2px solid #e8e8e8;
	color: #a4a4a4;
	cursor: inherit;
}
.task_invite{
	width: 100%;
	height: 161px;
	line-height: 161px;
	text-align: center;
	margin-top: 36px;
}
.task_content{
	width: 860px;
	height: 108px;
	margin: auto;
	margin-top: 65px;
	position: relative;
}
.task_left,.task_right{
	width: 24px;
	height: 100%;
	line-height: 108px;
	text-align: center;
	position: absolute;
	top: 0;
}
.task_left{
	left: 0;
}
.task_right{
	right: 0;
}
.task_left>img,.task_right>img{
	vertical-align: middle;
	cursor: pointer;
}
.task_invite_list{
	width: 1075px;
	height: 100%;
	-moz-transition: all .4s ease 0s;
	transition: all .4s ease 0s;
	-webkit-transition: all .4s ease 0s;
}
.task_invite_list>li{
	width: 215px;
	height: 100%;
	float: left;
}
.task_invite_p1{
	width: 100%;
	height: 45px;
	line-height: 45px;
	text-align: center;
	cursor: pointer;
}
.task_invite_p2{
	width: 100%;
	line-height: 26px;
	text-align: center;
	color: #323232;
	font-size: 16px;
	font-weight: bold;
	margin-top: 15px;
}
.task_invite_p3{
	width: 100%;
	line-height: 22px;
	text-align: center;
	color: #e52735;
	font-size: 14px;
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
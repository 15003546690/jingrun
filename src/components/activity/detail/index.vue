<template>
	<div>
		<div class='activity-share' v-if="needShare">
			<div class='activity-share-top' @click='shareTop()'>
				<img src="../../../assets/img/newAct/top_btn.png" alt="">
			</div>
			<div class='activity-share-qq' @click='qq()'>
				<img src="../../../assets/img/newAct/qq.png" alt="">
			</div>
			<div class='activity-share-wb' @click='wb()'>
				<img src="../../../assets/img/newAct/wb.png" alt="">
			</div>
			<div class='activity-share-wx weixin'>
				<img src="../../../assets/img/newAct/wx.png" alt="">
				<i><img :src="weixinShare"/></i>
			</div>
			<div class='activity-share-bottom' @click='shareBottom()'>
				<img src="../../../assets/img/newAct/bottom_btn.png" alt="">
			</div>
		</div>
		<!-- list.url+'&actStage='+list.actStage+'&actId='+this.$route.params.id -->
		<div v-if='list.url!=""'>
		<iframe :src="list.url+'&actStage='+list.actStage+'&actId='+this.$route.params.id+'&time='+getTime" frameborder=0 id='ifm' marginwidth="0" marginheight="0" scrolling="no" ref='iframe' @load="loaded" :height="h"></iframe>
		</div>
		<div v-if='list.activityCate!=3' style="padding-top: 22px; padding-bottom: 40px;" :style="{ background: list.bgcolor}"><!-- style="padding-top: 22px; padding-bottom: 40px;" -->
		<div class='activity-detail' v-if='list.rankShow'>
			<p>我的排行：
				<span v-show='list.rankMsg.rank!=0'>{{list.rankMsg.rank}}名</span>
				<span v-show='list.rankMsg.rank==0'>未上榜</span>
			</p>
			<p v-show='list.rankMsg.rank!=0'>累计获利：
				<strong>{{list.rankMsg.totalProfit}}</strong>
				<img v-show='list.rankMsg.moneyType==0' src="../../../assets/img/eventGroup/event_wuxian.png" alt="">
				<img v-show='list.rankMsg.moneyType==1' src="../../../assets/img/eventGroup/event_weilai.png" alt="">
			</p>
			<p v-show='list.rankMsg.rank!=0'>待领奖品：
				<span>{{list.rankMsg.prizeName}}&nbsp&nbsp
					<i>{{list.rankMsg.prizeNum}}个</i>
				</span><a @click='receive'>去领取&nbsp&gt</a>
			</p>
		</div>
		<!-- 一个题材组展示题材 -->
		<div v-if='list.eventGroupNum==1' class='activity-list'>
			<div class='activity-img'>
				<img v-show='list.eventGroups[0].groupType==0' src="../../../assets/img/newAct/activity_pj.png" alt="">
				<img v-show='list.eventGroups[0].groupType==1' src="../../../assets/img/newAct/activity_yc.png" alt="">
				<img v-show='list.eventGroups[0].groupType==2' src="../../../assets/img/newAct/activity_sg.png" alt="">
			</div>
			<!-- <div class='activity-list-title'><a href="javascript:;" @click="gotoGroup(list.eventGroups[0].groupId)">{{list.eventGroups[0].groupName}}</a></div> -->
			<div class='activity-list-title'><h2>{{list.eventGroups[0].groupName}}</h2></div>
			<div v-show='list.eventGroups[0].groupStatus==0' class='activity-list-stateA'>
				<div class='activity-list-stateAL'>状态：</div>
				<div class='activity-list-stateAR'>进行中</div>
			</div>
			<div v-show='list.eventGroups[0].groupStatus==1' class='activity-list-stateB'>
				<div class='activity-list-stateBL'>状态：</div>
				<div class='activity-list-stateBR'>已暂停</div>
			</div>
			<div v-show='list.eventGroups[0].groupStatus==2 || list.eventGroups[0].groupStatus==3' class='activity-list-stateB'>
				<div class='activity-list-stateBL'>状态：</div>
				<div class='activity-list-stateBR'>已结束</div>
			</div>
			<div v-show='list.eventGroups[0].groupStatus==4' class='activity-list-stateC'>
				<div class='activity-list-stateCL'>状态：</div>
				<div class='activity-list-stateCR'>即将开始</div>
			</div>
			<ul class='activity-list-box clearfix'>
				<!-- <li v-for='i in list.eventGroups[0].events' @click="list.eventGroups[0].events.length > 1 ? gotoGroup(list.eventGroups[0].groupId) : gotoEvent(i.eventId)"> -->
				<li v-for='i in list.eventGroups[0].events' @click='title(i.eventId,list.eventGroups[0])'>
					<img :src="i.eventImg" alt="">
					<p>{{i.eventName}}</p>
				</li>
			</ul>
			<div class='activity-list-bottom'>共{{list.eventGroups[0].eventNum}}个话题</div>
		</div>
		<!-- 多个题材组展示形式 -->
		<div v-if='list.eventGroupNum>1' class='activity-list-group'>
			<dl v-for='i in list.eventGroups' @click='title(i.events[0].eventId,i)'>
				<dt>
					<img :src="i.groupImg" alt="">
				</dt>
				<dd>
					<h6>{{i.groupName}}</h6>
					<div v-show='i.groupStatus==0' class='activity-list-stateA'>
						<div class='activity-list-stateAL'>状态：</div>
						<div class='activity-list-stateAR'>进行中</div>
					</div>
					<div v-show='i.groupStatus==1' class='activity-list-stateB'>
						<div class='activity-list-stateBL'>状态：</div>
						<div class='activity-list-stateBR'>已暂停</div>
					</div>
					<div v-show='i.groupStatus==2 || i.groupStatus==3' class='activity-list-stateB'>
						<div class='activity-list-stateBL'>状态：</div>
						<div class='activity-list-stateBR'>已结束</div>
					</div>
					<div v-show='i.groupStatus==4' class='activity-list-stateC'>
						<div class='activity-list-stateCL'>状态：</div>
						<div class='activity-list-stateCR'>即将开始</div>
					</div>
					<p>开始时间：{{formatDate(i.groupStartTime)}} — 结束时间 {{formatDate(i.groupEndTime)}}</p>
					<a>查看话题&nbsp&gt</a>
				</dd>
				<div class='activity-img'>
					<img v-show='i.groupType==0' src="../../../assets/img/newAct/activity_pj.png" alt="">
					<img v-show='i.groupType==1' src="../../../assets/img/newAct/activity_yc.png" alt="">
					<img v-show='i.groupType==2' src="../../../assets/img/newAct/activity_sg.png" alt="">
				</div>
			</dl>
		</div>
		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
		<Aalert :text='alertText' v-show='alert' @vshow='vshow'/>
		<confirm  :ticket='confirm.ticket' :ticketType='confirm.ticketType' :titleeDate='titleeDate' v-show='confirm.confirm' @vClose='vClose'/>
		<!-- <confirmNoPay class='confirmNoPay'/> -->
	</div>
</template>
<script>
import Login from '../../common/Login'
import confirm from '../confirm/confirmModal'
// import confirmNoPay from '../confirm/confirmNoPay'
import Aalert from '../../common/alert'
	export default{
		components: {
			Aalert,
	    	Login,
	    	confirm,
	    	// confirmNoPay,
	  	},
		data(){
			return{
				weixinShare:this.$base_url+'/activity/v1/activity/shareAct/' + this.$route.params.id,
				share:{
					url: 'http://www.ifuturex.com',
					title:null,
					img:null,
        		},
				getTime:new Date().getTime(),
				h:null,
				isShowLoginModal: false,
				alertText:null,
				alert:false,
				confirm:{
        			confirm:false,
        			ticket:null,
        			ticketType:null,
        		},
        		titleeDate:{
        			groupType:null,
        			titleId:null,
        			id:null,
        			i:null,
        			list:{}
        		},
        		needShare:0,
        		path:null,//取决于跳 event || group 的路径
				list:{
					"url":'',
				    "actName": "",
				    "actStage": 1,
				    "activityId": 0,
				    bgcolor:'',
				    "eventGroupNum":2,
				    "eventGroups": [
				      {
				        "eventNum": 0,
				        "events": [
				        ],
				        "groupEndTime": {
				          "date": 0,
				          "day": 0,
				          "hours": 0,
				          "minutes": 0,
				          "month": 0,
				          "nanos": 0,
				          "seconds": 0,
				          "time": 0,
				          "timezoneOffset": 0,
				          "year": 0
				        },
				        "groupId": 0,
				        "groupImg": "string",
				        "groupName": "",
				        "groupStartTime": {
				          "date": 0,
				          "day": 0,
				          "hours": 0,
				          "minutes": 0,
				          "month": 0,
				          "nanos": 0,
				          "seconds": 0,
				          "time": 0,
				          "timezoneOffset": 0,
				          "year": 0
				        },
				        "groupStatus": 4,//左状态
				        "groupType": 2,//右状态
				        "moneyType": 0
				      }
				    ],
				    "rankImg": {
				    	pc:'',
				    	app:''
				    },
				    "moneyType": 0,
				    "rankImg": {},
				    "rankMsg": {
				      "moneyType": 1,//豆豆的类型
				      "prizeName": "",
				      "prizeNum": "1",
				      "rank": 11,//排名
				      "totalProfit": '0'//累计获利
				    },
				    "rankShow": false,
				    "ticket": {
				      "free": false,
				      "invite": false,
				      "join": false,
				      "root": false,
				      "ticketNum": 0,
				      "ticketType": 0
				    }
				},
				trackType:1
			}
		},
		created(){
			// console.log(this.$route.path)
			if(this.$route.path.indexOf('newActivity') > -1){
				this.trackType = 1;
				this.$Bury(window.location.href,this.$route.params.id,1,'huodongxiangqingye_03003')
			}else{
				this.trackType = 4;
				this.$Bury(window.location.href,this.$route.params.id,4,'zhuantixiangqingye_03040')
			}
			this.rank()
			/*//通过地址栏给iframe传值
			this.$router.push({path:this.$route.params.id+'?actStage='+this.list.actStage})*/
		},
		methods:{
			shareBottom(){
				let h=$('body').height()+'px';
				// $(document).scrollTop(100000)
				$('html,body').animate({scrollTop: h}, 1000)
			},
			shareTop(){
				// $(document).scrollTop(0)
				$('html,body').animate({scrollTop: '0px'}, 1000)
			},
			qq(){
				this.$Bury(window.location.href,this.$route.params.id,this.trackType,'huodong_qq')
	  			window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(encodeURI(this.share.url)) + '&title=' + this.share.title + '&summary=玩预测 享快乐！让预测更有价值，让豪礼只属于你！')
	  		},
	  		wb(){
	  			this.$Bury(window.location.href,this.$route.params.id,this.trackType,'huodong_weibo')
	  			window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(this.share.url) + '&title=' + this.share.title + '&ralateUid=5517272291&appkey=134613650&searchPic=true&pic=' + this.share.img)
	  		},
	  		formatDate(timestamp) {
		        return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
		    },
			//控制弹层的显示隐藏
			vshow(){
				this.alert=false;
	  			if(this.alertText=='恭喜您成功参加该活动'){
	  				this.rank()	
	  				if(this.titleeDate.list.eventGroupNum>1){
		  				if(this.titleeDate.i.events.length>1){
			  				this.path='/group/'+this.titleeDate.i.groupId;
			  			}else{
			  				this.path='/event/'+this.titleeDate.id;
			  			}
		  			}else{
		  				this.path='/event/'+this.titleeDate.id;
		  			}
		  			setTimeout(()=>{
			  			if(this.list.ticket.join==true){//是否已参加  /*记得改成true*/
		    				if(this.titleeDate.groupType==2){//跳申购
		    					this.$router.push({path:'/group/'+this.titleeDate.titleId});
		    				}else{
		    					this.$router.push({path:this.path});
		    				}
		    			}
		  			},1000)
		  			
	  			}
			},
			vClose(){
	  			this.confirm.confirm=false;
	  		},
			//控制iframe
			loaded(){
			 //    const vm = this.$refs.iframe.contentWindow;
			 //    var iframe = window.document.getElementById('ifm');
			 //    var bHeight = iframe.contentWindow.document.body.scrollHeight;
				// var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
				// this.h = Math.max(bHeight, dHeight);
			    // this.h = vm.document.body.scrollHeight + 'px';
			    var iframeHeight = $("#ifm").contents().find("body").height();
			    this.h = iframeHeight;
			    console.log(this.h)
			},
			//活动详情、排行请求
			rank(){
				this.$CPOST('/activity/v1/activity/showNewActivity',{
					activityId:this.$route.params.id
				},(res)=>{
					if(res.resultCode === 200){
						this.list = res.resultValue;
						this.titleeDate.list = res.resultValue;
						this.share.title=res.resultValue.shareMsg.activityName;
						this.share.img=res.resultValue.shareMsg.img;
						this.share.url=res.resultValue.appUrl;
						this.needShare = !this.list.needShare;
					}else if(res.resultCode === 10128){
						this.$router.push({path:'/powerError/'})
					}
				})
			},
			//去领取奖品
			receive(){
				this.$router.push({path:'/personal/assets/gift'})
			},
			//就那复杂的一堆判断
			title(id,i){
				this.titleeDate.id=id;
				this.titleeDate.i=i;
				//是否跳申购传值
				this.titleeDate.groupType=i.groupType;
				//首先判断登录
				if(this.$store.state.refreshToken==''){
	  				this.isShowLoginModal=true;
	  				return false
	  			}	
	  			//如果多个题材组&&某一个题材组下只有一个题材跳event否则跳group
	  			/*if(this.list.eventGroupNum>1){
	  				if(i.events.length>1){
		  				this.titleeDate.titleId=i.groupId;
		  				this.path='/group/'+i.groupId;
		  			}else{
		  				this.titleeDate.titleId=id;
		  				this.path='/event/'+id;
		  			}
	  			}else{
	  				this.titleeDate.titleId=i.groupId;
	  				this.path='/event/'+id;
	  			}*/
	  			if(i.events.length>1){
	  				this.titleeDate.titleId=i.groupId;
	  				this.path='/group/'+i.groupId;
	  			}else{
	  				this.titleeDate.titleId=id;
	  				this.path='/event/'+id+'?type=10';
	  			}
	  			//判断门票
	    		this.confirm.ticket=this.list.ticket.ticketNum;//数量
	    		if(this.list.ticket.ticketType==0){
	    			this.confirm.ticketType='金豆';
	    		}else{
	    			this.confirm.ticketType='未来豆';
	    		}
	    		if(this.list.activityStatus==1){
	    			if(this.list.ticket.join==true){//是否已参加  /*记得改成true*/
	    				if(i.groupType==2){//跳申购
	    					this.$router.push({path:'/group/'+this.titleeDate.titleId});
	    				}else{
	    					this.$router.push({path:this.path});
	    				}
	    			}else{
	    				this.alert=true;
						this.alertText='活动已结束';
	    			}
	    		}else if(this.list.activityStatus==2){
	    			if(this.list.ticket.join==true){//是否已参加
	    				if(i.groupType==2){//跳申购
	    					this.$router.push({path:'/group/'+this.titleeDate.titleId});
	    				}else{
	    					this.$router.push({path:this.path});
	    				}
	    			}else{
	    				this.alert=true;
						this.alertText='活动已暂停';
	    			}
	    		}else{
	    			if(this.list.ticket.join==true){
	    				if(i.groupType==2){//跳申购
	    					this.$router.push({path:'/group/'+this.titleeDate.titleId});
	    				}else{
	    					this.$router.push({path:this.path});
	    				}
	    			}else{
	    				if(this.list.ticket.free!=0){//付费
	    					this.confirm.confirm=true;
	    				}else{
	    					this.$CPOST('/activity/v1/activity/app/recordUserJoin',{//新版活动免费/v1/activity/app/recordUserJoin
								activityId:this.$route.params.id
							},(res)=>{
								if(this.list.dataType==0){
									this.alert=true;
									this.alertText='恭喜您成功参加该活动';
								}else if(this.list.dataType==1){
									this.alertText='恭喜您成功参加该活动';
    								this.vshow();
								}
	    					})
	    				}
	    			}
	    		}
			},
			//关闭登录弹框
	  		hideLoginModal() {
	  			this.isShowLoginModal = false;
	  		},
		}
	}
</script>
<style scoped='scoped'>
	#ifm{
		width:100%;border:0;margin:0;padding:0;display: block;
	}
	.activity-detail{
		width: 1000px;line-height: 66px;margin: auto;margin-top: -18px;padding: 0 17px;height: 66px;background: rgba(255,255,255,0.8);
	}
	.activity-detail>p{
		color: #676767;margin-right: 70px;float: left;
	}
	.activity-detail>p>span{
		color: #323232;font-size: 24px;
	}
	.activity-detail>p>strong{
		color: #c60c1b;font-size: 20px;margin-right: 11px;
	}
	.activity-detail>p>a{
		margin-left: 20px;color: #c60c1b
	}
	.activity-list{
		width: 966px;margin:auto;padding: 26px 17px;position: relative;overflow: hidden;border-radius: 11px; margin-top: 22px;background: rgba(255,255,255,0.8);
	}
	.activity-list-title{
		line-height: 28px;
	}
	.activity-list-title>h2{color: #000;font-size: 24px;font-weight: bold;}
	.activity-list-stateA{
		width: 138px;height: 30px;border:solid 1px #0f9939; border-radius: 5px;margin-top: 17px;margin-bottom: 17px;
	}
	.activity-list-stateAL{
		width: 53px;height: 30px;background: #0f9939;color: #fff;font-size: 14px;line-height: 30px;text-align: center;float: left;
	}
	.activity-list-stateAR{
		width: 85px;text-align: center;line-height: 30px;color:#0f9939;font-size: 14px; float: left;
	}
	.activity-list-stateB{
		width: 138px;height: 30px;border:solid 1px #444444; border-radius: 5px;margin-top: 17px;margin-bottom: 17px;
	}
	.activity-list-stateBL{
		width: 53px;height: 30px;background: #444444;color: #fff;font-size: 14px;line-height: 30px;text-align: center;float: left;
	}
	.activity-list-stateBR{
		width: 85px;text-align: center;line-height: 30px;color:#444444;font-size: 14px; float: left;
	}
	.activity-list-stateC{
		width: 138px;height: 30px;border:solid 1px #d0222c; border-radius: 5px;margin-top: 17px;margin-bottom: 17px;
	}
	.activity-list-stateCL{
		width: 53px;height: 30px;background: #d0222c;color: #fff;font-size: 14px;line-height: 30px;text-align: center;float: left;
	}
	.activity-list-stateCR{
		width: 85px;text-align: center;line-height: 30px;color:#d0222c;font-size: 14px; float: left;
	}
	.activity-img{
		position: absolute;right: 0;top: 0;
	}
	.activity-list-box{
		width: 105%;
	}
	.activity-list-box>li{
		width: 225px;height: 180px;border:solid 1px #dbd7d2;border-radius: 5px;float: left;margin-right: 20px;margin-bottom: 20px; background: #fff; cursor:pointer;
	}
	.activity-list-box>li>img{
		width: 100%;
		height: 125px;
	}
	.activity-list-box>li>p{
		line-height: 46px;padding: 0 8px;font-size: 18px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
	}
	.activity-list-bottom{
		width: 100%;text-align: center;font-size: 18px;margin-top: 19px;font-weight: bold;
	}
	.activity-list-group>dl{
		width: 100%;height: 200px;background: #eeeae5;border-radius: 10px;border:solid 1px #dbd7d2;position: relative;margin-bottom: 15px;margin-top: 15px;overflow: hidden;cursor: pointer;
	}
	.activity-list-group>dl>dt{
		width: 300px;height: 218px;float: left;
	}
	.activity-list-group>dl>dt>img{
		width: 100%;height: 200px;
	}
	.activity-list-group>dl>dd{
		margin-left: 300px; padding:15px;
	}
	.activity-list-group>dl>dd>h6{
		font-size: 22px;color: #444444
	}
	.activity-list-group>dl>dd>p{
		color: #676767;background: url(../../../assets/img/newAct/activity_clock.png) no-repeat 5px 3px;padding-left: 30px;font-size: 16px;margin-bottom: 20px;
	}
	.activity-list-group>dl>dd>a{
		font-size: 16px;color: #c60c1b;margin-left: 5px;
	}
	.activity-list-group{
		width: 1000px;margin:auto;margin-top: 22px;padding: 11px 20px;position: relative;overflow: hidden;background: rgba(255,255,255,0.8);
	}
	.confirmNoPay{
		display: none;
	}
	.activity-share{
		width: 80px;height: 512px;position: fixed;right: 56px;top: 200px;z-index: 999;top: 50%;margin-top: -256px;
	}
	.activity-share img{
		width: 100%;
	}
	.activity-share-qq,.activity-share-wb,.activity-share-wx{
		width: 100%;margin-bottom: 15px;border-radius: 100%;overflow: hidden;cursor: pointer;
	}
	.activity-share-top{
		margin-bottom: 31px;cursor: pointer;
	}
	.activity-share-bottom{
		margin-top: 31px;cursor: pointer;
	}
	.weixin>i {
		width: 246px;height: 233px;position: absolute;bottom: 56px;left: -237px;z-index: 57;background: red;background:url(../../../assets/img/newAct/wxewm.png) no-repeat;display: none;
	} 	
	.weixin>i>img {
	    width: 72%;margin-top: 16px;margin-left: 24px;
	}
	.weixin:hover.weixin>i {
		display: block;
	}
</style>
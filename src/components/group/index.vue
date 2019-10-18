<template>
	<div class="eventGroup" v-show="iseventgroup">
		<!-- 题材组头部信息开始 -->
		<div class="eventGroup_head">
			<h2 class="head_title displayFlex">
				{{eventgroup.groupName}}
				<img v-if="eventgroup.groupExclusiveType==1" src="../../assets/img/eventGroup/labelling.png" alt="" class="daren">
				<box :eventGroup="eventgroup" :eventBox="eventBox"></box>
			</h2>
			<div class="group_key">
				<ul class="clearfix">
					<li v-if="eventgroup.groupEventType == 0 && eventgroup.groupPurchaseType != 1" class="pingjian">评鉴</li>
					<li v-if="eventgroup.groupEventType == 1" class="yuce">预测</li>
					<li v-if="eventgroup.groupEventType == 0 && eventgroup.groupPurchaseType == 1 " class="shengou">申购</li>
					<li v-for="item in tities">
	                    {{item}}
					</li>
				</ul>
			</div>
			<div class="group_time displayFlex">
				<div>开始时间：{{formatDate(eventgroup.groupStartTime)}}</div>
				<div>结束时间：{{formatDate(eventgroup.groupEndTime)}}</div>
				<div class="share_box displayFlex flexMidle" v-if="needShare != 1">
					<div class="attention_box">
						<a href="javascript:;" v-if="add" @click="attention()">关注</a>
						<span v-if="!add">已关注</span>
					</div>
					<div>分享至：</div>
					<div class="share_ico displayFlex">
						<a href="javascript:;" class="qq" @click="qq"></a>
						<a href="javascript:;" class="weibo" @click="wb"></a>
						<a href="javascript:;" class="weixin"><i><img :src="weixinShare" /></i></a>
						<a href="javascript:;" class="qzone" @click="kj"></a>
					</div>
				</div>
			</div>
		</div>
		<!-- 题材组头部信息结束 -->
		<!--下单位置-->
		<div class="eventDetail_order displayFlex flexMidle">
			<div class="eventDetail_order_left">
				<img :src="eventgroup.groupImgpath" />
			</div>
			<div class="eventDetail_order_right flex1">
				<p>
					交易货币:
					<i v-if="eventgroup.shared == 1" :title="this.$store.state.weilaiTitle">
	                  <img src="../../assets/img/eventGroup/event_weilai.png"/>
	                </i>
					<i v-if="eventgroup.shared == 0" :title="this.$store.state.wuxianTitle">
	                  <img src="../../assets/img/eventGroup/event_wuxian.png"/>
	                </i>
				</p>
				<p>
					<span>账户余额:</span>
					<i class="eventG_eye" v-on:click="eyeShow">
					   <img class="evenrt_yanjing" v-show="eye" src="../../assets/img/eventGroup/yanjing.png"/>
					</i>
					<span class="eventG_num" v-show="eyes">
						<i>{{groupyue}}</i>
						<router-link tag="a" to="/personal/recharge" v-if="eventgroup.shared == 1" class="chong_btn"><span>充值</span></router-link>
					</span>
				</p>
				<EventStatus :eventStatus="eventgroup.groupStatus" :group="true"></EventStatus>
			</div>
		</div>
		<div class="eventGroup_detail">
			<div class="eventGroup_detail_top">
				<ul class="eventGroup_detail_list" v-if="eventgroup.groupPurchaseType != 1">
					<li :class="activeTab==0?'eventGroup_detail_active':''" @click="switchTab(0)">列表</li>
					<li :class="activeTab==1?'eventGroup_detail_active':''" @click="switchTab(1)">详情</li>
					<li :class="activeTab==2?'eventGroup_detail_active':''" @click="switchTab(2)">规则</li>
					<li :class="activeTab==3?'eventGroup_detail_active':''" @click="switchTab(3)">行情</li>
					<li :class="activeTab==4?'eventGroup_detail_active':''" @click="switchTab(4)" v-show="Infodetails">相关资讯</li>
					<li :class="activeTab==5?'eventGroup_detail_active':''" @click="switchTab(5)">评论</li>
				</ul>
				<!--申购-->
				<ul class="eventGroup_detail_list"  v-if="eventgroup.groupPurchaseType == 1"> 
					<li :class="activeTab==0?'eventGroup_detail_active':''" @click="switchTab(0)">列表</li>
					<li :class="activeTab==1?'eventGroup_detail_active':''" @click="switchTab(1)">详情</li>
					<li :class="activeTab==2?'eventGroup_detail_active':''" @click="switchTab(2)">规则</li>
					<li :class="activeTab==4?'eventGroup_detail_active':''" @click="switchTab(4)">评论</li>
				</ul>
				<p class="eventGroup_detail_refresh" @click="rufsh">
					<img src="../../assets/img/eventGroup/event_refresh.png" />刷新
				</p>
			</div>
			<div class="eventGroup_box">
				<!--列表-->
				<div class="eventGroup_lists" v-show="activeTab==0" >
					<div class="eventGroup_lists_top"  v-if="eventgroup.groupPurchaseType != 1">
						<p class="eventGroup_lists_top_p1">题材名称</p>
						<p class="eventGroup_lists_top_p2">【Yes】最新成交价</p>
						<p class="eventGroup_lists_top_p3">【No】最新成交价</p>
						<p class="eventGroup_lists_top_p4">状态</p>
						<p class="eventGroup_lists_top_p5">清算价</p>
					</div>
					<!-- 申购-->
					<div class="eventGroup_lists_top" v-if="eventgroup.groupPurchaseType == 1">     
						<p class="eventGroup_lists_top_p1">题材名称</p>
						<p class="eventGroup_lists_top_p2" style="margin-left:47px;">申购价格</p>
						<p class="eventGroup_lists_top_p3">已购总数</p>
					</div>
					<ul class="eventGroup_lists_bottom">
						<Event v-for="item in grouplist" :key="item.eventId" :eventlist="item" v-if="eventgroup.groupPurchaseType != 1"/>
						<li v-for="(item,index) in grouplist" v-if="eventgroup.groupPurchaseType == 1">
							<div @click="toDetail(item.eventId,item.eventType)" class="eventGroup_lists_left">
								<span><img v-lazy="item.eventImgpath"/></span>
								<p>{{ item.eventShort }}</p>
							</div>
							<div class="eventGroup_lists_center">{{item.eventInitialPrice}}</div>
							<div class="eventGroup_lists_right">{{item.eventTradeSum | comdify}}</div>
					  </li>
					</ul>
				</div>
				<!--详情-->
				<div class="eventGroup_lists" v-show="activeTab==1">
					<div class="eventGroup_details">
						<p><pre>{{eventgroup.groupIntroduce}}</pre></p>
						<p>各题材具体规则，请参考各题材下“详情”</p>
						<h4>更多问题，请参见
			        	<router-link tag="a" to="/problems/Login_registration">常见问题</router-link>或者
			        	<router-link tag="a" to="/problems/Strategy_sharing">攻略分享</router-link>
			        </h4>
					</div>

				</div>
				<!--规则-->
				<div class="eventGroup_lists" v-show="activeTab==2">
					<!--<Rule/>-->
					<div class="eventGroup_details">
						<p class="eventGroup_rule"><pre>{{chasedata}}</pre></p>
						<p>各题材具体规则，请参考各题材下“详情”</p>
						<h4>更多问题，请参见<router-link tag="a" to="/problems/Login_registration">常见问题</router-link>或者
				        	<router-link tag="a" to="/problems/Strategy_sharing">攻略分享</router-link>
				        </h4>
					</div>
				</div>
				<!--行情-->
				<div class="eventGroup_lists" v-show="activeTab==3">
					<div class="price_trend_diagram_one">
						<div id="mainLine" style="width:1200px;height:500px;" ref="mainLine"></div>
					</div>
					<div class="price_trend_diagram_one">
						<div id="mainBar" style="width:1200px;height:300px;" ref="mainBar" class="">
						</div>
					</div>
				</div>
				<!--相关资讯-->
				<div class="eventGroup_lists" v-show="newsShow">
					<!-- -->
					<!--资讯列表-->
					<div class="eventGroup_message_box" v-show="showdate">
						<!-- -->
						<div class="eventGroup_message" id="eventGroup_message" v-for="(item,index) in journalism">
							<p class="eventGroup_message_left">
								<!-- <img :src="item.img" /> -->
								<i @click='getdetails(index)'>{{item.consultationTitle}}</i>
							</p>
							<p class="eventGroup_message_right">{{item.updateTime|data}}</p>
						</div>
					</div>
					<!--资讯详情-->
					<div class="about_content_particulars" v-if="showmodeal">
						<!-- -->
						<div class="particulars_kong"></div>
						<div class="particulars_content">
							<div class="particulars_content_title">
								{{journalism[newsdetails].consultationTitle}}
							</div>
							<div class="particulars_content_time">
								发布时间：{{formatDate(journalism[newsdetails].createTime)}}
							</div>
							<article v-html="journalism[newsdetails].content"></article>
						</div>
					</div>
				</div>
				<!--评论-->
				<div class="eventGroup_lists" v-if="activeTab==5 && eventgroup.groupPurchaseType != 1">
					<Comment :objType="1"></Comment>
				</div>
				<div class="eventGroup_lists" v-if="activeTab==4 && eventgroup.groupPurchaseType == 1"> <!--申购-->
					<Comment :objType="1"></Comment>
				</div>
			</div>
		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
		<Aalert :text='alertText' v-if='alert' @yes="yes"></Aalert>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Event from './Event'
	import Rule from './Rule'
	import Login from '../common/Login'
	import Aalert from '../common/alert'
	import Comment from '../common/comment'
	import box from '../common/box'
	import EventStatus from '../common/eventStatus'
	export default {
		name: "eventgroup",
		data() {
			return {
				activeTab: 0,
				iseventgroup:false,
				eventgroup: {
					groupName:''
				},
				eventBox: {},
				details:'',
				eventid:'',
				showindex:false,
				failindex:false,
				tities:[],
                showindexID:false,
                indexID:true,
                groupyue:0,
				add:true,
				eye: true,
				eyes: false,
				money: [],
				grouplist: [],
				twoid:null,
				isShowLoginModal: false,
				isBox: false,
				sharedata:'',
				isShowLoginModal:false,
				currentPage: 1,
				totalPage: 0,
				urladd: '',
				accountcurrency:0,//余额
				dateCurrent:'',
				alert:false,
				configKey:'',
				alertText:'',
				comment:{
					groupcomment:[],//评论列表
					commentCount:0,//评论数量
					commentContent:'',//评论内容
					tolist:[],//回复评论
					flag:true,//阻止连击

				},
				yesType:'',//弹层确定类型
				Infodetails:false,//新闻展示
				newsShow:false,
				showmodeal: false,//新闻详情
				showdate: true,//新闻列表
				journalism: [],
				newsdetails:0,//新闻详情
				title: '',
				chasedata:'',//规则
				needShare:0,
				weixinShare:this.$base_url+'/event/v1/eventGroup/userInvitationEventPc/' + this.$route.params.id + '/' + 0
			}
		},
		components: {
			Event,
			Rule,
			Login,
			Aalert,
			Comment,
			box,
			EventStatus
		},
		filters: {
			data: function(input) {
				var d = new Date(input);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
				var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
				var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
				var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			},
			formatDate(timestamp) {
				return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
			},
			days: function(input) {
				var d = new Date(input);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? +d.getDate() : '' + d.getDate();
				var hour = d.getHours();
				var minutes = d.getMinutes();
				var seconds = d.getSeconds();
				return day;
			},
			fixed: function(value) {
				return value.toFixed();
			},
			comdify(n) { 
	          let re = /\d{1,3}(?=(\d{3})+$)/g; 
	          let n1 = String(n).replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { 
	          return s1.replace(re, "$&,") + s2; 
	          }); 
	          return n1; 
	        }
		},
		created() {
			this.$Bury(window.location.href,this.$route.params.id,2,'ticaizuxiangqingye_02011');
			setTimeout(()=>{
				this.getEventGroup() //题材组列表
			},50)
			
		},
		mounted() {
			this.echarts();
		},
		methods: {
			hideLoginModal() {
				this.isShowLoginModal = false
			},
			eyeShow() {
				this.$Bury(window.location.href,this.$route.params.id,2,'groupBalance_04024');
				if(this.$store.state.refreshToken == '') {
					this.isShowLoginModal = true
				} else {
					this.isShowLoginModal = false
					this.eyes = true;
					this.eye = false
					if(this.eventgroup.shared == 1) {
						this.balance() //账户余额
					} else {
						this.Eventyue() //独立账户
					}
				}
			},
			 //跳转详情页
		      toDetail(id,type){
		      	if(this.$store.state.refreshToken == ''){
					this.isShowLoginModal = true;
				}else{
					this.$router.push({path:'/subscribeDetail/'+id,query: {type:type}})
				}
		      },
			//时间戳	
			formatDate(timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
			},
			
			switchTab(index) {
				this.activeTab = index;
				if(index != 4) {
					this.showdate = true;
					this.showmodeal =false;
					this.newsShow = false;
				}else{
					this.newsShow=true;
				}
				switch(index){
					case 1:
					this.$Bury(window.location.href,this.$route.params.id,2,'ticaizuxiangqing_03017');
					break;
					case 2:
					this.$Bury(window.location.href,this.$route.params.id,2,'ticaizuguize_03018');
					break;
					case 3:
					this.$Bury(window.location.href,this.$route.params.id,2,'ticaizuhangqing_03019');
					break;
					case 4:
					this.$Bury(window.location.href,this.$route.params.id,2,'ticaizuzixun_03034');
					break;
					case 5:
					this.$Bury(window.location.href,this.$route.params.id,2,'ticaizupinglun_03020');
					break;
				}
			},
			// 题材组列表
			getEventGroup() {
				this.$CPOST('/event/v1/eventGroup/queryEventInformationInfo', {
						 groupId:this.$route.params.id
					},(res) => {
						if(res.resultCode == 200){
							this.needShare = res.resultValue.needShare;
							this.eventgroup = res.resultValue.eventGroup;
							this.eventBox = res.resultValue.groupBoxData;
							this.urladd = res.resultValue.shareConstant.url;
							this.grouplist = res.resultValue.eventInformationEntityList;
							this.groupStartTime = res.resultValue.eventGroup.groupStartTime;
							this.groupEndTime = res.resultValue.eventGroup.groupEndTime;
							this.tities = res.resultValue.eventTagEntities
							this.iseventgroup = true;
							// 导航当前状态
							if(this.eventgroup.groupEventType){
								this.$store.commit('setNavIdx',1);
							}else{
								this.$store.commit('setNavIdx',2);
							}
							
							if(this.eventgroup.groupStatus === 4) {
								this.dateCurrent = '距开始' + res.resultValue.dateCurrent
							} else if(this.eventgroup.groupStatus === 0 ) {
								if(res.resultValue.dateCurrent == "超过30天") {
									this.dateCurrent = '结束时间' + this.formatDate(this.eventgroup.groupEndTime)
								}else {
									this.dateCurrent = '距结束' + res.resultValue.dateCurrent
								}
							}else if(this.eventgroup.groupStatus === 1){
								this.dateCurrent = '已暂停'
							} else if(this.eventgroup.groupStatus === 2) {
								this.dateCurrent = '已清算'
							} else {
								this.dateCurrent = '已结束'
							}
							if(this.$store.state.refreshToken != ''){
								this.isAttention();
							}
							
							this.detailevent();
							this.getGroupDatainfo();
						}else if(res.resultCode == 10128){
							this.$router.push({path:'/powerError/'});
						}else if(res.resultCode == 10129){
							this.$router.push({path:'/login/'});
						}else if(res.resultCode == 10130){
							this.$router.push({path:'/newActivity/'+res.resultValue.activityId});
						}else{
							alert(res.resultMessages);
							this.$router.go(-1);
						}
				})
				
			},
			qq() {
				this.$Bury(window.location.href,this.$route.params.id,2,'group_qq');
				this.userDoTask();
				window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(encodeURI(this.urladd)) + '&title=玩预测 享快乐！让预测更有价值，让豪礼只属于你！ ')
			},
			wb() {
				this.$Bury(window.location.href,this.$route.params.id,2,'group_weibo');
				this.userDoTask();
				window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(this.urladd) + '&title=玩预测 享快乐！让预测更有价值，让豪礼只属于你！')
			},
			kj() {
				this.$Bury(window.location.href,this.$route.params.id,2,'group_qzone');
				this.userDoTask();
				window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.urladd + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！' )
			},
			userDoTask(){
				if(this.$store.state.refreshToken != ''){
					this.$CPOST('/task/v1/task/userDoTask', {
						key: 'DAILY_SHARE',
					})
				}
			},
			// 获取相关资讯
			getGroupDatainfo() {
				this.$CPOST('/event/v1/eventInfo/queryEventGroupEventDataInfo', {
					consultationBindingType:1,
					eventInfoId:this.$route.params.id
				}, (res) => {
					this.journalism = res.resultValue.consultationInfoEntityList;
					// this.newsId = res.resultValue.newsList.newsId;
					if(this.journalism.length > 0) {
						this.Infodetails = true
					}
				})
			},
			//资讯详情
			getdetails(v) {
				this.newsdetails = v;
				this.showdate = false
				this.showmodeal = true
				// this.$CPOST('/share/news/getShareNewsDetail', {
				// 	id: 0,
				// 	newsId: v
				// }, (res) => {
				// 	this.newsdetails = res.resultValue
				// 	this.showdate = false
				// 	this.showmodeal = true
				// })
			},
			yes(){
				switch(this.yesType){
					case 'pinglun':
					this.getComment();
					break;
				}
			},

			// 是否关注
			isAttention(){
		        this.$CPOST('/account/v1/userAttention/queryIsUserAttention', {
		              attentionEventType: this.eventgroup.groupEventType,
		              attentionType: 1,
		              attentionTypeId: this.$route.params.id
		          }, (res) => {
		            if(res.resultValue==false){
		              	this.add=true;
		            }else{
		            	this.add=false;
		            }
		          })
		      },
		    //添加关注
	      attention(){
	      	if(this.$store.state.refreshToken == '') {
				this.isShowLoginModal = true;
				return false
			}
	        this.$CPOST('/account/v1/userAttention/addUserAttention', {
	              attentionEventType: this.eventgroup.groupEventType,
	              attentionType: 1,
	              attentionTypeId: this.$route.params.id,
	          }, (res) => {
	            if(res.resultCode === 200){
	            	this.add=false;
	            }
	          })
	      },
			//时间戳	
		   	formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
			},
				
			alertDailog(txt){
				$('.confirm_modal').show();
				this.alertText=txt;
			},
			
			keyup(e,type){
				var sum = 500;
				var len = e.path[0].value.length;
				if(type == 1){
					var size = e.path[2].childNodes[2].childNodes["0"].firstChild.children["0"];
				}else{
					var size = e.path[4].querySelector('.reply_b_size');
				}
				
				var last = sum - len;
				size.innerText = last;
			},
			//独立余额
		    Eventyue() {
		    	this.$CPOST('/event/v1/eventUniqueUser/queryEventUniqueUser', {
					groupId: this.$route.params.id
				}, (res) => {
					this.groupyue = res.resultValue.eventUniqueUserEntity.uniqueBalance
				})
			},
			//公开余额
		   balance() {
		   		this.$CPOST('/account/v1/userAccount/queryUserAccount', {
					userId: 10
				},(res) => {
					this.groupyue = res.resultValue.userAccountEntity.currency
				})
			},
			dateYYMM (timestamp){
	            return this.$dateFormat(timestamp, 'mm-dd')
	       	 },
	       	 dateYYMMDD(timestamp){
	       	 	return this.$dateFormat(timestamp, 'yyyy-mm-dd');
	       	 },
			//趋势图
			echarts() {
				var _this = this;
				var myChart = this.$echarts.init(this.$refs.mainBar)//this.$echarts.init(document.getElementById('mainBar'));
				var myCharts = this.$echarts.init(this.$refs.mainLine)//this.$echarts.init(document.getElementById('mainLine'));
				var nameValue = [];
				this.$CPOST('/event/v1/eventGroup/queryEventInformationInfo', {
						 groupId:this.$route.params.id
					},(res) => {				
					var eventList = res.resultValue.eventInformationEntityList;
						for(var i=0;i<eventList.length;i++){
							var eventShort = eventList[i].eventShort;
							nameValue.push(eventShort);
							
						}
				myChart.setOption({
					title: {
						text:'成交量柱形图',
						x:'center'
					},
					grid: {
						containLabel: true,
						left:45,
						right:45
					},
					tooltip: {
				        trigger: 'axis'
				    },
				    toolbox: {
			            left: 'center',
			            top:'7%',
			            feature: {
			                dataZoom: {
			                    yAxisIndex: 'none'
			                },
			                restore: {},
			                saveAsImage: {}
			            }
			        },
					xAxis: {
						type: 'category',
        				boundaryGap: false,
					},
					yAxis: {
						type:'value',
						min: 0
					},
					series: [{
						name: '销量',
						type: 'bar',
						barWidth: 15,
						itemStyle: {
							normal: {
								color: '#272f44'
							}
						},
						data: []
					}]
				});
				myCharts.setOption({
					title: {
						text:'价格走势图',
						x:'center'
					},
					tooltip: {
				        trigger: 'axis'
				    },
				    toolbox: {
			            left: 'center',
			            top:'10%',
			            feature: {
			                dataZoom: {
			                    yAxisIndex: 'none'
			                },
			                restore: {},
			                saveAsImage: {}
			            }
			        },
					grid: {
						containLabel: true,
						left:45,
						right:45,
						top:'20%'
					},
					legend: {     //图例组件
						icon: 'pin',
						left:'10%',
						right:'10%',
						top:'6%',
						type:'scroll',
			            data: nameValue
			        },
					xAxis: {
						type: 'category',
        				boundaryGap: false,
					},
					yAxis: {
						type:'value',
						gridIndex:0,
						max:100,
						maxInterval:5,
						splitLine: {
			                show: true
			            }
					},
					series: [{
						name: '',
						type: 'line',
						data: []
					}]
				});
		        this.$CPOST('/event/v1/eventGroup/queryEventGroupChart', {
		            groupId:this.$route.params.id
		          },(res) => {
		            var names=[];    	//类别数组（实际用来盛放X轴坐标值）
		            var nums=[];    	//销量数组（实际用来盛放Y坐标值）
		            var result=res.resultValue.orderTrendCharts;
		            var colors = ['#5793f3', '#d14a61', '#675bba'];
		            function compare(propertyName) { 
						return function (object1, object2) { 
							var value1 = object1[propertyName]; 
							var value2 = object2[propertyName]; 
							if (value2 < value1) { 
								return 1; 
							} 
							else if (value2 > value1) { 
								return -1; 
							} 
							else { 
								return 0; 
							} 
						} 
					}
					result.sort(compare('statisticsTime'));
		            if(result){
	            		var chengjiao=[];

					//渲染价格走势图数据
			            var sData=[];
			            var times=[];
			            var len = [];
			            var seleted = {}
			            for(var i=0;i<result.length;i++){  
			            	len.push(result[i].length);
			                var item = {};
			                var timeItem = [];
			                var timeItem2 = [];
			                item.name= nameValue[i];
			                item.type='line';
			                //item.smooth= true;
			                item.data=[];
			                result[i].sort(compare('statisticsTime'));
			                // console.log('colors==>'+colors[i])
							for(var u=0;u<result[i].length;u++){
								// timeItem.data.push(result[i][u].statisticsTime);
								
			                  	if(result[i][u].middleRate==="0.00"&&u!=0){
			                  		item.data.push(result[i][u-1].middleRate);
									result[i][u].middleRate = result[i][u-1].middleRate;
			                  	}else{
			                  		item.data.push(result[i][u].middleRate)
			                  	}
			                  	if(u == 0){
			                  		timeItem.push('')
			                  	}else{
			                  		timeItem.push(_this.dateYYMMDD(result[i][u].statisticsTime))
			                  		timeItem2.push(_this.dateYYMMDD(result[i][u].statisticsTime))
		                  		}
		                	}

		                	sData[i]=item;
		                  	times[i] = timeItem;
		                  	// console.log('sData==>'+JSON.stringify(sData))
			                  	
			            }
			            //判断题材是否多于10条
			            if(nameValue.length > 10){
			            	for(var i=10;i<nameValue.length;i++){ 
			            		seleted[nameValue[i]] = false;
			            	}
			            }
			            len.sort(function(a,b){
			            	return (a < b) ? -1 : 1
			            })
			            var minLen = len[0];
			            for(var i = 0; i<minLen;i++){

			            	if(i > 0){
				            	chengjiao[i-1] = 0;
				            	for(var k = 0; k<result.length;k++){
				            		chengjiao[i-1]+=result[k][i].tradeQuantity;
				            	}
			            	}else{
			            		//chengjiao[0]=0;
			            	}
			            }
			            chengjiao.splice(0,0,0);
			            myCharts.setOption({        //加载数据图表
	                        xAxis: {
	                        	data:timeItem
	                        },
	                        legend:{
	                        	selected:seleted
	                        },
	                        dataZoom: [{
					            startValue: timeItem[0]
					        }, {
					            type: 'inside'
					        }],
	                        series: sData
	                    });
	                    console.log(JSON.stringify(chengjiao))
		                myChart.setOption({        //加载数据图表
	                          xAxis: {
	                        	data:timeItem
	                        },
	                        dataZoom: [{
					            startValue: timeItem[0]
					        }, {
					            type: 'inside'
					        }],
	                          series: [{
	                              name: '销量',
	                              data: chengjiao
	                          }]
	                      });
		            	
		            	}

	                    
	                    
		        	});
				})
		    },
			//刷新
			rufsh() {
			},
			//规则
			detailevent() {
				if(this.eventgroup.groupPurchaseType == 1){
					this.configKey = 'event_sg'
				}else{
					if(this.eventgroup.groupEventType == 1) {
						this.configKey = 'event_yc'
					}else{
						this.configKey = 'event_pj'
					}
				}
				this.$CPOST('/share/v1/shareConfig/queryShareConfig', {
					 configKey: this.configKey
				},(res) => {
                    this.chasedata = res.resultValue.configEntity.configValue
				})
			},

		}
	}
</script>
<style scoped>
.paging {margin-top: 30px;}
.el-pagination {text-align: center;}
pre {width: 1079px;white-space: pre-wrap;word-break: break-word;overflow: hidden;}
.eventGroup {width: 1200px;margin: auto;margin-top: 30px;}
.eventGroup_head{border:solid 1px #d5d5d5; border-width:1px 0; padding:14px 0;}
.eventGroup_head h2.head_title{font-size: 24px; color: #323232; font-weight: bold; line-height: 24px; margin-bottom: 10px;}
.eventGroup_head h2.head_title img.daren{width: 30px; height: 30px; margin-left: 10px;}
.eventGroup_head h2.head_title span{display: inline-block; vertical-align: middle; margin-left: 15px; width: 36px;}
.eventGroup_head h2.head_title span img,.share_box .share_ico a.weixin i img{width: 100%;}
.eventGroup_head .group_key{margin-bottom:10px;}
.eventGroup_head .group_key li{line-height: 24px; border:solid 1px #e5e5e5; display: inline-block; padding:0 8px; color: #343434; float:left; margin-right: 10px;}
.eventGroup_head .group_key li.yuce{background: #e83c49; border-color: #e83c49; color: #fff;}
.eventGroup_head .group_key li.pingjian{background: #4867aa; border-color: #4867aa; color: #fff;}
.eventGroup_head .group_key li.shengou{background: #ffac53; border-color: #ffac53; color: #fff;}
.eventGroup_head .group_time{color: #676767; position: relative;}
.eventGroup_head .group_time>div{margin-right: 35px;}
.eventGroup_head .group_time .price{color: #323232;}
.eventGroup_head .group_time .share_box{position: absolute;right: 0; top:0; font-size: 12px; margin-right: 0;}
.share_box .attention_box{border-right:solid 1px #e6e6e6; padding-right: 10px; margin-right: 10px;}
.share_box .attention_box a{color:#e83c49; display: inline-block; background: url(../../assets/img/eventGroup/event_add.png) no-repeat left center; padding-left: 14px;}
.share_box .share_ico a{display: block; width:14px; height: 14px; margin-right: 6px;}
.share_box .share_ico a.qq{background: url(../../assets/img/eventgroup/share_qq_01.png) no-repeat;}
.share_box .share_ico a.qq:hover{background-image: url(../../assets/img/eventgroup/share_qq_11.png);}
.share_box .share_ico a.weibo{background: url(../../assets/img/eventgroup/share_weibo_02.png) no-repeat;}
.share_box .share_ico a.weibo:hover{background-image: url(../../assets/img/eventgroup/share_weibo_22.png);}
.share_box .share_ico a.weixin{background: url(../../assets/img/eventgroup/share_weixin_03.png) no-repeat; position: relative;}
.share_box .share_ico a.weixin i{display: none; position: absolute; top: 18px;left: -40px;width: 120px;}
.share_box .share_ico a.weixin:hover{background-image: url(../../assets/img/eventgroup/share_weixin_33.png);}
.share_box .share_ico a.weixin:hover i{display: block;}
.share_box .share_ico a.qzone{background: url(../../assets/img/eventgroup/share_kongjian_04.png) no-repeat;}
.share_box .share_ico a.qzone:hover{background-image: url(../../assets/img/eventgroup/share_kongjian_44.png);}


.eventDetail_order{border-bottom:solid 1px #d5d5d5;}
.eventDetail_order_left{margin-top: 11px;padding-bottom: 11px;margin-right: 30px;width: 208px;height: 130px;}
.eventDetail_order_left>img{width: 100%;height: 100%;}
.eventDetail_order_right{position: relative;}
.eventDetail_order_right>p{color: #676767; font-size: 14px; vertical-align: middle; margin-bottom: 15px;}
.eventDetail_order_right>p img{vertical-align: middle;margin-left: 5px;}
.eventDetail_order_right .shengouBuy{display: block; width: 98px; height: 32px; line-height: 32px; border-radius: 3px; color: #fff; font-size: 16px; text-align: center; background: #f52f3e;}
.eventDetail_order_right .shengouBuy:hover{background: #c60c1b;}
.evenrt_yanjing{cursor: pointer;}
.eventG_num i{color: #323232;font-size: 22px;}
.chong_btn{display: inline-block; line-height: 24px; padding:0 15px; color: #c71220; font-size: 12px; border:solid 1px #dfdfdf; vertical-align: middle; border-radius: 3px; margin-left: 5px;}
.chong_btn span{display: inline-block; background: url('../../assets/img/eventGroup/event_chong.png') no-repeat left center; padding-left: 16px;}
.chong_btn:hover{border-color:#c71220;}
.eventG_share {display: inline-block;color: #a4a4a4;font-size: 12px;margin-left: 5px;vertical-align: bottom;}
.eventG_share>span>img,.eventG_share>span {vertical-align: middle;}
.eventG_share>span>img {cursor: pointer;margin: 1px;}
.eventG_share>span>img+img {display: none;}
.eventG_share>span:hover>img {display: none;}
.eventG_share>span:hover>img+img {display: inline;}
.weixin {position: relative;}
.weixin>i {position: absolute;top: 18px;left: -40px;width: 120px;height: 120px;z-index: 57;display: none;}
.weixin>i>img {width: 100%;height: 100%;}	
.weixin:hover.weixin>i {display: block;}	
.eventGroup_center_right {width: 287px;height: 145px;border-left: 1px dashed #dfdfdf;float: right;}
.eventGroup_center_yet {color: #323232;}
.eventGroup_detail {width: 100%;margin-top: 30px;margin-bottom: 80px;overflow: hidden;}
.eventGroup_detail_top {height: 52px;border: 1px solid #e6e6e6;}
.eventGroup_detail_list {height: 50px;float: left;}	
.eventGroup_detail_list>li {width: 123px;height: 100%;cursor: pointer;line-height: 50px;text-align: center;color: #323232;font-size: 16px;border-left: 1px solid #fff;border-right: 1px solid #fff;float: left;}
.eventGroup_detail_list>li.eventGroup_detail_active {color: #e52735;border-top: 2px solid #e52735;margin-top: -1px;border-left: 1px solid #e6e6e6;border-right: 1px solid #e6e6e6;}
	
.eventGroup_detail_refresh {height: 100%;line-height: 52px;color: #676767;font-size: 12px;float: right;margin-right: 20px;cursor: pointer;}
	
.eventGroup_detail_refresh>img {margin-right: 5px;}
	
.eventGroup_lists {border: 1px solid #e6e6e6;border-top: 0;overflow: hidden;}
	/***列表***/
	
.eventGroup_lists_top {height: 67px;border-bottom: 1px solid #e6e6e6;}
	
.eventGroup_lists_top>p {height: 100%;line-height: 67px;text-align: center;font-size: 14px;color: #676767;float: left;}
	
.eventGroup_lists_top_p1 {width: 364px;}
	
.eventGroup_lists_top_p2 {width: 160px;margin-left: 34px;}
.eventGroup_lists_top_p3 {width: 160px;margin-left: 70px;}
	
.eventGroup_lists_top_p4 {width: 160px;text-align: center;margin-left: 50px;}
	
.eventGroup_lists_top_p5 {width: 160px;text-align: center;}
	
.eventGroup_lists_bottom {padding: 10px 17px 22px 47px;}
	
.eventGroup_lists_bottom>li {height: 60px;line-height: 60px;font-size: 14px;color: #676767;clear: both;}
	/***详情****/
	
.eventGroup_details {width: 1079px;margin: auto;margin-bottom: 26px;}
	
.eventGroup_details>p {color: #323232;font-size: 14px;line-height: 22px;margin-top: 26px;white-space: pre-wrap;word-break: break-word;}
.eventGroup_rule {margin-top: 26px;}
	
.eventGroup_rule>li {color: #323232;font-size: 14px;line-height: 24px;white-space: pre-wrap;word-break: break-word;}
	
.eventGroup_details>h4 {font-size: 14px;font-weight: 500;color: #676767;}
	
.eventGroup_details>h4>a {color: #3282ff;text-decoration: underline;}
	/***行情****/
	
.eventD_price {width: 100%;height: 280px;margin-top: 32px;}
	
.eventD_price_yes {width: 421px;height: 276px;margin-left: 40px;border: 1px solid #e6e6e6;float: left;}
	
.eventD_price_yes_top {width: 100%;height: 38px;background: #f58b3d;}

.eventD_price_no_top {width: 100%;height: 38px;background: #4588f6;}

.eventD_price_yes_top>li,.eventD_price_no_top>li {width: 50%;height: 100%;line-height: 38px;color: #ffffff;font-size: 16px;text-align: center;float: left;}

.eventD_price_buy {background: none !important;}

.eventD_price_buy {width: 49%;height: 240px !important;float: left;}

.eventD_price_yes>p {width: 2px;line-height: 240px;float: left;}

.eventD_price_yes>p>img {vertical-align: middle;}

.eventD_price_buy>thead {width: 100%;}

.eventD_price_buy>thead>tr {height: 38px;line-height: 38px;font-size: 14px;color: #313131;}

.eventD_price_buy>thead>tr th {font-weight: 500;width: 25%;height: 50px;}

.eventD_price_buy>tbody>tr td {height: 39px;text-align: center;color: #323232;font-size: 14px;}

.price_trend_diagram_one {width: 100%;margin-top: 20px;margin-bottom: 20px;}

.price_diagram_title {height: 22px;line-height: 22px;color: #252f45;font-size: 22px;text-align: center;margin-bottom: 20px;}

.price_diagram_pic {width: 1140px;height: 344px;border: solid 1px #e6e6ec;margin: 0 auto;}
	
.placeOrder_main {border-bottom: solid 1px #c4c4c4;}
	
.placeOrder_main>p {width: 2px;height: 258px;float: left;line-height: 258px;}
	
.placeOrder_main>p>img {vertical-align: middle;}
	/****相关资讯***/
	
.eventGroup_message_box {width: 1166px;margin: auto;margin-bottom: 26px;}
	
.eventGroup_message {width: 100%;height: 30px;line-height: 30px;margin-top: 18px;}
	
.eventGroup_message_left {float: left;color: #424242;font-size: 14px;}
	
.eventGroup_message_left>img {width: 20px;height: 18px;vertical-align: middle;}
	
.eventGroup_message_left>i {vertical-align: middle;cursor: pointer;}
	
.eventGroup_message_right {float: right;color: #828282;font-size: 14px;}
	
.Leave_hide {display: inline-block;width: 100%;}
	
.hand_left {margin-left: 0;}
	
.div_p {display: inline-block;color: #5e5e5e;font-size: 16px;}
	
.div_p>a {color: #acacac;}
/*规则*/
	
.eventGroup_details {width: 1079px;margin: auto;margin-bottom: 26px;}
	
.eventGroup_details>p {color: #323232;font-size: 14px;line-height: 22px;margin-top: 26px;}
	
.eventGroup_rule {margin-top: 26px;}
	
.eventGroup_rule>li {color: #323232;font-size: 14px;line-height: 24px;}
	
.eventGroup_details>h4 {font-size: 14px;font-weight: 500;color: #676767;}
	
.eventGroup_details>h4>a {color: #3282ff;text-decoration: underline;}
	
#ideventName li {font-size: 12px;color: #444;}
	
.eventGroup_details>p {color: #323232;font-size: 14px;line-height: 22px;margin-top: 26px;}
	/*相关资讯详情*/
	
.about_content_particulars {width: 1200px;margin: 0 auto;background: white;}
	
.particulars_kong {width: 1160px;height: 39px;border-bottom: solid 1px #ededed;margin: 0 auto;margin-bottom: 30px;}
	
.particulars_content {width: 1028px;margin: 0 auto;}
	
.particulars_content_title {text-align: center;line-height: 35px;font-size: 18px;color: #323232;}
	
.particulars_content_time {text-align: center;line-height: 32px;font-size: 14px;color: #323232;margin-bottom: 5px;}
	
.particulars_content>article {font-size: 16px;color: #323232;text-indent: 2em;line-height: 30px;}
	
.turning {height: 105px;margin-top: 40px;border-top: dashed 1px #e5e5e5;padding-top: 20px;}
	
.turning>p {line-height: 32px;font-size: 14px;color: #323232;cursor: pointer;}
	
.turning_color {color: #e52735 !important;}
	
.dateCurrent {font-size: 12px;}
	
.eventGroup_center_yet>span {width: 80%;height: 100%;margin: 0 auto;}
	
.eventGroup_center_yet>span>i {font-size: 12px;color: #a5a5a5;}
	
.font_position {margin-top: 30px;}





/*申购表格*/
.eventGroup_lists_left{width: 364px;height: 100%;float: left;}
.eventGroup_lists_left>span{width: 94px;height: 60px;display: inline-block;vertical-align: middle;}
.eventGroup_lists_left>span>img{width: 100%;height: 100%;}
.eventGroup_lists_left>p{display: inline-block;vertical-align: middle;margin-left: 5px;cursor: pointer;}
.eventGroup_lists_center,.eventGroup_lists_right{width: 160px;height: 100%;float: left;text-align: center;color: #323232;font-size: 16px;}
.eventGroup_lists_right{margin-left: 52px;}
.eventGroup_lists_center>p,.eventGroup_lists_right>p{font-size: 16px;width: 66px;display: inline-block;}
.eventGroup_lists_center>p.eventGroup_num_top,
.eventGroup_lists_right>p.eventGroup_num_top{color: #c60c1b;}
.eventGroup_lists_center>p.eventGroup_num_down,
.eventGroup_lists_right>p.eventGroup_num_down{color: #098959;}
.eventGroup_lists_bottom>li:nth-child(odd){background:#f2f2f2;}
.eventGroup_lists_state,.eventGroup_lists_result{height: 60px;text-align: center;width: 160px;float: left;}
.eventGroup_lists_state{margin-left: 34px;}
.eventGroup_lists_state>img{width: 56px;height: 56px;}
.eventGroup_lists_result>img{width: 51px;height: 51px;}
</style>
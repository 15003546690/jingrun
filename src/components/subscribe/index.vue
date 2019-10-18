<template>
	<div class="eventGroup" v-if="iseventgroup">
		<!-- 题材组头部信息开始 -->
		<div class="eventGroup_head">
			<h2 class="head_title">
				{{eventgroup.groupName}}
				<box :eventGroup="eventgroup" :eventBox="eventBox"></box>
			</h2>
			<div class="group_key">
				<ul class="clearfix">
					<li class="shengou">申购</li>
					<li v-for="item in tities">
	                    {{item}}
					</li>
				</ul>
			</div>
			<div class="group_time displayFlex">
				<div>开始时间：{{formatDate(eventgroup.groupStartTime)}}</div>
				<div>结束时间：{{formatDate(eventgroup.groupEndTime)}}</div>
				<div class="share_box displayFlex flexMidle">
					<div class="attention_box">
						<a href="javascript:;" v-if="add" @click="attention">关注</a>
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
					<i :title="this.$store.state.wuxianTitle">
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
					</span>
				</p>
				<EventStatus :eventStatus="eventgroup.groupStatus" :group="true"></EventStatus>
			</div>
		</div>
		<div class="eventGroup_detail">
			<div class="eventGroup_detail_top">
				<ul class="eventGroup_detail_list">
					<li :class="activeTab==0?'eventGroup_detail_active':''" @click="switchTab(0)">列表</li>
					<li :class="activeTab==1?'eventGroup_detail_active':''" @click="switchTab(1)">详情</li>
					<li :class="activeTab==2?'eventGroup_detail_active':''" @click="switchTab(2)">规则</li>
					<!-- <li :class="activeTab==3?'eventGroup_detail_active':''" @click="switchTab(3)">行情</li> -->
					<li :class="activeTab==4?'eventGroup_detail_active':''" @click="switchTab(4)">评论</li>
					<!-- <li :class="activeTab==5?'eventGroup_detail_active':''" @click="switchTab(5)">订单</li> -->
				</ul>
				<!-- <p class="eventGroup_detail_refresh"><img src="../../assets/img/eventGroup/event_refresh.png" />刷新</p> -->
			</div>
			<div class="eventGroup_box">
				<!--列表-->
				<div class="eventGroup_lists" v-show="activeTab==0">
					<div class="eventGroup_lists_top">
						<p class="eventGroup_lists_top_p1">题材名称</p>
						<p class="eventGroup_lists_top_p2">申购价格</p>
						<p class="eventGroup_lists_top_p3">已购总数</p>
					</div>
					<ul class="eventGroup_lists_bottom">
						<li v-for="(item,index) in grouplist">
							<div @click="toDetail(item.eventId,item.eventType)" class="eventGroup_lists_left"><!--+ grouplist.eventId-->
								<span><img v-lazy="item.eventImgpath"/></span>
								<p>{{ item.eventShort }}</p>
							</div>
							<div class="eventGroup_lists_center">{{item.groupevent}}</div>
							<div class="eventGroup_lists_right">{{item.eventTradeSum | comdify}}</div>
					  </li>
					</ul>
				</div>
				<!--详情-->
				<div class="eventGroup_lists" v-if="activeTab==1">
					<div class="eventGroup_details">
						<div class="eventD_text">
							<pre>{{getEventdetail}}</pre>
						</div>
					</div>
				</div>
				<!--规则-->
				<div class="eventGroup_lists" v-if="activeTab==2">
					<div class="eventGroup_details">
							<pre>{{chasedata}}</pre>
						</div>
				</div>
				<!--行情-->
				<div class="eventGroup_lists" v-if="activeTab==3">
		         <div>
		         	<div class="price_trend_diagram_one">
		            <div class="price_diagram_title">价格走势图</div>
		            <div class="compellation">
		              <ul id="eventName">
		                <li><span style="background-color: #bf242a"></span>{{eventgroup.groupName}}</li>
		              </ul>
		            </div>
		            <div id="mainLine" style="width:1000px;height:300px;" class="price_diagram_pic"></div>
		          </div>
		          <div class="price_trend_diagram_one">
		            <div class="price_diagram_title">成交量柱形图</div>
		            <div id="mainBar" style="width:1000px;height:300px;" class="price_diagram_pic">
		            </div>
		          </div>
		         </div>
		         
		        </div>
				<!--评论-->
				<div class="eventGroup_lists" v-if="activeTab==4">
					<Comment :objType="1"></Comment>
				</div>
				<!--订单tab-->
				<div class="eventGroup_lists" v-if="activeTab==5">
					<div class="ticket_nav">
						<ul class="ticket_nav_tab">
				        	<li>
				        		待成交
				        	</li>
				       		<li class="active">
				       			<i></i>
				       			持仓
				       		</li>
				       		<li>
				       			<i></i>
				       			平仓
				       		</li>
				       	</ul>
			       	</div>
			       	<!--订单详情开始-->
			       	<div class="positionBox">
						<div class="unsettled">
							<table border="0" cellspacing="0" cellpadding="0">
								<thead>
									<tr>
										<th class="td1">题材名称</th>
										<th class="td2">类型</th>
										<th class="td3">最新价</th>
										<th class="td4">价格</th>
										<th class="td5">待成交量</th>
										<th class="td6">委托总量</th>
										<th class="td7">交易货币</th>
										<th class="td8">操作</th>
									</tr>
								</thead>
								<tbody>
									<tr class="content" v-for="(item,index) in orderAwait" :key="item.eventId">
										<td class="td1">
											<div>{{item.eventName}}</div>
											<p>下单时间：{{formatDate(item.createTime)}}</p>
										</td>
										<td class="td2">{{item.tradeType==1 ? '买入【YES】' : item.tradeType==2 ? '卖出【YES】' : item.tradeType==3 ? '买入【NO】' : item.tradeType==4 ? '卖出【NO】':''}}</td>
										<td class="td3" :class="item.upOrDown==1 ? 'color_green' : item.upOrDown==2 ? 'color_red' : ''">{{item.currentPrice}}
											<img v-if="item.upOrDown==2" src="../../assets/img/index_top.png"/>
											<img v-if="item.upOrDown==1" src="../../assets/img/index_down.png"/>
											{{item.range}}
										</td>
										<td class="td4" v-if="item.placePrice==100||0">市价</td>
										<td class="td4" v-else>{{item.placePrice}}</td>
										<td class="td5">{{item.remainQuantity}}</td>
										<td class="td6">{{item.placeQuantity}}</td>
										<td class="td7">
											<img v-if="item.currency==0" :title="$store.state.wuxianTitle" src="../../assets/img/center/infinite.png" />
											<img v-if="item.currency==1" :title="$store.state.weilaiTitle" src="../../assets/img/center/bean.png" />
										</td>
										<td class="td8">
											<router-link :to="/event/ + item.eventId" tag="a" ><button>继续下单</button></router-link>
											<a href="javascript:;" @click="showModal(index,item.orderId)">取消下单</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="noData" v-show="noData">
							<p><img src="../../assets/img/nodata_icon.png"/></p>
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
												<p>是否取消下单？</p>
											</div>
										</div>
										<div class="confirm_btn">
											<button @click='userAwait()'>确定</button>
											<button @click='hideModal'>取消</button>
										</div>
									</div>
								</div>
							</div>
					</div>
			       	<!--订单详情结束-->
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
				eventgroup: {},
				eventBox: {},
				details:'',
				eventid:'',
				showindex:false,
				failindex:false,
				tities:[],
                showindexID:false,
                indexID:true,
                groupyue:'',
				add:true,
				eye: true,
				eyes: false,
				money: [],
				eventgroup: {},
				grouplist: [],
				twoid:null,
				isShowLoginModal: false,
				isBox: false,
				sharedata:'',
				eventList:[],
				currentPage: 1,
				totalPage: 0,
				urladd: '',
				dateCurrent:'',
				alert:false,
				alertText:'',
				comment:{
					groupcomment:[],//评论列表
					commentCount:0,//评论数量
					commentContent:'',//评论内容
					tolist:[],//回复评论
					flag:true
				},
				yesType:'',//弹层确定类型
				weixinShare:this.$base_url+'/event/v1/eventGroup/userInvitationEventPc/' + this.$route.query.id + '/' + 0,
				orderAwait:[
					{
						orderId:"148034125966692352",
						eventName:"赖清德会在2017年内重启核一反应堆吗？",
						eventId:"3393",
						currency:1,
						currentPrice:"23.10",
						upOrDown:1,
						range:"0.47",
						tradeType:1,
						placeQuantity:1,
						remainQuantity:1,
						placePrice:"100.00",
						delegateType:0,
						createTime:1513223685000
					}
				],
				noData:false,
				isShow: false,
				orderId: '',
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
		created() {
			setTimeout(() => {
				this.getEventGroup()//题材组列表
			    this.isattention()//关注
			},50)
		},
		filters:{
	         data(input) {
	             var d = new Date(input);
	             var year = d.getFullYear();
	             var month = d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1: ''+d.getMonth() + 1;
	             var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
	             var hour = d.getHours() <10 ? '0' + d.getHours() :''+d.getHours();
	             var minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
	             var seconds = d.getSeconds() <10 ? '0' + d.getSeconds() : '' + d.getSeconds();
	             return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	         },
	         formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
			 },
	         fixed(value){
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
		mounted() {
	    },
		methods: {
			switchTab(index) {
				this.activeTab = index;
			},
			hideLoginModal() {
		      this.isShowLoginModal = false
		    },
		    //点击显示宝箱弹层
		    showBoxModal() {
		        this.isBox = !this.isBox;
		    },
			
	         dateYYMM (timestamp){
	            return this.$dateFormat(timestamp, 'yyyy/mm/dd')
	       	 },
			isattention(){
		        this.$CPOST('/account/v1/userAttention/queryIsUserAttention', {
		              attentionEventType: this.$route.query.type,
		              attentionType: 1,
		              attentionTypeId: this.$route.query.id
		          }, (res) => {
		            if(res.resultValue==false){
		              this.add=true;
		            }else{
		              this.add=false;
		            }
		          })
		      },
		      attention(){
		      	this.add=false;
		        this.$CPOST('/account/v1/userAttention/addUserAttention', {
		              attentionEventType: this.$route.query.type,
		              attentionType: 1,
		              attentionTypeId: this.$route.query.id,
		          })
		      },
		      //跳转详情页
		      toDetail(id,type){
		      	if(this.$store.state.refreshToken == ''){
					this.isShowLoginModal = true;
				}else{
					this.$router.push({path:'/subscribeDetail/'+id,query: {type:type}})
				}
		      },
		      //题材组详情
			getdetail() {
				this.$CPOST('/event/v1/eventGroup/queryEventGroupDataInfo', {
						 groupId:this.$route.query.id
					},(res) => {
                        this.getEventdetail = res.resultValue.groupIntroduce;
					})
			},
			  //题材组列表
			getEventGroup() {
				this.$CPOST('/event/v1/eventGroup/queryEventInformationInfo', {
						 groupId:this.$route.query.id
					},(res) => {	
						this.eventgroup = res.resultValue.eventGroup;
						this.eventBox = res.resultValue.groupBoxData;
						this.urladd = res.resultValue.shareConstant.url;
						var groupevent = res.resultValue.eventGroup.groupPValue;
						var groupmonet = res.resultValue.eventGroup.groupNValue;
						this.iseventgroup = true;
						res.resultValue.eventInformationEntityList.forEach(function(item,index){
							item.groupevent = groupevent;
							item.groupmonet = groupmonet;
						})
						this.grouplist = res.resultValue.eventInformationEntityList
						this.sharedata=res.resultValue.eventGroup.shared
						if(this.eventgroup.groupStatus === 4) {
							this.dateCurrent = '距开始' + res.resultValue.dateCurrent
						} else if(this.eventgroup.groupStatus === 0 || this.eventgroup.groupStatus === 1) {
							if(res.resultValue.dateCurrent == "超过30天") {
								this.dateCurrent = '结束时间' + this.formatDate(this.eventgroup.groupEndTime)
							}else if(res.resultValue.dateCurrent == ""){
								this.dateCurrent = '已结束'
							} else {
								this.dateCurrent = '距结束' + res.resultValue.dateCurrent
							}
						} else if(this.eventgroup.groupStatus === 2) {
							this.dateCurrent = '已清算'
						} else {
							this.dateCurrent = '待清算'
						}
						this.getdetail();
						this.detailevent();
					})
			},
			qq() {
				window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(encodeURI(this.urladd)) + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！ ')
			},
			wb() {
				window.open('http://service.weibo.com/share/share.php?url=' + this.urladd + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！')
			},
			kj() {
				window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.urladd + '&desc=玩预测 享快乐！让预测更有价值，让豪礼只属于你！' )
			},
			//规则
			detailevent() {
				this.configKey = 'event_sg'
				this.$CPOST('/share/v1/shareConfig/queryShareConfig', {
						 configKey: this.configKey
					},(res) => {
                        this.chasedata = res.resultValue.configEntity.configValue
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
			//余额点击
			eyeShow() {
				if(this.$store.state.refreshToken == '') {
					this.isShowLoginModal = true
				}else{
					this.isShowLoginModal = false
					this.eyes = true;
					this.eye = false
					if(this.sharedata == 0) {
						this.Eventyue() //独立账户
					} else {						
						this.optentyue(); //公开账户余额
					}
				}
			},
			//独立余额
		    Eventyue(){
		    	this.$CPOST('/event/v1/eventUniqueUser/queryEventUniqueUser', {
					groupId: this.$route.query.id
				}, (res) => {
					this.groupyue = res.resultValue.eventUniqueUserEntity.uniqueBalance;
				})
			},
			//公开余额
		   optentyue() {
		   		this.$CPOST('/account/v1/userAccount/queryUserAccount', {
					userId: 10
				},(res) => {
					this.groupyue = res.resultValue.userAccountEntity.currency;
				})
			},
			formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
			},
			showModal(ind,itemId) {
				this.orderId=itemId
				this.isShow = true;
				this.listIndex = ind;
			},
			echarts(){
				var _this = this;
				var myChart = this.$echarts.init(document.getElementById('mainBar'));
				var myCharts = this.$echarts.init(document.getElementById('mainLine'));
				this.$CPOST('/event/v1/eventGroup/queryEventInformationInfo', {
						groupId:this.$route.query.id
					},(res) => {				
					var nameValue=[];
					var eventList = res.resultValue.eventInformationEntityList;
					for(var i=0;i<eventList.length;i++){
						var eventShort = eventList[i].eventShort;
						nameValue.push(eventList[i].eventShort);
					}
				myChart.setOption({
					title: {

					},
					grid: {
						left: '10%',
						containLabel: true
					},
					tooltip: {
				        trigger: 'axis'
				    },
					xAxis: {
						data: []
					},
					yAxis: {
						min: 0,
						max: 100,
						interval: 10
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

					},
					tooltip: {
				        trigger: 'axis'
				    },
					grid: {
						left: '10%',
						containLabel: true
					},
					legend: {     //图例组件
				            data: nameValue
				        },
					xAxis: {
	                	boundaryGap:['0%','20%'],
						data: []
					},
					yAxis: {
						min: 0,
						max: 100,
						interval: 10
					},
					series: [{
						name: '',
						type: 'line',
						data: []
					}]
				});
		        this.$CPOST('/event/v1/eventGroup/queryEventGroupChart', {
		            groupId: this.$route.query.id
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
			            for(var i=0;i<result.length;i++){  
			            	len.push(result[i].length);
			                var item = {};
			                var timeItem = {
			                	type:'category',
			                	// axisLine:{
			                	// 	lineStyle:{
			                	// 		color:colors[i]
			                	// 	}
			                	// },
			                	data:[]
			                };
			                item.name= nameValue[i];
			                item.type='line';
			                item.smooth= true;
			                item.data=[];
			                result[i].sort(compare('statisticsTime'));
							for(var u=0;u<result[i].length;u++){
			                  	if(result[i][u].middleRate==="0.00"&&u!=0){
			                  		item.data.push(result[i][u-1].middleRate)
			                  	}else{
			                  		item.data.push(result[i][u].middleRate)
			                  	}
			                  		timeItem.data.push(_this.dateYYMM(result[i][u].statisticsTime))
		                	}

		                	sData[i]=item;
		                  	times[i] = timeItem;
			            }
			            len.sort(function(a,b){
			            	return (a < b) ? -1 : 1
			            })
			            var minLen = len[0];
			            for(var i = 0; i<minLen;i++){
			            	chengjiao[i] = 0;
			            	for(var k = 0; k<result.length;k++){
			            		chengjiao[i]+=result[k][i].tradeQuantity;
			            	}
			            }
			            myCharts.setOption({        //加载数据图表
	                        xAxis: times,
	                        series: sData
	                    });
	                    console.log(JSON.stringify(chengjiao))
		                myChart.setOption({        //加载数据图表
	                          xAxis: times,
	                          series: [{
	                              name: '销量',
	                              data: chengjiao
	                          }]
	                      });
		            	}
		        	});
				})
		    }
		}
	}
</script>
<style scoped>

	.paging{
		margin-top: 30px;
	}
	.el-pagination{
		text-align: center;
	}
	.eventGroup {
		width: 1200px;
		margin: auto;
		margin-top: 30px;
	}
	/*订单*/
.ticket_nav{position: relative; margin-top: 15px; border-bottom: solid 2px #cfd3dc; height: 28px; margin-bottom: 20px;}
.ticket_nav>ul{position: absolute;left: 0;bottom: -2px; width: 100%; text-align: center;}
.ticket_nav>ul>li{width: 92px;display:inline-block; line-height: 26px;text-align: center;font-size: 14px;color: #676767;cursor: pointer; border-bottom: solid 2px transparent;}
.ticket_nav>ul>li>i{width: 1px; height: 12px; border-left: 1px solid #ced4e0; float: left; margin-top: 7px;}
.ticket_nav>ul>li>a{width: 100%; height: 100%; display: block; color: #676767;border-bottom: solid 2px #ced4e0;}
.ticket_nav>ul>li.active{color: #e52735;border-bottom: solid 2px #e52735;}
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
.unsettled>table{width: 100%;}
.unsettled>table>thead>tr>th{background: #f0f0f0;height: 42px;font-size: 14px;color: #323232; text-align: center;}
.unsettled>table>tbody>tr>td{height: 117px;font-size: 14px;color: #323232;border-bottom: solid 1px #eee; padding:0 10px;}
.unsettled>table>tbody>tr>td>div{line-height: 18px;font-size: 14px;color: #323232;}
.unsettled>table>tbody>tr>td>p{line-height: 20px;font-size: 12px;color: #a4a4a4;}
.unsettled>table>tbody>tr>td>a>button{width: 72px;height: 26px;border-radius: 2px;outline: none;border: none;color: white;font-size: 12px;background: #e52735;cursor: pointer;display: block;margin: auto;}
.unsettled>table>tbody>tr>td>a+a{width: 72px;height: 26px; display: block; line-height: 26px; text-align: center; margin: auto; color: #a4a4a4;font-size: 12px;}
.unsettled>table>tbody>tr>td>a+a:hover{text-decoration: underline;}
.td1{width: 30%;}
.td2,.td3,.td4,.td5,.td6,.td7,.td8{width: 10%;text-align: center;}
.td3>span{margin-left: 7px;}

.eventGroup_head{border:solid 1px #d5d5d5; border-width:1px 0; padding:14px 0;}
.eventGroup_head h2.head_title{font-size: 24px; color: #323232; font-weight: bold; line-height: 24px; margin-bottom: 10px;}
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
.share_box .share_ico a.weixin i{display: none; position: absolute; top: 18px;left: -40px;
		width: 120px;}
.share_box .share_ico a.weixin:hover{background-image: url(../../assets/img/eventgroup/share_weixin_33.png);}
.share_box .share_ico a.weixin:hover i{display: block;}
.share_box .share_ico a.qzone{background: url(../../assets/img/eventgroup/share_kongjian_04.png) no-repeat;}
.share_box .share_ico a.qzone:hover{background-image: url(../../assets/img/eventgroup/share_kongjian_44.png);}


.eventDetail_order{
	border-bottom:solid 1px #d5d5d5;
}
.eventDetail_order_left{
	margin-top: 11px;
	padding-bottom: 11px;
	margin-right: 30px;
	width: 208px;
	height: 130px;
}
.eventDetail_order_left>img{
		width: 100%;
		height: 100%;
	}
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
	.eventG_share {
		display: inline-block;
		color: #a4a4a4;
		font-size: 12px;
		margin-left: 5px;
		vertical-align: bottom;
	}
	
	.eventG_share>span>img,
	.eventG_share>span {
		vertical-align: middle;
	}
	
	.eventG_share>span>img {
		cursor: pointer;
		margin: 1px;
	}
	
	.eventG_share>span>img+img {
		display: none;
	}
	
	.eventG_share>span:hover>img {
		display: none;
	}
	
	.eventG_share>span:hover>img+img {
		display: inline;
	}
	
	.weixin {
		position: relative;
	}
	
	.weixin>i {
		position: absolute;
		top: 18px;
		left: -40px;
		width: 120px;
		height: 120px;
		z-index: 57;
		display: none;
	}
	
	.weixin>i>img {
		width: 100%;
		height: 100%;
	}
	
	.weixin:hover.weixin>i {
		display: block;
	}
	.eventGroup_center_right {
		width: 287px;
		height: 145px;
		border-left: 1px dashed #dfdfdf;
		float: right;
	}
	.eventGroup_center_time {
		width: 90px;
		height: 90px;
		color: #323232;
		font-size: 12px;
		margin: auto;
		margin-bottom: 10px;
		position: relative;
		/*background: url(../../assets/img/dongxiao.gif) no-repeat center;*/
		border: solid 6px gainsboro;
		border-radius: 50%;
	}
	
	.eventGroup_center_main {
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: auto;
	}
	
	.eventGroup_center_time_box {
		/*margin-left: 27px;
		margin-top: 25px;*/
		width: 90%;
	height: 64%;
	font-size: 14px !important;
	text-align: center;
	color: #323232;
	margin: 0 auto;
	padding-top: 30px;
	}
	
	.eventGroup_center_time_box>span {
		display: block;
	}
	
	.eventGroup_center_time_box>span>i {
		font-size: 14px;
		color: #a5a5a5;
	}
	
	.eventGroup_center_begin {
		height: 22px;
		line-height: 22px;
		text-align: center;
		font-size: 14px;
		color: #a4a4a4;
	}
	
	.eventGroup_center_time_box>span>i.eventGroup_center_yet {
		color: #323232;
	}
	
	.eventGroup_center_yet {
		color: #323232;
	}
	
	.eventGroup_detail {
		width: 100%;
		margin-top: 30px;
		margin-bottom: 80px;
	}
	
	.eventGroup_detail_top {
		height: 52px;
		border: 1px solid #e6e6e6;
	}
	
	.eventGroup_detail_list {
		height: 50px;
		float: left;
	}
	
	.eventGroup_detail_list>li {
		width: 123px;
		height: 100%;
		cursor: pointer;
		line-height: 50px;
		text-align: center;
		color: #323232;
		font-size: 16px;
		border-left: 1px solid #fff;
		border-right: 1px solid #fff;
		float: left;
	}
	
	.eventGroup_detail_list>li.eventGroup_detail_active {
		color: #e52735;
		border-top: 2px solid #e52735;
		margin-top: -1px;
		border-left: 1px solid #e6e6e6;
		border-right: 1px solid #e6e6e6;
	}
	
	.eventGroup_detail_refresh {
		height: 100%;
		line-height: 52px;
		color: #676767;
		font-size: 12px;
		float: right;
		margin-right: 20px;
		cursor: pointer;
	}
	
	.eventGroup_detail_refresh>img {
		margin-right: 5px;
	}
	
	.eventGroup_lists {
		border: 1px solid #e6e6e6;
		border-top: 0;
		overflow: hidden;
	}
	/***列表***/
	
	.eventGroup_lists_top {
		height: 67px;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.eventGroup_lists_top>p {
		height: 100%;
		line-height: 67px;
		text-align: center;
		font-size: 14px;
		color: #676767;
		float: left;
	}
	
	.eventGroup_lists_top_p1 {
		width: 464px;
		margin-right: 50px;
	}
	
	.eventGroup_lists_top_p2 {
		width: 220px;
		
	}
	
	.eventGroup_lists_top_p3 {
		width: 220px;
		margin-left: 50px;
	}
	.eventGroup_lists_top_p4 {
		width: 160px;
		text-align: center;
		margin-left: 32px;
	}
	
	.eventGroup_lists_top_p5 {
		width: 160px;
		text-align: center;
		
	}
	
	.eventGroup_lists_bottom {
		padding: 10px 17px 22px 47px;
	}
	
	.eventGroup_lists_bottom>li {
		height: 60px;
		line-height: 60px;
		font-size: 14px;
		color: #676767;
		clear: both;
	}
	/***详情****/
	
	.eventGroup_details {
		width: 1079px;
		margin: auto;
		margin-bottom: 26px;
	}
	
	.eventGroup_details>p {
		color: #323232;
		font-size: 14px;
		line-height: 22px;
		margin-top: 26px;
	}
	
	.eventGroup_rule {
		margin-top: 26px;
	}
	
	.eventGroup_rule>li {
		color: #323232;
		font-size: 14px;
		line-height: 24px;
	}
	
	.eventGroup_details>h4 {
		font-size: 14px;
		font-weight: 500;
		color: #676767;
	}
	
	.eventGroup_details>h4>a {
		color: #3282ff;
		text-decoration: underline;
	}
	/***行情****/
	
	.price_trend_diagram_one {
		width: 1160px;
		margin: 0 auto;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	
	.price_diagram_title {
		height: 22px;
		line-height: 22px;
		color: #252f45;
		font-size: 22px;
		text-align: center;
		margin-bottom: 20px;
	}
	
	.compellation {
		width: 1142px;
		/* height:30px; */
		margin: 0 auto;
		font-size: 14px;
		color: #616161;
		display: table;
		margin-bottom: 10px;
	}
	
	.compellation>ul>li {
		margin-right: 20px;
		float: left;
		cursor: pointer;
	}
	
	.compellation>ul>li.disabled {
		color: #ccc;
	}
	
	.compellation>ul>li.disabled>span {
		background-color: #ccc !important;
	}
	
	.compellation>ul>li>span {
		width: 10px;
		height: 10px;
		display: block;
		float: left;
		margin-right: 5px;
		margin-top: 5px;
		border-radius: 2px;
		-moz-border-radius: 2px;
		-webkit-border-radius: 2px;
	}
	
	.price_diagram_pic {
		width: 1140px;
		height: 344px;
		border: solid 1px #e6e6ec;
		margin: 0 auto;
	}
	/****相关资讯***/
	
	/*.eventGroup_message_box {
		width: 1166px;
		margin: auto;
		margin-bottom: 26px;
	}
	
	.eventGroup_message {
		width: 100%;
		height: 30px;
		line-height: 30px;
		margin-top: 18px;
	}
	
	.eventGroup_message_left {
		float: left;
		color: #424242;
		font-size: 18px;
	}
	
	.eventGroup_message_left>img {
		width: 20px;
		height: 18px;
		vertical-align: middle;
	}
	
	.eventGroup_message_left>i {
		vertical-align: middle;
	}
	
	.eventGroup_message_right {
		float: right;
		color: #828282;
		font-size: 14px;
	}*/
	
.eventGroup_lists_left{
	width: 464px;
	height: 100%;
	float: left;
}
.eventGroup_lists_left>span{
	width: 94px;
	height: 60px;
	display: inline-block;
    vertical-align: middle;
}
.eventGroup_lists_left>span>img{
	width: 100%;
	height: 100%;
}
.eventGroup_lists_left>p{
	display: inline-block;
	vertical-align: middle;
	margin-left: 5px;
	cursor: pointer;
}
.eventGroup_lists_center,.eventGroup_lists_right{
	width: 220px;
	height: 100%;
	float: left;
	text-align: center;
	color: #323232;
	font-size: 16px;
}
.eventGroup_lists_right{
	margin-left: 52px;
}
/*.eventGroup_lists_center>span,.eventGroup_lists_right>span{
	width: 64px;
	text-align: center;
	display: inline-block;
	color: #323232;
	font-size: 16px;
}*/
.eventGroup_lists_center>p,.eventGroup_lists_right>p{
	font-size: 16px;
	width: 66px;
	display: inline-block;
}
.eventGroup_lists_center>p.eventGroup_num_top,
.eventGroup_lists_right>p.eventGroup_num_top{
	color: #c60c1b;
}
.eventGroup_lists_center>p.eventGroup_num_down,
.eventGroup_lists_right>p.eventGroup_num_down{
	color: #098959;
}
.eventGroup_lists_bottom>li:nth-child(odd){
	background:#f2f2f2;
}
.eventGroup_lists_state,.eventGroup_lists_result{
	height: 60px;
	text-align: center;
    width: 160px;
    float: left;
}
.eventGroup_lists_state{
	margin-left: 34px;
}
.eventGroup_lists_state>img{
	width: 56px;
	height: 56px;
}
.eventGroup_lists_result>img{
	width: 51px;
	height: 51px;
}



	.eventGroup_center_box {
		width: 1160px;
		margin: auto;
		/*margin-top: 20px;*/
		display: inline-block;
		margin-left: 20px;
	}
	
	.eventGroup_center_left {
		height: 172px;
		float: left;
	}
	
	.eventGroup_center_detail {
		height: 130px;
	}
	
	.eventGroup_center_detail_img {
		width: 208px;
		height: 130px;
		float: left;
	}
	
	.eventGroup_center_detail_img>img {
		width: 100%;
		height: 100%;
	}
	
	.eventGroup_center_text {
		float: left;
		margin-left: 12px;
	}
	
	.eventGroup_center_list {
		height: 25px;
		margin-top: 12px;
	}
	
	.eventGroup_center_list>li {
		height: 23px;
		padding: 0 8px;
		background: #ffffff;
		line-height: 23px;
		color: #343434;
		font-size: 14px;
		border: 1px solid #e5e5e5;
		float: left;
		margin-right: 10px;
	}
	
	.eventGroup_center_list>li.eventGroup_center_yuce {
		color: #fff;
		background: #e83c49;
		border: 1px solid #e83c49;
	}
	
	.eventGroup_center_list>li.eventGroup_center_pingjian {
		color: #fff;
		background: #4867aa;
		border: 1px solid #4867aa;
	}
	.eventGroup_center_currency {
		height: 18px;
		line-height: 18px;
		margin-top: 23px;
		color: #a4a4a4;
		font-size: 14px;
	}
	
	.eventGroup_center_currency>span {
		vertical-align: middle;
	}
	
	.eventGroup_center_currency>i>img {
		vertical-align: middle;
	}
	
	.eventGroup_center_balance {
		height: 26px;
		line-height: 26px;
		margin-top: 20px;
	}
	
	.eventGroup_center_balance>span {
		color: #a4a4a4;
		font-size: 14px;
	}
	
	.eventGroup_center_balance>i {
		display: inline-block;
		vertical-align: middle;
		cursor: pointer;
	}
	
	.eventGroup_center_balance>p {
		display: inline-block;
		vertical-align: middle;
	}
	
	.eventGroup_center_balance>p>i {
		color: #323232;
		font-size: 22px;
	}
	
	.eventGroup_center_balance>p>button {
		width: 92px;
		height: 26px;
		background: #fff;
		border: 1px solid #dfdfdf;
		color: #c71220;
		font-size: 12px;
		cursor: pointer;
		margin-left: 5px;
		vertical-align: top;
	}
	.eventGroup_center_balance>p>button>img {
		vertical-align: text-top;
		margin-right: 5px;
	}
	.eventGroup_center_share {
		height: 14px;
		line-height: 14px;
		margin-top: 10px;
	}
	.eventG_center_attention {
		height: 100%;
		padding: 0 8px;
		font-size: 12px;
		border-right: 1px solid #e6e6e6;
		cursor: pointer;
	}
	.eventG_center_add {
		color: #e83c49;
	}
	.eventG_center_yet {
		color: #a4a4a4;
	}
	.eventG_center_yet>img {
		display: none;
	}
	.eventG_share {
		display: inline-block;
		color: #a4a4a4;
		font-size: 12px;
		margin-left: 5px;
		vertical-align: bottom;
	}
	
	.eventG_share>span>img,
	.eventG_share>span {
		vertical-align: middle;
	}
	
	.eventG_share>span>img {
		cursor: pointer;
		margin: 1px;
	}
	
	.eventG_share>span>img+img {
		display: none;
	}
	
	.eventG_share>span:hover>img {
		display: none;
	}
	
	.eventG_share>span:hover>img+img {
		display: inline;
	}
	
	.weixin {
		position: relative;
	}
	
	.weixin>i {
		position: absolute;
		top: 18px;
		left: -40px;
		width: 120px;
		height: 120px;
		z-index: 57;
		display: none;
	}
	
	.weixin>i>img {
		width: 100%;
		height: 100%;
	}
	
	.weixin:hover.weixin>i {
		display: block;
	}
	.eventGroup_center_right {
		width: 287px;
		height: 145px;
		border-left: 1px dashed #dfdfdf;
		float: right;
	}
	.eventGroup_center_time {
		width: 90px;
		height: 90px;
		color: #323232;
		font-size: 12px;
		margin: auto;
		margin-bottom: 10px;
		position: relative;
		/*background: url(../../assets/img/dongxiao.gif) no-repeat center;*/
		border: solid 6px gainsboro;
		border-radius: 50%;
	}
	
	.eventGroup_center_main {
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: auto;
	}
	
	.eventGroup_center_time_box {
		/*margin-left: 27px;
		margin-top: 25px;*/
		width: 90%;
	height: 64%;
	font-size: 14px !important;
	text-align: center;
	color: #323232;
	margin: 0 auto;
	padding-top: 30px;
	}
	
	.eventGroup_center_time_box>span {
		display: block;
	}
	
	.eventGroup_center_time_box>span>i {
		font-size: 14px;
		color: #a5a5a5;
	}
	
	.eventGroup_center_begin {
		height: 22px;
		line-height: 22px;
		text-align: center;
		font-size: 14px;
		color: #a4a4a4;
	}
	
	.eventGroup_center_time_box>span>i.eventGroup_center_yet {
		color: #323232;
	}
	
	.eventGroup_center_yet {
		color: #323232;
	}
	
	.eventGroup_detail {
		width: 100%;
		margin-top: 30px;
		margin-bottom: 80px;
	}
	
	.eventGroup_detail_top {
		height: 52px;
		border: 1px solid #e6e6e6;
	}
	
	.eventGroup_detail_list {
		height: 50px;
		float: left;
	}
	
	.eventGroup_detail_list>li {
		width: 123px;
		height: 100%;
		cursor: pointer;
		line-height: 50px;
		text-align: center;
		color: #323232;
		font-size: 16px;
		border-left: 1px solid #fff;
		border-right: 1px solid #fff;
		float: left;
	}
	
	.eventGroup_detail_list>li.eventGroup_detail_active {
		color: #e52735;
		border-top: 2px solid #e52735;
		margin-top: -1px;
		border-left: 1px solid #e6e6e6;
		border-right: 1px solid #e6e6e6;
	}
	
	.eventGroup_detail_refresh {
		height: 100%;
		line-height: 52px;
		color: #676767;
		font-size: 12px;
		float: right;
		margin-right: 20px;
		cursor: pointer;
	}
	
	.eventGroup_detail_refresh>img {
		margin-right: 5px;
	}
	
	.eventGroup_lists {
		border: 1px solid #e6e6e6;
		border-top: 0;
		overflow: hidden;
	}
	/***列表***/
	
	.eventGroup_lists_top {
		height: 67px;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.eventGroup_lists_top>p {
		height: 100%;
		line-height: 67px;
		text-align: center;
		font-size: 14px;
		color: #676767;
		float: left;
	}
	
	.eventGroup_lists_top_p1 {
		width: 464px;
		margin-right: 50px;
	}
	
	.eventGroup_lists_top_p2 {
		width: 220px;
		
	}
	
	.eventGroup_lists_top_p3 {
		width: 220px;
		margin-left: 50px;
	}
	.eventGroup_lists_top_p4 {
		width: 160px;
		text-align: center;
		margin-left: 32px;
	}
	
	.eventGroup_lists_top_p5 {
		width: 160px;
		text-align: center;
		
	}
	
	.eventGroup_lists_bottom {
		padding: 10px 17px 22px 47px;
	}
	
	.eventGroup_lists_bottom>li {
		height: 60px;
		line-height: 60px;
		font-size: 14px;
		color: #676767;
		clear: both;
	}
	/***详情****/
	
	.eventGroup_details {
		width: 1079px;
		margin: auto;
		margin-bottom: 26px;
	}
	
	.eventGroup_details>p {
		color: #323232;
		font-size: 14px;
		line-height: 22px;
		margin-top: 26px;
	}
	
	.eventGroup_rule {
		margin-top: 26px;
	}
	
	.eventGroup_rule>li {
		color: #323232;
		font-size: 14px;
		line-height: 24px;
	}
	
	.eventGroup_details>h4 {
		font-size: 14px;
		font-weight: 500;
		color: #676767;
	}
	
	.eventGroup_details>h4>a {
		color: #3282ff;
		text-decoration: underline;
	}
	/***行情****/
	
	.price_trend_diagram_one {
		width: 1160px;
		margin: 0 auto;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	
	.price_diagram_title {
		height: 22px;
		line-height: 22px;
		color: #252f45;
		font-size: 22px;
		text-align: center;
		margin-bottom: 20px;
	}
	
	.compellation {
		width: 1142px;
		/* height:30px; */
		margin: 0 auto;
		font-size: 14px;
		color: #616161;
		display: table;
		margin-bottom: 10px;
	}
	
	.compellation>ul>li {
		margin-right: 20px;
		float: left;
		cursor: pointer;
	}
	
	.compellation>ul>li.disabled {
		color: #ccc;
	}
	
	.compellation>ul>li.disabled>span {
		background-color: #ccc !important;
	}
	
	.compellation>ul>li>span {
		width: 10px;
		height: 10px;
		display: block;
		float: left;
		margin-right: 5px;
		margin-top: 5px;
		border-radius: 2px;
		-moz-border-radius: 2px;
		-webkit-border-radius: 2px;
	}
	
	.price_diagram_pic {
		width: 1140px;
		height: 344px;
		border: solid 1px #e6e6ec;
		margin: 0 auto;
	}
	/****相关资讯***/
	
	/*.eventGroup_message_box {
		width: 1166px;
		margin: auto;
		margin-bottom: 26px;
	}
	
	.eventGroup_message {
		width: 100%;
		height: 30px;
		line-height: 30px;
		margin-top: 18px;
	}
	
	.eventGroup_message_left {
		float: left;
		color: #424242;
		font-size: 18px;
	}
	
	.eventGroup_message_left>img {
		width: 20px;
		height: 18px;
		vertical-align: middle;
	}
	
	.eventGroup_message_left>i {
		vertical-align: middle;
	}
	
	.eventGroup_message_right {
		float: right;
		color: #828282;
		font-size: 14px;
	}*/
	
.eventGroup_lists_left{
	width: 464px;
	height: 100%;
	float: left;
}
.eventGroup_lists_left>span{
	width: 94px;
	height: 60px;
	display: inline-block;
    vertical-align: middle;
}
.eventGroup_lists_left>span>img{
	width: 100%;
	height: 100%;
}
.eventGroup_lists_left>p{
	display: inline-block;
	vertical-align: middle;
	margin-left: 5px;
	cursor: pointer;
}
.eventGroup_lists_center,.eventGroup_lists_right{
	width: 220px;
	height: 100%;
	float: left;
	text-align: center;
	color: #323232;
	font-size: 16px;
}
.eventGroup_lists_right{
	margin-left: 52px;
}
/*.eventGroup_lists_center>span,.eventGroup_lists_right>span{
	width: 64px;
	text-align: center;
	display: inline-block;
	color: #323232;
	font-size: 16px;
}*/
.eventGroup_lists_center>p,.eventGroup_lists_right>p{
	font-size: 16px;
	width: 66px;
	display: inline-block;
}
.eventGroup_lists_center>p.eventGroup_num_top,
.eventGroup_lists_right>p.eventGroup_num_top{
	color: #c60c1b;
}
.eventGroup_lists_center>p.eventGroup_num_down,
.eventGroup_lists_right>p.eventGroup_num_down{
	color: #098959;
}
.eventGroup_lists_bottom>li:nth-child(odd){
	background:#f2f2f2;
}
.eventGroup_lists_state,.eventGroup_lists_result{
	height: 60px;
	text-align: center;
    width: 160px;
    float: left;
}
.eventGroup_lists_state{
	margin-left: 34px;
}
.eventGroup_lists_state>img{
	width: 56px;
	height: 56px;
}
.eventGroup_lists_result>img{
	width: 51px;
	height: 51px;
}



/***列表***/
.eventGroup_lists_top {height: 67px;border-bottom: 1px solid #e6e6e6;}
.eventGroup_lists_top>p {height: 100%;line-height: 67px;text-align: center;font-size: 14px;color: #676767;float: left;}
.eventGroup_lists_top_p1 {width: 464px;margin-right: 50px;}
.eventGroup_lists_top_p2 {width: 220px;}
.eventGroup_lists_top_p3 {width: 220px;margin-left: 50px;}
.eventGroup_lists_top_p4 {width: 160px;text-align: center;margin-left: 32px;}
.eventGroup_lists_top_p5 {width: 160px;text-align: center;}
.eventGroup_lists_bottom {padding: 10px 17px 22px 47px;}
.eventGroup_lists_bottom>li {height: 60px;line-height: 60px;font-size: 14px;color: #676767;clear: both;}
/***详情****/
.eventGroup_details {width: 1079px;margin: auto;margin-bottom: 26px;}
.eventGroup_details>p{color: #323232;font-size: 14px;line-height: 22px;margin-top: 26px;}
.eventGroup_rule {margin-top: 26px;}
.eventGroup_rule>li{color: #323232;font-size: 14px;line-height: 24px;}
.eventGroup_details>h4 {font-size: 14px;font-weight: 500;color: #676767;}
.eventGroup_details>h4>a{color: #3282ff;text-decoration: underline;}
/***行情****/
.price_trend_diagram_one {width: 1160px;margin: 0 auto;margin-top: 20px;margin-bottom: 20px;}
.price_diagram_title {height: 22px;line-height: 22px;color: #252f45;font-size: 22px;text-align: center;margin-bottom: 20px;}
.compellation {width: 1142px;margin: 0 auto;font-size: 14px;color: #616161;display: table;margin-bottom: 10px;}
.compellation>ul>li {margin-right: 20px;float: left;cursor: pointer;}
.compellation>ul>li.disabled {color: #ccc;}
.compellation>ul>li.disabled>span {background-color: #ccc !important;}
.compellation>ul>li>span {width: 10px;height: 10px;display: block;float: left;margin-right: 5px;margin-top: 5px;border-radius: 2px;-moz-border-radius: 2px;-webkit-border-radius: 2px;}
.price_diagram_pic {width: 1140px;height: 344px;border: solid 1px #e6e6ec;margin: 0 auto;}
.eventGroup_lists_left{width: 464px;height: 100%;float: left;}
.eventGroup_lists_left>span{width: 94px;height: 60px;display: inline-block;vertical-align: middle;}
.eventGroup_lists_left>span>img{width: 100%;height: 100%;}
.eventGroup_lists_left>p{display: inline-block;vertical-align: middle;margin-left: 5px;cursor: pointer;}
.eventGroup_lists_center,.eventGroup_lists_right{width: 220px;height: 100%;float: left;text-align: center;color: #323232;font-size: 16px;}
.eventGroup_lists_right{margin-left: 52px;}
.eventGroup_lists_center>p,.eventGroup_lists_right>p{font-size: 16px;width: 66px;display: inline-block;}
.eventGroup_lists_center>p.eventGroup_num_top,.eventGroup_lists_right>p.eventGroup_num_top{color: #c60c1b;}
.eventGroup_lists_center>p.eventGroup_num_down,.eventGroup_lists_right>p.eventGroup_num_down{color: #098959;}
.eventGroup_lists_bottom>li:nth-child(odd){background:#f2f2f2;}
.eventGroup_lists_state,.eventGroup_lists_result{height: 60px;text-align: center;width: 160px;float: left;}
.eventGroup_lists_state{margin-left: 34px;}
.eventGroup_lists_state>img{width: 56px;height: 56px;}
.eventGroup_lists_result>img{width: 51px;height: 51px;}

</style>
<template>
	<div>
		<div class="activityD_main_eventL">
			<ul class="index_container_list">
				<li class="index_container_detail index_yuce" v-for="item in detail.groups" :key="item.groupId" @click='titlee(item.groupId,item.groupPurchaseType,item.groupEventType,item.eventList.length,item.eventList[0].eventId)' v-if="len>1?true:false">
				<!-- {{item.groupEventType}}。。。{{item.groupPurchaseType}} -->
				    <div class="index_detail_top">
				      <p class="index_detail_top_text">{{item.groupName}}</p> <!-- :data-id='item.groupId' :data-groupEventType='item.groupEventType' :data-groupPurchaseType='item.groupPurchaseType' -->
				      <div class="index_detail_box">
				        <p class="index_detail_top_time">
				          <i class="index_detail_text index_detail_yuce" v-if='item.groupEventType==1'>预 测</i>
				          <i class="index_detail_text index_detail_pingjian" v-if='item.groupEventType==0&& item.groupPurchaseType!=1'>评 鉴</i>
				          <i class="index_detail_text index_detail_shengou" v-if='item.groupEventType==0 && item.groupPurchaseType==1'>申 购</i>
				          <span>结束时间：{{ formatDate(item.groupEndTime) }}</span>
				        </p>
				        <p class="index_detail_prize">
				          <img v-if="item.isBox == 0" src="../../../../assets/img/index_baoxiang.png">
				          <img v-if="item.isReward == 0" src="../../../../assets/img/index_hongbao.png">
				        </p>
				      </div>
				    </div>
				    <div class="index_detail_bottom">
				      <p class="index_detail_bottom_img"><img :src="item.groupImgpath"/></p>
				      <!-- 已经开始 -->
				      <div class="index_detail_bottom_main"  v-show='item.groupStatus != 4 && item.groupEventType==0 && item.groupPurchaseType==0'>
				        <div class="index_detail_theme border_bottom">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1] ? item.eventList[0].eventShort : 'Yes') }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ item.eventList[0].currentPrice }}</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 1 ? 'num_down' : item.eventList[0].updown == 2 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[0].scope }}
							</span>
				          </div>
				        </div>
				        <div class="index_detail_theme" v-if="item.eventList[1]">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1].eventShort) }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ item.eventList[1].currentPrice }}</span>
				            <span class="index_detail_num" :class="item.eventList[1].updown == 1 ? 'num_down' : item.eventList[1].updown == 2 ? 'num_top' : ''">
								<img v-if="item.eventList[1].updown == 1" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[1].updown == 2" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[1].scope }}
							</span>
				          </div>
				        </div>
						<div class="index_detail_theme" v-else>
				          <p class="index_detail_theme_text">No</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ (100 - item.eventList[0].currentPrice).toFixed(2) }}</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 2 ? 'num_down' : item.eventList[0].updown == 1 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[0].scope }}
							</span>
				          </div>
				        </div>
				      </div>
				      <!-- 我也不知道这个要干嘛、反正需要用到 -->
				      <div class="index_detail_bottom_main"  v-show='item.groupStatus != 4 && item.groupEventType==0 && item.groupPurchaseType==2'>
				        <div class="index_detail_theme border_bottom">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1] ? item.eventList[0].eventShort : 'Yes') }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ item.eventList[0].currentPrice }}</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 1 ? 'num_down' : item.eventList[0].updown == 2 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[0].scope }}
							</span>
				          </div>
				        </div>
				        <div class="index_detail_theme" v-if="item.eventList[1]">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1].eventShort) }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ item.eventList[1].currentPrice }}</span>
				            <span class="index_detail_num" :class="item.eventList[1].updown == 1 ? 'num_down' : item.eventList[1].updown == 2 ? 'num_top' : ''">
								<img v-if="item.eventList[1].updown == 1" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[1].updown == 2" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[1].scope }}
							</span>
				          </div>
				        </div>
						<div class="index_detail_theme" v-else>
				          <p class="index_detail_theme_text">No</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ (100 - item.eventList[0].currentPrice).toFixed(2) }}</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 2 ? 'num_down' : item.eventList[0].updown == 1 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[0].scope }}
							</span>
				          </div>
				        </div>
				      </div>
				      <!-- 除申购外已结束 -->
				      <div class="index_detail_bottom_main"  v-show='item.groupStatus != 4 && item.groupEventType==1 && item.groupPurchaseType==2'>
				        <div class="index_detail_theme border_bottom">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1] ? item.eventList[0].eventShort : 'Yes') }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ item.eventList[0].currentPrice }}</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 1 ? 'num_down' : item.eventList[0].updown == 2 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[0].scope }}
							</span>
				          </div>
				        </div>
				        <div class="index_detail_theme" v-if="item.eventList[1]">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1].eventShort) }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ item.eventList[1].currentPrice }}</span>
				            <span class="index_detail_num" :class="item.eventList[1].updown == 1 ? 'num_down' : item.eventList[1].updown == 2 ? 'num_top' : ''">
								<img v-if="item.eventList[1].updown == 1" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[1].updown == 2" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[1].scope }}
							</span>
				          </div>
				        </div>
						<div class="index_detail_theme" v-else>
				          <p class="index_detail_theme_text">No</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ (100 - item.eventList[0].currentPrice).toFixed(2) }}</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 2 ? 'num_down' : item.eventList[0].updown == 1 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[0].scope }}
							</span>
				          </div>
				        </div>
				      </div>
				      <!-- 除申购外即将开始 -->
				      <div class="index_detail_bottom_main" v-show='item.groupStatus == 4 && item.groupPurchaseType==2'>
				        <div class="index_detail_theme border_bottom">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1] ? item.eventList[0].eventShort : 'Yes') }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">0.00</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 1 ? 'num_down' : item.eventList[0].updown == 2 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_top.png"/>
								0.00
							</span>
				          </div>
				        </div>
				        <div class="index_detail_theme" v-if="item.eventList[1]">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1].eventShort) }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">0.00</span>
				            <span class="index_detail_num" :class="item.eventList[1].updown == 1 ? 'num_down' : item.eventList[1].updown == 2 ? 'num_top' : ''">
								<img v-if="item.eventList[1].updown == 1" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[1].updown == 2" src="../../../../assets/img/index_top.png"/>
								0.00
							</span>
				          </div>
				        </div>
						<div class="index_detail_theme" v-else>
				          <p class="index_detail_theme_text">No</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">0.00</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 2 ? 'num_down' : item.eventList[0].updown == 1 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[0].scope }}
							</span>
				          </div>
				        </div>
				      </div>
				      <!-- 申购已经开始 -->
				      <!-- v-show='item.groupStatus != 4 && item.groupEventType==0 && item.groupPurchaseType==1' -->
				      <div class="index_detail_bottom_main"  v-show='item.groupStatus != 4 && item.groupEventType==0 && item.groupPurchaseType==1'>
				      	<div class="index_detail_theme border_bottom">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1] ? item.eventList[0].eventShort : 'Yes') }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ item.eventList[0].currentPrice }}</span>
				          </div>
				        </div>
				        <div class="index_detail_theme" v-if="item.eventList[1]">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1].eventShort) }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">{{ item.eventList[1].currentPrice }}</span>
				          </div>
				        </div>
						<div class="index_detail_theme" v-else>
				          <p class="index_detail_theme_text">No</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">0.00</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 2 ? 'num_down' : item.eventList[0].updown == 1 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[0].scope }}
							</span>
				          </div>
				        </div>
				      </div>
				      <!-- 申购即将开始 -->
				      <div class="index_detail_bottom_main"  v-show='item.groupStatus == 4 && item.groupPurchaseType==1'>
				      	<div class="index_detail_theme border_bottom">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1] ? item.eventList[0].eventShort : 'Yes') }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">0.00</span>
				          </div>
				        </div>
				        <div class="index_detail_theme" v-if="item.eventList[1]">
				          <p class="index_detail_theme_text">{{ slice(item.eventList[1].eventShort) }}</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">0.00</span>
				          </div>
				        </div>
						<div class="index_detail_theme" v-else>
				          <p class="index_detail_theme_text">No</p>
				          <div class="index_detail_theme_right">
				            <span class="index_detail_price">0.00</span>
				            <span class="index_detail_num" :class="item.eventList[0].updown == 2 ? 'num_down' : item.eventList[0].updown == 1 ? 'num_top' : ''">
								<img v-if="item.eventList[0].updown == 2" src="../../../../assets/img/index_down.png"/>
								<img v-if="item.eventList[0].updown == 1" src="../../../../assets/img/index_top.png"/>
								{{ item.eventList[0].scope }}
							</span>
				          </div>
				        </div>
				      </div>
				    </div>
					<p v-if="item.groupStatus == 1" class="index_detail_state">
						<img src="../../../../assets/img/index_state_yizanting.png"/>
					</p>
					<p v-if="item.groupStatus == 2" class="index_detail_state">
						<img src="../../../../assets/img/index_state_yijieshu.png"/>
					</p>
					<p v-if="item.groupStatus == 3" class="index_detail_state">
						<img src="../../../../assets/img/index_state_yijieshu.png"/>
					</p>
					<p v-if="item.groupStatus == 4" class="index_detail_state">
						<img src="../../../../assets/img/index_state_kaishi.png"/>
					</p>
				</li>
			</ul>
		</div>
		<confirm  :ticket='confirm.ticket' :ticketType='confirm.ticketType' :titleeDate='titleeDate' v-show='confirm.confirm' @vClose='vClose'/>
		<confirmNoPay v-show='noPayClose' @vActClose='vActClose'/>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"/>
		<Aalert :text='alertText' v-show='alert' @vshow='vshow'/>
	</div>
</template>

<script>
	import Aalert from '../../../common/alert'
	import confirm from './confirmModal'
	import confirmNoPay from './confirmNoPay'
	import Login from '../../../common/Login'
	export default {
		components: {
	    	confirm,
	    	confirmNoPay,
	    	Login,
	    	Aalert
	  	},
	  	props: {
	  		detail:{
	  			default (){ return '' }
	  		},
	  		len:{
	  			default (){ return 0 }
	  		},
	  	},
	  	data () {
	  		return {
	  			noPayClose:false,
	  			titleeDate:{
        			titleId:null,
        			groupPurchaseType:null,
        			groupEventType:null
        		},
        		confirm:{
        			confirm:false,
        			ticket:null,
        			ticketType:null
        		},
	  			isShowLoginModal: false,
	  			alert:false,
				alertText:null,
	  		}
	  	},
	  	created() {
	  		// setTimeout(()=>{
	  		// 	this.len=this.detail.groups.length;
	  		// },1000)
	  	},
	  	methods: {
	  		vActClose(){
	  			this.noPayClose=fasle;
	  		},
	  		vshow(){
				this.alert=false;
			},
	  		vClose(){
	  			this.confirm.confirm=false;
	  		},
	  		hideLoginModal(){
	  			this.isShowLoginModal=false;
	  		},
	  		
	  		slice(substring) {
		   		if(substring.length>10){
		   		  return substring.substring(0,10) + '...';
		   		}else{
		   			return substring
		   		}
		    },
		    activityDetail () {
		    	this.$CPOST('/activity/v1/activity/showActMsg', {
		    		activityId: this.$route.params.id
		    	},(res) => {
		    		console.log(res)
		    		this.detail = res.resultValue;
		    		console.log(this.detail.showRang)
		    		this.share.title=res.resultValue.allName;
					this.share.img=res.resultValue.imgUrlPc;
					this.len=this.detail.groups.length;
					if(this.detail.groups.length==1){
						this.piClick=true;
					}
		    	})
		    },
	  		titlee(id,purType,eveType,listLen,eventId){
	  			if(this.$store.state.refreshToken==''){
	  				this.isShowLoginModal=true;
	  				return false
	  			}
	  			/*this.titleeDate.titleId=e.path[1].querySelector('p').getAttribute('data-id');
	  			this.titleeDate.groupPurchaseType=e.path[1].querySelector('p').getAttribute('data-groupPurchaseType');
	  			this.titleeDate.groupEventType=e.path[1].querySelector('p').getAttribute('data-groupEventType');*/
	  			this.titleeDate.titleId=id,
	  			this.titleeDate.groupPurchaseType=purType;
	  			this.titleeDate.groupEventType=eveType;
	  			this.$CPOST('/activity/v1/activity/showActMsg', {
		    		activityId: this.$route.params.id
		    	},(res) => {
		    		this.confirm.ticket=res.resultValue.ticket
		    		if(res.resultValue.ticketType==0){
		    			this.confirm.ticketType='金豆';
		    		}else{
		    			this.confirm.ticketType='未来豆';
		    		}
		    		if(res.resultValue.activityStatus==1){
		    			if(res.resultValue.join==true){//是否已参加
		    				if(this.titleeDate.groupEventType==0 && this.titleeDate.groupPurchaseType==1){//跳申购
		    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId});
		    				}else{
		    					if(listLen > 1){
		    						this.$router.push({path:'/group/'+this.titleeDate.titleId});
		    					}else{
		    						this.$router.push({path:'/event/'+eventId});
		    					}
		    				}
		    			}else{
		    				this.alert=true;
							this.alertText='活动已结束';
		    			}
		    		}else if(res.resultValue.activityStatus==2){
		    			if(res.resultValue.join==true){//是否已参加
		    				if(this.titleeDate.groupEventType==0 && this.titleeDate.groupPurchaseType==1){//跳申购
		    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId});
		    				}else{
		    					if(listLen > 1){
		    						this.$router.push({path:'/group/'+this.titleeDate.titleId});
		    					}else{
		    						this.$router.push({path:'/event/'+eventId});
		    					}
		    				}
		    			}else{
		    				this.alert=true;
							this.alertText='活动已暂停';
		    			}
		    		}else{
		    			if(res.resultValue.join==true){
		    				if(this.titleeDate.groupEventType==0 && this.titleeDate.groupPurchaseType==1){
		    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId});
		    				}else{
		    					if(listLen > 1){
		    						this.$router.push({path:'/group/'+this.titleeDate.titleId});
		    					}else{
		    						this.$router.push({path:'/event/'+eventId});
		    					}
		    				}
		    			}else{
		    				if(res.resultValue.free!=0){//付费
		    					this.confirm.confirm=true;
		    				}else{
		    					this.$CPOST('/activity/v1/activity/app/recordUserJoin',{
									activityId:this.$route.params.id
								},(res)=>{
									this.alert=true;
									this.alertText='恭喜您成功参加该活动';
		    					})
		    				}
		    			}
		    				
		    		}
		    	})
	  		},
		   	formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
			}
	  	}
	}
</script>

<style scoped>
.confirmNoPay{
	display: none;
}
.hide{
	display: none !important;
}
.activityD_main{
	width: 1200px;
	margin: auto;
}
.activityD_text{
	height: 26px;
	margin-top: 10px;
}
.eventGroup_center_balance{
	height: 26px;
	line-height: 26px;
	display: inline-block;
}
.eventGroup_center_balance>span{
	color: #a4a4a4;
	font-size: 14px;
}
.eventGroup_center_balance>i{
	display: inline-block;
	vertical-align: middle;
	cursor: pointer;
}
.eventGroup_center_balance>p{
	display: inline-block;
	vertical-align: middle;
}
.eventGroup_center_balance>p>span>i{
	color: #323232;
	font-size: 22px;
}
.eventGroup_center_balance>p>span>img{
	margin-left: 3px;
}
.eventGroup_center_balance>p>button{
	width: 72px;
	height: 26px;
	background: #fff;
	border: 1px solid #dfdfdf;
	color: #c71220;
	font-size: 12px;
	cursor: pointer;
	margin-left: 5px;
    vertical-align: top;
}
.eventGroup_center_balance>p>button>img{
	vertical-align: text-top;
	margin-right: 5px;
}
.activityD_rank{
	height: 26px;
	display: inline-block;
	margin-left: 56px;
}
.activityD_rank>span{
	font-size: 14px;
	color: #676767;
}
.activityD_rank>i{
	font-size: 22px;
	color: #323232;
}
.activityD_rank>a{
	font-size: 14px;
	color: #888888;
	margin-left: 5px;
}
.activityD_mes_right{
	float: right;
}
.activityD_main_eventG{
	color: #a4a4a4;
	font-size: 14px;
	margin-top: 22px;
	text-align: right;
}
.activityD_main_eventG>i{
	color: #323232;
	font-weight: bold;
}
.activityD_main_eventL{
	width: 1220px;
	margin: auto;
	margin-top: 30px;
}
/***题材组***/
.index_container_list{
	min-height: 440px;
    margin-left: -10px;
}
.index_container_detail{
	width: 385px;
	height: 188px;
	border: 1px solid #d1d1d1;
	border-top: 0;
	float: left;
	margin: 0 9px 30px 9px;
	position: relative;
}
.index_yuce{
	border-top: 2px solid #c60c1b;
}
.index_pingjian{
	border-top: 2px solid #4867aa;
}
.index_detail_box{
	padding: 0 9px;
}
.index_detail_top{
	width: 100%;
	height: 96px;
	background: #eef1f0;
	overflow: hidden;
}
.index_detail_top_text{
	padding: 0 9px;
	color: #444444;
	font-size: 16px;
	line-height: 26px;
	margin-top: 9px;
    font-weight: bold;
    cursor: pointer;
}
.index_detail_top_text:hover{
	color: #2a2f34;
}
.index_detail_top_time{
	height: 17px;
	line-height: 17px;
	margin-top: 7px;
	float: left;
}
.index_detail_text{
	height: 17px;
	padding: 0 10px;
	background: #d66870;
	display: block;
	float: left;
	color: #FFFFFF;
	font-size: 12px;
	-webkit-border-radius: 8px;
	-moz-border-radius: 8px;
	border-radius: 8px;
}
.index_detail_yuce{
	background: #d66870;
}
.index_detail_pingjian{
	background: #4867aa;
}
.index_detail_shengou{
	background: rgb(255, 170, 78);
}
.index_detail_top_time>span{
	color: #888888;
	font-size: 14px;
	margin-left: 5px;
	float: left;
}
.index_detail_prize{
	float: right;
    margin-top: 3px;
}
.index_detail_prize>img{
	vertical-align: bottom;
}
.index_detail_state{
    position: absolute;
    text-align: right;
    /*width: 100%;
    height: 100%;*/
    line-height: 96px;
    top: 0;
    right: 0;
    /*background: url(../../assets/img/index_bg.png) no-repeat center;*/
    background-size: cover;
}
.index_detail_state:hover{
	background: none;
}
.index_detail_state>img{
	width: 56px;
	height: 56px;
	vertical-align: middle;
	margin-right: 50px;
}
.index_detail_bottom{
	padding: 12px 9px;
	height: 67px;
	background: #ffffff;
}
.index_detail_bottom_img{
	width: 107px;
	height: 67px;
	float: left;
}
.index_detail_bottom_img>img{
	width: 100%;
	height: 100%;
}
.index_detail_bottom_main{
	width: 250px;
	height: 100%;
	float: right;
}
.index_detail_theme{
	height: 33px;
	line-height: 33px;
	color: #444444;
	font-size: 14px;
}
.border_bottom{
	border-bottom: 1px solid #e1e1e1;
}
.index_detail_theme_text{
	float: left;
}
.index_detail_theme_right{
	float: right;
}
.index_detail_price{
	width: 49px;
	text-align: center;
	display: inline-block;
}
.index_detail_num{
	width: 48px;
	text-align: center;
}
.num_top{
	color: #f52f3e;
}
.num_down{
	color: #098959;
}
/*分享*/
.eventGroup_center_share{
	height: 14px;
	line-height: 14px;
	margin-top: 10px;
}
.eventG_center_attention{
	height: 100%;
	padding: 0 8px;
	font-size: 12px;
	border-right: 1px solid #e6e6e6;
}
.eventG_center_add{
	color: #e83c49;
}
.eventG_center_yet{
	color: #a4a4a4;
}
.eventG_center_yet>img{
	display: none;
}
.eventG_share{
	display: inline-block;
	color: #a4a4a4;
	font-size: 12px;
	margin-left: 5px;
    vertical-align: bottom;
}
.eventG_share>i>img,.eventG_share>span{
	vertical-align: middle;
}
.eventG_share>i>img{
	cursor: pointer;
    margin: 1px;
}
.eventG_share>i>img+img{
	display: none;
}
.eventG_share>i:hover>img{
	display: none;
}
.eventG_share>i:hover>img+img{
	display: inline;
}
</style>
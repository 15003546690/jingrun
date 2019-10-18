<template>
  <li class="index_container_detail index_yuce" v-if="group.eventList.length > 0">
    <div class="index_detail_top" >
    	<p v-on:click="groupEvent" class="index_detail_top_text">
	   	{{ group.groupShort }}<img v-if="group.groupExclusiveType==1" src="../../assets/img/eventGroup/labelling.png" alt="" class="daren">
	   </router-link> 
      <!-- <p v-if="group.groupPurchaseType==0" v-on:click="groupEvent" class="index_detail_top_text">
      	{{ group.groupShort }}<img v-if="group.groupExclusiveType==1" src="../../assets/img/eventGroup/labelling.png" alt="" class="daren">
  		</router-link>
	   	<p v-if="group.groupPurchaseType==1" v-on:click="groupEvent" class="index_detail_top_text">
	   	{{ group.groupShort }}<img v-if="group.groupExclusiveType==1" src="../../assets/img/eventGroup/labelling.png" alt="" class="daren">
	   </router-link>
	   	<p v-if="group.groupPurchaseType==2" v-on:click="groupEvent" class="index_detail_top_text">
	   	{{ group.groupShort }}<img v-if="group.groupExclusiveType==1" src="../../assets/img/eventGroup/labelling.png" alt="" class="daren">
	   </router-link>  -->
      <div class="index_detail_box" v-on:click="groupEvent">
        <p class="index_detail_top_time">
          <i class="index_detail_text index_detail_yuce" v-if="group.groupEventType==0" style="background: #4867aa;">评鉴</i>
          <i class="index_detail_text index_detail_yuce" v-if="group.groupEventType==1">预 测</i>
          <span>结束时间：{{ formatDate(group.groupEndTime) }}</span>
        </p>
        <p class="index_detail_prize">
          <img v-if="group.isBox == 0" src="../../assets/img/index_baoxiang.png">
          <!--<img v-if="group.isBox == 1" src="../../assets/img/index_baoxiang.png">-->
          <img v-if="group.isReward == 0" src="../../assets/img/index_hongbao.png">
          <!--<img v-if="group.isReward == 1" src="../../assets/img/index_hongbao.png">-->
        </p>
      </div>
    </div>
    <div class="index_detail_bottom">
      <p class="index_detail_bottom_img"><img v-lazy="group.groupImgpath"/></p>
      <div class="index_detail_bottom_main">
        <div class="index_detail_theme border_bottom" v-if="group.eventList.length > 0">
          <p class="index_detail_theme_text">{{ group.eventList[1] ? group.eventList[0].eventShort : 'Yes' }}</p>
          <div class="index_detail_theme_right">
            <span class="index_detail_price">{{group.groupStatus == 4 ? 0 : group.eventList[0].currentPrice || 0|decimal }}</span>
            <span class="index_detail_num" :class="group.eventList[0].updown == 1 ? 'num_down' : group.eventList[0].updown == 2 ? 'num_top' : ''">
				<img v-if="group.eventList[0].updown == 1" src="../../assets/img/index_down.png"/>
				<img v-if="group.eventList[0].updown == 2" src="../../assets/img/index_top.png"/>
				{{ group.eventList[0].scope }}
			</span>
          </div>
        </div>
        <div class="index_detail_theme" v-if="group.eventList.length>1">
          <p class="index_detail_theme_text">{{ group.eventList[1].eventShort }}</p>
          <div class="index_detail_theme_right">
            <span class="index_detail_price">{{ group.eventList[1].currentPrice|decimal }}</span>
            <span class="index_detail_num" :class="group.eventList[1].updown == 1 ? 'num_down' : group.eventList[1].updown == 2 ? 'num_top' : ''">
				<img v-if="group.eventList[1].updown == 1" src="../../assets/img/index_down.png"/>
				<img v-if="group.eventList[1].updown == 2" src="../../assets/img/index_top.png"/>
				{{ group.eventList[1].scope }}
			</span>
          </div>
        </div>
		<div class="index_detail_theme" v-else>
          <p class="index_detail_theme_text">No</p>
          <div class="index_detail_theme_right">
            <span class="index_detail_price">{{(group.groupStatus == 4 || group.eventList[0].currentPrice == 0) ? 0 : 100 - group.eventList[0].currentPrice|decimal }}</span>
            <span class="index_detail_num" :class="group.eventList[0].updown == 2 ? 'num_down' : group.eventList[0].updown == 1 ? 'num_top' : ''">
				<img v-if="group.eventList[0].updown == 2" src="../../assets/img/index_down.png"/>
				<img v-if="group.eventList[0].updown == 1" src="../../assets/img/index_top.png"/>
				{{ group.eventList[0].scope }}
			</span>
          </div>
        </div>
      </div>
    </div>
    <p v-if="group.groupStatus == 1" class="index_detail_state">
			<img src="../../assets/img/index_state_yizanting.png"/>
		</p>
		<p v-if="group.groupStatus == 2" class="index_detail_state">
			<img src="../../assets/img/index_state_yijieshu.png"/>
		</p>
		<p v-if="group.groupStatus == 3" class="index_detail_state">
			<img src="../../assets/img/index_state_yijieshu.png"/>
		</p>
		<p v-if="group.groupStatus == 4" class="index_detail_state">
			<img src="../../assets/img/index_state_kaishi.png"/>
		</p>
  </li>
</template>

<script>


export default {
	props: {
		group:{
			default(){
				return {
					eventList:[]
				}
			}
		},
		trackKey:{
			default(){
				return ''
			}
		}
	},
	created(){
		// this.purchase()
	},
		filters:{
			comdify(n) {
				let re = /\d{1,3}(?=(\d{3})+$)/g; 
				let n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { 
				return s1.replace(re, "$&,") + s2; 
				}); 
				return n1; 
			},
			decimal:function(val){
	      if(val.toFixed){
					  return val.toFixed(2)
					} else {
					  return val
					}
	    }
		},
	methods: {
		formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
		},
		groupEvent(){
			// this.$router.push({path: '/login', query:{stage: stage}});
			if(parseInt(this.group.platId) == 0){
				if(this.group.eventList.length<=1){
					this.$Bury('/event/' + this.group.eventList[0].eventId,this.group.eventList[0].eventId,3,this.trackKey);
					setTimeout(()=>{
						this.$router.push({path: '/event/' + this.group.eventList[0].eventId, query: {type:this.group.groupEventType}})
					},200)
					
				}else{
					this.$Bury('/group/' + this.group.groupId,this.group.groupId,2,this.trackKey);
					setTimeout(()=>{
						this.$router.push({path: '/group/' + this.group.groupId, query: {type:this.group.groupEventType}})
					},200)
					
				}
			}else{
				this.$Bury('/newActivity/' + this.group.platId,this.group.platId,1,this.trackKey);
				setTimeout(()=>{
					this.$router.push({path: '/newActivity/' + this.group.platId})
				},200)
				
			}
		}
	}
}
</script>

<style scoped>
.index_container_detail{
	width: 385px;
	height: 188px;
	border: 1px solid #d1d1d1;
	border-top: 0;
	/*float: left;*/
	display: inline-block;
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
	background: #f3f1f1;
	overflow: hidden;
	vertical-align: middle;
}
.index_detail_top img.daren{width: 24px; height: 24px; margin-left: 5px;vertical-align: middle;}
.index_detail_top_text{
	padding: 0 9px;
	height: 51px;
	color: #444;
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
	color: #fff;
	font-size: 12px;
	-webkit-border-radius: 8px;
	-moz-border-radius: 8px;
	border-radius: 8px;
}
.index_detail_yuce{
	background: #c60c1b;
}
.index_detail_pingjian{
	background: #4867aa;
}
.index_detail_top_time>span{
	color: #888;
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
    line-height: 96px;
    top: 0;
    right: 0;
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
	background: #fff;
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
	color: #444;
	font-size: 14px;
}
.border_bottom{
	border-bottom: 1px solid #e1e1e1;
}
.index_detail_theme_text{
	float: left;
	width:128px !important;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.index_detail_theme_right{
	float: right;
}
.index_detail_price{
	width: 50px;
	text-align: center;
	display: inline-block;
}
.index_detail_num{
	width: 62px;
	text-align: center;
	display: inline-block;
}
.index_detail_num>img{
	width: 20px;
}
.num_top{
	color: #f52f3e;
}
.num_down{
	color: #098959;
}
</style>

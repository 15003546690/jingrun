<template>
	<li>
		<router-link tag="div" :to="{path:'/event/' + eventlist.eventId , query: {type:10}}" class="eventGroup_lists_left displayFlex">
			<span><img v-lazy="eventlist.eventImgpath"/></span>
			<p class="flex1" :title="eventlist.eventShort">{{ eventlist.eventShort }}</p>
		</router-link>
		<div class="eventGroup_lists_center">
			<span>{{ eventlist.eventCurrentPrice.currentPrice|decimal}}</span>
			<p v-if="eventlist.eventCurrentPrice.updown" :class="eventlist.eventCurrentPrice.updown==1?'eventGroup_num_down' :eventlist.eventCurrentPrice.updown==2 ? 'eventGroup_num_top':''">
			<img v-if="eventlist.eventCurrentPrice.updown==1" src="../../assets/img/index_down.png"/>
			<img v-if="eventlist.eventCurrentPrice.updown==2" src="../../assets/img/index_top.png"/>
			<i>{{eventlist.eventCurrentPrice.scope}}</i></p>
		</div>
		<div class="eventGroup_lists_right">
			<span>{{eventlist.eventCurrentPrice.currentPrice == 0 ? 0 : 100 - eventlist.eventCurrentPrice.currentPrice|decimal}}</span>
			<p v-if="eventlist.eventCurrentPrice.updown" :class="eventlist.eventCurrentPrice.updown==2?'eventGroup_num_down' :eventlist.eventCurrentPrice.updown==1 ? 'eventGroup_num_top':''">
			<img v-if="eventlist.eventCurrentPrice.updown==2" src="../../assets/img/index_down.png"/>			
			<img v-if="eventlist.eventCurrentPrice.updown==1" src="../../assets/img/index_top.png"/>
			<i>{{eventlist.eventCurrentPrice.scope}}</i>
			</p>
		</div>
		<div class="eventGroup_lists_state">
			<img v-if="eventlist.eventStatus == 1" src="../../assets/img/index_state_yizanting.png"/>
			<img v-if="eventlist.eventStatus == 3" src="../../assets/img/index_state_daiqingsuan.png"/>	
			<img v-if="eventlist.eventStatus == 2" src="../../assets/img/index_state_yiqingsuan.png"/>
			<img v-if="eventlist.eventStatus == 4" src="../../assets/img/index_state_kaishi.png"/>	
			<span v-if="eventlist.eventStatus == 0">进行中</span>
		</div>
		<div class="eventGroup_lists_result" v-if="eventlist.eventStatus == 2">
			{{eventlist.eventLiquidationPrice}}
			<img v-if="!eventlist.eventCleaned && eventlist.eventLiquidationPrice == 100" src="../../assets/img/eventGroup/result_yfs.png"/>
		</div>
  </li>
</template>

<script>
export default {
    props: [
        'eventlist'
    ],
    filters:{
    	decimal:function(val){
            if(val.toFixed){
			    return val.toFixed(2)
			} else {
			    return val
			}
       	}
  	},
    created(){
    },
    methods: {
    	slice(substring) {
	   		if(substring.length>18){
	   		  return substring.substring(0,18) + '...'
	   		}else{
	   			return substring
	   		}
	   }
    }
}
</script>

<style scoped>
.eventGroup_lists_left{
	width: 364px;
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
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	margin-left: 5px;
	cursor: pointer;
}
.eventGroup_lists_center,.eventGroup_lists_right{
	width: 160px;
	height: 100%;
	float: left;
}
.eventGroup_lists_right{
	margin-left: 73px;
}
.eventGroup_lists_center>span,.eventGroup_lists_right>span{
	width: 64px;
	text-align: center;
	display: inline-block;
	color: #323232;
	font-size: 16px;
}
.eventGroup_lists_center>p,.eventGroup_lists_right>p{
	font-size: 16px;
	width: 70px;
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

.eventGroup_num_down{
	font-size: 16px;
    width: 80px;
    display: inline-block;
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

</style>
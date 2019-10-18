<template>
	<li>
		<router-link tag="div" :to="{path:'/subscribeDetail/' + grouplist.eventId, query: {type:grouplist.eventType}}" class="eventGroup_lists_left"><!--+ grouplist.eventId-->
			<span><img v-lazy="grouplist.eventImgpath"/></span>
			<p>{{ grouplist.eventShort }}</p>
		</router-link>
		<div class="eventGroup_lists_center">{{grouplist.groupevent}}</div>
		<div class="eventGroup_lists_right">{{grouplist.groupmonet}}</div>
		<div class="eventGroup_lists_state">
			<img v-if="grouplist.eventStatus == 1" src="../../assets/img/index_state_yizanting.png"/>
			<img v-if="grouplist.eventStatus == 3" src="../../assets/img/index_state_yiqingsuan.png"/>	
			<img v-if="grouplist.eventStatus == 2" src="../../assets/img/index_state_yijieshu.png"/>
			<img v-if="grouplist.eventStatus == 4" src="../../assets/img/index_state_kaishi.png"/>	
		</div>
		<div class="eventGroup_lists_result">{{ grouplist.eventInitialPrice}}</div>
  </li>
</template>

<script>
export default {
    props: [
        'grouplist',
        'eventList'
    ],
    created(){
    }
}
</script>
<style scoped>
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
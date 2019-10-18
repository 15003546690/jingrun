<template>
	<div>
  <div class="forecast_div" v-for="theme in theme">
  	<div style="width: 100%;height: 100%;opacity: 0;position: absolute;" @click.stop='title($event)' :data-id='theme.activityId' class="layer"></div>
    <div class="forecast_div_content">
      <div class="forecast_content_left">
      <img :src="theme.firstImg"/>
      </div>
      <div class="forecast_content_right">
        <div class="content_right_title">
         {{theme.allName}}
        </div>
        <div class="content_right_time content_time"><!---->
          <span class="criticism">{{ theme.type ?  '评鉴' : '预测'}}</span>
          <a>{{theme.endWord}}</a>
        </div>
      </div>
    </div>
    <div class="forecast_icon">
	   <img v-if="theme.eventStatus==0" src="../../../assets/img/index_state_daiqingsuan.png"/>
	   <img v-if="theme.eventStatus==1" src="../../../assets/img/index_state_kaishi.png"/>
	   <img v-if="theme.eventStatus==2" src="../../../assets/img/index_state_yijieshu.png"/>
	   <img v-if="theme.eventStatus==3" src="../../../assets/img/index_state_yiqingsuan.png"/>
	   <img v-if="theme.eventStatus==4" src="../../../assets/img/index_state_yizanting.png"/>
    </div>
  </div>
  </div>
</template>
<script>
	export default{
		props:[
		    'theme'
		],
		created(){
		},
		methods:{
			title(e){
				let id=e.path[0].getAttribute('data-id');
				this.$router.push({path:'/activity/'+id});
			}
		}
	}
</script>
<style scoped>
.forecast_div{
	height: 87px;
	border-bottom: solid 1px #e5e5e5;
	overflow: hidden;
	position: relative;
}
.forecast_div_content{
	width: 1176px;
	height: 68px;
	margin: 0 auto;
	margin-top: 10px;
}
.forecast_content_left{
	float: left;
	width: 117px;
	height: 100%;
}
.forecast_content_left>img{
	width: 107px;
	height: 68px;
}
.forecast_content_right{
	float: right;
	width: 1059px;
	height: 68px;
}
.content_right_title{
	line-height: 28px;
	font-size: 16px;
	color: #444444;
	font-weight: bold;
	padding-top: 2px;
}
.content_right_time{
	height: 26px;
	overflow: hidden;
}
.content_right_time>span{
	width: 44px;
	height: 17px;
	line-height: 17px;
	font-size: 12px;
	color: white;
	text-align: center;
	background: #dd6d76;
	border-radius: 10px;
	display: block;
	margin-left: 2px;
	margin-top: 5px;
	float: left;
}
.criticism{
	background: #dd6d76 !important;
}
.forecast{
	background:#e52735;
}
.content_right_time>a{
	height: 26px;
	line-height: 26px;
	font-size: 14px;
	color: #888888;
	margin-left: 6px;
	float: left;
}
.forecast_icon{
	position: absolute;
	bottom: 5px;
	right: 12px;
	width: 66px;
	height: 64px;
	text-align: center;
	line-height: 64px;
}
.forecast_icon>img{
	vertical-align: middle;
}
.content_time>span{
	background: #7990bf;
}
</style>

<template>
<!--右侧宝箱-->
<div class="eventGroup_head_right">
	<div v-if="eventGroup.isReward == 0" class="eventGroup_head_hongbao">
		<img src="../../assets/img/eventGroup/event_hongbao.png" />
	</div>
	<div class="eventGroup_head_baoxiang" v-if="eventGroup.isBox==0">
		<div class="eventGroup_head_bx_xs" @click="showBoxModal" v-if="eventBox.prizeStatus==6">
			<img src="../../assets/img/eventGroup/event_baoxiang_xianshi.png" />
		</div>
		<div class="eventGroup_head_bx_dlq" v-if="eventBox.prizeStatus==2">
			<img src="../../assets/img/eventGroup/event_baoxiang.png" />
			<div class="eventGroup_head_box">
				<p class="eventGroup_head_time">领奖倒计时：{{eventBox.prizeValidity}}</p>
				<p class="eventGroup_head_num">
					<span>{{eventBox.prizeName}}X{{eventBox.num}}</span>
					<router-link tag="i" to="/personal/assets/gift">领取</router-link>
				</p>
			</div>
		</div>
		<div class="eventGroup_head_bx_lq" v-if="eventBox.prizeStatus==0">
			<img src="../../assets/img/eventGroup/event_baoxiang.png" />
			<div class="eventGroup_head_box">
				<p class="eventGroup_head_lq_time">领奖有效期还剩</p>
				<p class="eventGroup_head_lq_time">{{eventBox.boxValidity}}</p>
			</div>
		</div>
		<div class="eventGroup_head_bx_yl" v-if="eventBox.prizeStatus==1">
			<img src="../../assets/img/eventGroup/event_yiling.png" />
			<div class="eventGroup_head_yl_text">
				<p>您已领取了{{eventBox.prizeName}}X{{eventBox.num}}</p>
			</div>
		</div>
		<div class="eventGroup_head_bx_yhq" v-if="eventBox.prizeStatus==4">
			<img src="../../assets/img/eventGroup/event_bx_ygq.png" />
			<div class="eventGroup_head_box">
				<p class="eventGroup_head_time">宝箱有效期为{{eventBox.boxDays}}天,</p>
				<p class="eventGroup_head_time">您的宝箱已经过期！</p>
			</div>
		</div>
		<div class="eventGroup_head_bx_ygqn" v-if="eventBox.prizeStatus==5">
			<img src="../../assets/img/eventGroup/event_bx_ygq.png" />
			<div class="eventGroup_head_box">
				<p class="eventGroup_head_time">奖品已过期</p>
				<p class="eventGroup_head_time">{{eventBox.prizeName}}</p>
			</div>
			<div class="eventGroup_head_yl_text eventGroup_head_ygqn">
				<p class="eventGroup_head_yl_p1">很遗憾！您未能在有效期内完成兑奖。下次加油吧！</p>
			</div>
		</div>
	</div>
	<!--宝箱弹层提示-->
	<div class="box_hint" v-if="isBox">
		<div class="box_hint_body">
			<div class="box_hint_center">
				<p><button class="box_hint_button" @click="showBoxModal"></button></p>
				<div class="box_hint_gesture">
					<div class="box_hint_gesture_div">
						<span>•</span>
						<p>本话题含有获利奖励，奖品为神奇宝箱；</p>
					</div>
					<div class="box_hint_gesture_div">
						<span>•</span>
						<p>凡参与本话题交易，并在清算后统计为获利的用户，均可获得一个神奇宝箱（1小时内发放）；</p>
					</div>
					<div class="box_hint_gesture_div">
						<span>•</span>
						<p>获奖用户可在个人空间打开宝箱，并随机获得奖品（实物奖品、虚拟奖品、未来豆、金豆等，任意一种）；</p>
					</div>
					<div class="box_hint_gesture_div">
						<span>•</span>
						<p>神奇宝箱须要在有效期内开启，过期视同自动放弃抽奖机会！</p>
					</div>
				</div>
				<div class="box_hint_need">请您积极参与，争取获利，获得大奖！</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default{
	props: {
		eventGroup:{
			type: Object,
    		default() { return {}; }
		},
		eventBox:{
			type: Object,
    		default() { return {}; }
		},
	},
	data() {
		return {
			isBox: false
		}
	},
	methods: {
		showBoxModal() {
			this.isBox = !this.isBox;
		}
	}
}
</script>

<style>
/***红包和宝箱**/
.eventGroup_head_right {
	height: 100%;
	float: right;
}

.eventGroup_head_right>div {
	display: inline-block;
}

.eventGroup_head_right>div>img,
.eventGroup_head_right>div>div>img {
	vertical-align: middle;
}

.eventGroup_head_hongbao {
	margin-right: 5px;
}

.eventGroup_head_bx_xs {
	cursor: pointer;
}

.eventGroup_head_bx_dlq,
.eventGroup_head_bx_lq,
.eventGroup_head_bx_yhq,
.eventGroup_head_bx_ygqn {
	position: relative;
	margin-left: 16px;
	vertical-align: middle;
	display: inline-block;
}

.eventGroup_head_bx_dlq>img,
.eventGroup_head_bx_lq>img,
.eventGroup_head_bx_yhq>img,
.eventGroup_head_bx_ygqn>img {
	position: absolute;
	left: -16px;
	top: -4px;
}

.eventGroup_head_box {
	height: 32px;
	padding: 0 13px 0 36px;
	border: 1px solid #e3e3e3;
	-webkit-border-radius: 17px;
	-moz-border-radius: 17px;
	border-radius: 17px;
	background: #f9f9f9;
	cursor: pointer;
}

.eventGroup_head_time {
	line-height: 17px;
	color: #a4a4a4;
	font-size: 12px;
}
.eventGroup_head_num {
	color: #d4423d;
	font-size: 12px;
	height: 12px;
	line-height: 12px;
}
.eventGroup_head_num>span {
	padding-right: 6px;
	border-right: 1px solid #d5d5d5;
}
.eventGroup_head_num>i {
	cursor: pointer;
}
.eventGroup_head_lq_time {
	color: #d4423d;
	font-size: 12px;
	line-height: 16px;
}

.eventGroup_head_bx_yl {
	position: relative;
}

.eventGroup_head_bx_yhq {
	cursor: pointer;
}

.eventGroup_head_yl_text {
	width: 213px;
	height: 60px;
	background: url(../../assets/img/eventGroup/event_bg.png) no-repeat center;
	position: absolute;
	top: 48px;
	display: none;
	z-index: 99;
}

.eventGroup_head_yl_text>p {
	width: 200px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	color: #828282;
	font-size: 12px;
	margin-top: 12px;
	margin-left: 8px;
}

.eventGroup_head_bx_yl:hover .eventGroup_head_yl_text {
	display: block;
}

.eventGroup_head_yl_text>p.eventGroup_head_yl_p1 {
	line-height: 16px;
	padding-top: 5px;
}

.eventGroup_head_bx_ygqn:hover .eventGroup_head_yl_text {
	display: block;
}

.eventGroup_head_ygqn {
	left: -41px;
	top: 31px;
}
/**************宝箱提示*****************/
.box_hint {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat;
	background-size: 100%;
	z-index: 100;
	display: table !important;
}

.box_hint_body {
	display: table-cell;
	vertical-align: middle;
}

.box_hint_center {
	width: 420px;
	height: 347px;
	background: url(../../assets/img/eventGroup/dialog_box2.png) no-repeat center;
	background-size: cover;
	margin: 0 auto;
}

.box_hint_center>p {
	height: 114px;
	text-align: right;
}

.box_hint_center>p>button {
	width: 33px;
	height: 33px;
	margin-top: 30px;
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
}

.box_hint_gesture {
	width: 353px;
	/* height:200px; */
	margin-left: 25px;
	padding-top: 17px;
	display: inline-block;
}

.box_hint_gesture_div {
	font-size: 14px;
	color: #5e5e5e;
}

.box_hint_gesture_div>span {
	height: 20px;
	line-height: 20px;
	width: 12px;
	float: left;
}

.box_hint_gesture_div>p {
	float: left;
	width: 340px;
	line-height: 20px;
}

.box_hint_need {
	font-size: 14px;
	color: #5e5e5e;
	line-height: 20px;
	margin-top: 12px;
	text-align: center;
	width: 96%;
}
</style>
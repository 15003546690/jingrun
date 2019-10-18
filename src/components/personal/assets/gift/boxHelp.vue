<template>
	<div class="lotto_main">
		<div class="lotto_head">
			<p class="lotto_head_left"></p>
		</div>
		<p class="lotto_banner"><img src="../../../../assets/img/box/lotto-img2.jpg" /></p>
		<div class="lotto_body">
			<div class="lotto_body_prize">
				<div class="lotto_body_box">
					<p class="lotto_body_box_left">
						<span><img :src="helpList.prizeImg"/></span>
					</p>
					<div class="lotto_body_box_right">
						<p>{{helpList.prizeName}}</p>
						<p>数量X{{helpList.prizeNum}}</p>
					</div>
				</div>
			</div>
			<div class="lotto_body_content">
				<p id="first" class="lotto_body_content_p1 active"><img src="../../../../assets/img/box/lotto-img01.png" /><img src="../../../../assets/img/box/lotto-img03.png" /></p>
				<p id="second" class="lotto_body_content_p2 active"><img src="../../../../assets/img/box/lotto-img02.png" /><img src="../../../../assets/img/box/lotto-img03.png" /></p>
				<p id="third" class="lotto_body_content_p3 active"><img src="../../../../assets/img/box/lotto-img01.png" /><img src="../../../../assets/img/box/lotto-img03.png" /></p>
			</div>
			<div class="lotto_body_text">
				<p class="lotto_body_text_btn gray_btn">好友助力</p>
				<p class="lotto_body_text_ti" v-if="helpList.status==1">还需要{{helpList.leftFriends}}位好友帮助，即可兑奖！</p>
				<p class="lotto_body_text_ti" v-if="helpList.status==2">好友助力完成</p>
			</div>
		</div>
		<div class="lotto_body_record">
			<div class="lotto_record_box">
				<p class="lotto_record_head">助力记录</p>
				<div class="lotto_record_list">
					<ul class="lotto_record_main">
						<li v-for="(item,index) in helpList.helpers" :key="index">
							<p class="lotto_record_p1">{{item.helperName}}</p>
							<p class="lotto_record_p2 lotto_record_success" v-if="item.helpState=='助力成功'">帮助成功</p>
							<p class="lotto_record_p2 lotto_record_error" v-if="item.helpState=='助力失败'">帮助失败</p>
							<p class="lotto_record_p3">{{item.helpTime}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="lotto_explain"><img src="../../../../assets/img/box/lotto_explain.jpg" /></div>
		<div class="lotto_down">
			<div class="lotto_down_box">
				<p class="lotto_down_left" id="qrcode" ref="qrcode"><img :src="shareImg" /></p>
				<!--<input type="text" id="getval" value="http://192.168.10.112:7611/activity/v1/box/shareQRcode?state=1" />-->
				<p class="lotto_down_right">请扫描二维码 分享到微信 邀请好友助力</p>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data() {
		return{
			loginToken: null,
			helpList: [],
			shareImg: this.$base_url+'/activity/v1/box/shareQRcode?state='+ this.$route.query.id
		}
	},
	props: [
		'boxId',
		'groupId',
		'prizeId'
	],
	created() {
		this.boxHelp()
	},
	methods: {
		boxHelp() {
			this.$CPOST('/activity/v1/box/friendsHelperMsg',{
			  boxId: this.$route.query.id,
			  groupId: this.$route.query.groupId,
			  prizeId: this.$route.query.prizeId
			},(res) => {
				this.helpList = res.resultValue
			})
		}
	}
}

	
</script>

<style scoped>
body{width: 750px;font-family: "microsoft yahei";background: #fff;margin:0 auto;font-size: 0;}
.lotto_main{width: 750px;margin: auto;}
.lotto_head{width: 100%;height: 80px;background: #232227;}
.lotto_head_left{width: 240px;height: 80px;line-height: 80px;text-align: right;float: left;}
.lotto_head_left>img{vertical-align: middle;}
.lotto_head_right{width: 162px;height: 100%;line-height: 80px;text-align: center;color: #fff;background: #ed0f0e;float: right;font-size: 24px;}
.lotto_banner{width: 100%;height: 380px;}
.lotto_body{width: 100%;height: 696px;background: url(../../../../assets/img/box/lotto-img3.jpg) no-repeat center;background-size: cover;}
.lotto_body_prize{width: 100%;height: 120px;text-align: center;}
.lotto_body_box{display: inline-block;height: 120px;}
.lotto_body_box_left{width: 120px;height: 120px;background: url(../../../../assets/img/box/lotto-bg1.png) no-repeat center;background-size: cover;display: inline-block;vertical-align: middle;}
.lotto_body_box_left>span{width: 110px;height: 110px;display: block;line-height: 112px;text-align: center;margin-left: 5px;margin-top: 5px;border-radius: 6px;overflow: hidden;}
.lotto_body_box_left>span>img{vertical-align: top;width: 100%;height: 100%;}
.lotto_body_box_right{display: inline-block;margin-left: 20px;vertical-align: middle;}
.lotto_body_box_right>p{line-height: 38px;text-align: left;color: #fff;font-size: 28px;}
.lotto_body_content{width: 720px;height: 294px;margin: auto;margin-top: 40px;position: relative;}
.lotto_body_content_p1,.lotto_body_content_p2,.lotto_body_content_p3{width: 200px;height: 294px;line-height: 294px;position: absolute;}
.lotto_body_content_p1{left: 20px;}
.lotto_body_content_p2{left: 260px;}
.lotto_body_content_p3{left: 500px;}
.lotto_body_content_p1>img,.lotto_body_content_p2>img,.lotto_body_content_p3>img{position: absolute;backface-visibility: hidden;transition: 1s; transform-style: preserve-3d;transform: rotateY(-180deg);}
.lotto_body_content_p1>img+img,.lotto_body_content_p2>img+img,.lotto_body_content_p3>img+img{transform: rotateY(0deg);}
.lotto_body_content_p1.active>img,.lotto_body_content_p2.active>img,.lotto_body_content_p3.active>img{transform: rotateY(0deg);}
.lotto_body_content_p1.active>img+img,.lotto_body_content_p2.active>img+img,.lotto_body_content_p3.active>img+img{transform: rotateY(180deg);}
.lotto_body_text{width: 100%;margin-top: 55px;}
.lotto_body_text_btn{width: 262px;height: 75px;line-height: 67px;text-align: center;margin: auto;font-size: 32px;color: #f1f0f4;cursor: pointer;}
.wait_btn{background: url(../../../../assets/img/box/lotto-btn.png) no-repeat center;}
.gray_btn{background: url(../../../../assets/img/box/lotto-btn-ban.png) no-repeat center;cursor: initial;}
.lotto_body_text_ti{width: 100%;line-height: 26px;text-align: center;color: #f1f0f4;font-size: 20px;margin-top: 10px;}
.lotto_body_record{width: 100%;height: 524px;background: url(../../../../assets/img/box/lotto-bg2.jpg) no-repeat center;background-size: cover;}
.lotto_record_box{width: 710px;height: 486px;margin: auto;background: url(../../../../assets/img/box/lotto-record.png) no-repeat center;background-size: cover;}
.lotto_record_head{width: 620px;height: 76px;line-height: 76px;text-align: center;margin: auto;color: #fff;font-size: 32px;}
.lotto_record_list{width: 583px;height: 282px;margin: auto;margin-top: 78px;overflow: hidden;position: relative;}
.lotto_record_main{width: 100%;position: absolute;}
.lotto_record_main>li{width: 100%;height: 32px;font-size: 24px;line-height: 32px;margin-bottom: 17px;}
.lotto_record_p1{width: 172px;color: #282734;text-align: center;float: left;}
.lotto_record_p2{width: 137px;text-align: center;float: left;margin-left: 30px;}
.lotto_record_success{color: #e63034;}
.lotto_record_error{color: #7b7883;}
.lotto_record_p3{width: 243px;color: #7b7883;text-align: center;float: left;}
.lotto_explain{width: 100%;height: 280px;}
.lotto_explain>img{width: 100%;height: 100%;}
.lotto_down{width: 100%;height: 190px;background: #030a48;}
.lotto_down_box{width: 710px;height: 160px;margin: auto;}
.lotto_down_left{width: 200px;height: 100%;line-height: 160px;text-align: center;display: inline-block;vertical-align: middle;}
.lotto_down_left>img{width: 160px;height: 160px;}
.lotto_down_right{width: 490px;font-size:30px;color:#fff;display: inline-block;vertical-align: middle;}
</style>
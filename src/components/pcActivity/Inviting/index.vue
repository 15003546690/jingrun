<template>
	<div class="newinvitaion">
		<!--banner-->
		<div class="new_invitaion"></div>
		<!--邀请好友-->
		<div class="new_content">
			<div class="new_content_center">
				<div class="new_content_center_body">
					<div class="body_content">
						<div class="body_content_left">
							<div class="content_header">
								<div class="content_header_bg">
									<span v-show="!loginimg1"><img :src="this.$store.state.userImg"/></span>
									<span v-show="loginimg1"><img src="https://img.ifuturex.com/image/user/male.png"/></span>
									<p v-show="!loginimg1">{{this.$store.state.userNickName}}</p>
									<p v-show="loginimg1">尚未登录</p>
								</div>
							</div>
							<div class="content_body">
								<p>邀请码:{{userInfo.invitedCode}}</p>
								<p>您已成功邀请{{userInfo.invitedCount}} 人</p>
							</div>
							<p class="btncli" @click="comeom()" ><button >立即邀请</button></p>
						</div>
						<div class="body_content_right">
							<div class="content_right right_p">
								<div class="right_com">
									<p>成功邀请<i>5人及以上</i>，已有
										<a>{{resultValue.five}}</a>人完成</p>
								</div>
							</div>
							<div class="content_right right_pp">
								<div class="right_com">
									<p>成功邀请<i>10人及以上</i>，已有
										<a>{{resultValue.ten}}</a>人完成</p>
								</div>
							</div>
							<div class="content_right right_ppp">
								<div class="right_three">
									<p>成功邀请<i>100人及以上</i>，已有
										<a>{{resultValue.fiftyECard}}</a>人完成</p>
									<span>(每时段限量发放15张)</span>
								</div>
							</div>
							<div class="content_right right_pv">
								<div class="right_three">
									<p>成功邀请<i>300人及以上</i>，已有
										<a>{{resultValue.oneHundredECard}}</a>人完成</p>
									<span>(每时段限量发放5张)</span>
								</div>
							</div>
							<div class="content_right right_pvv">
								<div class="right_three">
									<p>成功邀请<i>500人及以上</i>，已有
										<a>{{resultValue.twoHundredsECard}}</a>人完成</p>
									<span>(每时段限量发放3张)</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--活动奖励-->
		<div class="new_cont">
			<div class="new_cont_center">
				<div class="new_cont_center_body">
					<div class="center_body_bodypp">
						<p><img class="img_w" src="../../../components/pcActivity/Inviting/img/img_22_07.jpg"/></p>
						<div class="new_cont_time">距下一时段发放倒计时</div>
						<p class="center_body_pp">
							<span id="hour">{{timehour}}</span>
							<span class="spancenter" id="minute">{{timeminute}}</span>
							<span id="second">{{timesecond}}</span>
						</p>
					</div>
					<!--卡领取-->
					<div class="btn_car">
						<div class="btn_car_center">
							<div class="btn_car_center_left common_select">
								<div class="btn_car_img">
									<img src="../../../../src/components/pcActivity/newinvitation/img/money_05.png"/>
									<p>成功邀请5人及以上</p>
								</div>
								<div class="btn_button">
									<button class="btn1" v-show="immediately" v-if="InvitedLevel>0" @click="showindexc(1)">立即领取</button>
									<button class="btn2" disabled="disabled" v-show="conceal" v-if="InvitedLevel<=0">立即领取</button>
								</div>
							</div>
							<div class="btn_car_center_right common_select">
								<div class="btn_car_img">
									<img src="../../../../src/components/pcActivity/newinvitation/img/money_10.png"/>
									<p>成功邀请10人及以上</p>
								</div>
								<div class="btn_button">
									<button class="btn1" v-show="immediately" v-if="InvitedLevel>1" @click="showindexc(2)">立即领取</button>
									<button class="btn2" disabled="disabled" v-show="conceal" v-if="InvitedLevel<=1">立即领取</button>
								</div>
							</div>
						</div>
					</div>
					<div class="btn_car_thre">
						<div class="car_thre_center">
							<div class="car_thre_center_left common_select">
								<div class="btn_car_img">
									<img src="../../../assets/img/newinvitation/5-03.png" />
									<p>成功邀请100人及以上</p>
									<span>（库存:{{resultValue.fiftyECardCount}}）</span>
								</div>
								<div class="btn_button">
									<button class="btn1" v-show="immediately" v-if="InvitedLevel>2" @click="showindexc(3)">立即领取</button>
									<button class="btn2" disabled="disabled" v-show="conceal" v-if="InvitedLevel<=2">立即领取</button>
								</div>
							</div>
							<div class="car_thre_center_center common_select">
								<div class="btn_car_img">
									<img src="../../../assets/img/newinvitation/5-04.png" />
									<p>成功邀请300人及以上</p>
									<span>（库存: {{resultValue.oneHundredECardCount}}）</span>
								</div>
								<div class="btn_button">
									<button class="btn1" v-show="immediately" v-if="InvitedLevel>3" @click="showindexc(4)">立即领取</button>
									<button class="btn2" disabled="disabled" v-show="conceal" v-if="InvitedLevel<=3">立即领取</button>
								</div>
							</div>
							<div class="car_thre_center_right common_select">
								<div class="btn_car_img">
									<img src="../../../assets/img/newinvitation/5-05.png" />
									<p>成功邀请500人及以上</p>
									<span>（库存: {{resultValue.twoHundredsECardCount}}）</span>
								</div>
								<div class="btn_button">
									<button class="btn1" v-show="immediately" v-if="InvitedLevel>4" @click="showindexc(5)">立即领取</button>
									<button class="btn2" disabled="disabled" v-show="conceal" v-if="InvitedLevel<=4">立即领取</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="new_map"></div>
		<div class="new_word"></div>
		<!--弹层-->
		<div class="confirm_modal" v-show="confirm">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<p><button @click="hideclick"></button></p>
					<div class="hideclick">
						<p id="contentmon">
							<a v-show="Tecy" id="Tecy_invitionc">邀请奖励只可获得一次，您确认领取吗？</a><!---->
							<a v-show="contentmon">恭喜您，领取成功</a><br />
							<a v-show="news" id="news">我们会在2个工作日核实发放至您的注册手机号码及站内消息，请注意查收</a>
							<a id="tmonconten" v-show="tmonconten">{{resultmassage}}</a>
						</p>
						<div class="surebtn">
							<button @click="hideclick">取消</button>
							<button v-show='sureInseng' @click="cashxin">确认</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--弹层-->
		<div class="confirm_simne" v-show="commsem">
			<div class="confirm_hongbao">
				<div class="confirm_main_or">
					<p><button @click="hideclick"></button></p>
					<div class="hideclick">
						<p id="Text">
							<a v-show="invitionc" id="Tecy_a" >邀请奖励只可获得一次，您确认领取吗？</a>
							<a v-show="conmentubcn">恭喜您，领取成功</a>
							<a v-show="mentub">{{resultmassage}}</a>
						</p>
						<div class="surebtn">
							<button @click="hideclick">取消</button>
							<router-link tag="button" to="/personal/assets/cash" v-show='surecash'>查看现金账户</router-link>
							<button v-show='sureInti' @click="cashxin">确认</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"/>
	</div>
</template>
<script>
import login from '@/components/common/login'
	export default {
		components:{
				login
			    },
		data() {
				return {
					isShowLoginModal:false,
					userInfo: '',
					activityId: '',
					resultValue: '',
					loginimg1: true,
					immediately: true,
					conceal: true,
					nextshmentTime: '',
					currentTime: '',
					InvitedLevel: '',
					confirm: false,
					commsem: false,
					resultMessages: '',
					conter: false,
					conmentub: false,
					conmentubcn:false,
					mentub:false,
					surecash: false,
					sureInti: true,
					sureInseng:true,
					contentmon:false,
					tmonconten:false,
					resultmassage: '',
					prizeLevel: '',
					invitionc:true,
					Tecy:true,
					Timeslot: 0,
					news:false,
					alertType: 0,
					timer:null,
					timehour:'',//时
					timeminute:'',//分
					timesecond:'',//秒
					kong: false
				}
			},
			created() {
				this.newinvitaion()
			},
			methods: {
				//立即邀请
				comeom(){
					if(this.$store.state.refreshToken == ''){
					   this.isShowLoginModal = true;
				    }else{
				    	this.$router.push({path:'/personal/invite'})
				    }
				},
				hideLoginModal(){
				      this.isShowLoginModal = false;
				},
				GetQueryString(name) {
					return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
				},
				showindexc(n) {
					var prizeLevel = n;
					this.prizeLevel = prizeLevel;
					if(n == 1 || n == 2) {
						this.commsem = true;
						this.confirm = false;
					}
					if(n == 3 || n == 4 || n == 5) {
						this.confirm = true;
						this.commsem = false;
					}
				},
				//详情
				newinvitaion() {
					var activityId = this.GetQueryString('activityId');
					this.$CPOST('/activity/v1/invitation/userInvitationFebruary', {
							activityId:activityId
						},(res) =>{
							this.resultValue = res.resultValue;
							this.userInfo = res.resultValue.userInvitationInfo;
							this.currentTime = res.resultValue.currentTime;
							this.nextshmentTime = res.resultValue.nextReplenishmentTime;
							this.isReceive = res.resultValue.isReceive;
							if(res.resultValue.userInvitationInfo.nickName=="") {
									this.loginimg1 = true;
								}else{
									this.loginimg1 = false;
								}
							if(this.isReceive == 1) {
								this.InvitedLevel = 0
							} else {
								this.InvitedLevel = res.resultValue.userCurrentInvitedLevel;
							}
                            this.timeStamp();
						})
				},
				
				hideclick() {
					this.confirm = false;
					this.commsem = false;
					this.newinvitaion();
					this.cashxin()
				},
				//领取按钮
				cashxin() {
					if(this.alertType == 1){
						this.confirm = false;//弹层
						this.commsem = false;//弹层
						this.alertType = 0;
						this.$router.go(0);
					}else if(this.alertType == 2){
						this.tmonconten = false;//后台返回信息
						this.Tecy = true;
						this.confirm = false;//弹层
						this.commsem = false;//弹层
						this.mentub = false;//后台返回信息
						this.invitionc = true;//可领取一次的信息提示
						this.alertType = 0;
					}else{
						var _this = this;
						var activityId = this.GetQueryString('activityId');
						this.$CPOST('/activity/v1/invitation/claimPrize', {
	         					activityId:activityId,
								prizeLevel: _this.prizeLevel
							},(res) => {
								var Text = document.getElementById('Text')
								var contentmon = document.getElementById('contentmon')
									if(res.resultCode == 200) {
										this.conmentubcn = true
										this.surecash = true
										this.tmonconten = false
										this.contentmon = true
										this.invitionc = false
										this.sureInti = false
										this.Tecy = false
										this.news = true
										this.alertType = 1;
										this.surecash = true;
									} 
									else {
										this.tmonconten = true
										this.Tecy = false										
										this.resultmassage = res.resultMessages;
										this.invitionc = false
										this.mentub = true
										this.alertType = 2
									}
							})
					}
				},
				timeStamp() {
				    var begintime = this.currentTime;
					var endtime = this.nextshmentTime;
					var tt = begintime.substr(0,begintime.length - 3);
	  				var ttm = Number(tt)*1000;
					this.Timeslot = endtime - ttm;
					this.countDown();
				},
				countDown(){
					var _this = this;
				    _this.timer=setInterval(function(){
				    	if(_this.Timeslot > 1000){
					        _this.Timeslot -= 1000;
					        _this.timeout();
					       }else{
					       	clearInterval(_this.timer)
					       	_this.timer = null;
					       	_this.newinvitaion()
					       }
				    },1000)
			    },
				timeout(){
					var hours = Math.floor(this.Timeslot / (60 * 60 * 1000));
					var leave2 = this.Timeslot % (3600 * 1000); //计算小时数后剩余的毫秒数
					var minutes = Math.floor(leave2 / (60 * 1000));
					var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
					var seconds = Math.round(leave3 / 1000);
					if(hours<10){
						hours = '0'+hours
					}
					if(minutes<10){
						minutes = '0'+minutes
					}
					if(seconds<10){
						seconds = '0'+seconds
					}
					this.timehour = hours;
					this.timeminute = minutes;
					this.timesecond = seconds;
				}
			}
	}
</script>
<style scoped>
* {padding: 0;margin: 0;}
ul li {list-style: none;}
body,html {font-family: "微软雅黑";}
.hide {display: none;}
.newinvitaion{min-width: 1200px;max-width: 1920px;margin: auto;font-size: 0;}
.new_invitaion {height: 654px;background: url(../../../../src/components/pcActivity/Inviting/img/banner.jpg) no-repeat center;background-size: cover;}	
.new_content {background:#fff1d7 }
.new_content_center {width: 1309px;margin: 0 auto;height: 650px;}
.new_content_center_body {height: 650px;background: url(../../../components/pcActivity/Inviting/img/img_03.png) no-repeat center;overflow: hidden;}
.body_content {width: 1138px;margin: 0 auto;margin-top: 27px;height: 526px;}
/*邀请好友左侧*/
.body_content_left {width: 356px;height: 526px;float: left;}
.content_header {height: 200px;margin-top: 108px;margin-bottom: 10px;}
.content_header_bg {width: 158px;height: 200px;margin: 0 auto;background: url(../../../../src/components/pcActivity/Inviting/img/img_09.png) no-repeat center;background-size: cover;overflow: hidden;}
.content_header_bg>span {width: 96px;height: 96px;border-radius: 8px;margin: 0 auto;margin-top: 34px;display: block;}
.content_header_bg>span>img {width: 100%;height: 100%;border-radius: 8px;}
.content_header_bg>p {line-height: 45px;font-size: 16px;text-align: center;color: white;}
.content_body {height: 78px;font-size: 22px;color: #da0a40;text-align: center;}
.content_body p{line-height: 33px;}
.btncli {text-align: center;}
.btncli>button{width: 147px;height: 40px;border-radius: 2px;background: #e72340;font-size: 22px;color: white;border: none;cursor: pointer;}
/*邀请好友右侧*/
.body_content_right {width: 706px;height: 526px;float: left;}
.content_right {height: 92px;width: 100%;margin-top: 9px;color: #320b0d;font-size: 20px;overflow: hidden;}
.right_p{background: url(../../../../src/components/pcActivity/Inviting/img/img_04.jpg) no-repeat center;background-size: cover;}
.right_pp{background: url(../../../../src/components/pcActivity/Inviting/img/img_05.jpg) no-repeat center;background-size: cover;}
.right_ppp{background: url(../../../../src/components/pcActivity/Inviting/img/img_06.jpg) no-repeat center;background-size: cover;}
.right_pv{background: url(../../../../src/components/pcActivity/Inviting/img/img_07.jpg) no-repeat center;background-size: cover;}
.right_pvv{background: url(../../../../src/components/pcActivity/Inviting/img/img_08.jpg) no-repeat center;background-size: cover;}
.right_com{width: 540px;height: 76px;margin-left: 157px;margin-top: 16px;}
.right_com>p{line-height: 76px;font-size: 20px;color: #320b0d;}
.right_com>p>i{color: #ff5c23;}
.right_three{width: 540px;height: 74px;margin-left: 157px;margin-top: 17px;}
.right_three>p{line-height: 47px;font-size: 20px;color: #320b0d;}
.right_three>p>i{color: #ff5c23;}
.right_three>span {font-size: 20px;color: #320b0d;}
/*活动奖励*/
.new_cont {height: 949px;background: #fff1d7}
.new_cont_center {width: 1289px;margin: 0 auto;height: 1011px;padding-top: 20px;}
.new_cont_time {line-height: 36px;text-align: center;font-size: 18px;color: #320b0d;}
.center_body_bodypp{width: 284px;position: absolute;top: -28px;left: 494px;padding-left: 6px;}
.new_cont_center_body {height: 780px;background: url(../../../../src/components/pcActivity/Inviting/img/img_13.png) no-repeat center;position: relative;padding-top: 184px;}
.center_body_pp {width: 284px;height: 91px;background: url(../../../../src/components/pcActivity/Inviting/img/timer.png) no-repeat center;padding-left: 6px;}
.center_body_pp>span {width: 77px;height: 82px;line-height: 82px;font-size: 40px;color: white;display: block;float: left;text-align: center;}
.spancenter {margin-left: 18px;}
.img_w{margin-left: 10px;margin-bottom: 10px;}
#hour{margin-left: 4px;}
#second{margin-left: 21px;}
.btn_car {height: 346px;margin-top: -4px;}
.btn_car_center {width: 775px;height: 310px;margin: 0 auto;}
.btn_car_center_left {float: left;width: 397px;height: 310px;}
.btn_car_img {height: 194px;text-align: center;margin-top: 30px;position: relative;}
.btn_car_img>p {width: 397px;line-height: 20px;text-align: center;font-size: 18px;color: #320b0d;position: absolute;bottom: 22px;left: 0;}
.btn_button {height: 78px;text-align: center;}
.btn_button .btn1 {width: 207px;height: 48px;border-radius: 8px;background: #e72340;border: none;color: white;font-size: 24px;margin-top: 15px;cursor: pointer;}
.btn_button .btn2 {width: 207px;height: 48px;border-radius: 8px;background: #cfcfcf;border: none;color: white;font-size: 24px;margin-top: 15px;cursor: pointer;}
.btn_car_center_right {float: right;width: 378px;height: 310px;}
.btn_car_thre {height: 312px;}
.car_thre_center {width: 1138px;height: 100%;margin: 0 auto;}
.car_thre_center_left {width: 376px;height: 312px;float: left;}
.car_thre_center_center {width: 387px;height: 312px;float: left;}
.car_thre_center_right {width: 375px;height: 312px;float: left;}
.car_thre_center_left .btn_car_img,.car_thre_center_center .btn_car_img,.car_thre_center_right .btn_car_img {margin-top: 0;}
.car_thre_center_left .btn_car_img p,.car_thre_center_center .btn_car_img p,.car_thre_center_right .btn_car_img p {font-size: 18px;color: #320b0d;}
.car_thre_center_left .btn_car_img span,.car_thre_center_center .btn_car_img span,.car_thre_center_right .btn_car_img span {width: 376px;font-size: 18px;color: #320b0d;display: block;text-align: center;position: absolute;bottom: -8px;left: 0;}
.car_thre_center_left .btn_button,.car_thre_center_center .btn_button,.car_thre_center_right .btn_button {margin-top: 22px;}
.new_map{height: 1312px;background: url(../../../../src/components/pcActivity/Inviting/img/img4.jpg) no-repeat center;background-size: cover;}
.new_word {height: 1018px;background: url(../../../../src/components/pcActivity/Inviting/img/img5.jpg) no-repeat center;background-size: cover;}
/*弹层*/
.confirm_modal,.confirm_simne {width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box,.confirm_hongbao {width: 359px;height: 387px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;border-radius: 4px;}
.confirm_main,.confirm_main_or {width: 100%;height: 100%;background: #fff;border: 1px solid #c9c9c9;margin: auto;border-radius: 4px;background: url(../../../assets/img/newinvitation/car.jpg) no-repeat center;background-size: cover;}
.confirm_hongbao .confirm_main_or {width: 100%;height: 100%;background: #fff;border: 1px solid #c9c9c9;margin: auto;border-radius: 4px;background: url(../../../assets/img/newinvitation/hongbao.jpg) no-repeat center;background-size: cover;}
.confirm_main_or>p {height: 24px;text-align: right;}
.confirm_main_or>p>button {width: 30px;height: 24px;border: none;cursor: pointer;background: none;}
.confirm_main_head {width: 100%;height: 32px;}
.confirm_main_head>p {float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span {display: block;float: right;cursor: pointer;}
.confirm_text {width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box {display: inline-block;vertical-align: middle;}
.confirm_btn {width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button {width: 98px;height: 32px;background: url(../../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
.hideclick {height: 178px;margin-top: 184px;}
.hideclick>p {height: 35px;text-align: center;font-size: 24px;color: #e32f2a;}
.hideclick>div {width: 305px;line-height: 26px;font-size: 20px;color: #323232;text-align: center;margin: 0 auto;}
.confirm_main_or .surebtn {width: 100%;height: 68px;border-top: solid 1px #ccc;}
.confirm_main_or .surebtn button {width: 179px;height: 68px;font-size: 20px;color: #808080;float: left;border: none;border-right: solid 1px #ccc;cursor: pointer;background: none;}
.confirm_main_or .surebtn button+button {width: 179px;height: 68px;font-size: 20px;color: #e32f2a;float: left;border: none;}
#Text{height: 111px;}
#contentmon{height: 110px;}
#tmonconten{color: #323232;font-size: 20px;}
#Text #Tecy_a,#Tecy_invitionc{width: 240px !important;font-size: 20px;color: #323232;}
#contentmon #news{width: 100px;font-size: 16px;color: #323232;}
</style>
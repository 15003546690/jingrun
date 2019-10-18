<template>
	<div class="Pull_up">
		<div class="Pull_the_new">
		</div>
		<div class="activity_reward">
			<div class="activity_reward_body">
			</div>
		</div>
		<div class="activity_reward_main">
			<div class="reward_main">
				<div class="reward_main_bg">
					<div class="reward_main_left">
						<div class="reward_main_left_title">
							<div class="title_pic">
								<div class="title_pic_hand">
									<span v-show="loginimg1"><img :src="message.img"/></span>
									<span v-show="loginimg2"><img src="https://img.ifuturex.com/image/user/male.png"/></span>
									<p v-show="loginimg1">{{message.nickName}}</p>
									<p v-show="loginimg2">尚未登陆</p>
								</div>
								<p class="invition_top">邀请码：{{message.invitedCode}}</p>
								<p class="pic_top">您已成功邀请 {{message.invitedCount}}人</p>
								<router-link tag="p" class="pic_button" to="/personal/invite">
									<img src="../../../assets/img/invitation/invi_now.png"/>
								</router-link><br />
							</div>
						</div>
					</div>
					<div class="reward_main_right">
						<div class="reward_right">
							<p>
								<img src="../../../assets/img/invitation/firted_logo.png"/>邀请10人获得20元手机话费
								<a>已有{{num.ten}}人完成</a>
							</p>
							<p><img src="../../../assets/img/invitation/firted_logo.png"/>邀请20人获得30元手机话费
								<a>已有{{num.twenty}}人完成</a>
							</p>
							<p><img src="../../../assets/img/invitation/firted_logo.png"/>邀请50人获得50元京东E卡
								<a>已有{{num.fifty}}人完成</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="activity_reward_pacty">
		</div>
		<div class="activity_reward_footer">
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				message:'',
				kentoken: '',
				loginimg1:false,//登陆后的头像
				loginimg2:true,//登陆前的头像
				num:''
			}
		},
		created() {
			setTimeout(this.Attention(),10);
		},
		methods: {
			Attention() {
//				var kentoken = this.token;
//		        if(this.loginToken){
//		          kentoken=this.loginToken
//		        }
		        
				this.$CPOST('/activity/v1/invitation/invitation', {
					
					},(res) => {
						this.num = res.resultValue;
						this.message = res.resultValue.userInvitationInfo;
						if(res.resultCode==200){
				        	this.loginimg1 = true;
				        	this.loginimg2 = false;
				        }else{
				        	this.loginimg1 = false;
				        	this.loginimg2 = true;
				        }
					})
			}
		}
	}
</script>
<style scoped>
		* {
				padding: 0;
				margin: 0;
				list-style: none;
			}
			.hide{
				display: none;
			}
			.Pull_up {
				min-width: 1220px;
				max-width: 1920px;
			}
			
			.Pull_the_new {
				height: 544px;
				background: url(../../../../src/components/pcActivity/invitation/img/img_01.jpg) no-repeat center top;
			}
			
			.Pull_the_new img {
				width: 100%;
				height: 100%;
			}
			
			.activity_reward {
			   height: 586px;
			   background: url(../../../../src/components/pcActivity/invitation/img/img_02.jpg) no-repeat center top;
			}
			.activity_reward_body {
				margin: 0 auto;
				width: 1200px;
				height: 614px;
			}
			
			.activity_reward_main {
				height: 545px;
				background: #fff1d7;
			}
			
			.reward_main {
				width: 1200px;
				height: 553px;
				margin: 0 auto;
				overflow: hidden;
			}
			
			.reward_main_bg {
				width: 1133px;
				height: 514px;
				margin: 0 auto;
				margin-top: 12px;
				background: url(../../../../src/components/pcActivity/invitation/img/img_04.jpg) no-repeat center top;
				background-size: 100% 100%;
			}
			
			.reward_main_left {
				float: left;
				width: 414px;
				height: 514px;
			}
			
			.reward_main_left_title {
				margin-top: 104px;
				text-align: center;
			}
			
			.title_pic {
				min-height: 238px;
				margin: 0 auto;
			}
			
			.title_pic_hand {
				width: 160px;
				height: 203px;
				margin: 0 auto;
				background: url(../../../assets/img/invitation/pic_title.png) no-repeat;
				filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='../../../assets/img/invitation/pic_title.png', sizingMethod='scale');
				background-size: 100% 100%;
				overflow: hidden;
			}
			
			.title_pic_hand span {
				width: 98px;
				height: 98px;
				border-radius: 10px;
				-webkit-border-radius: 10px;
				-moz-border-radius: 10px;
				display: block;
				margin: 0 auto;
				margin-top: 36px;
			}
			
			.title_pic_hand span img {
				width: 98px;
				height: 98px;
				border-radius: 10px;
				-webkit-border-radius: 10px;
				-moz-border-radius: 10px;
			}
			
			.title_pic_hand p {
				width: 82%;
				text-align: center;
				line-height: 24px;
				font-size:16px;
				color: #ea7300;
				margin: 0 auto;
				margin-top: 10px;
			}
			.invition_top{
				width: 66%;
				line-height: 28px;
				color: #ffffff;
				font-size: 22px;
				text-align: center;
				margin: 0 auto;
				margin-top: 10px;
			}
			.pic_top {
				width: 66%;
				line-height: 28px;
				color: #ffffff;
				font-size: 22px;
				text-align: center;
				margin: 0 auto;
				margin-top: 10px;
			}
			
			.pic_button {
				margin-top: 20px;
			}
			
			.pic_button img {
				cursor: pointer;
			}
			
			.reward_main_right {
				float: left;
				width: 642px;
				height: 514px;
			}
			
			.reward_right {
				width: 644px;
				margin-top: 135px;
			}
			
			.reward_right p {
				line-height: 46px;
				color: #ffffff;
				font-size: 24px;
				margin-bottom: 20px;
			}
			
			.reward_right p img {
				margin-right: 12px;
				vertical-align: middle;
			}
			
			.reward_right p a {
				margin-left: 84px;
			}
			
			.activity_reward_pacty {
				height: 1323px;
				background: url(../../../../src/components/pcActivity/invitation/img/img_05_04.jpg) no-repeat center top;
			}
			
			.reward_pacty {
				width: 1200px;
				margin: 0 auto;
			}
			
			.activity_reward_footer {
				/*padding-bottom: 87px;*/
				height: 1106px;
				background: url(../../../../src/components/pcActivity/invitation/img/img_06_04.jpg) no-repeat center top;
			}
			
			.reward_footer {
				width: 1200px;
				margin: 0 auto;
			}
			
			.pic_button_span{
				width: 190px;
			    height: 38px;
			    line-height: 38px;
			    border-radius: 4px;
			    color: white;
			    margin: 0 auto;
			    font-size: 21px;
			    background: #ca152b;
			}
</style>

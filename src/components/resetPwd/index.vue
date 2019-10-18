<template>
    
	<div class="nano-register">
		<div>
			<div class="pwd-modal-main">
			<div class="login-modal-main-bb">
			</div>
			<div class="login-modal-main-head">
				<p class="login-modal-head-p">重置密码</p>
				<p class="login-modal-head-p1">通过短信方式验证，更换新密码</p>
				<!--<p class="login-modal-head-p2"><a>马上登录</a></p>-->
			</div>
			<div class="login-modal-main-box">
				<div class="pwd-modal-main-body ">
					<form id="password_form" autocomplete="off">
						<div class="pwd-modal-body-input">
							<div class="change-p1 select-list-limit ">
								<span class="register-country-chongzhi">
									<!-- <input class="register-country-input" type="text" value="中国大陆 +86" readonly/> -->
									<ul class="register-select-list password-country">
										<li v-for='i in 10'>1246</li>
									</ul>
								</span>
								<input maxlength="11" type="text" class="change-input1" placeholder="请输入手机号" v-model='phoneText'/>
								<span class="change-ti"></span>
							</div>
							<div>
								<div class="register_main_state register_input5">
									<input v-model="imgCode" class="change-input6" type="text" placeholder="请输入验证码"/>
									<img :src="imgCodeUrl" @click="refreshshCode" class="picYzm" title="点击刷新">
									<span class="change-ti"></span>
								</div>
							</div>
							<div>
								<input maxlength="6" type="text" class="change-input2" placeholder="请输入手机验证码"  v-model='yzmText'/>
								<span class="change-ti"></span>
								<i class="shield-write"></i>
								<span class="change-send-code" @click='disabled && sendPwd()'>发送验证码</span><!--register_zhihui  点击之后-->
							</div>
							<div>
								<input type="password" class="change-input3" placeholder="请输入密码" v-model='pwdText'/>
								<span class="change-ti"></span>
								<i class="shield-write"></i>
							</div>
							<div>
								<input type="password" class="change-input4" placeholder="请输入密码" v-model='pwddText' />
								<span class="change-ti"></span>
								<i class="shield-write"></i>
							</div>
						</div>        				
						<div class="change-pwd-btn">
							<a href="javascript:;" @click='commitPwd'>提交</a>
							<div class="kefu_phone">客服热线：400-691-9939</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		</div>
		<div class="confirm_modal confirm_modall" style="display: none;">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='close'><img src="../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p>{{alertText}}</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='close'>确定</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default{
		data(){
			return{
				phoneText:null,
				token:null,
				yzmText:null,
				pwdText:null,
				pwddText:null,
				alertText:null,
				disabled:true,
				imgCodeUrl:null,
				imgCodeId:null,
				imgCode:null
			}
		},
		created(){
			this.$Bury(window.location.href,'',0,'zhaohuimimaye_03004');
			this.refreshshCode()
		},
		methods: {
			refreshshCode(){
				this.$CGET('/message/authImage',{},(res)=>{
					if(res.resultCode == 200){
						this.imgCodeUrl = res.resultValue.img;
						this.imgCodeId = res.resultValue.id;
					}
				})
			},
			close(){
				if(this.alertText=='修改成功'){
					this.$router.push({path:'/'})
				}
				$('.confirm_modall').hide();
				console.log(this.alertText)
				
			},
			hideResetPwd () {
				this.$emit('hideResetPwd');
			},
			sendPwd(){

				if(this.phoneText==null){
					this.alertText='请输入手机号';
					$('.confirm_modall').show();
				}else if(this.imgCode == null){
					this.alertText='请输入验证码';
					$('.confirm_modall').show();
				}else{
					this.$CPOST('/message/communication/v2/sendSMS'+this.$signParam(),{
						"countryCode": "86",
						"mobile": this.phoneText,
						"type": "1",
						'uuId':this.imgCodeId,
			            'verifyCode':this.imgCode
					},(res)=>{
						if(res.resultCode==200){
							let seconds = 60;
		                    let timer = setInterval(()=>{
		                    	this.disabled=false;
		                    	document.querySelector('.change-send-code').innerHTML =seconds+'秒后重新发送';
		                        seconds--;
		                        if(seconds==0){
		                        	this.disabled=true;
		                            document.querySelector('.change-send-code').innerHTML = `重新发送`;
		                            clearTimeout(timer);
		                        }
		                    },1000)
		                    this.alertText='验证码发送成功'
							$('.confirm_modall').show()
						}else{
							this.alertText=res.resultMessages;
							$('.confirm_modall').show()
						}
						
					})
				}	
			},
			commitPwd(){
				this.$CPOST('/account/v1/userThirdRegister/userCerificationCode',{
						mobile : this.phoneText,
						verificationCode: this.yzmText
					},(res)=>{
						if(res.resultCode==200){
							if(this.phoneText==null){
								this.alertText='请输入手机号'
								$('.confirm_modall').show();
								return false;
							}
							if(this.yzmText==null){
								this.alertText='请输入验证码'
								$('.confirm_modall').show();
								return false;
							}
							if(this.pwdText==null){
								this.alertText='请输入新密码'
								$('.confirm_modall').show();
								return false;
							}
							if(this.pwdText.length<6){
								this.alertText='新密码不能小于6位'
								$('.confirm_modall').show();
								return false;
							}
							if(this.pwddText==null){
								this.alertText='请再次输入密码'
								$('.confirm_modall').show();
								return false;
							}
							if(this.pwdText!=this.pwddText){
								this.alertText='两次密码输入不一致'
								$('.confirm_modall').show();
								return false;
							}
								this.$CPOST('/account/v1/userInfo/retrievePassWord',{
									mobile:this.phoneText,
									newPassWord :this.pwddText,
									repeatPassWord:this.pwddText
								},(res)=>{
									if(res.resultCode==200){
										this.alertText='修改成功'
										$('.confirm_modall').show()
									}else{
										this.alertText=res.resultMessages
										$('.confirm_modall').show()
									}
								})
							
						}else{
							this.alertText=res.resultMessages
							$('.confirm_modall').show()

							
						}
						// }
					
				})
				
			}
		}
    }
</script>

<style scoped>
.hide{
	display: none;
}
/********重置密码******/
.pwd-modal{
	width: 100%;
	height: 100%;
	background: url(../../assets/img/login/zhezhao.png) no-repeat;
	background-size: 100% 100%;
	background: none\9;
	position: fixed;
	left: 0;
	top: 0;
	z-index:6;
}
.nano-register{
	width: 100%;
	height: 100%;
	display: table;
}
.nano-register>div{
	display: table-cell;
	vertical-align: middle;
}
:root .login-modal,:root .register-modal,:root .pwd-modal,:root .binding-modal{
	filter: none;
}
.pwd-modal-main{
	width: 452px;
	height: 600px;
	background: #fff;
	margin: auto;
	-moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
}
.login-modal-main-bb{
	width: 100%;
	height: 50px; 
}
.login-modal-main-bb>p{
	float: right;
	height: 50px;
	line-height: 64px;
}
.login-modal-main-bb>p>img{
    cursor: pointer;
}
.login-modal-main-head{
	width: 410px;
	height: 30px;
	margin: auto;
	line-height: 30px;
	border-bottom: 1px solid #a1afc9;
}
.pasade{
	float:right !important;
	margin-right: 10px;
}
.login-modal-head-p{
	font-size: 20px;
    color: #343434;
    float: left;
    margin-left:10px;
    line-height: 24px;
    font-family: "微软雅黑";
}
.login-modal-head-p1{
	font-size: 14px;
	color: #aaaaaa;
	float: left;
	margin-left:10px; 
}
.login-modal-head-p1>a{
	color: #c60c1b;
}
.login-modal-head-p1>a:hover{
	color: #fa4c4c;
}
.login-modal-head-p2{
	font-size: 14px;
	color: #c60c1b;
	float: right;
	margin-right: 10px;
}
.login-modal-main-box{
	width: 382px;
	margin: auto;
	position: relative;
}
.pwd-modal-main-body{
	width: 100%;
	height: 410px;
	margin-top: 20px;
}
.pwd-modal-body-input{
	width: 100%;/*
	height: 325px;*/
	
}
.pwd-modal-body-input>div{
	position: relative;
}
.password-country{
    top: 37px;
    left: -5px;
}
.change-pwd-btn{
	width: 100%;
	height: 46px;
}
.change-pwd-btn>a{
	display: block;
	width: 100%;
	height: 100%;
	background: #c60c1b;
	line-height: 46px;
	text-align: center;
	color: #fff;
	font-size: 18px;
	-moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
}
.change-pwd-btn>a:hover{
	background: #fa4c4c;
}
.change-ti{
	width: 360px;
	height: 24px;
	display: block;
	padding-left: 10px;
	font-size: 12px;
	color: #E14536;
	line-height: 24px;
}
.change-input1,.change-input2,.change-input3,.change-input4,.change-input6{
	width: 330px;
	height: 20px;
	line-height: 20px;
	border: 0;
	border-bottom: 1px solid #e0e0e0;
	font-size: 14px;
	padding: 17px 0 17px 38px;
	outline: none;
}
.change-input6{
	background: url(../../assets/img/register/register_icon5.png) no-repeat left;
	background-position-x: 10px;
}
.change-input1{
	background: url(../../assets/img/register/register_icon2.png) no-repeat left;
	background-position-x: 10px;
}
.change-input2{
	background: url(../../assets/img/register/register_icon3.png) no-repeat left;
	background-position-x: 10px;
}
.change-input3{
	background: url(../../assets/img/register/register_icon4.png) no-repeat left;
	background-position-x: 10px;
}
.change-input4{
	background: url(../../assets/img/register/register_icon4.png) no-repeat left;
	background-position-x: 10px;
}
.change-send-code{
	min-width: 98px;
	height: 28px;
    background: #c60c1b;
	color: #fff;
	font-size: 14px;
	padding: 0 5px;
	position: absolute;
	right:15px;
	top: 12px;
	line-height: 28px;
	text-align: center;
	-moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    cursor: pointer;
}
.change-p1{
	position: relative;
}
.register-country-chongzhi{
	position: absolute;
    top: 17px;
    left: 37px;
    font-size:14px;
    color:#20242f;
    cursor: pointer;
}
.register-country-chongzhi>img{
	vertical-align: middle;
	margin-left:4px;
}
.register-country-input{
	height:24px;
	line-height:24px;
	width: 110px;
	border: none;
	font-size:14px;
	color:#20242f;
    cursor: pointer;
    background: url(../../assets/img/register/xialajiantou.png) no-repeat right;
}
.change-input1{
    width: 330px;
    height: 20px;
    line-height: 20px;
    border: 0;
    border-bottom: 1px solid #e0e0e0;
    font-size: 14px;
    padding: 17px 0px 17px 39px;
    outline: none;
}
.select-list-limit{
    position: relative;
}
.register-select-list{
	width: 200px;
	height: 206px;
	border: 1px solid #e0e0e0;
	background: #fff;
	position: absolute;
	top: 44px;
	left: 0;
	z-index: 1;
	overflow: auto !important;
    display: none;
}
.register-select-list>li{
	height: 39px;
	padding-left: 9px;
	color: #20242f;
	font-size:12px;
	cursor: pointer;
}
.register-select-list>li>p{
	font-size:　14px;
	line-height: 39px;
}
.register-select-list-p1{
	float: left;
}
.register-select-list-p2{
	float: right;
}
.kefu_phone{
	line-height:55px;
	color:#676c75;
	font-size:14px;
	text-align:center;
	font-family: "微软雅黑";
}
.tanke{
	display: none;
	position: fixed;
	width: 100%;height: 100%;
	background: url(../../assets/img/login/zhezhao.png) no-repeat;
	background-size: 100% 100%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	/*opacity: 0.3;*/
}
.tank_lin{
	width: 100%;
	height: 100%;
	display: table;
}
.tank_lin_center{
	display: table-cell;
    vertical-align: middle;
}
.tank_lin_center_table{
	width: 500px;
	height: 200px;
	background: white;
	margin: 0 auto;
}
.center_table{
	width: 100%;
	height: 40px;
	display: inline-block;
}
.tank_lin_center_table .center_table span{
	font-size: 14px;
	color: #444444;
	width: 50px;
	line-height: 40px;
	float: left;
	text-align: center;
    display: block;
}
.tank_lin_center_table .center_table a{
	float: right;
    width: 74px;
    line-height: 40px;
    cursor: pointer;
}
.tank_lin_center_table p{
	line-height: 30px;
	text-align: center;
	font-size: 16px;
	color: #444444;
	margin-top: 50px;
}
.confirm_modal{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;
	background-size: 100%;
	z-index: 99999;
}
.confirm_box{
	width: 435px;
	height: 196px;
	background: #e6e6e6;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
}

.confirm_main,.confirm_main_or{
	width: 423px;
	height: 184px;
	background: #fff;
	border: 1px solid #c9c9c9;
	margin: auto;
	margin-top: 5px;
}
.confirm_main_head{
	width: 100%;
	height: 32px;
}
.confirm_main_head>p{
	float: left;
	line-height: 32px;
	color: #323232;
	font-size: 14px;
	padding-left: 13px;
}
.confirm_main_head>span{
	display: block;
	float: right;
	cursor: pointer;
}
.confirm_text-p1{
	text-align: center;
	font-size: 18px;
}
.confirm_text{
	width: 340px;
	height: 85px;
	line-height: 43px;
	text-align: center;
	margin: auto;
}
.confirm_text_box{
	display: inline-block;
	vertical-align: middle;
}
.confirm_btn{
	width: 100%;
	height: 32px;
	text-align: center;
	color: #323232;
	font-size: 14px;
}
.confirm_btn>button{
	width: 98px;
	height: 32px;
	background: url(../../assets/img/eventGroup/event-btn.png) no-repeat center;
	border: 0;
	outline: none;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}
.picYzm{
    height: 30px;
    width: 130px;
    vertical-align: middle;
    cursor: pointer;
    right: 15px;
    position: absolute;
    top: 10px;
}
</style>
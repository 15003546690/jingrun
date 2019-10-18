<template>
    <div class="main"  @click='ishide'>
		<div class="register">
			<div class="register_head">
				<h2>欢迎加入未来无限网</h2>
				<span>已有账号？ <a href="javascript:;" @click="gotoLogin">去登录</a></span>
			</div>
			<form id="register_form" autocomplete="off">
				<div class="register_main">
					<div class="register_item displayFlex flexMidle">
						<div class="item_txt">
							手机号
						</div>
						<div class="item_desc">
							<div class="country_box">
								<h3 @click="closeList($event)">+{{countryCode}}</h3>
								<ul class="register-select-list register_phone" v-if="isCountry">
									<li v-for="item in countries" :key="item.code" @click="chooseCountry(item.name, item.code)">
										<p class="register-select-list-p1">{{item.name}}</p>

										<p class="register-select-list-p2">+{{item.code}}</p>
									</li>
								</ul>
							</div>
							<input type="text" v-model="mobile" placeholder="请输入手机号" maxlength="11" class="wtel" v-on:blur="inputBlur('tel')">
							<div class="err_tip">
								{{errTip.tel}}
							</div>
						</div>
					</div>
					<div class="register_item displayFlex flexMidle">
						<div class="item_txt">
							验证码
						</div>
						<div class="item_desc displayFlex">
							<input type="text" v-model="imgCode" placeholder="请输入图形验证码" class="wban" v-on:blur="inputBlur('numCode')">
							<div class="numCode"><img :src="imgCodeUrl" alt=""></div>
							<div class="err_tip">{{errTip.numCode}}</div>
							<a href="javascript:;" @click="refreshshCode" class="numRefresh">换一张</a>
						</div>
					</div>
					<div class="register_item displayFlex flexMidle">
						<div class="item_txt">
							手机验证码
						</div>
						<div class="item_desc displayFlex flexMidle">
							<input type="text" v-model="code" placeholder="请输入手机验证码" class="wban" v-on:blur="inputBlur('telCode')">
							<div class="err_tip">{{errTip.telCode}}</div>
							<button type="button" class="telCodeBtn" @click="getCode">{{btnSetCodeHtml}}</button>
						</div>
					</div>
					<div class="register_item displayFlex flexMidle">
						<div class="item_txt">
							设置密码
						</div>
						<div class="item_desc">
							<input type="password" v-model="password" placeholder="6~18位字符  建议字母数字组合密码" class="wall" v-on:blur="inputBlur('pwd')">
							<div class="err_tip">{{errTip.passWd}}</div>
						</div>
					</div>
					<div class="register_item displayFlex flexMidle">
						<div class="item_txt"></div>
						<div class="item_desc">
							<label class="displayFlex flexMidle"><input v-model="isAgree" type="checkbox" checked="true"/>我已阅读并同意<a href="#/others/agreement" target="_balnk">《未来无限网服务协议》</a></label>
						</div>
					</div>
					<div class="register_item displayFlex flexMidle">
						<div class="item_txt"></div>
						<div class="item_desc register-btn">
							<button type="button" @click="register">立即注册</button>
						</div>
					</div>

				</div>
			</form>
			<!-- <loginn v-if='isShowLogin' @hideLoginModal='hideLoginModal'/> -->
			<alert v-if='alert' :text='alertText' @yes="showLogin"></alert>
		</div>
		</div>
</template>

<script>
import countries from './coutry'
import loginn from '../common/login'
import alert from '../common/alert'
export default {
	components:{
		loginn,
		alert
	},
    data () {
        return {
            countries,
            isShowCountry: !1,
            countryName: '中国',
            countryCode: '86',
            mobile: '',
            code: '',
            password: '',
            repassword: '',
            inviteBy: this.$route.query.code || '',
            isAgree: !0,
			btnSetCodeHtml:'获取验证码',
			isShowLogin:false,
			alert:false,
			alertText:'',
			isCountry: false,
			isSuccess: 0,
			imgCodeUrl:'',//图形验证码图片
			imgCode:'',//图形验证码内容
			imgCodeId:'',
			errTip:{
				tel:'',
				numCode:'',
				telCode:'',
				passWd:''
			}
        }
    },
    created(){
    	this.$Bury(window.location.href,'undefined',0,'zhuceye_02005');
    	this.refreshshCode();
    	console.log(this.inviteBy)
    },
    methods: {
    	//未来无限网注册协议
		read(){
			this.$router.push({path:'/others/agreement'})
		},
		gotoLogin(){
			this.$setCookie('loginFrom','register')
			this.$router.push({path:'/login'})
		},
		closeList(event){
			event.cancelBubble = true;
			this.isCountry = true;
		},
		ishide(){
			this.isCountry = false
		},
		refreshshCode(){
			this.$CGET('/message/authImage',{},(res)=>{
				if(res.resultCode == 200){
					this.imgCodeUrl = res.resultValue.img;
					this.imgCodeId = res.resultValue.id;
				}
			})
		},
		// 用户注册验证码校验
        getCode () {
        	var myreg=/^1[3,4,5,8][0-9]{9}$/;
        	if (!this.mobile) {
        		this.errTip.tel = '请输入手机号'
        		// this.alertDailog('请输入手机号');
                return false
            }
            if(parseInt(this.countryCode) == 86 && !myreg.test(this.mobile)){
            	this.errTip.tel = '请输入正确的手机号码'
            	// this.alertDailog('请输入正确的手机号码');
				return false
			}
			if(this.imgCode == ''){
				this.errTip.numCode = '请输入验证码'
				// this.alertDailog('请输入验证码');
                return false
			}
				this.$CPOST('/account/v1/userInfo/queryUserByMobile',{
		                mobile:this.mobile
		            },(res)=>{
	        		if(res.resultValue.isUser==true){
	        			this.errTip.tel = '手机号已注册'
	        			// this.alertDailog('手机号已注册');
	        			return false;
	        		}else{
	        			this.$CPOST('/message/communication/v2/sendSMS',{
			                countryCode: this.countryCode,
			                mobile: this.mobile,
			                type: '0',
			                uuId:this.imgCodeId,
			                verifyCode:this.imgCode
			            },(res) => {
			                if(res.resultCode == 200){
			                    let seconds = 60;
			                    let timer = setInterval(()=>{
			                    	document.querySelector('.telCodeBtn').disabled=true
			                    	this.btnSetCodeHtml =seconds+'秒倒计时';
			                        seconds--;
			                        if(seconds==0){
			                            this.btnSetCodeHtml = `重新发送`;
			                            clearTimeout(timer);
			                            document.querySelector('.telCodeBtn').disabled=false
			                        }
			                    },1000)
			                }else{
			                	this.alertDailog(res.resultMessages);
	        					return false;
			                }
			            })
	        		}
	        	})
        },
        register () {
        	
            if (!this.mobile) {
            	this.errTip.tel = '请输入手机号';
            	// this.alertDailog('请输入手机号');
                return
            }
            var myreg=/^1[3,4,5,8][0-9]{9}$/;
			if(parseInt(this.countryCode) == 86 && !myreg.test(this.mobile)){
				this.errTip.tel = '请输入正确的手机号码';
				return false;
				// this.alertDailog('请输入正确的手机号码');
			}
			this.errTip.tel ='';
            if (!this.code) {
            	this.errTip.numCode = '请输入验证码';
            	// this.alertDailog('请输入验证码');
                return
            }
            this.errTip.numCode = '';
            if (!this.code) {
            	this.errTip.numCode = '请输入验证码';
            	// this.alertDailog('请输入验证码');
                return
            }
            this.errTip.telCode = '';
            if (!this.password) {
            	this.errTip.passWd = '请输入密码';
				// this.alertDailog('请输入密码');
                return
            }
            if (this.password.length<6) {
            	this.errTip.passWd = '请输入至少6位密码';
                return
            }
            if (this.password.length>20) {
            	this.errTip.passWd = '密码长度不能超过20位';
                return
            }
            this.errTip.passWd = '';
            // if (!this.repassword) {
            // 	this.alertDailog('请再次输入密码');
            //     return
            // }
            // if (this.password !== this.repassword) {
            // 	this.alertDailog('两次密码输入不一致');
            //     return
            // }
            if (!this.isAgree) {
            	this.alertDailog('请阅读《未来无限网服务协议》');
                return
            }else{
            	if(this.$postFlag){
            		this.$postFlag = false;
	            	this.$CPOST('/account/v1/userLogin/aregisterUserInfo',{
	            		userFrom:'1',
		                clientFrom: 'PC',
		                countryCode: this.countryCode,
		                mobile: this.mobile,
		                code: this.code,
		                password: this.password,
		                inviteBy: this.inviteBy,
		                isAgree: 0
		            },(res) => {
		            	this.$postFlag = true;
						if(res.resultCode!=200){
							this.alertDailog(res.resultMessages);
						}else{
							this.alertDailog('注册成功');
							this.isSuccess = 'login';
						}
		           },() => {
		           		this.alertDailog('网络错误，请重试！');
		           		this.$postFlag = true;
		           })
            	}
            }
        },
        inputBlur(type){
        	switch(type){
        		case 'tel':
	        		if (!this.mobile) {
		            	this.errTip.tel = '请输入手机号';
		                return false;
		            }
		            var myreg=/^1[3,4,5,8][0-9]{9}$/;
		            console.log(this.countryCode)
					if(parseInt(this.countryCode) == 86 && !myreg.test(this.mobile)){
						this.errTip.tel = '请输入正确的手机号码';
						return false;
					}
					this.errTip.tel ='';
        		break;
        		case 'numCode':
	        		if (!this.imgCode) {
		            	this.errTip.numCode = '请输入图形验证码';
		                return
		            }
		            this.errTip.numCode = '';
	            break;
	            case 'telCode':
		            if (!this.code) {
	            	this.errTip.telCode = '请输入手机验证码';
		                return
		            }
		            this.errTip.telCode = '';
	            break;
	            case 'pwd':
		            if (!this.password) {
		            	this.errTip.passWd = '请输入密码';
		                return
		            }
		            if (this.password.length<6) {
		            	this.errTip.passWd = '请输入至少6位密码';
		                return
		            }
		            if (this.password.length>20) {
		            	this.errTip.passWd = '密码长度不能超过20位';
		                return
		            }
		            this.errTip.passWd = '';
	            break;

        	}
        },
        login () {
			this.$axios.post('/uaa/oauth/token', this.$qs.stringify({
				client_id: this.$client_id,
				client_secret: this.$client_secret,
				grant_type: 'password',
				username: this.mobile,
				password: this.password
			}))
			.then(res => {
				if(res.data.resultCode==1020){
					$('.confirm_modal').show()
					this.alertText=res.data.resultMessages
				}else if(res.data.resultCode==1021){
					$('.confirm_modal').show()
					this.alertText=res.data.resultMessages
				}else{
					const data = res.data
					let login_token = res.data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+res.data.access_token;
					this.$store.commit('setToken', decodeURIComponent(login_token));
					this.$store.commit('setRefreshToken', res.data.refresh_token);
					this.$delCookie('token');
					this.$setCookie('token',login_token,res.data.expires_in);
					this.$setCookie('refreshToken',res.data.refresh_token,res.data.expires_in);
					this.username = ''
					this.password = ''
					this.$router.push({path:'/'})
					this.$CPOST('/account/v1/userInfo/queryUserInfoForUpdate',{
				        },(res) =>{
				        let user = {
							userImg: res.resultValue.img,
							userNickName: res.resultValue.nickName,
							userGrade: res.resultValue.grade
						}
						let obj1 = JSON.stringify(user)
						this.userImg = res.resultValue.img
						this.userNickName=res.resultValue.nickName
						this.userGrade=res.resultValue.grade
						window.localStorage.setItem('user',obj1);
						this.$store.commit('setUserImg',this.userImg);
						this.$store.commit('setUserNickName',this.userNickName);
						this.$store.commit('setUserGrade',this.userGrade);
						this.hideLoginModal();
						this.resetPwd();
						this.$router.go(-1);
				    })
				}
			})
	    },
        showCountry () {
            this.isShowCountry = !0
        },
        hideCountry () {
            this.isShowCountry = !1
        },
        chooseCountry (countryName, countryCode) {
            this.countryName = countryName;
            this.countryCode = countryCode;
            this.hideCountry();
        },
        showLoginModal () {
            this.isShowLogin=true;
        },
		hideLoginModal () {
            this.isShowLogin=false;
      	},
      	showLogin() {
      		if(this.isSuccess == 'login'){
      			this.login();
      		}
      	},
      	alertDailog(txt){
			this.alert = true;
			$('.confirm_modal').show();
			this.alertText=txt;
		},
    }
}
</script>
<style scoped>
.register{width: 1000px;margin: auto;}
.register_head{border-bottom: solid 1px #d1d1d1; position: relative; padding-bottom: 8px; padding-top: 70px; margin-bottom: 55px;}
.register_head>h2{font-size: 24px; font-weight: bold; color: #343434;}
.register_head>span{display: inline-block; position: absolute; right: 0; bottom: 8px;}
.register_head>span>a{color: #c60c1b;}
.register_main{width: 400px; margin:0 auto; margin-bottom: 100px;}
.register_item{margin-bottom: 30px;}
.register_item>.item_txt{width: 80px; text-align: right; font-size: 14px; color: #343434; margin-right: 8px;}
.register_item>.item_desc{flex: 1; position: relative;}
.register_item>.item_desc>input{border:solid 1px #d1d1d1; height: 38px; line-height: 38px; padding-left: 10px; border-radius: 2px;}
.register_item>.item_desc>input:focus{border-color:#8b8b8b; color: #323232;}
.register_item>.item_desc>input.wall{width: 300px;}
.register_item>.item_desc>input.wtel{width: 240px; padding-left: 70px;}
.register_item>.item_desc>input.wban{width: 178px; margin-right: 10px;}
.register_item>.item_desc .numCode{width: 110px; height: 38px; border:solid 1px #d1d1d1; border-radius: 2px; overflow: hidden;}
.numCode img{width:100%; height: 38px;}
.numRefresh{display: inline-block; position: absolute; right: -74px; color: #c60c1b; background: url(../../assets/img/register/icon_sx.png) no-repeat right center; padding-right: 18px; line-height: 38px;}
.register_item>.item_desc .telCodeBtn{width: 110px; height: 38px; border-radius: 2px; text-align: center; background: #c60c1b; font-size: 14px; color: #fff; border-width:0;cursor: pointer;}
.numCode img{width:100%; height: 38px;}

.register_item>.item_desc label>input{margin-right: 5px;}
.register_item>.item_desc label>a{color: #2c5cb4;}
.register_item>.item_desc .err_tip{position: absolute; color: #c60c1b; font-size: 12px; left: 0; bottom:-20px;}

.country_box{width: 62px; position: absolute; left: 0; top: 4px; height: 30px; border-right:solid 1px #d1d1d1; text-align: center;}
.country_box h3{text-align: center; color: #343434; line-height: 30px; font-weight: normal; vertical-align: middle; cursor: pointer;}
.country_box h3:after{display: inline-block; content: '';width: 0;height: 0;border: 5px solid transparent;border-top: 5px solid #323232; margin-left: 3px;vertical-align: middle; margin-top: 3px;}


.register-btn{width: 100%;}
.register-btn>button{border: none;width: 100%;height: 44px;background: #c60c1b;line-height: 44px;text-align: center;color: #fff;font-size: 16px;-moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px;cursor: pointer;}
.register-text{width: 100%;height: 24px;line-height: 24px;text-align: center;margin-top: 12px;margin-bottom: 12px;font-size: 16px;color: #898989;}
.register-text>a{color: #c60c1b;margin-left: 5px;}
.register-select-list{width: 300px;height: 206px;border: 1px solid #e0e0e0;background: #fff;position: absolute;top: 35px;left: 0;z-index: 1;overflow: auto !important;}
.register-select-list>li{height: 38px;padding:0 9px;color: #20242f;font-size:12px;cursor: pointer;}
.register-select-list>li:hover{background: #e7e3e3;}
.register-select-list>li>p{font-size:　14px;line-height: 38px;}
.register-select-list-p1{float: left;}
.register-select-list-p2{float: right;}
.picYzm{height: 30px; width: 130px; vertical-align: middle; cursor: pointer;}
.wphoneH{display:none;}
</style>

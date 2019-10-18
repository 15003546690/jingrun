<template>
  <div class="login-modal" >
    <div class="nano-register" id="loginDialog">
      <div v-if="showLoginModel">
        <div  class="login-modal-main" >
          <div class="login-modal-main-bb" >
            <p><img class="close" src="../../assets/img/login/close1.png" @click="hideLoginModal" /></p>
          </div>
          <div class="login-modal-main-head">
            <p class="login-modal-head-p">用户登录</p>
            <p class="login-modal-head-p1 pasade">还没有账号？<a href="#/register"   @click="toRegister">立即注册</a></p>
          </div>
          <div class="login-modal-main-box">
            <div class="login-modal-main-body">
              <form id="login_form" autocomplete="off">
                <input type="hidden" id="r_url" name="r_url"/>
                <div class="login-modal-body-input">
                    <div class="login-modal-body-parent">
                      <p>
                        <span class="login-modal-body-leftimg"><img src="../../assets/img/register/register_icon2.png"/></span><!-- 
                          --><input type="text"  class="login-input1" maxlength="11" placeholder="请输入手机号" v-model="username" />
                          <span class="login-ti"></span>
                          <i class="shield-write"></i>
                      </p>
											
                    </div>
                    <div class="login-modal-body-parent">
                      <p>
                        <span class="login-modal-body-leftimg"><img src="../../assets/img/register/register_icon4.png"/></span>
						<input type="password" class="login-input2" placeholder="请输入密码" v-model="password" />
                          <span class="login-ti"></span>
                          <i class="shield-write"></i>
                    </p>
                    </div>
              <!--       <div class="login-modal-body-parent hide">
                      <p class="activityD-text2">
                          <input name="verification" type="hidden" value=""/>
                          <input name="loginCode" type="text" maxlength="4"/>
                          <span><img id="loginCode" title="点击刷新" src="${ctx }/vs1/signin/getLoginVerifyCode"/></span>
                        </p>
                      </div> -->
                  </div>
                  <div class="login-modal-body-ji">
                    <p class="login-modal-body-r"><a href="javascript:;" @click="showResetPwd">找回密码</a></p>
                  </div>
                  <div class="login-btn">
<!--                    <button >立即登录</button>-->
                    <input type="button" value="立即登录" @click="login" @keyup.enter="login"/>
                  </div>
                    <!--<p class="login-share-head">第三方账号登录</p>
                    <div class="third-landed-button">
                        <p id="wblogin" class="third-landed-button1" @click='wblogin()'><img src="../../assets/img/login/weibo-login.png"/>微博账号登录</p>
                        <p id="wxlogin" class="third-landed-button2" @click='wxlogin()'><img src="../../assets/img/login/weixin-login.png"/>微信账号登录</p>
                    </div>-->
              </form>
            </div>
          </div>
          <headd class='hide'></headd>
          <div class="kefu_phone">客服热线：400-691-9939</div>
        </div>
      </div>
    </div>
	<resetPwd v-if="isResetPwd" @hideResetPwd="hideResetPwd" ></resetPwd>
		<Aalert :text='alertText' v-show='alert'></Aalert>
  </div>
</template>

<script>
import resetPwd from './resetPwd'
import headd from './HeaderNormal'
import Aalert from '../common/alert'
export default {
	components: {
		resetPwd,
		headd,
		Aalert
	},
  data () {
    return {
			isResetPwd: false,
      username: '',
      password: '',
			showLoginModel:true,
			commonShare:'https://www.ifuturex.com',
//			commonShare:'index.html',
			userImg:null,
			userNickName:null,
			userGrade:null,
			alert:false,
			alertText:null,
			user:{},
			refreshToken:''

    }
  },
  created(){
  	var lett=this;
		document.onkeydown=function(e){
			var key=window.event.keyCode;
			if(key==13){
				lett.login();
			}
		}
  },
  methods: {
	  resetPwd(){
		let logi=document.querySelector('.login-modal')
		logi.style.display='none'
	  },
		wblogin(){
			location.href = 'https://api.weibo.com/oauth2/authorize?client_id=359903583&response_type=code&display=page&redirect_uri=' + this.commonShare + '%2f%23%2fthree'
		},
		wxlogin(){
			location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxbc26206df0b5b85e&redirect_uri='+ this.commonShare + '%2f%23%2fthree&response_type=code&scope=snsapi_login'
		},
    hideLoginModal () {
      this.$emit('hideLoginModal')
    },
    login () {
    	var _this = this;
			this.$axios.post('/uaa/oauth/token', this.$qs.stringify({
				client_id: this.$client_id,
				client_secret: this.$client_secret,
				grant_type: 'password',
				username: this.username,
				password: this.password
			}))
			.then(res => {
				console.log(res.data)
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
					
					this.$CPOST('/account/v1/userInfo/queryUserInfoForUpdate',{
				        },(res) =>{
				        let user = {
							userImg: res.resultValue.img,
							userNickName: res.resultValue.nickName,
							userGrade: res.resultValue.grade
						}
						let obj1 = JSON.stringify(user)
						// window.localStorage.setItem('user', obj1)
						this.userImg = res.resultValue.img
						this.userNickName=res.resultValue.nickName
						this.userGrade=res.resultValue.grade
						window.localStorage.setItem('user',obj1);
						this.$store.commit('setUserImg',this.userImg);
						this.$store.commit('setUserNickName',this.userNickName);
						this.$store.commit('setUserGrade',this.userGrade);
						this.hideLoginModal();
						this.resetPwd();
						if(this.$route.path.indexOf('login') > 0 || this.$route.path.indexOf('register') > 0){
							this.$router.push('/');
						}else{
							this.$router.go(0);
						}
				    })


				}
			})
			.catch(error => {
		        if (error.response) {
			      if(error.response.data.resultCode == 1007){
				      $('.confirm_modal').show()
					  this.alertText=error.response.data.resultMessages
				  }
			    } else if (error.request) {
			      console.log(error.request);
			    } else {
			      console.log('Error', error.message);
			    }
		     })
    },
		toRegister () {
			this.showLoginModel=false;
			this.hideLoginModal();
			this.$router.push('/register');
		},
		showResetPwd() {
			this.showLoginModel=false;
			this.hideLoginModal();
			this.$router.push('/reset');
		},
		hideResetPwd() {
			this.isResetPwd = false
			this.hideLoginModal()
		}
  }
}
</script>


<style scoped>
/*********登录弹层**********/
#wblogin{
	margin-left: 68px;
}
.login-modal,.pwd-modal{
	width: 100%;
	height: 100%;
	background: url(../../assets/img/login/zhezhao.png) no-repeat;
	background-size: 100% 100%;
	background: none\9;
	position: fixed;
	left: 0;
	top: 0;
	z-index:10001;
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
.login-modal-content{
	display: table-cell;
    vertical-align: middle;
}
.login-modal-main{
	width: 452px;
	background: #fff;
	margin: auto;
	-moz-border-radius: 8px; /* Firefox */
    -webkit-border-radius: 8px; /* Safari 和 Chrome */
    border-radius: 8px; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
   	position: relative;
   	z-index: 45;
}
.login-modal-main-box{
	width: 382px;
	margin: auto;
	position: relative;
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
.login-modal-head-p2{
	font-size: 14px;
	color: #c60c1b;
	float: right;
	margin-right: 10px;
}
.login-modal-body-input{
	width: 100%;
	margin-top: 25px;
}
.login-modal-body-parent{
	width: 100%;
	height: 80px;
}
.login-modal-body-parent>p{
	width: 100%;
	height: 55px;
	border-bottom: 1px solid #e0e0e0;
	position: relative;
}
.login-modal-body-parent>p.activityD-text2{
	border: 0;
}
.activityD-text2>input{
	width: 210px;
	height: 55px;
	line-height: 55px;
	border: 0;
	border-bottom: 1px solid #e0e0e0;
	float: left;
	outline: none;
	color: #676c75;
	font-size:26px;
	padding-left: 10px;
}
.activityD-text2>span{
	width: 138px;
	height: 44px;
	border: 1px solid #dcd6d9;
	float: right;
	background: #fff;
	display: block;
	margin-top: 8px;
}
.activityD-text2>span>img{
	width: 100%;
	height: 100%;
	cursor: pointer;
}
.login-modal-body-leftimg{
	width: 38px;
	height: 55px;
	display: inline-block;
	line-height: 55px;
	text-align: center;
	vertical-align: middle;
}
.login-modal-body-leftimg>img{
	vertical-align: text-bottom;
}
.login-input1,.login-input2{
	width: 296px;
	height: 20px;
	line-height: 20px;
	border: 0;
	font-size: 14px;
	outline: none;
	display: inline-block;
}
.shield-write,.shield-write1,.shield-write2{
	width: 44px;
	height: 40px;
	background: #fff;
}
.shield-write{
	position: absolute;
	right: 0px;
	top:4px;
}
.shield-write1{
	position: absolute;
	right: 40px;
	top:4px;
}
.shield-write2{
	position: absolute;
	right: 103px;
	top:4px;
}
.login-ti{
	width: 100%;
	height: 24px;
	display: block;
	padding-left: 10px;
	font-size: 12px;
	color: #E14536;
	line-height: 24px;
}

.login-modal-body-ji{
	width: 100%;
	height: 30px;
}
.login-modal-body-l{
	width: 310px;
	float: left;
}
.login-modal-body-l>p>input{
	display: block;
	float: left;
	margin-top: 17px;
	margin-right: 7px;
}
.login-modal-body-l>p>label{
	height: 48px;
	line-height: 48px;
	font-size: 14px;
	color: #676c75;
}
.login-modal-body-r{
	float: right;
}
.login-modal-body-r>a{
	font-size: 14px;
	color: #676c75;
}
.login-btn{
	width: 100%;
	height: 46px;
	margin-bottom: 30px;
}
.login-btn>button{
	border: none;
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
}
.login-btn>input{
	border: none;
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
}
.login-modal-main-box.kefu_phone{
	line-height:22px;
	color:#676c75;
	font-size:14px;
	text-align:center;
	font-family: "微软雅黑";
}
.register-btn .kefu_phone{
	line-height:55px;
	color:#676c75;
	font-size:14px;
	text-align:center;
	font-family: "微软雅黑";
}
.kefu_phone{
	line-height:55px;
	color:#676c75;
	font-size:14px;
	text-align:center;
	font-family: "微软雅黑";
}
.login-share{
	width: 100%;
	margin-top: 20px;
}
.login-share-head{
	width: 100%;
	height: 14px;
	line-height: 14px;
	text-align: center;
	font-size: 14px;
	color: #71767e;
	background: url(../../assets/img/login/login-xian.png) no-repeat center;
}
.login-share-mian{
	width: 324px;
	height: 80px;
	margin: auto;
	margin-top: 30px;
}
.login-share-box{
    float: left;
    width: 50px;
    margin: 0 29px;
    cursor: pointer;
}
.login-share-box>p{
	width: 100%;
	height: 50px;
}
.login-share-box>p>img{
	margin: auto;
}
.wblogin-img2{
	display: none;
}
.login-share-box:hover .wblogin-img1{
	display: none;
}
.login-share-box:hover .wblogin-img2{
	display: block;
}
.login-share-box>span{
	width: 100%;
	height: 34px;
	color: #676c75;
	display: block;
	line-height: 34px;
	text-align: center;
}
.third-landed-button{
	height:44px;
	width:280px;
	margin:0 auto;
	margin-top: 20px;
}
.third-landed-button>p{
	width:130px;
	height:44px;
	line-height:44px;
	color:#343434;
	font-size:14px;
	cursor: pointer;
}
.third-landed-button>p>img{
	vertical-align: middle;
	margin-right:10px;
}
.third-landed-button1{
	float:left;
}
.third-landed-button2{
	float:right;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}
</style>

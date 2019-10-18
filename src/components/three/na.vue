<template>
	<div>
		<div class="nav_payment">
			<ul>
				<li class="lileft current">
					<p class="lileft_p">
						<img src="../../assets/img/na/register_inv01.png" v-show="isNo==true"/>
						<img src="../../assets/img/na/register_inv02.png" v-show='isNo==false'/>
					</p>
					<p :class="isNo==false?'lileft_p_color':''">新用户注册</p>
				</li>
				<li>
					<p class="lileft_p">
						<img src="../../assets/img/na/register_inv03.png" v-show='isNo==false'/>
						<img src="../../assets/img/na/register_inv04.png" v-show='isNo==true'/>
					</p>
					<p :class="isNo==true?'lileft_p_color':''">已有账号</p>
				</li>
			</ul>
		</div>
		<div class="nav_table">
			<div class="nav_table_body" v-show='isNo==false'>
				<div class="login-modal-main-box">
					<div class="register-modal-main-body">
						<form id="auth_login_form1" autocomplete="off">
							<div class="register-modal-body-input">
								<div class="aaa">
									<input type="text" name="tel" class="register-input2-0 text-input2-1" placeholder="请输入手机号" maxlength="11" v-model="newPhone"/>
									<span class="login-ti"></span>
									<span class="ssss" data-select style="display: none;">
	        							<input class="register-country-input" type="text" readonly data-value="86" value="中国大陆+86" readonly />
	        							<ul class="register-select-list country-code"></ul>
	        						</span>
									<input class="cc_value" name="country_code" type="hidden" value="中国大陆+86" readonly />
								</div>
								<div class="register-p1">
									<input type="text" name="code" class="register-input1-0" placeholder="请输入验证码" v-model="newCode"/>
									<span class="login-ti"></span>
									<span class="cleck-num" @click='flag && newSendCode()'>发送验证码</span>
								</div>
								<div>
									<input type="text" name="invite_code" class="register-input5-0" placeholder="请输入邀请码 ( 选填 )" v-model="inviteBy"/>
									<span class="login-ti"></span>
								</div>
							</div>

							<div class="login-btn">
								<!--<button id="do-submit">立即注册</button>-->
								<p class="do-submit" @click='register'>立即注册</p>
							</div>
							<div class="register-yi">客服热线：400-691-9939</div>
						</form>
					</div>
				</div>
			</div>
			<div class="nav_table_body" v-show='isNo==true'>
				<div class="login-modal-main-box">
					<div class="register-modal-main-body">
						<form id="auth_login_form2" autocomplete="off">
							<div class="register-modal-body-input">
								<div data-select>
									<input type="text" name="tel" class="register-input2-0  padding-left" placeholder="请输入手机号" maxlength="11" v-model="Phone"/>
									<span class="login-ti"></span>
									<span class="ssss" style="display: none;">
			        							<input class="register-country-input" type="text" readonly data-value="86" value="中国大陆+86" readonly/>
				        						<ul class="register-select-list country-code" ></ul>
			        						</span>
									<input class="cc_value" name="country_code" type="hidden" value="中国大陆+86" readonly />
								</div>
								<div class="register-p1">
									<input type="text" name="code" class="register-input1-0" placeholder="请输入密码" v-model="pwd"/>
									<span class="login-ti"></span>
									<!--<span class="cleck-num">发送验证码</span>-->
								</div>
								<div class="hide">
									<input type="text" class="register-input3-0" placeholder="请输入密码" />
									<span class="login-ti"></span>
								</div>
							</div>
							<div class="login-btn">
								<p class="do-submit" @click='commit'>提交</p>
							</div>
							<div class="register-yi">客服热线：400-691-9939</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<Aalert :text='alertText' v-show='alert'/>
	</div>
</template>

<script>
	import Aalert from '../common/alert'
	export default{
		components:{
			Aalert
		},
		data(){
			return{
				newPhone:null,
				alert:false,
				alertText:null,
				token:null,
				flag:true,
				newCode:null,
				inviteBy:'',
				userId:null,
				isNo:null,
				Phone:null,
				pwd:null,
				openid:null,
				unionid:null
			}
		},
		created(){
			this.token=JSON.parse(sessionStorage.getItem('token')).token;
			this.isNo=JSON.parse(sessionStorage.getItem('isNo')).isNo;
			if(JSON.parse(sessionStorage.getItem('Id'))!=null){
				this.openid=JSON.parse(sessionStorage.getItem('Id')).openid
				this.unionid=JSON.parse(sessionStorage.getItem('Id')).unionid
			}
		},
		methods:{
			newSendCode(){
				if(this.newPhone==null || this.newPhone==''){
					$('.confirm_modal').show()
					this.alertText='手机号不能为空'
					return false
				}else{
					this.$axios.post('/message/communication/v1/sendSMS'+this.$signParam(),{
						"countryCode": "86",
						"mobile": this.newPhone,
						"type": "0"
					},{
						headers:{
							Authorization:this.token
						}
					})
					.then(res=>{
						if(res.data.resultCode==900033){
							$('.confirm_modal').show()
							this.alertText=res.data.resultMessages
						}else if(res.data.resultCode==200){
							let seconds = 60;
		                    let timer = setInterval(()=>{
		                    	this.flag=false
		                    	seconds--;
		                    	document.querySelector('.cleck-num').innerHTML =seconds+'秒后重新发送';
		                        
		                        if(seconds==0){
		                            document.querySelector('.cleck-num').innerHTML = `重新发送`;
		                            clearTimeout(timer);
		                            this.flag=true
		                        }
		                    },1000)
						}
					})
				}
			},
			register(){
				if(this.newPhone==null || this.newPhone==''){
					$('.confirm_modal').show()
					this.alertText='手机号不能为空'
					return false
				}else if(this.newCode==null || this.newCode==''){
					$('.confirm_modal').show()
					this.alertText='验证码不能为空'
					return false
				}else{
					//未注册接口
					this.$axios.post('/account/v1/userThirdRegister/appRegisterUserBinding'+this.$signParam(),{
						"clientFrom": "pc",
					    "clientType": "1",
					    "countryCode": "86",
					    "inviteBy": this.inviteBy,
					    "loginType": "1",
					    "mobile": this.newPhone,
					    "model": "pc",
					    "nickName": "",
					    "openid": this.openid,  //idididididiidid
					    "rowId": this.unionid,  //idididididiidid
					    "userFrom": "1",
					    "verificationCode": this.newCode
					},{
						headers:{
							Authorization:this.token
						}
					})
					.then(res=>{
						//社会授权登录接口
						this.$axios.post('/uaa/oauth/token?',{
							'client_id':'ifuturex_swagger',
							'client_secret':'gKWwZI1g',
							'grant_type':'social',
							'username':this.newPhone,
							'password':this.unionid,  //idididididiidid
							'account_type':'1'
						},{
							headers:{
								Authorization:this.token
							}
						})
						.then(res=>{
							console.log(res.data)
							//alert('成功了')
						})
					})
				}
				
			},
			commit(){
				if(this.Phone==null || this.Phone==''){
					$('.confirm_modal').show()
					this.alertText='手机号不能为空'
					return false
				}else if(this.pwd==null || this.pwd==''){
					$('.confirm_modal').show()
					this.alertText='密码不能为空'
					return false
				}else{
					this.$axios.post('/account/v1/userThirdRegister/userBandingThird'+this.$signParam(),{
						"accountType": 1,
						"clientType": 1,
						"openId": this.openid,//idididididiidid
						"unionid": this.unionid//idididididiidid
					},{
						headers:{
							Authorization:this.token
						}
					})
					.then(res=>{
						//社会授权登录接口
						this.$axios.post('/uaa/oauth/token?',{
							'client_id':'ifuturex_swagger',
							'client_secret':'gKWwZI1g',
							'grant_type':'social',
							'username':this.Phone,
							'password':this.unionid,  //idididididiidid
							'account_type':'1'
						},{
							headers:{
								Authorization:this.token
							}
						})
						.then(res=>{
							console.log(res.data)
							//alert('成功了')
						})
					})
				}
			}
		}
	}
</script>

<style>
	@charset "utf-8";
	body,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	dl,
	dd,
	ol,
	ul,
	form,
	input,
	textarea,
	th,
	td,
	select {
		margin: 0;
		padding: 0;
	}
	
	em,
	i {
		font-style: normal;
	}
	
	li {
		list-style: none;
	}
	
	a {
		text-decoration: none;
		cursor: pointer;
	}
	
	body {
		font-family: "微软雅黑";
		background: #f3f3f2;
	}
	.do-submit{
		    border: none;
		    width: 100%;
		    height: 100%;
		    background: #ee3d3d;
		    line-height: 46px;
		    text-align: center;
		    color: #fff;
		    font-size: 18px;
		    -moz-border-radius: 4px;
		    -webkit-border-radius: 4px;
		    border-radius: 4px;
		    behavior: url(/plugins/PIE.htc/PIE.htc);
		    position: relative;
		    cursor: pointer;
	}
	#index-box {
		width: 850px;
		margin: auto;
		overflow: hidden;
		min-height: 693px;
	}
	/*切换*/
	
	.nav_payment {
		height: 80px;
		margin-top: 24px;
	}
	
	.nav_payment>ul {
		width: 900px;
		margin: auto;
	}
	
	.nav_payment>ul>li {
		width: 424px;
		cursor: pointer;
		font-size: 18px;
		color: #676767;
		display: inline-block;
	}
	
	.lileft {
		margin-right: 2px;
	}
	
	.nav_payment>ul>li>p {
		text-align: center;
	}
	
	.lileft_p_color {
		color: #fa4c4c !important;
	}
	
	.lileft_p {
		height: 50px;
		line-height: 50px;
	}
	
	.lileft_p>img {
		vertical-align: middle;
	}
	
	.nav_payment>ul>li>p>img {
		display: inline;
	}
	
	/*.nav_payment>ul>li>p>img+img {
		display: none;
	}*/
	
	/*.nav_payment>ul>li.current>p>img {
		display: none;
	}
	*/
	.nav_payment>ul>li.current>p>img+img {
		display: inline;
	}
	/**/
	.nav_table {
		margin-top: 34px;
	}
	
	.nav_table_body {
		width: 337px;
		margin: 0 auto;
	}
	/***************************注册**************************/
	.register-modal-main {
		width: 452px;
		height: 620px;
		background: #fff;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		-moz-border-radius: 8px;
		-webkit-border-radius: 8px;
		border-radius: 8px;
	}
	
	.login-modal-main-box {
		width: 382px;
		/*     height: 536px; */
		margin: auto;
		margin-bottom: 22px;
	}
	
	.nav_table_body .register-modal-main-body {
		width: 100%;
	}
	
	.register-modal-body-input {
		width: 100%;
	}
	.register-p1 {
		position: relative;
	}
	
	.register-input2-0,
	.register-input3-0,
	.register-input4-0,
	.register-input5-0,
	.register-input1-0 {
		width: 344px;
		height: 55px;
		border: 0;
		border-bottom: 1px solid #e0e0e0;
		font-size: 14px;
		color: #484c52;
		padding-left: 38px;
		outline: none;
	}
	
	.register-p0,
	.register-p1 {
		position: relative;
	}
	
	.register-input2-0 {
		background: url(../../assets/img/na/login1.png) no-repeat left;
		background-position-x: 10px;
	}
	
	.register-input1-0 {
		background: url(../../assets/img/na/register1.png) no-repeat left;
		background-position-x: 10px;
	}
	
	.register-input3-0 {
		background: url(../../assets/img/na/login2.png) no-repeat left;
		background-position-x: 10px;
	}
	
	.register-input4-0 {
		background: url(../../assets/img/na/login2.png) no-repeat left;
		background-position-x: 10px;
	}
	
	.register-input5-0 {
		width: 370px;
		padding-left: 10px;
		background: #f3f3f2;
	}
	
	.aaa {
		position: relative;
	}
	
	.ssss {
		height: 55px;
		color: #20242f;
		font-size: 14px;
		line-height: 55px;
		position: absolute;
		top: 0;
		left: 40px;
	}
	
	.ssss>input {
		background: url(../../assets/img/na/xialajiantou.png) no-repeat right;
	}
	
	.ssss>img {
		vertical-align: middle;
		margin-left: 8px;
	}
	
	.text-input2-1 {
		width: 343px;
		/*padding-left: 164px;*/
	}
	
	.cleck-num {
		width: 98px;
		height: 28px;
		color: #fff;
		background: #fa4c4c;
		font-size: 14px;
		position: absolute;
		right: 0;
		top: 14px;
		line-height: 28px;
		text-align: center;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
		border-radius: 4px;
		cursor: pointer;
	}
	
	.register-yi {
		width: 100%;
		height: 55px;
		font-size: 16px;
		color: #676767;
		text-align: center;
		line-height: 55px;
	}
	
	.login-btn>p {
		width: 100%;
		height: 100%;
		background: #fa4c4c;
		line-height: 46px;
		text-align: center;
		color: #fff;
		font-size: 18px;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
		border-radius: 4px;
		cursor: pointer;
	}
	.register-select-list {
		width: 200px;
		height: 206px;
		border: 1px solid #e0e0e0;
		background: #fff;
		position: absolute;
		top: 55px;
		left: 0;
		z-index: 1;
		overflow: auto !important;
	}
	
	.padding-left {
		width: 343px;
		height: 55px;
		border: 0;
		border-bottom: 1px solid #e0e0e0;
		font-size: 14px;
		color: #484c52;
		/*padding-left: 164px;*/
		outline: none;
	}
</style>
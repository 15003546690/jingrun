<template>
	<!--账号绑定-->
	<div class="bind">
		<div class="bind_div">
			<span><img src="../../../../assets/img/center/weixin2.png"/>绑定微信账号</span>
			<p>
				<a v-show="isShow" @click="Nobinding">未绑定&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
				<a v-show="!isShow">已绑定&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
			</p>
		</div>
		<div class="bind_div">
			<span><img src="../../../../assets/img/weibo2.png"/>绑定微博账号</span>
			<p>
				<a v-show="isText" @click="microBlog">未绑定&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
				<a v-show="!isText">已绑定&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					isShow: true,//绑定前
					isText: true,//绑定前
					nickname: null,
					password: null,
					openid: '',
					unionid: '',
					wxId: '',
					code: '',
					wbcode:''
				}
			},
			created() {
				this.$Bury(window.location.href,'',0,'zhanghaobangding_04011')
				setTimeout(()=>{
					this.eventlist();//获取绑定状态
				},50)
				this.code = this.$route.query.code;
				this.wbcode = this.$route.query.wbcode;
				if(this.code != undefined){
					this.getCode()
				}
				if(this.wbcode != undefined){
					this.getWbCode()
				}
			},
			methods: {
				//查询用户绑定的第三方
				eventlist() {
					this.$CPOST('/account/v1/userThirdRegister/queryUserSocialAccount', {}, (res) => {
						if(res.resultCode == 200){
							if(res.resultValue.wx) {
								this.isShow = false;
							} else {
								this.isShow = true;
							}
							if(res.resultValue.wb) {
								this.isText = false;
							} else {
								this.isText = true;
							}
						}
					})
				},
				getUrlKey(name) {
					return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
				},
				//微信绑定
				Nobinding() {
					var redirect_uri = encodeURIComponent("http://www.ifuturex.com/#/personal/account/bind");
					location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxbc26206df0b5b85e&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_login';
					this.$CPOST('/account/v1/userThirdLogin/appLoginUserInfo', {
						loginType: 1,
						rowId: this.wxId
					},(res) => {
						if(res.resultCode == 200) {
							this.isShow = true;
						}
					})
					this.$Bury(window.location.href,'underfind',0,'weixinbangding_05011')
				},
				//微信第三方回调
				getCode() {
					var arg = '&code='+this.code;
					this.$CGET('/account/callback/v1/auth/wechat',arg,(res) => {
						this.openid = res.resultValue.openid;
						this.unionid = res.resultValue.unionid;
						this.weXinbd(1);
					})
				},
				//微博绑定
				microBlog() {
					var redirect_uri = encodeURIComponent("http://www.ifuturex.com/#/personal/account/weibo");
					location.href = 'https://api.weibo.com/oauth2/authorize?client_id=359903583&response_type=code&display=page&redirect_uri=' + redirect_uri;
					this.$CPOST('/account/v1/userThirdLogin/appLoginUserInfo', {
						loginType: 2,
						rowId: this.wxId
					},
					(res) => {
						if(res.resultCode == 200) {
							this.isText = true;
						}
					})
					this.$Bury(window.location.href,'underfind',0,'weibobangding_05010')
				},
				//微博第三方回调
				getWbCode() {
					var arg = '&code='+this.wbcode;
					this.$CGET('/account/callback/v1/auth/webo',arg,(res) => {
						this.openid = res.resultValue.openid;
						this.unionid = res.resultValue.unionid;
						this.weXinbd(2);
					})
				},
				//用户内部第三方绑定
				weXinbd(accountType) {
					this.$CPOST('/account/v1/userThirdRegister/userBandingThird', {
						accountType: accountType,
						clientType: 1,
						openId: this.openid,
						unionid: this.unionid
					},(res) => {
						this.wxId = res.resultValue.id;
						if(accountType == 1){
							this.isShow = false;
						}else if(accountType == 2){
							this.isText=false;
						}
					})
				}
			}
	}
</script>
<style scoped>
/*微信绑定*/
.bind_div {height: 69px;border-bottom: dashed 1px #ccc;font-size: 14px;color: #a4a4a4;}
.bind_div>span {float: left;height: 70px;line-height: 70px;}
.bind_div>span>img {vertical-align: middle;margin-right: 10px;}
.bind_div>p {float: right;height: 70px;line-height: 70px;margin-right: 20px;}
.bind_div>p>a {color: #5b9bff;}
.bind_div>p>a+a {color: #a4a4a4;}
</style>
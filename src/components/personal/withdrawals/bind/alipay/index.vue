<template>
  <div class="cash">
    <div class="cash_title">提取现金 </div>
    <div class="cash_content">
    	<p class="cash_tishi" v-if="tishi">您已授权成功，绑定账号不可修改，提取现金将到此支付宝账户。</p>
      <div class="cash_content_div">
        <span>输入提取金额</span>
        <p>
          <i :class="withDrawAmount<=20?'cash_wet' : ''" @click="dec()">_</i>
          <input type="text" v-model="withDrawAmount" value="20" disabled />
        	<i @click="add()">+</i>
        </p>
        <a>您最多可领取{{Math.floor(this.Currency/20)*20}}元</a>
      </div>
      <!--<div class="cash_content_sub">
        <span>支付宝账户</span>
        <p><input type="text" v-model="alipayAccount" /></p>
      </div>-->
      <!--<div class="cash_content_sub">
        <span>昵称</span>
        <p><input type="text" v-model="realName" /></p>
      </div>-->
      <div class="cash_content_sub">
        <span>手机号</span>
        <p><input type="text" v-model="mobile" id="phone"/></p>
      </div>
      <div class="cash_content_verification">
        <span>验证码</span>
        <p><input type="text" v-model="identifyingCode" /></p>
        <input type="button" id="btn" value="获取验证码" @click="sendCode()"/>
      </div>
      <span class="hint">{{Messages}}</span>
      <div class="content_verification">
        <a></a>
        <button @click="extractCash">确认</button>
      </div>
    </div>
    <div class="cash_explain">
      <p class="cash_explain_p">提取【现金】说明</p>
      <p>本平台现金提取业务，暂时只支持提取到指定的支付宝账户！</p>
      <p>平台客服电话：【400-691-9939】</p>
    </div>
    <Alert :text='alertText' v-if='alert' @yes="yes" ></Alert>
    <authen v-show='authenShow'  @authenclose='authenclose'></authen>
  </div>
</template>
<script>
import Alert from './alert'
import authen from '../../../../common/authentication'
	export default{
	components: {
			Alert,
			authen
		},
		data() {
			return {
				authenShow:false,
				alipayAccount: "",  //储存用户账号
			  identifyingCode: "",   //验证码
			  mobile: "",   //手机号
			  realName: "",   //姓名
			  withDrawAmount: 20,   //初始化提现余额
			  Currency:null,   //最多可领取的余额
			  Messages:null,   //提示
			  code: this.$route.query.auth_code,
			  alert: false,
			  alertText: '',
			  tishi: true
			}
		},
		created() {
			this.myInfo();
			if(this.code != undefined){
				this.bindAlipay()
			}
		},
		methods: {
			authenclose(){
				this.authenShow=false;
			},
			//获取账户现金余额
			myInfo(){
				this.$CPOST('account/v1/userInfo/queryUserInfo',{},(res) => {
					this.Currency=res.resultValue.userCashCurrency
				})
			},
			//点击+号
			add(){
				if(this.withDrawAmount<=this.Currency-20){
					this.withDrawAmount+=20;
				}
			},
			//点击—号
			dec(){
				if(this.withDrawAmount<=20){
					this.withDrawAmount=20;
				}else{
					this.withDrawAmount-=20;
				}
			},
			//发送验证码
			sendCode(){
				var mobile = document.getElementById('phone').value;
				
				if( this.mobile=='' ){
				    this.alert = true;
				    this.alertText='手机号不能为空'
				}else{
					this.$CPOST('message/communication/v1/sendSMS',{
						  countryCode: '86',
  						mobile: this.mobile,
  						type: 5
				},(res) => {
					this.overtime();
				})
				}
 			},
			//发送验证码成功 倒计时
			overtime() {
        var wait=60;
        var o=document.getElementById("btn");
          if (wait == 0) {
	          o.removeAttribute("disabled");   
	          o.value="获取验证码";
	          wait = 60;
        	}else{ 
	          o.value="重新发送(" + wait + ")";
	          o.setAttribute("disabled", true);
	          o.style.background="#ccc";
	          var timer=setInterval(function() {
		          wait--;
		          o.value="重新发送(" + wait + ")";
		          if(wait==0){
		          clearInterval(timer);
		          o.removeAttribute("disabled");   
		          o.value="获取验证码";
		          o.style.background="red";
	            }
	          },1000)
        	}
      },
      //绑定
      bindAlipay() {
				this.$CPOST('/account/v1/withdrawDeposit/bindAliPayAccountV2',{
					auth_code: this.code,
					dataSource: 1
				},(res) => {
					if(res.resultCode != 200) {
						this.alert = true;
						this.alertText = "授权失败";
					}
				})
			},
      //提现
			extractCash(alipayAccount,realName,identifyingCode,mobile,withDrawAmount) {
	    	this.$CPOST('/account/v1/withdrawDeposit/withdrawCash',{
						  alipayAccount: this.alipayAccount,
						  realName: this.realName,
						  identifyingCode: this.identifyingCode,
						  mobile: this.mobile,
						  withDrawAmount: this.withDrawAmount
				},(res) => {
					if(res.resultCode == 200){
						this.alert = true;
						this.alertText = "提现成功";
					}else if(res.resultCode==10125||res.resultCode == 10123){
						this.authenShow=true;
					}else{
						this.alert = true;
						this.alertText = res.resultMessages;
					}
//					else if(res.resultCode == 10123){
//						this.authenShow=true;
//					}else if(res.resultCode == 10126){
//						this.alert = true;
//						this.alertText = res.resultMessages;
//					}else if(res.resultCode==10125){
//				 		this.authenShow=true;
//				 	}
					this.mobile = '';
					this.identifyingCode = '';
					this.myInfo();
				})
	   	},
			yes() {
				window.history.back();
			}
		}
	}
</script>
<style scoped>
.cash{width: 940px;margin: 0 auto;}
.cash_title{line-height: 68px;border-bottom: solid 2px #ced4e0;font-size: 18px;font-weight: bold;color: #323232;}
.cash_content{margin-top: 30px;padding-bottom: 20px;border-bottom: dashed 1px #ced4e0;}
.cash_tishi{margin-bottom: 20px;}
.cash_content_div{height: 30px;margin-bottom: 30px;}
.cash_content_div>span{width: 106px;line-height: 30px;font-size: 14px;color: #323232;text-align: right;display: block;float: left;padding-right: 10px;}
.cash_content_div>p{width: 218px;line-height: 28px;font-size: 14px;border: solid 1px #d9d9d9;color: #323232;float: left;background: white;}
.cash_content_div>p>i{width: 24px;height: 28px;font-size: 24px;color: #6a6a6a;display: block;float: left;text-align: center;cursor: pointer;}
.cash_content_div>p>i:nth-child(1){line-height: 0px;}
.cash_content_div>p>input{float: left;width: 170px;line-height: 28px;text-align: center;border: none;outline: none;background: #fff;}
.cash_content_div>a{line-height: 30px;font-size: 12px;float: left;color: #a4a4a4;margin-left: 12px;}
.cash_wet{color: #e0dfde !important;}
.cash_content_sub{height: 30px;margin-bottom: 30px;}
.cash_content_sub>span{width: 106px;line-height: 30px;font-size: 14px;color: #323232;text-align: right;display: block;float: left;padding-right: 10px;}
.cash_content_sub>p{width: 218px;line-height: 28px;font-size: 14px;border: solid 1px #d9d9d9;color: #323232;float: left;background: white;}
.cash_content_sub>p>input{width:95%;height: 100%;line-height: 28px;text-align: center;border: none;outline: none;text-align: left;padding-left: 10px;}
.cash_content_verification{height: 30px;margin-bottom: 10px;}
.cash_content_verification>span{width: 106px;line-height: 30px;font-size: 14px;color: #323232;text-align: right;display: block;float: left;padding-right: 10px;}
.cash_content_verification>p{width: 110px;line-height: 28px;font-size: 14px;border: solid 1px #d9d9d9;color: #323232;float: left;background: white;}
.cash_content_verification>p>input{width:100%;height: 100%;line-height: 28px;text-align: center;border: none;outline: none;}
.cash_content_verification>button{width: 80px;height: 25px;outline: none;border: none;border-radius: 2px;font-size: 12px;color: white;margin-top: 3px;margin-left: 10px;cursor: pointer;}
.content_verification{height: 30px;margin-bottom: 30px;margin-top: 10px;}
.content_verification>a{width: 116px;height: 30px;display: block;float: left;}
.content_verification>button{width: 80px;height: 25px;background: #e52735;outline: none;border: none;border-radius: 2px;font-size: 16px;color: white;margin-top: 3px;cursor: pointer;}
.cash_explain{padding-top: 10px;}
.cash_explain>p{line-height: 22px;color: #323232;font-size: 14px;padding-left: 26px;}
.cash_explain_p{font-weight: bold;}
#btn{background: #e52735;color: #fff;margin-left: 10px;border: 0;height: 24px;width: 88px;text-align: center;margin-top: 3px;cursor: pointer;}
.hint{color:#f00;font-size:12px;margin-left: 114px;}
</style>

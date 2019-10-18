<template>
  <div class="cash">
    <div class="cash_title">
      账号绑定
    </div>
    <div class="cash_content">
      <div class="cash_content_sub">
        <span>支付宝账户</span>
        <p><input v-model="aplipayAccount" type="text" ref="tishi"/></p>
        <div id="tishi" v-show="textSize">{{text}}</div>
      </div>
      <div class="cash_content_div">
        <span>姓名</span>
        <p><input v-model="realName" type="text" ref="tishi" /></p>
        <a>支付宝账号和姓名要匹配，否则会提现失败！</a>
      </div>
      <div class="content_verification">
        <p><button @click="bindAccount">确认</button></p>
      </div>
    </div>
    <div class="cash_explain">
      <p>说明：为保障您现金账户安全，请先绑定您的支付宝账号！ </p>
      <p><i></i><a>客服电话：400-691-9939</a></p>
    </div>
    <Modal :text='alertText' v-if='alert' @isHide="isHide"></Modal>
  </div>
</template>

<script>
	import Modal from './confirmModal'
	export default{
		components: {
			Modal
		},
		data() {
			return {
				aplipayAccount: '',   //获取支付宝账号
				realName: '',   //获取支付宝账户姓名
				text: '支付宝账号不能为空',   //判断支付宝账号的提示
				text2: null,   //判断支付宝账户的提示
				textSize: false,   //是否显示提示，
				alert: false,  //是否显示弹层，
				alertText: ''  //弹层提示内容
			}
		},
		methods: {
			bindAccount() {
				if(this.aplipayAccount==''){
					this.textSize=true
					this.text='支付宝账号不能为空'
				}else{
					this.textSize=false
				}
				if(this.aplipayAccount==''){
					this.text1 = this.$refs.tishi.value + "请输入您的支付宝账户";
				}else{
					this.text1 = this.$refs.tishi.value + "";
				}
				if(this.realName==''){
					this.text2 = this.$refs.tishi.value + "请输入您的姓名";
				}else{
					this.text2 = this.$refs.tishi.value + "";
				}									
	   		this.$CPOST('/account/v1/withdrawDeposit/bindAliPayAccount',{
	    		aplipayAccount: this.aplipayAccount,
				  realName: this.realName
	    	},(res) => {
	    		if(res.resultCode==200){
						this.$router.push({'path':'/personal/withdrawals/bind/alipay'});
	    		}else{
	    			this.alert = true;
	    			this.alertText = res.resultMessages;
	    		}
	    	})
	   	},
	   	isHide() {
	   		this.alert = false
	   	}
		}
	}
</script>

<style scoped>
#tishi{height: 18px;line-height: 18px;color: #e52735;font-size: 12px;clear: both;width: 220px;margin-left: 115px;}
.cash{width: 940px;margin: 0 auto;}
.cash_title{line-height: 68px;border-bottom: solid 2px #ced4e0;font-size: 18px;font-weight: bold;color: #323232;}
.cash_content{margin-top: 30px;padding-bottom: 20px;border-bottom: dashed 1px #ced4e0;}
.cash_content_sub,.cash_content_div{height: 30px;margin-bottom: 30px;}
.cash_content_div>span{width: 106px;line-height: 30px;font-size: 14px;color: #323232;text-align: right;display: block;float: left;padding-right: 10px;}
.cash_content_div>p{width: 218px;line-height: 28px;font-size: 14px;border: solid 1px #d9d9d9;color: #323232;float: left;background: white;}
.cash_content_div>p>input{width: 95%;height: 100%;line-height: 28px;border: none;outline: none;padding-left: 10px;}
.cash_content_div>a{line-height: 30px;font-size: 12px;float: left;color: #a4a4a4;margin-left: 12px;}
.cash_content_sub>span{width: 106px;line-height: 30px;font-size: 14px;color: #323232;text-align: right;display: block;float: left;padding-right: 10px;}
.cash_content_sub>p{width: 218px;line-height: 28px;font-size: 14px;border: solid 1px #d9d9d9;color: #323232;float: left;background: white;}
.cash_content_sub>p>input{width:95%;height: 100%;line-height: 28px;text-align: center;border: none;outline: none;text-align: left;padding-left: 10px;}
.content_verification{height: 30px;margin-bottom: 30px;}
.content_verification>p{width: 80px;height: 25px;line-height: 25px;margin-left: 115px;}
.content_verification>p>button{width: 80px;height: 25px;background: #e52735;outline: none;border: none;border-radius: 2px;font-size: 16px;color: white;cursor: pointer;}
.cash_explain{padding-top: 10px;}
.cash_explain>p{line-height: 22px;color: #323232;font-size: 14px;padding-left: 26px;}
.cash_explain>p>i{width: 42px;height: 22px;display: inline-block;float: left;}
.cash_explain>p>a{height: 22px;line-height: 22px;}
</style>

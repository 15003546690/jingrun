<template>
  <div class="pay">
    <div class="pay_title">账号充值</div>
    <p class="balance">未来豆余额：{{currency}} </p>	
    <!--充值数量-->
    <div class="pay_div">
      <a>数量充值：</a>
      <div class="pay_div_content">
      	<p v-for='(i,index) in data' :class="{content_p:tab==index}" :data-id='i.packageId' @click='changeClass(i.packageId,index,i.currency)' :data-cur='i.currency'>
      		{{i.currency}}未来豆
      		<img v-show="tab==index" src="../../../assets/img/center/pitch_on1_03.png"/>
      	</p>
        <p :class="{content_p:tab==index}" @click='changeClass(packageId,index,currency)'>
        	<input type="text" placeholder="自定义未来豆" class="number" v-model="zdy" maxlength="6" oninput='this.value=this.value.replace(/\D/gi,"")'/>
        	<img  v-show="tab==index" src="../../../assets/img/center/pitch_on1_03.png"/>
        </p>
      </div>
    </div>
    <!--支付方式-->
    <div class="pay_way">
      <a>支付方式:</a>
      <div class="pay_way_content">
        <p  :class="{way_p:tabb==1}" @click='changeClasss(1)' data-type='wx'>
          <img src="../../../assets/img/center/weixin.png"/>
          <i><img v-show='tabb==1' src="../../../assets/img/center/pitch_on1_03.png"/></i>
        </p>
        <p  :class="{way_p:tabb==2}" @click='changeClasss(2)' data-type='zfb'>
          <img src="../../../assets/img/center/alipay.png"/>
          <i><img v-show='tabb==2' src="../../../assets/img/center/pitch_on1_03.png"/></i>
        </p>
        <p  :class="{way_p:tabb==3}" @click='changeClasss(3)' data-type='jd'>
          <img src="../../../assets/img/center/Golden.png"/>
          <i><img v-show='tabb==3' src="../../../assets/img/center/pitch_on1_03.png"/></i>
        </p>
      </div>
    </div>
    <!--支付金额-->
    <div class="pay_money">
      <a>支付金额:</a>
      <div class="pay_money_content">
        <p class="pay_money_font" v-show="custom==1">{{curr/100}}元</p>
        <p class="pay_money_font zdy" v-show="custom==2">{{zdy/100}}元</p>
        <p class="pay_money_font" v-show="custom==3">{{curr/1}}金豆</p>
        <p class="pay_money_font zdy" v-show="custom==4">{{zdy/1}}金豆</p>
        <button @click='pay()' style="cursor: pointer;">立即支付</button>
        <p class="pay_money_explain">
        	<i @click="toggle()">
        		<img v-if="redImg" src="../../../assets/img/center/right.png"/></i>
        		我已阅读并同意
        	<router-link tag="a" to="/rechargedeal">《充值服务协议》</router-link><!--chongzhixieyi_05013-->
        </p>
      </div>
    </div>
    <p class="explain_pay">充值【未来豆】说明</p>
    <div class="explain_pay_div" >
      <p>1、【未来豆】是【未来无限网】专用虚拟货币，用于参与题材交易等。</p>
      <p>2、【未来豆】仅限在【未来无限网】使用，且不能兑换现金。</p>
      <p>3、 1元人民币＝100未来豆</p>
      <p>4、 用户充值、使用【未来豆】不适用无理由退货规定。</p>
    </div>
    <div class="payy"></div>
    <div class="layer" v-show="isImg==true" @click='closeWx'>
    	<img v-lazy="this.img" alt=""/>
    </div>
    <Aalert :text='alertText' v-show='alert'/>
  </div>
</template>
<script>
	import Aalert from '../../common/alert'
	export default{
		components: {
		Aalert
	},
		data(){
			return{
				tab:0,//数量充值tab
				tabb:1,//支付方式tab
				currency:null,//未来豆余额
				data:null,//套餐
				curr:600,//默认输入数量为600
				beansCount:null,//
				id:null,//套餐的ID
				isBeansPackage:1,//
				custom:1,//支付金额默认显示第一个
				zdy:null,//
				img:null,//图片
				isImg:false,//弹层
				alert:false,//弹层
				alertText:null,//弹层内容
				redImg:true,
				packageId:null
			}
		},
		created(){
			  this.$Bury(window.location.href,'',0,'chongzhiyemian_03013')
        setTimeout(this.index(),10)
		},
		methods:{
			showPage(){
				document.forms['alipaysubmit'].submit();
			},
			closeWx(){
				this.isImg=false;
			},
			//点击是否同意条款
			toggle(){
				this.redImg = !this.redImg;
			},
			//支付方式
			pay(){
				if(this.redImg){
				if(this.curr==null && this.zdy==null){
					$('.confirm_modal').show()
					this.alertText='请输入未来豆数量'
				}else{
					let idx=document.querySelector('.pay_div_content').querySelectorAll('p').length-1;
      				let clsName=document.querySelector('.pay_div_content').querySelectorAll('p')[idx].className;
					if(clsName!=''){
						this.beansCount=this.zdy*1
					}else{
						this.beansCount=this.curr*1
					}
					if(this.id!=null){
						this.isBeansPackage=1
					}else{
						this.isBeansPackage=0
					}
					let isP=document.querySelector('.way_p').getAttribute('data-type');
					var postData = {
							    beansCount:this.beansCount,
				      		beansPackageId:this.id,
				      		isBeansPackage:1
						}
						if(this.isBeansPackage==0){
							    postData.beansPackageId=11;
					      	postData.isBeansPackage=0;
						}
					if(isP=='wx'){
						//微信支付
						this.$CPOST('/account/v1/alipay/rechargeByWechat',postData,(res)=>{
							let data=res.resultValue.wxpauUrl;
							this.img='https://api.ifuturex.com:443/account/v1/alipay/getQRcode?wxpauUrl='+data;
							this.isImg=true;
						})
					}else if(isP=='zfb'){
						//支付宝支付
						this.$CPOST('/account/v1/alipay/rechargeByAliPC',postData,(res)=>{
								let app = document.querySelector('.payy');
								app.innerHTML=res.resultValue.sub;
								this.showPage()
							})
					}else{
						//金豆支付
						this.$CPOST('/account/v1/alipay/goldRecharge',postData,(res)=>{
									if(res.resultMessages=="SUCCESS"){
										$('.confirm_modal').show()
										this.alertText='金豆兑换成功';
										this.index();
									}else if(res.resultMessages=="用户余额不足"){
										$('.confirm_modal').show()
										this.alertText='用户余额不足';
									}
							})
					  }
				  }	
				}else if(!this.redImg){
					$('.confirm_modal').show()
					this.alertText='请阅读并同意充值服务协议！'
				}
			},
			changeClass(packageId,e,currency){
				let clsName=document.querySelector('.pay_way_content').querySelectorAll('p')[2].className;
				if(typeof e != 'number'){
					this.custom = 2;
				}else{
					this.custom = 1;
					this.zdy = null
				}
				if(clsName != ''){
					this.custom = 3;
				}
				if(clsName!='' && typeof e != 'number'){
					this.custom = 4;
				}
				this.tab = e;
//				this.curr = event.path[0].getAttribute('data-cur');
//				this.id = event.path[0].getAttribute('data-id');
				this.curr = currency;
				this.id = packageId;
      },
      changeClasss(num){
      		this.tabb=num;
      		let idx=document.querySelector('.pay_div_content').querySelectorAll('p').length-1;
      		let clsName=document.querySelector('.pay_div_content').querySelectorAll('p')[idx].className;
      		if(num == 3){
      			this.custom = 3;
      		}else{
      			this.custom = 1;
      		}
      		if(num == 3 && clsName !=''){
      			this.custom = 4;
      		}else if(num != 3 && clsName!=''){
      			this.custom = 2;
      		}
      },
      index(){
      	this.$CPOST('/share/v1/sharePackage/querySharePackage',{
      	},(res) => {
      		this.currency=res.resultValue.rechargeUserInfoResponse.currency;
      		this.data=res.resultValue.responses;
					this.id=res.resultValue.responses[0].packageId;
				})
      }
		}
	}
</script>
<style scoped>
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {-webkit-appearance: none;}
input[type="number"]{-moz-appearance: textfield;}
.pay{width: 947px;margin-left: 30px;}
.pay_title{line-height: 70px;font-size: 18px;color: #323232;font-weight: bold;}
.balance{height:36px;font-size: 16px;color: #323232;}
.pay_div>a{float: left;width: 86px;line-height: 45px;font-size: 16px;color: #323232;}
.pay_div_content{float: left;width: 688px;}
.pay_div_content>p{margin-right: 30px;margin-bottom: 20px;border: solid 1px #d5d5d5;width: 197px;height: 43px;line-height: 43px;float: left;text-align: center;font-size: 14px;color: #323232;cursor: pointer;position: relative;}
.content_p,.way_p{border: solid 1px #e52735 !important;}
.pay_div_content>p>input{width: 100%;height: 100%;outline: none;border: none;display: block;text-align: center;}
.pay_div_content>p>img{position: absolute;bottom:0;right: 0;}
/*支付方式*/
.pay_way{display: inline-block;}
.pay_way>a{float: left;width: 86px;line-height: 45px;font-size: 16px;color: #323232;}
.pay_way_content{float: left;width: 688px;}
.pay_way_content>p{margin-right: 30px;margin-bottom: 20px;border: solid 1px #d5d5d5;width: 128px;height: 43px;line-height: 43px;float: left;text-align: center;cursor: pointer;position: relative;}
.pay_way_content>p>img{vertical-align: middle;margin-top: -3px;}
.pay_way_content>p>i{height: 19px;position: absolute;bottom:9px;right: 0;}
/*支付金额*/
.pay_money{height: 103px;}
.pay_money>a{float: left;width: 86px;line-height: 45px;font-size: 16px;color: #323232;}
.pay_money_content{float: left;}
.pay_money_font{font-size: 16px;color: #c60c1b;height: 36px;line-height: 36px;margin-top: 5px;}
.pay_money_content>button{width: 100px;height: 33px;background: #f13131;border-radius: 2px;outline: none;border: none;color: white;}
.pay_money_explain{font-size: 14px;color: #676767;margin-top: 10px;}
.pay_money_explain>i{width: 15px;height: 15px;cursor:pointer;line-height: 15px;border: solid 1px #f13131;border-radius: 2px;display: block;float: left;margin-right: 4px;margin-top: 1px;text-align: center;}
.pay_money_explain>i>img{vertical-align: middle;margin-top: -2px;}
.pay_money_explain>a{cursor: pointer;}
.explain_pay{height: 27px;border-bottom: solid 1px #eaebed;margin-top: 49px;text-align: left;font-size: 16px;color: #676767;}
.explain_pay_div{padding-top: 10px;}
.explain_pay_div>p{line-height: 30px;font-size: 12px;color: #676767;}
.layer{width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: #000;background: rgba(0,0,0,0.5);}
.layer>img{width: 180px;height: 180px;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin: auto;}
</style>

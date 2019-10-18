<template>
  <!--安全设置-->
  <div class="security">
    <div class="security_div">
      <div class="security_div_body">
        <i>手机<img src="../../../../assets/img/center/lock.png"/></i>
          <span>{{mobile|isTel}}</span>
          <a @click="toggle">重置</a>
      </div>
      <div class="security_main" v-show="rePhone">
				 <!--第一部分-->
        <div class="security_main_most security_main_list" v-show="oldTel">
	        <div class="security_host">
	          <span>发送验证码至原手机</span>
	          <div>
	           <input type="text" id="writeCode" placeholder="请输入验证码" v-model="yzms"/> 
						 <input type="button" class="btn" value="获取验证码" @click="time()"/>
	           <span class="nowrap">{{result}}</span>
	          </div>
	        </div>
	        <div class="security_host">
	        </div>
	        <div class="security_host">
	          <span></span>
	          <div class="verification">
	            <button class="host_button " @click="newBut()">下一步</button>
	          </div>
	        </div>
        </div>
        <!--第二部分-->
        <div class="security_main_most" v-show="newTel">
        <div class="security_host">
          <span>新的手机号</span>
          <div class="security_host_div">
           <select>
                    <option>+86</option>
           </select>-
           <input type="text" id="newPhonenum" value="188****8888" v-model="newPhonenum"/> 
          </div>
        </div>
        <div class="security_host host_bottom" >
          <span>发送验证码至新手机</span>
          <div class="verification">
            <input type="text" id="writeCode" v-model="newyzms" placeholder="请输入验证码"/>
						<button type="button" class="btntn" @click="times()">{{btnSetCodeHtml}}</button>
          </div>
        </div>
        <div class="security_host">
          <div class="verification next_but">
            <button class="host_button but_nar" @click="newPhone()">确认</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="security_div">
      <div class="security_div_body">
      <i>登录密码<img src="../../../../assets/img/center/lock.png"/></i>
      <span class="ty_div"></span>
      <a @click="Afftoggle">重置</a>
      </div>
      <div class="affirm" v-show="resPassword">
        <div class="affirm_div">
          <span>当前登录密码</span>
          <input type="text" id="oldPassw" v-model="oldPass" @blur="unblus" onfocus="this.type='password'" autocomplete="off"/>
					<i class="information" v-show="information">信息有误</i>
         <!-- <a @click="isShowPwd">忘记密码？</a>-->
        </div>
        <div class="affirm_div">
          <span>新登录密码</span>
          <input type="passWord" id="newPassw" v-model="newpaes"/>
					<span class="newPassw"></span>
        </div>
        <div class="affirm_div">
          <span>确认新登录密码</span>
          <input type="passWord" id="dbPassw" v-model="newpass"/>
					<span class="affirm_div_span">{{arrd}}</span>
        </div>
        <div class="affirm_div">
          <button class="affirm_div_btn1" v-show="disable" @click="resertPassword">确认</button>
          <button class="affirm_div_btn2" v-show="disbales" disabled="disabled" @click="resertPassword">确认</button>
        </div>
      </div>
    </div>
    <div class="login-modal" v-if="isResetPwd">
		</div>
		<Aalert v-show='alert' :text="alertText" @unblus="unblus"/>
  </div>
</template>
<script>
	import Aalert from './alert'
	export default{
		components: {
			Aalert
		},
		    data(){
					 return{
					 	noTel:null,
					 	yzms:'',
					 	newyzms:'',
					 	newPhonenum: '',
					 	newpaes:'',//新密码
					 	oldPass:'',//旧密码
					 	arrd:'',
					 	rePhone:false,
					 	oldTel:true,//旧手机号显示
					 	newTel:false,//新手机号显示
						resPassword:false,//
						write:60,//倒计时默认60秒
						resultMessages:'',
			  		showCloseModal: 1,
			  		information: false,
			  		isResetPwd: false,
			  		mobile: '',//注册电话
			  		message: null,//
			  		disable: true,//
			  		disbales: false,//
			  		alert:false,//弹层
						alertText:'',//弹层内容,
						result:'',
						newpass:'',
						oldPassw:'',
						btnSetCodeHtml:'获取验证码'
					 }
				},
				created(){
					this.$Bury(window.location.href,'',0,'anquanshezhi_04010')
						 setTimeout(()=>{
						 	this.$CPOST('/account/v1/userInfo/queryUserInfo',{
							},(res)=>{
			                   this.mobile = res.resultValue.mobile;
			                })
						 },50)
						 
				},
				filters:{
					isTel(str){
						 if(typeof str == 'string'){
						 		return str.substring(0,3)+"****"+str.substring(7,11);
						 }
					}
				},
				methods:{
			    isShowPwd() {
			    	this.isResetPwd = true;
			    },
			    hideResetPwd() {
						this.isResetPwd = false;
					},
					//第一个重置按钮点击触发的事件
					toggle(){
            this.rePhone=!this.rePhone;
					},
					//第二个重置按钮点击触发的事件
					 Afftoggle(){
             this.resPassword=!this.resPassword;
					},
					//原来手机获取验证码触发的事件(下一步)
			  	time(){
			  		//获取原来手机号
			  		this.$CPOST('/account/v1/userInfo/queryUserInfo', {},(res)=>{
			  			this.$CPOST('/message/communication/v1/sendSMS',/*发送验证码*/
	                {
						          countryCode: "86",
	                  	mobile: this.mobile,
	                  	type: "4"
						},(res)=>{
							this.overtime();
							})
			  		})
		     },
		     	/*下一步*/
		     	newBut(){
		     		this.$CPOST('/account/v1/userThirdRegister/userCerificationCode',{
				          	verificationCode : this.yzms,
                  	mobile:	this.mobile
					},(res)=>{
                  if(res.resultCode==200){
                   		this.oldTel=false;
						          this.newTel=true;
                   }
                  this.result = res.resultMessages;
                })
		     	},
		     	/*新的手机号*/
		     	times() {
              var phone=this.newPhonenum.slice(1,2)
               if(phone==7){
                 this.noTel="此类号码不支持"
               }else{
                 this.$CPOST('/message/communication/v1/sendSMS', {
                    countryCode: "86",
                    mobile: this.newPhonenum,
                    type: "4"
                   },(res)=>{
                     let seconds = 60;
			                    let timer = setInterval(()=>{
			                    	document.querySelector('.btntn').disabled = true;
			                    	this.btnSetCodeHtml =seconds+'秒后重新发送';
			                        seconds--;
			                        if(seconds==0){
			                            this.btnSetCodeHtml = `重新发送`;
			                            clearTimeout(timer);
			                            document.querySelector('.btntn').disabled=false
			                        }
			                    },1000)
                  })
               }
		     },
			  	 //倒计时
		       overtime() {
		        var wait=60;
		        var o=document.querySelector(".btn");
		          if (wait == 0) {
		          o.removeAttribute("disabled");   
		          o.value="获取验证码";
		            wait = 60;
		        } else { 
		          o.value="重新发送(" + wait + ")";
		          o.setAttribute("disabled", true);
		          var timer=setInterval(function() {
		          wait--;
		          o.value="重新发送(" + wait + ")";
		          if(wait==0){
		          clearInterval(timer);
		          o.removeAttribute("disabled");   
		          o.value="获取验证码";
		          }
		          },
		          1000)
		        }
		      },	
		     	/*确认*/
		     	newPhone(){
		     		this.$CPOST('/account/v1/userInfo/changeMobilePhone',{
									verificationCode: this.newyzms,
                  mobilePhone: this.newPhonenum 
								},(res)=>{
                    if(res.resultCode == 200){
                    	this.alert = true;
                    	this.alertText = '修改成功';
                    }else{
                    	this.alert = true;
                    	this.alertText = res.resultMessages;
                    }
                })
		     	},
		     	//校验密码
		     	unblus(){
		     		this.$CPOST('/account/v1/userInfo/verificationPassWord',{
                  passWord : this.oldPass
										},
                (res)=>{
                    if(res.resultCode != 200){
                    		this.information=true;
                    		this.disbales=true;
                    		this.disable=false;
                    }
                    if(res.resultCode == 200){
                    		this.information=false;
                    		this.disbales = false;
                    		this.disable=true;
                    }
                })
		     	},
		     	//修改密码
				resertPassword(){
	            if(this.oldPass==""){
	              this.arrd="密码不能为空"
	            }else if(this.newpaes==""){
	            	this.arrd="新密码不能为空"
	            }else if(this.newpaes.length<6){
	            	this.arrd="新密码长度不能小于6位"
	            }else{
	              this.$CPOST('/account/v1/userInfo/changePassWord',
	                  {
	                    newPassWord : this.newpaes,
	                    repeatPassWord : this.newpass 
	                      },
	                  (res)=>{
	                      if(res.resultCode == 200){
	                      	this.alertText='修改成功';
	                      	$('.confirm_modal').show();
	                      }else{
	                      	 this.alertText = res.resultMessages;
	                      	 this.alert=true;
	                      }
	                      this.oldPass = '';
	                      this.newpaes = '';
	                      this.newpass = '';
	                  })
	            }
	          }
				}
		}
	
</script>

<style scoped>
/*安全设置*/
.login-modal{width: 100%;height: 100%;background: url(../../../../assets/img/login/zhezhao.png) no-repeat;background-size: 100% 100%;background: none\9;position: fixed;left: 0;top: 0;z-index:6;}
.security{min-height: 400px;}
.security_div{min-height: 75px;border-bottom: dashed 1px #ccc;}
.security_div_body{min-height: 75px;}
.security_div_body>i{float: left;height: 76px;line-height: 76px;font-size: 14px;color: #323232;padding-left: 20px;}
.security_div_body>i>img{margin-left: 10px;}
.security_div_body>span{float: left;height: 76px;line-height: 76px;font-size: 14px;color: #a4a4a4;margin-left: 194px;}
.security_div_body>a{float: right;height: 76px;line-height: 76px;font-size: 14px;color: #3282ff;margin-right: 20px;}
.security_main_most{width: 670px;height: 180px;display: inline-block;}
.security_host{height: 30px;}
.security_host_div>select{width: 90px;height: 28px;}
.security_host>span{width: 246px;height: 30px;line-height: 30px;font-size: 14px;color: #323232;display: block;text-align: right;float: left;}
.security_host>div{width: 334px;height: 30px;line-height: 30px;float: left;margin-left: 10px;}
#writeCode{width: 110px;height: 28px;}
.btn{width: 80px !important;height: 25px !important;background: #e52735;border-radius: 2px;margin-top: 2px;color:#fff;margin-left:10px;border:0;height:20px;width:70px;cursor: pointer;}
.btntn{border-radius:2px;margin-top:5px;cursor:pointer;background:red;color:#fff;margin-left:10px;border:0;/*height:25px;width:75px;*/}
.cash_e1{float: left;width: 20px;height: 28px;line-height: 28px;float: left;text-align: center;color: #323232;}
.host_bottom{margin-top:20px;}
.verification>input{width: 110px;height: 28px;;margin-right: 10px;border: none;outline: none;white-space: nowrap;display: block;float: left;text-align: center;border: solid 1px #d9d9d9;}
.verification>button{padding: 4px 10px;color: white;font-size: 12px;border: none;outline: none;display: block;border-radius: 2px;-moz-border-radius: 2px;-webkit-border-radius: 2px;margin-top: 3px;cursor: pointer;}
.verification>a{line-height: 22px;font-size: 12px;color: #e52735;}
.host_button{width: 74px;height: 30px;background: #000;border-radius: 2px;-moz-border-radius: 2px;-webkit-border-radius: 2px;font-size: 16px;color: white;outline: none;background: #e52735 !important;margin-left: 0 !important;}
.security_main{width: 100%;}
.sure{width: 74px;height: 30px;background: #e52735;border-radius: 2px;-moz-border-radius: 2px;-webkit-border-radius: 2px;font-size: 12px;color: white;border: none;outline: none;cursor: pointer;margin-top: 9px;}
.payment{color: #a4a4a4 !important;}
.security_div .ty_div{margin-left: 165px !important;}
.affirm{width: 712px;height: 240px;clear: both;}
.affirm_div{height: 30px;margin-bottom: 30px;white-space: nowrap}
.affirm_div_span{color:red;font-size:12px;width:70px;white-space: nowrap}
.newPassw{color:red;font-size:12px;width:70px;}
.information{color:red;font-size:12px;width:70px;margin-left: 10px;}
.affirm_div>span{width:240px;height: 30px;line-height: 30px;text-align: right;float: left;font-size: 14px; color: #323232;}
.affirm_div>input{width: 218px;height: 28px;line-height: 28px;text-align: center;float: left;font-size: 14px;color: #323232;margin-left: 12px;border: solid 1px #d9d9d9;outline: none;}
.affirm_div>a{font-size: 12px;color: #3282ff;height: 28px;line-height: 28px;margin-left: 10px;}
.affirm_div>button{width: 74px;height: 30px;cursor:pointer;margin-left:300px;background: #e52735;border: none;outline: none;font-size: 16px;color: white;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;}
.affirm_div_btn2{background:#ccc;}
.nowrap{color:red;font-size:12px;white-space: nowrap}
#newPhonenum{width: 218px;height:28px;}
.host_bottom{margin-bottom: 20px;}
.next_but{width: 670px !important;text-align: center;}
.next_but>button{margin: 0 auto;display: inline-block;}
</style>

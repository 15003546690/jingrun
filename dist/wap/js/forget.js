　　
var forget = new AppCommon(); //new一个新活动子类
forget.init();
var app = new Vue({
	el: '#app',
	data: {
		userPhone: '',
		code: '',
		loginBtnClass: '',
		disabled:false,
		password: '',
		alainpass: '',
		loginBtnClass: ''
	},
	methods: {
		//验证码倒计时
		sendCode(){
			var myreg=/^[1][3,4,5,8][0-9]{9}$/; 
			if(this.userPhone == ''){
				layer.open({
			    content: '请输入手机号',
			    skin: 'msg',
			    time: 2
			  });
				return false;
			}else if(!myreg.test(this.userPhone)){
				layer.open({
			    content: '请输入正确的手机号码',
			    skin: 'msg',
			    time: 2
			  });
				return false;
			}else if(myreg.test(this.userPhone)){
				var loginData = {
				    countryCode: '86',
					mobile: this.userPhone,
					type: 1
				}
			forget.$POST('/message/communication/v1/sendSMS',loginData,function(data){
					if(data.resultCode === 200){
					    var seconds = 60;
					 	var btn = document.querySelector(".numBtn");
		                var timer = setInterval(()=>{
		                	btn.innerHTML = seconds+'秒后重新发送';
		                    seconds--;
		                	btn.disabled=true;
		                    if(seconds==0){
		                        btn.innerHTML = '发送验证码';
		                        clearTimeout(timer);
		                        btn.disabled=false;
		                    }
		                },1000)	
					}else{
						layer.open({
				 		    content: data.resultMessages,
				 		    skin: 'msg',
				 		    time: 2
				 		});
					}
				})
			}
		},
		//点击下一步
		loginSubmit:function(){
			//手机号提示
			if(this.userPhone == ''){
				layer.open({
			    content: '请输入手机号',
			    skin: 'msg',
			    time: 2
			  });
				return false;
			}
			var myreg=/^[1][3,4,5,8][0-9]{9}$/; 
			if (!myreg.test(this.userPhone)) {  
				layer.open({
			    content: '请输入正确的手机号码',
			    skin: 'msg',
			    time: 2
			  });
				return false;
			}
			//验证码提示
			if(this.code == ''){
				layer.open({
			    content: '请输入验证码',
			    skin: 'msg',
			    time: 2
			  });
				return false;
			}
			var datalist={
				mobile : this.userPhone,
				verificationCode: this.code
			}
			forget.$POST('/account/v1/userThirdRegister/userCerificationCode',datalist,function(data){
				if(data.resultCode != 200){
					layer.open({
			 		    content: data.resultMessages,
			 		    skin: 'msg',
			 		    time: 2
			 		});
				}else{
					$('.swiper-wrapper').animate({'marginLeft': '-100%'})
				}
			})
			
		},
		sureBtn(){
			if(this.password==''){
				layer.open({
			    content: '请输入密码',
			    skin: 'msg',
			    time: 2
			  });
				return false;
			}
			if(this.alainpass==''){
				layer.open({
			    content: '请再输入密码',
			    skin: 'msg',
			    time: 2
			  });
				return false;
			}
			if(this.password != this.alainpass){
				layer.open({
			    	content: '两次密码不一致',
			    	skin: 'msg',
			    	time: 2
			  	});
				return false;
			}
			var pass = {
				mobile:this.userPhone,
				newPassWord :this.password,
				repeatPassWord:this.alainpass
			}
			forget.$POST('/account/v1/userInfo/retrievePassWord',pass,function(data){
				if(data.resultCode!=200){
						layer.open({
					    	content: data.resultMessages,
					    	skin: 'msg',
					    	time: 2
					  	});
					}else{
						layer.open({
					    	content: '修改成功',
					    	skin: 'msg',
					    	time: 2,
					    	end:function(){
					    		window.location.href = 'login.html';
					    	}
					  	});
					}})
			}
	},
	watch: {
		userPhone: function(val) {
			this.loginBtnClass = val != '' && this.code != '' ? 'success' : ''
		},
		code: function(val) {
			this.loginBtnClass = val != '' && this.userPhone != '' ? 'success' : ''
		}
	}
})
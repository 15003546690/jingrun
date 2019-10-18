var register = new AppCommon(); //new一个新活动子类
/*var mySwiper = new Swiper ('.swiper-container',{});*/
register.init();
var channel = register.getCookie('channel');
register.uriedPoints(0,'zhuceye_02005','');
var app = new Vue({
	el: '#app',
	data: {
		mobile: '',
		code: '',
		loginBtnClass: '',
		password: '',
		againPassword: '',
		inviteCode: '',
		isAgree: '0',
		dealBtn: true,
		noAgree: false,
		yesAgree: true,
		iseye: true,
		btnSetCodeHtml:'发送验证码',
		backUrl: register.getCookie('backUrl'),
		imgCodeUrl:'',//图形验证码图片
		imgCode:'',//图形验证码内容
		imgCodeId:'',
		flag:true,
		countryCode: '86',
		country: '',
		clickCountryCode:''
	},
	created(){
		this.refreshshCode();
	},
	methods: {
		togEye() {
			this.iseye = !this.iseye;
			if(!this.iseye){
				 $(".pwdInput").attr("type", "text");
			}else{
				$(".pwdInput").attr("type", "password");
			}
		},
		countCode() {
			var html = $('.countryDialog').html();
			var _this = this;
			layer.open({
			    content: html
			    ,btn: ['确定', '取消']
  				,style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
			    ,
			    success:function(){
			    	$('.layui-m-layercont').on('click','li',function(){
			    		$('.layui-m-layercont li.active').removeClass('active');
			    		$(this).addClass('active');
			    		_this.clickCountryCode = $(this).find('span').text()
			    	})
			    }
			    ,yes: function(index){
			    	_this.countryCode = _this.clickCountryCode
			    	layer.close(index)
			    }
			});
		},
		refreshshCode(){
			var _this = this;
			register.$GET('/message/authImage',{},function(data){
				if(data.resultCode == 200){
					_this.imgCodeUrl = data.resultValue.img;
					_this.imgCodeId = data.resultValue.id;
					console.log(_this.imgCodeUrl)
				}
			})
		},
	   // 用户注册验证码校验
        getCode () {
        	var myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
        	if (!this.mobile) {
        		layer.open({
				    content: '请输入手机号码',
				    skin: 'msg',
				    time: 2
			  	});
                return false
            }else if (!myreg.test(this.mobile)&&parseInt(this.countryCode)==86) {
				layer.open({
				    content: '请输入正确的手机号码',
				    skin: 'msg',
				    time: 2
			  	});
				return false;
			}else{
				var _this = this;
				var data = {
					mobile:this.mobile
				}
				if(_this.flag){
					_this.flag = false;
					register.$POST('/account/v1/userInfo/queryUserByMobile',data,function(data){
		        		if(data.resultValue.isUser==true){
		        			layer.open({
							    content: '手机号已注册',
							    skin: 'msg',
							    time: 2
						  	});
						  	_this.flag = true;
		        			return false;
		        		}else{
		        			var content = {
				        		countryCode: _this.countryCode,
				                mobile:_this.mobile,
				                type: '0',
				                uuId:_this.imgCodeId,
				                verifyCode:_this.imgCode
				        	}
					        register.$POST('/message/communication/v2/sendSMS',content,function(data){
				                if(data.resultCode == 200){
				                	_this.flag = true;
				                    var seconds = 60;
						         	var btn = document.querySelector('.numBtn');
						            var timer = setInterval(function(){
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
				                	_this.flag = true;
									layer.open({
									    content: data.resultMessages,
									    skin: 'msg',
									    time: 2
								  	});
				                }
				            })
		        		}
		        	})
	        	}
			}
        },
	    //下一步
		nextBtn() {
			var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
			if(this.mobile == ''){
				layer.open({
				    content: '请输入手机号码',
				    skin: 'msg',
				    time: 2
			  	});
				return false;
			}else if (!myreg.test(this.mobile)&&parseInt(this.countryCode)==86) {
				layer.open({
				    content: '请输入正确的手机号码',
				    skin: 'msg',
				    time: 2
			  	});
				return false;
			}else if(this.imgCode == ''){
				layer.open({
				    content: '请输入图形验证码',
				    skin: 'msg',
				    time: 2
			  	});
                return false
			}else{
				var _this = this;
				var data = {
					mobile:this.mobile
				}
				if(_this.flag){
					_this.flag = false;
					register.$POST('/account/v1/userInfo/queryUserByMobile',data,function(data){
		        		if(data.resultValue.isUser==true){
		        			layer.open({
							    content: '手机号已注册',
							    skin: 'msg',
							    time: 2
						  	});
						  	_this.flag = true;
		        			return false;
		        		}
		        		$('.swiper-wrapper').animate({'marginLeft': '-100%'})
		        		/*else{
		        			var content = {
				        		countryCode: _this.countryCode,
				                mobile:_this.mobile,
				                type: '0',
				                uuId:_this.imgCodeId,
				                verifyCode:_this.imgCode
				        	}
					        register.$POST('/message/communication/v2/sendSMS',content,function(data){
				                if(data.resultCode == 200){
				                	
				                    var seconds = 60;
						         	var btn = document.querySelector('.numBtn');
						            var timer = setInterval(function(){
					                  	btn.innerHTML = seconds+'秒后重新发送';
					                  	seconds--;
					                  	btn.disabled=true;
					                    if(seconds==0){
					                        btn.innerHTML = '发送验证码';
					                        clearTimeout(timer);
					                        _this.flag = true;
					                        btn.disabled=false;
					                    }
						            },1000)  
				                }else{
				                	_this.flag = true;
									layer.open({
									    content: data.resultMessages,
									    skin: 'msg',
									    time: 2
								  	});
				                }
				            })
		        		}*/
		        	})
	        	}
//				register.$POST('/account/v1/userThirdRegister/userCerificationCode',data,function(data){
//			        if(data.resultCode == 200){
//						$('.swiper-wrapper').animate({'marginLeft': '-100%'})
//			        }else{
//			            layer.open({
//			               content: data.resultMessages,
//			               skin: 'msg',
//			               time: 2
//			           });
//			        }
//		     	})
			}
		},
		//注册
		register() {
			if(this.code == ''){
				layer.open({
			    	content: '请输入验证码',
			    	skin: 'msg',
			    	time: 2
			  	});
				return false;
			}
			if(this.password == ''){
				layer.open({
			    	content: '请输入密码',
			    	skin: 'msg',
			    	time: 2
			  	});
				return false;
			}
			if(this.password.length < 6){
				layer.open({
			    	content: '密码不能少于6位',
			    	skin: 'msg',
			    	time: 2
			  	});
				return false;
			}
			if(this.password != this.againPassword){
				layer.open({
			    	content: '2次输入的密码不一致',
			    	skin: 'msg',
			    	time: 2
			  	});
				return false;
			}
			if (!this.dealBtn) {
				this.noAgree = true;
				this.yesAgree = false;
            	layer.open({
			    	content: '请阅读《未来无限网服务协议》',
			    	skin: 'msg',
			    	time: 2
			  	});
                return false;
            }
        	var _this = this;
    		var data = {
    			userFrom:'3',
                clientFrom: 'wap',
                countryCode: this.countryCode,
                mobile: this.mobile,
                code: this.code,
                password: this.password,
                inviteBy: this.inviteCode,
                isAgree: 0
    		}
        	register.$POST('/account/v1/userLogin/aregisterUserInfo',data,function(data){
				if(data.resultCode!=200){
					layer.open({
				    	content: data.resultMessages,
				    	skin: 'msg',
				    	time: 2
				  	});
				}else{
					if(channel!=null){
						register.uriedPoints(0,'register','undefined',channel);
					}
					_this.login();
				}
           	})

		},
		login() {
			var _this = this;
			var loginData = {
					username: _this.mobile,
					password: _this.password
				}
			$.ajax({
				url:register.baseUrl+'uaa/oauth/token?client_id=ifuturex70sh5dl3&client_secret=ub21t5m4ypokcetebd7x082lar1frzu4&grant_type=password',
				type:'POST',
				async:true,
				data:loginData,
				dataType:'json',
				success:function(data){
					var token=data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+data.access_token;
	          		var expires_in = parseInt(data.expires_in);
	          		register.setCookie('token',token,expires_in);
	          		register.setCookie('refreshToken',data.refresh_token,expires_in);
	          		layer.open({
					    content: '登录成功!'
					    ,skin: 'msg'
					    ,time: 2
					    ,end:function(){
					    	if(_this.backUrl == null){
					    		
					    	}else{
					    		window.location.href = _this.backUrl;
					    	}
					    }
					});
				},
				error:function(data){
					layer.open({
					    content: data.resultMessages,
					    skin: 'msg',
					    time: 2
					});
				}
			})
		},
		//未同意条款提示
		showLayer() {
			layer.open({
		    	content: '请阅读《未来无限网服务协议》',
		    	skin: 'msg',
		    	time: 2
		  	});
		},
		//点击是否同意条款
		toggle(){
			this.dealBtn = !this.dealBtn;
			if(!this.dealBtn){
				this.noAgree = true;
				this.yesAgree = false;
			}else{
				this.noAgree = false;
				this.yesAgree = true;
			}
		}
	},
	watch: {
		// mobile: function(val) {
		// 	this.loginBtnClass = val != '' && this.imgCode != '' ? 'success' : ''
		// },
		// imgCode: function(val) {
		// 	this.loginBtnClass = val != '' && this.mobile != '' ? 'success' : ''
		// },
		// code: function(val) {
		// 	this.loginBtnClass = val != '' && this.password != '' ? 'success' : ''
		// },
		password: function(val) {
			this.loginBtnClass = val != '' && this.againPassword != '' ? 'success' : ''
		},
		againPassword: function(val) {
			this.loginBtnClass = val != '' && this.password != '' ? 'success' : ''
		}
	}
})
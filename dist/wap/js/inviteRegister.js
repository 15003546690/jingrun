var register = new AppCommon(); //new一个新活动子类
/*var mySwiper = new Swiper ('.swiper-container',{});*/
register.init();
register.uriedPoints(0,'yaoqingzhuce','');

var app = new Vue({
	el: '#app',
	data: {
		mobile: '',
		code: '',
		loginBtnClass: '',
		password: '',
		againPassword: '',
		inviteCode: register.GetQueryString('code'),
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
		country: count,
		clickCountryCode:'',
		isShowText: false
	},
	created(){
		this.refreshshCode();
	},
	methods: {
		showModal() {
			$('.modal_con').show();
		},
		closeModal() {
			$('.modal_con').hide();
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
        	this.code = '';
        	var myreg=/^[1][3,4,5,8][0-9]{9}$/; 
        	if (!this.mobile) {
        		layer.open({
				    content: '请输入手机号码',
				    skin: 'msg',
				    time: 2
			  	});
                return false
            }else if (!myreg.test(this.mobile)) {
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
				                    var seconds = 60;
						         	var btn = document.querySelector('.numBtn');
						            var timer = setInterval(function(){
					                  	btn.innerHTML = seconds+'s';
					                  	seconds--;
					                  	btn.disabled=true;
					                    if(seconds==0){
					                        btn.innerHTML = '获取验证码';
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
		        		}
		        	})
	        	}
			}
        },
	    //下一步
		nextBtn() {
			var myreg=/^[1][3,4,5,8][0-9]{9}$/;
			if(this.mobile == ''){
				layer.open({
				    content: '请输入手机号码',
				    skin: 'msg',
				    time: 2
			  	});
				return false;
			}else if (!myreg.test(this.mobile)) {
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
				                	$('.swiper-wrapper').animate({'marginLeft': '-100%'})
				                    var seconds = 60;
						         	var btn = document.querySelector('.numBtn');
						            var timer = setInterval(function(){
					                  	btn.innerHTML = seconds+'s';
					                  	seconds--;
					                  	btn.disabled=true;
					                    if(seconds==0){
					                        btn.innerHTML = '获取验证码';
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
		        		}
		        	})
	        	}
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
			}else if(this.password == ''){
				layer.open({
			    	content: '请输入密码',
			    	skin: 'msg',
			    	time: 2
			  	});
				return false;
			}else if(this.password.length < 6){
				layer.open({
			    	content: '密码不能少于6位',
			    	skin: 'msg',
			    	time: 2
			  	});
				return false;
			}else if (!this.dealBtn) {
				this.noAgree = true;
				this.yesAgree = false;
            	layer.open({
			    	content: '请阅读《未来无限网服务协议》',
			    	skin: 'msg',
			    	time: 2
			  	});
                return
            }else{
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
						$('.swiper-wrapper').animate({'marginLeft': '-200%'})
					}
	           	})
            }
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
	}
})
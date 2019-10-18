　　
var login = new AppCommon(); //new一个新活动子类
login.init();
login.uriedPoints(0,'dengluye_02004','');
var app = new Vue({
	el: '#app',
	data: {
		userName: '',
		password: '',
		loginBtnClass: '',
		backUrl:login.getCookie('backUrl')
	},
	methods: {
		loginSubmit:function(){
			var _this = this;
			if(this.userName == ''){
				layer.open({
			    content: '请输入用户名'
			    ,skin: 'msg'
			    ,time: 2 
			  });
				return false;
			}
			var myreg=/^[1][3,4,5,8][0-9]{9}$/; 
			if (!myreg.test(this.userName)) {  
				layer.open({
			    content: '请输入正确的手机号码',
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
			var loginData = {
					username: this.userName,
					password: this.password
				}
			$.ajax({
				url:login.baseUrl+'uaa/oauth/token?client_id=ifuturex70sh5dl3&client_secret=ub21t5m4ypokcetebd7x082lar1frzu4&grant_type=password',
				type:'POST',
				async:true,
				data:loginData,
				dataType:'json',
				success:function(data){
					if(data.resultCode == undefined){
						var token=data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+data.access_token;
		          		var expires_in = parseInt(data.expires_in);
		          		login.setCookie('token',token,expires_in);
		          		login.setCookie('refreshToken',data.refresh_token,expires_in);
		          		layer.open({
						    content: '登录成功!'
						    ,skin: 'msg'
						    ,time: 2
						    ,end:function(){
						    	window.location.href = _this.backUrl;
						    }
						});
					}else{
						// alert(JSON.stringify(data))
						layer.open({
						    content: data.resultMessages
						    ,skin: 'msg'
						    ,time: 2
						});
					}
				},
				error:function(data){
					layer.open({
					    content: '网络错误！',
					    skin: 'msg',
					    time: 2
					});
				}
			})
			// login.$NTPOST('uaa/oauth/token',loginData,function(data){
			// 	if(data.resultCode === 200){
			// 		history.go(-1);
			// 	}else{
			// 		layer.open({
			// 		    content: data.resultMessages
			// 		    ,skin: 'msg'
			// 		    ,time: 2 
			// 		});
			// 	}
			// })
		}
	},
	watch: {
		userName: function(val) {
			this.loginBtnClass = val != '' && this.password != '' ? 'success' : ''
		},
		password: function(val) {
			this.loginBtnClass = val != '' && this.userName != '' ? 'success' : ''
		}
	}
})
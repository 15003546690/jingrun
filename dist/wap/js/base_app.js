function AppCommon(){
	// this.baseUrl = 'https://api.ifuturex.com:443/';//http://192.168.0.13:7500/
	this.baseUrl ='http://192.168.0.13:7500/';
  	// this.baseUrl ='http://192.168.0.202:7500/';
	// this.baseUrl = 'http://np.ifuturex.com:7500/';
	this.token=this.getCookie('token');
	// this.token = '';
	this.refreshToken=this.getCookie('refreshToken');
	this.activityId='';
	this.phImg = '';
	this.actStage = 1;   //等于2是查看话题
	this.rankShow = false;
	this.callFlag = true;
	this.browser= null;
	this.code='';
	this.commonUrl='http://192.168.0.13';//https://www.ifuturex.com;
	this.downUrl='https://www.ifuturex.com/webApp/invite/invitation.html?code='+this.code;
	this.downUrlDefu='https://www.ifuturex.com/webApp/download/download.html';//http://a.app.qq.com/o/simple.jsp?pkgname=com.presaint.mhexpress
	this.share = {
		name:'',
		introduce:'', 
		shareIcon:'http://weilaiwuxianwang.oss-cn-beijing.aliyuncs.com/active/logo.png',
		url:window.location.href+'&time='+Date.now()
	};
}
AppCommon.prototype={
	init:function(callback){
		this.activityId = this.GetQueryString('activityId') || '';
		var _this = this;
		if(_this.browser == 'mhexpresss'){
			this.setCookie('token',_this.token,7199);
			_this.shareSet();
      		_this.showNewActivity(callback);
		}else{
			if(_this.token == null){
				$.ajax({
					url:_this.baseUrl+'uaa/oauth/token?client_id=ifuturex70sh5dl3&client_secret=ub21t5m4ypokcetebd7x082lar1frzu4&grant_type=client_credentials',
					type:'POST',
					async:true,
					dataType:'json',
					success:function(data){
						var token=data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+data.access_token;
		          		var expires_in = parseInt(data.expires_in);
		          		_this.setCookie('token',token,expires_in);
		          		_this.token = token;
		          		_this.showNewActivity(callback);
					}
				})
			}else{
				_this.token = _this.getCookie('token');
				// alert('token3=='+_this.token)
				// if(callback != undefined){
					_this.showNewActivity(callback);
				// }
			}
		}
	},
	newInit:function(callback){
		this.activityId = this.GetQueryString('activityId') || '';
		var _this = this;
		if(_this.token == null){
				$.ajax({
					url:_this.baseUrl+'uaa/oauth/token?client_id=ifuturex70sh5dl3&client_secret=ub21t5m4ypokcetebd7x082lar1frzu4&grant_type=client_credentials',
					type:'POST',
					async:true,
					dataType:'json',
					success:function(data){
						var token=data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+data.access_token;
		          		var expires_in = parseInt(data.expires_in);
		          		_this.setCookie('token',token,expires_in);
		          		_this.token = token;
		          		callback();
					}
				})
			}else{
				_this.token = _this.getCookie('token');
				callback();
			}
	},
	showNewActivity:function(callback){
		// alert(callback)
		var _this = this;
		// alert(_this.activityId)
		if(_this.activityId != '' ){
			_this.$POST('activity/v1/activity/showNewActivity',{activityId:_this.activityId},function(data){
				// alert(data.resultCode)
				if(data.resultCode == 200){
					
					
					_this.phImg = data.resultValue.rankImg.app;
					_this.actStage = data.resultValue.actStage;
					_this.rankShow = data.resultValue.rankShow;

					_this.share.name = data.resultValue.shareMsg.activityName;
					_this.share.introduce = data.resultValue.shareMsg.title;
					// _this.share.shareIcon = data.resultValue.shareMsg.img;
					_this.shareSet();
					if(callback != undefined){
						callback();
					}
					// _this.share.url = data.resultValue.shareMsg.url;
					//原生APP里的查看话题按钮显示与否
					var htshow = _this.actStage>=2 ? true : false;
					if (window.webkit) {
						window.webkit.messageHandlers.CKHT.postMessage({id:_this.activityId,isShowGroup:htshow});
					} else if (window.android) {
						window.android.CKHT(_this.activityId,htshow);
					}
					
				}else if(data.resultCode === 10128){

					window.location.replace(_this.commonUrl+'/wap/authError.html')
				}
			})
		}
	},
	openPH:function(phImg){
		var phImg = phImg || this.phImg;
		if(this.browser == 'mhexpresss'){
			if (window.webkit) {
				window.webkit.messageHandlers.HD_PH_IMG.postMessage(phImg)
			} else if (window.android) {
				window.android.HD_PH_IMG(phImg);
			}
		}else{
			window.location.href=this.downUrl;
		}
	},
	openShare:function(){
		if (window.webkit) {
			window.webkit.messageHandlers.FXX_.postMessage('')
		} else if (window.android) {
			window.android.FXX_('')
		}
	},
	shareSet:function(){
		if (window.webkit) {
			window.webkit.messageHandlers.share.postMessage({name: this.share.introduce, introduce: this.share.name, shareIcon: this.share.shareIcon, url: this.share.url})
		} else if (window.android) {
			// _this.token = 'Bearer '+ window.android.getToken();
			window.android.share(this.share.name,this.share.introduce, this.share.shareIcon, this.share.url);
		}
	},
	GetQueryString: function(name) {
		return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
	},
	setCookie : function(name, value,m)  {
	   var d = new Date;
	   var m = m || 1000000
	    d.setTime(d.getTime() + m*1000);
	    // d.setTime(d.getTime())
	    // console.log(Date.parse(d))
	    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
	},
	getCookie :function (name) {
	  var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	  return v ? v[2] : null;
	},
	delCookie : function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=this.getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	},
	$POST: function(url, data, success,error) {
		console.log('token==>'+this.token)
		var xhr = this.getXMLHttpRequest();
		var url = this.baseUrl + url + signParam();
		console.log(url)
		xhr.open("post", url);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.setRequestHeader("Authorization", this.token);
		xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
		var data = data || '{}';
		xhr.send(JSON.stringify(data));
		xhr.onreadystatechange = function() {
			// alert('readyState==>'+xhr.readyState+'xhr.status==>'+xhr.status)
			if (xhr.readyState == 4 && xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				if (typeof success === 'function') {
					success(data);
				}
			}else{
				if (typeof error === 'function') {
					error(data);
				}
			}
		};
	},
	$GET: function(url, data, success) {
		console.log('token==>'+this.token)
		var xhr = this.getXMLHttpRequest();
		var url = this.baseUrl + url + signParam();
		console.log(url)
		xhr.open("get", url);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.setRequestHeader("Authorization", this.token);
		xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
		var data = data || '{}';
		xhr.send(JSON.stringify(data));
		xhr.onreadystatechange = function() {
			// alert('readyState==>'+xhr.readyState+'xhr.status==>'+xhr.status)
			if (xhr.readyState == 4 && xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				if (typeof success === 'function') {
					success(data);
				}
			}
		};
	},
	$NTPOST: function(url, data, success) {
		var xhr = this.getXMLHttpRequest();
		var url = this.baseUrl + url;
		xhr.open("post", url);
		xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
		var data = data || '{}';
		xhr.send(JSON.stringify(data));
		xhr.onreadystatechange = function() {
			console.log('readyState==>'+xhr.readyState+'xhr.status==>'+xhr.status)
			if (xhr.readyState == 4 && xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				if (typeof success === 'function') {
					success(data);
				}
			}
		};
	},
	uriedPoints:function(trackType,trackKey,eventValue,trackDesc,opportunity){
		console.log('埋点了')
		var _this = this;
		setTimeout(function(){
			var postData = {
				clientId:3,
				trackType:trackType || 0,//埋点类型（ 0-默认 1-活动 2-题材组 3-题材 4-专题）
				trackKey:trackKey,
				trackState:window.location.href,
				eventValue:eventValue,//埋点事件（值） （根据类型填写活动ID，题材组ID，题材ID， 未定义：undefined）
				userIp:returnCitySN.cip,
				opportunity:opportunity || 0,//埋点触发时机 0普通 1分享
				trackDesc:trackDesc||''

			}
			_this.$POST('share/v1/track/addTrackLog',postData,function(data) {

			})
		},1000)
	},
	getXMLHttpRequest: function() {
		var xhr;
		if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = null;
		}
		return xhr;
	},
	inviteClick:function(activityId){//查看话题
		var activityId = activityId || this.activityId;
		if(this.browser == 'mhexpresss'){
			if (window.webkit) {
				window.webkit.messageHandlers.HD_TCZ.postMessage(activityId)
			} else if (window.android) {
				window.android.HD_TCZ(activityId)
			}
		}else{
			// window.location.href=this.downUrlDefu;
			window.location.href=this.commonUrl+'/wap/#/topicsList/'+this.activityId
		}
	},
	scrollTo:function(id){
		var num = $('#'+id).offset().top+'px';
		$("html,body").animate({scrollTop: num }, 500);
	},
	isLogin(){
		if (this.browser == 'mhexpresss') {
			return true;
		}else{
			if(this.refreshToken == null){
				return false;
			}else{
				return true;
			}
		}
	}
}
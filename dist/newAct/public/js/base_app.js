function AppCommon(){
	this.baseUrl = 'https://api.ifuturex.com:443/';//http://192.168.0.13:7500/
	this.token='';
	this.activityId='';
	this.share = {
		name:'',
		introduce:'',
		shareIcon:'http://weilaiwuxianwang.oss-cn-beijing.aliyuncs.com/active/logo.png',
		url:''
	};
}
AppCommon.prototype={
	init:function(callback){
		if (window.webkit) {
			window.webkit.messageHandlers.share.postMessage({name: this.share.name, introduce: this.share.introduce, shareIcon: this.share.shareIcon, url: this.share.url})
			this.activityId = this.getParm(window.location.href,'activityId') || '';
		} else if (window.android) {
			_this.token = 'Bearer '+ window.android.getToken();
			this.activityId = this.getParm(window.location.href,'activityId') || '';
			window.android.share(this.share.introduce,this.share.name, this.share.shareIcon, this.share.url);
		}
		callback();
	},
	getParm: function(url, key) {
		var escapeReg = function(source) {
			return String(source)
				.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
		};
		var reg = new RegExp(
			"(^|&|\\?|#)" +
			escapeReg(key) +
			"=([^&]*)(&|\x24)",
			"");
		var match = url.match(reg);
		if (match) {
			var result = match[2].substring(match[2].length - 1, match[2].length);
			return result == '#' ? match[2].substring(0, match[2].length - 1) : match[2];
		}

		return null;
	},
	$POST: function(url, data, success) {
		var xhr = this.getXMLHttpRequest();
		var url = this.baseUrl + url;
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
			}
		};
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
	inviteClick:function(){//查看话题
		if (window.webkit) {
			window.webkit.messageHandlers.DAILY_GROUP_.postMessage(this.activityId)
		} else if (window.android) {
			window.android.DAILY_GROUP_(this.activityId,true)
		}
	}
}
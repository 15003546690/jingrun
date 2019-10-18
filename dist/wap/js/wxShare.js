var share = new AppCommon();
function shareInit(shareData,huidiao){
	var postData={
		url:window.location.href
	}
	// alert(postData.url)
	share.$POST('account/callback/v1/auth/wechat/jsapi',postData,function(data){
		// console.log(data.resultValue)
		if(data.resultCode == 200){
			wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: data.resultValue.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
			    timestamp: data.resultValue.timestamp, // 必填，生成签名的时间戳
			    nonceStr: data.resultValue.nonceStr, // 必填，生成签名的随机串
			    signature: data.resultValue.signature,// 必填，签名，见附录1
			    jsApiList: ['onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});

			shareSet(shareData,huidiao)
		}
	})
}
function shareSet(shareData,callback){
	// console.log(JSON.stringify(data))
	wx.ready(function() {
		//分享朋友圈
		wx.onMenuShareTimeline({
		    title: shareData.title, // 分享标题
		    link: shareData.link, // 分享链接，该链接域名必须与当前企业的可信域名一致
		    imgUrl: shareData.imgUrl, // 分享图标
		    success:function(){
		    	callback()
		    }
		});
		//分享给朋友
		wx.onMenuShareAppMessage({
		    title: shareData.title, // 分享标题
		    desc: shareData.desc, // 分享描述
		    link: shareData.link, // 分享链接，该链接域名必须与当前企业的可信域名一致
		    imgUrl: shareData.imgUrl, // 分享图标
		    success:function(){
		    	callback()
		    }
		});

		//分享到QQ
		wx.onMenuShareQQ({
		    title: shareData.title, // 分享标题
		    desc: shareData.desc, // 分享描述
		    link: shareData.link, // 分享链接
		    imgUrl: shareData.imgUrl, // 分享图标
		    success:function(){
		    	callback()
		    }
		});
		//分享到微博
		wx.onMenuShareWeibo({
		    title: shareData.title, // 分享标题
		    desc: shareData.desc, // 分享描述
		    link: shareData.link, // 分享链接
		    imgUrl: shareData.imgUrl, // 分享图标
		    success:function(){
		    	callback()
		    }
		});

		//分享到qzone
		wx.onMenuShareQZone({
		    title: shareData.title, // 分享标题
		    desc: shareData.desc, // 分享描述
		    link: shareData.link, // 分享链接
		    imgUrl: shareData.imgUrl, // 分享图标
		    success:function(){
		    	callback()
		    }
		});
	})
}
//判断微信浏览器
function isWeixinBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }	
}
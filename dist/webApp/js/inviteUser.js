var config={
	token:'',
	baseUrl:'https://api.ifuturex.com:443',
	init:function(){
		var _this = this;
		if (window.webkit) {
			window.webkit.messageHandlers.share.postMessage({name: '奖励这么大，带朋友一起来看看！', introduce: '呼朋唤友赚福利，邀请好友一起玩！', shareIcon: 'http://weilaiwuxianwang.oss-cn-beijing.aliyuncs.com/active/logo.png', url: location.href})
		} else if (window.android) {
			_this.token = 'Bearer '+ window.android.getToken();
			window.android.share('奖励这么大，带朋友一起来看看！', '呼朋唤友赚福利，邀请好友一起玩！', 'http://weilaiwuxianwang.oss-cn-beijing.aliyuncs.com/active/logo.png', location.href)
		}
		save(_this.token);
	},
	getUserInfo:function(){
		var _this = this;
		var getParm={
			client_id:'ifuturex70sh5dl3',
			client_secret:'ub21t5m4ypokcetebd7x082lar1frzu4',
			timestamp:Math.floor(new Date().getTime() / 1000)
		}
		var timestamp = Math.floor(new Date().getTime() / 1000);
		//拉取用户信息
		// alert('_this.token==>>>>'+_this.token)
		// save(_this.token);
	}
}
function getToken(v){
	config.token = v;
	save(config.token);
	// return v;				
}
config.init();

 function getXMLHttpRequest() { 
  	var xhr;  
  	if(window.ActiveXObject) {  
	   	xhr= new ActiveXObject("Microsoft.XMLHTTP");  
    }else if (window.XMLHttpRequest) {  
        xhr= new XMLHttpRequest();  
    }else {
        xhr= null;  
    }  
    return xhr;  
}  
function save(token) {
  var xhr = getXMLHttpRequest();  
  var url = config.baseUrl+'/activity/v1/invitation/userInvitation'
  xhr.open("post",url);  
  xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");  
  xhr.setRequestHeader("Authorization",token);  
  xhr.setRequestHeader("Accept","application/json, text/plain, */*");  
  var data = "{}";
  xhr.send(data);  
  xhr.onreadystatechange= function() {
// alert('readyState==>'+xhr.readyState+'xhr.status==>'+xhr.status)
   	if(xhr.readyState == 4 && xhr.status == 200) {  
        var data = JSON.parse(xhr.responseText); 
        // alert('data==>'+data)
        var invite = data.resultValue;
        console.log(invite)
		var code = '<p class="inviteNum_top_left_head"><img src="'+invite.userInvitationInfo.img+'"/></p><p class="inviteNum_top_left_text">'+invite.userInvitationInfo.nickName+'</p>';
		$('#userInfo').html(code);
		$('.inviteNum_top_num').text('您已成功邀请<i>'+invite.userInvitationInfo.invitedCount+'</i>人')
		$('#five').text(invite.five);
		$('#ten').text(invite.ten);
		$('#fiftyECard').text(invite.fiftyECard);
		$('#oneHundredECard').text(invite.oneHundredECard);
		$('#twoHundredECard').text(invite.twoHundredsECard);
		$('#fiftyECardCount').text('（库存：'+invite.fiftyECardCount+'）');
		$('#oneHundredECardCount').text('（库存：'+invite.oneHundredECardCount+'）');
		$('#twoHundredsECardCount').text('（库存：'+invite.twoHundredsECardCount+'）');
   	}  
};  
}

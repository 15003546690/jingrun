;(function ($) {
    $.fn.alertDialog=function (options) {
        var defaults={
            text:'',
            img:'',
            zhuangtai:false,//true 中奖  flase未中奖
            browser:'',
            jpType:2,
            winIdname:'',//未领取
            chengongbtn:'',//成功返回的数据
            yes:function(){},
            no:function(){},
            share:function(){}
        };
        var AlertOptions=$.extend(defaults,options);
        var _this = this;
        function init(){
        	var imgCode = '';
        	if(AlertOptions.chengongbtn === ''){//普通弹层
        		if(AlertOptions.zhuangtai && AlertOptions.text != '继续努力'){
        			imgCode+='<img class="winning" src="img/winning.png"/>'
    			}else{
    				if(AlertOptions.text != '继续努力'){
    					imgCode+='<img class="winning" src="img/winning.png"/>'
    				}else{
    					imgCode+='<img class="lostImf" src="img/lost.png"/>'
    				}
    				
    			}
        	}else if(AlertOptions.chengongbtn){//领取成功弹层
        		imgCode='<img class="shiwucheng" src="img/shiwucheng.png"/>'
        	}else{//领取失败弹层
        		imgCode='<img class="lostImf" src="img/lost.png"/>'
        	}
        	
        	
        	var temp ='';
        	if($('#lijieDialog').length<1){
        		temp += '<div id="lijieDialog">'
        	}
        	
        		temp += '<div class="material"><div class="material_mian"><div class="material_mian_body">'
        		temp +='<div class="material_mian_body_list"><p class="body_list">'
        	
				temp+=imgCode
			
//				
                if(AlertOptions.chengongbtn === ''){//普通弹层
                	if(AlertOptions.img !='' && AlertOptions.text != '继续努力'){
                		temp+='</p><div class="body_list_kimin"><p class="body_list_kimin_a"><img src="'+AlertOptions.img+'"/></p>'
                	}else if(AlertOptions.zhuangtai==false && AlertOptions.text == '继续努力'){
					    temp+='</p><div class="body_list_kimin"><p class="body_list_kimin_a body_wen">很遗憾没能中奖，感谢您的参与！</p>'
    			    }
	        	}
				if(AlertOptions.chengongbtn){
					temp+='</p><div class="body_list_kimin"><p class="body_list_kimin_a chenggong"><img src="'+AlertOptions.img+'"/></p>'
					temp+='<p class="kimin_aa">'+AlertOptions.text+'</p>'
					temp+='</div><div class="shuoming">您可以在我的兑换中查看已兑换的商品如有问题，请拨打：<a href="javascript:;">400-691-9939</a></div>'
				}else if(AlertOptions.chengongbtn === ''){
					temp+='<p class="body_list_kimin_aa">'+AlertOptions.text+'</p>'
				} 
				temp+='<div class="body_list_kimin_btn">'
				
				//判断浏览器和app
				if(AlertOptions.browser == 'mhexpresss'){//在app里
					
					if(AlertOptions.chengongbtn === ''){
						if(AlertOptions.jpType >=2 && AlertOptions.text != '继续努力'){
						    temp+='<div class="liji_btn liji_btn_hide yes"><img src="img/liji.png"/></div>'
						}else{
							temp+='<div class="kimin_btn displayFlex"><a href="javascript:;" class="closebtn">取消</a><button class="btncla no"></button></div></div>'
						}
					}else if(AlertOptions.chengongbtn){//领取成功弹层
						temp+='<div class="kimin_btn displayFlex kimin_btn_seccent"><a href="javascript:;" class="closebtn">取消</a><button class="btncla no"></button></div></div>'
					}
				}else{//在浏览器里
					if(AlertOptions.jpType >=2 ){
						temp+='<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.presaint.mhexpress" class="liji_btn liji_btn_hide"><img src="img/lijixiazai.png"/></a>'
					}else{
						temp+='<div class="kimin_btn displayFlex"><a href="javascript:;" class="closebtn">取消</a><button class="btncla no"></button></div></div>'
					}
				}
                temp+='</div>'
                
                if(AlertOptions.chengongbtn === ''){
                	if(AlertOptions.browser == 'mhexpresss'){
                	}else{
                		temp+='<img class="share" src="img/share.png"/>';
                	}
                	temp+='<img class="close" alt="关闭" src="img/close.png"/>';
                }else if(AlertOptions.chengongbtn){
                	if(AlertOptions.browser == 'mhexpresss'){
                	}else{
                		temp+='<img class="share" src="img/share.png"/>';
                	}
                	temp+='<img class="closemode" alt="关闭" src="img/close.png"/>';
                }
				temp+='</div></div><div class="tanceng"><img src="img/tishi.png"/>';
				temp+='</div></div>'
				
				if($('#lijieDialog').length<1){
					temp+='</div>';
					$('body').append(temp);
				}else{
					$('#lijieDialog').empty().html(temp)
				}
				handleClick();
				return this;
	        }
        init();
        function handleClick(){
	    	$('#lijieDialog').on('click','.close,.closebtn,.closemode',function(){
	    		close();
	    	})
	    	$('#lijieDialog').on('click','.yes',function(){
	    		AlertOptions.yes();
	    	})
	    	$('#lijieDialog').on('click','.no',function(){
	    		AlertOptions.no();
	    	})
	    	$('#lijieDialog').on('click','.share,.share_btn',function(){
	    		AlertOptions.share();
	    	})
	    }
    };
    function close(){
    	$('#lijieDialog').remove();
    }
    $.fn.alertDialog.closeAll = function(txt) {
		$('#lijieDialog').remove();
	}; 
})(jQuery);



/*用法*/
/*$('#box').alert({
    // text:'恭喜您！您参与的电影《杜月笙》甄选活动，推荐参选人已被采纳，您的现金账户余额增加了2元。感谢您的支持，请您继续关注活动后续，赢取丰厚奖励，祝您生活愉快！客服电话：400-691-9939'
    text:'今日提交次数已用完今日提交次数已用完今日提交次数已用完'
});*/
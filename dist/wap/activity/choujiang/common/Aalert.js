;(function ($) {
    $.fn.alert=function (options) {
        var defaults={
            text:'',
            callback:function(){}
        };
        
        var AlertOptions=$.extend(defaults,options);
        
        this.each(function () {
            var _this = $( this );
            var box=$("<div><div class='alert_box'></div><div class='alert-main'><div class='alert-header'><div></div><div class='alert-close'></div></div><div class='alert-content'><p>"+AlertOptions.text+"</p></div></div></div>")
            var main=$("<div class='alert-main' id='list'></div>");
            var header=$("");
            var content=$("")
//          $('#list').remove();
            $('#list').html(box);
//          box.append(main)
//          main.append(header)
//          main.append(content)
//          if(AlertOptions.text.length>15&&AlertOptions.text.length<30){
//              $('.alert-content').css({'margin-top':'38px'})
//          }else if(AlertOptions.text.length>50){
//              $('.alert-content').css({'margin-top':'0px'})
//          }else{
//              $('.alert-content').css({'margin-top':'50px'})
//          }
            $('.alert-close,.alert_box').on('click',function(){
//              $('.alert_box').css('display','none')
				box.remove();
            })
        });
    };
})(jQuery);

/*用法*/
/*$('#box').alert({
    // text:'恭喜您！您参与的电影《杜月笙》甄选活动，推荐参选人已被采纳，您的现金账户余额增加了2元。感谢您的支持，请您继续关注活动后续，赢取丰厚奖励，祝您生活愉快！客服电话：400-691-9939'
    text:'今日提交次数已用完今日提交次数已用完今日提交次数已用完'
});*/
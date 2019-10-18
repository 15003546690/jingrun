;(function ($) {
    $.fn.alert=function (options) {
        var defaults={
            text:'',
            isDownApp: null
        };
        var AlertOptions=$.extend(defaults,options);
        this.each(function () {
            var _this = $( this );
            var box=$("<div class='commonModal'></div>")
            var main=$("<div class='main_box'></div>");
            var header=$("<div class='alert-close'></div>");
            var content=$("<div class='modal_text'><p>"+AlertOptions.text+"</p></div>")
            var downApp = $("<a class='downBtn'>下载APP</a>")
            _this.append(box)
            box.append(main)
            main.append(header)
            main.append(content)
            main.append(downApp)
            $('.alert-close').on('click',function(){
                $('.commonModal').css('display','none')
            })
            $('.downBtn').on('click',function() {
            	window.location.href = 'https://www.ifuturex.com/webApp/download/download.html';
            })
            if(AlertOptions.isDownApp != null){
            	$('.downBtn').show();
            }else{
            	$('.downBtn').hide();
            }
        });
    };
})(jQuery);
/*用法*/
/*$('#box').alert({
    // text:'恭喜您！您参与的电影《杜月笙》甄选活动，推荐参选人已被采纳，您的现金账户余额增加了2元。感谢您的支持，请您继续关注活动后续，赢取丰厚奖励，祝您生活愉快！客服电话：400-691-9939'
    text:'今日提交次数已用完今日提交次数已用完今日提交次数已用完'
});*/
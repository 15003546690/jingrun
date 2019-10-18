var upload = new AppCommon();
// upload.baseUrl = 'http://192.168.10.136:7500/'
// alert('token='+upload.getCookie('token'))
//点击
  var clickImg = function(obj){
    $(obj).parent().find('.upload_input').click();
  }
  //删除
  var deleteImg = function(obj){
    $(obj).parent().find('input').val('');
    $(obj).parent().find('img.preview').attr("src","");
    //IE9以下
    $(obj).parent().find('img.preview').css("filter","");
    $(obj).hide();
    $(obj).parent().find('.addImg').show();
  }
  function getFileName(value)
{
    var pos = value.lastIndexOf("\\");
    // alert(pos)
    return value.substring(pos+1);
}
  //选择图片
  function change(file,index) {
    alert('value=lalala')
      //预览
      var pic = $(file).parent().find(".preview");
      //添加按钮
      var addImg = $(file).parent().find(".addImg");
      //删除按钮
      var deleteImg = $(file).parent().find(".delete");
      //loading
      var loading = $(file).parent().find(".item_img");
      
      // deleteImg.show();

      var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();
//       alert('file.value=='+ext)
       // gif在IE浏览器暂时无法显示
          if(ext!='png'&&ext!='jpg'&&ext!='jpeg'&&ext!='gif'&&ext!='bmp'){
             if (ext != '') {
               $('#box').alert({
                   text:"图片格式必须为gif，jpg，jpeg，bmp，png格式的图片"
               })
             } 
              return;
          }
        loading.show();
        addImg.hide();
       // html5Reader(pic,addImg,deleteImg,index);
       lrz(file.files[0], {width: 500,quality: 1}).then(function (rst) {
          
          // console.log(rst.base64);  
          var sourceSize = toFixed2(file.files[0].size / 1024)
          var totalSize = 1024*6;
          if(sourceSize >= totalSize){
            alert('图片大小超出限制，请重新选择图片！')
            loading.hide();
            addImg.show();
            return false;
          }

          var postData = {imgStr:rst.base64}
            $.ajax({
              url:upload.baseUrl+'share/v1/ditctArea/api/v1/fileUploadStr' + signParam(),
              type:'POST',
              data:JSON.stringify(postData),
              dataType:'json',
              headers:{
                "Authorization":upload.getCookie('token'),
                "Content-Type":"application/json;charset=UTF-8",
                "Accept": "application/json, text/plain, */*"
              },
              success:function(data){
                // alert('success')
                if(data.resultCode == 200){
                  pic.attr("src",data.resultValue.url);
                  $('.imgInput').eq(index-1).val(data.resultValue.url);
                  addImg.hide();
                  deleteImg.show();
                  loading.hide();
                }else{
                  // alert('xxx')
                }
              },
              error:function(data){
                alert(JSON.stringify(data))
              }
            })
       }).catch(function (err) {
          alert('图片格式不符合规则，请重新选择图片')
          loading.hide();
          addImg.show();
          $(file)
            /* 处理失败后执行 */
        })
       
  }
  function toFixed2 (num) {
    return parseFloat(+num.toFixed(2));
}

 //H5渲染
  function html5Reader(pic,addImg,deleteImg,index){
    // alert("#pageForm"+index)
     $("#pageForm"+index).ajaxSubmit({
        type: "POST",
        url:upload.baseUrl+"/share/v1/ditctArea/api/v1/fileUploadAPP" + signParam(),
        dataType: "json",
        headers:{
          "Authorization":upload.token
        },
        beforeSubmit:function(){
          alert('come')
        },
          success: function(data){
            if(data.resultCode == 200){
              pic.attr("src",data.resultValue.url);
              $('.imgInput').eq(index-1).val(data.resultValue.url);
            }
          },
          error:function() {
            alert('error')
          }
      });
     alert('end')
     addImg.hide();
     deleteImg.show();
  }
<template>
  <!--意见反馈-->
  <div class="feedback">
    <div class="about_kong"></div>
    <div class="feedback_content">
      <div class="feedback_title">未来无限用心倾听您的建议，如果您在使用未来无限产品时遇到问题，或者对我们有任何意见建议，欢迎在此留言，我们将关注您的问题并尽快与您联系。</div>
      <textarea id="content" placeholder="请在这里输入您的意见、建议，我们将用心倾听，不断优化产品，为您提供更优质的服务，500字..." maxlength="500" v-model='content'></textarea>
      <p>请留下您的联系方式，方便我们对您提出的建议第一时间解决，谢谢</p>
      <input  id="phone" type="text" placeholder="选填" v-model='contact'/><!--<a>手机号有误，请充填</a>--><br />
      <button @click="feedBack()">提交</button>
    </div>
    <Alert :text='alertText' v-if='alert'></Alert>
    <Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"/>
  </div>
</template>
<script>
  import Login from '@/components/common/Login'
  import Alert from '@/components/common/alert'
  export default {
    data() {
      return {
        feedBackList: [],
        contact: null,
        content: null,//内容
        phone: null,//手机
        showindexID:false,//提示框弹层显示
        isShowLoginModal:false,//登陆弹层显示
        showclean:false,//提示框弹层显示
        alert: false,
        alertText: ''
      }
    },
    components: {
      Login,
      Alert
    },
    created() {
    	this.addTrackLog();
    },
    methods: {
    	//埋点
			addTrackLog() {
				this.$Bury(window.location.href,'',0,'yijianfankui_03032')
			},
      hideLoginModal(){
        this.isShowLoginModal=false;
      },
      feedBack() {
        if(this.$store.state.refreshToken==""){
                this.isShowLoginModal=true
        }else{
        var content = document.getElementById('content').value;
        var contact = document.getElementById('phone').value;
        if(!content) {
          this.alertDailog("内容不能为空");
          return
        } else {
            this.$CPOST('/account/v1/userFeedback/addUserFeedback', {
                contact: this.contact,
                content: this.content
              },(res) => {
                this.feedBackList = res.resultValue;
                this.alertDailog("尊敬的用户您好，已收到您的反馈，未来无限网致力为用户提供更优质、更完善的服务，我们会持续改进，谢谢您的反馈！");
                this.content = '';
                this.contact = '';
              })
            }  
        }
      },
      alertDailog(txt){
				this.alert = true;
				$('.confirm_modal').show();
				this.alertText=txt;
			}
    }
  }
</script>
<style scoped>
  /*意见反馈*/
.feedback {width: 1200px;margin: 0 auto;background: white;}
.feedback_content {width: 1100px;margin: 0 auto;}
.about_kong{width: 1162px;height: 41px;border-bottom: solid 1px #ededed;margin: 0 auto;margin-bottom: 30px;}
.feedback_title {line-height: 24px;width: 928px;font-size: 18px;color: #323232;}
.feedback_content>textarea {width: 1078px;height: 145px;border: solid 1px #ccc;resize: none;padding: 4px 10px;font-size: 16px;color: #323232;margin-top: 5px;outline: none;}
.feedback_content>p {line-height: 42px;font-size: 18px;color: #323232;margin-top: 6px;margin-bottom: 1px;}
.feedback_content>input {width: 273px;height: 40px;border: solid 1px #ccc;outline: none;padding-left: 10px;}
.feedback_content>button {width: 134px;height: 42px;outline: none;border: none;background: #f13131;font-size: 20px;color: white;margin-top: 15px;cursor: pointer;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;}
.feedback_content>a{font-size: 12px;color: red;margin-left: 10px;}
.confirm_modal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box{width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or{width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head{width: 100%;height: 32px;}
.confirm_main_head>p{ float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span{display: block;float: right;cursor: pointer;}
.confirm_text-p1{text-align: center;font-size: 18px;}
.confirm_text{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;}
.confirm_btn{width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button{width: 98px;height: 32px;background: url(../../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
</style>
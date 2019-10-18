<template>
  <!--center-body-->
  <div class="center_body">
    <div class="bg_img1"></div>
    <div class="center_body_center">
      <div class="center_body_center_left">
        <div class="user_portrait">
          <div class="user_header"><router-link tag="span" to="/personal/account"><img v-lazy="this.$store.state.userImg"/></router-link></div>
          <div class="user_cord">我的未来ID：<span class="user_cordid">{{userCode}}</span></div>
          <div class="move_logo">
            <div class="move_logo_img">
              <div class="bianji">
              <img src="../../assets/img/center/Edit_Profile.png"/>
              <div class="Profile">
               	<p v-if="data<100">完善个人资料&nbsp;<router-link tag="a" to="/personal/account">编辑</router-link></p>
                <p v-if="data==100"><router-link tag="a" to="/personal/account">查看个人资料</router-link></p>
              </div>
              </div>
              <div class="weibo ">
                <img src="../../assets/img/center/weibo.png"/>
                <div class="weibo_col">
                <p v-if="wb==undefined||wb==false">您还未绑定微博&nbsp;<router-link tag="a" to="/personal/account/bind">去绑定</router-link></p>
                <p v-if="wb==true">您已绑定微博</p>
              </div>
              </div>
              <div class="shouji">
                <img src="../../assets/img/center/phone.png"/>
                <div class="shouji_col">
                <p>您已绑定手机<span class="thisphone">{{phone}}</span></p>
              </div>
              </div>
              <div class="weixin">
                <img src="../../assets/img/center/wexin.png"/>
                <div class="weixin_col">
                <p v-if="wx==undefined||wx==false">您还未绑定微信&nbsp;<span><router-link tag="a" to="/personal/account/bind" style="color:#5b9bff">去绑定</router-link></span></p>
                <p v-if="wx==true">您已绑定微信</p>
              </div>
              </div>
            </div>
            
          </div>	
          <div class="move_logo_list">
            <ul>
              <router-link to="/personal/orders" tag="li"><p>我的订单 <i></i></p></router-link>
              <router-link to="/personal/campaign" tag="li"><p>我参加的活动<i></i></p></router-link>
              <router-link to="/personal/follow" tag="li"><p>我的关注<i></i></p></router-link>
              <router-link to="/personal/assets" tag="li"><p>资产管理<i></i></p></router-link>
              <router-link to="/personal/invite" tag="li"><p>邀请好友<i></i></p></router-link>
              <router-link to="/personal/message" tag="li"><p>我的消息<i></i></p></router-link>
              <router-link to="/personal/subject" tag="li"><p>我要出题<i></i></p></router-link>
              <router-link to="/personal/account" tag="li"><p>账户设置<i></i></p></router-link>
              <router-link to="/others/feedback" tag="li"><p>意见建议<i></i></p></router-link>
              <router-link to="/others/contact" tag="li"><p>联系我们<i></i></p></router-link>
              <router-link to="/others/problems" tag="li"><p>帮助中心<i></i></p></router-link>
            </ul>
          </div>
          <div class="QuickMark">
            <div class="QuickMark_border"></div>
            <div class="QuickMark_img">
              <img src="../../assets/img/about/download.png"/>
            </div>
            <p>未来无限网APP下载更方便</p>
          </div>
        </div>
      </div>
      <div class="center_body_center_right">
        <router-view :codee='codee'></router-view>
      </div>
    </div>
    <div class="bg_img2"></div>
  </div>
</template>
<script>
	export default{
		data(){
			return{
				wb:null,
				wx:null,
				codee:null,
				userCode: null,
				phone:null,
				data: null,
				userImg:null,
				isShowLoginModal:null
			}
		},
		created(){
			setTimeout(() => {
				if(this.$store.state.refreshToken == ''){
					this.$router.push('/login');
				}
			},1000)
			setTimeout(() => {
				this.getUserCode();
			},100)
		},
		methods: {
			bangd(){
				this.$CPOST('/account/v1/userThirdRegister/queryUserSocialAccount',{},(res)=>{
               	this.wb=res.resultValue.wb;
               	this.wx=res.resultValue.wx;
            	})
			},
			getUserCode () {
		      // 根据分类获取信息
		      this.$CPOST('/account/v1/userInfo/queryUserInfo',{},(res) => {
		      	this.phone=res.resultValue.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		      	this.userImg=res.resultValue.img;
		        this.userCode=res.resultValue.inviteCode;
		        this.bangd();
				    this.grade();
		      })
		   },
		   grade() {
	        this.$CPOST('/account/v1/userEmpirical/queryUserPromotion',{},(res) => {
	          this.data = res.resultValue.complete;
	        })
	      }
		}
}

</script>
<style scoped>
.center_body_img{width: 100%;min-height: 1006px;position: relative;z-index: -1;}
.bg_img1{width: 100%;height: 278px;background: url(../../assets/img/center/bg_img1.jpg) no-repeat center;background-size: cover;}
.bg_img2{width: 100%;height: 328px;position: absolute;left: 0;bottom: 0;background: url(../../assets/img/center/bg_img2.jpg) no-repeat center;background-size: cover;}
/*center-body*/
.center_body{width: 100%;min-height: 1006px;position: relative;}
.center_body_center{width: 1214px;height: 100%;margin: 0 auto;display: table;position: relative;top: 0;left: 0;right: 0;bottom: 0;margin-top: -276px;z-index: 2;}
.center_body_center_left{float: left;width: 217px;min-height: 1006px;background: url(../../assets/img/center/left_ashde.png);background-size: 100% 100%;border-right: solid 1px #e2e5eb;}
.center_body_center_right{float: left;width: 991px;height: 1006px;background: url(../../assets/img/center/right-adsp_03.png);background-size: 100% 100%;}
.user_portrait{width: 100%;min-height: 1006px;float: right;	}
.user_header{height: 129px;overflow: hidden;width: 210px;float: right;}
.user_header>span{width: 91px;height: 91px;border: solid 4px white;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;display: block;margin: 0 auto;margin-top: 20px;cursor: pointer;}
.user_header>span>img{width: 91px;height: 91px;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;}
.user_cord{height: 27px;font-size: 14px;color: #676767;text-align: center;width: 210px;float: right;}
.move_logo{height: 42px;border-bottom: solid 1px #dcdfe8;width: 210px;float: right;}
.move_logo_img{width: 180px;height: 42px;margin-left: 9px;}
.move_logo_img>div{float: left;margin-left: 13px;}
.bianji,.weibo,.shouji,.weixin{position: relative;cursor: pointer;}
.move_logo_img>div:hover>div{display: block;z-index: 2;}
.move_logo_img>div>div{display: none;}
.Profile{width: 167px; height: 53px;position: absolute;top: 32px;left: -76px;background: url(../../assets/img/center/finsh.png) no-repeat center;background-size: 100% 100%;}
.weibo_col{width: 209px;height: 53px;position: absolute;top: 35px;left: -97px;background: url(../../assets/img/center/finsh.png) no-repeat center;background-size: 100% 100%;}
.Profile>p,.weibo_col>p{line-height: 40px;font-size: 14px;color: #676767;text-align: center;margin-top: 9px;}
.Profile>p>a,.weibo_col>p>a{color: #3282ff;}
.shouji_col{width: 209px;height: 53px;position: absolute;top: 38px;left: -100px;background: url(../../assets/img/center/finsh.png) no-repeat center;background-size: 100% 100%;}
.weixin_col{width: 209px;height: 53px;position: absolute;top: 38px;left: -100px;background: url(../../assets/img/center/finsh.png) no-repeat center;background-size: 100% 100%;}
.shouji_col>p{line-height: 40px;font-size: 14px;color: #676767;text-align: center;margin-top: 9px;}
.weixin_col>p{line-height: 40px;font-size: 14px;color: #676767;text-align: center;margin-top: 9px;}
.move_logo_list{border-top: solid 1px white;padding: 10px 0;display: inline-block;width: 100%;}
.move_logo_list>ul>li{line-height: 42px;text-align: left;font-size: 14px;color: #676767;cursor: pointer;}
.move_logo_list>ul>li:hover{color: #323232;background: white;}
.move_logo_list>ul>li>p{width:142px;margin: 0 auto;}
.move_logo_list>ul>li>p>i{width: 8px;height: 8px;border-top: solid 1px #676767;border-right: solid 1px #676767;display: inline-block;transform:rotate(7deg);-ms-transform:rotate(45deg); -moz-transform:rotate(45deg); -webkit-transform:rotate(45deg);-o-transform:rotate(45deg);float: right;margin-top: 17px;}
.move_logo_list>ul>li>img{vertical-align: middle;float: right;margin-right: 40px;margin-top: 17px;}
.router-link-active{color: #323232;background: white;}
.QuickMark{text-align: center;overflow: hidden;float: right;width: 97%;}
.QuickMark_border{height: 2px;background: url(../../assets/img/center/write_gray_03.png)no-repeat center;}
.QuickMark_img{width: 122px;height: 122px;margin: 0 auto;margin-top: 10px;}
.QuickMark_img>img{vertical-align: middle;width: 100%;}
.QuickMark>p{height: 14px;font-size: 12px;color: #656b78;text-align: center;margin-top: 10px;}
/*右半部份*/
.center_body_center_right .center_right{width: 950px;height: 1006px;float: right;margin-right: 10px;}
</style>

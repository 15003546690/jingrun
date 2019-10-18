<template>
  <!--邀请-->
  <div class="invitation">
    <div class="invitation_title">邀请好友</div>
    <div class="invitation_one">
      <div class="invitation_one_body">
        <div class="invitation_one_title">
          <p><img src="../../../assets/img/center/one.png"/>复制您的专属链接；</p>
          <button id="copy" data-clipboard-target="#copy_input">复制链接</button>
        </div>

        <p class="invite_box">
        	{{invi_txt}}<span style="display:block; width:0; height:0;overflow:hidden;"><input type="text" v-model="invi_txt" id="copy_input"></span></p>
      </div>
    </div>
    <div class="invitation_two">
      <div class="invitation_two_left">
        <p class="two_left"><img src="../../../assets/img/center/two.png"/>分享到社交平台;</p>
        <div class="two_left_div">
          <div @click='qqcode'>
            <img src="../../../assets/img/center/QQ.png"/>
            <p>QQ好友</p>
          </div>
          <div @click='qqkjcode'>
            <img src="../../../assets/img/center/QQK.png"/>
            <p>QQ空间</p>
          </div>
          <div @click='wbcode'>
            <img src="../../../assets/img/center/weibo1.png"/>
            <p>新浪微博</p>
          </div>
          <div @click="showSignModal">
            <img src="../../../assets/img/center/weixin1.png"/>
            <p>微信好友</p>
          </div>
        </div>
      </div>
      <div class="invitation_two_right">
        <div class="two_right">
          <div class="two_right_title">
            <img src="../../../assets/img/center/record.png"/><a>邀请：{{listLength}}人</a>
          </div>
          <div class="two_right_body">
            <div class="two_right_body_div" v-for="item in lists" :key="item.userId">
              <span><img :src="item.img"/></span>
              <a>{{item.nickname}}</a>
              <p>注册时间：{{formatDate(item.createTime)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="invitation_three">
      <div class="invitation_three_div">
        <img src="../../../assets/img/center/rule.png"/>
      </div>
      <div class="invitation_three_content">
        <div>
          <span>1、</span>
          <p>受邀请好友务必通过邀请人提供的专属链接或分享地址完成注册，计为邀请成功。</p>
        </div>
        <div>
          <span>2、</span>
          <p>邀请人完成邀请任务，可领取专属奖励；受邀人通过专属链接注册可获得最高价值10元新手礼包。</p>
        </div>
        <div>
          <span>3、</span>
          <p>PC端：邀请人请直接复制专属链接，发给受邀请好友，好友通过专属链接完成注册。</p>
        </div>
        <div>
          <span>4、</span>
          <p>App端：邀请人请点击“发现-我要邀请”，分享给受邀请好友，好友通过分享链接完成注册。</p>
        </div>
      </div>
    </div>
    
    <!--弹层-->
    <div class="shade" v-if="isShowSign" @click="hideSignModal">
      <div class="shade_div">
        <div class="shade_div_body">
          <div>
            <img v-bind:src="this.$base_url+'/account/v1/userInfo/userInvitationPc/'+this.code" class="aaa"/>
          </div>
          <p>微信扫一扫，马上邀请好友</p>
        </div>
      </div>
    </div>
    <Aalert :text='alertText' v-show='alert'/>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import Aalert from '../../common/alert'
export default{
	props:[
		'codee'
	],
	data() {
		return {
			listLength:'',
			lists: [],    //邀请好友列表数据
			copyFlag:false,
			isShowSign: false,   //微信邀请弹层
			code: null,    //邀请人的邀请码
			invite_title:'谁敢和我PK高智商？注册即得新人大礼包！',   //邀请的标题
      invite_desc:'立即注册未来无限网，可获得最高价值10元新手礼包，快跟我一起玩预测，享好礼吧！',
			invite_img:'https://ifuturex2016.oss-cn-beijing.aliyuncs.com/event/picture/sever-1482911775036-0.jpg',   //邀请的图片
			invi_txt:'', //点击复制链接，分享给好友的内容
			alertText:'复制成功！赶快去邀请小伙伴吧！',   //点击复制链接弹层的提示
			alert:false  //是否显示弹层
		}
	},
	components: {
		Aalert
	},
	created () {
    window.scrollTo(0,0);
		this.$Bury(window.location.href,'',0,'yaoqinghaoyou_03009')
		setTimeout(() => {
			this.inviteCode();
		},50)
		
		var _this = this;
		var clipboard = new Clipboard('#copy',{
			text:function(trigger){
				return _this.invi_txt;
			}
		});
		clipboard.on('success', function(e) {
//			
			_this.dialogShow();
			_this.alert = true;
		});
		
	},
	methods: {
		//复制链接成功显示弹层
		dialogShow(){
			$('.confirm_modal').show();
			this.$Bury(window.location.href,'',0,'yaoqingCopy_05004');
		},
		//qq分享
		qqcode(){
			this.$Bury(window.location.href,'',0,'yaoqing_qq')
			window.open('http://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent('https://www.ifuturex.com/#/register?code=') + this.code + '&title=' + this.invite_title + '&desc='+this.invite_desc +'+&pics=' + this.invite_img);
			this.shareFinish();
		},
		//qq空间分享
		qqkjcode(){
			this.$Bury(window.location.href,'',0,'yaoqing_qzone')
			window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent('https://www.ifuturex.com/#/register?code=') + this.code + '&title=' + this.invite_title + '&desc='+this.invite_desc+'&summary=&site=&pics=' + this.invite_img);
			this.shareFinish();
		},
		//微博分享
		wbcode(){
			this.$Bury(window.location.href,'',0,'yaoqing_weibo')
			window.open('http://service.weibo.com/share/share.php?url='+encodeURIComponent('https://www.ifuturex.com/#/register?code=') + this.code + '&title=' + this.invite_title + '&ralateUid=5517272291&appkey=134613650&searchPic=true&pic=' + this.invite_img);
			this.shareFinish();
		},
		//邀请成功告知后台
		shareFinish() {
    	this.$CPOST('/task/v1/task/userDoTask', {
			key: 'DAILY_SHARE',
		})
    },
    //获取邀请人的邀请码
		inviteCode() {
			this.$CPOST('/account/v1/userInfo/queryUserInfo', {},(res) => {
    		if(res.resultCode == 200){
	    		this.code = res.resultValue.inviteCode;
	    		
	    		this.invi_txt = '立即注册未来无限网，可获得最高价值10元新手礼包，快跟我一起玩预测，享好礼吧！https://www.ifuturex.com/#/register?code='+this.code;
	    		this.inviteList();
    		}
    	})
		},
		//邀请列表
		inviteList() {
			this.$CPOST('/account/v1/userInfo/queryUserInvitation',{
    		inviteCode: this.code,
			  page: 0,
			  size: 10000
    },(res) => {
    		if(res.resultCode == 200){
    			this.listLength = res.resultValue.count;
					this.lists = res.resultValue.userInfoEntitiesPage;
    		}
    	})
		},
		//时间戳转换
		formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy年mm月dd日');
		},
		//点击微信图标显示微信分享二维码的弹层
		showSignModal () {
      this.isShowSign = true;
      this.$Bury(window.location.href,'',0,'yaoqing_weixin')
   	},
   	//点击弹层关闭弹层
   	hideSignModal () {
      this.isShowSign = false;
   	}
	}
}
</script>

<style scoped>
.invitation{width: 940px;height: 1006px;margin-left: 33px;}
.invitation_title{line-height: 58px;font-size: 18px;color: #323232;font-weight: bold;}
.invitation_one{border: solid 1px #f0f0f0;width: 938px;}
.invitation_one_body{width: 896px;margin-left: 27px;}
.invitation_one_title{height: 34px;line-height: 34px;font-size: 14px;color: #666;margin-bottom: 22px;margin-top: 12px;}
.invitation_one_title>p{height: 34px;line-height: 34px;display: inline-block;float: left;}
.invitation_one_title>p>img{vertical-align: middle;margin-right: 6px;}
.invitation_one_title>button{float: right;width: 99px;height: 33px;border-radius: 2px;background: #f13131;color: white;font-size: 14px;outline: none;border: none;cursor: pointer;}
.invite_box{width: 870px;height: 76px;line-height: 20px;font-size: 14px;color: #676767;border: solid 1px #f0f0f0;outline: none;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;resize: none;padding: 10px 12px;margin-bottom: 26px;}
.invitation_two{height: 244px;margin-top: 26px;}
.invitation_two_left{width: 460px;height: 242px;border: solid 1px #eee;float: left;}
.invitation_two_right{width: 460px;height: 242px;border: solid 1px #eee;float: right;}
.two_left{line-height: 54px;font-size: 14px;color: #676767;}
.two_left>img{vertical-align: middle;margin-right: 16px;margin-top: -5px;}
.two_left_div{background: seagreen;margin-top: 30px;margin-left: 20px;}
.two_left_div>div{width: 105px;text-align: center;float: left;}
.two_left_div>div>p{line-height: 46px;font-size: 14px;color: #666;text-align: center;}
.two_right{width: 442px;height: 242px;margin: 0 auto;}
.two_right_title{line-height: 56px;}
.two_right_title>img{vertical-align: middle;}
.two_right_title>a{float: right;font-size: 14px;color: #676767;}
.two_right_body{height: 180px;overflow-y: auto;}
.two_right_body_div{height: 49px;border-bottom: dashed 1px #e1e1e1;}
.two_right_body_div>span{width: 42px;height: 49px;line-height: 49px;display: block;text-align: right;float: left;}
.two_right_body_div>span>img{width: 33px;height: 33px;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;margin-right: 5px;vertical-align: middle;}
.two_right_body_div>a{line-height: 49px;display: inline-block;float: left;font-size: 14px;color: #676767;}
.two_right_body_div>p{line-height: 49px;display: inline-block;float: right;font-size: 14px;color: #676767;margin-right: 10px;}
.two_right_body_div>i{line-height: 49px;display: inline-block;float: right;font-size: 14px;color: #676767;margin-right: 10px;}
/*邀请好友规则*/
.invitation_three{height: 270px;margin-top: 36px;	}
.invitation_three_div{line-height: 30px;text-align: center;}
.invitation_three_div>img{vertical-align: middle;}
.invitation_three_content{padding-top: 9px;}
.invitation_three_content>div{font-size: 14px;color: #676767;line-height: 30px;}
.invitation_three_content>div>span{float: left;line-height: 30px;width: 25px;}
.invitation_three_content>div>p{float: left;width: 900px;line-height: 30px;}
/*遮罩*/
.shade{width: 100%;height: 100%;background: url(../../../assets/img/center/masking_03.png);background-size: cover;position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 3;display: table;}
.shade_div{display: table-cell;vertical-align: middle;}
.shade_div_body{width: 258px;height: 333px;margin: 0 auto;}
.shade_div_body>div{height: 258px;line-height: 258px;background:white;text-align: center;}
.shade_div_body>div>img{width: 222px;height: 222px;margin: 0 auto;vertical-align: middle;}
.shade_div_body>p{height: 76px;line-height: 76px;font-size: 18px;color: #ffffff;	text-align: center;}
</style>

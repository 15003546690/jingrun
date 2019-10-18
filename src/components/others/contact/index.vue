<template>
  <!--联系我们-->
  <div class="contact">
    <div class="about_kong"></div>
    <div class="contact_map"><img src="../../../assets/img/about/contact.png"/></div>
    <ul>
      <li class="first_li1">北京京润恒远科技有限公司</li>
      <li class="first_li2">
        <div class="first_li2_div">
          <div>
            <span>公司地址：</span>
            <p>北京市朝阳区东三环南路劲松三区 甲302号华腾大厦1803 室</p>
          </div>
          <div>
            <span>联系电话：</span>
            <p>+86-10-51666533</p>
          </div>
          <div>
          	<span>客服热线：</span>
          	<p>400-691-9939</p>
          </div>
          <div>
            <span>业务邮箱：</span>
            <p>service@kinrank.com</p>
          </div>
          <div>
            <span>邮编：</span>
            <p>100021</p>
          </div>
        </div>
      </li>
      <li class="first_li3">
        <div class="first_li3_RQ">
          <div class="first_li3_RQ_left">
            <div><img src="../../../assets/img/foot-weixin.png"/></div>
            <p>微信二维码</p>
          </div>
          <div class="first_li3_RQ_right">
            <div><img src="../../../assets/img/foot-weibo.png"/></div>
            <p>微博二维码</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
	export default{
		created() {
    	this.addTrackLog();
    },
    methods: {
    	//埋点
			addTrackLog() {
				this.$Bury(window.location.href,'',0,'lianxiwomen_03031')
			}
    }
	}
</script>
<style scoped>
/*联系我们*/
.contact{width: 1200px;margin: 0 auto;background: #fff;}
.contact>.about_kong{width: 1162px;height: 41px;border-bottom: solid 1px #ededed;margin: 0 auto;margin-bottom: 30px;}
.contact_map{width: 1068px;height: 316px;margin: 0 auto;margin-bottom: 32px;}
.contact_map>img{width: 100%;height: 100%;}
.contact>ul{width: 1068px;height: 134px;margin: 0 auto;}
.contact>ul>li{float: left;}
.first_li1{width: 321px;height: 134px;line-height: 134px;font-size: 20px;color: #323232;text-align: center;}
.first_li2{width: 402px;height: 134px;font-size: 20px;color: #323232;border-right: dashed 1px #e0e0e0;border-left: dashed 1px #e0e0e0;}
.first_li2_div{width: 295px;height: 128px;margin-left: 29px;padding-top: 6px;}
.first_li2_div>div>span{width: 70px;line-height: 20px;text-align: left;font-size: 14px;color: #323232;float: left;display: block;}
.first_li2_div>div>p{width: 225px;line-height: 20px;text-align: left;font-size: 14px;color: #323232;float: left;}
.first_li3{width: 343px;height: 134px;font-size: 20px;color: #323232;}
.first_li3_RQ{width: 240px;height: 132px;margin: 0 auto;margin-top: 6px;}
.first_li3_RQ_left{float: left;width: 100px;}
.first_li3_RQ_left>div{height: 100px;width: 100px;}
.first_li3_RQ_left>div>img,.first_li3_RQ_right>div>img{width: 100%;height: 100%;}
.first_li3_RQ_left>p,.first_li3_RQ_right>p{line-height: 24px;width: 100px;font-size: 14px;color: #323232;text-align: center;margin-top: 4px;}
.first_li3_RQ_right{float: right;width: 100px;}
.first_li3_RQ_right>div{height: 100px;width: 100px;}
</style>

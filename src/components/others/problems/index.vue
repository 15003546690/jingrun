<template>
  <!--常见问题-->
  <div>
    <div class="hh"></div>
    <div class="often">
      <div class="often_search">
      </div>
      <div class="often_content">
        <div class="often_content_center">
          <div class="often_content_title">
            <div class="often_content_main">
              <router-link tag="p" to="/problems/Strategy_sharing" exact>攻略分享</router-link>
              <router-link tag="p" to="/problems/Login_registration">登录注册</router-link>
              <router-link tag="p" to="/problems/Market_planning">市场规则</router-link>
              <router-link tag="p" to="/problems/Clearing_transaction">交易清算</router-link>
              <router-link tag="p" to="/problems/Account_record">账户记录</router-link>
              <router-link tag="p" to="/problems/Currency_recharge">货币充值</router-link>
              <!--<p>新手引导</p>-->
              <p @click="newHelp">新手引导</p>
            </div>
          </div>
            <div class="often_content_body">
              <router-view></router-view>
            </div>
        </div>
      </div>
    </div>
   <!--新手引导跳转页-->
    <div class="guild_list" v-if="guildList">
    
	   <div class="guide_img01" v-if="guideImg01==1">
	      <div class="guideNext">
	      	<p class="guideNext_p">选择您感兴趣的题材，开启预测之旅</p>
	      	<a href="javascript:;" @click="nextBtn1()">下一步</a>
	      	<p class="guideNext_pp"></p>
	      </div>
	      <button class="guideButton" @click="guideButton()"></button>
	    </div>
	    <div class="guide_img02" v-if="guideImg01==2">
	      <div class="guideNext">
	      	<a href="javascript:;" @click="nextBtn1()">下一步</a>
	      	<p class="guideNext_pp"></p>
	      </div>
	      <button class="guideButton" @click="guideButton()"></button>
	    </div>
	    <div class="guide_img03" v-if="guideImg01==3">
	      <div class="guideNext">
	      	<a href="javascript:;" @click="nextBtn1()">下一步</a>
	      	<p class="guideNext_pp"></p>
	      </div>
	      <button class="guideButton" @click="guideButton()"></button>
	    </div>
	    <div class="guide_img04" v-if="guideImg01==4">
	    	<div class="guideNext">
	      	<a href="javascript:;" @click="guideButton()">朕知道了</a>
	      	<p class="guideNext_pp"></p>
	      </div>
	      <button class="guideButton" @click="guideButton()"></button>
	    </div>
	  </div>
  </div>
</template>
<script>
	export default{
		data(){
			return{
				guildList:false,//新手引导最外层
				guideImg01:1//第一个图
			}
		},
		methods: {
			newHelp(){
				this.guildList = true;
				this.guideImg01 = 1;
				this.$Bury(window.location.href,'',0,'xinshouyindao_03027')
			},
			guideButton(){
				this.guildList = false;
			},
      nextBtn1(){
				this.guideImg01 ++;
			}
		}
	}
</script>
<style scoped>
.guild_list{width: 100%;height: 100%;max-width: 1920px;min-width: 1200px;position: fixed;z-index: 100;top: 0;left: 0;overflow: hidden;background-color: #aaa;font-size: 0;}
.guild_list>div{width: 100%;height: 100%;position: relative;overflow-x: hidden;overflow: hidden;}
.guild_list>div>img{width: 100%;height: auto;}
.guide_next{position: absolute; display: block;}
.guide_img01{background: url(../../../assets/img/redPacket/guide01.jpg)no-repeat center top;background-size: cover;}
.guide_img02{background: url(../../../assets/img/redPacket/guide02.jpg) no-repeat center top;background-size: cover;}
.guide_img03{background: url(../../../assets/img/redPacket/guide03.jpg) no-repeat center top;background-size: cover;}
.guide_img04{background: url(../../../assets/img/redPacket/guide04.jpg) no-repeat center top;background-size: cover;}
.guideNext{width: 387px;position: absolute;top: 75%;left: 0;right: 0;margin: 0 auto;overflow: hidden;}
.guideNext_p{height: 36px;color: #fff;font-size: 22px;text-align: center;}
.guideNext>a{width: 94px;line-height: 94px;border: solid 2px #fff;display: block;margin: 0 auto;border-radius: 50%;color: #fff;font-size: 14px;text-align: center;}
.guideNext_pp{height: 1000px;width: 2px;background: #fff;margin: 0 auto;}
.guideButton{width: 2%;height: 6.5%;position: absolute;top: 6px;right: 5px;border: none; border-radius: 50%;cursor: pointer;opacity: 0;filter: alpha(opacity=0);}
/*常见问题*/
.hh{height: 252px;width: 100%;position: absolute;z-index: 1;background: url(../../../assets/img/about/familiar.png) no-repeat center;background-size: cover;}
.often{width: 1200px;margin: 0 auto;position: relative;z-index: 2;}
.often_search{height: 113px;padding-top: 55px;}
.often_content{width: 1200px;background: #fff;}
.often_content_center{width: 1160px;margin: 0 auto;background: #fff;padding-top: 26px;}
.often_content_title{height: 57px;border-bottom: solid 1px #ededed;margin-bottom: 26px;}
.often_content_main{width: 1144px;height: 57px;margin: 0 auto;}
.often_content_main>p{width: 137px;height: 56px;line-height: 56px;text-align: center;font-size: 18px;color: #323232;border-bottom: solid 1px white;float: left;cursor: pointer;margin-right:16px;margin-left: 10px;}
.often_content_main .router-link-active{border-bottom: solid 1px #e52735 !important;}
</style>

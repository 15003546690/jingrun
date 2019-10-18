<template>
  <div class="index_Question">
    <ul>
      <!--攻略分享-->
      <li class="li_first1 " >
      	<router-link to="/problems/Strategy_sharing" tag="a">
      		<div class="commonStyle">
        	<p class="Raiders">攻略分享</p>
          <span>查看详情</span>
           </div>
      		</router-link>
      </li>
      <!--帮助中心-->
      <li class="question_li">
      	<router-link to="others/problems" tag="a">
        	<p class="question_head">新手问答</p>
          <span>更多问题</span>
          </router-link>
      </li>
      <!--账户记录-->
      <li class="li_first2">
      	<router-link to="/problems/Account_record" tag="a">
	        <div class="commonStyle">
	        	<p class="Raiders">账户记录</p>
	          <span>查看详情</span>
	        </div>
        </router-link>
      </li>
      <!--市场规则-->
      <li class="li_first3">
      	<router-link to="/problems/Market_planning" tag="a">
	        <div class="commonStyle">
	        	<p class="Raiders">市场规则</p>
	          <span>查看详情</span>
	        </div>
        </router-link>
      </li>
      <!--新手引导-->
      <li @click="newHelp()" class="li_first4">
      	<a>
        <div class="commonStyle">
        	<p class="Raiders">新手引导</p>
          <span>查看详情</span>
        </div>
        </a>
      </li>
      <!--货币充值-->
      <li class="li_first5">
      	<router-link to="/problems/Currency_recharge" tag="a">
	        <div class="commonStyle">
	        	<p class="Raiders">货币充值</p>
	          <span>查看详情</span>
	        </div>
        </router-link>
      </li>
      <!--交易清算-->
      <li class="li_first6">
      	<router-link to="/problems/Clearing_transaction" tag="a">
        <div class="commonStyle">
        	<p class="Raiders">交易清算</p>
          <span>查看详情</span>
        </div>
         </router-link>
      </li>
    </ul>
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
/*常见问题*/
.index_Question{width: 1200px;margin: 0 auto;clear: both;overflow: hidden;position: relative;}
.index_Question>ul{width: 1227px;height: 332px;margin-top: 20px;margin-left: -10px;}
.index_Question>ul>li{float: left;width: 295px;height: 162px;margin-bottom: 6px;margin-left: 9px;cursor: pointer;-moz-transition: all .4s ease 0s; transition: all .4s ease 0s; -webkit-transition: all .4s ease 0s;}
.index_Question>ul>li>a{width: 100%;height: 100%;display: inline-block;position: relative;}
.index_Question>ul>li>a>div{width: 295px;height: 162px;position: absolute;top: 0;left: 0;text-align: center;}
.Raiders{line-height: 36px;text-align: center;font-size: 22px;color: #fefefe;margin-top: 60px;}
.index_Question>ul>li>div>span{color: #fefefe;font-size: 12px;cursor: pointer;z-index: 1;margin: 0 auto;}
.li_first1{background: url(../../assets/img/index_question_img01.png) no-repeat center;}
.li_first2{background: url(../../assets/img/index_question_img02.png) no-repeat center;}
.li_first3{background: url(../../assets/img/index_question_img03.png) no-repeat center;}
.li_first4{background: url(../../assets/img/index_question_img04.png) no-repeat center;}
.li_first5{background: url(../../assets/img/index_question_img05.png) no-repeat center;}
.li_first6{background: url(../../assets/img/index_question_img06.png) no-repeat center;}
.commonStyle{background: rgba(55,59,67,0.8);}
.commonStyle:hover{background: rgba(190,33,42,0.8);transition: background 0.5s;-webkit-transition: background 0.5s;}
.commonStyle>span{color: #fefefe;font-size: 12px;}
.index_Question>ul>li.question_li{width: 598px;height: 162px;background: url(../../assets/img/index_question_img2.png) no-repeat center;}
.question_head{width: 100%;height: 34px;line-height: 34px;text-align: center;color: #2e3132;font-size: 22px;font-weight: bold;position: absolute;top: 50px;left: 0;}
.index_Question>ul>li.question_li>a>span{width: 118px;height: 28px;line-height: 28px;text-align: center;display: block;background: #c60c1b;color: #fff;font-size: 14px;position: absolute;left: 237px;top: 93px;}
/*新手引导*/
.guild_list{width: 100%;height: 100%;max-width: 1920px;min-width: 1200px;position: fixed;z-index: 100;top: 0;left: 0;overflow: hidden;background-color: #aaa;font-size: 0;}
.guild_list>div{width: 100%;height: 100%;position: relative;overflow-x: hidden;overflow: hidden;}
.guild_list>div>img{width: 100%;height: auto;}
.guide_next{position: absolute; display: block;}
.guide_img01{background: url(../../assets/img/redPacket/guide01.jpg) no-repeat center top;background-size: cover;}
.guide_img02{background: url(../../assets/img/redPacket/guide02.jpg) no-repeat center top;background-size: cover;}
.guide_img03{background: url(../../assets/img/redPacket/guide03.jpg) no-repeat center top;background-size: cover;}
.guide_img04{background: url(../../assets/img/redPacket/guide04.jpg) no-repeat center top;background-size: cover;}
.guideNext{width: 387px;position: absolute;top: 75%;left: 0;right: 0;margin: 0 auto;overflow: hidden;}
.guideNext_p{height: 36px;color: #ffffff;font-size: 22px;text-align: center;}
.guideNext>a{width: 94px;line-height: 94px;border: solid 2px #ffffff;display: block;margin: 0 auto;border-radius: 50%;color: #ffffff;font-size: 14px;text-align: center;}
.guideNext_pp{height: 1000px;width: 2px;background: #ffffff;margin: 0 auto;}
.guideButton{width: 2%;height: 6.5%;position: absolute;top: 6px; right: 5px;border: none; border-radius: 50%;cursor: pointer;opacity: 0;filter: alpha(opacity=0);}
</style>

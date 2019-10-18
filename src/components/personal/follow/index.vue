<template>
  <!--我的关注-->
  <div class="my_interest">
    <div class="my_interest_title">我的关注</div>
    <div class="my_interest_nav">
      <ul>
        <li>
        	<router-link to="/personal/follow/predict" tag="a">预测</router-link>
        </li>
        <li>
        	<i></i>
        	<router-link to="/personal/follow/criticism" tag="a">评鉴</router-link>
        </li>
        <li>
        	<i></i>
        	<router-link to="/personal/follow/activity" tag="a">活动</router-link>
        </li>
      </ul>
    </div>
    <div class="my_interest_div">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
.my_interest{width: 940px;min-height: 1006px;margin-left: 24px;position: relative;}
.my_interest_title{line-height: 58px;font-size: 18px;color: #323232;font-weight: bold;}
.my_interest_nav{height: 27px;border-bottom: 2px solid #ced4e0;margin-bottom: 20px;}
.my_interest_nav>ul>li{width: 92px;float: left;line-height: 27px;text-align: center;font-size: 14px;color: #676767;cursor: pointer;}
.my_interest_nav>ul>li>a{width: 100%; height: 100%; display: block; color: #676767; border-bottom: 2px solid #ced4e0;}
.my_interest_nav>ul>li>i{float: left;width: 1px; height: 12px; border-left: 1px solid #ced4e0; margin-top: 7px;}
.my_interest_nav>ul>li>a.router-link-active{color: #e52735;border-bottom: solid 2px #e52735;}
</style>

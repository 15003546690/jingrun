<template>
  <!--我的资产-->
  <div class="property">
    <div class="property_title">资产管理</div>
    <div class="property_nav">
      <div>
        <router-link to="/personal/assets" tag="a" exact>未来豆明细</router-link>
        <span><i></i></span>
        <router-link to="/personal/assets/gold" tag="a">金豆明细</router-link>
        <span><i></i></span>
        <router-link to="/personal/assets/cash" tag="a">现金账户</router-link>
        <span><i></i></span>
        <router-link to="/personal/assets/gift" tag="a">奖品</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.property{width: 940px;height: 1006px;margin-left: 33px;position: relative;}
.property_title{line-height: 58px;font-size: 18px;color: #323232;font-weight: bold;}
.property_nav{height: 38px;border-bottom: 2px solid #ced4e0;margin-bottom: 20px;position: relative;}
.property_nav>div{display: inline-block;position: absolute;left: 0;top: 11px;}
.property_nav>div>a{width: 92px;float: left;line-height: 27px;text-align: center;font-size: 14px;color: #676767;cursor: pointer;border-bottom: 2px solid #ced4e0;}
.property_nav>div>span{width: 30px;line-height: 27px;float: left;vertical-align: middle;text-align: center;}
.property_nav>div>span>i{height: 12px;display: inline-block;border-left: 1px solid #ced4e0;}
.property_nav>div>a.router-link-active{color: #e52735 !important;border-bottom: solid 2px #e52735;}
</style>

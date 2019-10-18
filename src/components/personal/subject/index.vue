<template>
  <!--我要出题-->
  <div class="question">
    <div class="question_title">
      我要出题
    </div>
    <div class="question_nav">
      <div>
				<router-link tag="p" to="/personal/subject" exact>我要出题</router-link>
        <span><img src="../../../assets/img/center/separate.png"/></span>
				<router-link tag="p" to="/personal/subject/record">出题记录</router-link>
      </div>
    </div>
    <div class="question_div">
      <router-view />
    </div>
  </div>
</template>



<style scoped>
.question{width: 940px;height: 1006px;margin-left: 33px;}
.question_title{line-height: 58px;font-size: 18px;color: #323232;font-weight: bold;}
.question_nav{height: 38px;border-bottom: 2px solid #ced4e0;margin-bottom: 20px;position: relative;}
.question_nav>div{display: inline-block;position: absolute;left: 0;top: 11px;}
.question_nav>div>p{width: 92px;float: left;line-height: 27px;text-align: center;font-size: 14px;color: #676767;cursor: pointer;}
.question_nav>div>span{width: 30px;line-height: 27px;float: left;vertical-align: middle;text-align: center;}
.question_nav>div>p.router-link-active{color: #e52735 !important;border-bottom: solid 2px #e52735;}
</style>

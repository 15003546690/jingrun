<template>
  <!--关于我们-->
  <div class="about">
    <div class="bg_about"></div>
    <div class="about_body">
      <div class="about_body_nav">
        <div class="about_nav">
          <ul>
            <router-link tag="li" to="/others" exact>关于我们</router-link>
            <router-link tag="li" to="/others/news">未来资讯</router-link>
            <router-link tag="li" to="/others/agreement">服务协议</router-link>
            <router-link tag="li" to="/others/problems">常见问题</router-link>
            <router-link tag="li" to="/others/contact">联系我们</router-link>
            <router-link tag="li" to="/others/feedback">意见反馈</router-link>
            <router-link tag="li" to="/others/download">下载APP</router-link>
          </ul>
        </div>
    </div>
    <div class="about_content">
      <router-view />
    </div>
    </div>
  </div>
</template>
<script>
	export default {
		created(){
			$('.commonSearch').show()
		}
	}
</script>
<style scoped>
.about_kong{width: 1162px;height: 41px;border-bottom: solid 1px #ededed;margin: 0 auto;margin-bottom: 30px;}
.about{min-height: 872px;}
.bg_about{height: 343px;width: 100%;background: url(../../assets/img/about/about_bg_02.png) no-repeat center;background-size: cover;overflow: hidden;}
.about_body{margin: 0 auto;margin-top: -340px;}
.about_nav{height: 71px;line-height: 91px;margin: 0 auto;padding-top: 20px;width: 1200px;}
.about_nav>ul{width: 100%;height: 50px;}
.about_nav>ul>li{float: left;width: 150px;height: 49px;line-height: 50px;border-bottom: solid 1px white;margin-right: 25px;text-align: center;font-size: 14px;color: #323232;background: white;cursor: pointer;}
.about_nav>ul>li:last-child{margin-right: 0;}
.router-link-active{color: #e52735 !important;border-bottom: solid 1px #e52735 !important;}
.about_content{min-height:782px;}
</style>

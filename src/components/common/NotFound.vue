<template>
  <div class="mistake">
    <div class="mistake_left">
      <img src="../../assets/img/404.png"/>
    </div>
    <div class="mistake_right">
      <div class="mistake_right_center">
        <div class="mistake_right_center_top">
          <div class="mistake_right_title">
            这种错误可能因为：
          </div>
          <p><img src="../../assets/img/circle.png"/>您输入的网址不正确</p>
          <p><img src="../../assets/img/circle.png"/>您查找的页面可能已被转移、更新或删除</p>
          <p><img src="../../assets/img/circle.png"/>过期的书签或搜索链接</p>
        </div>
        <div class="mistake_right_center_top center_top_title">
          <div class="mistake_right_title">
            我们建议您：
          </div>
          <p><img src="../../assets/img/circle.png"/>返回<router-link to="/">未来无限网首页</router-link></p>
          <p><img src="../../assets/img/circle.png"/>联系我们的客服人员：400-691-9939</p>
        </div>
      </div>
    </div>
<Page/>
  </div>
</template>

<style scoped>
.mistake{
	width: 1200px;
	height: 636px;
	margin: 0 auto;
}
.mistake_left{
	float: left;
	height: 100%;
	width: 590px;
	text-align: center;
	line-height: 636px;
	float: left;
}
.mistake_left>img{
	vertical-align: middle;
	margin-left: 30px;
}
.mistake_right{
	width: 609px;
	height: 100%;
	float: left;
}
.mistake_right_center{
	height: 380px;
	width: 373px;
	margin-top: 190px;
}
.mistake_right_center_top{
	height: 158px;
	border-bottom: dashed 1px #ccc;
}
.mistake_right_title{
	height: 42px;
	font-size: 22px;
	color: #676767;
	font-weight: bold;
}
.mistake_right_center_top>p{
	line-height: 30px;
	color: #676767;
	font-size: 18px;
}
.mistake_right_center_top>p>img{
	margin-right: 16px;
	vertical-align: middle;
}
.center_top_title{
	margin-top: 30px;
	border-bottom: none;
}
.center_top_title>p>a{
	color: #3282ff;
}
</style>


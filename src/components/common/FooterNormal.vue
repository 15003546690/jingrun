<template>
  <div class="footer">
			<div class="footer_top">
				<div class="footer_top_center">
					<ul>
						<router-link tag="li" to="/others">关于我们</router-link>
						<router-link tag="li" to="/others/problems"><img src="../../assets/img/center/dot_03.png"/>问题常见</router-link>
						<router-link tag="li" to="/others/contact"><img src="../../assets/img/center/dot_03.png"/>联络我们</router-link>
						<!--<router-link tag="li" to="/others/contact"><img src="../../assets/img/center/dot_03.png"/>网站合作</router-link>-->
						<li><img src="../../assets/img/center/dot_03.png"/><a href="https://www.kinrank.com/" target="_blank">网站合作</a></li>
						<router-link tag="li" to="/others/feedback"><img src="../../assets/img/center/dot_03.png"/>意见反馈</router-link>
						<router-link tag="li" to="/others/agreement"><img src="../../assets/img/center/dot_03.png"/>服务协议</router-link>
						<router-link tag="li" to="/others/agreement"><img src="../../assets/img/center/dot_03.png"/>隐私条款</router-link>
					</ul>
				</div>
				<div class="footer_top_RQ">
					<div class="footer_top_RQ_left">
						<div class="RQ_left_img">
							<img src="../../assets/img/foot-weixin.png"/>
						</div>
						<p>官方微信</p>
					</div>
					<div class="footer_top_RQ_right">
						<div class="RQ_left_img">
							<img src="../../assets/img/foot-weibo.png"/>
						</div>
						<p>官方微博</p>
					</div>
				</div>
			</div>
			<div class="footer_bottom">
				<a href="http://www.miitbeian.gov.cn">京ICP备  16050934号 </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.miitbeian.gov.cn">京ICP证  10075966380号</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;© 2013-2018 IFUTUREX.COM 版权所有
			</div>
		</div>
</template>

<style scoped>
.footer{
	height: 304px;
	background: #eef1f0;
	clear: both;
}
.footer_top{
  height: 236px;
  width: 100%;
	overflow: hidden;
}
.footer_top_center{
	width: 717px;
	height: 62px;
	line-height: 62px;
	border-bottom: dashed 1px #cecece;
	margin: 0 auto;
	margin-top: 17px;
}
.footer_top_center>ul>li{
	float: left;
	width: 102px;
	text-align: center;
	font-size: 14px;
	color: #888888;
	cursor: pointer;
}
.footer_top_center>ul>li>img{
	margin-right: 21px;
	vertical-align: middle;
}
.footer_top_center>ul>li>a{
	color: #888888;
}
.footer_top_RQ{
	width: 180px;
	margin: 0 auto;
	height: 100px;
	margin-top: 20px;
}
.footer_top_RQ_left{
	width: 80px;
	float: left;
	text-align: center;
	}
.RQ_left_img{
	width: 80px;
	height: 80px;
	line-height: 80px;
    text-align: center;
    background: white;
    border: solid 1px #ebebeb;
}
.RQ_left_img>img{
	vertical-align: middle;
	margin-top: -3px;
	}
.footer_top_RQ_left>p{
	font-size: 10px;
	color: #888888;
	text-align: center;
	line-height: 19px;
}
.footer_top_RQ_right{
	float: right;
	width: 80px;
}
.footer_top_RQ_right>p{
	font-size: 10px;
	color: #888888;
	text-align: center;
	line-height: 19px;
}
.footer_bottom{
	height: 68px;
	line-height: 68px;
	font-size: 12px;
	color: #ffffff;
	background: #c60c1b;
	text-align: center;
}
.footer_bottom>a{
	font-size: 12px;
	color: #ffffff;
	cursor: pointer;
}
</style>

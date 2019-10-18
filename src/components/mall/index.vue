<template>
	<div class="shopping_mall">
		<div class="bottom_page_left">
			<div class="shopping_mall_box">
				<div class="page_left_box">
					<div class="page_left_box_title">
						<div class="Head_portrait Head_portrait_title">
							<p><img class="shopping-user-avatar" :src="user.img" /></p>
						</div>
						<div class="Head_portrait_second">
							<div class="Head_portrait shopping-user-nickname">{{user.nickname}}</div>
							<div class="Head_portrait shopping-user-account">
								余额：<a class="clear-pointer">{{user.gold}}</a><img src="../../assets/img/eventGroup/event_jindou.png" />
							</div>
						</div>
					</div>
					<!--商品列表-->
					<ul>
						<router-link to="/mall/list" tag="li" exact>
							<span class="page_left_span">
				                <img class="page_left_box_img1" src="../../assets/img/shopping/duihuan2.png"/>
				                <img class="page_left_box_img2" src="../../assets/img/shopping/duihuan1.png"/>
				            </span>
							<a>兑换商品</a>
							<span class="page_left_span">
				                <img class="page_left_box_img1" src="../../assets/img/shopping/shopping_right2.png"/>
				                <img class="page_left_box_img2" src="../../assets/img/shopping/shopping_right1.png"/>
			              </span>
						</router-link>
						<router-link to="/mall/record" tag="li">
							<span class="page_left_span">
				                <img class="page_left_box_img1" src="../../assets/img/shopping/wode2.png"/>
				                <img class="page_left_box_img2" src="../../assets/img/shopping/wode1.png"/>
			                </span>
							<a>我的兑换</a>
							<span class="page_left_span">
				                <img class="page_left_box_img1" src="../../assets/img/shopping/shopping_right2.png"/>
				                <img class="page_left_box_img2" src="../../assets/img/shopping/shopping_right1.png"/>
			              </span>
						</router-link>
						<router-link to="/personal" tag="li">
							<span class="page_left_span">
				                <img class="page_left_box_img1" src="../../assets/img/shopping/zhongxin2.png"/>
				                <img class="page_left_box_img2" src="../../assets/img/shopping/zhongxin1.png"/>
				            </span>
							<a>个人中心</a>
							<span class="page_left_span">
				                <img class="page_left_box_img1" src="../../assets/img/shopping/shopping_right2.png"/>
				                <img class="page_left_box_img2" src="../../assets/img/shopping/shopping_right1.png"/>
			                </span>
						</router-link>
					</ul>
				</div>
			</div>
		</div>
		<div class="bottom_page_right">
			<div class="bread breadst" style='display:none'>
				<ul class="bread-list">
					<li class="bread-crumbs">
						<a href="/mhexpress-patrolcar-service">首页</a>
						<span><img src="../../assets/img/shopping/jiantou1.png"></span>
					</li>
					<li>
						<i>礼品兑换</i>
					</li>
				</ul>
			</div>
			<div class="bottom_page_right_box1">
				<router-view></router-view>
			</div>
			<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				isShowLoginModal: false,
				user:{
					img:'',
					nickname:'',
					gold:''
				}
			}
		},
		created() {
			setTimeout(() => {
				if(this.$store.state.refreshToken == ''){
					this.$router.push('/');
				}
			},1000)
			this.$Bury(window.location.href,'',0,'lipinshangchengshouye_02010')
			setTimeout(()=>{
				this.getQueryUserInfo();
			},50)
		},
		methods: {
			//关闭登录弹框
	  		hideLoginModal() {
	  			this.isShowLoginModal = false;
	  		},
			getQueryUserInfo() {
				this.$CPOST('/account/v1/userInfo/queryUserInfo',{},(res) => {
					this.user.img=res.resultValue.img;
					this.user.nickname=res.resultValue.nickname;
					this.user.gold=res.resultValue.gold;
				})

			}
		}
	}
</script>
<style scoped>
.shopping_mall {width: 1220px;min-height: 800px;margin: 0 auto;margin-top: 26px;margin-bottom: 20px;display: table;}
.bottom_page_left {width: 180px;min-height: 800px;float: left;}
.bottom_page_right {width: 1020px;min-height: 751px;float: right;background: url(../../assets/img/shopping/shopping_right_bg.png) no-repeat center;filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='../../../assets/img/shopping/shopping_right_bg.png', sizingMethod='scale');background-size: 100% 100%;}
.shopping_mall_box {width: 188px;height: 360px;background: url(../../assets/img/shopping/shopping_left.png) no-repeat center;filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='../../../assets/img/shopping/shopping_left.png', sizingMethod='scale');background-size: cover;overflow: hidden;margin-top: 4px;}
.page_left_box {width: 180px;height: 300px;margin: 0 auto;margin-top: 20px;}
.page_left_box_title {min-height: 170px;position: relative;}
.Head_portrait {text-align: center;font-size: 14px;color: #343434;}
.Head_portrait_title {margin: 0 auto;width: 131px;height: 131px;background: url(../../assets/img/shopping/Head_portrait.png) no-repeat center;filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='../../../assets/img/shopping/Head_portrait.png', sizingMethod='scale');background-size: cover;overflow: hidden;}
.Head_portrait_title>p {width: 106px;height: 106px;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;margin-top: 4px;margin-left: 5px;overflow: hidden;}
.page_left_box_title>.Head_portrait_title>p>img {width: 100%;height: 100%;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;}
.Head_portrait_second {width: 100%;position: absolute;bottom: 5px;left: 0;}
.Head_portrait_second>div {line-height: 22px;font-size: 14px;color: #343434;}
.shopping-user-account>img {vertical-align:middle;margin-left: 5px;margin-top: -2px;}
.Head_portrait_second>div>a{color: #dd2727;font-size: 18px;margin-top: 2px;}
.page_left_box>ul {width: 100%;margin: 0 auto;}
.page_left_box>ul>li {height: 40px;line-height: 40px;font-size: 14px;color: #343434;cursor: pointer;text-align: center;margin: 5px 0;}
.page_left_box>ul>li:last-child {border-bottom: none;}
.page_left_box>ul>li>span {margin: 0 18px;}
/*字颜色*/
.page_left_box>ul .router-link-active {color: #f4646f !important;background: #ffe9e9;}
.page_left_box img {display: inline;vertical-align: middle;}
.page_left_box img+ img {display: none;}
.page_left_box .router-link-active img {display: none;}
.page_left_box .router-link-active img+ img {display: inline;}
/*面包线*/
.bread {width: 95%;height: 54px;margin: auto;}
.bread-list>li {float: left;line-height: 54px;}
.bread-list>li>a,
.bread-list>li>i {font-size: 14px;color: #777f92;}
.bread-list>li>a:hover {color: #252f45;}
.bread-list>li>span {margin: 5px;}
.bread-list>li>span>img {vertical-align: middle;}
.bottom_page_right_box1,.bottom_page_right_box2,.bottom_page_right_box3,.bottom_page_right_box4,.bottom_page_right_box5,.bottom_page_right_box6 {height: 736px;width: 970px;margin: 0 auto;margin-top:20px;}
.bottom_page_right_box1 {display: table;position: relative;}
.right_box1_title {height: 54px;line-height: 54px;font-size: 14px;color: #676767;}
.right_box1_title>a {color: #343434;}
.For_successful {height: 260px;line-height: 260px;text-align: center;}
.For_successful>img {vertical-align: middle;}
</style>
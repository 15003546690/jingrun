<template>
	<div class="header" id="header">
		<div class="header_toplist">
			<div class="header_toplist_login">
				<div class="header_login_language">
					<div class="login_language">
						<p class="login_mes">
							<img src="../../assets/img/index_mes.png" />
							<a href="javascript:;" @click='logintk()'>消息</a>
							<i v-if='read==true'></i>
						</p>
						<router-link to="/others/problems" tag="a">帮助中心</router-link>
						<router-link to="/others/download" tag="a">APP下载</router-link>
					</div>
				</div>
				<!--未登录-->
				<div class="whether">
					<div class="register_login" v-show="this.$store.state.refreshToken == ''">
						<button class="register_login_btn" @click="showLoginModal">登录</button>
						<router-link to='/register' tag='button' class="register_login_ton">注册</router-link>
					</div>
					<!--已登录-->
					<div class="register_help" v-show="this.$store.state.refreshToken != ''">
						<div class="register_help_name">
							<router-link to="/personal" tag="a" class="headImg">
								<img :src="this.$store.state.userImg" class="userimg" />
							</router-link>
							<router-link to="/personal" tag="a" class="username">{{this.$store.state.userNickName}}</router-link>
							<router-link tag="a" to="/personal/account/level" class="userLev">
						    	<img src="../../assets/img/center/vip.png" class="usergrade" v-show="this.$store.state.userGrade"/>
						    	<i class="username_den">{{this.$store.state.userGrade}}</i>
						    </router-link>

						</div>
						<div class="register_close" @click='close'>
							<a href="javascript:;">退出</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--登录-->
		<div class="header_login">
			<div class="header_login_center">
				<router-link tag="div" to="/" class="header_login_left">
					<img src="../../assets/img/center/index_logo.png" />
				</router-link>
				<!--导航-->
				<div class="header_nav">
					<div class="header_nav_center">
						<ul class="header_nav_centerUV">
							<router-link to="/" tag="li" >
								<span :class='[this.$store.state.navIdx==0?"navbg":"navdefault"]'>首页</span>
							</router-link>
							<router-link to="/predict" tag="li" @click.native="listBury(1)">
								<span :class='[this.$store.state.navIdx==1?"navbg":"navdefault"]'>预测</span>
							</router-link>
							<router-link to="/criticism" tag="li" @click.native="listBury(2)">
								<span :class='[this.$store.state.navIdx==2?"navbg":"navdefault"]'>评鉴</span>
							</router-link>
							<router-link to="/topic" tag="li">
								<span :class='[this.$store.state.navIdx==5?"navbg":"navdefault"]'>专题</span>
							</router-link>
							<router-link to="/newActivity" tag="li">
								<span :class='[this.$store.state.navIdx==3?"navbg":"navdefault"]'>活动</span>
							</router-link>
							<li @click="mallList()">
								<span :class='[this.$store.state.navIdx==4?"navbg":"navdefault"]'>礼品</span>
								<img class="mallList" src="../../assets/img/ground_reay.png" />
							</li>
						</ul>
					</div>
				</div>
				<div class="header_login_right">
					<div class="register_search commonSearch zxc">
						<input type="text" name="" v-model="searchContent" value="" @keyup.13="Search()"  placeholder="请输入搜索内容" /><!--@input="getSearch" v-on:blur="changeCount" ref='input1' -->
						<span  @click='Search'>
						</span>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	export default {
		watch:{
			$route(){
				this.routerLink();
			}
		},
		data() {
				return {
					pageSearch: [],
					userHotdata: '',
					token: '',
					read: false,
					search: false,
					val: '',
					arr: [],
					islog: '',
					userImg: '',
					userNickName: '',
					userGrade: '',
					sessionUser: '',
					searchContent:'',
					navIdx:0
				}
			},
			components: {},
			props: [
				'isShowUserInfo',
				'usericon',
				'nickname',
				'classify'
			],
			created() {
				setTimeout(() => {
					this.getMessage()
				});
				this.routerLink();
				
			},
			mounted() {
				this.log()
			},
			filters: {
				data: function(input) {
					var d = new Date(input);
					var year = d.getFullYear();
					var month = d.getMonth() + 1;
					var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
					var hour = d.getHours();
					var minutes = d.getMinutes();
					var seconds = d.getSeconds();
					return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
				},
				days: function(input) {
					var d = new Date(input);
					var year = d.getFullYear();
					var month = d.getMonth() + 1;
					var day = d.getDate() < 10 ? +d.getDate() : '' + d.getDate();
					var hour = d.getHours();
					var minutes = d.getMinutes();
					var seconds = d.getSeconds();
					return day;
				}
			},
			methods: {
				routerLink(){
					let path=this.$router.app._route.path;
					if(path.indexOf('predict')>0){
						this.$store.commit('setNavIdx',1);
					}else if(path.indexOf('criticism')>0){
						this.$store.commit('setNavIdx',2);
					}else if(path.indexOf('newActivity')>0){
						this.$store.commit('setNavIdx',3);
					}else if(path.indexOf('mall')>0){
						this.$store.commit('setNavIdx',4);
					}else if(path.indexOf('topic')>0){
						this.$store.commit('setNavIdx',5);
					}else if(path == '/'){
						this.$store.commit('setNavIdx',0);
					}
					// else if(path.indexOf('group')<0 ){
					// 	return;
					// }else if(path.indexOf('event')<0){
					// 	return;						
					// }
					else{
						this.$store.commit('setNavIdx',100);
					}
				},
				listBury(index){
					if(index === 1){
						this.$Bury(window.location.href,'',0,'yuceshouye_02001');
					}else{
						this.$Bury(window.location.href,'',0,'pingjianshouye_02002');
					}
				},
				changeColor(idx){
					this.navIdx=idx;
				},
				getUserInfo() {
					if(this.$store.state.refreshToken != '') {
						this.userImg = this.$store.state.userImg;
						this.userNickName = this.$store.state.userNickName;
						this.userGrade = this.$store.state.userGrade;
					}
				},
				mallList() {
					if(this.$store.state.refreshToken == '') {
						this.showLoginModal()
					} else {
						this.$router.push({
							path: '/mall/list'
						})
					}
				},
				list() {
					alert(888)
				},
				close() {
					sessionStorage.removeItem('successluck');
					sessionStorage.removeItem('luck');
					window.localStorage.removeItem('user');
					this.$delCookie('refreshToken');
					this.$delCookie('token');
					this.$store.commit('setRefreshToken', '');
					this.$store.commit('setToken', '');
					this.$router.push('/')
					setTimeout(() => {this.$router.go(0)},10)
				},
				logintk() {
					if(this.$store.state.refreshToken == '') {
						this.showLoginModal()
					} else {
						this.$router.push({
							path: '/personal/message'
						})
					}
				},
				log() {
					if(this.islog != '') {
						let log = document.querySelector('.register_login'),
							islog = document.querySelector('.register_help');
					}
				},
				getMessage() {
					// 根据分类获取信息
					if(this.$store.state.refreshToken != '') {
						this.$CPOST('/message/v1/message/findMessageByTypePc', {
							type: 0,
							size: 10,
							page: 0
						}, (res) => {
							this.read = res.resultValue.unRead
						})
					}
				},
				showLoginModal() {
					this.$emit('showLoginModal')
				},
				switchHeader() {
					this.$emit('switchHeader')
				},
				//把li的点击事件委托给ul的事件
				voluation() {
					var getSearch = document.getElementById("getSearch");
					oUl.onclick = function(ev) {　　　　
						var ev = ev || window.event;　　　　
						var target = ev.target || ev.srcElement;　　　　
						if(target.nodeName.toLowerCase() == 'li') {　　　　　　　
							getSearch.value = target.innerHTML;　　　　
						}
					}
				},
				Search() {
					this.searchContent = this.searchContent.replace(/(^\s*)|(\s*$)/g, ""); 
					if(this.searchContent == ''){
						// this.$CTIP('搜索内容不能为空！')
						return false;
					}
					var url = '/search/'+this.searchContent;
					this.$router.push(url)
				},
				changeCount() {
					this.search = false
				}
			},
			computed: {
				searchData: function() {
					var search = this.search;
					if(search) {
						return this.userHotdata.filter(function(product) {
							return Object.keys(product).some(function(key) {
								return String(product[key]).toLowerCase().indexOf(search) > -1
							})
						})
					}
					return this.event;
				}
			}
	}
</script>

<style scoped>
	.username {
		cursor: inherit;
	}
	.register_help_name .userLev {
		float: right;
		margin-left: 10px;
		margin-right: 7px;
		line-height: 40px;
		cursor: pointer;
	}
	.register_help_name .userLev img {
		float: left;
		margin-left: 10px;
		margin-right: 7px;
		margin-top: 15px;
	}
	.username_den {
		color: #f8b62d;
		float: left;
	}
	.header {
		height: 125px;
		position: relative;
		z-index: 2;
	}
	.header a{color: #444;}
	.header a:hover,.header_nav_centerUV>li:hover{color: #c60c1b;}
	.header_toplist {
		height: 40px;
		background: #e6e6e9;
	}
	
	.header_toplist_login {
		width: 1200px;
		height: 40px;
		margin: 0 auto;
	}
	.mallList {
		float: right;
		margin-top: -34px;
	}
	.header_login {
		height: 80px;
		border-bottom: solid 5px #c60c1b;
		width: 100%;
        display: inline-table;
	}
	.header_login_center {
		width: 1200px;
		margin: 0 auto;
		display: table;
	}
	.header_login_left {
		float: left;
		height: 80px;
		line-height: 80px;
	}
	.header_login_left>img {
		vertical-align: middle;
		cursor: pointer;
		width: 270px;
	}
	.header_login_right {
		width: 200px;
		float: right;
		height: 80px;
	}
	.login_mes {
		display: inline-block;
		margin-right: 20px;
		position: relative;
		cursor: pointer;
	}
	.login_mes>img {
		vertical-align: middle;
	}
	.login_mes>i {
		width: 4px;
		height: 4px;
		display: block;
		position: absolute;
		top: 13px;
		right: -3px;
		background: #e52735;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
	}
	.header_login_language {
		height: 40px;
		line-height: 40px;
		float: right;
		font-size: 14px;
		color: #444;
	}
	.login_language>a {
		margin-right: 18px;
		color: #444;
	}
	.language_hover {
		width: 65px;
		height: 42px;
		line-height: 42px;
		float: right;
		padding-left: 10px;
		position: relative;
	}
	.language_hover>img {
		vertical-align: middle;
		margin-left: 4px;
		margin-top: -3px;
	}
	.hover_ul {
		width: 100%;
		background: #e5e5e5;
		position: absolute;
		top: 42px;
		left: 0;
		box-shadow: 0px 0px 10px #e5e5e5;
		display: none;
	}
	.hover_ul>ul {
		width: 95%;
		background: url(../../assets/img/center/ul_bg_03.png) no-repeat center;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-bottom: 2px;
		padding-top: 6px;
	}
	.hover_ul>ul>li {
		line-height: 32px;
		font-size: 14px;
		color: #c60c1b;
		padding-left: 10px;
		border-bottom: solid 1px #eaeaea;
		cursor: pointer;
	}
	.hover_ul>ul>li:last-child {
		border-bottom: none;
	}
	.hover_ul>ul>li>img {
		margin-left: 28px;
		vertical-align: middle;
	}
	.fontColor {
		color: #444444 !important;
	}
	/*注册*/
	.common_res {
		float: right;
		min-width: 203px;
	}
	.register_search {
		width: 200px;
		height: 30px;
		background: #bfbfbf;
		float: right;
		position: relative;
		border-radius: 2px;
		margin-top: 38px;
	}
	.register_search>input {
		width: 163px;
		height: 26px;
		line-height: 26px\0;
		font-size: 12px;
		color: #444444;
		outline: none;
		border: none;
		float: left;
		margin-top: 2px;
		margin-left:2px;
		padding-left: 6px;
	}
	.register_search>span {
		width: 27px;
		height: 30px;
		line-height: 30px;
		float: right;
		text-align: center;
		cursor: pointer;
		display: block;
		background: url('../../assets/img/center/search.png') no-repeat center center;
	}
	.register_search>span>img {
		vertical-align: middle;
	}
	/*搜索下拉*/
	.register_search_select {
		width: 300px;
		background: white;
		position: absolute;
		top: 36px;
		left: -37px;
		z-index: 6;
		box-shadow: 0px 0px 10px #c4c4c4;
	}
	.register_search_select>div {
		height: 30px;
		background: white;
		border-bottom: solid 1px #e6e6e6;
	}
	.div_color {
		color: #e52735 !important;
	}
	.register_search_select>div>p {
		float: left;
		line-height: 30px;
		padding: 0 10px;
		font-size: 14px;
		color: #323232;
	}
	.register_search_select>ul {
		overflow-y: auto;
		height: 105px;
	}
	.register_search_select>ul>li {
		width: 100%;
		line-height: 30px;
		font-size: 14px;
		cursor: pointer;
		margin-bottom: -8px;
		display: inline-block;
	}
	.register_search_select>ul>li>span {
		float: left;
	}
	.register_search_select>ul>li>p {
		width: 256px;
		line-height: 30px;
		font-size: 14px;
		cursor: pointer;
		float: left;
	}
	.register_search_select>ul>li>span {
		padding: 0 5px;
		font-size: 14px;
		background: #e52735;
		border-radius: 4px;
		margin: 0 4px;
		color: white;
	}
	.register_search_select>ul>li:hover {
		background: #EEEEEE;
	}
	.register_login {
		min-width: 102px;
		margin-left: 10px;
		float: right;
		height: 40px;
	}
	.whether {
		height: 40px;
		display: inline-block;
		float: right;
		margin-right: 20px;
	}
	.register_login_btn {
		width: 56px;
		height: 26px;
		background: #c60c1b;
		font-size: 12px;
		color: white;
		border: none;
		outline: none;
		float: left;
		cursor: pointer;
		margin-top: 7px;
	}
	.register_login_ton {
		color: #c60c1b;
		font-size: 12px;
		border: none;
		outline: none;
		float: right;
		background: none;
		cursor: pointer;
		margin-top: 11px;
	}
	.register_help {
		height: 40px;
	}
	.register_help_center {
		width: 113px;
		height: 40px;
		text-align: center;
		float: left;
		font-size: 12px;
		color: #444444;
	}
	.register_help_center>a {
		color: #444444;
	}
	.register_help_center>img {
		vertical-align: middle;
		margin-top: -4px;
	}
	.register_help_name {
		float: left;
		line-height: 40px;
		font-size: 14px;
	}
	.register_help_name>.headImg {
		width: 30px;
		height: 30px;
		border: solid 2px #dbe2de;
		display: block;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		float: left;
		margin-top: 1px;
		line-height: 40px;
		margin-top: 4px;
		cursor: pointer;
	}
	.register_help_name>.headImg>img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
	}
	.register_help_name>a {
		float: left;
		font-size: 14px;
		color: #444444;
		margin-left: 8px;
		line-height: 40px;
	}
	/*导航*/
	.header_nav {
		height: 46px;
		float: left;
		position: relative;
		display: table;
	}
	.header_nav_center {
		height: 56px;
		line-height: 56px;
		margin: 0 auto;
		margin-top: 24px;
		margin-left: 72px;
	}
	.header_nav_centerUV {
		width: 100%;
		height: 100%;
	}
	.header_nav_centerUV>li {
		float: left;
		width: 100px;
		height: 56px;
		line-height: 56px;
		font-size: 16px;
		color: #444444;
		text-align: center;
		cursor: pointer;
		background: url(../../assets/img/ground_reay.png) no-repeat left;
		-moz-transition: all .4s ease 0s; transition: all .4s ease 0s; -webkit-transition: all .4s ease 0s;
	}
	.header_nav_centerUV>li>span{
	    display: inline-block;
	    width: 100%;
	    height: 100%;
	}
	.header_nav_centerUV>li>a {
		color: #444444;
	}
	.header_nav_centerUV>li:hover>div {
		display: block;
	}
	.header_nav_ul {
		position: absolute;
		top: 45px;
		left: 0px;
		width: 100%;
		height: 47px;
		background: white;
		display: none;
	}
	.most_li{
		color: #c60c1b;
	}
	.most_li>img,
	.most_list>img {
		margin-left: 12px;
	}
	.header_nav_ul_li {
		width: 720px;
		margin: 0 auto;
		height: 47px;
	}
	.header_nav_ul_mosy {
		width: 720px;
		margin: 0 auto;
		height: 47px;
	}
	.header_nav_ul_mosy>p {
		float: left;
		line-height: 47px;
		min-width: 34px;
		text-align: center;
		font-size: 16px;
		color: #222222;
		margin-right: 30px;
		cursor: pointer;
	}
	.header_nav_centerUV .header_nav_ul_mosy>p:hover {
		background: url(../../assets/img/center/shade_red.png) no-repeat center;
		background-size: 100% 100%;
		font-weight: bold;
	}
	.btn_all {
		margin-right: 30px !important;
		margin-left: 35px;
	}
	.center_body {
		width: 100%;
		min-height: 1006px;
	}
	.center_body_center {
		width: 1214px;
		height: 100%;
		background: white;
		margin: 0 auto;
		display: table;
	}
	.center_body_center_left {
		float: left;
		width: 217px;
		min-height: 1006px;
		background: url(../../assets/img/center/left_ashde.png);
		background-size: 100% 100%;
		border-right: solid 1px #e2e5eb;
	}
	.center_body_center_right {
		float: left;
		width: 982px;
		min-height: 1006px;
		background: url(../../assets/img/center/right-adsp_03.png);
		background-size: 100% 100%;
	}
	.user_portrait {
		width: 100%;
		min-height: 1006px;
		float: right;
	}
	.user_header {
		height: 129px;
		overflow: hidden;
		width: 210px;
		float: right;
	}
	.user_header>span {
		width: 91px;
		height: 91px;
		border: solid 4px white;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		display: block;
		margin: 0 auto;
		margin-top: 20px;
	}
	.user_header>span>img {
		width: 91px;
		height: 91px;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
	}
	.user_cord {
		height: 27px;
		font-size: 14px;
		color: #676767;
		text-align: center;
		width: 210px;
		float: right;
	}
	.move_logo {
		height: 42px;
		border-bottom: solid 1px #dcdfe8;
		width: 210px;
		float: right;
	}
	.move_logo_img {
		width: 180px;
		height: 42px;
		margin-left: 9px;
	}
	.move_logo_img>div {
		float: left;
		margin-left: 13px;
	}
	.bianji,
	.weibo,
	.shouji,
	.weixin {
		position: relative;
		cursor: pointer;
	}
	.Profile {
		width: 167px;
		height: 53px;
		position: absolute;
		top: 32px;
		left: -76px;
		background: url(../../assets/img/center/finsh.png) no-repeat center;
		background-size: 100% 100%;
	}
	.weibo_col {
		width: 209px;
		height: 53px;
		position: absolute;
		top: 35px;
		left: -97px;
		background: url(../../assets/img/center/finsh.png) no-repeat center;
		background-size: 100% 100%;
	}
	.Profile>p,
	.weibo_col>p {
		line-height: 40px;
		font-size: 14px;
		color: #676767;
		text-align: center;
		margin-top: 9px;
	}
	.Profile>p>a,
	.weibo_col>p>a {
		color: #3282ff;
	}
	.shouji_col {
		width: 209px;
		height: 53px;
		position: absolute;
		top: 38px;
		left: -100px;
		background: url(../../assets/img/center/finsh.png) no-repeat center;
		background-size: 100% 100%;
	}
	.weixin_col {
		width: 209px;
		height: 53px;
		position: absolute;
		top: 38px;
		left: -100px;
		background: url(../../assets/img/center/finsh.png) no-repeat center;
		background-size: 100% 100%;
	}
	.shouji_col>p {
		line-height: 40px;
		font-size: 14px;
		color: #676767;
		text-align: center;
		margin-top: 9px;
	}
	.weixin_col>p {
		line-height: 40px;
		font-size: 14px;
		color: #676767;
		text-align: center;
		margin-top: 9px;
	}
	.move_logo_list {
		border-top: solid 1px white;
		border-bottom: solid 1px #dcdfe8;
		padding: 10px 0;
		display: inline-block;
		width: 100%;
	}
	.move_logo_list>ul>li {
		line-height: 42px;
		text-align: left;
		font-size: 14px;
		color: #676767;
		padding-left: 45px;
		cursor: pointer;
	}
	.move_logo_list>ul>li:hover {
		color: #323232;
		background: white;
	}
	.move_logo_list>ul>li>img {
		vertical-align: middle;
		float: right;
		margin-right: 40px;
		margin-top: 17px;
	}
	.QuickMark {
		border-top: 1px solid white;
		text-align: center;
		overflow: hidden;
	}
	.QuickMark_img {
		width: 122px;
		height: 122px;
		margin: 0 auto;
		margin-top: 10px;
	}
	.QuickMark_img>img {
		vertical-align: middle;
	}
	.QuickMark>p {
		height: 14px;
		font-size: 12px;
		color: #656b78;
		text-align: center;
		margin-top: 10px;
	}
	.register_close {
		float: left;		
		margin-left: 10px;
		cursor: pointer;
		line-height: 40px;
	}
	.register_close a{color: #444444; font-size: 14px;}
	.navbg{
		color: #c60c1b;
	}
</style>
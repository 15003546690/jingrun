<template>
  <div class="theme_header">
      <!--登录-->
      <div class="theme_header_login">
        <div class="header_login_top">
          <div class="header_login_text">
            <ul class="header_nav_list">
              <router-link to="/" tag="li" exact ><span style="width: 100%;display: inline-block;">首页</span></router-link>
              <router-link to="/predict" tag="li" class="header_active"><span style="width: 100%;display: inline-block;">预测</span></router-link>
              <router-link to="/criticism" tag="li"><span style="width: 100%;display: inline-block;">评鉴</span></router-link>
              <router-link to="/activity" tag="li"><span>活动</span></router-link>
              <li @click="mallList()"><span>礼品</span></li>
          		<router-link to="/others/download" tag="li"><span>APP下载</span></router-link>
            </ul>
            <div class="header_login_language">
            	<div class="register_help_center">
				    		<img src="../../assets/img/user.png"/>
				    		<router-link to="/personal" tag="a">个人中心</router-link>
				    	</div>
            	<p class="login_mes">
            		<img src="../../assets/img/event_mes.png"/>
            		<span @click="logintk">消息</span>
            		<i v-if='read==true'></i>
            	</p>
              <router-link to="/others/problems" tag="a">帮助中心</router-link>
              <!--<div class="header_language_hover">
                语言：中文<img src="../../assets/img/criticism/header_down.png" /><img src="../../assets/img/criticism/header_up.png"/>
                <div class="hover_ul">
                  <img src="../../assets/img/criticism/write_jiantou.png" />
                  <ul>
                    <li>English</li>
                    <li class="fontColor">中文 <img src="../../assets/img/center/right_03.png"/></li>
                    </ul>
                </div>
              </div>-->
            </div>
          </div>
        </div>
        <div class="header_sec">
          <router-link tag="div" to="/" class="header_login_left">
            <img src="../../assets/img/criticism/criticism_logo.png" />
          </router-link>
          <div class="header_login_right">
            <div class="header_login_register">
              <div class="common_res">
	              <div class="register_search" style="display: none;">
	                <input type="text" name="" id="" value="" placeholder="请输入搜索内容"/>
	                <span><img src="../../assets/img/center/search.png"/></span>
	              </div>
	              <div class="whether">
									<div class="register_login hide lg">
	                  <button class="register_login_btn" @click="showLoginModal">登录</button>
	                  <router-link to='/register' tag='button' class="register_login_ton">注册</router-link>
							    </div>
							    <!--已登录-->
<!-- 							    <div class="register_help nolo" v-if="this.$store.state.refreshToken != ''">
							    	<div class="register_help_center">
							    		<img src="../../assets/img/center/Male_User.png"/>
							    		<router-link to="/personal" tag="a">个人中心</router-link>
							    	</div>
							    	<div class="register_help_name">
							    		<span><img :src="this.$store.state.userImg"  class="userimg"/></span>
							    		<a class="username">{{this.$store.state.userNickName}}</a>
							    		<img src="../../assets/img/center/vip.png"/>
							    	</div>
                  </div> -->

							    	<!--<div class="register_close">
						    			退出
						    		</div>--
							    </div>-->
								</div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <!--导航-->
        <div class="header_nav">
        	<span style="vertical-align: top;color: #fff;position: absolute;left: 60px;">{{nav}}</span>
          <div class="header_nav_center">
            <ul class="header_nav_centerUV">
              <li @click='lis'>全部</li>
              <li class="most_li" v-for="item in classify" :key="item.classifyId" @click='childPNext($event)' :data-id='item.classifyId'>
                {{ item.classifyName }}<img v-if="item.children.eventClassify.length" src="../../assets/img/criticism/header_down.png" /><img :data-id='item.classifyId' v-if="item.children.eventClassify.length" src="../../assets/img/criticism/header_up.png"/>
                <div class="header_nav_ul" v-if="item.children.eventClassify.length">
                  <div class="header_nav_ul_li">
                    <div class="header_nav_ul_mosy">
                      <p @click="childPNext($event)" :data-id='item.classifyId'>全部</p>
                      <p :data-id="item2.classifyId" v-for="item2 in item.children.eventClassify" :key="item2.classifyId" exact @click='childPNext($event)'>{{ item2.classifyName }}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
export default {
	data(){
		return{
			islog:null,
			read:null,
			userImg:'',
			userNickName:'',
			nav:null
		}
	},
  props: [
    'isShowUserInfo',
    'usericon',
    'nickname',
    'classify'
  ],
  created(){
    // this.getUserInfo();
  	this.getMessage()
  },
  mounted(){
  	/*if(document.querySelector('.header_nav_list').querySelector('.router-link-active').querySelector('span').innerHTML=='预测'){
  		this.nav='预测'
  	}else{
  		this.nav='评鉴'
  	}*/
  },
  methods: {
  	/*ycTab(){
  		this.nav='预测'
  	},
  	pjTab(){
  		this.nav='评鉴'
  	},*/
  	mallList() {
  		if(this.$store.state.refreshToken == '') {
  			this.showLoginModal ()
  		}else{
  			this.$router.push({path: '/mall/list'})
  		}
  	},
    getUserInfo(){
      if(this.$store.state.refreshToken != '') {
        this.userImg = this.$store.state.userImg;
        this.userNickName = this.$store.state.userNickName;
        this.userGrade = this.$store.state.userGrade;
      }
    },
  	childPNext(e){
      var type = this.$GetQueryString('type');
      let id=e.path[0].getAttribute('data-id');
      if(type == null){
        if(window.location.href.indexOf('predict') < 0){
          this.$router.push({path:'/criticism/' + id})
        }else{
          this.$router.push({path:'/predict/' + id})
        }
      }else{
        if(type == 0){
          this.$router.push({path:'/criticism/' + id})
        }else{
          this.$router.push({path:'/predict/' + id})
        }
      }
    },
    lis(){
      var type = this.$GetQueryString('type');
      if(type == null){
        if(window.location.href.indexOf('predict') < 0){
          this.$router.push({path:'/criticism/'})
        }else{
          this.$router.push({path:'/predict/'})
        }
      }else{
        if(type==0){
          this.$router.push({path:'/criticism'})
        }else{
          this.$router.push({path:'/predict'})
        }
      }
    },
  	index(){
  		history.go(0)
  	},
  	log(){
  		/*if(this.islog!=null){
  			let log=document.querySelector('.register_login'),
					islog=document.querySelector('.register_help');
					islog.classList.remove('hide');
					log.classList.add('hide');
  		}*/
  	},
  	logintk(){
  		if(document.querySelector('.username').innerHTML==''){
			this.showLoginModal ()
  		}else{
			this.$router.push({path:'/personal/message'})
  		}
  	},
  	getMessage () {
      // 根据分类获取信息
      if(this.$store.state.refreshToken != '') {
        this.$CPOST('/message/v1/message/findMessageByTypePc',{
          type:0,
          size: 10,
          page: 0
        },(res) =>{
          this.read=res.resultValue.unRead
        })
      }
   },
    showLoginModal () {
      this.$emit('showLoginModal')
    },
    switchHeader () {
      this.$emit('switchHeader')
    }
  }
}
</script>

<style scoped>
.theme_header{
  height: 141px;
  position: relative;
  z-index: 2;
}
.theme_header_login{
  height: 98px;
}
.header_login_top{
  width: 100%;
  height: 37px;
  background: #c60c1b;
}
.header_login_text{
  width: 1200px;
  margin: auto;
}
.header_nav_list{
  height: 37px;
  float: left;
}
.header_nav_list>li{
  float: left;
 /* padding: 0 16px;*/
  height: 100%;
  line-height: 37px;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
  margin: 0 16px;
}
.header_nav_list>li>span{
	padding: 0 16px;
}
.header_nav_list>li.router-link-active{
  background: #9e0a16;
  font-weight: bold;
}
.login_mes{
	height: 37px;
	line-height: 37px;
	display: inline-block;
	margin-right: 23px;
	position: relative;
	cursor: pointer;
}
.login_mes>img{
	vertical-align: middle;
}
.login_mes>i{
	width: 4px;
	height: 4px;
	display: block;
	position: absolute;
	top: 0;
	right: -4px;
	background: #e52735;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
}
.header_login_language{
  height: 37px;
  float: right;
  color: #fefefe;
  font-size: 12px;
}
.header_login_language>a{
  display: inline-block;
  vertical-align: text-bottom;
  margin-right: 10px;
  color: #fefefe;
}
.header_language_hover{
  min-width: 90px;
  height: 37px;
  line-height: 37px;
  padding-left: 10px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}
.header_language_hover>img{
  vertical-align: middle;
  margin-left: 4px;
  margin-top: -3px;
  display: none;
}
.header_language_hover>img+img{
  display: none;
}
/*.header_language_hover:hover img+img{
  display: inline;
}*/
.header_language_hover:hover>img{
  display: none;
}
.header_nav_centerUV{
  height: 43px;
  float: left;
}
.header_nav_centerUV>li{
  float: left;
  padding: 0 16px;
  height: 100%;
  line-height: 43px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  margin: 0 16px;
}
.header_nav_centerUV>li>img+img{
  display: none;
}
.header_nav_centerUV>li:hover{
  font-weight: bold;
  background: #9e0a16;
}
.header_nav_centerUV>li.router-link-active{
	background: #9e0a16;
}
/*.header_nav_centerUV>li.most_li:hover{
  background: url(../../assets/img/criticism/header_nav_bg.jpg) no-repeat center;
}*/
.header_nav_centerUV>li.most_li:hover .header_nav_ul_mosy>p{
	font-weight: 500;
}
.header_nav_centerUV>li:hover>img{
  display: none;
}
.header_nav_centerUV>li:hover>img+img{
  display: inline;
}
.header_nav_centerUV>li:hover .header_nav_ul{
  display: block;
}
.header_sec{
  width: 1200px;
  margin: auto;
}
.header_login_left{
  float: left;
  height: 61px;
  line-height: 61px;
}
.header_login_left>img{
   vertical-align: middle;
   cursor: pointer;
}
.header_login_right{
  float: right;
  height: 61px;
}
.login_language>a{
  margin-right: 18px;
}
.language_hover{
  min-width: 90px;
  height: 42px;
  line-height: 42px;
  float: right;
  padding-left: 10px;
  position: relative;
}
.language_hover>img{
  vertical-align: middle;
  margin-left: 4px;
  margin-top: -3px;
}
/*.header_language_hover:hover{
  background: #415c99;
}*/
/*.header_language_hover:hover .hover_ul{
  display: block;
}*/
.hover_ul{
  width: 100%;
  position: absolute;
  top: 30px;
  left: 0;
  display: none;
  z-index: 10;
}
.hover_ul>img{
  margin-left: 62px;
  display: block;
}
.hover_ul>ul{
  width: 95%;
  background: #fff;
  margin: 0 auto;
  margin-bottom: 2px;
  margin-top: -9px;
  padding-top: 6px;
  box-shadow: 0px 0px 10px #e5e5e5;
}
.hover_ul>ul>li{
  line-height: 32px;
  font-size: 14px;
  color: #444444;
  padding-left: 10px;
  border-bottom: solid 1px #eaeaea;
  cursor: pointer;
}
.hover_ul>ul>li:hover{
  color: #c60c1b;
}
.hover_ul>ul>li:last-child{
  border-bottom: none;
}
.hover_ul>ul>li>img{
  margin-left: 28px;
  vertical-align: middle;
}
/*注册*/
.header_login_register{
  line-height: 36px;
  float: right;
  width: 100%;
  margin-top: 12px;
}
.common_res{
  float:right;
  min-width: 385px;
}
.register_search{
  width: 219px;
  height: 36px;
  background: #dddddd;
  float: left;
}
.register_search>input{
  width: 171px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #444444;
    outline: none;
    border: none;
    float: left;
    margin-top: 2px;
    margin: 2px;
    padding-left: 8px;
}
.register_search>span{
  width:36px;
  height: 36px;
  float: right;
  text-align: center;
  cursor: pointer;
}
.register_search>span>img{
  vertical-align: middle;
  margin-top: -2px;
}
.register_login{
  min-width: 155px;
  margin-left: 10px;
  float: left;
}
.whether{
  display: inline-block;
}
.register_login_btn{
  width: 90px;
  height: 36px;
  background: #c60c1b;
  font-size: 12px;
  color: white;
  border: none;
  outline: none;
  float: left;
  cursor: pointer;
}
.register_login_ton{
  width: 66px;
  height: 36px;
  color: #c60c1b;
  font-size: 12px;
  border: none;
  outline: none;
  float: right;
  background: none;
  cursor: pointer;
}
.register_help{
  height: 36px;
}
.register_help_center{
  width: 113px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  float: left;
  font-size: 12px;
  color: #fff;
}
.register_help_center>a{
	color: #fff;
}
.register_help_center>img{
  vertical-align: middle;
  margin-top: -4px;
}
.register_help_name{
  float: left;
}
.register_help_name>span{
  width:30px;
  height: 30px;
  border: solid 2px #dbe2de;
  display: block;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  float: left;
    margin-top: 1px;
}
.register_help_name>span>img{
  width:100%;
  height: 100%;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
}
.register_help_name>a{
  float: left;
  font-size: 14px;
  color: #444444;
  margin: 0 5px;
}
/*导航*/
.header_nav{
  width: 1200px;
  margin: auto;
  height: 43px;
  line-height: 43px;
  text-align: center;
  background: #c60c1b;
  position: relative;
}
.header_nav_bg{
  background: url(../../assets/img/center/xianhu_03.png) no-repeat;
  background-size: 100% 100%;
}
.header_nav_center{
  height:43px;
  line-height: 43px;
  margin: 0 auto;
  display: inline-block;
}
.header_nav_ul{
  position: absolute;
  top: 46px;
  left: 0px;
  width: 100%;
  height: 46px;
  background: #eaeaea;
  margin-top: -4px;
  display: none;
}
.most_li>img{
  margin-left: 12px;
  vertical-align: middle;
}
.header_nav_ul_li{
  width: 720px;
  margin: 0 auto;
  height: 46px;
}
.header_nav_ul_mosy{
  width: 720px;
  margin: 0 auto;
  height: 46px;
}
.header_nav_ul_mosy>p{
  float: left;
  height: 44px;
  line-height: 47px;
  min-width: 34px;
  text-align: center;
  font-size: 16px;
  color: #444444;
  margin-right: 30px;
  cursor: pointer;
}
.header_nav_centerUV .header_nav_ul_mosy>p:hover{
  font-weight: bold;
  border-bottom: 3px solid #c60c1b;
}
.btn_all{
  margin-right: 30px !important;
    margin-left: 35px;
}
/*center-body*/
.center_body{
  width: 100%;
  min-height: 1006px;
}
.center_body_center{
  width: 1214px;
  height: 100%;
  background: white;
  margin: 0 auto;
  display: table;
}

.center_body_center_left{
  float: left;
  width: 217px;
  min-height: 1006px;
  /*background: #eef0f6;*/
  background: url(../../assets/img/center/left_ashde.png);
  background-size: 100% 100%;
  border-right: solid 1px #e2e5eb;
}
.center_body_center_right{
  float: left;
  width: 982px;
  min-height: 1006px;
  /*background: #eef0f6;*/
  background: url(../../assets/img/center/right-adsp_03.png);
  background-size: 100% 100%;
}

.user_portrait{
  width: 100%;
  min-height: 1006px;
  float: right;
  
}
.user_header{
  height: 129px;
    overflow: hidden;
    width: 210px;
    float: right;
}
.user_header>span{
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
.user_header>span>img{
  width: 91px;
  height: 91px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
}
.user_cord{
  height: 27px;
    font-size: 14px;
    color: #676767;
    text-align: center;
    width: 210px;
    float: right;
}
.move_logo{
  height: 42px;
    border-bottom: solid 1px #dcdfe8;
    width: 210px;
    float: right;
}
.move_logo_img{
  width: 180px;
  height: 42px;
  margin-left: 9px;
}
.move_logo_img>div{
  float: left;
  margin-left: 13px;
}
.bianji,.weibo,.shouji,.weixin{
  position: relative;
  cursor: pointer;
}

.Profile{
  width: 167px;
    height: 53px;
    position: absolute;
    top: 32px;
    left: -76px;
    background: url(../../assets/img/center/finsh.png) no-repeat center;
    background-size: 100% 100%;
}
.weibo_col{
  width: 209px;
    height: 53px;
    position: absolute;
    top: 35px;
    left: -97px;
    background: url(../../assets/img/center/finsh.png) no-repeat center;
    background-size: 100% 100%;
}
.Profile>p,.weibo_col>p{
  line-height: 40px;
  font-size: 14px;
  color: #676767;
  text-align: center;
    margin-top: 9px;
}
.Profile>p>a,.weibo_col>p>a{
  color: #3282ff;
}
.shouji_col{
  width: 209px;
    height: 53px;
    position: absolute;
    top: 38px;
    left: -100px;
    background: url(../../assets/img/center/finsh.png) no-repeat center;
    background-size: 100% 100%;
}
.weixin_col{
  width: 209px;
    height: 53px;
    position: absolute;
    top: 38px;
    left: -100px;
    background: url(../../assets/img/center/finsh.png) no-repeat center;
    background-size: 100% 100%;
}
.shouji_col>p{
  line-height: 40px;
  font-size: 14px;
  color: #676767;
  text-align: center;
    margin-top: 9px;
}
.weixin_col>p{
  line-height: 40px;
  font-size: 14px;
  color: #676767;
  text-align: center;
    margin-top: 9px;
}
.move_logo_list{
  /*width: 126px;*/
  border-top: solid 1px white;
  border-bottom: solid 1px #dcdfe8;
  padding: 10px 0;
  display: inline-block;
      width: 100%;
}
/*.move_logo_list>ul{
  width: 126px;
  margin: 0 auto;
}*/
.move_logo_list>ul>li{
  line-height: 42px;
  text-align: left;
  font-size: 14px;
  color: #676767;
  padding-left: 45px;
  cursor: pointer;
}
.move_logo_list>ul>li:hover{
  color: #323232;
  background: white;
}
.move_logo_list>ul>li>img{
  /*margin-left: 30px;*/
  vertical-align: middle;
  float: right;
  margin-right: 40px;
  margin-top: 17px;
}
.QuickMark{
  border-top: 1px solid white;
  text-align: center;
  overflow: hidden;
}
.QuickMark_img{
  width: 122px;
  height: 122px;
  margin: 0 auto;
  margin-top: 10px;
}
.QuickMark_img>img{
  vertical-align: middle;
}
.QuickMark>p{
  height: 14px;
  font-size: 12px;
  color: #656b78;
  text-align: center;
  margin-top: 10px;
}
.register_close{
	float: left;
	color: #444444;
	font-size: 12px;
	margin-left: 10px;
	cursor: pointer;
}
</style>

<template>
  <div class="main">
		<!--banner-->
		<div class="banner_box" >
			<!--<Banner/>-->
			<swiper class="index_banner" :options="swiperOption" ref="mySwiper">
		    <swiper-slide style="position:relative" v-for='item in bannerList' :style="{backgroundImage: 'url(' + item.img+ ')'}" :data-type='item.url'>
		    	<a href="javascript:;" @click="bannerGoto(item.url,item.bannerId,item.relate)" style="display:block; position:absolute; width:100%; height:100%;"></a>
		    </swiper-slide>
		    <div class="swiper-pagination index_banner_pagination" slot="pagination"></div>
		    <!-- <div class="swiper-button-next banner-next" slot="button-next"></div>
		    <div class="swiper-button-prev banner-prev" slot="button-prev"></div> -->
		  </swiper>
		  <!--  -->
		</div>
		<!--题材-->
		<div class="index_container">
			<div class="signIn" @click="showSignModal">
		  	<div class="signIn_box">
		  		<p class="signIn_not" v-if="checkSign.keepDays<1" @click='signn($event)'>签到</p>
		  		<div class="signIn_yet" v-if="checkSign.keepDays>0" @click='signn($event)'>
		  			<p>{{isSign == "true" ? '已签到' : '未签到'}}</p>
		  			<p>连续{{checkSign.keepDays}}天</p>
		  		</div>
		  	</div>
		  </div>
		  <Sign v-if="isShowSign" :checkSign.sync="checkSign" :isSign.sync="isSign" @hideSignModal="hideSignModal" @sign="signn"></Sign>
			<!--推荐题材-->
			<div class="index_container_theme">
				<div class="index_container_head_tuijian">
					<p class="index_container_name"><img src="../../assets/img/index_tuijian_icon.png"/><i>推荐话题</i></p>
					<span class="index_refresh" @click='onnextPage(0)'>换一换>></span>
				</div>
				<ul class="index_container_list">
					<Group v-for="item in event[3].list.slice(0, 2)" :key="item.groupId" :group="item" trackKey="tuijianEvent_01003"></Group>
					<!--每日任务-->
					<li class="index_container_detail index_dayTask">
						<div class="dayTask">
							<div class="dayTask_head">
								<p class="index_container_name dayTask_name"><img src="../../assets/img/index_task_icon.png"/><i>每日任务</i></p>
								<span class="index_refresh dayTask_all" @click="showTaskModal">全部任务</span>
							</div>
							<div class="dayTask_body">
								<ul class="dayTask_body_list">
									<Task v-for="(item,index) in taskList" :key="index" :taskList="item" @imgChange="imgChange"></Task>
								</ul>
							</div>
						</div>
						<TaskList v-if="isClose" @hideTaskModal="hideTaskModal"></TaskList>
					</li>
					<Group v-for="item in event[3].list.slice(2,5)" :key="item.groupId" :group="item"></Group>
				</ul>
			</div>
			<!--热门题材-->
			<div class="index_container_theme">
				<div class="index_container_head">
					<p class="index_container_name"><img src="../../assets/img/index_remen_icon.png"/><i>热门话题</i></p>
					<span class="index_refresh" @click='nextPage(2,0,6)'>换一换&gt;&gt;</span>
				</div>
				<ul class="index_container_list">
					<Group v-for="item in event[2].list" :key="item.groupId" :group="item" trackKey="hotEvent_01004"></Group>
				</ul>
			</div>
			<!--最新题材-->
			<div class="index_container_theme">
				<div class="index_container_head">
					<p class="index_container_name"><img src="../../assets/img/index_zuixin_icon.png"/><i>最新话题</i></p>
					<span class="index_refresh" @click='nextPage(0,0,3)'>换一换&gt;&gt;</span>
				</div>
				<ul class="index_container_list_zuixin">
					<Group v-for="item in event[0].list" :key="item.groupId" :group="item" trackKey="newEvent_01005"></Group>
				</ul>
			</div>
			<!--临期题材-->
			<div class="index_container_theme">
				<div class="index_container_head">
					<p class="index_container_name"><img src="../../assets/img/index_linqi_icon.png"/><i>临期话题</i></p>
					<span class="index_refresh" @click='nextPage(1,0,3)'>换一换>></span>
				</div>
				<ul class="index_container_list_zuixin">
					<Group v-for="item in event[1].list" :key="item.groupId" :group="item" trackKey="linqiEvent_01006"></Group>
				</ul>
			</div>
			<!--新手问答-->
			<Question></Question>
		</div>
		<!--新手红包-->
		<div class="red_paper" v-if="isRed">
	    <div class="red_paper_div">
		    <!--老用户-->
		    <div class="red_paper_pic" v-if="isGet==1">
		        <p><button class="red_paper_button1 red_paper_close" @click="hideRed"></button></p>
		        <div><button class="red_paper_button2 red_paper_show_guide"></button></div>
		    </div>
	     	<!--新手任务完成领取红包-->
	    	<div class="red_paper_new" v-if="isGet==2">
			    <div class="red_paper_main">
			        <p><button class="red_paper_but1 red_paper_close" @click="hideRed"></button></p>
			        <div><button class="red_paper_but2 red_paper_receive" @click="getRedPacket"></button></div>
			        <router-link tag="a" to="personal/assets/cash" class="red_paper_account"></router-link>
			    </div> 
	     	</div>
	      	<!--未登录提示 -->
		    <div class="red_paper_solid" v-if="isGet==3">
		        <p><button class="red_paper_button1 red_paper_close" @click="hideRed"></button></p>
		        <div><button class="red_paper_button2 red_paper_to_register" @click="getPacket"></button></div>
		    </div>
	   
	   		<!--完成新手任务 -->
	   		<div class="red_paper_most" v-if="isGet==4">
			    <div class="red_paper_list">
			        <p><button class="red_paper_butmot1 red_paper_close" @click="hideRed"></button></p>
			        <div><button class="red_paper_butmot2 red_paper_show_guide" @click="getNext"></button></div>
			    </div> 
	     	</div>
	    </div>
		</div>
		<div class="guild_list" v-if="isGuild">
			<div class="guide_img01" v-if="isGetImg==1">
				<div class="guideNext">
	      	<p class="guideNext_p">选择您感兴趣的题材，开启预测之旅</p>
	      	<a href="javascript:;" @click="nextBtn1">下一步</a>
	      	<p class="guideNext_pp"></p>
	      </div>
	      <button class="guideButton" @click="guideButton()"></button>
			</div>
			<div class="guide_img02" v-if="isGetImg==2">
				<div class="guideNext">
	      	<a href="javascript:;" @click="nextBtn1">下一步</a>
	      	<p class="guideNext_pp"></p>
	      </div>
	      <button class="guideButton" @click="guideButton()"></button>
			</div>
			<div class="guide_img03" v-if="isGetImg==3">
				<div class="guideNext">
	      	<a href="javascript:;" @click="nextBtn1">下一步</a>
	      	<p class="guideNext_pp"></p>
	      </div>
	      <button class="guideButton" @click="guideButton()"></button>
			</div>
			<div class="guide_img04" v-if="isGetImg==4">
				<div class="guideNext">
	      	<a href="javascript:;" @click="nextBtn4">朕知道了</a>
	      	<p class="guideNext_pp"></p>
	      </div>
	      <button class="guideButton" @click="guideButton()"></button>
			</div>
		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
		<timea v-if='isShowTimeModal' @times='times'></timea>
		<div class="confirm_modal">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='hideModal'><img src="../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p class="confirm_content" v-model="text">{{text}}</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='hideModal'>确定</button>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
/*import Banner from './Banner'*/
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Group from './Group'
import Task from './Task'
import Question from './Question'
import Sign from './Sign'
import TaskList from './TaskList'
import Login from '../common/Login'
import timea from '../common/timeAlert'

export default {
  name: 'hello',
  components: {
    swiper,
    swiperSlide,
    Group,
    Task,
    Question,
    Sign,
    TaskList,
    Login,
    timea
  },
  data () {
    return {
	  isShowLoginModal: false,
	  isShowTimeModal:false,
	  text: '',
	  
	  swiperOption: {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: false,
          autoplay: {
		  	delay:4500,
		  	stopOnLastSlide: false,
	    	disableOnInteraction: true
		  },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
      event: [
        // 最新
        {
          page: 0,
          list: []
        },
        // 临期
        {
          page: 0,
          list: []
        },
        // 热门
        {
          page: 0,
          list: []
        },
        // 推荐
        {
          page: 0,
          list: [],
          commendTotal:0
        }
      ],
      isShowSign: false,
      checkSign: {
      	keepDays:0
      },
      timealt:{
      	currentTime:null,
      	endTime:null,
      	SurplusTime:null,
      	closeTime:null
      },
      sign: [],
      isSign: false,
      taskList: [],
      isClose: false ,
      bannerList: [],
      page:0,
      token:'',
      tokenTime:'',
      isRed: false,
      isGet: 3,
      isGuild: false,
      isGetImg: 1,
      numm:null
    }
  },	
  created() {
  	//获取邀请id
  	// var inviteBy = this.$route.query.code || '';
  	// this.$setCookie('inviteBy',inviteBy,90000);
  	this.numm=sessionStorage.getItem('envelopes')
  	setTimeout(function(){
  		if(this.numm==null){
	  		this.isRed=true
	  	}else{
	  		this.isRed=false
	  	}
  	},10)
  	this.$Bury(window.location.href,'',0,'shouye_01001');
    setTimeout(()=>{
      this.getRecommendEvent()//推荐话题
      
      
   },100) 
	  
	  this.firstAlt();
  },

  /*mounted(){
		if(this.token==null){
			  location.replace(URL)
		}
  },*/
  methods: {
  	firstAlt(){
  		this.$CPOST('/share/v1/popup/queryPopupMsgPc',{
			},(res)=>{
				if(res.resultValue.workStatus==0 && res.resultValue.pcImg!=''){
					this.timeData();
				}else{
					this.isShowTimeModal=false;
				}
		})
  	},
  	timeData(){
  		
		if(this.$getCookie('isShow')!=null){//有,今天不会再显示
			this.isShowTimeModal=false;
			return false
		}else{//没有
			this.$CPOST('/share/v1/popup/queryPopupMsgPc',{
				},(res)=>{
					this.timealt.endTime=res.resultValue.endTime;
					this.timealt.currentTime=new Date().getTime()
					this.timealt.closeTime=res.resultValue.popupRate*3600;
					if(this.timealt.currentTime>=this.timealt.endTime){//结束时间>=当前时间（不显示）
						this.isShowTimeModal=false;
						return false 
					}else{
						 if(this.$getCookie('curTime')!=null){//如果有不显示
						 	this.isShowTimeModal=false;
						 }else{
						 	this.isShowTimeModal=true;
						 }
						
					}
			})
		}
  	},
  	/*首页三小时一次的弹层*/
  	times(timeH) {
      //false今日不在显示、true显示
      if(timeH==false){
      	let nowTime = (new Date()).getTime();   //当前时间
		let setTime =  Math.floor(nowTime/1000) //当前时间秒
		let exp = setTime+86400-(new Date().getHours()*60*60+new Date().getMinutes()*60+new Date().getSeconds()); //00:00秒
		this.timealt.SurplusTime=exp-setTime;//时间差（距离明天0:00）
      	this.$setCookie('isShow','temp',this.timealt.SurplusTime);
      	this.isShowTimeModal = false;
      }else{
      	this.$setCookie('curTime','temp',this.timealt.closeTime)
      	this.isShowTimeModal = false;
      }
    },
  	banner(e){
      console.log('e=='+e)
      var link = e.target.getAttribute('data-type');
      if(link != '' || link != undefined){
			 window.open(e.target.getAttribute('data-type'))
      }
  	},
  	bannerGoto(url,id,relate){
  		function isIE() { //ie?
		 if (!!window.ActiveXObject || "ActiveXObject" in window)
		  return true;
		  else
		  return false;
		 }
		 var type = 0;
		 if (parseInt(relate) == 15 || parseInt(relate) == 16 || parseInt(relate) == 17 || parseInt(relate) == 1 || parseInt(relate) == 2) {
			type = 1;
		} else if (item.relate === 0) {
			type = 2;
		} else if (item.relate === 1) {
			type = 3;
		}
		this.$Bury(url,id,type,'banner')
		if(isIE()){
			window.open(url);
		}else{
  			window.location.href=url;
  		}
  	},
  	imgChange(TaskList) {
  		this.task()
  		this.text = TaskList
  		let showModal = document.querySelector('.confirm_modal')
  		showModal.style.display = 'block'
  		/*this.isShows = true*/
  	},
  	hideModal() {
  		let showModal = document.querySelector('.confirm_modal')
  		showModal.style.display = 'none'
//		this.isShows = false
  	},
  	hideLoginModal() {
      this.isShowLoginModal = false;
    },
  	openSign(){
      this.$CPOST('/task/v1/task/userFindTaskByType',{
        },(res) =>{
        this.taskList = res.resultValue;
      })
  	},
  	freshRecommendEvent() {
  		console.log('page='+this.event[3].page)
			this.$CPOST('/event/v1/homeRecommend/queryPCHomeRecommend', {
				homeEventType: 2,
				page: this.event[3].page,
				size: 5
			}, (res) => {
				this.event[3].list = res.resultValue.eventGroupEntitys;
				this.event[3].commendTotal = parseInt(res.resultValue.eventGroupEntitysCount);

			})
	},
    //推荐题材
		getRecommendEvent() {
			this.$CPOST('/event/v1/homeRecommend/queryPCHomeRecommend', {
				homeEventType: 2,
				page: this.event[3].page,
				size: 5
			}, (res) => {
				this.event[3].list = res.resultValue.eventGroupEntitys;
				var bannerList = res.resultValue.bannerList;
				this.event[3].commendTotal = parseInt(res.resultValue.eventGroupEntitysCount);
				this.redPacket = res.resultValue.isReward;
				bannerList.forEach(function(item, index) {
					if (parseInt(item.relate) == 15 || parseInt(item.relate) == 16 || parseInt(item.relate) == 17) {
						item.url = '#/newActivity/' + item.relateId;
					} else if (item.relate === 2 && item.bannerClass === 1) {
						item.url = '#/activity/' + item.relateId;
					} else if (item.relate === 0) {
						item.url = '#/group/' + item.relateId;
					} else if (item.relate === 1) {
						item.url = '#/event/' + item.relateId;
					}
			})
        this.bannerList = bannerList;
        this.task();
        this.getHotEvent(0)//热门话题
        this.getNewestEvent(0)//最新话题
        this.getExpireEvent(0)//临期话题
        
	    if(this.redPacket.proceed == true && this.numm==null) {
        	if(this.redPacket.proceed == true && this.redPacket.user == true && this.numm==null){
        		if(this.redPacket.proceed == true && this.redPacket.user == true && this.redPacket.receive == false && this.numm==null) {
        			this.isRed = true
        		}
        	}
        }else{
        	this.isRed = false
        }
        if(this.$store.state.refreshToken != ''){
          
	       this.signn();
	    }
      })
   },
  	signn(e){
  		// this.$store.state.refreshToken=JSON.parse(sessionStorage.getItem('loginToken')).loginToken
      this.$CPOST('/task/v1/task/findSignNum',{},(res) => {
        this.checkSign = res.resultValue;
        this.isSign = res.resultValue.isSign;
      })
  	},
  	onnextPage () {
			var total = Math.floor(this.event[3].commendTotal / 5);
			if(this.event[3].page < total){
				this.event[3].page ++;
			}else{
        this.event[3].page = 0;
      }
      this.freshRecommendEvent();
   },
  	nextPage(groupEventCondition, page, size){
  		this.page++
			if(this.page==3){
				this.page=0
			}
      this.$CPOST('/event/v1/eventGroup/queryPCEventGroup',{
        classifyId: 0,
        groupEventCondition,
        page:this.page,
        size
      },(res) => {
        this.event[groupEventCondition].list = res.resultValue.eventGroupEntityParams
        this.event[groupEventCondition].page = page
      })
  	},
    getHotEvent (page) {
      this.getEvent(2, page, 6)
    },
    getNewestEvent (page) {
      this.getEvent(0, page, 3)
    },
    getExpireEvent (page) {
      this.getEvent(1, page, 3)
    },
    getEvent (groupEventCondition, page, size) {
      this.$CPOST('/event/v1/eventGroup/queryPCEventGroup',{
        classifyId: 0,
        groupEventCondition:groupEventCondition,
        page:page,
        size:size
      },(res) =>{
        // this.checkSign = res.resultValue
        this.event[groupEventCondition].list = res.resultValue.eventGroupEntityParams
        this.event[groupEventCondition].page = page
      })
    },
   	checkSignDay() {
      this.$CPOST('/task/v1/task/findSignNump',{},(res) =>{
        this.checkSign = res.resultValue
      })
   	},
   	task() {
      this.$CPOST('/task/v1/task/showDailyTask',{},(res) =>{
        this.taskList = res.resultValue
      })
   	},
		showSignModal () {
      if(this.$store.state.refreshToken == '') {
        this.isShowLoginModal = true
      }else{
        this.isShowSign = true
      }
     },
   	hideSignModal () {
      this.isShowSign = false
      // this.signn()
   	},
   	showTaskModal () {
   		if(this.$store.state.refreshToken == ''){
   			this.isShowLoginModal = true
   		}else{
   			this.isClose = true
   		}
   	},
   	hideTaskModal () {
      this.isClose = false
   	},
   	hideRed() {
   		let envelopes = {
				envelopes: 1
			}
			let obj1 = JSON.stringify(envelopes);
			sessionStorage.setItem('envelopes', obj1);
	  	this.isRed = false;
	  },
   	getPacket() {
    	if(this.$store.state.refreshToken == '') {
    		this.isRed = false
    		this.isShowLoginModal = true
    	}else{
				this.isGet=4
			}
    },
    getNext() {
			this.isRed = false;
			this.isGuild = true;
			this.isGetImg = 1;
    },
    nextBtn1() {
			this.isGetImg ++;
    },
    nextBtn4() {
			this.isGuild = false;
			this.isGetImg = 1;
			this.isRed = true;
			this.isGet = 2;
    },
    getRedPacket() {
			this.$CPOST('/activity/v1/rewardgifts/receiveUserRewardGifts',{},(res) => {
				if(res.resultCode == 200){
					this.isRed = false;
					this.shareFinish();
					this.$router.push({path: '/personal/assets/cash'});
				}else{
					this.isGet = 1
				}
			})
   	},
   	guideButton() {
   		this.isGuild = false;
			this.isGetImg = 1;
   	},
	beforeDestroy(){
		this.isRed = false;
	},
	shareFinish() {
	this.$CPOST('/task/v1/task/userDoTask',{
		key: 'FIRST_READ'
    	})
    }
  }
}
</script>
<style>
.index_banner_pagination .swiper-pagination-bullet{width: 24px;height: 4px;margin: 0 5px;background: #d2d2d2;display: inline-block;cursor: pointer;border-radius: 0;opacity: .5;}
.index_banner_pagination .swiper-pagination-bullet-active{background: #c60c1b;opacity: 1;}
</style>
<style scoped>
.swiper-button-next{}
/*****新手红包*****/
.red_paper {width: 100%;height: 100%;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: url(../../assets/img/redPacket/red_packet_bg.png) no-repeat;background-size: 100% 100%;z-index: 100;display: table;}
.red_paper_div {vertical-align: middle;display: table-cell;}
.red_paper_pic {width: 290px;height: 366px;: 0 auto;background: url(../../assets/img/redPacket/old_user.png) no-repeat center;background-size: 100% 100%;}
.red_paper_pic>p {line-height: 38px;text-align: right;}
.red_paper_pic>p .red_paper_button1 {width: 14px;height: 14px;background: none;margin-right: 12px;border: none;outline: none;cursor: pointer;}
.red_paper_pic>div {line-height: 85px;text-align: center;margin-top: 183px;}
.red_paper_pic>div .red_paper_button2 {width: 86px;height: 86px;background: none;border: none;outline: none;cursor: pointer;}
.red_paper_new {width: 290px;height: 366px;margin: 0 auto;background: url(../../assets/img/redPacket/new_user.png) no-repeat center;background-size: 100% 100%;}
.red_paper_main {text-align: center;}
.red_paper_main>p {line-height: 38px;text-align: right;}
.red_paper_main>p .red_paper_but1 {width: 14px;height: 14px;background: none;margin-right: 17px;border: none;outline: none;cursor: pointer;}
.red_paper_main>div {line-height: 38px;text-align: center;margin-top: 216px;}
.red_paper_main>div .red_paper_but2 {width: 230px;height: 38px;background: none;border: none;outline: none;cursor: pointer;display: block;margin: 0 auto;}
.red_paper_main>a {width: 95px;height: 18px;cursor: pointer;margin: 0 auto;display: inline-block;margin-top: 10px;}
.red_paper_solid {width: 290px;height: 366px;margin: 0 auto;background: url(../../assets/img/redPacket/new_zhuanxiang_03.png) no-repeat center;background-size: 100% 100%;}
.red_paper_solid>p {line-height: 38px;text-align: right;}
.red_paper_solid>p .red_paper_button1 {width: 14px;height: 14px;background: none;margin-right: 12px;border: none;outline: none;cursor: pointer;}
.red_paper_solid>div {line-height: 85px;text-align: center;margin-top: 183px;}
.red_paper_solid>div .red_paper_button2 {width: 86px;height: 86px;background: none;border: none;outline: none;cursor: pointer;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;}
.red_paper_most {width: 290px;height: 366px;margin: 0 auto;background: url(../../assets/img/redPacket/new_lin_03.png) no-repeat center;background-size: 100% 100%;}
.red_paper_list {text-align: center;}
.red_paper_list>p {line-height: 38px;text-align: right;}
.red_paper_list>p .red_paper_butmot1 {width: 14px;height: 14px;background: none;margin-right: 12px;border: none;outline: none;cursor: pointer;}
.red_paper_list>div {line-height: 38px;text-align: center;margin-top: 226px;}
.red_paper_list>div .red_paper_butmot2 {width: 206px;height: 38px;background: none;border: none;outline: none;cursor: pointer;display: block;margin: 0 auto;}
.guild_list{width: 100%;height: 100%;max-width: 1920px;min-width: 1200px;position: fixed;z-index: 100;top: 0;left: 0;overflow: hidden;background-color: #aaa;font-size: 0;}
.guild_list>div{width: 100%;height: 100%;position: relative;overflow-x: hidden;overflow: hidden;}
.guild_list>div>img{width: 100%;height: auto;}
.guide_next{position: absolute;display: block;}
.guide_img01{background: url(../../assets/img/redPacket/guide01.jpg) no-repeat center top;background-size: cover;}
.guide_img02{background: url(../../assets/img/redPacket/guide02.jpg) no-repeat center top;background-size: cover;}
.guide_img03{background: url(../../assets/img/redPacket/guide03.jpg) no-repeat center top;background-size: cover;}
.guide_img04{background: url(../../assets/img/redPacket/guide04.jpg) no-repeat center top;background-size: cover;}
.guideNext{width: 387px;position: absolute;top: 75%;left: 0;right: 0;margin: 0 auto;overflow: hidden;}
.guideNext_p{height: 36px;color: #fff;font-size: 22px;text-align: center;}
.guideNext>a{width: 94px;line-height: 94px;border: solid 2px #fff;display: block;margin: 0 auto;border-radius: 50%;color: #fff;font-size: 14px;text-align: center;}
.guideNext_pp{height: 1000px;width: 2px;background: #fff;margin: 0 auto;}
.guideButton{width: 2%;height: 6.5%;position: absolute;top: 6px;right: 5px;border: none;border-radius: 50%;cursor: pointer;opacity: 0;filter: alpha(opacity=0);}
.main{max-width: 1920px;min-width: 1220px;margin: auto;margin-bottom: 80px;}
.index_banner{width: 100%;height: 330px;}
.swiper-slide{width: 100%;height: 100%;cursor: pointer;background-repeat: no-repeat;background-position: center;}
.index_banner_pagination{width: 100%;line-height: 3px;text-align: center;height: 3px;position: absolute;bottom: 20px;}
.banner-next,.banner-prev{width: 40px;height: 100%;line-height: 330px;position: absolute;top: 0;margin-top: 0;opacity: .8;-moz-transition: all .4s ease 0s; transition: all .4s ease 0s; -webkit-transition: all .4s ease 0s;}
.banner-next{right: 120px;background: url(../../assets/img/banner_next.png) no-repeat center;}
.banner-prev{left: 120px;background: url(../../assets/img/banner_prev.png) no-repeat center;}
.banner-next:hover,.banner-prev:hover{opacity: 1;}
.banner-next>img,.banner-prev>img{vertical-align: middle;width: 20px;height: 35px;cursor: pointer;}
.index_container{width: 1220px;margin: auto;margin-top: 33px;position: relative;}
.index_container_theme{clear: both;}
.index_container_head_tuijian{width: 805px;height: 74px;}
.index_container_head{width: 100%;height: 74px;}
.index_container_name{float: left;color: #444;font-size: 24px;font-weight: bold;padding-left: 20px;line-height: 74px;}
.index_container_name>img{width: 30px;height: 25px;vertical-align: middle;margin-right: 8px;}
.index_refresh{float: right;color: #888;font-size: 14px;padding-right: 10px;margin-top: 35px;cursor: pointer;}
.index_container_list_zuixin{height: 191px;}
.index_container_list{height: 440px;}
.index_container_detail{width: 385px;height: 188px;border: 1px solid #d1d1d1;border-top: 0;float: left;margin: 0 9px 30px 9px;position: relative;}
.index_dayTask{height: 191px;border: 0;float: right;margin-right: 14px;}
.dayTask{width: 387px;height: 264px;float: right;margin-top: -74px;}
.dayTask_head{width: 367px;height: 74px;margin: auto;}
.dayTask_name{padding-left: 0;}
.dayTask_body{width: 385px;height: 188px;background: #fff;border: 1px solid #d1d1d1;border-top: 2px solid #c60c1b;overflow: hidden;}
.dayTask_body_list{width: 367px;margin: auto;}
/*签到按钮*/
.banner_box{position: relative;}
.signIn{width: 91px;height: 91px;background: url(../../assets/img/sign_bg.png) no-repeat center;background-size: cover;position: absolute;right: -60px;top: -80px;z-index: 1;cursor: pointer;}
.signIn_box{width: 62px;height: 62px;margin: auto;margin-top: 15px;overflow: hidden;}
.signIn_not{width: 100%;height: 100%;line-height: 62px;text-align: center;font-size: 22px;color: #fff;}
.signIn_yet{width: 100%;height: 100%;}
.signIn_yet>p:nth-child(1){margin: auto;width: 55px;height: 23px;line-height: 23px;text-align: center;font-size: 14px;color: #fff;font-weight: bold;margin-top: 8px;background: url(../../assets/img/sign_xian.png) no-repeat bottom;}
.signIn_yet>p:nth-child(2){margin: auto;width: 55px;height: 23px;line-height: 23px;text-align: center;font-size: 12px;color: #fde3e4;}
.confirm_modal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;display: none;}
.confirm_box{width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or{width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head{width: 100%;height: 32px;}
.confirm_main_head>p{float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span{display: block;float: right;cursor: pointer;}
.confirm_text{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;}
.confirm_btn{width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button{width: 98px;height: 32px;background: url(../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
</style>

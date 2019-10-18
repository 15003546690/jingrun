<template>
  <div class="main">
		<!--banner-->
		<div class="banner_box">
			<!--<Banner/>-->
			<swiper class="index_banner" :options="swiperOption"  >
		    <swiper-slide :style="{backgroundImage: 'url(' + i.img+ ')'}" v-for='i in bannerList'>
		    	<!--<div class="aa" :style="{backgroundImage: 'url(' + i.img+ ')'}"></div>-->
		    </swiper-slide>
		    <div class="swiper-pagination index_banner_pagination" slot="pagination"></div>
		    <div class="swiper-button-next banner-next" slot="button-next"></div>
		    <div class="swiper-button-prev banner-prev" slot="button-prev"></div>
		  </swiper>
			<div class="signIn" @click="showSignModal">
		  	<div class="signIn_box">
		  		<p :class="checkSign.keepDays >=1 ? 'hide' : 'signIn_not'" @click='signn'>签到</p>
		  		<div :class="checkSign.keepDays >=1 ? 'signIn_yet' : 'hide'" @click='signn'>
		  			<p>已签到</p>
		  			<p>连续{{checkSign.keepDays}}天</p>
		  		</div>
		  	</div>
		  </div>
		  <!--  -->
		  <Sign v-if="isShowSign" :checkSign.sync="checkSign" :isSign.sync="isSign" @hideSignModal="hideSignModal" />
		</div>
		<!--题材-->
		<div class="index_container">
			<!--推荐题材-->
			<div class="index_container_theme">
				<div class="index_container_head_tuijian">
					<p class="index_container_name"><img src="../../assets/img/index_tuijian_icon.png"/><i>推荐话题</i></p>
					<span class="index_refresh" @click='onnextPage(0)'>换一换>></span>
				</div>
				<ul class="index_container_list">
					<Group v-for="item in event[3].list.slice(0, 2)" :key="item.groupId" :group="item" />
					<!--每日任务-->
					<li class="index_container_detail index_dayTask">
						<div class="dayTask">
							<div class="dayTask_head">
								<p class="index_container_name dayTask_name"><img src="../../assets/img/index_task_icon.png"/><i>每日任务</i></p>
								<span class="index_refresh dayTask_all" @click="showTaskModal">全部任务</span>
							</div>
							<div class="dayTask_body">
								<ul class="dayTask_body_list">
									<Task v-for="(item,index) in taskList" :key="index" :taskList="item"/>
								</ul>
							</div>
						</div>
						<TaskList v-if="isClose" @hideTaskModal="hideTaskModal" />
					</li>
					<Group v-for="item in event[3].list.slice(0,3)" :key="item.groupId" :group="item" />
				</ul>
			</div>
			<!--热门题材-->
			<div class="index_container_theme">
				<div class="index_container_head">
					<p class="index_container_name"><img src="../../assets/img/index_remen_icon.png"/><i>热门话题</i></p>
					<span class="index_refresh" @click='nextPage(2,0,6)'>换一换>></span>
				</div>
				<ul class="index_container_list">
					<Group v-for="item in event[2].list" :key="item.groupId" :group="item" />
				</ul>
			</div>
			<!--最新题材-->
			<div class="index_container_theme">
				<div class="index_container_head">
					<p class="index_container_name"><img src="../../assets/img/index_zuixin_icon.png"/><i>最新话题</i></p>
					<span class="index_refresh" @click='nextPage(0,0,3)'>换一换>></span>
				</div>
				<ul class="index_container_list_zuixin">
					<Group v-for="item in event[0].list" :key="item.groupId" :group="item" />
				</ul>
			</div>
			<!--临期题材-->
			<div class="index_container_theme">
				<div class="index_container_head">
					<p class="index_container_name"><img src="../../assets/img/index_linqi_icon.png"/><i>临期话题</i></p>
					<span class="index_refresh" @click='nextPage(1,0,3)'>换一换>></span>
				</div>
				<ul class="index_container_list_zuixin">
					<Group v-for="item in event[1].list" :key="item.groupId" :group="item" />
				</ul>
			</div>
			<!--新手问答-->
			<!--<Question />-->
			<div class="index_Question">
		    <ul>
		      <router-link to="/others/problems" tag="li">
		        <img src="../../assets/img/index_question_img01.png" />
		        <img src="../../assets/img/index_question_img11.png" />
		       <span>查看详情</span>
		      </router-link>
		      <router-link to="/others/problems" tag="li" class="question_li">
		        <img src="../../assets/img/index_question_img2.png" />
		        <img src="../../assets/img/index_question_img2.png" />
		        <p class="question_head">新手问答</p>
		        <span>更多问题</span>
		      </router-link>
		      <router-link to="/others/problems" tag="li">
		        <img src="../../assets/img/index_question_img03.png" />
		        <img src="../../assets/img/index_question_img33.png" />
		        <span>查看详情</span>
		      </router-link>
		      <router-link to="/others/problems" tag="li">
		        <img src="../../assets/img/index_question_img04.png" />
		        <img src="../../assets/img/index_question_img44.png" />
		        <span>查看详情</span>
		      </router-link>
		      <li @click="getNext">
		        <img src="../../assets/img/index_question_img05.png" />
		        <img src="../../assets/img/index_question_img55.png" />
		        <span>查看详情</span>
		      </li>
		      <router-link to="/others/problems" tag="li">
		        <img src="../../assets/img/index_question_img06.png" />
		        <img src="../../assets/img/index_question_img66.png" />
		        <span>查看详情</span>
		      </router-link>
		      <router-link to="/others/problems" tag="li">
		        <img src="../../assets/img/index_question_img07.png" />
		        <img src="../../assets/img/index_question_img77.png" />
		        <span>查看详情</span>
		      </router-link>
		    </ul>
		  </div>
		</div>
		<!--新手红包-->
		<div class="red_paper" v-if="isRed">
	    <div class="red_paper_div">
		    <!--老用户-->
		    <div class="red_paper_pic">
		        <p><button class="red_paper_button1 red_paper_close" @click="hideRed"></button></p>
		        <div><button class="red_paper_button2 red_paper_show_guide"></button></div>
		    </div>
	     	<!--新手任务完成领取红包-->
	    	<div class="red_paper_new">
			    <div class="red_paper_main">
			        <p><button class="red_paper_but1 red_paper_close" @click="hideRed"></button></p>
			        <div><button class="red_paper_but2 red_paper_receive" @click="getRedPacket"></button></div>
			        <router-link tag="a" to="personal/assets/cash" class="red_paper_account"></router-link>
			    </div> 
	     	</div>
	      	<!--未登录提示 -->
		    <div class="red_paper_solid">
		        <p><button class="red_paper_button1 red_paper_close" @click="hideRed"></button></p>
		        <div><button class="red_paper_button2 red_paper_to_register" @click="getPacket"></button></div>
		    </div>
	   
	   		<!--完成新手任务 -->
	   		<div class="red_paper_most">
			    <div class="red_paper_list">
			        <p><button class="red_paper_butmot1 red_paper_close" @click="hideRed"></button></p>
			        <div><button class="red_paper_butmot2 red_paper_show_guide" @click="getNext"></button></div>
			    </div> 
	     	</div>
	    </div>
		</div>
		<div class="guild" id="gg">
			<div class="guide_img1">
				<img src="../../assets/img/redPacket/guide01.jpg"/>
				<button class="guide-next guide-next-1" style="left: 913px;" @click="nextBtn1"></button>
			</div>
			<div class="guide_img2">
				<img src="../../assets/img/redPacket/guide02.jpg"/>
				<button class="guide-next guide-next-2" style="left: 913px;" @click="nextBtn2"></button>
			</div>
			<div class="guide_img3">
				<img src="../../assets/img/redPacket/guide03.jpg"/>
				<button class="guide-next guide-next-3" style="left: 913px;" @click="nextBtn3"></button>
			</div>
			<div class="guide_img4">
				<img src="../../assets/img/redPacket/guide04.jpg"/>
				<button class="guide-next guide-next-4" style="left: 913px;" @click="nextBtn4"></button>
			</div>
		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"/>
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
import redPacket from './redPacket'
import Login from '../common/Login'

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
    redPacket,
    Login
  },
  data () {
    return {
	  loginToken: null,
	  isRed: false,
	  isGuide: false,
	  isClose: false ,
	  isShowLoginModal: false,
	  swiperOption: {
	    autoplay: 3000,
	    loop: true,
	    pagination: '.swiper-pagination',
	    paginationClickable: true,
	    prevButton: '.swiper-button-prev',
	    nextButton: '.swiper-button-next',
	    bannerList:null,
	    token:null
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
          list: []
        }
      ],
      isShowSign: false,
      checkSign: [],
      sign: [],
      isSign: false,
      taskList: [],
      bannerList: [],
      page:0,
      token:null
    }
  },
  beforeMount() {
		this.isLogin()
		this.token=JSON.parse(sessionStorage.getItem('token')).token
		this.getRecommendEvent(0)
	  this.getHotEvent(0)
	  this.getNewestEvent(0)
	  this.getExpireEvent(0)
	  this.task()
	  this.loginToken=JSON.parse(sessionStorage.getItem('loginToken')).loginToken
	  this.getRedBox(0)
	  this.checkSignDay()
	  this.onnextPage(0)
	  this.openSign()
  },

  /*mounted(){
		if(this.token==null){
			  location.replace(URL)
		}
  },*/
  methods: {
  	hideRed() {
	  	this.isRed = false
	  	let body = document.querySelector('body')
	  	body.style.overflow = 'auto'
	  },
	  showLoginModal () {
      this.$emit('showLoginModal')
    },
  	hideLoginModal() {
      this.isShowLoginModal = false
    },
  	openSign(){
  		this.loginToken=JSON.parse(sessionStorage.getItem('loginToken')).loginToken
  		this.$axios.post('/task/v1/task/findSignNum' + this.$signParam(), {		
    	},{
				headers:{
					Authorization:this.loginToken
				}
			})
    	.then(res => {
    		this.checkSign = data.resultValue
    	})
  	},
  	//获取token
  	/*isLogin(){
        this.$axios.post('/uaa/oauth/token?client_id=ifuturex_swagger&client_secret=gKWwZI1g&grant_type=client_credentials')
        .then(res=>{   
          this.token=res.data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+res.data.access_token
					let obj={
            token:this.token
          }
          let obj1=JSON.stringify(obj)
          sessionStorage.setItem('token',obj1) 
          this.getRecommendEvent(0)
				  this.getHotEvent(0)
				  this.getNewestEvent(0)
				  this.getExpireEvent(0)
				  this.task()
        })
    },*/
    //推荐题材
    /*getRecommendEvent (page) {
      this.$axios.post('/event/v1/homeRecommend/queryPCHomeRecommend' + this.$signParam(),
			{					
        homeEventType: 2,
        page:0,
        size: 5
      },{
				headers:{
					Authorization:this.token
				}
			})
      .then(res => {
				//alert('成功')
				console.log(res.data)
        const data = res.data
        this.event[3].list = data.resultValue.eventGroupEntitys
        this.event[3].page = page
        this.bannerList = data.resultValue.bannerList
      })
<<<<<<< .mine
   },*/
  	/*isLogin(){
        this.$axios.post('/uaa/oauth/token?client_id=ifuturex_swagger&client_secret=gKWwZI1g&grant_type=client_credentials')
        .then(res=>{   
          this.token=res.data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+res.data.access_token
					let obj={
            token:this.token
          }
          let obj1=JSON.stringify(obj)
          sessionStorage.setItem('token',obj1) 
        })  
    },
    },*/
  	isLogin(){
        this.$axios.post('/uaa/oauth/token?client_id=ifuturex_swagger&client_secret=gKWwZI1g&grant_type=client_credentials')
        .then(res=>{   
          this.token=res.data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+res.data.access_token
					let obj={
            token:this.token
          }
          let obj1=JSON.stringify(obj)
          sessionStorage.setItem('token',obj1) 
        })  
    },
/*   },*/
		//新手红包
   	 getRedBox (page) {
      this.$axios.post('/event/v1/homeRecommend/queryPCHomeRecommend' + this.$signParam(),
			{					
        homeEventType: 2,
        page:0,
        size: 5
      },{
				headers:{
					Authorization:this.loginToken
				}
			})
      .then(res => {
      	const data = res.data
        this.redPacket = data.resultValue.isReward
        if(this.redPacket.proceed == true) {
        	if(this.redPacket.proceed == true && this.redPacket.user == true){
        		if(this.redPacket.proceed == true && this.redPacket.user == true && this.redPacket.receive == false) {
        			this.isRed = true
        		}
        	}
        }else{
        	this.isRed = false
        }
      })
   	},
    //推荐题材
    getRecommendEvent (page) {
      this.$axios.post('/event/v1/homeRecommend/queryPCHomeRecommend' + this.$signParam(),
			{					
        homeEventType: 2,
        page:0,
        size: 5
      },{
				headers:{
					Authorization:this.token
				}
			})
      .then(res => {
				//alert('成功')
        const data = res.data
        this.event[3].list = data.resultValue.eventGroupEntitys
        this.event[3].page = page
        this.bannerList = data.resultValue.bannerList
        console.log(this.bannerList)
      })
   	},
    getPacket() {
    	if(this.loginToken == null) {
    		this.isRed = false
    		this.$router.push({path: '/register'})
    	}else{
				let getBtn = document.querySelector('.red_paper_solid') 
				getBtn.style.display="none"
				let getNext = document.querySelector('.red_paper_most') 
				getNext.style.display="block"
			}
    },
    getNext() {
    	let scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
    	let body = document.querySelector('body')
  	  body.style.overflow = "hidden"
			let modal = document.querySelector('.guild')
			modal.style.display = 'block'
			modal.style.top = scrollTop + 'px';
			let guildMain = document.querySelector('.guide_img1')
			guildMain.style.display = 'block'
			let guild = document.querySelector('.guide_img1 img')
			let btn1 = document.querySelector('.guide-next-1')
			
    	if (window.innerWidth < 1920) {
					guild.style.marginLeft=  (window.innerWidth - 1920) / 2 + 'px';
					btn1.style.left = (window.innerWidth - 1920) / 2 + parseFloat(btn1.style.left) + 'px';
			}
    },
    nextBtn1() {
    	let guildBox1 = document.querySelector('.guide_img1')
    	guildBox1.style.display="none"
    	let guildBox2 = document.querySelector('.guide_img2')
    	guildBox2.style.display="block"
    	let guildImg2 = document.querySelector('.guide_img2 img')
			let btn2 = document.querySelector('.guide-next-2')
    	if (window.innerWidth < 1920) {
					guildImg2.style.marginLeft=  (window.innerWidth - 1920) / 2 + 'px';
					btn2.style.left = (window.innerWidth - 1920) / 2 + parseFloat(btn2.style.left) + 'px';
			}
    },
    nextBtn2() {
    	let guildBox2 = document.querySelector('.guide_img2')
    	guildBox2.style.display="none"
    	let guildBox3 = document.querySelector('.guide_img3')
    	guildBox3.style.display="block"
    	let guildImg3 = document.querySelector('.guide_img3 img')
			let btn3 = document.querySelector('.guide-next-3')
    	if (window.innerWidth < 1920) {
					guildImg3.style.marginLeft=  (window.innerWidth - 1920) / 2 + 'px';
					btn3.style.left = (window.innerWidth - 1920) / 2 + parseFloat(btn3.style.left) + 'px';
			}
    },
    nextBtn3() {
    	let guildBox3 = document.querySelector('.guide_img3')
    	guildBox3.style.display="none"
    	let guildBox4 = document.querySelector('.guide_img4')
    	guildBox4.style.display="block"
    	let guildImg4 = document.querySelector('.guide_img4 img')
			let btn4 = document.querySelector('.guide-next-4')
    	if (window.innerWidth < 1920) {
					guildImg4.style.marginLeft=  (window.innerWidth - 1920) / 2 + 'px';
					btn4.style.left = (window.innerWidth - 1920) / 2 + parseFloat(btn4.style.left) + 'px';
			}
    },
    nextBtn4() {
    	let closeBtn = document.querySelector('.guild')
    	closeBtn.style.display="none"
    	let guildBox4 = document.querySelector('.guide_img4')
    	guildBox4.style.display="none"
    	let get = document.querySelector('.red_paper_most')
    	get.style.display="none"
    	let getMoney = document.querySelector('.red_paper_new')
    	getMoney.style.display="block"
    },
    getRedPacket() {
			this.$axios.post('/activity/v1/rewardgifts/receiveUserRewardGifts' + this.$signParam(), {
	    	},
	    	{
					headers:{
						Authorization:this.loginToken
					}
				})
			.then(res => {
//				/const data = res.data
				if(res.data.resultMessages == 'success'){
					alert('您已领取成功')
					this.isRed = false
					this.$router.push({path: '/personal/assets/cash'})
				}else{
					let yetPacket = document.querySelector('.red_paper_pic')
					yetPacket.style.display = "block"
					let getMoney = document.querySelector('.red_paper_new')
    			getMoney.style.display="none"
				}
			})
    },
  	signn(){
  		this.loginToken=JSON.parse(sessionStorage.getItem('loginToken')).loginToken
  		if(this.loginToken==null) {
  			alert(1)
				this.showLoginModal()
  		}else{
  			this.$axios.post('/task/v1/task/findSignNum' + this.$signParam(), {		
    	},{
				headers:{
					Authorization:this.loginToken
				}
			})
    	.then(res => {
    		console.log(res.data)
    		let left=document.querySelector('.sign_modal_left').querySelectorAll('li')
    		let right=document.querySelector('.sign_modal_right').querySelectorAll('li')
    		if(res.data.resultValue.keepDays==0){
    			
    		}else if(res.data.resultValue.keepDays==1){
    			left[0].className='signed'
    			right[0].className='text_signed'
    		}else if(res.data.resultValue.keepDays==2){
    			left[0].className='signed'
    			right[0].className='text_signed'
    			left[1].className='signed'
    			right[1].className='text_signed'
    		}else if(res.data.resultValue.keepDays==3){
    			left[0].className='signed'
    			right[0].className='text_signed'
    			left[1].className='signed'
    			right[1].className='text_signed'
    			left[2].className='signed'
    			right[2].className='text_signed'
    		}else if(res.data.resultValue.keepDays==4){
    			left[0].className='signed'
    			right[0].className='text_signed'
    			left[1].className='signed'
    			right[1].className='text_signed'
    			left[2].className='signed'
    			right[2].className='text_signed'
    			left[3].className='signed'
    			right[3].className='text_signed'
    		}else if(res.data.resultValue.keepDays==5){
    			left[0].className='signed'
    			right[0].className='text_signed'
    			left[1].className='signed'
    			right[1].className='text_signed'
    			left[2].className='signed'
    			right[2].className='text_signed'
    			left[3].className='signed'
    			right[3].className='text_signed'
    			left[4].className='signed'
    			right[4].className='text_signed'
    		}else if(res.data.resultValue.keepDays==6){
    			left[0].className='signed'
    			right[0].className='text_signed'
    			left[1].className='signed'
    			right[1].className='text_signed'
    			left[2].className='signed'
    			right[2].className='text_signed'
    			left[3].className='signed'
    			right[3].className='text_signed'
    			left[4].className='signed'
    			right[4].className='text_signed'
    			left[5].className='signed'
    			right[5].className='text_signed'
    		}else if(res.data.resultValue.keepDays==7){
    			left[0].className='signed'
    			right[0].className='text_signed'
    			left[1].className='signed'
    			right[1].className='text_signed'
    			left[2].className='signed'
    			right[2].className='text_signed'
    			left[3].className='signed'
    			right[3].className='text_signed'
    			left[4].className='signed'
    			right[4].className='text_signed'
    			left[5].className='signed'
    			right[5].className='text_signed'
    			left[6].className='signed'
    			right[6].className='text_signed'
    		}
    		const data = res.data
    		this.checkSign = data.resultValue
    	})
		}
  		
  	},
  	onnextPage (page) {
			this.page++
			if(this.page==3){
				this.page=0
			}
      this.$axios.post('/event/v1/homeRecommend/queryPCHomeRecommend' + this.$signParam(),
			{					
        homeEventType: 2,
        page:this.page,
        size: 5
      },{
				headers:{
					Authorization:this.token
				}
			})
      .then(res => {
      	console.log(res.data)
        const data = res.data
        this.event[3].list = data.resultValue.eventGroupEntitys
        this.event[3].page = page
        this.bannerList = data.resultValue.bannerList
      })
   },
  	nextPage(groupEventCondition, page, size){
  		this.page++
			if(this.page==3){
				this.page=0
			}
  		this.$axios.post('/event/v1/eventGroup/queryPCEventGroup' + this.$signParam(), {
        classifyId: 0,
        groupEventCondition,
        page:this.page,
        size
      },{
				headers:{
					Authorization:this.token
				}
			})
      .then(res => {
        const data = res.data
        this.event[groupEventCondition].list = data.resultValue.eventGroupEntityParams
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
      this.$axios.post('/event/v1/eventGroup/queryPCEventGroup' + this.$signParam(), {
        classifyId: 0,
        groupEventCondition,
        page,
        size
      },{
				headers:{
					Authorization:this.token
				}
			})
      .then(res => {
        const data = res.data
        this.event[groupEventCondition].list = data.resultValue.eventGroupEntityParams
        this.event[groupEventCondition].page = page
      })
    },
   	checkSignDay() {
   		this.$axios.post('/task/v1/task/findSignNum' + this.$signParam(), {
    		
    	},{
				headers:{
					Authorization:this.loginToken
				}
			})
    	.then(res => {
    		const data = res.data
    		this.checkSign = data.resultValue
    	})
//  	.catch(err => {
//  		const data = res.response.data
//  		alert(data.status)
//  	})
   	},
   	task() {
   		this.$axios.post('/task/v1/task/showDailyTask' + this.$signParam(), {
   			
   		},
   		{
				headers:{
					Authorization:this.token
				}
			})
    	.then(res => {
    		console.log(res.data)
    		const data = res.data
    		this.taskList = data.resultValue
    	})
   	},
		showSignModal () {
      if(this.loginToken == null) {
        this.isShowLoginModal = true
      }else{
        this.isShowSign = true
      }
     },
   	hideSignModal () {
      this.isShowSign = false
   	},
   	showTaskModal () {
      this.isClose = true
   	},
   	hideTaskModal () {
      this.isClose = false
   	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index_banner_pagination .swiper-pagination-bullet{
  width: 24px;
  height: 3px;
  margin: 0 5px;
  background: #d2d2d2;
  display: inline-block;
  cursor: pointer;
}
.index_banner_pagination .swiper-pagination-bullet-active{
  background: #c60c1b;
}
</style>
<style scoped>
.red_paper_pic,.red_paper_new,.red_paper_most{
	display: none;
}
.guild{
	width: 100%;
	height: 100%;
	max-width: 1920px;
	min-width: 1200px;
	position: absolute;
	z-index: 100;
	top: 0;
	left: 0;
	overflow: hidden;
	background-color: #aaa;
	font-size: 0;
	display: none;
}
.guild>div{
  width: 100%;
	height: 100%;
	position: relative;
	overflow: auto;
	overflow-x: hidden;
}
.guide_img2,.guide_img3,.guide_img4{
	display: none;
}
.guide-next{
	position: absolute;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
.guide-next-1{
	width: 94px;
  height: 94px;
  top: 700px;
  padding: 0;
}
.guide-next-2{
	width: 94px;
  height: 94px;
  top: 700px;
  padding: 0;
}
.guide-next-3{
	width: 94px;
  height: 94px;
  top: 740px;
  padding: 0;
}
.guide-next-4{
	width: 94px;
  height: 94px;
  top: 740px;
  padding: 0;
}
.main{
	max-width: 1920px;
	min-width: 1220px;
	margin: auto;
	margin-bottom: 80px;
}
.index_banner{
  width: 100%;
  height: 330px;
}
.swiper-slide{
  width: 100%;
  height: 100%;
  /*background: url(../../assets/img/index_banner.png) no-repeat center;*/
  background-size: cover;
  cursor: pointer;
}
.index_banner_pagination{
  width: 100%;
  line-height: 3px;
  text-align: center;
  height: 3px;
  position: absolute;
  bottom: 20px;
}
.banner-next,.banner-prev{
  width: 20px;
  height: 100%;
  line-height: 330px;
  position: absolute;
  top: 0;
  margin-top: 0;
}
.banner-next{
  right: 120px;
  background: url(../../assets/img/index_banner_right.png) no-repeat center;
}
.banner-prev{
  left: 120px;
  background: url(../../assets/img/index_banner_left.png) no-repeat center;
}
.banner-next>img,.banner-prev>img{
  vertical-align: middle;
  width: 20px;
  height: 35px;
  cursor: pointer;
}
.index_container{
	width: 1220px;
	margin: auto;
	margin-top: 33px;
}
.index_container_theme{
    clear: both;
}
.index_container_head_tuijian{
	width: 805px;
	height: 74px;
}
.index_container_head{
	width: 100%;
	height: 74px;
}
.index_container_name{
	float: left;
	color: #444444;
	font-size: 24px;
	font-weight: bold;
	padding-left: 20px;
	line-height: 74px;
}
.index_container_name>img{
	width: 30px;
	height: 25px;
	vertical-align: middle;
	margin-right: 8px;
}
.index_refresh{
	float: right;
	color: #888888;
	font-size: 14px;
	padding-right: 10px;
	margin-top: 35px;
	cursor: pointer;
}
.index_container_list_zuixin{
	height: 191px;
}
.index_container_list{
	height: 440px;
}
.index_container_detail{
	width: 385px;
	height: 188px;
	border: 1px solid #d1d1d1;
	border-top: 0;
	float: left;
	margin: 0 9px 30px 9px;
	position: relative;
}
.index_dayTask{
	height: 191px;
	border: 0;
}
.dayTask{
	width: 387px;
	height: 264px;
	float: right;
	margin-top: -73px;
}
.dayTask_head{
	width: 367px;
    height: 74px;
    margin: auto;
}
.dayTask_name{
	padding-left: 0;
}
.dayTask_body{
    width: 385px;
    height: 188px;
    background: #fff;
    border: 1px solid #d1d1d1;
    border-top: 2px solid #c60c1b;
    overflow: hidden;
}
.dayTask_body_list{
	width: 367px;
	margin: auto;
}
/*签到按钮*/
.banner_box{
	position: relative;
}
.signIn{
	width: 91px;
	height: 91px;
	background: url(../../assets/img/sign_bg.png) no-repeat center;
	background-size: cover;
	position: absolute;
	right: 180px;
	bottom: -46px;
	z-index: 1;
	cursor: pointer;
}
.signIn_box{
	width: 62px;
	height: 62px;
	margin: auto;
	margin-top: 15px;
	overflow: hidden;
}
.signIn_not{
	width: 100%;
	height: 100%;
	line-height: 62px;
	text-align: center;
	font-size: 22px;
	color: #ffffff;
}
.signIn_yet{
	width: 100%;
	height: 100%;
}
.signIn_yet>p:nth-child(1){
	margin: auto;
	width: 55px;
	height: 23px;
	line-height: 23px;
	text-align: center;
	font-size: 14px;
	color: #FFFFFF;
	font-weight: bold;
	margin-top: 8px;
	background: url(../../assets/img/sign_xian.png) no-repeat bottom;
}
.signIn_yet>p:nth-child(2){
	margin: auto;
	width: 55px;
	height: 23px;
	line-height: 23px;
	text-align: center;
	font-size: 12px;
	color: #fde3e4;
}
/*****新手红包*****/
.red_paper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(../../assets/img/redPacket/red_packet_bg.png) no-repeat;
    background-size: 100% 100%;
    z-index: 100;
    display: table;
}
.red_paper_div {
    vertical-align: middle;
    display: table-cell;
}
.red_paper_pic {
    width: 290px;
    height: 366px;
    margin: 0 auto;
    background: url(../../assets/img/redPacket/old_user.png) no-repeat center;
    background-size: 100% 100%;
}
.red_paper_pic>p {
    line-height: 38px;
    text-align: right;
}
.red_paper_pic>p .red_paper_button1 {
    width: 14px;
    height: 14px;
    background: none;
    margin-right: 12px;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_pic>div {
    line-height: 85px;
    text-align: center;
    margin-top: 183px;
}
.red_paper_pic>div .red_paper_button2 {
    width: 86px;
    height: 86px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_new {
    width: 290px;
    height: 366px;
    margin: 0 auto;
    background: url(../../assets/img/redPacket/new_user.png) no-repeat center;
    background-size: 100% 100%;
}
.red_paper_main {
    text-align: center;
}
.red_paper_main>p {
    line-height: 38px;
    text-align: right;
}
.red_paper_main>p .red_paper_but1 {
    width: 14px;
    height: 14px;
    background: none;
    margin-right: 17px;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_main>div {
    line-height: 38px;
    text-align: center;
    margin-top: 216px;
}
.red_paper_main>div .red_paper_but2 {
    width: 230px;
    height: 38px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    display: block;
    margin: 0 auto;
}
.red_paper_main>a {
    width: 95px;
    height: 18px;
    cursor: pointer;
    margin: 0 auto;
    display: inline-block;
    margin-top: 10px;
}
.red_paper_solid {
    width: 290px;
    height: 366px;
    margin: 0 auto;
    background: url(../../assets/img/redPacket/new_zhuanxiang_03.png) no-repeat center;
    background-size: 100% 100%;
}
.red_paper_solid>p {
    line-height: 38px;
    text-align: right;
}
.red_paper_solid>p .red_paper_button1 {
    width: 14px;
    height: 14px;
    background: none;
    margin-right: 12px;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_solid>div {
    line-height: 85px;
    text-align: center;
    margin-top: 183px;
}
.red_paper_solid>div .red_paper_button2 {
    width: 86px;
    height: 86px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
}
.red_paper_most {
    width: 290px;
    height: 366px;
    margin: 0 auto;
    background: url(../../assets/img/redPacket/new_lin_03.png) no-repeat center;
    background-size: 100% 100%;
}
.red_paper_list {
    text-align: center;
}
.red_paper_list>p {
    line-height: 38px;
    text-align: right;
}
.red_paper_list>p .red_paper_butmot1 {
    width: 14px;
    height: 14px;
    background: none;
    margin-right: 12px;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_list>div {
    line-height: 38px;
    text-align: center;
    margin-top: 226px;
}
.red_paper_list>div .red_paper_butmot2 {
    width: 206px;
    height: 38px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    display: block;
    margin: 0 auto;
}
.index_Question{
	width: 1200px;
	margin: 0 auto;
	clear: both;
	overflow: hidden;
}
.index_Question>ul{
    width: 1227px;
    height: 332px;
    margin-top: 20px;
    margin-left: -10px;
}
.index_Question>ul>li{
	float: left;
	width: 295px;
	height: 162px;
	margin-bottom: 6px;
	margin-left: 9px;
	position: relative;
	cursor: pointer;
}
.index_Question>ul>li>img{
	width: 100%;
	height: 100%;
}
.index_Question>ul>li>img+img{
	display: none;
}
.index_Question>ul>li.question_li{
	width: 598px;
	height: 162px;
}
.index_Question>ul>li>span{
	position: absolute;
	top: 105px;
	left: 118px;
	color: #fff;
	font-size: 12px;
	cursor: pointer;
	z-index: 1;
}
.question_head{
	width: 100%;
	height: 34px;
	line-height: 34px;
	text-align: center;
	color: #2e3132;
	font-size: 22px;
	font-weight: bold;
	position: absolute;
	top: 50px;
	left: 0;
}
.index_Question>ul>li.question_li>span{
	width: 118px;
	height: 28px;
	line-height: 28px;
	text-align: center;
	display: block;
	background: #c60c1b;
	color: #fff;
	font-size: 14px;
    position: absolute;
    left: 237px;
    top: 93px;
}
.index_Question>ul>li:hover img+img{
	display: inline;
}
.index_Question>ul>li:hover img{
	display: none;
}
</style>

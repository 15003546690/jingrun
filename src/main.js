// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'

import axios from 'axios'
import qs from 'qs'
import md5 from 'blueimp-md5'
import Cookies from 'js-cookie'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import dateFormat from 'dateformat'
import $ from 'jquery'
import jQuery from 'jquery'
//按需导入第三方插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/nodata.png',
  loading: 'static/loading.svg',
  attempt: 1,
  listenEvents: [ 'scroll' ],
  lazyComponent: true
})
Vue.use(echarts)
// import layer from 'vue-layer'

// Vue.use(ElementUI)

Vue.use(ElementUI)
Vue.use(vuex);
var store = new vuex.Store({//store对象
    state:{
        token:'',
        refreshToken:'',
        userImg:'',
        userNickName:'',
        userGrade:'',
        navIdx:0,
        wuxianTitle:'“无限豆”是特定活动中使用的货币，用户进入可交易的活动并成功参与后，'+'\n'+'系统自动分配给用户，并绑定到该活动的所有题材下，不能通过充值获取。'+'\n'+'用户在活动中所盈利的无限豆将作为活动排名的依据。',
        weilaiTitle:'“未来豆”是未来无限网用于话题交易的专属货币，'+'\n'+'可以通过充值、任务、签到或平台赠送等方式获得',
        jindouTitle:'“金豆”是用户交易赚取的货币，金豆是用户获利的体现，可以兑换奖品、兑换未来豆'
    },
     mutations: {
      setToken (state,t) {
        state.token = t;
      },
      setRefreshToken (state,t) {
        state.refreshToken = t;
      },
      setUserImg (state,t) {
        state.userImg = t;
      },
      setUserNickName (state,t) {
        state.userNickName = t;
      },
      setUserGrade(state,t) {
        state.userGrade = t;
      },
      setNavIdx(state,t) {
        state.navIdx = t;
      }
    }
})

Vue.config.productionTip = false
Vue.config.debug = true
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$md5 = md5
Vue.prototype.$Cookies = Cookies
Vue.prototype.$dateFormat = dateFormat
// Vue.prototype.$axios.defaults.baseURL = 'http://np.ifuturex.com:7500'
Vue.prototype.$axios.defaults.baseURL = 'http://192.168.0.13:7500'
// Vue.prototype.$axios.defaults.baseURL = 'http://192.168.0.202:7500'
// Vue.prototype.$axios.defaults.baseURL = 'http://192.168.0.240:7500'
// app
// Vue.prototype.$axios.defaults.baseURL = 'https://api.ifuturex.com:443'

Vue.use(VueAwesomeSwiper)

/* 常量和函数 */
Vue.prototype.$echarts = echarts;
Vue.prototype.$base_url = 'https://api.ifuturex.com:443'
// Vue.prototype.$base_url = 'http://192.168.0.13:7500'
// Vue.prototype.$base_url = 'http://192.168.0.202:7500'
Vue.prototype.$client_id = 'ifuturex70sh5dl3'
Vue.prototype.$client_secret = 'ub21t5m4ypokcetebd7x082lar1frzu4'
Vue.prototype.$timestamp = () => Math.floor(new Date().getTime());
Vue.prototype.$GetQueryString = () => {
	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}

//token
Vue.prototype.$postFlag = true;

window.Promise = Promise;

Vue.prototype.$signParam = (str) => {
  const query = `client_id=${Vue.prototype.$client_id}&timestamp=${Vue.prototype.$timestamp()}`;
  const query2 = `client_id${Vue.prototype.$client_id}timestamp${Vue.prototype.$timestamp()}`;
  // str = (query + (str ? `&${strs}` : ``)).split('&').sort((a, b) => {
  //   return a.split('=')[0] > b.split('=')[0]
  // }).join('&');
  // console.log(Vue.prototype.$client_secret + query + Vue.prototype.$client_secret)
  return `?${query}&sign=${Vue.prototype.$md5(Vue.prototype.$client_secret + query2 + Vue.prototype.$client_secret).toUpperCase()}`
}
//cookie操作
Vue.prototype.$setCookie = (name, value,m) => {
   var d = new Date;
    d.setTime(d.getTime() + m*1000);
    // d.setTime(d.getTime())
    // console.log(Date.parse(d))
    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
Vue.prototype.$getCookie = (name) => {
  var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
Vue.prototype.$delCookie = (name) => {
  Vue.prototype.$setCookie(name, '', -1);
}
//tip弹层
Vue.prototype.$CTIP = (txt) => {
	var tipid = document.getElementsByClassName('tip_dialog');
   if(tipid.length){
        // 如果tip_dialog还在，则不再执行
        return;
    }
  let tipsTpl = Vue.extend({
        template: '<transition name="fade" enter-class="fade-in-enter" enter-active-class="fade-in-active" leave-class="fade-out-enter" leave-active-class="fade-out-active" class="tip_dialog"><div style="width:200px; background:rgba(0,0,0,.6); color:#fff; font-size:16px; position:absolute; z-index:9999; left:50%; top:50%; margin-left:-100px; padding:20px; border-radius:10px; text-align:center;\">' + txt + '</div></transition>'
    });
    let tpl = new tipsTpl().$mount().$el;
    document.body.appendChild(tpl);
    setTimeout(function () {
        document.body.removeChild(tpl);
    }, 2000)

}

//百度统计
router.afterEach( ( to, from, next ) => {
      setTimeout(()=>{
              var _hmt = _hmt || [];
              (function() {
                  //每次执行前，先移除上次插入的代码
                  document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?4933824c3bcc9fccd852b3be0d6c0d58";
                  hm.id = "baidu_tj"
                  var s = document.getElementsByTagName("script")[0];
                  s.parentNode.insertBefore(hm, s);
              })();
      },0);
  } );
//ajax请求组件
Vue.prototype.$CPOST = (url,arg,success,error) =>{
 var sign = Vue.prototype.$signParam();
 // console.log('vue.token==>'+store.state.token)
 //  console.log('vue.refreshToken==>'+store.state.refreshToken)
 setTimeout(() => {
 	axios.post(url + sign, arg,{
     headers:{
       Authorization:store.state.token
     }
   })
    .then(res => {
       const data = res.data;
       if(data.resultCode == 1011){
        // store.commit('setRefreshToken','')
        //  	window.location.reload(true);
        }else{
        	if(typeof success === 'function'){
				    success(data);
	       }
        }
       
    })
   .catch(error => {
   	 if (error.response) {
      if(error.response.status == 401 || error.response.status == 403 || error.response.status == 307){
        store.commit('setRefreshToken','')
        if(Vue.prototype.$getCookie('token') == null){
      	 window.location.reload(true);
        }
      }else{
        this.$alert('网络繁忙，请刷新页面重试！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload(true);
          }
        });
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
      if(typeof error === 'function'){
     	  // error();
      }
   })
 },50)
  
}
//ajax请求组件GET方式
Vue.prototype.$CGET = (url,arg,success,error) =>{
 var sign = Vue.prototype.$signParam();
 // console.log('vue.token==>'+store.state.token)
 //  console.log('vue.refreshToken==>'+store.state.refreshToken)
 setTimeout(() => {
 	axios.get(url + sign + arg,{
     headers:{
       Authorization:store.state.token
     }
   })
     .then(res => {
       const data = res.data;
       if(data.resultCode == 1011){
        }else{
          if(typeof success === 'function'){
            success(data);
         }
        }
     })
   .catch(err => {
      if (error.response) {
      if(error.response.status == 401 || error.response.status == 403 || error.response.status == 307){
        store.commit('setRefreshToken','')
        if(Vue.prototype.$getCookie('token') == null){
         window.location.reload(true);
        }
      }else{
        this.$alert('网络繁忙，请刷新页面重试！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload(true);
          }
        });
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
      if(typeof error === 'function'){
        // error();
      }
   })
 },50)
  
}
//埋点console.log(returnCitySN.cip)
Vue.prototype.$Bury = (path,id,type,name) =>{
  if(id == 'undefined'){
    id='';
  }
  Vue.prototype.$CPOST('/share/v1/track/addTrackLog', {
    trackState:path,
    eventValue:id,
    clientId:0,
    trackType:type,//埋点类型（ 0-默认 1-活动 2-题材组 3-题材）
    trackKey:name,
    userIp:returnCitySN.cip
  },(res) => {
    console.log(res)
  })
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

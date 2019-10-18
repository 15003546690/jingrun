<template>
  <div id="app" class="main_box">
    <keep-alive>
      <router-view name="header" :isShowUserInfo="isShowUserInfo" :usericon="usericon" :nickname="nickname" :classify="classify"
       @showLoginModal="showLoginModal"></router-view>
    </keep-alive>
    <router-view></router-view>
    <FooterNormal></FooterNormal>
    <Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
  </div>
</template>

<script>
import FooterNormal from '@/components/common/FooterNormal'
import Login from '@/components/common/Login'

export default {
  name: 'app',
  data () {
    return {
      isShowLoginModal: false,
      isShowUserInfo: false,
      usericon: '',
      nickname: '',
      classify: [],
      classifyTemp: [],
      token: null,
      refreshToken:null,
      user:null,
      expires_in:0,
    }
  },
  components: {
    FooterNormal,
    Login
  },
  created () {
      this.token = this.$getCookie('token');
      this.refreshToken = this.$getCookie('refreshToken');
      this.isLogin();
  },
   methods: {
    isLogin(){
      // this.token = this.$getCookie('token');
      // if(this.token == null){
        this.$axios.post('/uaa/oauth/token?client_id=ifuturex70sh5dl3&client_secret=ub21t5m4ypokcetebd7x082lar1frzu4&grant_type=client_credentials')
        .then(res=>{   
          var token=res.data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+res.data.access_token;
          this.expires_in = parseInt(res.data.expires_in);
          if(this.token == null){
            console.log('写入了！！！！！！！！！！！')            
            this.$store.commit('setToken', token);
            this.$setCookie('token',token,this.expires_in);
          }
          this.setToken();
          
        })
      // }else{
      //   this.setToken();
      // }
      
    },
    refresh(){
      var speed = (this.expires_in-1)*1000;
      setTimeout(() => {
          console.log('speed=>>'+speed)
          // this.$delCookie('token');
          if(this.$store.state.refreshToken != '' ){
            this.$axios.post('/uaa/oauth/token?client_id=ifuturex70sh5dl3&client_secret=ub21t5m4ypokcetebd7x082lar1frzu4&grant_type=refresh_token&refresh_token='+this.$store.state.refreshToken,{
            })
              .then(res=>{
                console.log('refreshToken=='+JSON.stringify(res.data))
                let login_token = res.data.token_type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())+' '+res.data.access_token;
                this.expires_in = parseInt(res.data.expires_in);
                this.$setCookie('token',login_token,this.expires_in);
                this.$setCookie('refreshToken',res.data.refresh_token,this.expires_in);
                this.$store.commit('setToken', login_token);
                this.$store.commit('setRefreshToken', res.data.refresh_token);
                // this.$router.go(0);
              })
          }else{
              
            this.isLogin()
            // this.$router.go(0);
          }
        },speed)
    },
    setToken(){
        if(this.refreshToken != null){
          var refreshToken = this.$getCookie('refreshToken');
          this.$store.commit('setRefreshToken', refreshToken);
          var token = this.$getCookie('token')
          this.$store.commit('setToken', token);
            var userObj = JSON.parse(window.localStorage.getItem('user'));
            this.$store.commit('setUserImg',userObj.userImg);
            this.$store.commit('setUserNickName',userObj.userNickName);
            this.$store.commit('setUserGrade',userObj.userGrade);
        }else{
          var token = this.$getCookie('token');
          this.$store.commit('setToken', decodeURIComponent(token));
        }
        this.refresh();
        
    },
    scrollTop () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    showLoginModal () {
      this.isShowLoginModal = true
    },
    hideLoginModal () {
      this.isShowLoginModal = false
    },
    showUserInfo () {
      this.isShowUserInfo = true
    },
    // 查询一级分类
    getClassify () {
      this.$CPOST('/event/v1/eventClassify/queryEventClassify',{},(res) =>{
        this.classifyTemp = res.resultValue.list;
        this.getClassifySub();
      })
    },
    // 根据一级分类id查询二级分类
    getClassifySub () {
      this.classifyTemp.map((item, index) => {
        this.$CPOST('/event/v1/eventClassify/queryEventClassifySub',{
          pClassify: item.classifyId
        },(res) =>{
          item.children = res.resultValue
          let n = 0
          this.classifyTemp.map((item2, index2) => {
            item2.children && n++
          })
          this.classifyTemp.length == n && (this.classify = this.classifyTemp)
        })
      })
    }
  }
}
</script>

<style>
body, h1, h2,h3,h4,h5,h6,p,dl,dd,ol,ul,form, input,textarea,th,td,select { margin:0; padding:0; font-size: 14px;}
em,i { font-style:normal;}
li { list-style:none;}
a { text-decoration:none; cursor:pointer; -moz-transition: all .4s ease 0s; transition: all .4s ease 0s; -webkit-transition: all .4s ease 0s;}
.anmite{ -moz-transition: all .4s ease 0s; transition: all .4s ease 0s; -webkit-transition: all .4s ease 0s;}
input,button{
	outline: none;
}
body{
	font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Microsoft YaHei","Arial", "Hiragino Sans GB","WenQuanYi Micro Hei";
	background: #fff;
}
/*CLEARFIX
-------------------------------------------------------------- */
.clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }
.clearfix { display: inline-block; }
* html .clearfix { height: 1%; }
.clearfix { display: block; }
/*---------------------------------------------------*/
.hide{
	display: none;
}
.fade-in-active,.fade-out-active{
  transition: all 0.5s ease
}
.fade-in-enter,.fade-out-active{
  opacity: 0 
}
.displayFlex{display: -webkit-flex; display: flex; flex-direction: row; flex-wrap:wrap;}
.flex1{flex: 1; -webkit-flex:1;}
/*水平居中*/
.flexCenter{justify-content:center;}
/*垂直居中*/
.flexMidle{align-items:center;}
.el-pager li.active{
  background-color: #c60c1a;
  border-color: #c60c1a;
}
.el-pager li:hover{color: #c60c1a;}
.el-pagination .btn-next:hover, .el-pagination .btn-prev:hover{color: #c60c1a;}
.el-pagination__editor:focus{border-color: #c60c1a;}
</style>

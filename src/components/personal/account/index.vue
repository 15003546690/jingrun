<template>
  <!--账户设置-->
  <div class="install">
    <div class="install_title">
      账户设置
    </div>
    <div class="install_nav">
      <div>
        <router-link to="/personal/account" tag="p" exact>个人资料</router-link>
        <span><img src="../../../assets/img/center/separate.png"/></span>
        <router-link to="/personal/account/safe" tag="p">安全设置</router-link>
        <span><img src="../../../assets/img/center/separate.png"/></span>
        <router-link to="/personal/account/bind" tag="p">账号绑定</router-link>
        <span><img src="../../../assets/img/center/separate.png"/></span>
        <router-link to="/personal/account/level" tag="p">会员等级</router-link>
        <span><img src="../../../assets/img/center/separate.png"/></span>
        <router-link to="/personal/account/address" tag="p">地址管理</router-link>
      </div>
    </div>
    <div class="install_div">
      <router-view />
    </div>
  </div>
</template>

<script>
	export default{
		data(){
			return {
				isShowSign: false,
				allInfro:[]
			}
		},
		created(){

		},
		methods:{
			showSignModal () {
      	this.isShowSign = true
   		},
			hideSignModal () {
      	this.isShowSign = false;
   		},
		  subMit() {
						this.$CPOST('/event/communication/v1/sendSMS',{},
						(res)=>{
			         	this.allInfro = res.data;
						})
        }
		}
	}
</script>
<style scoped>
.install{width: 940px;height: 1006px;margin-left: 33px;}
.install_title{line-height: 58px;font-size: 18px;color: #323232;font-weight: bold;}
.install_nav{height: 38px;border-bottom: 2px solid #ced4e0;position: relative;margin-bottom: 20px;}
.install_nav>div{display: inline-block;position: absolute;left: 0;top: 11px;}
.install_nav>div>p{width: 92px;float: left;line-height: 27px;text-align: center;font-size: 14px;color: #676767;cursor: pointer;}
.install_nav>div>span{width: 30px;line-height: 27px;float: left;vertical-align: middle;text-align: center;}
.router-link-active{color: #e52735 !important;border-bottom: solid 2px #e52735;}
</style>

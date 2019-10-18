<template>
  <div class="center_right">
  	<!---->
    <div class="center_page">
      <div class="center_page_left">
	        <p>我的未来豆</p>
			        <div class="center_page_left_div">{{userData.currency|comdify}}</div>
			        <div class="recharge">
			          <router-link to="../../personal/assets" tag="a">查看明细</router-link>
			          <a @click="goRecharge"><button>充值</button></a>
			        </div>
      </div>
      <div class="center_page_right">
	        <p>我的金豆</p>
	        <div class="center_page_left_div">{{userData.gold|comdify}}</div>
	        <div class="recharge">
	          <router-link to="../../personal/assets/gold" tag="a">查看明细</router-link>
	        </div>
      </div>
        <div class="center_page_right">
	        <p>现金账户<a>（满20元可提现）</a></p>
	        <div class="center_page_left_div">{{userData.userCashCurrency|comdify}}</div>
	        <div class="recharge">
		          <router-link to="../../personal/assets/cash" tag="a">查看明细</router-link>
		          <span class="recharge_ap1" v-if="userData.userCashCurrency >=20" @click="money">
		      				<img src="../../../assets/img/center/Withdraw.png"/>
		      		</span>
		      		<span class="recharge_ap2" v-if="userData.userCashCurrency <20"  disabled>
		          		<img src="../../../assets/img/center/withdraw-disabled.png"/>
		          </span>
	        </div>
      </div>
    </div>
    <!--最近交易题材-->
    <div class="center_page_table">
      <div class="center_page_table_top">
           <p>最近交易题材</p>
           <router-link to="/personal/join" tag="a">查看最近七天交易题材 <i></i></router-link>
      </div>
      <table border="0" cellspacing="0" cellpadding="0" class="table_one">
        <thead>
          <tr>
            <th class="thed1">到期时间</th>
            <th class="thed2">题材名称</th>
            <th class="thed3">状态</th>
            <th class="thed4">持仓</th>
            <th class="thed5">平均买价</th>
            <th class="thed6">现价</th>
            <th class="two_tt">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="elem in neweventdata" :key="elem.eventId">
            <td>
               	<P>{{formatDate(elem.eventEndTime)}}</P>
            </td>
            <td class="thed2"><p>{{elem.eventName}}</p></td>
            <td>
	            	<p v-if="elem.eventStatus==0">交易中</p>
	            	<p v-if="elem.eventStatus==1">已暂停</p>
	            	<p v-if="elem.eventStatus==2">已清算</p>
	            	<p v-if="elem.eventStatus==3">待清算</p>
            </td>
            <td>
            		<p>{{elem.positionType==0?'【YES】':'【NO】'}}</p>
                <p>{{elem.positionQuantity}}份</p>
            </td>
            <td>{{elem.averagerice}}</td>
            <td>{{elem.currentPrice}}</td>
            <!--<td class="check"><router-link :to="'/event/' + elem.eventId" tag="a">查看详情</router-link></td>-->
            <td class="check"><a @click="goDetail(elem.eventId)">查看详情</a></td>
          </tr>
        </tbody>
      </table>
        <div class="Not_trading" v-if="neweventdata==null">
          <div><img src="../../../assets/img/center/caution.png"/></div>
          <p>暂无记录，<router-link tag="a" to="/">去交易</router-link></p>
        </div>
    </div>
    <!--最近参加的活动-->
    <div class="center_page_table">
      <div class="center_page_table_top">
        <p>最近参加的活动</p>
        <router-link to="/personal/campaign" tag="a">查看全部活动 <i></i> </router-link>
      </div>
      <table border="0" cellspacing="0" cellpadding="0" class="table_two">
        <thead>
          <tr>
            <th class="table_two_th">活动名称</th>
            <th class="table_two_tt">状态</th>
            <th class="two_tt">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lists" :key="item.activityId">
            <td>
              <div class="td_div">
                <div class="td_div_img">
                  <img v-lazy="item.firstImg"/>
                </div>
                <div class="td_div_title">
                  <div>{{item.allName}}</div>
                  <p>{{item.endWord}}</p>
                </div>
              </div>
            </td>
            <td class="point">{{item.status}}</td>
            <td class="post" v-if="item.cate==0"><router-link :to="'/activity/' + item.activityId" tag="a">查看详情</router-link></td>
            <td class="post" v-if="item.cate>=2"><router-link :to="'/newActivity/' + item.activityId" tag="a">查看详情</router-link></td>
          </tr>
        </tbody>
      </table>
      <div class="participate" v-if="lists==null">
	      <div><img src="../../../assets/img/center/caution.png"/></div>
	      <p>暂无记录，<router-link tag="a" to="/activity">去参加活动</router-link></p>
	    </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        userData:{    //个人账户明细
          currency:'0.00',
          gold:'0.00',
          userCashCurrency:'0.00'
        },
        neweventdata:[],   //获取最近交易题材数据
        lists: [],   //获取最近交易活动数据
        code: '',
        cate:''
      }
    },
    created(){
      setTimeout(() => {
        this.getUserInfo();
        this.getNewestData();
        this.campaign();
        this.addTrackLog();
      },50)
    },
    //千分位
    filters:{
    	  comdify(n) { 
          let re = /\d{1,3}(?=(\d{3})+$)/g; 
          let n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { 
          	return s1.replace(re, "$&,") + s2; 
          }); 
          return n1; 
        } 
    },
    methods:{
      // 用户查询个人中心
      getUserInfo(){
        this.$CPOST('/account/v1/userInfo/queryUserInfo',{},(res) => {
            this.userData=res.resultValue;
				})
      },
      //埋点
			addTrackLog() {
				this.$Bury(window.location.href,'',0,'gerenzhongxin_02009')
			},
			//充值
			goRecharge() {
				this.$router.push({path:'/personal/recharge'})
				this.$Bury(parent.location.href,'',0,'chongzhi_05002')
			},
      // 用户最新交易的题材
      getNewestData(){
        this.$CPOST('/account/v1/userInfo/userNewestEventInfo',{
      		size: 4,
      		page: 0
        },(res) => {
          this.neweventdata=res.resultValue.userNewestEventInfo;
				})
      },
      goDetail(id) {
      	this.$CPOST('/event/v1/eventInformation/queryEventInformation',{
      		eventId: id
      	},(res) => {
      		this.type = res.resultValue.eventInformationEntity.eventPurchaseType
      		if(this.type == 1) {
      			this.$router.push({path: '/subscribeDetail/' + id})
      		}else{
      			this.$router.push({path: '/event/' + id})
      		}
				})
      },
      // 最近参加的活动
      campaign () {
	    	this.$CPOST('/activity/v1/activity/app/findJoinActivity',{
	    		page: 0,
	    		size: 2
	    	},(res) => {
	    	this.lists = res.resultValue.infos;
	    	this.cate = res.resultValue.infos.cate;
	    	})
	    },
	    money(){
	    	this.$CPOST('/account/v1/userCashAccount/queryUserCashAccount',{},(res) => {
         var alipay=res.resultValue.userCashAccount.alipayAccount;
          if(alipay==''){
          	this.$CPOST('/account/v1/withdrawDeposit/getBindAliAccountData',{
          		authorizeSource: 1
          	},(res) => {
							var app_id = res.resultValue.app_id;
							var scope = "auth_user";
							var redirect_uri = encodeURIComponent("http://www.ifuturex.com/#/personal/withdrawals/bind/alipay");
							var alipayUrl = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id='+app_id+'&scope='+scope+'&redirect_uri='+redirect_uri;
							window.location.href = alipayUrl;
          	})
          }else{
            this.$router.push('../../personal/withdrawals/bind/alipay')
          }
        })
			},
		  //时间戳转换  
      formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
			}
    }
  }
</script>
<style scoped>
.hide{display: none;}
.center_page{height: 202px;border-bottom: dashed 1px #ccc;}
.center_page_left,.center_page_right{width:33%;height: 202px;float: left;}
.center_page_left{overflow: hidden;}
.center_page_left>p,.center_page_right>p{line-height: 54px;font-size: 18px;color: #474e5d;	margin-top: 18px;font-weight: bold;}
.center_page_left>p>a,.center_page_right>p>a{font-size: 14px;color: #474e5d;	margin-top: 18px;font-weight: 500;}
.center_page_left_div{line-height: 40px;color: #474e5d;font-size: 40px;}
.recharge{line-height: 65px;font-size: 14px;    }
.recharge a{color: #323232;}
.recharge a:hover{color: #e42a33;}
.recharge button{width: 86px;height: 29px;line-height: 29px;font-size: 14px;color: white;background: #e42634;outline: none;border-radius: 2px;border: none;margin-left: 21px;cursor: pointer;}
.recharge>span{height: 26px;line-height: 26px;margin-left: 14px;cursor: pointer;display: inline-block;vertical-align: middle;}
.center_page_table{min-height: 360px;margin-top: 20px;position: relative;}
.Not_trading{width: 938px;height: 256px;position: absolute;bottom: 0;left: 0;background: white;}
.Not_trading>div{line-height: 114px;text-align: center;margin-top: 32px;}
.Not_trading>p{text-align: center;font-size: 14px;color: #a4a4a4;}
.Not_trading>p>a{color: #3282ff;}
.Not_trading>p>a:hover{text-decoration: underline;}
.participate{width: 938px;height: 244px;position: absolute;bottom: 0;left: 0;background: white;}
.participate>div{line-height: 114px;text-align: center;margin-top: 32px;}
.participate>p{text-align: center;font-size: 14px;color: #a4a4a4;}
.participate>p>a{color: #3282ff;}
.participate>p>a:hover{text-decoration: underline;}
.center_page_table_top{line-height: 60px;}
.center_page_table_top>p{font-size: 18px;color: #323232;font-weight: bold;display: inline-block;}
.center_page_table_top>a{float:right;color: #676767;font-size: 14px;margin-right: 16px;cursor: pointer;}
.center_page_table_top>a>i{width: 8px;height: 8px;border-top: solid 1px #757575;border-right: solid 1px #757575;display: block;float: right;margin-top: 26px;transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);-o-transform:rotate(45deg);}
.center_page_table_top>a:hover{text-decoration: underline;}
.table_one{width: 938px;}
.table_one>thead>tr>th{height: 42px;background: #f0f0f0;font-size: 14px;color: #323232;}
.table_one>thead>tr>th.two_tt{width: 120px;text-align: right;padding-right: 34px;}
.table_one>tbody>tr>td.post{text-align: right;padding-right: 16px;font-size: 14px;color: #e52735;}
.table_one>tbody>tr>td{width: 137px;height: 63px;text-align: center;border-bottom: solid 1px #eee;font-size: 14px;color: #323232;}
.thed1,.thed3{width: 163px;}
.thed2{width: 168px;}
.thed2>p{width: 168px;}
.thed3{width: 87px;}
.thed4{width: 146px;}
.thed5{width: 70px;}
.check>a{width: 72px;line-height: 26px;margin-left:25px;border: none;display:inline-block;outline: none;cursor:pointer;background: none;border-radius: 2px;color: #e52735;}
.check>a:hover{background: #e42a33;color: white;}
.table_two{width: 938px;}
.table_two>thead>tr>th{height: 42px;background: #f0f0f0;font-size: 14px;color: #333;}
.table_two>thead>tr>th.table_two_th{width: 554px;}
.table_two>thead>tr>th.table_two_tt{width: 192px;text-align: center;}
.table_two>thead>tr>th.two_tt{width: 158px;text-align: right;padding-right: 34px;}
.table_two>tbody>tr>td{height: 149px;border-bottom: solid 1px #eee;}
.point{text-align: center;font-size: 14px;color: #323232;}
.post>a{width: 78px;line-height: 26px;display: inline-block;text-align:center;border: none;outline: none;border-radius: 2px;color: #e52735;cursor: pointer;}
.post>a:hover{background: #e42a33;color: white;}
.post {text-align: right;padding-right: 16px;font-size: 14px;color: #e52735;}
.td_div{height: 115px;}
.td_div_img{width: 236px;height: 100%;float: left;}
.td_div_img>img{width:100%;height:100%;}
.td_div_title{float: left;margin-left: 6px;width: 210px;}
.td_div_title>div{line-height: 18px;font-size: 16px;color: #323232;margin-top: 6px;}
.td_div_title>p{font-size: 14px;color: #676767;margin-top: 8px;}
</style>

<template>
  <!--现金账户-->
	  <div class="property_div">
	    <div class="property_div_title">
	      <div class="property_div_title_left">
	        <p>现金余额：{{cash.userCashCurrency}}</p>
	        <span v-if="cash.userCashCurrency >=20" @click="money">
	      		<img src="../../../../assets/img/center/Withdraw.png"/>
	  			</span>
	  		<span v-if="cash.userCashCurrency < 20">
	      		<img src="../../../../assets/img/center/withdraw-disabled.png" disabled/>
	      	</span>
	      </div>
	      <div class="property_div_title_right">
	        <div class="property_button">
	          <a>日期：</a>
	          <p style="margin-right: 10px;">
	          	<el-date-picker
					v-model="value1"
					type="date"
					placeholder="选择日期"
					@change="timeFire"
					:picker-options="pickerOptions1">
				</el-date-picker>
	          </p>
	          <span>—</span>
	          <p style="margin-right: 10px;">
	          	<el-date-picker
					v-model="value2"
					type="date"
					placeholder="选择日期"
					@change="timeSecond"
					:picker-options="pickerOptions2">
				</el-date-picker>
	          </p>
	        </div>
	        <button v-on:click="times">查询</button>
	      </div>
	    </div>
	    
	     <div class="listData" v-show="listData">
	      <div class="property_div_cash">
	        <table border="0" cellspacing="0" cellpadding="0">
	          <thead>
	            <tr>
	              <th class="th1">交易时间</th>
	              <th class="th2">内容说明</th>
	              <th class="th3">收支</th>
	            </tr>
	          </thead>
	          <tbody>
	            <tr v-for="im in lists" :key="im.userId">
	              <td class="th1">
	                <p>{{formatDate(im.createTime)}}</p>
	              </td>
	              <td>
	                <div>
	                  <p>{{im.changeResonData}}</p>
	                  <p>{{im.eventName}}</p>
	                </div>
	                
	              </td>
	              <td class="th3">{{im.changeAccount}}</td>
	            </tr>
	          </tbody>
	        </table>
	      </div>
	      <div class="paging">
	      	<el-pagination
			      @size-change = "handleSizeChange"
			      @current-change = "handleCurrentChange"
			      :current-page = "currentPage"
			      :page-size = 1
			      layout = "prev, pager, next, jumper"
			      :total = "totalPage">
			    </el-pagination>
	      </div>
    	</div>
	    <div class="noData" v-show="noData">
			<p><img src="../../../../assets/img/nodata_icon.png"/></p>
		</div>
	     <Alert :text='alertText' v-if='alert'></Alert>
  	</div>
</template>

<script>
import Alert from '../../../common/alert'
export default{
	components: {
		Alert
	},
	data(){
		return{
			//开始的日期
			pickerOptions1: {
				disabledDate(time) {
					return time.getTime() == Date.now() - 8.64e7;
				}
      },
      //结束的日期
      pickerOptions2: {
				disabledDate(time) {
					return time.getTime() == Date.now() - 8.64e7;
				}
      },
			value1:'',  //选中的开始日期
			value2:'',   //选中的结束日期
			startTime:null,  //开始时间 
			endTime:null,   //结束时间
			lists:[],   //获取现金明细数据
			cash: '',   //现金余额
			totalPage:null, //页数
			currentPage:1,    //当前页
			alert: false,
			alertText: '',
			listData:true,
			noData:false
		}
	},
	created(){
		this.$Bury(window.location.href,'',0,'xianjinzhanghuye_04007')
		setTimeout(()=>{
			this.pageSize();//明细列表 		   
			this.userCash();//现金余额
		},50)
	},
	methods: {
		//获取现金明细列表
		pageSize(){
			if(this.endTime<this.startTime){
				this.alert = true;
				this.alertText = '结束时间不能小于开始时间'
			}else if(this.endTime==this.startTime){
				this.endTime = this.endTime + 1000*60*60*24
			}else{
				this.endTime = this.endTime + 1000*60*60*24
			}
			this.$CPOST('/account/v1/userAccountStatement/queryUserAccountStatement',{
    		currencyType: 3,
			  page: this.currentPage-1,
			  size: 6,
			  startTime: this.startTime,
			  endTime: this.endTime
    	},(res) => {
    		this.lists = res.resultValue.eventGroupEntityParam;
    		this.totalPage = res.resultValue.totalPage;
    		if(this.lists.length>0){
    			this.listData=true;
    			this.noData=false;
    		}else{
    			this.noData=true;
    		}
    	})
		
		},
		//获取现金余额数据
		userCash(){
   		this.$CPOST('/account/v1/userCashAccount/queryUserCashAccount',{},(res) => {
    		this.cash = res.resultValue.userCashAccount;
    	})
   	},
		handleSizeChange(val) {
				this.pagesize = val;
        this.pageSize()
    },
    handleCurrentChange(val) {
    		this.currentPage = val;
    		this.pageSize()
    },
  	formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
		},
		timeFire(val){
			this.startTime=new Date(val).getTime()
		},
		timeSecond(val){
			this.endTime=new Date(val).getTime()
		},
		times() {
			this.currentPage = 1
			this.pageSize()
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
  }
}
</script>

<style>
.el-input__icon+.el-input__inner {padding-right: 35px;height: 27px;}
</style>
<style scoped>
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
.property_div{width: 100%;min-height: 843px;position: relative;}
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
/**/
.property_div_title{height: 50px;}
.property_div_title_left{float: left;}
.property_div_title_left>p{line-height: 28px;font-size: 14px;color: #323232;float: left;margin-right: 10px;}
.property_div_title_left>p>img{vertical-align: middle;margin-left: 4px;margin-top: -4px;}
.property_div_title_left>a{float: left;margin-left: 12px;cursor: pointer;}
.property_div_title_right{float: right;}
.property_button{font-size: 14px;color: #676767;display: inline-block;float: left;}
.property_button>a{line-height: 24px;height: 24px;display: inline-block;float: left;}
.property_button>span{line-height: 24px;height: 24px;display: inline-block;float: left;margin: 0 6px;}
.property_button>p{width: 103px;height: 27px;float: left;background-position: 80px;}
.property_button>p>input{width: 76px;height: 24px;line-height: 24px;outline: none;border: none;margin-left: 5px;}
.property_div_title_right>button{width: 68px;height: 23px;border: solid 1px #d9dbe1;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;font-size: 12px;color: #676767;float: left;
margin-left: 23px; margin-top: 2px;outline: none;background: none;}
/*现金账户明细*/
.property_div_cash>table{font-size: 14px;color: #676767;width: 100%;}
.property_div_cash>table>thead{background: #f0f0f0;line-height: 42px;}
.property_div_cash>table>thead>tr>th{height: 42px;background: #f0f0f0;text-align: center;font-size: 14px;color: #333;}
.property_div_cash>table>thead>tr>th.th1,
.property_div_cash>table>tbody>tr>td.th1{width: 158px;}
.property_div_cash>table>thead>tr>th.th2{width: 482px;}
.property_div_cash>table>thead>tr>th.th3,
.property_div_cash>table>tbody>tr>td.th3{width: 160px;}
.property_div_cash>table>tbody>tr>td{padding: 16px 0;border-bottom: solid 1px #eee;text-align: center;}
.property_div_cash>table>tbody>tr>td>div{width: 395px;margin: 0 auto;text-align: left;color: #323232;}
.paging{width: 100%;position:absolute;bottom:80px;}
.el-pagination{text-align: center;}
.el-date-editor.el-input {width: 123px;margin-top: -1px;margin-left: -2px;}
</style>

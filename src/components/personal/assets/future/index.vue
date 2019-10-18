<template>
  <!--未来豆明细-->
  <div class="property_div">
    <div class="property_div_title">
      <div class="property_div_title_left">
        <p>未来豆余额：{{balance.currency}}<img src="../../../../assets/img/center/bean.png"/></p>
        <a @click="torecharge()"><img src="../../../../assets/img/center/future-recharge.png"/></a>
      </div>
     <div class="property_div_title_right">
        <div class="property_button">
          <a>日期：</a>
          <p style="margin-right: 90px;">
          	<el-date-picker
				v-model="value1"
				type="date"
				placeholder="选择日期"
				@change="timeFire"
				:picker-options="pickerOptions1">
			</el-date-picker>
          </p>
          <span>—</span>
          <p style="margin-right: 90px;">
          	<el-date-picker
				v-model="value2"
				type="date"
				placeholder="选择日期"
				@change="timeSecond"
				:picker-options="pickerOptions2">
			</el-date-picker>
          </p>
        </div>
        <button @click="times">查询</button>
      </div>
    </div>
    <div class="listData">
      <div class="property_div_content">
        <table border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th class="th1">交易时间</th>
              <th class="th2">内容说明</th>
              <th class="th3">增减</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lists" :key="item.userId">
              <td class="th1">
                <p>{{formatDate(item.createTime)}}</p>
              </td>
              <td>
                <div>
                  <p>{{item.changeResonData}}</p>
                  <p>{{item.eventName}}</p>
                  <p v-if="lists.activeId != 0">{{item.activityName}}</p>
                </div>
              </td>
              <td class="th3">{{item.changeAccount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
			startTime:'',  //开始时间
			endTime:'',   //结束时间
			lists:[],   //获取现金明细数据
			balance:'',   //未来豆余额
			totalPage:0,   //页数
			currentPage:1,    //当前页
			alert: false,
			alertText: '',
			noData:false
		}
	},
	created(){
		this.$Bury(window.location.href,'',0,'zichanguanli_03008')
		this.userBalance()   //未来豆余额
   		this.pageSize();   //明细列表
	},
	methods: {
		handleSizeChange(val) {
			this.pagesize = val;
    	this.pageSize()
    },
    handleCurrentChange(val) {
    	this.currentPage = val;
    	this.pageSize()
    },
    torecharge(){
    	this.$router.push({path:'/personal/recharge'});
    	this.$Bury(location.href,'',0,'chongzhi_05002');
    },
		//获取未来豆明细列表
		pageSize(){
			if(this.endTime<this.startTime){
				this.alert = true;
				this.alertText = '结束时间不能小于开始时间'
			}else if(this.endTime==this.startTime){
				this.endTime = this.endTime + 1000*60*60*24
			}else if(this.endTime>this.startTime){
				this.endTime = this.endTime + 1000*60*60*24
			}
			this.$CPOST('/account/v1/userAccountStatement/queryUserAccountStatement',{
    		currencyType: 0,
			  page: this.currentPage-1,
			  size: 6,
			  startTime: this.startTime,
			  endTime: this.endTime
    	},(res) => {
    		this.lists = res.resultValue.eventGroupEntityParam;
    		this.totalPage = res.resultValue.totalPage;
    		if(this.lists.length>0){
    			this.noData = false;
    		}else{
    			this.noData = true;
    		}
    	})
	
		},
		times() {
			this.currentPage = 1;
			this.pageSize()
		},
		//获取未来豆余额
		userBalance() {
   		this.$CPOST('/account/v1/userAccount/queryUserAccount', {}, (res) => {
    		this.balance = res.resultValue.userAccountEntity;
    	})
   	},
		
  	formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
		},
		timeFire(val){
			this.startTime = new Date(val).getTime()
		},
		timeSecond(val){
			this.endTime = new Date(val).getTime()
		}
  }
}
</script>
<style>
.el-date-editor .el-input__inner {padding-right: 35px;height: 27px;}	
</style>
<style scoped>
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
.el-input__icon+.el-input__inner{padding-right: 35px; height: 30px;}
.property_div_title{height: 50px;}
.property_div_title_left{float: left;}
.property_div_title_left>p{line-height: 28px;font-size: 14px;color: #323232;float: left;}
.property_div_title_left>p>img{vertical-align: middle;margin-left: 4px;margin-top: -4px;}
.property_div_title_left>a{float: left;margin-left: 12px;cursor: pointer;}
.property_div_title_right{float: right;}
.property_button{font-size: 14px;color: #676767;display: inline-block;float: left;}
.property_button>a{line-height: 24px;height: 24px;display: inline-block;float: left;}
.property_button>span{line-height: 24px;height: 24px;display: inline-block;float: left;margin: 0 6px;}
.property_button>p{width: 103px;height: 27px;float: left;background-position: 80px;margin-right: 12px !important;}
.property_button>p>input{width: 76px;height: 24px;line-height: 24px;outline: none;border: none;margin-left: 5px;}
.property_div_title_right>button{width: 68px;height: 23px;border: solid 1px #d9dbe1;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;font-size: 12px;color: #676767;float: left;margin-left: 23px;margin-top: 2px;outline: none;background: none;cursor: pointer;}
.property_div_content>table{font-size: 14px;color: #676767;width: 100%;}
.property_div_content>table>thead{background: #f0f0f0;line-height: 42px;}
.property_div_content>table>thead>tr>th{height: 42px;background: #f0f0f0;text-align: center;font-size: 14px;color: #333;}
.property_div_content>table>thead>tr>th.th1,.property_div_content>table>tbody>tr>td.th1{width: 158px;}
.property_div_content>table>thead>tr>th.th2{width: 482px;}
.property_div_content>table>thead>tr>th.th3,.property_div_content>table>tbody>tr>td.th3{width: 160px;}
.property_div_content>table>tbody>tr>td{padding: 16px 0;border-bottom: solid 1px #eee;text-align: center;}
.th3_font{font-weight: bold;color: #323232;}
.property_div_content>table>tbody>tr>td>div{width: 380px;margin: 0 auto;text-align: left;color: #323232;}
.el-date-editor.el-input {width: 123px;margin-top: -1px;margin-left: -2px;}
.paging{width: 940px;position:absolute;bottom:80px;}
.el-pagination{text-align: center;}
</style>

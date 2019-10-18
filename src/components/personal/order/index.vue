<template>
	<div class="ticket" id="pageNav">
    	<div class="ticket_title">我的订单</div>
    	<div class="ticket_nav">
       	<ul class="ticket_nav_tab">
        	<li @click="awaitPage">
        		<router-link tag="a" to="/personal/orders/await">待成交</router-link>
        	</li>
       		<li @click="yetPage">
       			<i></i>
       			<router-link tag="a" to="/personal/orders"  exact>持仓</router-link>
       		</li>
       		<li @click="clearPage">
       			<i></i>
       			<router-link tag="a" to="/personal/orders/clear">平仓</router-link>
       		</li>
       	</ul>
       	<div class="hint">
       		<img src="../../../assets/img/center/hint.png"/>
       		<div class="hint_body">
       			<p>委托单就是用户买入/卖出题材的订单,委托单状态有三种,“待成交”,“持仓”,“平仓”。</p>
       		</div>
       	</div>
       	<div class="ticket_right">
           	<div class="screen">
           		<a>筛选：</a>
           		<select class="screen_select" v-model="selected" @change='screen'>
           			<option>全部</option>
       		    	<option>无限豆</option>
       		    	<option>未来豆</option>
           		</select>
           	</div>
           	<div class="ticket_search">
           		<input type="text" placeholder="请输入题材名称" v-model="eventName"/>
           	</div>
           	<button @click='refer'>查询</button>
   		</div>
    	</div>
    	<div class="ticket_div">
    		<router-view @DCJ="userAwait" @PC="userClear" :orderPosition="orderPosition" :orderAwait="orderAwait" :orderClear="orderClear" :totalPage="totalPage" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></router-view>
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
</template>

<script>
export default{
	data() {
		return {
			orderPosition: [],
			orderAwait: [],
			orderClear: [],
			selected:'全部',
			eventName: '',
			idx:0,
			currentPage: 1,
			totalPage: 1
		}
	},
	created() {
		setTimeout(()=>{
			this.userPosition();
		},50)
	},
	methods: {
		//查询
		refer() {
			this.currentPage = 1;
			if(this.$route.path.indexOf('await')>-1){
				this.userAwait();
			}else if(this.$route.path.indexOf('clear')>-1){
				this.userClear();
			}else{
				this.userPosition();
			}
		},
		//筛选
		screen() {
			this.currentPage = 1;
			if(this.$route.path.indexOf('await')>-1){
				this.userAwait();
			}else if(this.$route.path.indexOf('clear')>-1){
				this.userClear();
			}else{
				this.userPosition();
			}
		},
		awaitPage() {
			this.currentPage = 1;
			this.userAwait();
		},
		yetPage() {
			this.currentPage = 1;
			this.userPosition();
		},
		clearPage() {
			this.currentPage = 1;
			this.userClear();
		},
		//持仓列表
		userPosition () {
			if(this.selected=='全部'){
				this.idx=0;
			}else if(this.selected=='无限豆'){
				this.idx=1;
			}else if(this.selected=='未来豆'){
				this.idx=2;
			}
			/*持仓信息*/
	    	this.$CPOST('/order/v1/order/getUserPosition',{
	    		currency: this.idx,
		  		page: this.currentPage-1,
		  		eventName :this.eventName,
				size: 6
	    	},(res) => {
	    		this.orderPosition = res.resultValue.orderPositionResponseList;
	    		this.totalPage = Math.ceil(res.resultValue.totalElements/6);
	    	})
	    	this.$Bury(window.location.href,'',0,'wodedingdan_03005')
	   	},
	   	//分页
	   	handleSizeChange(val) {
			this.pagesize = val;
        	if(this.$route.path.indexOf('await') > -1){
    			this.userAwait();
    		}else if(this.$route.path.indexOf('clear') > -1){
    			this.userClear();
    		}else{
    			this.userPosition();
    		}
	    },
	    //分页
	    handleCurrentChange(val) {
    		this.currentPage = val;
    		if(this.$route.path.indexOf('await') > -1){
    			this.userAwait();
    		}else if(this.$route.path.indexOf('clear') > -1){
    			this.userClear();
    		}else{
    			this.userPosition();
    		}
	    },
   		//待成交列表
   		userAwait() {
   			if(this.selected=='全部'){
				this.idx=0;
			}else if(this.selected=='无限豆'){
				this.idx=1;
			}else if(this.selected=='未来豆'){
				this.idx=2;
			}
   			/*用户挂单信息*/
   			this.$CPOST('/order/v1/order/findHangOrder',{
	    		currency: this.idx,
		  		page: this.currentPage-1,
		  		eventName :this.eventName,
				size: 6
	    	},(res) => {
	    		this.orderAwait = res.resultValue.orderInfoResponseList;
	    		this.totalPage = Math.ceil(res.resultValue.totalElements/6);
	    	})
   			this.$Bury(window.location.href,'',0,'daichengjiao_04002')
   		},
   		//平仓列表
   		userClear() {
   			if(this.selected=='全部'){
				this.idx=0;
			}else if(this.selected=='无限豆'){
				this.idx=1;
			}else if(this.selected=='未来豆'){
				this.idx=2;
			}
   			this.$CPOST('/order/v1/order/getSettleAccounts',{
	    		currency: this.idx,
		  		page: this.currentPage-1,
		  		eventName :this.eventName,
				size: 6
	    	},(res) => {
	    		this.orderClear = res.resultValue.orderEveningUpResponseList;
	    		this.totalPage = Math.ceil(res.resultValue.totalElements/6);
	    	})
   			this.$Bury(window.location.href,'',0,'pingcang_04003')
   		}
	}
	
}
</script>

<style scoped>
.ticket{width: 940px;min-height: 1006px;margin-left: 33px;}
.ticket_title{line-height: 58px;font-size: 18px;color: #323232;font-weight: bold;}
.ticket_nav{height: 38px;border-bottom: 2px solid #ced4e0;margin-bottom: 20px;position: relative;}
.ticket_nav>ul{display: inline-block;position: absolute;left: 0;top: 11px;}
.ticket_nav>ul>li{width: 92px;float: left;line-height: 27px;text-align: center;font-size: 14px;color: #676767;cursor: pointer;}
.ticket_nav>ul>li>i{width: 1px; height: 12px; border-left: 1px solid #ced4e0; float: left; margin-top: 7px;}
.ticket_nav>ul>li>a{width: 100%; height: 100%; display: block; color: #676767;border-bottom: solid 2px #ced4e0;}
.ticket_nav>ul>li>a.router-link-active{color: #e52735 !important;border-bottom: solid 2px #e52735;}
.ticket_right{float: right;height: 28px;margin-top: 5px; display: flex; display: -webkit-flex;}
.screen{width: 143px;height: 28px;line-height: 28px;font-size: 14px;color: #323232;}
.screen>a{float: left;}
.screen_select{width: 80px;height: 28px;font-size: 14px;color: #676767;line-height: 28px;background: white;position: relative;vertical-align: middle;border: 1px solid #e6e6e6;vertical-align: top;outline: none;}
.screen_select_box{box-shadow: 0px 1px 18px #d9d9d9;-webkit-box-shadow: 0px 1px 18px #d9d9d9;-moz-box-shadow: 0px 1px 18px #d9d9d9;}
.screen_select>input{width: 75px;font-size: 14px;color: #676767;width: 90px;line-height: 28px;outline: none;border: none;background: #fff url(../../../assets/img/center/select_bg_03_03.png) no-repeat right;background-size: cover;cursor: pointer;padding-left: 15px;}
.select_ul{outline: none;background:white;width: 106px;position: absolute;top: 30px;}
.select_ul>li{line-height: 28px;padding-left: 10px;}
.ticket_search{width: 146px;height: 26px;border: solid 1px #e6e6e6;background: white;background: #fff url(../../../assets/img/center/gray_search.png) no-repeat 8px;background-position: 126px;}
.ticket_search>input{width: 114px;height: 26px;line-height: 26px;font-size: 12px;color: #444;border: none;outline: none;padding-left: 10px;}
.ticket_right>button{width: 68px;height: 23px;border: solid 1px #dddfe4;font-size: 12px;color: #676767;border-radius: 2px;outline: none;background: none;margin-left: 20px;margin-top: 3px;cursor: pointer;}
.ticket_right>button:hover{color: #e52735; border: 1px solid #e52735;}
.hint{width: 12px;height: 12px;line-height: 12px;float: right;text-align: center;position: relative;cursor: pointer;margin-left: 10px;margin-top: 8px;}
.hint>img{vertical-align: middle;margin-top: -3px;}
.hint_body{width: 250px;height: 124px;position: absolute;top: 10px;left: -120px;background: url(../../../assets/img/center/finsh.png) no-repeat center;background-size: 100% 100%;display: none;z-index: 10;}
.hint_body>p{margin: 0 auto;font-size: 12px;color: #323232;line-height: 18px;margin-top: 32px;width: 204px;text-align: left;}
.hint:hover .hint_body{display: block;}
.paging{width: 919px;position: absolute;bottom: 75px;}
.el-pagination{text-align: center;}
</style>
<template>
	<div>
		<div v-if="!rank.rangNum" class="rank_text">
			<p class="rank_num">
				<span>我的排行：</span>
				<i>{{rank.rangNum}}</i>
			</p>
			<p class="rank_money">
				<span>累计获利：</span>
				<i>{{rank.earnNum}}</i>
				<img title="“未来豆”是未来无限网用于话题交易的专属货币，可以通过充值、任务、签到或平台赠送等方式获得" src="../../../../assets/img/eventGroup/event_weilai.png"/>
			</p>
			<p class="rank_prize" v-show='Prize==true'>
				<span>待领奖品：</span>
				<i>{{rank.prizeName}}&nbsp;&nbsp;{{rank.prizeNum}}</i>
				<a @click='Receive'>去领取&gt;</a>
			</p>
		</div>
		<p class="rank_remark">备注：无交易行为的用户不能参与排行</p>
		<div class="rank_main">
			<ul class="rank_main_head">
				<li class="rank_main_num">排名</li>
				<li class="rank_main_name">用户名</li>
				<li class="rank_main_money">累计获利</li>
			</ul>
			<ul class="rank_main_body">
				<!--<RankPage v-for="item in rank.rangs" :rank="item" :key="item.activityId" />-->
				<li v-for="item in rank.rangs" :key="item.activityId" :class="currentPage==1?'bg':''">
					<p class="rank_main_figure"><i>{{item.ranking}}</i></p>
					<p class="rank_main_username"><img :src="item.userImg"/><span>{{item.userNickname}}</span></p>
					<p class="rank_main_profit">{{item.totalProfit}}</p>
				</li>
			</ul>
			<div class="paging">
	      		<el-pagination
			      @size-change = "handleSizeChange"
			      @current-change = "handleCurrentChange"
			      :current-page = this.currentPage
			      :page-size = 1
			      layout = "prev, pager, next, jumper"
			      :total = this.totalPage>
			    </el-pagination>
	      	</div>
		</div>
	</div>
</template>

<script>
	import RankPage from './RankPage'
	
	export default {
		components: {
	    	RankPage
	  	},
	  	data() {
	  		return {
	  			rank: [],
	  			Prize:true,
	  			totalPage: null,
	  			currentPage: 1
	  		}
	  	},
	  	created() {
	  		this.activityRank()
	  		if(this.rank.rangs==undefined){
    			this.Prize=false
    		}else{
    			this.Prize=true
    		}
	  	},
	  	methods: {
	  		handleSizeChange(val) {
				this.pagesize = val;
		        this.activityRank();
		    },
		    handleCurrentChange(val) {
	    		this.currentPage = val;
	    		this.activityRank();
		    },
	  		Receive(){
	  			this.$router.push({path:'/personal/assets/gift'})
	  		},
	  		activityRank () {
		    	this.$CPOST('activity/v1/activity/showRang', {
		    		activityId: this.$route.params.id,
		    		page: this.currentPage-1,
		    		size: 10
		    	},(res) => {
		    		this.rank = res.resultValue;
		    		this.totalPage = Math.ceil(res.resultValue.totalElement/10);
		    	})
		    }
	  	}
	}
</script>

<style scoped>
.activityD_text{
	height: 26px;
	margin-top: 10px;
}
.eventGroup_center_balance{
	height: 26px;
	line-height: 26px;
	display: inline-block;
}
.eventGroup_center_balance>span{
	color: #a4a4a4;
	font-size: 14px;
}
.eventGroup_center_balance>i{
	display: inline-block;
	vertical-align: middle;
	cursor: pointer;
}
.eventGroup_center_balance>p{
	display: inline-block;
	vertical-align: middle;
}
.eventGroup_center_balance>p>span>i{
	color: #323232;
	font-size: 22px;
}
.eventGroup_center_balance>p>span>img{
	margin-left: 3px;
}
.eventGroup_center_balance>p>button{
	width: 72px;
	height: 26px;
	background: #fff;
	border: 1px solid #dfdfdf;
	color: #c71220;
	font-size: 12px;
	cursor: pointer;
	margin-left: 5px;
    vertical-align: top;
}
.eventGroup_center_balance>p>button>img{
	vertical-align: text-top;
	margin-right: 5px;
}
.activityD_rank{
	height: 26px;
	display: inline-block;
	margin-left: 56px;
}
.activityD_rank>span{
	font-size: 14px;
	color: #676767;
}
.activityD_rank>i{
	font-size: 22px;
	color: #323232;
}
.activityD_rank>a{
	font-size: 14px;
	color: #888888;
	margin-left: 5px;
}
.activityD_mes_right{
	float: right;
}
.rank_main{
	width: 782px;
	height: 720px;
	margin-top: 10px;
    padding-bottom: 30px;
	border: 1px solid #e5e5e5;
	position: relative;
}
.rank_main_head{
	width: 100%;
	height: 48px;
	line-height: 48px;
	border-bottom: 1px solid #E5E5E5;
}
.rank_main_head>li{
	float: left;
	color: #676767;
	font-size: 14px;
}
.rank_main_num{
	width: 163px;
	text-align: center;
}
.rank_main_name{
	width: 230px;
	margin-left: 98px;
	padding-left: 20px;
}
.rank_main_money{
	width: 115px;
	text-align: center;
}
.rank_text{
	height: 26px;
	line-height: 26px;
	margin-top: 10px;
}
.rank_text>p{
	margin-right: 64px;
	float: left;
}
.rank_text>p>span{
	color: #676767;
	font-size: 14px;
}
.rank_text>p.rank_num>i{
	color: #323232;
	font-size: 22px;
}
.rank_text>p.rank_money>i{
	color: #c60c1b;
	font-size: 22px;
}
.rank_text>p.rank_prize>i{
	color: #323232;
	font-size: 18px;
}
.rank_text>p.rank_prize>a{
	color: #c60c1b;
	font-size: 14px;
	margin-left: 10px;
}
.rank_remark{
	line-height: 20px;
	color: #a5a5a5;
	font-size: 12px;
	clear: both;
}
.rank_main_body>li{
	height: 40px;
	margin-top: 20px;
}
.rank_main_body>li>p{
	float: left;
}
.rank_main_figure{
	width: 163px;
	height: 40px;
	line-height: 50px;
	text-align: center;
	color: #676767;
	font-size: 12px;
}
.rank_main_body>li>p>i{
	width: 44px;
	height: 35px;
	display: inline-block;
}
.rank_main_body>li.bg:first-child>p>i{
	background: url(../../../../assets/img/active/rank_one.png) no-repeat center;
}
.rank_main_body>li.bg:nth-child(2)>p>i{
	background: url(../../../../assets/img/active/rank_two.png) no-repeat center;
}
.rank_main_body>li.bg:nth-child(3)>p>i{
	background: url(../../../../assets/img/active/rank_three.png) no-repeat center;
}
.rank_main_username{
	width: 250px;
	line-height: 40px;
	color: #676767;
	font-size: 14px;
	margin-left: 98px;
}
.rank_main_username>img{
	width: 40px;
	height: 40px;
	vertical-align: middle;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
}
.rank_main_username>span{
	vertical-align: middle;
	margin-left: 5px;
}
.rank_main_profit{
	width: 115px;
	line-height: 40px;
	text-align: center;
	color: #676767;
	font-size: 14px;
	font-weight: bold;
}
.paging{
    position: absolute;
    width: 100%;
    bottom: 27px;
}
.el-pagination{
	text-align: center;
}
</style>
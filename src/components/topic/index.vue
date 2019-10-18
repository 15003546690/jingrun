<template>
	<div class="active_main">
    	<div class="active_box">
    		<div class="topic_item" v-for="item in activity" @click="gotoLink(item.activityId)">
    			<h2><a href="javascript:;">{{item.name}}</a></h2>
    			<div class="pic"><img v-lazy="item.firstImg" alt=""></div>
    		</div>
    		<div class="noData displayFlex flexCenter flexMidle" v-if="noData">
				<p><img src="../../assets/img/nodata_icon.png"/></p>
			</div>
    	</div>
    	<p class="active_main_bg2"></p>
    	<div class="paging" v-if="activity.length>0">
	  		<el-pagination
		      	@size-change = "handleSizeChange"
		      	@current-change = "handleCurrentChange"
		      	:current-page = this.currentPage
		      	:page-size = 1
		      	layout = "prev, pager, next, jumper"
		      	:total = "totalPage" >
		    </el-pagination>
	  	</div>
    </div>
</template>

<script>

export default{
	data () {
		return {
			activity: [],
			currentPage: 1,
			totalPage: 0,
			noData:false
		}
	},
  	created () {
  		this.$Bury(window.location.href,'',4,'zhuantiliebiaoye_02032')
  		$('.commonSearch').show()
  		setTimeout(()=>{
  			this.activityList();
  		},100)
  	},
  	methods: {
  		activityList() {
  			this.$CPOST('/activity/v1/activity/topicList', {
  				page: this.currentPage-1,
  				size: 8
  			},(res) => {
  				this.activity = res.resultValue.infos
  				if(res.resultValue.totalPage == 0){
  					this.noData = true;
  				}
  				this.totalPage = Math.ceil(res.resultValue.totalElement/8)
   			})
  		},
  		gotoLink(id){
  			this.$router.push({path:'/topic/'+id})
  		},
  		handleSizeChange(val) {
			this.pagesize = val;
	        this.activityList()
	    },
	    handleCurrentChange(val) {
    		this.currentPage = val;
    		this.activityList()
	    }
  	}
}
</script>

<style scoped>
.paging{
	width: 100%;
  overflow: hidden;
  margin-bottom: 30px;
}
.el-pagination{
	text-align: center;
	margin-top: 19px;
}
.active_main{width:1000px; margin:0 auto; padding-top: 30px;}
.noData{min-height: 600px;}
.topic_item{margin-bottom: 20px;}
.topic_item>h2{font-size: 18px; font-weight: bold; margin-bottom: 8px;}
.topic_item>h2>a{color: #454545;}
.topic_item:hover>h2>a{color: #c60c1b;}
.topic_item>.pic{background: #e3e3e3; overflow: hidden; max-height: 355px; cursor: pointer; text-align: center;}
.topic_item>.pic>img{width: 100%;}
img[lazy=loading]{
  width:100px; height: 100px;
}
</style>
<template>
  <!--搜索落地页-->
  <div class="search">
    <div class="search_title">
      搜索结果
    </div>
<!--     <div class="search_nav">
      <ul>
        <li @click="tabClick(1)" :class="searchType == 1 ? 'link-active' : ''">预测</li>
        <li @click="tabClick(0)" :class="searchType == 0 ? 'link-active' : ''">评鉴</li>
        <li @click="tabClick(2)" :class="searchType == 2 ? 'link-active' : ''">活动</li>
      </ul>
    </div> -->
    <div class="ground_page">
      <div class="Subject_explain_main">
		<div class="Subject_explain">
			<p class="searchReslut">查询结果共<em>{{totle}}</em>条结果</p>
 			<!-- <div class="Subject_explain_right">
				<a @click="SearchTheme(1)" v-if="searchPx==0">排序：时间
					<i class="top">
						<img src="../../assets/img/1up.png"/>
					</i>
				</a>
				<a @click="SearchTheme(0)" v-if="searchPx!=0">排序：时间
					<i class="bottom">
						<img src="../../assets/img/2down.png"/>
					</i>
				</a>
			</div>  -->
		</div>
		<div class="serchBox">
			<div class="forecast_div" v-for="item in theme" >
			  	<div @click.stop='title(item.id,item.eventReslutType,item.activityId,item.activityLink)' class="layer"></div>
			    <div class="forecast_div_content">
			      <div class="forecast_content_left">
			      <img :src="item.eventImgpath"/>
			      </div>
			      <div class="forecast_content_right">
			        <div class="content_right_title">
			         {{item.eventName}}
			        </div>
			        <div class="content_right_time content_time"><!---->
			        	<span v-if="item.purchaseType==1" class="shengou">申购</span>
			        	<span v-else :class="item.groupEventType ? 'criticism' : ''">{{ item.groupEventType ?  '预测' : '评鉴'}}</span>
			        	<p>结束时间：&nbsp; {{formatDate(item.eventEndTime)}}</p>
			          	<!--{{item.eventEndTime}}-->
			        </div>
			      </div>
			    </div>
			    <div class="forecast_icon">
				   <img v-if="item.eventStatus==1" src="../../assets/img/index_state_yizanting.png"/>
				   <img v-if="item.eventStatus==2" src="../../assets/img/index_state_yijieshu.png"/>
				   <img v-if="item.eventStatus==3" src="../../assets/img/index_state_daiqingsuan.png"/>
				   <img v-if="item.eventStatus==4" src="../../assets/img/index_state_kaishi.png"/>
				   <img v-if="item.eventStatus==5" src="../../assets/img/index_state_yiqingsuan.png"/>
			    </div>
			  </div>
			  <div class="noData" v-if="theme.length==0">
		    	<p><img src="../../assets/img/nodata_icon.png"/></p>
		    </div>
		  </div>

		</div>
		</div>
		<div class="paging" v-if="theme.length>0">
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
    </div>
  </div>
</template>
<script>
	// import Event from './Event'
	export default {
		data() {
				return {
					num: 0,
					theme: [],
					search: false,//搜索下拉框
					eventVal: '',
					eventGroupCount: null,
					val: null,
					arr: [],//列表条数
					totalPage: 0,//总共页数
					currentPage: 1,//默认当前页数1
					searchContent:'',
					totle:0,
				}
			},
			components: {
				Event
			},
			created() {
				this.$Bury(window.location.href,'undefined',0,'sousuoluodiye_02008');
				this.SearchTheme();
			},
			methods: {
				title(id,eventReslutType,activityId,activityLink){
					if(parseInt(activityId) != 0){
						if(activityLink == ''){
							this.$router.push({path:'/activity/'+activityId});
						}else{
							this.$router.push({path:'/newActivity/'+activityId});
						}
					}else{
						if(parseInt(eventReslutType) === 0){
							this.$router.push({path:'/group/'+id})
						}else{
							this.$router.push({path:'/event/'+id})
						}
					}
				},
				formatDate (timestamp) {
					return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
				},
				changeCount() {
					this.search = false;
				},
				handleSizeChange(val) {
					this.pagesize = val;
					this.SearchTheme()
				},
				handleCurrentChange(val) {
					this.currentPage = val;
					this.SearchTheme()
				},

				//搜索图标点击调取接口
				SearchTheme(type) {
					this.eventVal = this.$route.params.key;
					var dateType = type || 0;
					this.searchPx = dateType;
					this.$CPOST('/event/v1/search/searchEventInfo', {
						name: this.eventVal,
						page: this.currentPage - 1,
						size: 10
					}, (res) => {
						if(res.resultCode == 200){
							this.theme = res.resultValue.list || [];
							this.totle = res.resultValue.total;
							this.totalPage = Math.ceil(res.resultValue.total/10);
						}
						//列表条数
					})
				},
				tabClick(type){
					this.currentPage = 1;
					this.searchType = type;
					this.SearchTheme();
				}
			},
			watch: {
	          // 如果路由有变化，会再次执行该方法
	          $route(){
	          		this.currentPage = 1;
				  	this.SearchTheme();
				}
	        }
	}
</script>
<style scoped>
.searchReslut{color:#999;}
.searchReslut em{color: #000; font-weight: bold;}
.serchBox{position: relative;}
.noData{width: 100%;text-align: center;padding:100px 0;}
.paging{text-align: center; margin-top: 30px; margin-bottom: 100px;}
.layer{width: 100%;height: 100%;opacity: 0;position: absolute; cursor: pointer;}
.search{width: 1200px;margin: 0 auto;overflow: hidden;}
.search_title{height: 65px;line-height: 65px;font-size: 18px;color: #676767;font-weight: bold;}
.search_nav{height: 88px;text-align: center;overflow: hidden;margin-bottom: 20px;}
.search_nav>ul{margin: 0 auto;width: 302px;height: 24px;margin-top: 15px;}
.search_nav>ul>li{float: left;width: 100px;line-height: 24px;text-align: center;cursor: pointer;font-size: 16px;color: #676767;}
.search_nav>ul>li.link-active{border: solid 1px #e52735;width: 98px;border-radius: 16px;color: #e52735;}
.search_nav>ul>li:hover{color: #e52735;}
.Subject_explain{line-height: 41px;height: 41px;width: 100%;margin-bottom:8px;border-top: solid #e5e5e5 1px;}
.Subject_explain_left{float: left;line-height: 40px;font-size: 14px;color: #a4a4a4;}
.Subject_explain_left>a{color: #323232 !important;}
.Subject_explain_right{float: right;height: 40px;margin-right: 2px;}
.Subject_explain_right>a{height: 40px;line-height: 40px;font-size: 14px;color: #323232;float: left;margin-left: 20px;}
.Subject_explain_right>a>img{vertical-align: middle;margin-left: 8px;margin-top: -4px;}
.ground_page>div{min-height: 389px;}
.forecast_div{height: 87px;border-bottom: solid 1px #e5e5e5;overflow: hidden;position: relative;}
.forecast_div_content{width: 1176px;height: 68px;margin: 0 auto;margin-top: 10px;}
.forecast_content_left{float: left;width: 117px;height: 100%;}
.forecast_content_left>img{width: 107px;height: 68px;}
.forecast_content_right{float: right;width: 1059px;height: 68px;}
.content_right_title{line-height: 28px;font-size: 16px;color: #444;font-weight: bold;padding-top: 2px;}
.content_right_time{height: 26px;overflow: hidden;}
.content_right_time>span{width: 44px;height: 17px;line-height: 17px;font-size: 12px;color: white;text-align: center;background: #dd6d76;border-radius: 10px;display: block;margin-left: 2px;margin-top: 5px;float: left; margin-right: 10px;}
.content_right_time>span.criticism{background: #dd6d76}
.content_right_time>span.shengou{background: #ffac53}
.forecast{background:#e52735;}
.content_right_time>p{height: 26px;line-height: 26px;font-size: 14px;color: #888;float: left;}
.forecast_icon{position: absolute;bottom: 5px;right: 12px;width: 66px;height: 64px;text-align: center;line-height: 64px;}
.forecast_icon>img{vertical-align: middle;}
.content_time>span{background: #7990bf;}
</style>

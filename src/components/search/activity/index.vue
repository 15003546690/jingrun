<template>
	<div class="Subject_explain_main">
		<div class="Subject_explain">
			<div class="Subject_explain_left">
				<!--查询结果共
				<a>{{theme.eventGroupCount}}</a>个题材组-->
			</div>
			<div class="Subject_explain_right">
				<a>排序：时间
					<i class="top" @click="top">
						<img src="../../../assets/img/1up.png"/>
					</i>
					<i class="bottom" @click="bottom">
						<img src="../../../assets/img/2down.png"/>
					</i>
				</a>
				<!--<a>临期：
					<i>
						<img src="../../../assets/img/1up.png"/>
					</i>
					<i>
						<img src="../../../assets/img/2down.png"/>
					</i>
				</a>-->
			</div>
		</div>
		<div>
			<Event :theme="theme"/>
		</div>
		<div class="paging">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page=this.currentPage 
					:page-size=10 
					layout="prev, pager, next, jumper" 
					:total=this.totalPage>
				</el-pagination>
		</div>
	</div>
</template>
<script>
	import Event from './Activity'
	export default {
		data() {
				return {
					theme: [],
					num:0,
					serch:'',
					totalPage: 0,//总共页数
					currentPage: 1//默认当前页数1
				}
			},
			components: {
				Event
			},
			created() {
				this.serch = JSON.parse(sessionStorage.getItem('openSearch')).openSearch;
				this.SearchTheme();
			},
			methods: {
				SearchTheme() {	
					this.$CPOST('/event/v1/search/searchForecastInfo', {
							name: this.serch,
							page: this.currentPage - 1,
							size: 10,
							type: 2,
							dateType: 0
						},(res) => {
							this.theme = res.resultValue.activityInfo;//列表
							this.totalPage = Math.ceil(res.resultValue.activityCount/10);
						})
				},
				top(){
					this.$CPOST('/event/v1/search/searchForecastInfo', {
							name: this.serch,
							page: this.currentPage - 1,
							size: 10,
							type: 2,
							dateType: 1
						},(res) => {
							this.theme = res.resultValue.activityInfo;
							this.totalPage = Math.ceil(res.resultValue.activityCount/10);
						})
				},
				bottom(){
					this.$CPOST('/event/v1/search/searchForecastInfo', {
							name: this.serch,
							page: this.currentPage - 1,
							size: 10,
							type: 2,
							dateType: 0
						},(res) => {
							this.theme = res.resultValue.activityInfo;
							this.totalPage = Math.ceil(res.resultValue.activityCount/10);
						})
				},
				handleSizeChange(val) {
					this.pagesize = val;
					this.getSearch()
				},
				handleCurrentChange(val) {
					this.currentPage = val;
					this.getSearch()
				}
			}
	}
</script>
<style>
	.Subject_explain{
	line-height: 41px;
	height: 41px;
	width: 100%;
	margin-bottom:8px;
	border-top: solid #e5e5e5 1px;
}
.Subject_explain_left{
	float: left;
	line-height: 40px;
	font-size: 14px;
	color: #a4a4a4;
}
.Subject_explain_left>a{
	color: #323232 !important;
}
.Subject_explain_right{
	float: right;
	height: 40px;
	margin-right: 2px;
}
.Subject_explain_right>a{
	height: 40px;
	line-height: 40px;
	font-size: 14px;
	color: #323232;
	float: left;
	margin-left: 20px;
}
.Subject_explain_right>a>i{
	height: 40px;
	line-height: 40px;
}
.Subject_explain_right>a>i>img{
	vertical-align: middle;
	margin-top: -3px;
}
.ground_page>div{
	min-height: 339px;
}
.Subject_explain_main .paging {
		width: 100%;
		/*position: absolute;*/
		margin-top: 50px;
	}
	
	.Subject_explain_main .el-pagination {
		text-align: center;
	}
</style>
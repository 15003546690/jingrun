<template>
	<!--新闻动态-->
	<div class="new_trends">
		<div class="about_kong"></div>
		<div class="trends_content">
			<div class="trends_content_title">未来资讯</div>
			<ul>
				<li v-for="item in journalism" :key="item.newsId" data-content='item.content' data-time='item.updateTime'>
					<img @click='getdetails(item.newsId)' v-lazy="item.img" />
					<p @click='getdetails(item.newsId)'>{{item.title}}</p>
					<a>{{item.updateTime|data}}</a>
				</li>
			</ul>
			<div class="about_content_particulars">
				<div class="particulars_kong"></div>
			</div>
		</div>
		<div class="paging">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=this.currentPage :page-size=1 layout="prev, pager, next, jumper" :total=this.totalPage>
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import Page from '@/components/common/Page'
	export default {
		data() {
				return {
					journalism: [], //组列表
					newsId: '', //新闻ID
					totalPage: null,//总页数
					currentPage: 1,//默认页数是1
				}
			},
			created() {
				this.New()
			},
			filters: {
				days: function(input) {
					var d = new Date(input);
					var year = d.getFullYear();
					var month = d.getMonth() + 1;
					var day = d.getDate() < 10 ? +d.getDate() : '' + d.getDate();
					var hour = d.getHours();
					var minutes = d.getMinutes();
					var seconds = d.getSeconds();
					return day;
				},
				data: function(input) {
					var d = new Date(input);
					var year = d.getFullYear();
					var month = d.getMonth() + 1;
					var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
					var hour = d.getHours();
					var minutes = d.getMinutes();
					var seconds = d.getSeconds();
					return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
				},
				fixed: function(value) {
					return value.toFixed(0);
				},
				//两位小数
				decimal: function(val) {
					if(val.toFixed) {
						return val.toFixed(2)
					} else {
						return val
					}
				}
			},
			methods: {
				//埋点
				addTrackLog() {
					this.$Bury(window.location.href,'',0,'weilaizixun_03029')
				},
				getLocalTime(nS) {
					return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
				},
				//点击跳转
				getdetails(newId) {
					this.$router.push({
						path: '/others/newdetails/',
						query: {
							id: 0,
							newsId: newId
						}
					})
				},
				hideModal() {
					let hideModal = document.querySelector('.about_content_particulars');
					hideModal.style.display = "none";
				},
				handleSizeChange(val) {
					this.pagesize = val;
					this.New()
				},
				handleCurrentChange(val) {
					this.currentPage = val;
					this.New()
				},
				New() {
					this.$CPOST('/share/news/queryNews', {
						size: 10,
						page: this.currentPage - 1
					}, (res) => {
						this.journalism = res.resultValue.newsList;
						this.newsId = res.resultValue.newsList.newsId;
						this.totalPage = Math.ceil(data.resultValue.count / 8);
					})
					this.addTrackLog()
				}
			}
	}
</script>
<style scoped>
/*新闻动态*/
.about_content_particulars {display: none;}
.new_trends {width: 1200px;min-height: 782px;margin: 0 auto;background: #fff;position: relative;}
.trends_content {width: 1028px;margin: 0 auto;}
.about_kong{width: 1162px;height: 41px;border-bottom: solid 1px #ededed;margin: 0 auto;margin-bottom: 30px;}
.trends_content_title {line-height: 28px;font-size: 14px;color: #323232;font-weight: bold;margin-bottom: 13px;}
.trends_content>ul>li {height: 73px;line-height: 73px;font-size: 14px;color: #323232;border-bottom: dashed 1px #e5e5e5;cursor: pointer;}
.trends_content>ul>li>img {width: 86px;height: 53px;margin-right: 20px;float: left;margin-top: 10px;}
.trends_content>ul>li>p {line-height: 73px;display: inline-block;float: left;}.trends_content>ul>li>a {float: right;line-height: 73px;font-size: 14px;color: #323232;}
.about_content_particulars {width: 1200px;margin: 0 auto;background: #fff;position: absolute;top: 91px;left: 0;bottom: 0;right: 0;z-index: 3;}
.particulars_kong {width: 1160px;height: 39px;border-bottom: solid 1px #ededed;margin: 0 auto;margin-bottom: 30px;}
.particulars_content {width: 1028px;margin: 0 auto;}
.particulars_content_title {text-align: center;line-height: 35px;font-size: 18px;color: #323232;}
.particulars_content_time {text-align: center;line-height: 32px;font-size: 14px;color: #323232;margin-bottom: 5px;}	
.particulars_content>p {font-size: 16px;color: #323232;text-indent: 2em;line-height: 30px;}
.turning {height: 105px;margin-top: 40px;border-top: dashed 1px #e5e5e5;padding-top: 20px;}
.turning>p {line-height: 32px;font-size: 14px;color: #323232;cursor: pointer;}
.turning_color {color: #e52735 !important;}
.particulars_content_a {position: absolute;top: 12px;left: 26px;font-size: 14px;color: #6d6d6d;}
.paging {width: 100%;position: absolute;bottom: 80px;}
.el-pagination {text-align: center;}
</style>
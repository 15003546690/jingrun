<template>
	<div class="about_content_particulars">
		<div class="particulars_kong"></div>
		<div class="particulars_content">
			<div class="particulars_content_title">
			{{data.title}}
			</div>
			<div class="particulars_content_time">
				发布时间：{{data.publishTime|data}}
			</div>
			<p v-html="data.content"></p>
		</div>
	</div>
</template>
<script>
	export default {
		props: [
			'journalism'
		],
		data() {
			return {
				data:''
			}
		},
		created() {
			this.$Bury(window.location.href,'',0,'zixunxiangqing_04023')
			this.getdetails()
		},
		filters:{
			//时间转换
		   	data:function (input) {
		       	var d = new Date(input);
		       	var year = d.getFullYear();
		       	var month = d.getMonth() + 1;
		       	var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
		       	var hour = d.getHours();
		       	var minutes = d.getMinutes();
		       	var seconds = d.getSeconds();
		       	return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
		   	},
		},
		methods: {
			getdetails() {
				this.$CPOST('/share/news/getShareNewsDetail', {
					id:0,
					newsId:this.$route.query.newsId
				},(res) => {
					this.data = res.resultValue;
				})
			}
			 
		}
	}
</script>
<style scoped>
.about_content_particulars {width: 1200px;margin: 0 auto;background: #fff;}
.particulars_kong {width: 1160px;height: 39px;border-bottom: solid 1px #ededed;margin: 0 auto;margin-bottom: 30px;}
.particulars_content {width: 1028px;margin: 0 auto;}
.particulars_content_title {text-align: center;line-height: 35px;font-size: 18px;color: #323232;}
.particulars_content_time {text-align: center;line-height: 32px;font-size: 14px;color: #323232;margin-bottom: 5px;}
.particulars_content>p {font-size: 16px;color: #323232;text-indent: 2em;line-height: 30px;}
.turning {height: 105px;margin-top: 40px;border-top: dashed 1px #e5e5e5;padding-top: 20px;}
.turning>p {line-height: 32px;font-size: 14px;color: #323232;cursor: pointer;}
.turning_color {color: #e52735 !important;}
</style>
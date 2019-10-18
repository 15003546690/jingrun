<template>
	<div class="Subject_explain_main">
		<div class="Subject_explain">
			<!--<div class="Subject_explain_left">
				查询结果共
				<a>{{eventGroupCount}}</a>个题材组
			</div>-->
			<div class="searchabox">
				<div class="searcha register_search">
					<input type="text" id="getSearch" placeholder="热搜提示文案" class="eventInput" v-model="eventVal" @keyup.13="eventSearch()" @input="getSearch" v-on:blur="" ref='input1' @focus="inpFocus" />
					<span @click='eventSearch'>
	              		<img src="../../../assets/img/center/search.png" />
	              	</span>
					<div class="register_search_select" v-if="search">
						<ul>
							<li v-for='(i,index) in theme' @click="ckLi($event)"><span>{{index}}</span><i>{{i.eventName}}</i></li>
						</ul>
					</div>
				</div>
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
			<Event :theme="theme" />
		</div>
		<div class="paging">
	  		<el-pagination
		      @size-change = "handleSizeChange"
		      @current-change = "handleCurrentChange"
		      :current-page = this.currentPage
		      :page-size = 1
		      layout = "prev, pager, next, jumper"
		      :total = "this.totalPage">
		    </el-pagination>
	  	</div>
	</div>
</template>
<script>
	import Event from './Event'
	export default {
		data() {
				return {
					num: 0,
					theme: null,
					search: false,//搜索下拉框
					eventVal: '',
					eventGroupCount: null,
					val: null,
					arr: [],//列表条数
					totalPage: 0,//总共页数
					currentPage: 1//默认当前页数1
				}
			},
			components: {
				Event
			},
			created() {
				$('.commonSearch').hide()
				this.serch = JSON.parse(sessionStorage.getItem('search')).search;
				this.indexTheme();
				//this.eventVal=JSON.parse(sessionStorage.getItem('openSearch')).openSearch;
			},
			methods: {
				inpFocus() {
					this.eventVal = ''
				},
				ckLi(e) {
					this.eventVal = e.path[0].innerHTML;
					this.eventSearch()//搜索图标
                     this.search = false;
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
				getSearch() {
					if(this.eventVal == "") {
                        this.search = false;
					} else {
                         this.search = true;
					}
					this.$CPOST('/event/v1/search/searchForecastInfo', {
						dateType: 0,//时间降序
						name: this.eventVal,//查询名称
						page: this.currentPage-1,
						size: 10,//每页条数
						type: 0,//类型     评鉴 
					}, (res) => {
						this.search = true;//搜索框下拉显示
						this.arr = res.resultValue.searchEventYCInfo;//列表条数
						this.totalPage = Math.ceil(res.resultValue.eventCount/10);
					})
				},
				//搜索图标点击事件
				eventSearch() {
					let openSearch = {
						openSearch: this.eventVal
					}
					let obj1 = JSON.stringify(openSearch);
					sessionStorage.setItem('openSearch', obj1);
					this.SearchTheme();
				},
				indexTheme() {
					this.$CPOST('/event/v1/search/searchForecastInfo', {
						dateType: 0,//时间降序
						name: this.serch,//查询名称
						size: 10,//每页条数
						page:this.currentPage - 1,//类型     评鉴 
						type: 1//类型     预测 
					}, (res) => {
						this.theme = res.resultValue.searchEventYCInfo;//列表条数
						this.eventGroupCount = res.resultValue.eventGroupCount;//
						this.totalPage = Math.ceil(res.resultValue.eventCount/10);
					})
				},
				//搜索图标点击调取接口
				SearchTheme() {
					this.$CPOST('/event/v1/search/searchForecastInfo', {
						name: this.eventVal,
						page: this.currentPage - 1,
						size: 10,
						type: 1,
						dateType: 0
					}, (res) => {
						this.theme = res.resultValue.searchEventYCInfo;//列表条数
						this.totalPage = Math.ceil(res.resultValue.eventCount/10);
					})
				},
				//时间排序  升序
				top() {
					this.$CPOST('/event/v1/search/searchForecastInfo', {
						name: this.serch,
						page: this.currentPage - 1,
						size: 10,
						type: 1,
						dateType: 1
					}, (res) => {
						this.theme = res.resultValue.searchEventYCInfo;//列表条数
						this.totalPage = Math.ceil(res.resultValue.eventCount/10);
					})
				},
				//时间排序  降序
				bottom() {
					this.$CPOST('/event/v1/search/searchForecastInfo', {
						name: this.serch,
						page: this.currentPage - 1,
						size: 10,
						type: 1,
						dateType: 0
					}, (res) => {
						this.theme = res.resultValue.searchEventYCInfo;//列表条数
						this.totalPage = Math.ceil(res.resultValue.eventCount/10);
					})
				}
			}
	}
</script>
<style>
	.forecast_div {
		clear: both;
	}
	
	.register_search {
		width: 219px;
		height: 36px;
		background: #dddddd;
		float: left;
		/*margin-left: 52px;*/
		position: relative;
	}
	
	.register_search>input {
		width: 171px;
		height: 32px;
		line-height: 32px;
		font-size: 12px;
		color: #444444;
		outline: none;
		border: none;
		float: left;
		margin-top: 2px;
		margin: 2px;
		padding-left: 8px;
	}
	
	.register_search>span {
		width: 36px;
		height: 36px;
		float: right;
		text-align: center;
		cursor: pointer;
	}
	
	.register_search>span>img {
		vertical-align: middle;
		/*margin-top: -2px;*/
	}
	
	.searchabox {
		line-height: 32px;
		height: 36px;
		width: 31%;
		z-index: 6;
		text-align: center;
		clear: both;
		position: absolute;
		left: 400px;
		top: -63px;
		right: 0;
	}
	
	.searcha {
		height: 36px;
		width: 371px;
		display: inline-block;
		margin-top: 10px;
		float: initial;
	}
	
	.register_search>input {
		width: 323px;
		height: 32px;
		line-height: 32px;
		font-size: 12px;
		color: #444444;
		outline: none;
		border: none;
		float: left;
		margin-top: 2px;
		margin: 2px;
		padding-left: 8px;
	}
	
	.register_search>span {
		width: 36px;
		height: 36px;
		float: right;
		text-align: center;
		cursor: pointer;
	}
	
	.Subject_explain {
		line-height: 41px;
		height: 41px;
		width: 100%;
		margin-bottom: 8px;
		border-top: solid #e5e5e5 1px;
		position: relative;
	}
	
	.Subject_explain_left {
		float: left;
		line-height: 40px;
		font-size: 14px;
		color: #a4a4a4;
	}
	
	.Subject_explain_left>a {
		color: #323232 !important;
	}
	
	.Subject_explain_right {
		float: right;
		height: 40px;
		margin-right: 2px;
	}
	
	.Subject_explain_right>a {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		color: #323232;
		float: left;
		margin-left: 20px;
	}
	
	.Subject_explain_right>a>i {
		height: 40px;
		line-height: 40px;
	}
	
	.Subject_explain_right>a>i>img {
		vertical-align: middle;
		margin-top: -3px;
	}
	.ground_page{
		height: 1100px;
	}
	.ground_page>div {
		min-height: 339px;
	}
	/*搜索下拉*/
	
	.register_search_select {
		width: 370px;
		/* height: 100px; */
		background: white;
		position: absolute;
		top: 36px;
		left: 0px;
		z-index: 6;
		box-shadow: 0px 0px 10px #c4c4c4;
	}
	
	.register_search_select>div {
		height: 30px;
		background: white;
		border-bottom: solid 1px #e6e6e6;
	}
	
	.div_color {
		color: #e52735 !important;
	}
	
	.register_search_select>div>p {
		float: left;
		line-height: 30px;
		padding: 0 10px;
		font-size: 14px;
		color: #323232;
	}
	
	.register_search_select>ul {
		overflow-y: auto;
		height: 105px;
	}
	
	.register_search_select>ul>li {
		width: 100%;
		line-height: 30px;
		font-size: 14px;
		cursor: pointer;
		margin-bottom: -8px;
		display: inline-block;
	}
	
	.register_search_select>ul>li>span {
		float: left;
	}
	
	.register_search_select>ul>li>i {
		float: left;
		width: 300px;
		height: 26px;
		display: inline-block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.register_search_select>ul>li>p {
		width: 256px;
		line-height: 30px;
		font-size: 14px;
		cursor: pointer;
		float: left;
	}
	
	.register_search_select>ul>li>span {
		padding: 0 5px;
		font-size: 14px;
		background: #e52735;
		border-radius: 4px;
		margin: 0 4px;
		color: white;
	}
	
	.register_search_select>ul>li:hover {
		background: #EEEEEE;
	}
	
	.register_login {
		min-width: 155px;
		margin-left: 10px;
		float: left;
	}
	.Subject_explain_main{
		position: relative;
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
<template>
	<div class="activities">
		<div >
	    	<!--最近参加的活动-->
			<div class="center_page_table">
				<div class="center_page_table_top">
					<p>最近参加活动</p>
				</div>
				<table border="0" cellspacing="0" cellpadding="0" class="table_two">
					<thead>
						<tr>
							<th class="table_two_th">活动名称</th>
							<th class="table_two_tt">状态</th>
							<th class="two_tt">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in lists" :key="item.activityId" v-if="lists.length>0">
							<td>
								<div class="td_div">
									<div class="td_div_img">
										<img v-lazy="item.firstImg"/>
									</div>
									<div class="td_div_title">
										<div>{{item.allName}}</div>
										<p>{{item.endWord}}</p>
									</div>
								</div>
							</td>
							<td class="point">{{item.status}}</td>
							<td class="post" v-if="item.cate==0"><router-link :to="'/activity/' + item.activityId" tag="a">查看详情</router-link></td>
						    <td class="post" v-if="item.cate>=2"><router-link :to="'/newActivity/' + item.activityId" tag="a">查看详情</router-link></td>
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
	  	<div class="noData" v-if="noData">
	    	<p><img src="../../../assets/img/nodata_icon.png"/></p>
	    </div>
    </div>
</template>
<script>
	export default{
		data() {
			return {
				lists: [],
				currentPage: 1,//默认第一页
				totalPage: null,//总页数
				noData:false
			}
		},
		created() {
			setTimeout(()=>{
				this.campaign();
			},50)
		},
		methods: {
			campaign () {
		    	this.$CPOST('/activity/v1/activity/app/findJoinActivity',{
		    		size: 4,
		        	page: this.currentPage-1
		    	},(res) => {
		    		this.cate = res.resultValue.infos.cate;
		    		if(res.resultCode == 200){
			    		this.lists = res.resultValue.infos;
			    		this.totalPage = res.resultValue.totalPage;
			    		if(this.lists.length==0){
			    			this.noData=true;
			    		}
			    	}else{
			    		this.lists = [];
			    	}
		    	})
		    	this.$Bury(window.location.href,'',0,'wocanjiadehuodong_03006')
		   	},
		   	handleSizeChange(val) {
				this.pagesize = val;
		        this.campaign();
		    },
		    handleCurrentChange(val) {
	    		this.currentPage = val;
	    		this.campaign();
		    }
		}
	}
</script>
<style scoped>
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;top: 100px;}
.activities{width: 940px;height: 1006px;margin-left: 32px;position: relative;}
.center_page_table{min-height: 360px;margin-top: 20px;}
.center_page_table_top{line-height: 60px;}
.center_page_table_top>p{font-size: 18px;color: #323232;font-weight: bold;display: inline-block;}
.table_two{width: 938px;}
.table_two>thead>tr>th{height: 42px;background: #f0f0f0;font-size: 14px;color: #333333;}
.table_two>thead>tr>th.table_two_th{width: 554px;	}
.table_two>thead>tr>th.table_two_tt{width: 192px;text-align: center;}
.table_two>thead>tr>th.two_tt{width: 158px;text-align: right;padding-right: 34px;}
.table_two>tbody>tr>td{height: 149px;border-bottom: solid 1px #eeeeee;}
.center_page{height: 202px;border-bottom: dashed 1px #cccccc;}
.center_page_left,.center_page_right{width: 50%;height: 202px;float: left;}
.center_page_left{overflow: hidden;}
.center_page_left>p,.center_page_right>p{line-height: 54px;font-size: 18px;color: #474e5d;	margin-top: 18px;}
.center_page_left_div{line-height: 40px;color: #474e5d;font-size: 40px;}
.point{text-align: center;font-size: 14px;color: #323232;}
.post>a{width: 72px;line-height: 26px;text-align:center;display:inline-block;border: none;outline: none;background: none;border-radius: 2px;color: #e52735;cursor: pointer;}
.post>a:hover{background: #e42a33;color: white}
.post{text-align: right;padding-right: 16px;font-size: 14px;color: #e52735;}
.td_div{height: 115px;}
.td_div_img{width: 236px;height: 100%;float: left;}
.td_div_img>img{width: 100%;height: 100%;}
.td_div_title{float: left;margin-left: 6px;width: 210px;}
.td_div_title>div{line-height: 18px;font-size: 16px;color: #323232; margin-top: 6px;}
.td_div_title>p{font-size: 14px;color: #676767; margin-top: 8px;}
.paging{width: 100%;position:absolute;bottom:80px;}
.el-pagination{text-align: center;}
</style>
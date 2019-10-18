<template>
<div>
	<!--公告消息-->
	<div class="listData" v-if="system.length>0">
		<div class="announcement" v-for="item in system">
	        <div class="announcement_div">
	          <span><img src="../../../assets/img/center/message.png"/></span>
	          <div class="announcement_div_most">
	          <div class="announcement_div_content">
	            <p>{{item.title}}</p>
	            <i><a @click="clean($event)"></a>{{formatDate(item.createTime)}}</i>
	          </div>
	          <div class="announcement_content">
	            {{item.content}}
	          </div>
	          </div>
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
	</div>
	<div class="noData" v-if="system.length==0">
    	<p><img src="../../../assets/img/nodata_icon.png"/></p>
    </div>
</div>
   
</template>

<script>
export default{
    data() {
		return{
			system: [],//列表
			totalPage: 0,//总页数
			currentPage: 1,//页数默认1
			messageId:''//当前题材的id
		}
	},
    created() {
		this.getMessage()
	},
    methods: {
    	formatDate (timestamp) {
			return this.$dateFormat(timestamp,'yyyy-mm-dd HH:MM')
		},
		getMessage() {
	      // 根据分类获取信息
	      this.$CPOST('/message/v1/message/findMessageByTypePc', {
	        type:0,
	        size: 5,
	        page: this.currentPage-1
	      },(res) => { 
	        this.system=res.resultValue.list;
	        this.totalPage= Math.ceil(res.resultValue.totalElement/5);
	        
	      })
	   	},
	   	handleSizeChange(val) {
			this.pagesize = val;
		    this.getMessage()
	    },
	    handleCurrentChange(val) {
	    	this.currentPage = val;
	    	this.getMessage()
	    }
    }
}   
</script>

<style scoped>
.listData{width: 100%;height: 886px;position: relative;}
/*空白页*/
.noData{position: absolute;width: 940px;height: 100%;text-align: center;line-height: 1006px;}
.announcement_div{border-bottom: dashed 1px #e1e1e1;display: inline-block;padding-bottom: 14px;margin-bottom: 16px;}
.announcement_div>span{width: 67px;height: 60px;display: block;float: left;    }
.announcement_div_most{width: 873px;float: left;}
.announcement_div_content{width: 873px;float: left;}
.announcement_div_content>p{float: left;height: 20px;font-size: 14px;color: #323232;}    
.announcement_div_content>i{float: right;height: 20px;font-size: 12px;color: #a5a5a5;display: block;}
.announcement_content{line-height: 22px;font-size: 14px;color: #676767;}
.announcement_div_content>i>a{margin-right: 10px;}
.paging{width: 100%;position: absolute;bottom:150px;}
.el-pagination{text-align: center;}
</style>
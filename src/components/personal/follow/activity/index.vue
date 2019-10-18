<template>
	<!--活动-->
  <div>
  	<div>
	    <table border="0" cellspacing="0" cellpadding="0" class="table_two">
	      <thead>
	        <tr>
	          <th class="table_two_th">活动名称</th>
	          <th class="table_two_tt">状态</th>
	          <th class="two_tt">操作</th>
	        </tr>
	      </thead>
	      <tbody>
	        <tr class="listTr" v-for="(item,index) in lists" :key="item.activityId">
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
	          <td class="post">
	            <router-link v-if="item.cate == 0" tag="p" :to="'/activity/' + item.activityId"><a>去参加&nbsp;&nbsp;</a></router-link>
	            <router-link v-if="item.cate >= 2" tag="p" :to="'/newActivity/' + item.activityId"><a>去参加&nbsp;&nbsp;</a></router-link>
	            <p @click="showModal(item.activityId,index)"><a>取消关注</a></p>
	          </td>
	        </tr>
	      </tbody>
	    </table>
	    <div class="paging">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size=1 layout="prev, pager, next, jumper" :total="totalPage">
				</el-pagination>
				<!--pageSize 改变时会触发-->
				<!--currentPage 改变时会触发-->
				<!--当前页数-->
				<!--每页显示条目个数-->
				<!--组件布局，子组件名用逗号分隔-->
				<!--总条目数-->
			</div>
  	</div>
  	<div class="noData" v-if="noData">
    	<p><img src="../../../../assets/img/nodata_icon.png"/></p>
    </div>
  	<div class="confirm_modal" v-if="isShow">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='hideModal'><img src="../../../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p>确定要取消关注吗？</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='updateAttention()'>确定</button>
						<button @click='hideModal'>取消</button>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>

export default {
  data() {
  	return{
  	  lists: [],//活动列表
  	  totalPage:0,//总页数
      currentPage:1,//默认第一页
      isShow: false,//弹层
      activityId: '',//活动Id
      listIndex:0,//取消关注默认值
      noData: false
  	}
  },
  created() {
		this.userAttentionEvent();
  },
  methods: {
  	//分页
  	userAttentionEvent() {
     this.$CPOST('/account/v1/userAttention/queryUserAttentionEventInformation', {
        attentionEventType: 2,
        size: 4,
        page: this.currentPage - 1
      },(res) => {
        this.lists = res.resultValue.activityInfo;
        this.totalPage = Math.ceil(res.resultValue.count / 4);
        if(this.lists.length>0){
        	this.noData = false
        }else{
        	this.noData = true
        }
      })
 	  this.$Bury(window.location.href,'',0,'huodongtab_04005')
   	},
  	updateAttention() {
        this.$CPOST('/account/v1/userAttention/updateUserAttention', {
          attentionEventType: 2,
          attentionType: 2,
          attentionTypeId: this.activityId
        },(res) => {
        this.hideModal();
        this.lists.splice(this.listIndex,1);
      })
    },
    handleSizeChange(val) {
			this.pagesize = val;
            this.userAttentionEvent();
    },
    handleCurrentChange(val) {
    		this.currentPage = val;
    		this.userAttentionEvent();
    },
    showModal(itemId,ind) {
    	this.activityId = itemId;
    	this.isShow = true;
    	this.listIndex=ind;
    },
    hideModal() {
    	this.isShow = false;
    }
  }
}
</script>

<style scoped>
table{width: 100%;}
table>thead>tr>th{width: 48px;line-height: 42px;background: #f0f0f0;color: #333;font-size: 14px;}
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
.table_two{width: 938px;}
.table_two>thead>tr>th{height: 42px;background: #f0f0f0;font-size: 14px;color: #333;}
.table_two>thead>tr>th.table_two_th{width: 554px;}
.table_two>thead>tr>th.table_two_tt{width: 192px;text-align: center;}
.table_two>thead>tr>th.two_tt{width: 158px;text-align: right;padding-right: 34px;}
.table_two>tbody>tr>td{height: 149px;border-bottom: solid 1px #eee;}
.post{text-align: right;padding-right: 16px;font-size: 14px;color: #3282ff;}
.point{text-align: center;font-size: 14px;color: #676767;}
.post>p{cursor: pointer;}
.post>p>a{color: #3282ff;}
.post>p:hover a{
	text-decoration: underline;
}
.td_div{height: 115px;}
.td_div_img{width: 236px;height: 100%;float: left;}
.td_div_img>img{width: 100%;height: 100%;}
.td_div_title{float: left;margin-left: 6px;width: 210px;}
.td_div_title>div{line-height: 18px;font-size: 16px;color: #323232;margin-top: 6px;}
.td_div_title>p{font-size: 14px;color: #676767;margin-top: 8px;}
.paging{width: 100%;position:absolute;bottom:80px;}
.el-pagination{text-align: center;}
.confirm_modal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box{width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or{width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head{width: 100%;height: 32px;}
.confirm_main_head>p{float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span{display: block;float: right;cursor: pointer;}
.confirm_text{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;}
.confirm_btn{width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button{width: 98px;height: 32px;background: url(../../../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
</style>

